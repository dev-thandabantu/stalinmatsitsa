import BookingForm from './BookingForm'

export default function BookSection() {
  return (
    <section className="sec" id="book">
      <div className="sec-inner">
        <p className="sec-kicker">Ukubhukha · Bookings</p>
        <div className="book-grid">
          <div className="book-intro">
            <h2 className="sec-heading">
              Book<br /><span className="gold">Stalin.</span>
            </h2>
            <p>
              Festivals, club nights, corporate events, private celebrations — Stalin brings
              the full energy of his performance background to every stage.
            </p>
            <p className="contact-note">
              Direct enquiries:{' '}
              <a href="mailto:stalinmatsitsa@gmail.com">stalinmatsitsa@gmail.com</a>
            </p>
          </div>

          <BookingForm />
        </div>
      </div>
    </section>
  )
}
