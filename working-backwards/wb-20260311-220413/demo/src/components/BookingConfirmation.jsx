import { useState, useEffect } from 'react'
import AppHeader from './AppHeader'
import QRCode from './QRCode'
import './BookingConfirmation.css'

export default function BookingConfirmation({ booking, city, cardholder, onBookAgain }) {
  const [confirmedBooking, setConfirmedBooking] = useState(null)
  const [loading, setLoading] = useState(true)

  // booking.dateLabel is 'tonight' or 'tomorrow'
  const whenLabel = booking.dateLabel === 'tonight'
    ? `Tonight · ${booking.date}`
    : `Tomorrow · ${booking.date}`

  useEffect(() => {
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        venueId: booking.venue.id,
        venueName: booking.venue.name,
        city: city.name,
        date: booking.date,
        time: booking.time,
        partySize: booking.partySize,
        cardholderName: cardholder.name
      })
    })
      .then(r => r.json())
      .then(data => {
        setConfirmedBooking(data.booking)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="page confirmation-loading-page">
        <AppHeader cardholder={cardholder} />
        <div className="confirmation-loading">
          <div className="confirmation-spinner" />
          <p className="confirmation-loading-label">Confirming your table…</p>
          <p className="confirmation-loading-sub">This takes under two minutes</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <AppHeader cardholder={cardholder} />

      <div className="confirmation-content">
        <div className="confirmation-success-banner">
          <SuccessIcon />
          <div>
            <p className="confirmation-success-eyebrow">Table confirmed</p>
            <p className="confirmation-success-sub">Your reservation is guaranteed</p>
          </div>
        </div>

        <div className="confirmation-layout">
          <div className="confirmation-details">
            <div className="confirmation-venue-header">
              <h2 className="confirmation-venue-name">{booking.venue.name}</h2>
              <span className="type-tag">{booking.venue.type}</span>
            </div>
            <p className="confirmation-venue-neighborhood">
              {booking.venue.neighborhood} · {city.name}
            </p>

            <div className="gold-rule" />

            <div className="confirmation-fields">
              <ConfirmField label="Date" value={whenLabel} />
              <ConfirmField label="Time" value={booking.time} />
              <ConfirmField label="Party size" value={`${booking.partySize} ${booking.partySize === 1 ? 'guest' : 'guests'}`} />
              <ConfirmField label="Booking reference" value={confirmedBooking?.ref || '—'} mono />
              <ConfirmField label="Cardholder" value={cardholder.name} />
              <ConfirmField label="Card" value={`Xfinite Affluent ···· ${cardholder.cardLast4}`} />
            </div>

            <div className="confirmation-benefit-note">
              <CardIcon />
              <p>This reservation is included with your Xfinite Affluent card benefit. No charge will appear for the booking itself.</p>
            </div>
          </div>

          <div className="confirmation-qr-panel">
            <div className="qr-panel-inner">
              <p className="qr-panel-label">Show at the door</p>
              <div className="qr-code-wrapper">
                <QRCode value={confirmedBooking?.qrData || confirmedBooking?.ref || 'HIGHFLYER'} size={180} />
              </div>
              <p className="qr-panel-ref">{confirmedBooking?.ref}</p>
              <p className="qr-panel-instructions">
                Present this code at the entrance. The venue has been notified of your arrival.
              </p>
            </div>
          </div>
        </div>

        <div className="confirmation-actions">
          <button className="btn-secondary" onClick={onBookAgain}>
            <BackIcon />
            Browse more venues
          </button>
        </div>
      </div>
    </div>
  )
}

function ConfirmField({ label, value, mono }) {
  return (
    <div className="confirm-field">
      <span className="confirm-field-label">{label}</span>
      <span className={`confirm-field-value ${mono ? 'mono' : ''}`}>{value}</span>
    </div>
  )
}

function SuccessIcon() {
  return (
    <div className="success-icon-circle">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  )
}

function CardIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}>
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  )
}

function BackIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  )
}
