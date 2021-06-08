import { NextSeo } from "next-seo"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
  title: string
}

export default function Layout({ title, children }: Props) {
  return (
    <>
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
      {children}
    </>
  )
}
