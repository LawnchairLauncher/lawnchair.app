// (c) 2021 Raphael Tang
// This code is licensed under MIT license (see LICENSE for details)

import Link from "next/link"

type Props = {
  children?: React.ReactNode
  link: string
}

export default function DownloadButton({ children, link }: Props) {
  return (
    <Link href={link}>
      <a
        className="px-6 py-3 rounded-2xl flex flex-row items-center text-black"
        target="_blank"
      >
        {children}
        <style jsx>{`
          a {
            background: no-repeat fixed #f5f5f5;
            box-shadow: 0 1.9px 2.2px rgba(0, 0, 0, 0.02),
              0 4.6px 5.3px rgba(0, 0, 0, 0.028),
              0 8.6px 10px rgba(0, 0, 0, 0.035),
              0 15.4px 17.9px rgba(0, 0, 0, 0.042),
              0 28.8px 33.4px rgba(0, 0, 0, 0.05),
              0 69px 80px rgba(0, 0, 0, 0.07);
            transition: all ease 0.4s;
          }
          a:hover {
            transform: translateY(-4px);
            filter: brightness(80%);
          }
        `}</style>
      </a>
    </Link>
  )
}
