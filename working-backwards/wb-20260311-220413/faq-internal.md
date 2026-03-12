# High Flyer — Internal FAQ

**Mode: INTERNAL | Product: High Flyer by Xfinite | Date: 2026-03-11**

---

## Q1. What does the technical integration with venues actually look like — and is it feasible at launch?

The press release describes venues that "don't take OpenTable reservations" and "don't have a sign on the door." These are, by definition, venues with no public-facing booking infrastructure. Every venue integration is likely to be bespoke: a direct channel (phone, SMS, dedicated portal, or human-to-human coordination) managed by Xfinite's partnerships team and abstracted by the app layer.

The "confirmed in under two minutes" promise requires either real-time slot availability surfaced by the venue (requiring a lightweight venue-side interface) or a pre-allocated block of tables held exclusively for Xfinite and managed on the Xfinite side. The latter is operationally simpler to build but requires venues to commit inventory in advance — which conflicts with how these venues operate.

The hardest technical problem is not the cardholder-facing app. It is the venue-side inventory pipeline: getting reliable, up-to-date slot availability from venues with no existing digital inventory systems, without requiring them to change their operations.

`[BLOCKER — owner: Engineering/Partnerships]` The venue integration model (pre-allocated block vs. real-time channel) must be defined before the booking confirmation flow can be architected. This choice determines latency, reliability, fallback behavior, and the scope of the venue-side tooling Partnerships must deliver.

---

## Q2. How does identity verification work end-to-end — from cardholder login to the venue's door?

The press release states cardholders sign in with existing Xfinite credentials. That establishes identity on the app side. It does not establish how the venue confirms, at the door, that the person arriving is the cardholder who made the booking — not someone who borrowed the login, shared a screenshot, or resold the slot.

Two failure modes: (a) a legitimate cardholder is turned away because the venue's verification mechanism is absent or fails, and (b) a non-cardholder gains access by exploiting a weak handshake, devaluing the benefit and damaging venue trust. Without a tamper-resistant confirmation artifact — a QR code, a tokenized booking reference, or a staff-side lookup tool for venues — the "guaranteed" framing in the press release is not technically supportable.

`[BLOCKER — owner: Engineering/Security]` A venue-facing verification protocol must be defined and built as a first-class component before launch. It is the mechanism that makes the guarantee real, and without it the product cannot be safely taken to a venue partner.

`[OPEN — owner: Engineering/Security]` MFA before booking confirmation is not described. Given the credential-sharing risk on a benefit-triggering action, MFA requirements should be assessed.

---

## Q3. What is the system reliability requirement, and are we designing for it from day one?

High Flyer is a last-minute, same-evening booking product. Demand is compressed: most bookings will occur between 4 PM and 9 PM local time. If the app is unavailable, slow, or returns an error during that window, the cardholder has no fallback — the product has failed at the worst possible moment.

"Confirmed in under two minutes" is a latency and reliability SLA. It implies: app uptime during peak booking windows, near-real-time venue availability data, and a confirmation delivery mechanism that works before the cardholder steps out. None of these are defined in the press release.

`[OPEN — owner: Engineering]` Define target uptime (99.9% is table stakes for a card benefit; 99.95%+ is likely required given the use-case window), peak load assumptions per city, and fallback UX when availability cannot be confirmed in real time.

---

## Q4. What is the supply-side cold-start strategy — and is launch credible without it?

The credibility of the product depends entirely on whether the opening venue slate is genuinely what the press release promises: venues the target customer would recognize as "the real thing." If the opening slate is thin or not recognized as exclusive by this customer segment, the product fails on its first impression — and first impressions with affluent urban travelers are decisive.

Venues with genuine exclusivity have no natural incentive to join. Their scarcity is their value. The External FAQ flagged venue incentives as an open item; internally, it is a pre-launch blocker. The product cannot launch in any city without a minimum viable slate of credible venues already contracted.

`[BLOCKER — owner: Partnerships]` Minimum venue count per city and a quality standard for launch must be defined and the venues contracted before any city goes live. Without committed supply, the product cannot be tested against its own premise.

`[OPEN — owner: Partnerships/Product]` The economic model offered to venues is undefined. Revenue share on covers? Fixed monthly access fee? Guaranteed minimum spend? The answer shapes the partnership pitch, the P&L, and the venue's willingness to hold inventory for Xfinite at short notice.

---

## Q5. What is the business model, and what do unit economics look like?

The press release positions High Flyer as a built-in card benefit, not a points redemption or a paid add-on. That framing implies the cost is absorbed by Xfinite as a retention and acquisition tool. That is a viable model for premium card products — but it requires a clear answer to what each confirmed booking costs Xfinite.

Cost drivers are currently undefined: venue access fees, per-reservation commissions or minimum spend guarantees, ops to manage venue relationships and quality control, engineering build, and any compensation costs when bookings fall through. Expected booking volume per active cardholder per month is also undefined.

`[OPEN — owner: Finance/Product]` Model the unit economics: cost per confirmed booking (venue fees + ops + engineering), expected bookings per active cardholder per month, and the required cardholder retention delta to break even as a benefits investment.

`[OPEN — owner: Finance]` Determine whether High Flyer is funded as a benefits line item or requires its own P&L. The answer affects scope, city expansion pace, and acceptable cost-per-booking thresholds.

---

## Q6. What is Xfinite's legal exposure when a "guaranteed" reservation is not honored?

The press release uses the word "guaranteed" without qualification. In a card benefit context, that carries legal weight. If a cardholder is turned away — because the venue overbooked, staff were not notified, there was a system error, or the venue withdrew — Xfinite has a potential breach-of-benefit claim.

"Guaranteed" likely needs to mean "guaranteed resolution" (alternative venue, compensation, or Xfinite-funded recovery), not "guaranteed that this specific venue will seat you." That distinction must be in both the cardholder terms and the venue partnership agreements before launch.

`[BLOCKER — owner: Legal]` "Guaranteed" as written cannot appear in cardholder-facing materials without a defined scope, a stated recovery path, and legal review. Venue partnership agreements must include terms covering no-show liability and required notification timelines.

`[OPEN — owner: Legal]` Assess whether High Flyer constitutes a regulated travel or hospitality service under applicable consumer protection statutes (state-level or federal) that could impose additional disclosure or remediation obligations.

---

## Q7. What are the data privacy obligations, and are there regulatory risks specific to this data type?

High Flyer collects behavioral data qualitatively different from standard card transaction data: travel itineraries, nightlife preferences, specific venue visits, and social context inferred from booking behavior (party size, occasion frequency). This data is location-sensitive and potentially sensitive under CCPA and any future federal privacy framework.

There is also a venue-side data exposure: venues receive booking details about cardholders. The terms under which that data is shared, retained, and used by venue partners are not defined anywhere in the press release or External FAQ.

`[BLOCKER — owner: Legal/Privacy]` A data classification and handling policy for High Flyer booking data must be completed and reviewed before launch. CCPA compliance (and applicable state equivalents) must be confirmed for behavioral travel and nightlife data. Venue data sharing terms must be contractually defined before any venue receives cardholder information.

---

## Q8. Why now — and is this defensible once a competitor sees it working?

The press release does not make a "why now" argument. The competitive risk is structural: the supply side — venue relationships — is not inherently exclusive to Xfinite. A competitor with a similar affluent cardholder base (AmEx Centurion, Chase Sapphire Reserve's concierge network, or a dedicated startup) could build the same venue network. The moat is not the technology; it is the depth and exclusivity of venue relationships, which is a function of Partnerships investment.

If venue agreements are non-exclusive, a better-resourced competitor can replicate the supply side within a funding cycle. If venues are signing exclusive agreements with Xfinite, that is defensible — but it raises the cost and complexity of the partnership agreements significantly, and it changes the venue incentive conversation.

`[OPEN — owner: Partnerships/Product]` Define the exclusivity model for venue partnerships: are venues signing exclusive arrangements with Xfinite, or is this a non-exclusive access program? The answer determines defensibility and shapes the entire partnership strategy.

`[OPEN — owner: Product Leadership]` Document the "why now" rationale: what has changed in the competitive landscape, in cardholder behavior, or in Xfinite's position that makes 2026 the right time to build this? This should be in the product strategy brief before engineering begins.

---

## PM Review Questions

Before this FAQ is finalized, please confirm:

1. Are there questions from engineering, legal, or leadership not covered here — particularly around the Xfinite credential integration (SSO scope, cardholder data sharing between Xfinite's card platform and the High Flyer app), or any regulatory obligations specific to Xfinite's card product licensing?

2. Are any blockers misclassified — either too conservative (flagged as a blocker when Partnerships has already resolved it) or not conservative enough (flagged as open when it genuinely prevents the build)?

3. Q4 (venue cold-start) is marked as a blocker and Q8 (defensibility/exclusivity) is marked as open. Is that classification correct, or should the venue exclusivity model be elevated to a blocker given its downstream impact on legal strategy and GTM?

---

## Blocker and Open Item Summary

| # | Item | Classification | Owner |
|---|---|---|---|
| Q1 | Venue integration model (pre-allocated block vs. real-time channel) | BLOCKER | Engineering/Partnerships |
| Q2 | Venue-facing verification protocol (door handshake) | BLOCKER | Engineering/Security |
| Q2 | MFA before booking confirmation | OPEN | Engineering/Security |
| Q3 | Reliability SLA, uptime targets, fallback UX | OPEN | Engineering |
| Q4 | Minimum venue slate per city contracted before launch | BLOCKER | Partnerships |
| Q4 | Venue economic model (fee structure) | OPEN | Partnerships/Product |
| Q5 | Unit economics model | OPEN | Finance/Product |
| Q5 | P&L vs. benefits line item classification | OPEN | Finance |
| Q6 | "Guaranteed" scope defined in cardholder terms + venue contracts | BLOCKER | Legal |
| Q6 | Consumer protection regulatory assessment | OPEN | Legal |
| Q7 | Data handling policy, CCPA compliance, venue data sharing terms | BLOCKER | Legal/Privacy |
| Q8 | Venue exclusivity model | OPEN | Partnerships/Product |
| Q8 | "Why now" rationale documented | OPEN | Product Leadership |

**5 blockers** must be resolved before build begins.
