import React from 'react'
import Image from 'next/image'
import { DocsThemeConfig } from 'nextra-theme-docs'
import Link from 'next/link'

const config: DocsThemeConfig = {
  useNextSeoProps() {
    return {
      titleTemplate: "%s - Lawnchair"
    }
  },
  logo: <span className='gap-2 flex items-center'>
      <Image
      className="rounded-full"
      src="/images/lawnchair.png"
      alt=""
      height={30}
      width={30}
      />
      <span className='font-bold'>Lawnchair</span>
  </span>,
  project: {
    link: 'https://github.com/LawnchairLauncher/lawnchair'
  },
  docsRepositoryBase: 'https://github.com/LawnchairLauncher/lawnchair.app',
  footer: {
    text: (<>
      <span>Website by <a href="https://superdragonxd.github.io/">SuperDragonXD</a> - Hosted by <a href="https://razex.de">Razex.de</a> - Public Analytics on <a href="https://simpleanalytics.com/lawnchair.app">Simple Analytics</a> - View <Link href="/privacy_policy">Privacy Policy</Link></span>
    </>),
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <link rel="icon" href="/favicon.ico" />
    </>
  ),
  chat: {
    link: 'https://discord.gg/3x8qNWxgGZ'
  }
}

export default config
