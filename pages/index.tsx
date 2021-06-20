import Layout from "@components/Layout"
import DownloadButton from "@components/DownloadButton"

export default function IndexPage() {
  return (
    <Layout title="Lawnchair App">
      {/* Hero section */}
      <div className="hero pt-24 px-36 text-white">
        <img
          src="/images/lawnchair-icon.webp"
          alt="Lawnchair icon"
          className="rounded-full w-32"
        />
        <p className="text-4xl font-bold font-sans-alt mt-7">Lawnchair</p>
        <p className="text-2xl font-medium font-sans-alt mt-3">
          No clever tagline needed.
        </p>
        <div className="mt-10 flex flex-row space-x-6">
          <DownloadButton link="https://play.google.com/store/apps/details?id=ch.deletescape.lawnchair.plah">
            <img
              src="/images/google-play-icon-1.svg"
              alt="Google Play icon"
              className="mr-2"
            />{" "}
            <span className="text-base font-medium">Google Play</span>
          </DownloadButton>
          <DownloadButton link="https://f-droid.org/packages/ch.deletescape.lawnchair.plah">
            <img
              src="/images/f-droid-logo-1.svg"
              alt="F-Droid logo"
              className="mr-2"
              style={{ filter: "grayscale(1)" }}
            />{" "}
            <span className="text-base font-medium mr-2">F-Droid</span>
          </DownloadButton>
          <DownloadButton link="https://www.apkmirror.com/apk/deletescape/lawnchair">
            <img
              src="/images/apk-mirror-logo-1.png"
              alt="APKMirror logo"
              className="mr-4 w-10"
              style={{ filter: "invert(0.8)" }}
            />{" "}
            <span className="text-base font-medium">APKMirror</span>
          </DownloadButton>
        </div>
      </div>

      <style jsx>{`
        .hero {
          background: no-repeat fixed url("/images/hero-bg.svg");
          background-size: cover;
          min-height: calc(100vh - 70px);
        }
      `}</style>
    </Layout>
  )
}
