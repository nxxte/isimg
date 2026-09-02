"use client"
import { useEffect, useRef, useState } from "react"
import "./appPromo.css"

const PLAY_URL =
  "https://play.google.com/store/apps/details?id=io.github.haddajidev.isimg"

const LOGO = `${process.env.PUBLIC_URL || ""}/logo.png`

/* Illustrative values for the showcase card - a demo, not real data. */
const DEMO = {
  moyenne: 14.25,
  credits: 30,
  rang: "5/42",
  unites: [
    { name: "Unité Fondamentale 1", value: 15.4, kind: "official" },
    { name: "Unité Transversale", value: 13.85, kind: "computed" },
    { name: "Unité Optionnelle", value: 12.6, kind: "simulated" },
  ],
}

const FEATURES = [
  {
    title: "Calcul de moyenne",
    desc: "Matière, unité, semestre et année recalculés dans l'app, avant publication",
    icon: (
      <>
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M8 6h8" />
        <path d="M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h4" />
      </>
    ),
  },
  {
    title: "Simulation de notes",
    desc: "Entrez une note hypothétique et voyez le résultat projeté",
    icon: (
      <>
        <path d="M21 6H3M21 12H3M21 18H3" />
        <circle cx="8" cy="6" r="2" />
        <circle cx="15" cy="12" r="2" />
        <circle cx="10" cy="18" r="2" />
      </>
    ),
  },
  {
    title: "Emploi du temps",
    desc: "Votre semaine, navigable et consultable hors ligne",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </>
    ),
  },
  {
    title: "Examens",
    desc: "La prochaine épreuve avec son compte à rebours",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    title: "Absences",
    desc: "Taux par matière et seuils d'élimination, semestre par semestre",
    icon: (
      <>
        <path d="M19 5L5 19" />
        <circle cx="6.5" cy="6.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
      </>
    ),
  },
  {
    title: "Aucun serveur",
    desc: "Connexion directe à isimg.rnu.tn, données chiffrées sur l'appareil",
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
]

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

/* Counts up to `target` once `run` flips true. */
function useCountUp(target, run, duration = 1400) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!run) return
    if (prefersReducedMotion()) {
      setValue(target)
      return
    }
    let frame
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(target * eased)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, run, duration])

  return value
}

function AppPromo() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)
  const moyenne = useCountUp(DEMO.moyenne, visible)

  /* Reveal once the section scrolls into view. */
  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`promo ${visible ? "is-visible" : ""}`}
      aria-labelledby="promo-title"
    >
      <div className="promo-aurora" aria-hidden="true" />

      <div className="promo-grid">
        <div className="promo-copy">
          <span className="promo-badge">
            <span className="promo-badge-dot" aria-hidden="true" />
            Disponible sur Android
          </span>

          <div className="promo-head">
            <span className="promo-logo-wrap">
              <img
                className="promo-logo"
                src={LOGO}
                width="72"
                height="72"
                loading="lazy"
                decoding="async"
                alt="Logo de l'application ISIMG Student"
              />
            </span>
            <span className="promo-head-text">
              <h2 className="promo-title" id="promo-title">
                ISIMG Student
              </h2>
              <span className="promo-tagline">
                Application mobile · non officielle
              </span>
            </span>
          </div>

          <p className="promo-lead">
            <strong>Calculez votre moyenne directement dans l'app</strong> - avant
            même que l'école ne la publie - avec votre emploi du temps, vos
            examens et vos absences au même endroit.
          </p>

          <ul className="promo-features">
            {FEATURES.map((feature, i) => (
              <li className="promo-feature" key={feature.title} style={{ "--i": i }}>
                <span className="promo-feature-icon" aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {feature.icon}
                  </svg>
                </span>
                <span className="promo-feature-text">
                  <span className="promo-feature-title">{feature.title}</span>
                  <span className="promo-feature-desc">{feature.desc}</span>
                </span>
              </li>
            ))}
          </ul>

          <a
            className="promo-cta"
            href={PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="promo-cta-icon" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="currentColor"
              >
                <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
              </svg>
            </span>
            <span className="promo-cta-text">
              <span className="promo-cta-kicker">Télécharger sur</span>
              <span className="promo-cta-label">Google Play</span>
            </span>
          </a>

          <p className="promo-note">
            Gratuite · sans publicité · utilise votre compte ISIMG existant
          </p>
        </div>

        {/* Decorative illustration of the in-app average calculator. */}
        <figure
          className="promo-showcase"
          role="img"
          aria-label="Illustration : la fiche de moyenne de l'application, avec une moyenne estimée de 14,25 sur 20 et le détail par unité."
        >
          <div className="promo-calc">
            <div className="promo-calc-top">
              <span className="promo-calc-label">Moyenne générale</span>
              <span className="promo-calc-chip">estimée</span>
            </div>

            <div className="promo-calc-value">
              <span className="promo-calc-number">{moyenne.toFixed(2)}</span>
              <span className="promo-calc-scale">/ 20</span>
            </div>

            <div className="promo-calc-meta">
              <span>
                <b>{DEMO.credits}</b> crédits
              </span>
              <span className="promo-calc-sep" />
              <span>
                Rang <b>{DEMO.rang}</b>
              </span>
            </div>

            <ul className="promo-calc-units">
              {DEMO.unites.map((unit, i) => (
                <li
                  className={`promo-unit is-${unit.kind}`}
                  key={unit.name}
                  style={{ "--i": i, "--fill": `${(unit.value / 20) * 100}%` }}
                >
                  <span className="promo-unit-top">
                    <span className="promo-unit-name">{unit.name}</span>
                    <span className="promo-unit-value">
                      {unit.value.toFixed(2)}
                    </span>
                  </span>
                  <span className="promo-unit-track">
                    <span className="promo-unit-bar" />
                  </span>
                </li>
              ))}
            </ul>

            <p className="promo-calc-foot">
              <span className="promo-key promo-key--official" /> publiée
              <span className="promo-key promo-key--computed" /> calculée
              <span className="promo-key promo-key--simulated" /> simulée
            </p>
          </div>

          <figcaption className="promo-showcase-cap">
            Aperçu - exemple de calcul
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

export default AppPromo
