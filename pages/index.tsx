import Layout from "@components/Layout"
import DownloadButton from "@components/DownloadButton"
import clsx from "clsx"

export default function IndexPage() {
  return (
    <Layout title="Lawnchair App">
      {/* Hero section */}
      <div className={clsx("hero text-white pt-28 px-8", "md:pt-24 md:px-36")}>
        <img
          src="/images/lawnchair-icon.webp"
          alt="Lawnchair icon"
          className={clsx("rounded-full w-28", "md:w-32")}
        />
        <p className="text-4xl font-bold font-sans-alt mt-7">Lawnchair</p>
        <p className="text-2xl font-medium font-sans-alt mt-3">
          No clever tagline needed.
        </p>
        <div
          className={clsx(
            "mt-12 flex flex-wrap flex-row space-y-4",
            "md:space-x-6",
            "md:space-y-0"
          )}
        >
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
              className="mr-4 w-10 my-3 md:my-0"
              style={{ filter: "invert(0.8)" }}
            />{" "}
            <span className="text-base font-medium">APKMirror</span>
          </DownloadButton>
        </div>
      </div>

      <FeatureSection
        imgSrc="/images/preview-screenshot-1.png"
        imgAlt="Preview screenshot 1"
        direction="ltr"
        headerText="No clever tagline needed"
        bodyText="Yup. Get it? Lawnchair. It's a bad pun, we know. Lawnchair is a
                  supercharged version of the AOSP Launcher you know and love. Being
                  an open-source project, you get all the latest Pixel Launcher
                  features shipped by Google in their latest Android release, plus
                  added customisablity. The best part? No root required. 🥳"
      />
      <FeatureSection
        imgSrc="/images/preview-screenshot-2.png"
        imgAlt="Preview screenshot 2"
        direction="rtl"
        headerText="Fully customizable"
        bodyText="Icon size, label, rows, and columns are all adjustable.
                  Lawnchair also supports icon packs, and the Pill is customizable
                  as well. These aren't the only features, and more are added
                  regularly."
      />
      <FeatureSection
        imgSrc="/images/android-robot-logo.svg"
        imgAlt="Android logo"
        direction="ltr"
        headerText="Latest Android features"
        bodyText="Icon size, label, rows, and columns are all adjustable.
                  Lawnchair also supports icon packs, and the Pill is customizable as well.
                  These aren't the only features, and more are added regularly."
      />

      <style jsx>{`
        .hero {
          background: no-repeat fixed url("/images/hero-bg.svg");
          background-size: cover;
          min-height: calc(100vh - 70px);
        }
        .
      `}</style>
    </Layout>
  )
}

type FeatureSectionProps = {
  imgSrc: string
  imgAlt?: string
  className?: string
  direction: "ltr" | "rtl"
  headerText?: string
  bodyText?: string
}

function FeatureSection({
  imgSrc,
  imgAlt,
  className,
  direction,
  headerText,
  bodyText,
}: FeatureSectionProps) {
  return (
    <div
      className={clsx(
        "md:px-56 md:py-28 px-8 py-16 flex flex-col",
        direction === "ltr" ? "md:flex-row" : "md:flex-row-reverse",
        className
      )}
    >
      <img
        src={imgSrc}
        alt={imgAlt}
        className={clsx(
          "w-96 place-self-center md:place-self-start",
          direction === "ltr" ? "md:mr-20" : "md:ml-20"
        )}
      />
      <div className="flex flex-col">
        <p className="text-2xl font-medium md:mt-32 mt-16">{headerText}</p>
        <p className="text-xl font-light mt-6 leading-8">{bodyText}</p>
      </div>

      <style jsx>{`
        img {
          filter: drop-shadow(0px 12px 20px rgba(0, 0, 0, 0.4));
        }
      `}</style>
    </div>
  )
}
