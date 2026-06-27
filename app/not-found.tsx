import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100svh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <div style={{
        fontFamily: 'var(--font-display), "Bebas Neue", sans-serif',
        fontSize: 'clamp(6rem, 20vw, 14rem)',
        lineHeight: 1,
        color: 'var(--gold)',
        opacity: 0.15,
      }}>404</div>
      <p style={{ color: 'var(--muted)', fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        This page doesn&apos;t exist.
      </p>
      <Link href="/" style={{
        color: 'var(--gold)',
        fontSize: '0.78rem',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        borderBottom: '1px solid var(--gold-line)',
        paddingBottom: '2px',
      }}>
        Back to Stalin Matsitsa →
      </Link>
    </div>
  )
}
