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
            box-shadow: 0px 8px 18px -2px rgba(0, 0, 0, 0.2);
          }
        `}</style>
      </a>
    </Link>
  )
}
