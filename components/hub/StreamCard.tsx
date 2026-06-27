import { StreamPlatform } from '@/data/streams'

export default function StreamCard({ platform }: { platform: StreamPlatform }) {
  return (
    <a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      className="stream-card"
    >
      <span className="stream-icon">{platform.icon}</span>
      <div className="stream-info">
        <div className="stream-name">{platform.name}</div>
        <div className="stream-sub">{platform.sub}</div>
      </div>
      <span className="stream-arrow">↗</span>
    </a>
  )
}
