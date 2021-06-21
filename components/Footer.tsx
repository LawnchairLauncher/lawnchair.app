// (c) 2021 Raphael Tang
// This code is licensed under MIT license (see LICENSE for details)

export default function Footer() {
  return (
    <footer className="py-3">
      <p className="ml-36 text-base px-5 py-2 inline-block rounded-full text-gray-300">
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
