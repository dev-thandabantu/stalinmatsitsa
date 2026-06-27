'use client'

import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // canplaythrough = enough buffered to play without stalling
    const onReady = () => setVideoReady(true)
    video.addEventListener('canplaythrough', onReady, { once: true })

    // Fallback: if already buffered when we mount (cache hit)
    if (video.readyState >= 4) setVideoReady(true)

    return () => video.removeEventListener('canplaythrough', onReady)
  }, [])

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
      {/* Static placeholder — always present, fades out when video is ready */}
      <div
        className="hero-stage-bg hero-static-bg"
        aria-hidden="true"
        style={{ opacity: videoReady ? 0 : 1 }}
      />

      {/* Video — invisible until canplaythrough, then fades in */}
      <video
        ref={videoRef}
        className="hero-stage-bg hero-video"
        src="/assets/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        style={{ opacity: videoReady ? 1 : 0 }}
      />

      <div className="hero-stage-sweep" aria-hidden="true" />
      <div className="hero-rhythm" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

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

        <div className="hero-proof" aria-label="Artist highlights">
          <span>277K followers</span>
          <span>3.1M likes</span>
          <span>Dancer-led performance</span>
        </div>
      </div>

      <div className="hero-scroll-cue">
        <div className="hero-scroll-line" />
      </div>
    </section>
  )
}
