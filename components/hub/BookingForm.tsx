'use client'

import { useState, FormEvent } from 'react'

export default function BookingForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT
    if (!endpoint) {
      // Fallback: mailto if no Formspree endpoint configured yet
      const form = e.currentTarget
      const data = new FormData(form)
      const name = data.get('name')
      const eventType = data.get('eventType')
      const eventDate = data.get('eventDate')
      const budget = data.get('budget')
      const message = data.get('message')
      const subject = `Booking Enquiry — ${eventType} (${eventDate})`
      const body = `Name: ${name}\nEvent Type: ${eventType}\nDate: ${eventDate}\nBudget: ${budget}\n\n${message}`
      window.location.href = `mailto:stalinmatsitsa@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body as string)}`
      setStatus('success')
      return
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="form-success">
        <span>✓</span>
        <span>Booking request sent. Stalin will be in touch within 48 hours.</span>
      </div>
    )
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="name">Your Name</label>
          <input id="name" name="name" type="text" required placeholder="Full name" />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required placeholder="you@example.com" />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="eventType">Event Type</label>
          <select id="eventType" name="eventType" required defaultValue="">
            <option value="" disabled>Select type</option>
            <option>Festival</option>
            <option>Club / Venue</option>
            <option>Corporate</option>
            <option>Private Event</option>
            <option>Wedding</option>
            <option>Collaboration</option>
            <option>Other</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="eventDate">Event Date</label>
          <input id="eventDate" name="eventDate" type="date" />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="budget">Budget Range (ZAR)</label>
        <select id="budget" name="budget" required defaultValue="">
          <option value="" disabled>Select range</option>
          <option>Under R5,000</option>
          <option>R5,000 – R15,000</option>
          <option>R15,000 – R30,000</option>
          <option>R30,000 – R50,000</option>
          <option>R50,000+</option>
          <option>Let&apos;s discuss</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="message">Tell us about the event</label>
        <textarea id="message" name="message" placeholder="Location, expected attendance, vision for the performance..." />
      </div>

      {status === 'error' && (
        <div className="form-error">
          Something went wrong. Email us directly at{' '}
          <a href="mailto:stalinmatsitsa@gmail.com" style={{ color: 'var(--ember)' }}>
            stalinmatsitsa@gmail.com
          </a>
        </div>
      )}

      <div className="form-submit">
        <button
          type="submit"
          className="btn-primary"
          disabled={status === 'submitting'}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          {status === 'submitting' ? 'Sending...' : 'Send Booking Request'}
        </button>
      </div>
    </form>
  )
}
