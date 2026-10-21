# Alternote — Product & Function Brief

Condensed from the PRD (Phase 1 + 1.1), FRD v2.0 (+ Phase 1.1) and ADR v1.0. Written 12 Oct 2026.
Where the three disagree, this brief follows the newest text and lists the conflict in section 10.

---

## 1. Why this exists

Boutiques in India run on WhatsApp threads, paper measurement registers and handwritten bills. Three problems follow:

1. **Measurements get lost.** Finding a returning client's measurements means flipping through notebooks. No search, no backup.
2. **Orders are chaos.** Delivery dates are missed, bills are photos of handwriting, nobody has one view of what is in progress, due or paid.
3. **The owner is blind.** No monthly revenue, no best-client list, no idea which work earns the most.

Alternote replaces all three with one mobile-first app where each staff member sees only what their role allows.

**The differentiator is the measurement module:** every boutique defines its own templates and fields, and any client's measurements are found by name in seconds.

## 2. Who it is for

| Person | Who they are | What they want |
|---|---|---|
| Priya, owner | Runs a boutique with 2 tailors and a helper | Stop losing client data, look professional, less admin |
| Ramesh, head tailor | Low tech comfort, uses WhatsApp | Measurements available without asking the owner |
| Anika, front-desk staff | High tech comfort | One tool instead of scattered sheets, quick billing |

Market: boutiques, couture houses and independent tailors in Tier 1 and Tier 2 Indian cities. Delhi NCR first, then Mumbai, then Jaipur / Lucknow.

## 3. What success looks like

| Goal | Target |
|---|---|
| Boutiques onboarded | 500 across 3 cities within 6 months of launch |
| Monthly active use | 60%+ of onboarded boutiques |
| Free-to-paid conversion | 30% within 90 days of trial end |
| Measurement lookup time | From about 3 minutes to under 10 seconds |
| Revenue | ₹30 lakh ARR within 12 months |
| Retention (month 3 vs month 1) | Above 65% |

## 4. What the product does

### Clients
- Profile: name, phone, email, photo, tags, notes, birthday, anniversary.
- Search by name, phone or tag, with results in under 300 ms.
- Profile has three tabs: Overview, Measurements, Orders.
- A duplicate phone number shows a warning but does not block saving.

### Measurements
- Admin builds templates with any field names, types and units. Presets ship for Blouse, Lehenga, Kurti, Sherwani, Salwar and Suit, and all are editable. A blank "Generic" template works for any garment.
- One record per client per template. Saving updates it in place and stamps who edited it and when.
- Client Profile → Measurements opens a list of templates; tapping one opens its detail screen; Back returns to the list.
- Removing a field from a template never deletes values already saved.

### Orders
- Only Admin creates orders: pick client, garment details and up to 5 reference images, measurements, delivery date, one or more tailors, then review.
- Status moves Received → In Progress → Ready for Fitting → Completed → Delivered. Tailors can only move it forward.
- Measurements are pre-filled from the client's record and saved on the order as a snapshot; Admin is asked whether to copy changes back to the client record.
- Numbered `ORD-YYYY-NNNN`, per boutique, restarting each January.
- Each order has its own chat thread (text and images) and an activity log.
- Tailors are alerted on assignment and before the delivery date; overdue orders are flagged daily.

### Alterations
- A separate order type for changing an existing garment, numbered `ALT-YYYY-NNNN`.
- Records the garment, whether the boutique made it, written instructions, and optional current → target measurements.
- These measurements live on the alteration only. The client's saved measurements are never changed.
- No invoice is created automatically; Admin generates one when ready.

### Billing
- An empty invoice is created automatically with every regular order, numbered `INV-YYYY-NNNN`.
- Total = line items − discount + extra charge + GST. Balance = total − payments received.
- Status is derived, never set by hand: Pending, Partially Paid or Paid.
- Invoice goes out as a PDF, shared through WhatsApp or downloaded.
- Every invoice and payment is permanently stamped with the admin who recorded it.

### Analytics
- Dashboard: revenue this month, pending payments, orders by status, today's deliveries, recent activity.
- Analytics screen: revenue and order volume over time, then top clients, delivery performance and month comparison.

### Phase 1.1 additions (May 2026)
| Addition | Priority | What it is |
|---|---|---|
| Flexible templates | P0 | The fully custom and Generic templates described above |
| Login upgrade | P0 | Signup form with mobile OTP, Google sign-in, profile picker, 4-digit PIN per profile, lockouts |
| Conversations | P1 | Team direct messages and group chats, separate from order chat; voice calls; video optional |
| Custom roles | P1 | Admin-named roles (Cutter, Receptionist…) with switchable permissions |
| Full web dashboard | P1 | Everything Admin can do on mobile, in a desktop browser, Admin only |

## 5. Who can do what

All staff share one boutique login, then pick their own profile and enter their PIN.

| Capability | Admin | Help / Assistant | Tailor |
|---|---|---|---|
| Clients: view and edit | Yes | Yes | No |
| Measurements | View and edit | View and edit | Read-only, assigned orders only |
| Templates | Yes | No | No |
| Create orders | Yes | No | No |
| See orders | All | All | Assigned only |
| Update status | Any direction | Forward only | Forward only, assigned |
| Billing, payments, revenue, analytics | Yes | No | No |
| Staff and settings | Yes | Own profile and PIN | Own profile and PIN |
| Web dashboard | Yes | No | No |
| Conversations | Yes | Yes | Yes |

Tailors see the client's first name only, and Admin can switch even that off.

## 6. Rules that must never break

1. Every database query is filtered by the boutique's ID, taken from the login token and never from the request.
2. Billing and payment data is refused by the server for anyone not allowed, not merely hidden on screen. The billing tab is not rendered at all for them.
3. Revenue and finance views are Admin-only and cannot be granted to any other role.
4. Tailors only ever receive their own assigned orders from the server.
5. Web login is refused for non-Admin profiles.
6. "Created by" and "recorded by" stamps are written once and never changed.
7. Alteration measurements never touch the client's saved record.
8. Order, invoice and alteration numbers never change once issued and never share a sequence.
9. PINs are stored hashed. Login tokens are kept in secure device storage or a protected cookie.
10. When a trial ends the account becomes read-only. Data is never deleted.

## 7. Plans and pricing

| Plan | Price / month | Clients | Headline limits |
|---|---|---|---|
| Free trial | ₹0 | All features | Ends in read-only mode |
| Solo | ₹499 | 50 | 2 preset templates, Alternote-branded invoices, no WhatsApp, no export |
| Studio | ₹799 | 150 | 5 templates, WhatsApp, Razorpay, Shiprocket |
| Growth | ₹1,499 | 500 | Unlimited templates, own-brand invoices, analytics + export, team chat, web dashboard |
| Pro | ₹2,499 | 1,000 | Adds in-app voice and video calls |
| Couture | ₹3,999 | Unlimited | Adds priority support and dedicated onboarding |

Also: 20% off annual payment, ₹2,500 one-time white-glove onboarding, group rates for boutique associations.
Trial length, staff limits and the number of plans are not consistent across the documents; see section 10.

## 8. How it is built (ADR v1.0, locked)

| Part | Choice |
|---|---|
| Mobile app | Expo (React Native) |
| Web dashboard and API | Next.js on Vercel, API routes in the same project |
| Database and file storage | Supabase (Postgres and Storage only; Supabase Auth is not used) |
| Login | Hand-built two-step tokens: boutique login, then staff PIN |
| OTP | MSG91 |
| Google sign-in | next-auth |
| Live sync | Supabase Realtime |
| Sessions and permission refresh | Upstash Redis |
| Push notifications | Expo Push |
| Mobile builds | Expo EAS |

The ADR assumes a solo founder building with Claude Code, with no separate backend or DevOps team.

## 9. What ships first

- **P0, required at launch:** client profiles and search, custom templates and measurements, order creation and status pipeline, delivery alerts, invoices with advance and balance, PDF and WhatsApp sharing, revenue and order dashboard, business profile, staff and roles, alterations, signup with OTP and PIN login.
- **P1, within 60 days after launch:** custom tags, CSV import, measurement PDF, named measurement sets, multi-garment orders, GST and discounts, top clients and delivery reports, conversations, custom roles, full web dashboard.
- **P2, later:** birthday reminders, quick-entry mode, payment reminders, staff performance, report export.
- **Out of scope for Phase 1:** consumer marketplace, self-measurement guides, video appointments, ratings, portfolios, clients paying through the app, AI sizing.

## 10. Where the documents disagree

### Needs your decision before building

| # | Topic | Conflict |
|---|---|---|
| 1 | Trial length | PRD says 30 days. FRD and ADR say 14 days. |
| 2 | Plans | PRD has five paid plans. FRD and the database field have three (Starter, Growth, Premium). |
| 3 | Staff limits | PRD pricing table: 3 / 7 / 10 / 15. PRD feature table: 1 / 3 / 5 / 10. FRD: Starter 1 in one place and 3 in another, Growth 5 and 10. |
| 4 | Client cap on Growth | PRD says 500. FRD says unlimited. |
| 5 | Measurement history | PRD lists "every change logged, never overwritten" as P0. FRD says edit in place with no history. You deferred named sets to post-launch in May. |
| 6 | Assistant permissions | FRD section 2 says Help cannot create orders or see analytics. The FRD permission matrix (9.4) grants Assistant order creation, order editing and analytics. |
| 7 | Billing for non-admins | FRD section 8 says all billing is Admin-only, absolutely. Phase 1.1 lets Admin grant bill generation to other roles, yet keeps Invoice History Admin-only. It is unclear what a granted role can see. Two different permission-key schemes are also used. |
| 8 | Role tiers | The PRD plan table uses "Basic / Full / Custom" roles and permissions without defining them. |
| 9 | Advance payment | One formula subtracts the advance from the balance separately; the other counts only payment entries. It must be one or the other. |
| 10 | Alteration invoices | An invoice requires a regular order and is "one per order". Alterations are not orders, so their invoices have nothing to attach to. |
| 11 | Delivery reminder | Described as 48 hours before delivery in one place and as "due tomorrow" from an hourly job in another. |
| 12 | Shiprocket | PRD lists third-party logistics as out of scope. FRD and the plan table include Shiprocket. |
| 13 | Timeline | PRD plans 10–14 months with a team. The ADR assumes a solo founder. Offline mode and WhatsApp alerts are both marked P0. |

### Settled by the newer text, but the old text is still in the FRD

| Topic | Old text | Current rule |
|---|---|---|
| Tech stack | PRD section 8 and FRD 14.1: React Native, React, Node, AWS S3, Firebase | ADR stack in section 8 above |
| PIN | 4–6 digits, locked for 30 minutes | 4 digits, locked until Admin unlocks |
| Deleting a template | Soft delete with a warning | Blocked if records exist; archive instead |
| Template fields | Numeric / text / select, with required flag | Text / number, nothing required by default (whether "select" survives is not stated) |
| Returning login | App reopens to profile select | Logout returns to the username and password screen |
| Tailor navigation | My Orders, Settings | My Orders, Chats, Settings |
| Screen count | FRD says 55 or 57 | ADR says 61; the HTML prototype is the reference |
| Naming | "boutique" / "business", "Help" / "Assistant", `staff` / `staff_profiles` used interchangeably | ADR uses `businesses` and `staff_profiles` |
| Business record | No username; email optional | Username required and globally unique; email required at signup |

## 11. Source documents

| Need | File |
|---|---|
| Business logic, data fields, validation | `documents/Alternote_FRD_v2.docx` |
| Motive, personas, pricing, priorities | `documents/Alternote_Phase1_PRD.docx` |
| Tech stack, login design, folder layout | `documents/Alternote_ADR_v1.docx` |
| Look and feel of every screen | `alternote.html` |
| Test cases TC-001 to TC-050 | `documents/Alternote_Test_Cases_1.xlsx` |
