import Link from "next/link"
import { navLinks } from "@utils/nav"

export default function Header() {
  return (
    <header className="flex flex-row w-full px-14 py-6 bg-header-bg text-white sticky top-0">
      <div className="space-x-10 ml-auto">
        {navLinks.map((item, index) => (
          <Link href={item.href} key={index}>
            <a>{item.name}</a>
          </Link>
        ))}
      </div>
    </header>
  )
}
