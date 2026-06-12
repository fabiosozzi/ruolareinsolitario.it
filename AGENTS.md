# ruolareinsolitario.it

## Stack tecnologico

- **Framework:** Nuxt 4 (^4.4.8), Vue 3, TypeScript
- **Styling:** Tailwind CSS v4 + shadcn-vue (componenti UI)
- **Moduli Nuxt:**
  - `shadcn-nuxt` — shadcn/vue integration
  - `@nuxtjs/i18n` — localizzazione (it default, en secondario)
  - `@nuxt/content` v3 — contenuti markdown con SQLite
  - `@nuxtjs/color-mode` — dark/light mode
  - `@netlify/nuxt` — deploy Netlify
- **Package manager:** npm

## Palette colori

Convertite in HSL per le CSS variables di shadcn.

### Tema chiaro (`:root`)

| Ruolo         | Esadecimale | HSL              |
|---------------|-------------|------------------|
| background    | `#FAFAFA`   | `0 0% 98%`       |
| foreground    | `#1A1A1A`   | `0 0% 10%`       |
| primary       | `#E67E22`   | `28 80% 52%`     |
| primary-fg    | `#FFFFFF`   | `0 0% 100%`      |
| ring          | `#E67E22`   | `28 80% 52%`     |
| link          | `#D35400`   | `24 100% 41%`    |

### Tema scuro (`.dark`)

| Ruolo         | Esadecimale | HSL              |
|---------------|-------------|------------------|
| background    | `#121212`   | `0 0% 7%`        |
| foreground    | `#EAEAEA`   | `0 0% 92%`       |
| primary       | `#E67E22`   | `28 80% 52%`     |
| primary-fg    | `#FFFFFF`   | `0 0% 100%`      |
| ring          | `#F39C12`   | `38 90% 51%`     |
| link          | `#F39C12`   | `38 90% 51%`     |

I colori `--muted`, `--card`, `--border`, `--accent`, ecc. saranno derivati dalle tonalità di background/foreground.

## Logo

`public/images/logo.webp` — utilizzato nella navbar e nell'hero della homepage.

## Struttura directory

```
.
├── app/
│   ├── assets/
│   │   └── css/
│   │       └── tailwind.css        # @import "tailwindcss" + CSS variables brand
│   ├── pages/
│   │   └── index.vue               # Hero homepage
│   ├── layouts/
│   │   └── default.vue             # Layout: navbar + NuxtPage + footer
│   ├── plugins/
│   │   └── ssr-width.ts            # (opzionale) SSR width per shadcn
│   └── app.vue                     # Root: <NuxtLayout />
├── components/
│   ├── ui/                         # shadcn components (generati via CLI)
│   ├── brand/                      # Componenti custom del brand
│   │   ├── BrandNavbar.vue
│   │   ├── BrandFooter.vue
│   │   └── HeroSection.vue
│   └── shared/                     # Componenti condivisi generici
├── content/                        # File markdown (guide, recensioni, strumenti)
├── i18n/
│   ├── it.ts                       # Traduzioni italiano
│   └── en.ts                       # Traduzioni inglese
├── public/
│   └── images/
│       └── logo.webp               # Logo del sito
├── content.config.ts               # Definizione collezioni Nuxt Content v3
├── nuxt.config.ts                  # Configurazione unificata
├── AGENTS.md                       # Questo file
├── package.json
└── tsconfig.json
```

## Git

- **Commit e push solo su richiesta esplicita.** Non fare mai commit o push senza chiedere prima il permesso.

## Convenzioni di sviluppo

1. **Tutti i componenti UI devono usare shadcn-vue.** Non scrivere CSS custom per bottoni, input, card, etc. — usa i componenti da `components/ui/` e personalizzali con le `class` di Tailwind.
2. **Script setup + TypeScript** in tutti i componenti: `<script setup lang="ts">`.
3. **Nessun commenti** nel codice.
4. **PascalCase** per i file dei componenti (es. `HeroSection.vue`).
5. **kebab-case** per le directory (es. `componenti/brand/`).
6. **Testi sempre tradotti** via `useI18n()` — non hard-codare stringhe visibili.
7. **Contenuti dinamici** (guide, recensioni) da markdown in `content/` con frontmatter.

## Convenzioni shadcn-vue

- Aggiungere nuovi componenti con: `npx shadcn-vue@latest add <componente>`
- Prefisso vuoto (`prefix: ''` nella config)
- Directory: `@/components/ui`
- Personalizzare solo via `class` prop e CSS variables, mai sovrascrivendo il componente

## Convenzioni i18n

- Due lingue: `it` (default) e `en`
- Traduzioni in `i18n/{lang}.ts` (oggetti annidati)
- Usare `t()` nelle template e `t()` nello script

Esempio:
```ts
// i18n/it.ts
export default {
  hero: {
    title: 'RUOLARE IN SOLITARIO',
    subtitle: 'Da soli è meglio',
    description: 'Guide, recensioni e strumenti per il gioco di ruolo in solitario.'
  }
}
```

## Convenzioni Nuxt Content v3

- Definire le collezioni in `content.config.ts` con `defineContentConfig`
- Usare `queryCollection('nome-collezione').all()` per recuperare
- Frontmatter YAML standard: `title`, `date`, `tags`, `type` (guide|review|tool)

## Pagine

### `/` — Homepage (index.vue)
- Navbar con logo + link + dark mode toggle
- Hero section con titolo, sottotitolo, descrizione, CTA
- Sezioni di anteprima per guide, recensioni, strumenti (da content)
- Footer

### `/guide`, `/recensioni`, `/strumenti` (da creare in futuro)

## Fix ricorrenti

- **`<component :is="string" />` non risolve i componenti Nuxt.** Nuxt auto-importa i componenti nei template ma NON li registra globalmente. Per usarli dinamicamente serve una mappa esplicita con `defineAsyncComponent` (vedi `OraclesPanel.vue`).

## Comandi sviluppo

```bash
npm run dev          # Dev server
npm run build        # Build produzione
npm run generate     # Static generation
npm run preview      # Preview build
```

## Deploy

Su Netlify via modulo `@netlify/nuxt` — configurato in `nuxt.config.ts`.
