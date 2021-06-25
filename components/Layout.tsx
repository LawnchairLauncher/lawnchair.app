// (c) 2021 Raphael Tang
// This code is licensed under MIT license (see LICENSE for details)

import { NextSeo } from "next-seo"
import { ReactNode } from "react"
import Header from "@components/Header"
import Footer from "./Footer"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  title: string
}

export default function Layout({ title, children, ...props }: Props) {
  return (
    <div {...props}>
      <NextSeo
        title={title}
        description="The most complete open source Android home screen."
        canonical="https://lawnchair.app"
        openGraph={{
          url: "https://lawnchair.app",
          title: "Lawnchair Launcher",
          description: "The most complete open source Android home screen.",
          site_name: "lawnchair",
        }}
        twitter={{
          handle: "@lawnchairapp",
          site: "@lawnchairapp",
          cardType: "summary_image_large",
        }}
      />
      <Header />
      {children}
      <Footer />
    </div>
  )
}
