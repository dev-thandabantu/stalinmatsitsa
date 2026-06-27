import { releases } from '@/data/releases'
import CollabCard from './CollabCard'

export default function CollabStack() {
  return (
    <section className="sec" id="music">
      <div className="sec-inner">
        <p className="sec-kicker">In The Room With</p>
        <h2 className="sec-heading">
          Featured<br /><span className="gold">Work.</span>
        </h2>
      </div>
      <div className="collab-slider-wrap">
        <div className="collab-slider">
          {releases.map(r => <CollabCard key={r.id} release={r} />)}
        </div>
      </div>
    </section>
  )
}
