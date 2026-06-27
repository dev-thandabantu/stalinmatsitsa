'use client'

import { useState } from 'react'

const VIDEO_ID = '2u_IoTKR15w'

export default function WatchSection() {
  const [loaded, setLoaded] = useState(false)

  return (
    <section className="sec" id="watch">
      <div className="sec-inner">
        <div className="watch-grid">
          <div>
            <div className="watch-embed-wrap">
              {loaded ? (
                <iframe
                  src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Ngeke Ngimyeke"
                />
              ) : (
                <div
                  className="watch-thumb"
                  onClick={() => setLoaded(true)}
                  style={{ backgroundImage: 'url(/assets/watch-thumb.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <div className="watch-play-btn">▶</div>
                </div>
              )}
            </div>
            <p className="watch-caption">
              Ngeke Ngimyeke — Mduduzi Ncube · Big Zulu · Fanatic SA · Stalin Matsitsa · Caeser · Ayanda Art
            </p>
          </div>

          <div className="watch-text">
            <p className="sec-kicker">Watch</p>
            {/* egg-lyric wraps the whole heading — large tap target, no hidden button */}
            <h2 className="sec-heading" id="egg-lyric" style={{ cursor: 'default' }}>
              Ngeke<br />
              <span className="gold">Ngimyeke.</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}
