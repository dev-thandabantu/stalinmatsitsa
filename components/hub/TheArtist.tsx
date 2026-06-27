export default function TheArtist() {
  return (
    <section className="sec" id="about">
      <div className="sec-inner">
        <p className="sec-kicker">The Artist</p>

        <div className="artist-grid">
          <div className="artist-heading-block">
            <h2 className="sec-heading">
              Umzimba<br />
              Kuqala.<br />
              Iculo<br />
              <span className="gold">Emuva.</span>
            </h2>
            <p className="artist-pull-quote" style={{ marginTop: '2rem' }}>
              277K<br />abalandeli.
            </p>
          </div>

          <div className="artist-body">
            <div className="artist-bio">
              <p>
                Stalin Matsitsa started moving before he started singing. A dancer first —
                trained in the language of the body long before he found his voice on record.
                From Nkomazi, Mpumalanga, he carries that physical intelligence into
                every performance.
              </p>
              <p>
                His music sits at the intersection of Afropop, Maskandi, and Amapiano —
                cross-genre by instinct, not by strategy. He has shared the stage and studio with
                Big Zulu, Mduduzi Ncube, Fanatic SA, and Sdala B, building a catalogue
                that moves between the township and the main stage.
              </p>
              <p>
                3.1 million TikTok likes don&apos;t lie. Isigqi sakhe asikhohlikali —
                the audience found him because something in the movement was undeniable.
              </p>
            </div>

            <div className="stat-chips">
              <span className="stat-chip">277K Abalandeli</span>
              <span className="stat-chip">3.1M Izithanda</span>
              <span className="stat-chip">Afropop</span>
              <span className="stat-chip">Maskandi</span>
              <span className="stat-chip">Amapiano</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
