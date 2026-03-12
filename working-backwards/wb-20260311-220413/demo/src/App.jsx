import { useState } from 'react'
import LoginScreen from './components/LoginScreen'
import CitySelection from './components/CitySelection'
import VenueBrowse from './components/VenueBrowse'
import BookingConfirmation from './components/BookingConfirmation'

const SCREENS = {
  LOGIN: 'login',
  CITY: 'city',
  VENUES: 'venues',
  CONFIRMATION: 'confirmation'
}

const MOCK_CARDHOLDER = {
  name: 'Alex Chen',
  initials: 'AC',
  cardLast4: '4821'
}

export default function App() {
  const [screen, setScreen] = useState(SCREENS.LOGIN)
  const [selectedCity, setSelectedCity] = useState({ id: 'new-york', name: 'New York', state: 'NY' })
  const [bookingState, setBookingState] = useState(null)

  function handleLogin() {
    setScreen(SCREENS.VENUES)
  }

  function handleCityConfirmed(city) {
    setSelectedCity(city)
    setScreen(SCREENS.VENUES)
  }

  function handleChangeCity() {
    setScreen(SCREENS.CITY)
  }

  function handleReserve(venue, date, time, partySize, dateLabel) {
    // dateLabel is 'tonight' or 'tomorrow' — used for display on confirmation screen
    setBookingState({ venue, date, time, partySize, dateLabel })
    setScreen(SCREENS.CONFIRMATION)
  }

  function handleBookAgain() {
    setBookingState(null)
    setScreen(SCREENS.VENUES)
  }

  return (
    <div className="app-shell">
      {screen === SCREENS.LOGIN && (
        <LoginScreen onLogin={handleLogin} />
      )}
      {screen === SCREENS.CITY && (
        <CitySelection
          currentCity={selectedCity}
          cardholder={MOCK_CARDHOLDER}
          onCityConfirmed={handleCityConfirmed}
        />
      )}
      {screen === SCREENS.VENUES && (
        <VenueBrowse
          city={selectedCity}
          cardholder={MOCK_CARDHOLDER}
          onChangeCity={handleChangeCity}
          onReserve={handleReserve}
        />
      )}
      {screen === SCREENS.CONFIRMATION && bookingState && (
        <BookingConfirmation
          booking={bookingState}
          city={selectedCity}
          cardholder={MOCK_CARDHOLDER}
          onBookAgain={handleBookAgain}
        />
      )}
    </div>
  )
}
