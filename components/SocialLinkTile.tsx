import Link from "next/link"

type Props = {
  link: string
  imageSrc: string
  label: string
}

export default function SocialLinkTile({ link, imageSrc, label }: Props) {
  return (
    <Link href={link}>
      <a
        className="flex flex-col items-center bg-white rounded-2xl px-8 py-8 w-32 space-y-4 root md:w-auto"
        target="_blank"
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
      </a>
    </Link>
  )
}
