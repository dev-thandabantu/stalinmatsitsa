'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import '../../styles/letter.css'

const ARTIFACTS: Record<string, { title: string; body: string }> = {
  firsttime: {
    title: 'The first time',
    body: 'You were both around nineteen or twenty. Same father, different lives, different countries. The meeting happened late — later than it should have. But it happened.',
  },
  nkomazi: {
    title: 'Nkomazi',
    body: 'A municipality in Ehlanzeni District, Mpumalanga. Sugarcane fields. Crocodile River. A place that made a person before the world knew his name.',
  },
  ukudansa: {
    title: 'Ukudansa',
    body: 'To dance in isiZulu. Stalin danced before he sang. That order matters — it means the body was always the first instrument. The voice came second.',
  },
  tiktok: {
    title: '277K abalandeli',
    body: 'Followers found him because something in the movement refused to be ignored. Three million people pressed the heart. None of them knew him. All of them felt him.',
  },
  baba: {
    title: 'Ubaba',
    body: 'Father. The word that connects two people who grew up not knowing each other — one in Zimbabwe, one in South Africa — until they were already almost men.',
  },
  court: {
    title: 'The court wedding',
    body: 'Stalin got married. Brighton was not there — he was far away, building something, missing things. That is the condition of distance: you hear about the chapters instead of living them.',
  },
  maskandi: {
    title: 'Maskandi',
    body: 'A Zulu guitar tradition rooted in migrant worker culture — men who left home and carried their grief and longing on a stringed instrument. Stalin carries it forward without losing it.',
  },
}

export default function LetterPage() {
  const progressRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const [popover, setPopover] = useState<{ key: string; x: number; y: number } | null>(null)

  // Progress bar
  useEffect(() => {
    const bar = progressRef.current
    if (!bar) return
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      bar.style.width = total > 0 ? `${(window.scrollY / total) * 100}%` : '0%'
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  // Fallback fade-in for browsers without scroll-driven animations
  useEffect(() => {
    if (CSS.supports('animation-timeline', 'view()')) return
    const els = document.querySelectorAll<HTMLElement>('.fade')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add('visible'); io.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Close popover on outside click
  useEffect(() => {
    if (!popover) return
    const handler = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) setPopover(null)
    }
    window.addEventListener('mousedown', handler)
    return () => window.removeEventListener('mousedown', handler)
  }, [popover])

  const openArtifact = (key: string, e: React.MouseEvent) => {
    e.preventDefault()
    if (popover?.key === key) { setPopover(null); return }
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    setPopover({ key, x: rect.left, y: rect.bottom + window.scrollY + 8 })
  }

  const art = popover ? ARTIFACTS[popover.key] : null

  return (
    <div className="letter-page">
      <div className="letter-progress" ref={progressRef} />

      {/* Popover */}
      {art && (
        <div
          ref={popoverRef}
          className={`popover open`}
          style={{ left: Math.min(popover!.x, window.innerWidth - 340), top: popover!.y }}
        >
          <button className="popover-close" onClick={() => setPopover(null)}>×</button>
          <div className="popover-title">{art.title}</div>
          <div className="popover-body">{art.body}</div>
        </div>
      )}

      {/* Hero */}
      <section className="letter-hero">
        <p className="letter-kicker fade">Johannesburg · Mpumalanga · June 2026</p>
        <h1 className="letter-title fade">Stalin.</h1>
        <p className="letter-sub fade">
          A letter from your brother, who has been watching from a distance and thinking about what to say for longer than he would like to admit.
        </p>
      </section>

      {/* Letter body */}
      <article className="letter-article">

        <div className="stanza fade">
          <p>
            We met when we were already{' '}
            <button className="artifact" onClick={e => openArtifact('firsttime', e)}>almost men</button>.
            That is the strange thing about us — we did not grow up together, but we are
            connected by the one person who made both of us.{' '}
            <button className="artifact" onClick={e => openArtifact('baba', e)}>Ubaba</button>.
            I do not say that to make it heavier than it is. I say it because it is the
            honest starting point. Two people who share the most fundamental thing —
            blood, a father, a name somewhere in the lineage — who only found each other
            as adults.
          </p>
          <p>
            There is something both strange and right about that. Strange because
            siblings should know each other young, should have the shared embarrassments
            and the inside jokes. Right because when you meet someone that way — as a
            grown person, already formed — you see them whole. Not in fragments. Not
            building a picture slowly. You see the person they became.
          </p>
          <p>
            And what I see is someone who became something real.
          </p>
        </div>

        <div className="divider fade" />

        <div className="stanza fade">
          <div className="section-head">
            <span className="section-tag">Umzimba kuqala</span>
            <h2>The body knew before the rest of you did</h2>
          </div>
          <p>
            You were a dancer before you were a recording artist. I think people
            who have only found you on TikTok or Spotify know you as the guy who
            makes music — but the people who saw you before that know the truth:
            the{' '}
            <button className="artifact" onClick={e => openArtifact('ukudansa', e)}>ukudansa</button>{' '}
            came first. Your body was performing before your voice was on a track.
          </p>
          <p>
            That order matters. It means the music was never just about sound —
            it was always about movement, presence, the physical thing you do when
            you enter a space. I have seen artists who perform their songs like
            they are reading off a page. You do not do that. There is something
            in you that needs to move.
          </p>
          <p>
            I think about{' '}
            <button className="artifact" onClick={e => openArtifact('nkomazi', e)}>where you come from</button>{' '}
            — and I think that is not a coincidence. Nkomazi does not produce
            people who perform distance. It produces people who bring the whole
            thing. The whole body. The whole spirit.
          </p>
        </div>

        <div className="rupture fade">
          <p className="rupture-text">
            <strong>Isigqi sakhe asikhohlikali.</strong><br />
            The rhythm of him is not forgettable.
          </p>
        </div>

        <div className="stanza fade">
          <div className="section-head">
            <span className="section-tag">Indlela</span>
            <h2>What I have watched you build</h2>
          </div>
          <p>
            <button className="artifact" onClick={e => openArtifact('tiktok', e)}>Three million people</button>{' '}
            pressed the heart on your videos. Three million. None of them know
            your father. None of them know{' '}
            <button className="artifact" onClick={e => openArtifact('nkomazi', e)}>where you grew up</button>.
            None of them understand the specific combination of things that made you —
            the{' '}
            <button className="artifact" onClick={e => openArtifact('maskandi', e)}>Maskandi</button>{' '}
            tradition, the Amapiano wave you are riding and helping to build, the
            Afropop instincts underneath it all. They do not know any of that.
            They just felt something and responded.
          </p>
          <p>
            That is the highest thing in this work. When someone who knows nothing
            about you still stops. Still saves. Still sends the video to a friend.
          </p>
          <p>
            Big Zulu knows your name. Mduduzi Ncube records with you. Sdala B puts
            you on tracks. These are not small things. These are not given. These
            are earned by showing up with something worth collaborating on.
          </p>
        </div>

        <div className="divider fade" />

        <div className="stanza fade">
          <div className="section-head">
            <span className="section-tag">Ubunye</span>
            <h2>What I do not get to see</h2>
          </div>
          <p>
            I was not at{' '}
            <button className="artifact" onClick={e => openArtifact('court', e)}>the wedding</button>.
            I heard about it after. That is the condition of distance between us —
            not coldness, just geography and the gaps that open up when two people
            are building their lives simultaneously in different places.
          </p>
          <p>
            You have never been to Zimbabwe. I have never been to Nkomazi. We carry
            knowledge of each other that is partial, pieced together from moments
            and updates and the specific kind of attention you pay to someone you
            are genuinely curious about.
          </p>
          <p>
            I think about that sometimes. How you and I could pass each other on a
            street and a stranger would not know we are brothers. And yet — the
            connection is there. Not diminished by the distance. Not made smaller
            by the years we did not have. Just present, in the specific way that
            blood is: quietly, without needing to announce itself.
          </p>
        </div>

        <div className="rupture fade">
          <p className="rupture-text">
            We did not grow up together.<br />
            <strong>We grew into each other.</strong>
          </p>
        </div>

        <div className="stanza fade">
          <div className="section-head">
            <span className="section-tag">Isipho</span>
            <h2>Why I built this</h2>
          </div>
          <p>
            This site is not a project. It is not a portfolio piece for me.
            It is an attempt to give you something you do not yet have but need:
            a place on the internet that is entirely, correctly, undeniably yours.
          </p>
          <p>
            Right now your name is scattered across platforms with different spellings.
            &ldquo;Stallin.&rdquo; &ldquo;Starlin.&rdquo; Your streams are split because the systems that
            should be counting your plays are counting different people. That is
            a problem I can fix. So I fixed it.
          </p>
          <p>
            But more than that — I wanted to build something that felt like it
            came from inside the culture. Not a template. Not a generic artist
            site that could belong to anyone. Something that says
            <em> Nkomazi</em>, <em>Mpumalanga</em>, <em>eNingizimu Afrika</em> —
            and means it.
          </p>
          <p>
            You deserve a home on the internet that is as serious as your work.
          </p>
        </div>

        <div className="divider fade" />

        <div className="stanza fade">
          <p>
            I am watching what you are building. I am proud of it — not in the
            older-sibling-who-helped-you-with-homework way, but in the way you
            are proud of someone when you see them doing the thing they were
            supposed to do and doing it with everything they have.
          </p>
          <p>
            Keep moving. Keep making things. The audience is coming — some of
            them are already there.
          </p>
          <p>
            And when you get to a stage where the lights are so bright you can
            barely see the crowd — know that somewhere in the dark, your brother
            is watching.
          </p>
        </div>

        <div className="letter-closing fade">
          <p>Ngiyakuthanda, mfowethu.</p>
          <p className="letter-sign">Brighton</p>
          <p className="letter-date">June 2026 · Johannesburg</p>
        </div>

      </article>

      <footer className="letter-footer">
        <Link href="/" className="letter-footer-back">← Stalin Matsitsa</Link>
        <span className="letter-footer-note">A letter from Brighton Tandabantu</span>
      </footer>
    </div>
  )
}
