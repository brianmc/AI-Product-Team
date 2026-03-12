import { useState } from 'react'
import './ReserveModal.css'

const TODAY = new Date()
const TOMORROW = new Date(TODAY)
TOMORROW.setDate(TOMORROW.getDate() + 1)

function shortDate(date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function ReserveModal({ venue, onClose, onConfirm }) {
  const [selectedDate, setSelectedDate] = useState('tonight')
  const [selectedTime, setSelectedTime] = useState(null)
  const [partySize, setPartySize] = useState(2)

  const availableTimes = selectedDate === 'tonight'
    ? venue.availableTonight
    : venue.availableTomorrow

  function handleDateChange(d) {
    setSelectedDate(d)
    setSelectedTime(null)
  }

  function handleConfirm() {
    if (!selectedTime) return
    const dateLabel = selectedDate === 'tonight' ? shortDate(TODAY) : shortDate(TOMORROW)
    // Pass selectedDate ('tonight'/'tomorrow') as 4th arg so confirmation screen can label it correctly
    onConfirm(dateLabel, selectedTime, partySize, selectedDate)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p className="modal-eyebrow">Reserve a table</p>
            <h3 className="modal-title">{venue.name}</h3>
            <p className="modal-neighborhood">{venue.neighborhood} · {venue.type}</p>
          </div>
          <button className="modal-close btn-ghost" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        <div className="modal-body">
          {/* Date selection */}
          <div className="modal-field">
            <label className="modal-label">When</label>
            <div className="date-toggle">
              <button
                className={`date-toggle-btn ${selectedDate === 'tonight' ? 'active' : ''}`}
                onClick={() => handleDateChange('tonight')}
              >
                <span className="date-toggle-primary">Tonight</span>
                <span className="date-toggle-secondary">{shortDate(TODAY)}</span>
              </button>
              <button
                className={`date-toggle-btn ${selectedDate === 'tomorrow' ? 'active' : ''}`}
                onClick={() => handleDateChange('tomorrow')}
              >
                <span className="date-toggle-primary">Tomorrow</span>
                <span className="date-toggle-secondary">{shortDate(TOMORROW)}</span>
              </button>
            </div>
          </div>

          {/* Time selection */}
          <div className="modal-field">
            <label className="modal-label">Available times</label>
            <div className="time-grid">
              {availableTimes.map(time => (
                <button
                  key={time}
                  className={`time-select-btn ${selectedTime === time ? 'active' : ''}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Party size */}
          <div className="modal-field">
            <label className="modal-label">Party size</label>
            <div className="party-size-row">
              <button
                className="party-btn"
                onClick={() => setPartySize(s => Math.max(1, s - 1))}
                disabled={partySize <= 1}
              >
                <MinusIcon />
              </button>
              <span className="party-count">
                {partySize} {partySize === 1 ? 'guest' : 'guests'}
              </span>
              <button
                className="party-btn"
                onClick={() => setPartySize(s => Math.min(venue.maxParty, s + 1))}
                disabled={partySize >= venue.maxParty}
              >
                <PlusIcon />
              </button>
            </div>
            <p className="party-max-note">Maximum {venue.maxParty} guests for this venue</p>
          </div>
        </div>

        <div className="modal-footer">
          {selectedTime && (
            <div className="modal-summary">
              <p className="modal-summary-text">
                {selectedDate === 'tonight' ? 'Tonight' : 'Tomorrow'}, {selectedTime} · {partySize} {partySize === 1 ? 'guest' : 'guests'}
              </p>
            </div>
          )}
          <button
            className="btn-primary modal-confirm-btn"
            onClick={handleConfirm}
            disabled={!selectedTime}
          >
            Confirm reservation
          </button>
          <p className="modal-guarantee-note">
            Guaranteed access included with your Xfinite Affluent card
          </p>
        </div>
      </div>
    </div>
  )
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}
