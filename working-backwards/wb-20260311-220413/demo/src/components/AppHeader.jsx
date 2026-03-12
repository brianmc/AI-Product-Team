import './AppHeader.css'

export default function AppHeader({ cardholder }) {
  return (
    <header className="app-header">
      <div className="wordmark">
        <span className="product-name">High Flyer</span>
        <span className="by-xfinite">XFINITE</span>
      </div>
      {cardholder && (
        <div className="cardholder-pill">
          <div className="cardholder-avatar">{cardholder.initials}</div>
          <span>{cardholder.name}</span>
        </div>
      )}
    </header>
  )
}
