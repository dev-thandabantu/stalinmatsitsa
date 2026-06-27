import { announcements } from '@/data/announcements'

export default function AnnouncementTicker() {
  const text = announcements.join(' · ')

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        <span className="ticker-text">{text} &nbsp;·&nbsp; </span>
        <span className="ticker-text">{text} &nbsp;·&nbsp; </span>
      </div>
    </div>
  )
}
