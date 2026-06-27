'use client'

import { useEffect } from 'react'

export default function Hero() {
  // Easter egg: type "dance" → hero name pulses gold
  useEffect(() => {
    let buf = ''
    const handler = (e: KeyboardEvent) => {
      buf = (buf + e.key).slice(-5)
      if (buf === 'dance') {
        const name = document.querySelector('.hero-name') as HTMLElement
        if (!name) return
        name.style.transition = 'color 0.3s'
        name.style.color = '#E6B84A'
        setTimeout(() => {
          name.style.color = ''
          setTimeout(() => { name.style.transition = '' }, 400)
        }, 1400)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <section className="hero">
      {/* Video background — drop a file at /public/assets/hero.mp4 to activate */}
      <div className="hero-placeholder-bg" />

      <div className="hero-content">
        <p className="hero-kicker" style={{ marginBottom: '1.5rem' }}>Nkomazi · Mpumalanga · eNingizimu Afrika</p>

        <h1 className="hero-name">
          Stalin<br />
          <span className="gold">Matsitsa</span>
        </h1>

        <div className="hero-meta">
          <span>Artist</span>
          <span className="hero-meta-sep" />
          <span>Dancer</span>
          <span className="hero-meta-sep" />
          <span>Performer</span>
        </div>

        <div className="hero-ctas">
          <a href="https://open.spotify.com/artist/27eEvvtOTZDiAlAgwxqRRP" target="_blank" rel="noopener noreferrer" className="btn-primary">
            ▶ Stream
          </a>
          <a href="#book" className="btn-outline">
            Book Stalin
          </a>
        </div>
      </div>

      <div className="hero-scroll-cue">
        <div className="hero-scroll-line" />
      </div>
    </section>
  )
}
