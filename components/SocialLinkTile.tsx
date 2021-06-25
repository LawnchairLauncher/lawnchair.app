// (c) 2021 Raphael Tang
// This code is licensed under MIT license (see LICENSE for details)

import { useRouter } from "next/router"

interface PropsBaseType {
  imageSrc: string
  label: string
}
interface PropsWithLink extends PropsBaseType {
  onClick?: never
  link: string
}
interface PropsWithFunction extends PropsBaseType {
  onClick: () => void
  link?: never
}
type Props = PropsWithLink | PropsWithFunction

export default function SocialLinkTile({
  link,
  imageSrc,
  label,
  onClick,
}: Props) {
  return (
    <div
      className="flex flex-col items-center bg-white rounded-2xl px-8 py-8 w-32 space-y-4 root cursor-pointer md:w-auto"
      onClick={
        onClick ||
        (() => {
          window.open(link)
        })
      }
    >
      <img
        src={`${process.env.BACKEND_URL}${imageSrc}`}
        alt={label}
        className="w-24"
      />
      <p className="text-xl font-sans">{label}</p>

      <style jsx>{`
        .root {
          box-shadow: 0 1.5px 3.3px -9px rgba(0, 0, 0, 0.042),
            0 3.7px 8px -9px rgba(0, 0, 0, 0.061),
            0 6.9px 15px -9px rgba(0, 0, 0, 0.075),
            0 12.3px 26.8px -9px rgba(0, 0, 0, 0.089),
            0 23px 50.1px -9px rgba(0, 0, 0, 0.108),
            0 55px 120px -9px rgba(0, 0, 0, 0.15);
          transition: all ease 0.4s;
        }
        .root:hover {
          transform: translateY(-6px);
        }
      `}</style>
    </div>
  )
}
