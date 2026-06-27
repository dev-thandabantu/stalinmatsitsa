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
            <h2 className="sec-heading">
              Ngeke<br />
              <span className="gold" style={{ position: 'relative' }}>
                Ngimyeke.
                <button id="egg-lyric" className="egg egg-lyric" aria-hidden="true" tabIndex={-1} />
              </span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}
