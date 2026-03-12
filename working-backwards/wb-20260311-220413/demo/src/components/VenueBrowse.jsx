import { useState, useEffect } from 'react'
import AppHeader from './AppHeader'
import VenueCard from './VenueCard'
import ReserveModal from './ReserveModal'
import './VenueBrowse.css'

export default function VenueBrowse({ city, cardholder, onChangeCity, onReserve }) {
  const [venues, setVenues] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedVenue, setSelectedVenue] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/venues?city=${city.id}`)
      .then(r => r.json())
      .then(data => {
        setVenues(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [city.id])

  function handleReserveClick(venue) {
    setSelectedVenue(venue)
  }

  function handleModalClose() {
    setSelectedVenue(null)
  }

  function handleModalConfirm(date, time, partySize, dateLabel) {
    setSelectedVenue(null)
    onReserve(selectedVenue, date, time, partySize, dateLabel)
  }

  return (
    <div className="page">
      <AppHeader cardholder={cardholder} />

      <div className="browse-content">
        <div className="browse-header">
          <div className="browse-header-left">
            <div className="browse-location-row">
              <LocationPinIcon />
              <span className="browse-city-name">{city.name}, {city.state}</span>
              <button className="btn-ghost browse-change-city" onClick={onChangeCity}>
                Change city
                <ChevronDownIcon />
              </button>
            </div>
            <h2 className="browse-title">Tonight's access</h2>
            <p className="browse-subtitle">
              {venues.length} curated venues available. Tables confirmed in under two minutes.
            </p>
          </div>

          <div className="browse-benefit-badge">
            <span className="benefit-badge-label">Included benefit</span>
            <span className="benefit-badge-desc">Xfinite Affluent · ···· 4821</span>
          </div>
        </div>

        {loading ? (
          <div className="browse-loading">
            <div className="browse-loading-spinner" />
            <p>Finding available venues…</p>
          </div>
        ) : (
          <div className="venue-list">
            {venues.map(venue => (
              <VenueCard
                key={venue.id}
                venue={venue}
                onReserve={() => handleReserveClick(venue)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedVenue && (
        <ReserveModal
          venue={selectedVenue}
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
        />
      )}
    </div>
  )
}

function LocationPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
