import { socials } from '@/data/social'

export default function ConnectFooter() {
  return (
    <footer className="connect" id="connect">
      <div className="connect-inner">
        <p className="sec-kicker">Woza · Connect</p>
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
          <span>
            Built by{' '}
            <a href="https://aakitech.com" target="_blank" rel="noopener noreferrer">
              The African Architect
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
