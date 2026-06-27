'use client'

import { useState, useRef, useEffect } from 'react'

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
  if (step === 1) {
    return a.name.trim() ? `Good to meet you, ${a.name.trim().split(' ')[0]}.` : 'Igama lakho?'
  }
  if (step === 2) {
    return a.eventType ? `A ${a.eventType.toLowerCase()}. Got it.` : 'What kind of event?'
  }
  if (step === 3) {
    return a.eventType === 'Collaboration' ? 'Tell us what you are working on.' : 'When and where?'
  }
  if (step === 4) return 'What is the budget?'
  if (step === 5) return 'Anything else?'
  return ''
}

function toDateInputValue(date: Date): string {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return localDate.toISOString().slice(0, 10)
}

function addDays(days: number): string {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return toDateInputValue(date)
}

function dateShortcutValue(choice: DateShortcut): string {
  return typeof choice.daysFromNow === 'number' ? addDays(choice.daysFromNow) : choice.value
}

export default function BookingForm() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [a, setA] = useState<Answers>({
    name: '',
    email: '',
    eventType: '',
    date: '',
    dateTbc: false,
    location: '',
    attendees: '',
    collabDetails: '',
    budget: '',
    message: '',
  })

  const inputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // No auto-focus — would scroll page to booking section on load

  const today = toDateInputValue(new Date())
  const set = (k: keyof Answers, v: string) => setA(prev => ({ ...prev, [k]: v }))

  const totalSteps = a.eventType === 'Collaboration' ? 4 : 5
  const skipBudget = a.eventType === 'Collaboration'

  // Effective step accounting for skip (collaboration skips budget)
  function advance() {
    if (step === 1 && (!a.name.trim() || !a.email.trim())) return
    if (step === 2 && !a.eventType) return
    if (step === 3 && a.eventType !== 'Collaboration' && ((!a.date && !a.dateTbc) || !a.location.trim())) return
    const nextStep = step + 1
    // step 4 is budget — skip for collaborations, jump to 5
    if (nextStep === 4 && skipBudget) {
      setStep(5)
    } else {
      setStep(nextStep)
    }
  }

  function back() {
    const prevStep = step - 1
    if (prevStep === 4 && skipBudget) {
      setStep(3)
    } else {
      setStep(prevStep)
    }
  }

  function openDatePicker() {
    inputRef.current?.showPicker?.()
    inputRef.current?.focus()
  }

  function chooseDateShortcut(choice: DateShortcut) {
    if (typeof choice.daysFromNow === 'number') {
      setA(prev => ({ ...prev, date: dateShortcutValue(choice), dateTbc: false }))
      return
    }
    setA(prev => ({ ...prev, date: '', dateTbc: true }))
  }

  async function submit() {
    setSubmitting(true)
    setSubmitError(false)

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT

    const payload = {
      name: a.name,
      email: a.email,
      eventType: a.eventType,
      date: a.dateTbc ? 'Date TBC' : a.date,
      location: a.location,
      attendees: a.attendees,
      collabDetails: a.collabDetails,
      budget: a.budget,
      message: a.message,
    }

    if (!endpoint) {
      const subject = `Booking Enquiry — ${a.eventType}${a.date ? ` · ${a.date}` : ''}`
      const body = Object.entries(payload)
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n')
      window.location.href = `mailto:stalinmatsitsa@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setSubmitted(true)
      setSubmitting(false)
      return
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setSubmitError(true)
      }
    } catch {
      setSubmitError(true)
    }
    setSubmitting(false)
  }

  const displayStep = skipBudget && step === 5 ? 4 : step

  if (submitted) {
    return (
      <div className="book-success">
        <div className="book-success-check">✓</div>
        <h3>{a.name.split(' ')[0]}, your request is in.</h3>
        <p>
          Stalin&apos;s team will reach out within 48 hours.
          <br />
          Email{' '}
          <a href="mailto:stalinmatsitsa@gmail.com">stalinmatsitsa@gmail.com</a>
          {' '}if you need us directly.
        </p>
      </div>
    )
  }

  return (
    <div className="book-convo">

      {/* Progress dots */}
      <div className="book-steps" aria-hidden="true">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <span
            key={i}
            className={`book-step-dot${displayStep > i + 1 ? ' done' : ''}${displayStep === i + 1 ? ' active' : ''}`}
          />
        ))}
      </div>

      {/* Dynamic heading */}
      <h3 className="book-convo-heading">{heading(step, a)}</h3>

      {/* Step 1 — Name + Email */}
      {step === 1 && (
        <div className="book-fields" key="step1">
          <div className="book-field">
            <label htmlFor="b-name">Your name</label>
            <input
              id="b-name"
              ref={inputRef}
              type="text"
              value={a.name}
              onChange={e => set('name', e.target.value)}
              onKeyDown={e => e.key === 'Enter' && document.getElementById('b-email')?.focus()}
              placeholder="Full name"
              autoComplete="name"
            />
          </div>
          <div className="book-field">
            <label htmlFor="b-email">Your email</label>
            <input
              id="b-email"
              type="email"
              value={a.email}
              onChange={e => set('email', e.target.value)}
              onKeyDown={e => e.key === 'Enter' && advance()}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
        </div>
      )}

      {/* Step 2 — Event type cards */}
      {step === 2 && (
        <div className="book-cards" key="step2">
          {EVENT_TYPES.map(t => (
            <button
              key={t}
              className={`book-card${a.eventType === t ? ' selected' : ''}`}
              onClick={() => {
                set('eventType', t)
                // Auto-advance after short delay so selection is visible
                setTimeout(() => setStep(3), 320)
              }}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {/* Step 3 — Date/location or collab details */}
      {step === 3 && (
        <div className="book-fields" key="step3">
          {a.eventType === 'Collaboration' ? (
            <div className="book-field">
              <label htmlFor="b-collab">What are you working on?</label>
              <textarea
                id="b-collab"
                ref={textareaRef}
                value={a.collabDetails}
                onChange={e => set('collabDetails', e.target.value)}
                placeholder="Track, project, vision — give Stalin the picture."
                rows={4}
              />
            </div>
          ) : (
            <>
              <div className="book-field">
                <label htmlFor="b-date">Event date</label>
                <div className="book-date-row">
                  <input
                    id="b-date"
                    ref={inputRef}
                    type="date"
                    value={a.date}
                    min={today}
                    onChange={e => setA(prev => ({ ...prev, date: e.target.value, dateTbc: false }))}
                  />
                  <button className="book-picker-btn" type="button" onClick={openDatePicker} aria-label="Open date picker">
                    Calendar
                  </button>
                </div>
                <div className="book-chip-row" aria-label="Quick date choices">
                  {DATE_SHORTCUTS.map(choice => (
                    <button
                      key={choice.label}
                      className="book-chip"
                      type="button"
                      onClick={() => chooseDateShortcut(choice)}
                    >
                      {choice.label}
                    </button>
                  ))}
                </div>
                <p className="book-hint">
                  {a.dateTbc ? 'Date marked as TBC.' : 'Pick the event day, or use Date TBC if it is still moving.'}
                </p>
              </div>
              <div className="book-field">
                <label htmlFor="b-location">City / Venue</label>
                <input
                  id="b-location"
                  type="text"
                  list="booking-location-options"
                  value={a.location}
                  onChange={e => set('location', e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && advance()}
                  autoComplete="address-level2"
                  placeholder="e.g. Johannesburg · Bassline"
                />
              </div>
              <datalist id="booking-location-options">
                {LOCATION_SUGGESTIONS.map(location => (
                  <option key={location} value={location} />
                ))}
              </datalist>
              <div className="book-chip-row" aria-label="Quick location choices">
                {LOCATION_SUGGESTIONS.slice(0, 4).map(location => (
                  <button
                    key={location}
                    className="book-chip"
                    type="button"
                    onClick={() => set('location', location)}
                  >
                    {location}
                  </button>
                ))}
              </div>
              <p className="book-hint">
                A city is enough to start. Add the venue name if it is confirmed.
              </p>
              {a.eventType === 'Festival' && (
                <div className="book-field">
                  <label htmlFor="b-attend">Expected attendance</label>
                  <input
                    id="b-attend"
                    type="text"
                    value={a.attendees}
                    onChange={e => set('attendees', e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && advance()}
                    placeholder="e.g. 5,000"
                  />
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Step 4 — Budget cards (skipped for Collaboration) */}
      {step === 4 && !skipBudget && (
        <div className="book-cards" key="step4">
          {BUDGETS.map(b => (
            <button
              key={b}
              className={`book-card${a.budget === b ? ' selected' : ''}`}
              onClick={() => {
                set('budget', b)
                setTimeout(() => setStep(5), 320)
              }}
            >
              {b}
            </button>
          ))}
        </div>
      )}

      {/* Step 5 — Optional message */}
      {step === 5 && (
        <div className="book-fields" key="step5">
          <div className="book-field">
            <label htmlFor="b-msg">Anything Stalin should know? <span className="book-optional">(optional)</span></label>
            <textarea
              id="b-msg"
              ref={textareaRef}
              value={a.message}
              onChange={e => set('message', e.target.value)}
              placeholder="Stage setup, vibe, special requests..."
              rows={4}
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="book-nav">
        {step > 1 && (
          <button className="book-back" onClick={back} type="button">
            ← Back
          </button>
        )}

        {step < 5 && step !== 2 && step !== 4 && (
          <button
            className="btn-primary book-next"
            onClick={advance}
            type="button"
            disabled={
              (step === 1 && (!a.name.trim() || !a.email.trim())) ||
              (step === 3 && a.eventType !== 'Collaboration' && ((!a.date && !a.dateTbc) || !a.location.trim()))
            }
          >
            Continue →
          </button>
        )}

        {step === 5 && (
          <button
            className="btn-primary book-next"
            onClick={submit}
            type="button"
            disabled={submitting}
          >
            {submitting ? 'Sending...' : 'Send the request →'}
          </button>
        )}
      </div>

      {submitError && (
        <p className="book-error">
          Something went wrong. Email us at{' '}
          <a href="mailto:stalinmatsitsa@gmail.com">stalinmatsitsa@gmail.com</a>
        </p>
      )}
    </div>
  )
}
