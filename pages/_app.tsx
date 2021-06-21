// (c) 2021 Raphael Tang
// This code is licensed under MIT license (see LICENSE for details)

import type { AppProps } from "next/app"
import Head from "next/head"

// CSS
import "@styles/global.css"
import "../public/fonts/index.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href={`${process.env.BACKEND_URL}/favicon-57x57.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href={`${process.env.BACKEND_URL}/favicon-60x60.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href={`${process.env.BACKEND_URL}/favicon-72x72.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href={`${process.env.BACKEND_URL}/favicon-76x76.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href={`${process.env.BACKEND_URL}/favicon-114x114.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href={`${process.env.BACKEND_URL}/favicon-120x120.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href={`${process.env.BACKEND_URL}/favicon-144x144.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href={`${process.env.BACKEND_URL}/favicon-152x152.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${process.env.BACKEND_URL}/favicon-180x180.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.BACKEND_URL}/favicon-16x16.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.BACKEND_URL}/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href={`${process.env.BACKEND_URL}/favicon-96x96.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href={`${process.env.BACKEND_URL}/favicon-192x192.png`}
        />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href={`${process.env.BACKEND_URL}/favicon.ico`}
        />
        <link
          rel="icon"
          type="image/x-icon"
          href={`${process.env.BACKEND_URL}/favicon.ico`}
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content={`${process.env.BACKEND_URL}/favicon-144x144.png`}
        />
        <meta
          name="msapplication-config"
          content={`${process.env.BACKEND_URL}/browserconfig.xml`}
        />
        <link
          rel="manifest"
          href={`${process.env.BACKEND_URL}/manifest.json`}
        />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
