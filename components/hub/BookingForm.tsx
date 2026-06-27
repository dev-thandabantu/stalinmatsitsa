'use client'

import { useState, useRef } from 'react'

const STALIN_WHATSAPP = '27814659551'

type EventType =
  | 'Festival'
  | 'Club / Venue'
  | 'Corporate'
  | 'Private Event'
  | 'Wedding'
  | 'Collaboration'
  | 'Other'

const BUDGETS = [
  'Under R5K',
  'R5K – R15K',
  'R15K – R30K',
  'R30K – R50K',
  'R50K+',
  "Let's talk",
]

const EVENT_TYPES: EventType[] = [
  'Festival',
  'Club / Venue',
  'Corporate',
  'Private Event',
  'Wedding',
  'Collaboration',
  'Other',
]

type DateShortcut =
  | { label: string; daysFromNow: number; value?: never }
  | { label: string; value: string; daysFromNow?: never }

const DATE_SHORTCUTS: DateShortcut[] = [
  { label: 'This weekend', daysFromNow: 6 },
  { label: 'Next month', daysFromNow: 30 },
  { label: 'Date TBC', value: '' },
]

const LOCATION_SUGGESTIONS = [
  'Johannesburg',
  'Pretoria',
  'Mbombela',
  'Nkomazi',
  'Durban',
  'Cape Town',
  'Venue TBC',
]

type Answers = {
  name: string
  email: string
  eventType: EventType | ''
  date: string
  dateTbc: boolean
  location: string
  attendees: string
  collabDetails: string
  budget: string
  message: string
}

function heading(step: number, a: Answers): string {
  if (step === 1) return a.name.trim() ? `Good to meet you, ${a.name.trim().split(' ')[0]}.` : 'Igama lakho?'
  if (step === 2) return a.eventType ? `A ${a.eventType.toLowerCase()}. Got it.` : 'What kind of event?'
  if (step === 3) return a.eventType === 'Collaboration' ? 'Tell us what you are working on.' : 'When and where?'
  if (step === 4) return 'What is the budget?'
  if (step === 5) return 'Anything else?'
  return ''
}

function toDateInputValue(date: Date): string {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}

function addDays(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return toDateInputValue(d)
}

function dateShortcutValue(choice: DateShortcut): string {
  return typeof choice.daysFromNow === 'number' ? addDays(choice.daysFromNow) : choice.value
}

export default function BookingForm() {
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const [a, setA] = useState<Answers>({
    name: '', email: '', eventType: '', date: '', dateTbc: false,
    location: '', attendees: '', collabDetails: '', budget: '', message: '',
  })

  const inputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const today = toDateInputValue(new Date())
  const set = (k: keyof Answers, v: string) => setA(prev => ({ ...prev, [k]: v }))
  const skipBudget = a.eventType === 'Collaboration'
  const totalSteps = skipBudget ? 4 : 5

  function advance() {
    if (step === 1 && (!a.name.trim() || !a.email.trim())) return
    if (step === 2 && !a.eventType) return
    if (step === 3 && a.eventType !== 'Collaboration' && ((!a.date && !a.dateTbc) || !a.location.trim())) return
    const next = step + 1
    setStep(next === 4 && skipBudget ? 5 : next)
  }

  function back() {
    const prev = step - 1
    setStep(prev === 4 && skipBudget ? 3 : prev)
  }

  function openDatePicker() {
    inputRef.current?.showPicker?.()
    inputRef.current?.focus()
  }

  function sendToWhatsApp() {
    const lines: string[] = [`He wena Stalin 👀 woza uzojaiva lana, we need you at this thing.`]
    lines.push(`Name: ${a.name}`)
    if (a.email) lines.push(`Email: ${a.email}`)
    if (a.eventType) lines.push(`Event: ${a.eventType}`)
    if (a.collabDetails) lines.push(`Collab: ${a.collabDetails}`)
    if (a.dateTbc) lines.push(`Date: TBC`)
    else if (a.date) lines.push(`Date: ${a.date}`)
    if (a.location) lines.push(`Location: ${a.location}`)
    if (a.attendees) lines.push(`Attendance: ${a.attendees}`)
    if (a.budget) lines.push(`Budget: ${a.budget}`)
    if (a.message) lines.push(`Notes: ${a.message}`)
    window.open(`https://wa.me/${STALIN_WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank')
    setDone(true)
  }

  const displayStep = skipBudget && step === 5 ? 4 : step

  if (done) {
    return (
      <div className="book-success">
        <div className="book-success-check">✓</div>
        <h3>WhatsApp is open, {a.name.split(' ')[0]}.</h3>
        <p>Your message is pre-filled. Hit send and Stalin will get back to you.</p>
      </div>
    )
  }

  return (
    <div className="book-convo">
      <div className="book-steps" aria-hidden="true">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <span key={i} className={`book-step-dot${displayStep > i + 1 ? ' done' : ''}${displayStep === i + 1 ? ' active' : ''}`} />
        ))}
      </div>

      <h3 className="book-convo-heading">{heading(step, a)}</h3>

      {step === 1 && (
        <div className="book-fields" key="step1">
          <div className="book-field">
            <label htmlFor="b-name">Your name</label>
            <input id="b-name" ref={inputRef} type="text" value={a.name}
              onChange={e => set('name', e.target.value)}
              onKeyDown={e => e.key === 'Enter' && document.getElementById('b-email')?.focus()}
              placeholder="Full name" autoComplete="name" />
          </div>
          <div className="book-field">
            <label htmlFor="b-email">Your email</label>
            <input id="b-email" type="email" value={a.email}
              onChange={e => set('email', e.target.value)}
              onKeyDown={e => e.key === 'Enter' && advance()}
              placeholder="you@example.com" autoComplete="email" />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="book-cards" key="step2">
          {EVENT_TYPES.map(t => (
            <button key={t} className={`book-card${a.eventType === t ? ' selected' : ''}`}
              onClick={() => { set('eventType', t); setTimeout(() => setStep(3), 320) }}>
              {t}
            </button>
          ))}
        </div>
      )}

      {step === 3 && (
        <div className="book-fields" key="step3">
          {a.eventType === 'Collaboration' ? (
            <div className="book-field">
              <label htmlFor="b-collab">What are you working on?</label>
              <textarea id="b-collab" ref={textareaRef} value={a.collabDetails}
                onChange={e => set('collabDetails', e.target.value)}
                placeholder="Track, project, vision — give Stalin the picture." rows={4} />
            </div>
          ) : (
            <>
              <div className="book-field">
                <label htmlFor="b-date">Event date</label>
                <div className="book-date-row">
                  <input id="b-date" ref={inputRef} type="date" value={a.date} min={today}
                    onChange={e => setA(prev => ({ ...prev, date: e.target.value, dateTbc: false }))} />
                  <button className="book-picker-btn" type="button" onClick={openDatePicker} aria-label="Open date picker">Calendar</button>
                </div>
                <div className="book-chip-row">
                  {DATE_SHORTCUTS.map(c => (
                    <button key={c.label} className="book-chip" type="button" onClick={() => {
                      if (typeof c.daysFromNow === 'number') setA(prev => ({ ...prev, date: dateShortcutValue(c), dateTbc: false }))
                      else setA(prev => ({ ...prev, date: '', dateTbc: true }))
                    }}>{c.label}</button>
                  ))}
                </div>
                <p className="book-hint">{a.dateTbc ? 'Date marked as TBC.' : 'Pick the event day, or use Date TBC if it is still moving.'}</p>
              </div>
              <div className="book-field">
                <label htmlFor="b-location">City / Venue</label>
                <input id="b-location" type="text" list="booking-locations" value={a.location}
                  onChange={e => set('location', e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && advance()}
                  placeholder="e.g. Johannesburg · Bassline" autoComplete="address-level2" />
                <datalist id="booking-locations">
                  {LOCATION_SUGGESTIONS.map(l => <option key={l} value={l} />)}
                </datalist>
                <div className="book-chip-row">
                  {LOCATION_SUGGESTIONS.slice(0, 4).map(l => (
                    <button key={l} className="book-chip" type="button" onClick={() => set('location', l)}>{l}</button>
                  ))}
                </div>
              </div>
              {a.eventType === 'Festival' && (
                <div className="book-field">
                  <label htmlFor="b-attend">Expected attendance</label>
                  <input id="b-attend" type="text" value={a.attendees}
                    onChange={e => set('attendees', e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && advance()}
                    placeholder="e.g. 5,000" />
                </div>
              )}
            </>
          )}
        </div>
      )}

      {step === 4 && !skipBudget && (
        <div className="book-cards" key="step4">
          {BUDGETS.map(b => (
            <button key={b} className={`book-card${a.budget === b ? ' selected' : ''}`}
              onClick={() => { set('budget', b); setTimeout(() => setStep(5), 320) }}>
              {b}
            </button>
          ))}
        </div>
      )}

      {step === 5 && (
        <div className="book-fields" key="step5">
          <div className="book-field">
            <label htmlFor="b-msg">Anything Stalin should know? <span className="book-optional">(optional)</span></label>
            <textarea id="b-msg" ref={textareaRef} value={a.message}
              onChange={e => set('message', e.target.value)}
              placeholder="Stage setup, vibe, special requests..." rows={4} />
          </div>
        </div>
      )}

      <div className="book-nav">
        {step > 1 && (
          <button className="book-back" onClick={back} type="button">← Back</button>
        )}
        {step < 5 && step !== 2 && step !== 4 && (
          <button className="btn-primary book-next" onClick={advance} type="button"
            disabled={
              (step === 1 && (!a.name.trim() || !a.email.trim())) ||
              (step === 3 && a.eventType !== 'Collaboration' && ((!a.date && !a.dateTbc) || !a.location.trim()))
            }>
            Continue →
          </button>
        )}
        {step === 5 && (
          <button className="btn-primary book-next" onClick={sendToWhatsApp} type="button">
            Open WhatsApp →
          </button>
        )}
      </div>
    </div>
  )
}
