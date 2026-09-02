"use client"
import "./appPromo.css"

const PLAY_URL =
  "https://play.google.com/store/apps/details?id=io.github.haddajidev.isimg"

const LOGO = `${process.env.PUBLIC_URL || ""}/logo.png`

/* Compact top-of-page banner. The whole bar is one link, so the "button" is a
   styled span rather than a nested interactive element. */
function AppBanner() {
  return (
    <a
      className="appbar"
      href={PLAY_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="ISIMG Student sur Google Play — télécharger l'application Android"
    >
      <span className="appbar-sheen" aria-hidden="true" />

      <img
        className="appbar-logo"
        src={LOGO}
        width="40"
        height="40"
        decoding="async"
        alt=""
      />

      <span className="appbar-text">
        <span className="appbar-name">
          ISIMG Student
          <span className="appbar-pill">Android</span>
        </span>
        <span className="appbar-sub">Calculez votre moyenne sur mobile</span>
      </span>

      <span className="appbar-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
        </svg>
        Télécharger
      </span>
    </a>
  )
}

export default AppBanner
