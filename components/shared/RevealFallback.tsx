'use client'

import { useEffect, useRef } from 'react'

export default function RevealFallback({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Only apply JS fallback if CSS scroll-driven animations aren't supported
    if (CSS.supports('animation-timeline', 'view()')) return

    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); io.disconnect() } },
      { threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return <div className="reveal" ref={ref}>{children}</div>
}
