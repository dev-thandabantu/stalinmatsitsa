import { releases } from '@/data/releases'
import CollabCard from './CollabCard'

export default function CollabStack() {
  return (
    <section className="sec" id="music">
      <div className="sec-inner">
        <div className="collabs-header">
          <p className="sec-kicker">In The Room With</p>
        </div>
        <h2 className="sec-heading" style={{ marginBottom: '0.5rem' }}>
          Featured<br /><span className="gold">Work.</span>
        </h2>
        <div className="collab-slider" style={{ marginTop: '2rem' }}>
          {releases.map(r => <CollabCard key={r.id} release={r} />)}
        </div>
      </div>
    </section>
  )
}
