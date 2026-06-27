import { announcements } from '@/data/announcements'

export default function AnnouncementTicker() {
  const text = announcements.join('  ·  ')
  // Four copies: animation scrolls -25% so there's always content filling the viewport
  const copies = [text, text, text, text]

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {copies.map((t, i) => (
          <span key={i} className="ticker-text">{t}&nbsp;&nbsp;·&nbsp;&nbsp;</span>
        ))}
      </div>
    </div>
  )
}
