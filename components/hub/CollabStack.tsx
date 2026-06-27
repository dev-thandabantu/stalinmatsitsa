'use client'

import { useEffect, useRef, useState } from 'react'
import { releases } from '@/data/releases'
import CollabCard from './CollabCard'

const INTERVAL = 3500

export default function CollabStack() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  const idxRef = useRef(0)

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    function scrollToIdx(i: number) {
      const cards = slider!.querySelectorAll<HTMLElement>('.collab-card')
      if (!cards[i]) return
      slider!.scrollTo({ left: cards[i].offsetLeft - slider!.offsetLeft, behavior: 'smooth' })
    }

    const tick = setInterval(() => {
      if (paused) return
      idxRef.current = (idxRef.current + 1) % releases.length
      scrollToIdx(idxRef.current)
    }, INTERVAL)

    // Reset index when user manually scrolls
    const onScroll = () => {
      const cards = slider.querySelectorAll('.collab-card')
      let closest = 0
      let minDist = Infinity
      cards.forEach((card, i) => {
        const dist = Math.abs(card.getBoundingClientRect().left - slider.getBoundingClientRect().left)
        if (dist < minDist) { minDist = dist; closest = i }
      })
      idxRef.current = closest
    }

    slider.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearInterval(tick)
      slider.removeEventListener('scroll', onScroll)
    }
  }, [paused])

  return (
    <section className="sec" id="music">
      <div className="sec-inner">
        <p className="sec-kicker">In The Room With</p>
        <h2 className="sec-heading">
          Featured<br /><span className="gold">Work.</span>
        </h2>
      </div>
      <div className="collab-slider-wrap">
        <div
          className="collab-slider"
          ref={sliderRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {releases.map(r => <CollabCard key={r.id} release={r} />)}
        </div>
      </div>
    </section>
  )
}
