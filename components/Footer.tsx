// (c) 2021 Raphael Tang
// This code is licensed under MIT license (see LICENSE for details)

import clsx from "clsx"

export default function Footer() {
  return (
    <footer className="py-3">
      <p
        className={clsx(
          "text-base px-5 py-2 mx-4 inline-block rounded-full text-gray-300",
          "md:ml-36 md:mr-0"
        )}
      >
        Website by{" "}
        <a className="text-white" href="https://raphtlw.rocks/">
          raphtlw
        </a>{" "}
        &mdash; Hosted by{" "}
        <a className="text-white" href="http://razex.de">
          Razex.de
        </a>{" "}
        &mdash; Public Analytics on{" "}
        <a
          className="text-white"
          href="https://simpleanalytics.com/lawnchair.app"
        >
          Simple Analytics
        </a>
      </p>

      <style jsx>{`
        footer {
          background-color: #00c961;
        }
        p {
          background-color: #009d4e;
        }
      `}</style>
    </footer>
  )
}
