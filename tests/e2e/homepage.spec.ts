import { expect, type Page, test } from '@playwright/test'

async function openHomepage(page: Page) {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
}

test.describe('Homepage', () => {
  test('renders Italian content and SEO metadata by default', async ({ page }) => {
    await openHomepage(page)

    await expect(page.locator('html')).toHaveAttribute('lang', 'it-IT')
    await expect(page).toHaveTitle('Ruolare in Solitario.it')
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      'Guide, recensioni e strumenti per il gioco di ruolo in solitario.',
    )
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('RUOLARE IN SOLITARIO')
    await expect(page.getByText('Da soli è meglio')).toBeVisible()
    await expect(page.getByText('Il sito sarà online a breve — resta sintonizzato!')).toBeVisible()
    await expect(page.locator('footer')).toContainText(`© ${new Date().getFullYear()} ruolareinsolitario.it`)
  })

  test('switches the interface and metadata to English', async ({ page }) => {
    await openHomepage(page)
    await page.getByRole('button', { name: 'EN', exact: true }).click()

    await expect(page.locator('html')).toHaveAttribute('lang', 'en-US')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('SOLO ROLEPLAYING')
    await expect(page.getByText('Better on your own')).toBeVisible()
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      'Guides, reviews and tools for solo roleplaying.',
    )
    await expect(page.getByRole('button', { name: 'Switch to light mode' })).toBeVisible()
  })

  test('toggles and persists the selected color mode', async ({ page }) => {
    await openHomepage(page)

    await expect(page.locator('html')).toHaveClass(/dark/)
    await page.getByRole('button', { name: 'Passa alla modalità chiara' }).click()
    await expect(page.locator('html')).toHaveClass(/light/)
    await expect(page.getByRole('button', { name: 'Passa alla modalità scura' })).toBeVisible()

    await page.reload({ waitUntil: 'networkidle' })
    await expect(page.locator('html')).toHaveClass(/light/)
  })

  test('loads the brand and hero images', async ({ page }) => {
    const failedImages: string[] = []

    page.on('response', (response) => {
      if (response.request().resourceType() === 'image' && !response.ok()) {
        failedImages.push(response.url())
      }
    })

    await openHomepage(page)
    await expect(page.locator('header img[src="/images/logo.webp"]')).toBeVisible()
    await expect(page.locator('section')).toHaveCSS(
      'background-image',
      /background_hero_homepage\.png/,
    )
    expect(failedImages).toEqual([])
  })
})
