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
  const openedAt = useRef(0)

  // Stable ref so event listeners always call the latest version
  const triggerRef = useRef<(egg: EggConfig) => void>(() => {})

  triggerRef.current = (egg: EggConfig) => {
    openedAt.current = Date.now()
    if (sessionStorage.getItem('egg_' + egg.id) === '1') {
      setActiveEgg(egg)
      setPhase('already')
      setTimeout(() => setPhase('idle'), 2200)
      return
    }
    sessionStorage.setItem('egg_' + egg.id, '1')
    window.posthog?.capture('egg_found', { egg_id: egg.id, ticket_num: egg.ticketNum })
    setActiveEgg(egg)
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
  }

  function closeOverlay() {
    setPhase('idle')
    setActiveEgg(null)
  }

  function submitRiddle() {
    const val = riddleInput.trim().toLowerCase().replace(/[^a-z]/g, '')
    if (val === 'myeke' || val === 'ngimyeke') {
      setPhase('ticket')
    } else {
      window.posthog?.capture('egg_riddle_failed')
      setRiddleError('Hayi. Lalela futhi.')
      setRiddleShake(true)
      setTimeout(() => { setRiddleShake(false); setRiddleInput('') }, 700)
    }
  }

  useEffect(() => {
    // Egg 1 — hidden button on Watch heading
    const egg1 = document.getElementById('egg-lyric')
    const onEgg1 = () => triggerRef.current(EGGS[0])
    egg1?.addEventListener('click', onEgg1)

    // Egg 2 — tap 277K chip 7 times
    const chip = document.querySelector('[data-egg="tiktok"]') as HTMLElement | null
    const onChip = () => {
      tiktokCount.current += 1
      if (tiktokCount.current === 7) {
        tiktokCount.current = 0
        chip?.classList.add('egg-pulse')
        setTimeout(() => chip?.classList.remove('egg-pulse'), 700)
        setTimeout(() => triggerRef.current(EGGS[1]), 400)
      }
    }
    if (chip) {
      chip.style.cursor = 'pointer'
      chip.addEventListener('click', onChip)
    }

    // Egg 3 — hold press photo 3s
    const photo = document.querySelector('[data-egg="photo"]') as HTMLElement | null
    const ripple = document.createElement('div')
    ripple.className = 'egg-ripple'

    const onPointerDown = () => {
      ripple.classList.add('active')
      dancerTimer.current = setTimeout(() => {
        ripple.classList.remove('active')
        triggerRef.current(EGGS[2])
      }, 3000)
    }
    const onPointerCancel = () => {
      if (dancerTimer.current) clearTimeout(dancerTimer.current)
      ripple.classList.remove('active')
    }

    if (photo) {
      photo.appendChild(ripple)
      photo.addEventListener('pointerdown', onPointerDown)
      photo.addEventListener('pointerup', onPointerCancel)
      photo.addEventListener('pointerleave', onPointerCancel)
    }

    // Egg 4 — click "undeniable"
    const reader = document.getElementById('egg-reader')
    const onReader = () => triggerRef.current(EGGS[3])
    reader?.addEventListener('click', onReader)

    return () => {
      egg1?.removeEventListener('click', onEgg1)
      chip?.removeEventListener('click', onChip)
      photo?.removeEventListener('pointerdown', onPointerDown)
      photo?.removeEventListener('pointerup', onPointerCancel)
      photo?.removeEventListener('pointerleave', onPointerCancel)
      reader?.removeEventListener('click', onReader)
      ripple.remove()
      if (dancerTimer.current) clearTimeout(dancerTimer.current)
    }
  }, [])

  if (phase === 'idle') return null

  return (
    <div className="egg-overlay" onClick={(e) => { if (e.target === e.currentTarget && Date.now() - openedAt.current > 400) closeOverlay() }}>
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
