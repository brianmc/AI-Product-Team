import { useState, useEffect } from 'react'
import AppHeader from './AppHeader'
import './CitySelection.css'

const CITIES = [
  { id: 'new-york', name: 'New York', state: 'NY' },
  { id: 'chicago', name: 'Chicago', state: 'IL' },
  { id: 'miami', name: 'Miami', state: 'FL' },
  { id: 'los-angeles', name: 'Los Angeles', state: 'CA' },
  { id: 'austin', name: 'Austin', state: 'TX' }
]

export default function CitySelection({ currentCity, cardholder, onCityConfirmed }) {
  const [selected, setSelected] = useState(currentCity)

  return (
    <div className="page">
      <AppHeader cardholder={cardholder} />

      <div className="city-page-content">
        <div className="city-page-header">
          <p className="city-page-eyebrow">Your City</p>
          <h2 className="city-page-title">Where are you tonight?</h2>
          <p className="city-page-subtitle">
            Select the city you are in. High Flyer will show you available tables for this evening and tomorrow night.
          </p>
        </div>

        <div className="city-grid">
          {CITIES.map(city => (
            <button
              key={city.id}
              className={`city-tile ${selected.id === city.id ? 'selected' : ''}`}
              onClick={() => setSelected(city)}
            >
              <div className="city-tile-inner">
                <span className="city-tile-name">{city.name}</span>
                <span className="city-tile-state">{city.state}</span>
              </div>
              {selected.id === city.id && (
                <span className="city-tile-check">
                  <CheckIcon />
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="city-confirm-row">
          <button
            className="btn-primary city-confirm-btn"
            onClick={() => onCityConfirmed(selected)}
          >
            Show venues in {selected.name}
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}
