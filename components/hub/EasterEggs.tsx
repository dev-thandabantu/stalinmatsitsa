'use client'

import { useEffect, useRef, useState } from 'react'

type EggId = 'lyric' | 'tiktok' | 'dancer' | 'reader'

interface EggConfig {
  id: EggId
  ticketNum: number
  intro: string
  introSub?: string
  oneliner: string
  onelinerSub: string
}

const EGGS: EggConfig[] = [
  {
    id: 'lyric',
    ticketNum: 1,
    intro: '',
    oneliner: 'Yebo. Wazi iculo lami.',
    onelinerSub: 'You know my song.',
  },
  {
    id: 'tiktok',
    ticketNum: 2,
    intro: '',
    oneliner: "Sawubona. You've been here a while, bhuti.",
    onelinerSub: '',
  },
  {
    id: 'dancer',
    ticketNum: 3,
    intro: 'Usuzwile.',
    introSub: 'You felt it.',
    oneliner: 'Umzimba uyazi.',
    onelinerSub: 'The body knows.',
  },
  {
    id: 'reader',
    ticketNum: 4,
    intro: 'Sharp.',
    introSub: 'Not everyone catches that.',
    oneliner: 'Ufunda kahle.',
    onelinerSub: 'You read well.',
  },
]

type Phase = 'idle' | 'riddle' | 'intro' | 'ticket' | 'already'

export default function EasterEggs() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [activeEgg, setActiveEgg] = useState<EggConfig | null>(null)
  const [riddleInput, setRiddleInput] = useState('')
  const [riddleShake, setRiddleShake] = useState(false)
  const [riddleError, setRiddleError] = useState('')
  const tiktokCount = useRef(0)
  const dancerTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rippleRef = useRef<HTMLDivElement | null>(null)

  function alreadyFound(id: EggId) {
    return sessionStorage.getItem('egg_' + id) === '1'
  }

  function markFound(id: EggId) {
    sessionStorage.setItem('egg_' + id, '1')
  }

  function triggerEgg(egg: EggConfig) {
    setActiveEgg(egg)
    if (alreadyFound(egg.id)) {
      setPhase('already')
      setTimeout(() => setPhase('idle'), 2200)
      return
    }
    if (egg.id === 'lyric') {
      setRiddleInput('')
      setRiddleError('')
      setPhase('riddle')
    } else if (egg.intro) {
      setPhase('intro')
      setTimeout(() => setPhase('ticket'), 2600)
    } else {
      setPhase('ticket')
    }
    markFound(egg.id)
  }

  function closeOverlay() {
    setPhase('idle')
    setActiveEgg(null)
  }

  function submitRiddle() {
    const val = riddleInput.trim().toLowerCase().replace(/[^a-z]/g, '')
    if (val === 'myeke' || val === 'ngimyeke') {
      setPhase('ticket')
      markFound('lyric')
    } else {
      setRiddleError('Hayi. Lalela futhi.')
      setRiddleShake(true)
      setTimeout(() => { setRiddleShake(false); setRiddleInput('') }, 700)
    }
  }

  useEffect(() => {
    // Egg 1 — lyric: hidden button on watch heading (added via WatchSection)
    const egg1 = document.getElementById('egg-lyric')
    if (egg1) {
      egg1.addEventListener('click', () => triggerEgg(EGGS[0]))
    }

    // Egg 2 — tiktok: 7 taps on 277K chip
    const chip = document.querySelector('[data-egg="tiktok"]') as HTMLElement | null
    if (chip) {
      chip.style.cursor = 'pointer'
      chip.addEventListener('click', () => {
        tiktokCount.current += 1
        if (tiktokCount.current === 7) {
          tiktokCount.current = 0
          chip.classList.add('egg-pulse')
          setTimeout(() => chip.classList.remove('egg-pulse'), 700)
          setTimeout(() => triggerEgg(EGGS[1]), 400)
        }
      })
    }

    // Egg 3 — dancer: 3s hold on press photo
    const photo = document.querySelector('[data-egg="photo"]') as HTMLElement | null
    if (photo) {
      photo.style.cursor = 'pointer'

      const ripple = document.createElement('div')
      ripple.className = 'egg-ripple'
      photo.parentElement?.appendChild(ripple)
      rippleRef.current = ripple

      photo.addEventListener('pointerdown', () => {
        ripple.classList.add('active')
        dancerTimer.current = setTimeout(() => {
          ripple.classList.remove('active')
          triggerEgg(EGGS[2])
        }, 3000)
      })

      const cancel = () => {
        if (dancerTimer.current) clearTimeout(dancerTimer.current)
        ripple.classList.remove('active')
      }
      photo.addEventListener('pointerup', cancel)
      photo.addEventListener('pointerleave', cancel)
      photo.addEventListener('pointermove', cancel)
    }

    // Egg 4 — reader: click "undeniable" span
    const reader = document.getElementById('egg-reader')
    if (reader) {
      reader.addEventListener('click', () => triggerEgg(EGGS[3]))
    }

    return () => {
      if (dancerTimer.current) clearTimeout(dancerTimer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (phase === 'idle') return null

  return (
    <div className="egg-overlay" onClick={(e) => { if (e.target === e.currentTarget) closeOverlay() }}>
      <div className="egg-card">
        <button className="egg-card-close" onClick={closeOverlay} aria-label="Close">&times;</button>

        {phase === 'already' && (
          <p className="egg-already">Usuwutholile lo.</p>
        )}

        {phase === 'riddle' && (
          <div className="egg-riddle">
            <p className="egg-riddle-prompt">Finish it, bra.</p>
            <p className="egg-riddle-lyric">&ldquo;Ngeke ngi___&rdquo;</p>
            <div className={`egg-riddle-input-wrap ${riddleShake ? 'shake' : ''}`}>
              <input
                className="egg-riddle-input"
                value={riddleInput}
                onChange={e => { setRiddleInput(e.target.value); setRiddleError('') }}
                onKeyDown={e => { if (e.key === 'Enter') submitRiddle() }}
                placeholder="type your answer..."
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
              <button className="egg-riddle-submit" onClick={submitRiddle}>Submit</button>
            </div>
            {riddleError && <p className="egg-riddle-error">{riddleError}</p>}
          </div>
        )}

        {phase === 'intro' && activeEgg && (
          <div className="egg-intro">
            <p className="egg-intro-main">{activeEgg.intro}</p>
            {activeEgg.introSub && <p className="egg-intro-sub">{activeEgg.introSub}</p>}
          </div>
        )}

        {phase === 'ticket' && activeEgg && (
          <div className="egg-ticket">
            <p className="egg-ticket-label">Amabhonasi</p>
            <p className="egg-ticket-oneliner">{activeEgg.oneliner}</p>
            {activeEgg.onelinerSub && <p className="egg-ticket-oneliner-sub">{activeEgg.onelinerSub}</p>}
            <div className="egg-ticket-divider" />
            <p className="egg-ticket-num">TICKET #{activeEgg.ticketNum}</p>
            <p className="egg-ticket-cta">
              Screenshot this. DM @stalinmatsitsa on TikTok or Instagram. He picks 4.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
