'use client'

import { useEffect, useRef } from 'react'

export default function TopBar() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const nav = ref.current
    if (!nav) return

    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 60)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="topbar" ref={ref}>
      <div className="topbar-name">
        Stalin <span>Matsitsa</span>
      </div>
      <nav className="topbar-nav">
        <a href="#music">Music</a>
        <a href="#watch">Watch</a>
        <a href="#stream">Stream</a>
        <a href="#book" className="btn-book">Book</a>
      </nav>
    </header>
  )
}
