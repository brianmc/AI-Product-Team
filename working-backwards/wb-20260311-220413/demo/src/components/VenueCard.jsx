import './VenueCard.css'

export default function VenueCard({ venue, onReserve }) {
  const tonight = venue.availableTonight
  const tomorrow = venue.availableTomorrow

  return (
    <div className="venue-card">
      <div className="venue-card-main">
        <div className="venue-card-header">
          <div className="venue-card-title-row">
            <h3 className="venue-card-name">{venue.name}</h3>
            <span className="type-tag">{venue.type}</span>
          </div>
          <p className="venue-card-neighborhood">{venue.neighborhood}</p>
        </div>

        <p className="venue-card-description">{venue.description}</p>

        <p className="venue-card-atmosphere">
          <AtmosphereIcon />
          {venue.atmosphere}
        </p>
      </div>

      <div className="venue-card-sidebar">
        <div className="venue-availability">
          <div className="availability-section">
            <span className="availability-label">Tonight</span>
            <div className="availability-times">
              {tonight.map(time => (
                <span key={time} className="time-pill">{time}</span>
              ))}
            </div>
          </div>
          <div className="availability-divider" />
          <div className="availability-section">
            <span className="availability-label">Tomorrow</span>
            <div className="availability-times">
              {tomorrow.map(time => (
                <span key={time} className="time-pill">{time}</span>
              ))}
            </div>
          </div>
        </div>

        <button className="btn-primary venue-reserve-btn" onClick={onReserve}>
          Reserve a table
        </button>

        <p className="venue-max-party">Up to {venue.maxParty} guests</p>
      </div>
    </div>
  )
}

function AtmosphereIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}
