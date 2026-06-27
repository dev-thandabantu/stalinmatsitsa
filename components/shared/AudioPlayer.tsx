'use client'

import { useEffect, useRef, useState } from 'react'

export default function AudioPlayer() {
  const [visible, setVisible] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('0:00')
  const [duration, setDuration] = useState('0:00')
  const audioRef = useRef<HTMLAudioElement>(null)

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    const onScroll = () => {
      if (dismissed) return
      setVisible(window.scrollY > window.innerHeight * 0.6)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dismissed])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
        setCurrentTime(formatTime(audio.currentTime))
      }
    }
    const onLoadedMetadata = () => setDuration(formatTime(audio.duration))

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) { audio.pause(); setPlaying(false) }
    else { audio.play().then(() => setPlaying(true)).catch(() => {}) }
  }

  const dismiss = () => {
    audioRef.current?.pause()
    setPlaying(false)
    setVisible(false)
    setDismissed(true)
  }

  return (
    <>
      {/* Audio element — swap src with a real file when available */}
      <audio ref={audioRef} src="/audio/preview.mp3" preload="none" />

      <div className={`audio-player${visible ? ' visible' : ''}`}>
        <button className="audio-play-btn" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? '⏸' : '▶'}
        </button>

        <div className="audio-track-info">
          <div className="audio-track-name">Ngeke Ngimyeke</div>
          <div className="audio-track-sub">Stalin Matsitsa · ft. Big Zulu, Mduduzi Ncube</div>
        </div>

        <div className="audio-progress">
          <div className="audio-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <span className="audio-time">{currentTime} / {duration}</span>

        <button className="audio-close" onClick={dismiss} aria-label="Close player">×</button>
      </div>
    </>
  )
}
