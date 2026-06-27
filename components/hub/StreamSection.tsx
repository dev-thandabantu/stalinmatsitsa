import { streams } from '@/data/streams'
import StreamCard from './StreamCard'

export default function StreamSection() {
  return (
    <section className="sec" id="stream">
      <div className="sec-inner">
        <p className="sec-kicker">Listen</p>
        <h2 className="sec-heading">
          Find The<br /><span className="gold">Music.</span>
        </h2>
        <div className="stream-grid">
          {streams.map(p => <StreamCard key={p.id} platform={p} />)}
        </div>
      </div>
    </section>
  )
}
