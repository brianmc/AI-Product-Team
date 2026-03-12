# High Flyer — Requirements

**Status:** Draft
**Last Updated:** 2026-03-12
**Working Backwards Session:** wb-20260311-220413

---

## Problem

Xfinite affluent cardholders are socially fluent in their home city. They have the relationships, the face recognition, and the habits that get them into places that don't advertise and don't take walk-ins. When they travel — frequently, and often with only one free evening — that accumulated social capital does not transfer. The city's best speakeasies and invite-only cocktail lounges appear full or invisible to someone who doesn't know the door to knock on. No concierge fills the gap, because the venues worth visiting are specifically the ones that have no public presence.

The result is a cardholder who lands in Austin or Seattle and ends up somewhere merely good rather than the kind of place they would tell someone about. This is a meaningful gap in a premium card benefit offering: the card commands access everywhere except the places its cardholders actually care most about.

---

## Success Criteria

- A cardholder arriving in a supported city can complete a confirmed table reservation in under two minutes from first opening the application.
- On any supported evening in any launched city, at least one eligible venue with available slots appears in the cardholder's browsing view.
- A cardholder who arrives at a venue with a confirmed High Flyer booking is seated without needing to call ahead, name-drop, or explain who they are beyond presenting their confirmation.
- `[OPEN — measurement not established]` Cardholder satisfaction with the venue experience meets a target quality threshold. Measurement instrument (post-visit survey, feedback flag conversion rate, or similar) and threshold not yet defined — Owner: Product/Curation.
- `[OPEN — measurement not established]` Venue attrition rate (venues exiting the program within 12 months of launch) stays below a target threshold. Threshold and tracking mechanism not yet defined — Owner: Partnerships/Product.

---

## User Journey

The following describes the full journey of the primary user — an active Xfinite affluent cardholder traveling to a city where High Flyer venues are available — from first access to arriving at the venue.

1. The cardholder navigates to `highflyer.xfinite.com` on any modern web browser (desktop, tablet, or mobile). No app download is required.
2. The cardholder selects **Sign In with Xfinite** and enters their existing Xfinite username and password.
3. `[TBD — pending Internal FAQ BLOCKER Q2/Engineering/Security]` If MFA is required before booking, an additional verification step is presented at this point.
4. Upon successful sign-in, the system verifies the cardholder's card status against the Xfinite account record. Eligible cardholders proceed to the home screen. Ineligible cardholders see an eligibility error with instructions to contact Xfinite cardholder support.
5. On the home screen, the cardholder sees: a city selector showing only cities with currently available High Flyer venues; a Tonight / Tomorrow toggle; and a Your Reservations section showing any upcoming or past bookings.
6. The cardholder selects their destination city and sets the date toggle to **Tonight** or **Tomorrow**.
7. The cardholder sees a curated list of venues with available slots for that city and date. Each venue card displays: venue name (as the venue has agreed to present it), neighborhood, venue type, available slot count, and supported party size range.
8. The cardholder selects a venue and reviews its detail page: a short description of the venue, any specific requirements (dress, arrival window), and any applicable minimum spend or cover charge disclosed before confirmation.
9. The cardholder selects a party size and selects **Confirm Reservation**.
10. `[TBD — pending Internal FAQ BLOCKER Q2/Engineering/Security]` If an additional verification step is required at confirmation, it is presented here.
11. The system confirms the reservation. The cardholder receives an on-screen confirmation, a confirmation email to their Xfinite account email address, and a confirmation artifact (format `[TBD — pending BLOCKER Q2]`) for use at the venue door.
12. The reservation appears in **Your Reservations** on the home screen.
13. The cardholder arrives at the venue within the specified arrival window, presents their confirmation artifact and a valid government-issued ID, and is seated.
14. If the cardholder's plans change, they navigate to **Your Reservations**, select the booking, and select **Cancel Reservation**. A cancellation confirmation email is sent.

---

## Requirements

### REQ-1: Cardholder Authentication and Eligibility Gate

**Pre-condition:** `[BLOCKED — pending Internal FAQ BLOCKER Q2]` The venue-facing verification protocol must be defined and the MFA assessment completed before the full authentication and identity system can be finalized. The SSO integration with Xfinite credentials and the eligibility check against the Xfinite card account record are unblocked and can be built independently; the MFA layer cannot be finalized until Engineering/Security completes its assessment.

High Flyer authenticates cardholders using their existing Xfinite credentials via SSO. Upon successful authentication, the system verifies that the signed-in account holds an active Xfinite affluent card. If the card is active and eligible, the cardholder proceeds to the home screen. If the card is not eligible, the system displays an eligibility error message with instructions to contact Xfinite cardholder support. High Flyer does not manage passwords or credentials independently of the Xfinite platform.

**Acceptance Criteria:**
- Given a cardholder with an active Xfinite affluent card, when they sign in with valid Xfinite credentials, then the system grants access to the High Flyer home screen within 5 seconds of authentication completing.
- Given a cardholder with expired, cancelled, or ineligible Xfinite credentials, when they attempt to sign in, then the system displays an eligibility error message and directs them to Xfinite cardholder support. The system does not grant access to venue browsing or booking.
- Given a cardholder who has forgotten their Xfinite password, when they use the High Flyer sign-in page, then the system provides a link to the Xfinite password reset flow at `xfinite.com/account`. High Flyer does not present a separate password reset mechanism.
- Given a successful sign-in, when the system verifies card eligibility, then the eligibility check must complete and return a result within 3 seconds. A timeout is treated as an eligibility-check failure, and the cardholder is directed to Xfinite support.
- `[TBD — pending BLOCKER Q2 / MFA assessment]` Given a cardholder attempting to confirm a booking, when MFA is required, then [acceptance criteria to be written after Engineering/Security MFA assessment is complete].

---

### REQ-2: City and Venue Browsing

**Pre-condition:** `[BLOCKED — pending Internal FAQ BLOCKER Q1 and Q4]` The venue inventory pipeline (pre-allocated block model vs. real-time channel) must be defined before the venue browsing view can be built to the correct availability model. In parallel, Partnerships must contract a minimum launch venue slate before browsing can be tested against real supply. The UI structure and cardholder-facing display logic described here is unblocked; the venue data ingestion layer depends on the resolution of BLOCKER Q1.

The home screen presents a city selector populated with only those cities that have at least one venue with committed availability for the current evening or the next day. A Tonight / Tomorrow toggle filters the browsing view to the selected date. The venue list shows only venues with available slots for the selected city and date. The list is not a directory — it is a live view of currently available, curated inventory.

Each venue card in the browsing list displays:
- Venue name (as agreed with the venue — may be partial or a code name)
- Neighborhood
- Venue type (e.g., "cocktail bar," "speakeasy," "rooftop lounge")
- Available slot count for the selected evening
- Supported party size range (minimum and maximum)

**Acceptance Criteria:**
- Given a cardholder on the home screen, when they select a city, then the system displays only venues with available slots for that city on the currently selected date. Venues with no available slots for the selected date are not shown.
- Given a cardholder who has selected a city with no available venues for tonight, when they toggle to **Tomorrow**, then the system re-queries and displays venues available for the following evening. The two date views are independent.
- Given a cardholder who selects a city with no venues available on either date, when the browsing view loads, then the system displays a clear empty-state message indicating no venues are available for that city on those dates — not an error state — and suggests trying a different city or checking back later.
- Given a cardholder browsing venues, when venue data is loading, then the system displays a loading state. If venue data fails to load within 5 seconds, the system displays an error message with a retry option.
- Given a venue that uses a partial name or code name per its agreement with Xfinite, when that venue is displayed in the browsing list or detail page, then the system displays only the name the venue has approved for cardholder-facing materials.

---

### REQ-3: Venue Detail and Pre-Confirmation Disclosure

**Pre-condition:** `[BLOCKED — pending Internal FAQ BLOCKER Q1]` The detail page can be designed and the disclosure framework built, but the live availability data displayed (slot count, availability status) depends on the venue inventory pipeline model being resolved.

The venue detail page provides the cardholder with the information needed to make an informed decision before confirming. The page includes: a short venue description, specific venue requirements (dress code, arrival window, other venue-communicated conditions), and any applicable minimum spend or cover charge. Any minimum spend or cover must be disclosed on the detail page before the cardholder reaches the confirmation step. A cardholder must not encounter a cost at the venue door that was not disclosed in the app.

**Acceptance Criteria:**
- Given a cardholder who selects a venue from the browsing list, when the venue detail page loads, then the page displays: venue description, any venue-specific requirements, available slot count, party size range, and — if applicable — any minimum spend or cover charge that the venue applies to High Flyer reservations.
- Given a venue that applies a minimum spend or cover charge to High Flyer bookings, when the cardholder views that venue's detail page, then the minimum spend or cover amount is displayed before the party size selection and confirmation step. The cardholder must be able to see this cost before any confirmation action is available.
- Given a venue with no minimum spend or cover charge, when the cardholder views that venue's detail page, then no minimum spend language is shown. The page does not display a $0 figure — it simply omits the cost disclosure line.
- Given a venue detail page with a venue-specific arrival window, when the cardholder views the page, then the arrival window is displayed with sufficient prominence that a cardholder proceeding to confirm cannot reasonably miss it.

---

### REQ-4: Reservation Confirmation and Booking Artifact

**Pre-condition:** `[BLOCKED — pending Internal FAQ BLOCKER Q1 and Q2]` The confirmation flow depends on the venue inventory pipeline model (BLOCKER Q1) to know whether confirmation is instant (pre-allocated block) or requires a real-time acknowledgment from the venue. The booking artifact format and the venue-door verification protocol (BLOCKER Q2) must be defined before the confirmation artifact can be specified or built.

Upon confirmation, the system creates a reservation record against the cardholder's account and against the venue's allocated inventory for that date. The cardholder receives: an on-screen confirmation, a confirmation email to the address on their Xfinite account, and a confirmation artifact suitable for presenting at the venue door. The reservation appears in the cardholder's **Your Reservations** view. The entire confirmation flow — from the cardholder selecting Confirm to receiving the on-screen confirmation — must complete in under two minutes.

**Acceptance Criteria:**
- Given a cardholder who selects a party size and confirms a reservation, when the confirmation action is submitted, then the system creates a reservation record, displays an on-screen confirmation within 30 seconds of submission, and sends a confirmation email to the cardholder's Xfinite account email address within 2 minutes of the booking being confirmed.
- Given a confirmed booking, when the cardholder navigates to **Your Reservations**, then the reservation appears with: venue name, city, date, party size, and confirmation status showing as "Confirmed."
- `[TBD — pending BLOCKER Q2 / venue verification protocol]` Given a confirmed booking, when the cardholder views their confirmation, then the system provides a confirmation artifact (format to be specified after BLOCKER Q2 resolution — expected to be a QR code, alphanumeric booking reference, or equivalent tamper-resistant format) that the cardholder can present at the venue door.
- Given a cardholder who completes the booking flow but does not receive a confirmation email, when they sign in to High Flyer and check **Your Reservations**, then if the reservation is listed as Confirmed, the reservation is valid. The presence of the confirmed reservation in Your Reservations is the canonical booking record.
- Given the venue confirmation step requires real-time acknowledgment from the venue (if pre-allocated block model is not used), when the venue confirmation response is not received within 60 seconds, then the system notifies the cardholder that confirmation is pending and provides an expected resolution time. The cardholder is not left with an ambiguous booking state.
- Given a cardholder attempting to book a venue that has just exhausted its available slots (concurrent booking race condition), when the confirmation is submitted, then the system returns a clear "no longer available" message and returns the cardholder to the browsing view without creating a reservation record.

---

### REQ-5: Reservation Management (View and Cancel)

The cardholder can view all upcoming and past reservations in the **Your Reservations** section and can cancel any upcoming reservation. Cancellation is self-serve within the application. Upon cancellation, the system releases the cardholder's held slot back to the venue and sends a cancellation confirmation email.

`[TBD — pending cardholder terms finalization]` The cancellation deadline (e.g., must cancel N hours before arrival), any fees for late cancellation or no-show, and any access implications of repeated no-shows are not yet defined. These terms must be reflected in the cancellation flow at launch — including displaying the applicable deadline and any fee — before the cancellation feature can be considered complete.

**Acceptance Criteria:**
- Given a signed-in cardholder, when they navigate to **Your Reservations**, then the view displays two sections: Upcoming (all confirmed reservations for tonight or later) and Past (all completed or cancelled reservations). Each entry shows: venue name, city, date, party size, and status.
- Given a cardholder with an upcoming confirmed reservation, when they select the reservation and choose **Cancel Reservation**, then the system presents a confirmation prompt before executing the cancellation. Upon confirmation, the reservation status changes to "Cancelled," the slot is released, and a cancellation confirmation email is sent to the cardholder's Xfinite account email address within 2 minutes.
- Given a cardholder who cancels a reservation, when they check **Your Reservations** immediately after cancellation, then the reservation appears in the Past section with a "Cancelled" status. It does not disappear from the record.
- `[TBD — pending cardholder terms]` Given a cancellation that falls within the late-cancellation window (deadline TBD), when the cardholder attempts to cancel, then the system displays the applicable policy (fee, access implication) before the cardholder can confirm the cancellation action.
- Given a cardholder who submitted a cancellation but whose reservation still appears as Upcoming after a page refresh and 2-minute wait, when they contact support, then the cardholder support team can confirm and force-complete the cancellation on the back end.
- Given a confirmed reservation that is cancelled by the venue or by Xfinite (not the cardholder), when the cancellation occurs, then the system updates the reservation status to "Cancelled by Venue" or equivalent, sends an email notification to the cardholder, and — if cancellation occurs before the reservation date — prompts the cardholder to check current availability for the same city and evening.

---

## Scope

### In Scope

- Cardholder authentication via Xfinite SSO (REQ-1)
- Card eligibility verification against the Xfinite account record (REQ-1)
- City and venue browsing filtered by date and availability (REQ-2)
- Venue detail page with pre-confirmation cost disclosure (REQ-3)
- Reservation confirmation with on-screen and email confirmation (REQ-4)
- Booking artifact for venue-door verification (REQ-4) — format pending BLOCKER Q2
- Your Reservations: view upcoming and past bookings (REQ-5)
- Self-serve cancellation with email confirmation (REQ-5)
- Cardholder-facing venue feedback mechanism (referenced in docs/venues-and-curation.md) — `[TBD — mechanism not specified in Internal FAQ; treat as launch scope pending Product confirmation]`
- Web application accessible on desktop, tablet, and mobile at `highflyer.xfinite.com` (no native app required for v1)

### Out of Scope (Future)

- Native iOS or Android application — the PR specifies a web application; native apps are a future consideration
- Reservation modification (change of party size without cancel-and-rebook) — explicitly deferred in docs/your-reservations.md
- Advance booking beyond same-evening and next-day — not committed to in the PR or FAQ for v1
- Cardholder-to-cardholder booking (booking on behalf of another cardholder) — not described in any artifact
- Venue-side management portal or booking management tooling exposed directly to venues — this is an ops/partnerships tool, not a cardholder-facing requirement; belongs in a separate workstream
- Booking frequency throttle implementation — policy is TBD; the rate-limiting mechanism cannot be built until the policy is defined

---

## Edge Cases

- **No venues available in a city on a given evening:** The browsing view displays a clear empty-state message (not an error). The system suggests the Tomorrow toggle and alternative cities. This is an expected operating state, not a failure.
- **All venues in a city are full when a cardholder opens the app:** Same as above — empty browsing state with suggested alternatives.
- **Concurrent booking race condition (slot taken between browse and confirm):** System returns a "no longer available" message at confirmation and returns the cardholder to the browsing view. No partial reservation is created. See REQ-4.
- **Venue cancels a confirmed reservation before the cardholder arrives:** System updates reservation status, sends notification email, and prompts cardholder to check current availability. See REQ-5.
- **Cardholder arrives and venue has no record of booking:** Cardholder troubleshooting path: present confirmation artifact, give name and "Xfinite High Flyer benefit," ask for manager. Escalation to High Flyer support if unresolved. `[TBD — same-night recovery process and support contact to be defined at launch per BLOCKER Q6]`
- **Cardholder's card becomes ineligible between sign-in and booking (e.g., account suspended mid-session):** The eligibility check runs at sign-in. If the card status changes mid-session, the booking confirmation step should re-validate eligibility before finalizing the reservation. If eligibility is lost, the confirmation fails with an error directing the cardholder to Xfinite support.
- **Sign-in loop or page not loading:** Cardholder troubleshooting steps (clear cache, different browser/device) documented in docs/troubleshooting.md. A status page at `[TBD — URL to be confirmed at launch]` will reflect application availability.
- **Cardholder does not receive confirmation email:** The canonical booking record is the reservation in **Your Reservations**. Email delivery failure does not invalidate a confirmed booking. Cardholder should check spam, then check Your Reservations.
- **Cancellation not processed (reservation still appears as upcoming):** Cardholder refreshes or signs out and back in. If the issue persists after 2 minutes, the cardholder contacts support with the booking reference.
- **Cardholder attempts to book a venue whose name is partially presented or coded:** System displays only the approved name. Address is given only to neighborhood level if the venue has requested it. The cardholder is informed via venue detail notes that some venues prefer limited public identification.
- **Multiple cardholders attempting to book the last available slot simultaneously:** The system must handle concurrent reservation attempts with appropriate locking or optimistic concurrency control. The first confirmed booking holds the slot; subsequent attempts receive an availability error.

---

## Technical Requirements

- **Performance:** The booking confirmation flow (from Confirm action to on-screen confirmation) must complete in under two minutes per the Press Release commitment. Page load and availability query responses must complete within 5 seconds. `[OPEN — owner: Engineering]` Specific p50/p95/p99 latency targets and peak load assumptions (4 PM–9 PM local time per city, concurrency model) must be defined before infrastructure sizing. The Internal FAQ (Q3) notes that 99.95%+ uptime during peak booking windows is likely required.
- **Availability / Uptime:** `[OPEN — owner: Engineering]` Target uptime SLA for the booking window (4 PM–9 PM local time) must be formally defined. The Internal FAQ (Q3) establishes that 99.9% is table stakes and 99.95%+ is likely required given the use-case window. A status page must be available at launch. Fallback UX when availability data cannot be fetched in real time must be designed.
- **Security / Auth:** Authentication is via Xfinite SSO. High Flyer does not manage credentials independently. `[OPEN — owner: Engineering/Security]` MFA requirements for booking confirmation must be assessed and defined (Internal FAQ Q2). `[BLOCKED — pending BLOCKER Q2]` The venue-facing verification protocol (tamper-resistant confirmation artifact, door-check mechanism) must be defined and built as a first-class component; this is not optional for launch.
- **Scale:** `[OPEN — owner: Engineering/Finance/Product]` Expected booking volume per active cardholder per month and total active cardholder pool size must be modeled before infrastructure sizing. These figures feed both the unit economics model (Internal FAQ Q5) and the load requirements for the venue inventory pipeline.
- **Compliance:** `[BLOCKED — pending BLOCKER Q7]` A data classification and handling policy for High Flyer booking behavioral data must be completed and reviewed before launch. CCPA compliance (and applicable state equivalents) must be confirmed for travel and nightlife behavioral data. Venue data sharing terms must be contractually defined in venue partnership agreements before any venue receives cardholder information. `[OPEN — owner: Legal]` Consumer protection regulatory assessment for the "guaranteed" reservation claim must be completed (Internal FAQ Q6).
- **Compatibility:** High Flyer is a web application accessible at `highflyer.xfinite.com`. It must function on modern desktop, tablet, and mobile browsers without a native app. It integrates with the Xfinite account platform for SSO and card eligibility verification. `[OPEN — owner: Engineering/Xfinite Platform]` The SSO integration scope — which cardholder data fields High Flyer receives from the Xfinite platform (name, email, card status, card tier) — must be defined and agreed with the Xfinite platform team before authentication can be built.
- **Venue inventory pipeline:** `[BLOCKED — pending BLOCKER Q1]` The technical model for venue inventory (pre-allocated block held by Xfinite vs. real-time availability channel from the venue) must be defined before the booking confirmation flow, latency SLAs, and fallback behavior can be architected. This is the foundational infrastructure decision for the product.

---

## Open Questions

All `[OPEN]` and `[BLOCKER]` items from the FAQs that affect requirements are surfaced below. None have been silently resolved.

### Blockers — must be resolved before the dependent requirement can be built

- `[BLOCKER]` **Venue integration model (pre-allocated block vs. real-time channel)** — blocks: REQ-2 (venue browsing availability data), REQ-4 (confirmation flow and latency model), Technical Requirements (infrastructure sizing, fallback UX). Owner: Engineering/Partnerships. Source: Internal FAQ Q1.

- `[BLOCKER]` **Venue-facing verification protocol (door handshake — QR code, tokenized reference, or other tamper-resistant artifact)** — blocks: REQ-4 (confirmation artifact specification), REQ-1 (full MFA assessment). Owner: Engineering/Security. Source: Internal FAQ Q2.

- `[BLOCKER]` **Minimum launch venue slate per city — venues contracted and committed before any city goes live** — blocks: REQ-2 (browsing cannot be tested against real supply), launch readiness for any city. Owner: Partnerships. Source: Internal FAQ Q4.

- `[BLOCKER]` **"Guaranteed" scope defined in cardholder terms and venue partnership contracts, including recovery path for failed bookings** — blocks: REQ-4 (confirmation copy and what the confirmation commits to), REQ-5 (venue-initiated cancellation handling), Edge Cases (same-night recovery process), cardholder-facing documentation. Owner: Legal. Source: Internal FAQ Q6.

- `[BLOCKER]` **Data handling policy (CCPA compliance, behavioral data classification, venue data sharing contractual terms)** — blocks: Technical Requirements (compliance), Privacy and Data documentation, venue partnership agreements. Owner: Legal/Privacy. Source: Internal FAQ Q7.

### Open items — do not block current build but must be resolved before launch or specified milestone

- `[OPEN]` **MFA before booking confirmation** — affects: REQ-1 (authentication flow), REQ-4 (confirmation step). Owner: Engineering/Security. Source: Internal FAQ Q2.

- `[OPEN]` **Reliability SLA, uptime targets (99.9% vs. 99.95%+), peak load assumptions, and fallback UX when availability cannot be confirmed in real time** — affects: Technical Requirements (performance, availability). Owner: Engineering. Source: Internal FAQ Q3.

- `[OPEN]` **Venue economic model (revenue share, fixed fee, guaranteed minimum spend, or other)** — affects: venue partnership agreements, P&L model, venue incentive to participate. Owner: Partnerships/Product. Source: Internal FAQ Q4.

- `[OPEN]` **Unit economics model (cost per confirmed booking, expected bookings per active cardholder per month, retention delta required to break even)** — affects: launch scope, city expansion pace, acceptable cost-per-booking thresholds. Owner: Finance/Product. Source: Internal FAQ Q5.

- `[OPEN]` **P&L vs. benefits line item classification** — affects: budget authority, cost approval for venue fees. Owner: Finance. Source: Internal FAQ Q5.

- `[OPEN]` **Consumer protection regulatory assessment for "guaranteed" reservation framing** — affects: cardholder terms copy, marketing copy. Owner: Legal. Source: Internal FAQ Q6.

- `[OPEN]` **Venue exclusivity model (exclusive vs. non-exclusive agreements with venue partners)** — affects: partnership strategy, competitive defensibility, partnership agreement legal terms. Owner: Partnerships/Product. Source: Internal FAQ Q8.

- `[OPEN]` **"Why now" rationale documented in product strategy brief** — affects: engineering prioritization confidence, stakeholder alignment. Owner: Product Leadership. Source: Internal FAQ Q8.

- `[OPEN]` **Confirmed launch city list** — affects: REQ-2 (city selector scope), city-expansion sequencing. Owner: Product. Source: External FAQ Q5, multiple docs.

- `[OPEN]` **Cancellation policy terms (deadline for fee-free cancellation, no-show fee, access implications of repeated no-shows)** — affects: REQ-5 (cancellation flow, terms display), cardholder terms. Owner: Product/Partnerships. Source: External FAQ Q7.

- `[OPEN]` **Booking frequency limits per cardholder** — affects: REQ-4 (rate-limiting logic), cardholder terms. Owner: Product. Source: External FAQ; docs/faq.md.

- `[OPEN]` **Internal use policy for High Flyer booking behavioral data** (marketing, cross-sell, credit decisions, or kept separate from financial profile) — affects: Privacy and Data documentation, cardholder privacy notice. Owner: Legal/Privacy. Source: External FAQ Q9, Internal FAQ Q7.

- `[OPEN]` **Venue data disclosure scope and contractual limits** (what booking data venues may receive beyond name/party size/date, and retention/use terms) — affects: venue partnership agreements, cardholder privacy notice. Owner: Legal/Privacy. Source: External FAQ Q9, Internal FAQ Q7.

- `[OPEN]` **Third-party data sharing and licensing policy** (whether anonymized/aggregated High Flyer data is shared or sold) — affects: cardholder privacy notice. Owner: Legal/Privacy. Source: External FAQ Q9.

- `[OPEN]` **Retention period for High Flyer booking history and cardholder right to request deletion independent of main Xfinite account** — affects: data infrastructure, privacy notice. Owner: Legal/Privacy. Source: External FAQ Q9.

- `[OPEN]` **Cardholder feedback mechanism specification** (in-app feedback for venue quality, as a formal input to the curation process) — affects: In Scope item in this document; feature cannot be built until the feedback data model and curation review integration are specified. Owner: Product/Curation. Source: docs/venues-and-curation.md.

- `[OPEN]` **SSO integration scope with Xfinite platform** (which cardholder data fields High Flyer receives: name, email, card status, card tier, and any others) — affects: REQ-1 (eligibility check implementation). Owner: Engineering/Xfinite Platform.

- `[OPEN]` **Booking guarantee recovery path and same-night support contact** (alternative venue routing, compensation framework, support phone/channel for same-night failures) — affects: REQ-5 (venue-initiated cancellation), Edge Cases, Troubleshooting documentation. Owner: Product/Partnerships. Source: External FAQ Q1.
