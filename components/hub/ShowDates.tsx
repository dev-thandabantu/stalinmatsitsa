import { shows } from '@/data/shows'

export default function ShowDates() {
  return (
    <section className="sec" id="shows">
      <div className="sec-inner">
        <p className="sec-kicker">Live</p>
        <h2 className="sec-heading" style={{ marginBottom: '2rem' }}>
          Tour<br /><span className="gold">Dates.</span>
        </h2>

        {shows.length === 0 ? (
          <div className="show-placeholder">
            Tour dates coming — follow <a href="https://www.tiktok.com/@stalinmatsitsa" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>@stalinmatsitsa</a> for announcements
          </div>
        ) : (
          <div className="show-stack">
            {shows.map(show => {
              const date = new Date(show.date)
              const day = date.getDate()
              const month = date.toLocaleString('en', { month: 'short' }).toUpperCase()
              const isPast = Date.now() > date.getTime()

              return (
                <div
                  key={show.id}
                  className="show-card"
                  style={{ opacity: isPast ? 0.4 : 1 }}
                >
                  <div className="show-date-block">
                    <div className="show-date-day">{day}</div>
                    <div className="show-date-month">{month}</div>
                  </div>
                  <div>
                    <div className="show-venue">{show.venue}</div>
                    <div className="show-location">{show.city}, {show.country}</div>
                  </div>
                  <div>
                    {show.isSoldOut ? (
                      <span className="show-sold-out">Sold Out</span>
                    ) : show.ticketUrl ? (
                      <a href={show.ticketUrl} target="_blank" rel="noopener noreferrer" className="show-ticket-link">
                        Tickets ↗
                      </a>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
