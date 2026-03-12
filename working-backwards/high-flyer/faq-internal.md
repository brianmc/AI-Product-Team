# High Flyer — Internal FAQ
**Mode: INTERNAL**
**Product: High Flyer by Xfinite**
**Date: 2026-03-11**

---

## Q1. What does the technical integration with venues actually look like — and is it feasible at launch?

The press release describes venues that "don't take OpenTable reservations" and "don't have a sign on the door." These are, by definition, venues with no public-facing booking infrastructure. That means High Flyer cannot rely on a standard API integration against an existing reservation system. Every venue integration is likely to be bespoke: a direct channel (phone, SMS, dedicated portal, or human-to-human coordination) managed by the Xfinite partnerships team and abstracted by the app layer.

This has significant engineering implications. The "confirmed in under two minutes" promise in the press release requires either real-time slot availability surfaced by the venue (requiring a lightweight venue-side interface they must adopt) or a pre-allocated block of tables held exclusively for Xfinite and managed entirely on the Xfinite side. The latter is operationally simpler to build but requires venues to commit inventory in advance — which conflicts with how these venues currently operate.

The hardest technical problem is not the cardholder-facing app. It is the venue-side inventory pipeline: getting reliable, up-to-date slot availability from venues that have no existing digital inventory systems, without requiring them to change their operations.

`[BLOCKER — owner: Engineering/Partnerships]` The venue integration model (pre-allocated block vs. real-time channel) must be defined before the booking confirmation flow can be architected. This choice determines latency, reliability, fallback behavior, and the scope of the venue-side tooling that Partnerships must deliver.

---

## Q2. How does identity verification work end-to-end — from cardholder login to the venue's door?

The press release states cardholders sign in with existing Xfinite credentials. That establishes identity on the app side. What it does not establish is how the venue confirms, at the door, that the person arriving is the Xfinite cardholder who made the booking — not someone who borrowed the login, shared a screenshot, or resold the slot.

Two failure modes exist: (a) a cardholder is turned away because the venue's verification mechanism fails or is absent, and (b) a non-cardholder gains access by exploiting a weak handshake, devaluing the benefit for legitimate cardholders and damaging venue trust.

The External FAQ flagged the absence of a physical verification handshake. Internally, the deeper question is what the verification protocol is, who owns it technically, and what fraud controls sit upstream of the booking confirmation. Without a tamper-resistant confirmation artifact (a QR code, a tokenized booking reference, or a staff-side lookup tool for venues), the "guaranteed" framing in the press release is not technically supportable.

`[BLOCKER — owner: Engineering/Security]` A venue-facing verification protocol must be defined and built as a first-class component, not a post-launch addition. It is the mechanism that makes the guarantee real.

`[OPEN — owner: Engineering/Security]` Multi-factor authentication before booking confirmation is not described in the press release. MFA requirements for a benefit-triggering action should be assessed given credential-sharing risk.

---

## Q3. What is the system reliability requirement, and are we designing for it from day one?

High Flyer is a last-minute, same-evening booking product used by cardholders who are standing in a city on a Tuesday night. The demand window is compressed: most bookings will occur between 4 PM and 9 PM local time for same-night access. If the app is unavailable, slow, or returns an error during that window, the cardholder has no fallback — the product has failed its core promise at the worst possible moment.

The press release sets a "confirmed in under two minutes" expectation. That is a latency and reliability SLA. It implies: app uptime during peak booking windows, near-real-time venue availability data, and a confirmation delivery mechanism (push notification, email, SMS) that works reliably before the cardholder steps out.

No reliability targets, SLA commitments, or degraded-mode behavior are defined in the press release or External FAQ.

`[OPEN — owner: Engineering]` Define target uptime (99.9% is table stakes for a card benefit; 99.95%+ is likely required given the use-case window), peak load assumptions, and fallback UX when availability cannot be confirmed in real time.

---

## Q4. What is the supply-side cold-start strategy — and is launch credible without it?

The press release promises "a curated, city-specific selection" of venues across New York, Chicago, Miami, Los Angeles, and "beyond." The credibility of the product depends entirely on whether the venues in the selection are genuinely the ones "worth talking about." If the opening slate is thin, mediocre, or not recognized as exclusive by the target customer, the product fails on its first impression — and first impressions with this customer segment are decisive.

Venues with genuine exclusivity have no natural incentive to join. Their scarcity is their value. Giving Xfinite a pre-allocated block of tables on short notice requires them to accept guaranteed demand that may not convert to regulars, and to risk diluting their curated guest list with cardholders who are strangers to the room.

The External FAQ flagged this as an open item (Q2, venue incentive). Internally, it is a pre-launch blocker: the product cannot launch in any city without a minimum viable slate of credible venues already contracted. "Credible" means venues the target customer would recognize as the real thing — not venues that couldn't get into the right tier of a normal Yelp search.

`[BLOCKER — owner: Partnerships]` Minimum venue count per city and quality bar for launch must be defined and contracted before any city goes live. Without a committed supply-side slate, the product cannot be tested against its own premise.

`[OPEN — owner: Partnerships/Product]` What is the economic model Xfinite offers venues? Revenue share on covers? Fixed monthly access fee? Guaranteed minimum spend? The answer shapes the partnership pitch and the P&L.

---

## Q5. What is the business model, and what does the unit economics look like?

The press release positions High Flyer as a card benefit — "built into the card benefit, not a points redemption." That framing implies the cost is absorbed by Xfinite as a cardholder retention and acquisition tool, not charged to the cardholder at booking time. That is a viable model for premium card products (comparable to AmEx Centurion's concierge or Priority Pass), but it requires a clear answer to: what does each confirmed booking cost Xfinite?

Cost drivers are currently unknown: venue access fees, per-reservation commissions or minimum spend guarantees, staff to manage venue relationships and quality control, engineering build and ongoing ops, and any compensation costs when bookings fall through.

The press release gives no indication of how many bookings per month are expected, what the average booking cost to Xfinite is, or what cardholder retention lift is needed to justify the program economically.

`[OPEN — owner: Finance/Product]` Model the unit economics for a mature program: cost per confirmed booking (venue fees + ops), expected monthly bookings per active cardholder, and the required cardholder retention delta to break even as a card benefit investment.

`[OPEN — owner: Finance]` Determine whether High Flyer is funded as a benefits line item (cardholder acquisition/retention) or requires its own P&L justification. The answer affects scope, city expansion pace, and acceptable cost-per-booking thresholds.

---

## Q6. What is Xfinite's legal exposure when a "guaranteed" reservation is not honored?

The press release uses the word "guaranteed" without qualification. In the context of a card benefit, that word carries legal weight. If a cardholder arrives at a venue and is turned away — because the venue overbooked, because the venue's staff were not notified, because there was a system error, or because the venue decided to withdraw — Xfinite has a potential breach-of-benefit claim.

The External FAQ flagged the absence of a recovery protocol (Q1). Internally, the legal question is whether Xfinite has defined the scope of the guarantee in terms that are both defensible to cardholders and operationally achievable. "Guaranteed" likely needs to mean "guaranteed resolution" (alternative venue, compensation, or Xfinite-funded recovery), not "guaranteed that this specific venue will seat you." That distinction must be in the cardholder terms and in the venue partnership agreements.

`[BLOCKER — owner: Legal]` "Guaranteed" as written in the press release cannot go into cardholder-facing materials without a defined scope of the guarantee, a stated recovery path, and review by legal. Venue partnership agreements must include terms covering no-show liability and notification requirements.

`[OPEN — owner: Legal]` Assess whether High Flyer constitutes a regulated travel or hospitality service under any applicable consumer protection law (e.g., state-level consumer protection statutes) that could impose additional disclosure or remediation obligations.

---

## Q7. What are the data privacy obligations, and are there regulatory risks specific to this data type?

High Flyer will collect behavioral data that is qualitatively different from standard card transaction data: travel itineraries, nightlife preferences, specific venue visits, and potentially the social context of those visits (party size, occasion type). This data is inferred from booking behavior even if the cardholder never explicitly provides it.

The External FAQ flagged the absence of a stated data policy (Q9). Internally, the legal and compliance question is sharper: this data is location-sensitive, potentially sensitive under state privacy laws (CCPA, and any future federal framework), and could be commercially valuable in ways that go well beyond the stated purpose of the product. If Xfinite intends to use this data to inform cardholder profiles or share it with venue partners, that use must be disclosed and consented to — and disclosure must happen before the product launches.

There is also a venue-side data risk: venues will receive booking details about cardholders. The terms under which that data is shared, retained, and used by venue partners are not defined.

`[BLOCKER — owner: Legal/Privacy]` A data classification and handling policy for High Flyer booking data must be completed and reviewed before launch. CCPA compliance (and any applicable state equivalents) for behavioral travel/nightlife data must be confirmed. Venue data sharing terms must be contractually defined.

---

## Q8. Why now, and is this defensible — or will AmEx Centurion or a well-funded startup replicate it within 12 months?

The press release does not make a "why now" argument. It makes a compelling "why" argument (the social capital gap when traveling) but does not explain why this is the right moment for Xfinite to build it, or what makes the offering structurally defensible once launched.

The honest competitive risk is that the supply side — venue relationships — is not exclusive to Xfinite. A competitor with a similar affluent cardholder base (AmEx Centurion, Chase Sapphire Reserve's concierge network, or a dedicated startup with VC backing) could build the same venue network. The product's moat is not the technology; it is the depth and exclusivity of the venue relationships, which is a function of Partnerships investment, not engineering investment.

If the venue relationships are non-exclusive, a better-resourced competitor can replicate the supply side within a funding cycle. If venues are signing exclusive agreements with Xfinite, that is defensible — but it also raises the cost and complexity of the partnership agreements significantly.

`[OPEN — owner: Product/Partnerships]` Define the exclusivity model for venue partnerships: are venues signing exclusive arrangements with Xfinite, or is this a non-exclusive access program? The answer determines defensibility and shapes the partnership terms.

`[OPEN — owner: Product Leadership]` Document the "why now" rationale: what has changed (in the competitive landscape, in cardholder behavior, in Xfinite's position) that makes 2026 the right time to build this? This should be in the product strategy brief before engineering begins.

---

## PM Review Questions

Before this FAQ is finalized, please confirm:

1. Are there questions from engineering, legal, or leadership that are not covered here — particularly around the Xfinite credential integration (SSO scope, cardholder data sharing between Xfinite's card platform and the High Flyer app), or any regulatory obligations specific to Xfinite's card product licensing?

2. Are any blockers misclassified — either too conservative (flagged as a blocker when Partnerships has already resolved it) or not conservative enough (flagged as open when it is genuinely preventing the build)?

3. Q4 (venue cold-start) and Q8 (defensibility) are marked differently — Q4 as a blocker and Q8 as open. Is that classification correct, or should the exclusivity model for venue partnerships be elevated to a blocker given its impact on the GTM and legal strategy?
