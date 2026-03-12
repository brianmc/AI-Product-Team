# High Flyer — Demo

This is a working prototype demonstrating the core user journey described
in the Working Backwards Press Release for High Flyer by Xfinite.

**All data is mock/placeholder. This is not a production application.**

## Run the demo

Requirements: Node.js 18 or later

```bash
npm install
npm start
```

Opens at http://localhost:3000

The Express API server runs on port 3001 and is proxied automatically.

## What this demonstrates

An Xfinite Affluent cardholder lands in a new city and uses High Flyer to
find and reserve a table at a curated speakeasy or cocktail bar — with no
local connections required. The reservation is confirmed in under two minutes
and the cardholder receives a QR code to present at the door.

## Screens

1. **Login** — Xfinite branding with a "Login with Xfinite Passkey" button (visual only)
2. **Venue Browse** — Curated venue list for the auto-detected city (New York by default), with available times for tonight and tomorrow night; city can be changed
3. **City Selection** — Five cities: New York, Chicago, Miami, Los Angeles, Austin
4. **Reserve Modal** — Date toggle (tonight / tomorrow), time picker, party size selector
5. **Booking Confirmation** — Booking summary, reference number, and a QR code to show at the door

## Demo walkthrough (for stakeholders)

1. Click "Login with Xfinite Passkey" to enter the app
2. New York venues load automatically — browse the four curated listings
3. Click "Change city" to switch to Chicago, Miami, Los Angeles, or Austin
4. Click "Reserve a table" on any venue
5. In the modal: toggle between Tonight and Tomorrow, select a time, adjust party size
6. Click "Confirm reservation"
7. The confirmation screen shows the booking details and a mock QR code representing the door verification artifact described in the Internal FAQ
