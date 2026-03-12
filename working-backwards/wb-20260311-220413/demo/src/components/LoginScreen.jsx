import './LoginScreen.css'

export default function LoginScreen({ onLogin }) {
  return (
    <div className="login-page">
      <div className="login-bg-grid" aria-hidden="true" />

      <div className="login-container">
        <div className="login-lockup">
          <div className="login-logo-group">
            <span className="login-xfinite-badge">XFINITE</span>
            <h1 className="login-product-name">High Flyer</h1>
            <p className="login-tagline">
              Reserved tables at the most sought-after bars,<br />
              in every city you land in.
            </p>
          </div>

          <div className="gold-rule" style={{ margin: '32px auto' }} />

          <div className="login-card">
            <p className="login-card-label">Xfinite Affluent Cardholder</p>
            <p className="login-card-description">
              Sign in with your Xfinite passkey to access your benefit.
              No separate account required.
            </p>

            <button className="btn-primary login-passkey-btn" onClick={onLogin}>
              <PasskeyIcon />
              Login with Xfinite Passkey
            </button>

            <p className="login-card-footnote">
              This benefit is included with your Xfinite Affluent card.
              No points, no upgrades, no calls required.
            </p>
          </div>
        </div>
      </div>

      <footer className="login-footer">
        <span>highflyer.xfinite.com</span>
        <span className="login-footer-sep">·</span>
        <span>Xfinite Financial Services</span>
      </footer>
    </div>
  )
}

function PasskeyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="4" />
      <path d="M16 14l-2 2 2 2" />
      <path d="M20 14l-2 2 2 2" />
      <path d="M14 14h8v4" />
      <path d="M4 20c0-2.21 1.79-4 4-4h2" />
    </svg>
  )
}
