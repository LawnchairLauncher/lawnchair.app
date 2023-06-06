import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>Lawnchair</span>,
  project: {
    link: 'https://github.com/LawnchairLauncher/lawnchair'
  },
  docsRepositoryBase: 'https://github.com/LawnchairLauncher/lawnchair.app',
  footer: {
    text: '(c) Lawnchair',
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </>
  )
}

export default config
