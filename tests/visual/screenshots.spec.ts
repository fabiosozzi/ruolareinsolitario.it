import { test, expect } from '@playwright/test'

test.describe('Homepage visual regression', () => {
  test('dark mode (default)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('html')).toHaveClass(/dark/)
    await expect(page).toHaveScreenshot('homepage-dark.png', {
      fullPage: true,
    })
  })

  test('light mode', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('nuxt-color-mode', 'light')
    })
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('html')).toHaveClass(/light/)
    await expect(page).toHaveScreenshot('homepage-light.png', {
      fullPage: true,
    })
  })
})
