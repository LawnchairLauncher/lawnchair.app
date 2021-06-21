// (c) 2021 Raphael Tang
// This code is licensed under MIT license (see LICENSE for details)

import Link from "next/link"
import { navLinks } from "@utils/nav"
import { useEffect, useState } from "react"
import clsx from "clsx"

export default function Header() {
  const [showShadow, setShowShadow] = useState(false)

  const handleScroll = () => {
    if (window.pageYOffset > 0) {
      setShowShadow(true)
    } else {
      setShowShadow(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={clsx(
        "flex flex-row w-full px-14 py-6 bg-header-bg text-white sticky top-0 z-40",
        showShadow && "show-shadow"
      )}
    >
      <div className="space-x-10 ml-auto">
        {navLinks.map((item, index) => (
          <Link href={item.href} key={index}>
            <a>{item.name}</a>
          </Link>
        ))}
      </div>

      <style jsx>{`
        header {
          transition: box-shadow ease-out 0.2s;
        }
        .show-shadow {
          box-shadow: 0 0.4px 0.6px rgba(0, 0, 0, 0.017),
            0 1px 1.3px rgba(0, 0, 0, 0.024), 0 1.9px 2.5px rgba(0, 0, 0, 0.03),
            0 3.4px 4.5px rgba(0, 0, 0, 0.036),
            0 6.3px 8.4px rgba(0, 0, 0, 0.043), 0 15px 20px rgba(0, 0, 0, 0.06);
        }
      `}</style>
    </header>
  )
}
