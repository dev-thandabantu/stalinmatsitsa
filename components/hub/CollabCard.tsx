import Image from 'next/image'
import { Release } from '@/data/releases'

export default function CollabCard({ release }: { release: Release }) {
  const artistsParts = release.artists.split(' · ')
  const highlighted = release.artistHighlights

  return (
    <a
      href={release.spotifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="collab-card"
    >
      {release.coverUrl && (
        <div className="collab-cover-wrap">
          <Image
            src={release.coverUrl}
            alt={release.title}
            width={100}
            height={100}
            className="collab-cover"
            unoptimized
          />
        </div>
      )}
      <div className="collab-left">
        <div className="collab-title">{release.title}</div>
        <div className="collab-artists">
          {artistsParts.map((artist, i) => {
            const isHighlighted = highlighted.some(h => artist.includes(h))
            return (
              <span key={i}>
                {i > 0 && <span style={{ color: 'var(--faded)' }}> · </span>}
                {isHighlighted ? <strong>{artist}</strong> : artist}
              </span>
            )
          })}
        </div>
      </div>
      <div className="collab-right">
        <span className="collab-year">{release.year}</span>
        <span className="collab-arrow">↗</span>
      </div>
    </a>
  )
}
