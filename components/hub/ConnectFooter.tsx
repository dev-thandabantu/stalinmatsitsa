import { socials } from '@/data/social'

export default function ConnectFooter() {
  return (
    <footer className="connect" id="connect">
      <div className="connect-inner">
        <p className="sec-kicker">Hlangana · Connect</p>
        <div className="connect-handle">@stalinmatsitsa</div>

        <div className="social-pills">
          {socials.map(s => (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-pill"
            >
              {s.label} · {s.handle}
            </a>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Stalin Matsitsa · Nkomazi, Mzansi</span>
          <a href="https://dev-thandabantu.github.io/who-are-you/letters/to-stalin/" className="footer-letter-link">A letter from Brighton →</a>
          <span>
            Built by{' '}
            <a href="https://bthanda.vercel.app" target="_blank" rel="noopener noreferrer">
              Brighton Tandabantu
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
