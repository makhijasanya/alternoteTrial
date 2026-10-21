# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
Feed this file to every Claude Code session before writing any code.

---

## What This Is

Alternote is a business CRM built exclusively for India's boutique and couture ecosystem — replacing WhatsApp threads, physical measurement registers, and handwritten invoices with a structured, role-based, mobile-first platform.

This repository contains:

| File / Folder | Purpose |
|---|---|
| `alternote.html` | Single-file HTML design prototype (61 screens). No build step. Open in browser. |
| `documents/Alternote_FRD_v2.docx` | FRD v2.0 + Phase 1.1 — authoritative for business logic, data models, all validation rules |
| `documents/Alternote_Phase1_PRD.docx` | PRD Phase 1 + Phase 1.1 — personas, monetisation, features, timeline |
| `documents/Alternote_ADR_v1.docx` | Architecture Decision Record — tech stack, auth architecture, folder structure (LOCKED) |
| `src/` | Vite + React 18 frontend (prototype implementation, not the production codebase) |

**Source of truth hierarchy:**
1. `alternote.html` — authoritative for design (colors, fonts, spacing, layout, component patterns)
2. FRD v2.0 — authoritative for business logic, data models, validation rules, access control
3. ADR v1.0 — authoritative for tech stack and architecture decisions

---

## React Prototype (`src/`)

This is a Vite + React 18 single-page prototype — all 55 screens wired together with dummy seed data, stack-based navigation, and a role-switcher. **Not the production app** — it is a design/flow validation tool.

```
npm install    # first time
npm run dev    # http://localhost:5173
npm run build  # production bundle check
```

### Folder Structure

```
src/
  styles/
    tokens.css          ← CSS variables (all brand colors, radii, shadows)
    global.css          ← Resets, .stage, .phone-frame, .web-frame, scrollbars
    animations.css      ← slide-in-right, slide-out-left, fade-in, slide-up keyframes
  state/
    data.js             ← All seed data (CLIENTS_DATA, ORDERS_DATA, INIT_MESSAGES, STAFF, etc.)
    AppContext.jsx       ← useReducer global state; useApp() hook
  navigation/
    NavContext.jsx       ← Stack-based nav (PUSH/POP/REPLACE/RESET); useNav() hook
  components/           ← All shared UI components (see §Component Library below)
  screens/
    onboarding/         ← SplashScreen, LoginScreen, SignUpScreen, OTPScreen,
                           ProfileSelectScreen, SetupScreen, TemplateSetupScreen,
                           StaffSetupScreen, OnboardDoneScreen
    admin/              ← DashboardScreen, ClientListScreen, ClientProfileScreen,
                           AddClientScreen, EditClientScreen, MeasurementScreen,
                           NewOrderScreens, OrderListScreen, OrderDetailScreen,
                           BillingScreens, AnalyticsScreen, SettingsScreens,
                           PaymentScreens, ConversationsScreen, AdminNav
    alteration/         ← AlterationScreens.jsx (all 7 screens in one file)
    tailor/             ← TailorScreens.jsx (all 5 screens in one file)
    help/               ← HelpScreens.jsx (all 4 screens in one file)
    web/                ← WebScreens.jsx (all 5 screens in one file)
    index.js            ← SCREEN_MAP: maps nav IDs → components + param keys
  App.jsx               ← Stage, PhoneFrame/WebFrame, AnimatedScreen, RoleSwitcher
  main.jsx              ← Vite entry point
```

### Navigation IDs (SCREEN_MAP keys)

| Role | Screen ID | Component |
|---|---|---|
| Onboarding | `splash`, `login`, `signUp`, `otp`, `profileSelect`, `setup`, `templateSetup`, `staffSetup`, `onboardDone` | |
| Admin | `dashboard`, `clientList`, `clientProfile`, `addClient`, `editClient`, `measurements`, `orderList`, `orderDetail`, `orderS1`–`orderS4`, `orderReview`, `billingHistory`, `billing`, `analytics`, `settings`, `settingsBiz`, `settingsStaff`, `settingsTemplates`, `settingsRoles`, `paymentSetup`, `paymentLink`, `conversations` | |
| Alteration | `alterClient`, `alterNew`, `alterMeas`, `alterDelivery`, `alterReview`, `alterDetail`, `alterBill` | |
| Tailor | `tailorOrders`, `tailorOrderDetail`, `tailorChats`, `tailorChat`, `tailorSettings` | |
| Help | `helpDash`, `helpOrders`, `helpOrderDetail`, `helpSettings` | |
| Web | `webAnalytics`, `webClients`, `webBilling`, `webSettings`, `webBlocked` | |

### Component Library

| Component | File | Usage |
|---|---|---|
| `StitchStar`, `Wordmark`, `LogoLockup` | `Brand.jsx` | Brand mark (8-arm SVG) + wordmark |
| `StatusBar` | `StatusBar.jsx` | Mobile status bar with time + battery |
| `TopHeader` | `TopHeader.jsx` | Screen header with optional back + right action |
| `Tag`, `StatusPill` | `Tag.jsx` | Pill tags + colored dot status indicators |
| `Avatar` | `Avatar.jsx` | Initials circle/squircle |
| `Btn`, `Btn2`, `IconBtn` | `Button.jsx` | Primary (crimson), secondary (gray), icon |
| `Input`, `PasswordInput`, `TextareaInput`, `SelectInput` | `Input.jsx` | Form inputs |
| `SearchBar`, `FilterChips` | `SearchBar.jsx` | Search + horizontal chip filters |
| `Divider`, `SectionLabel`, `Card`, `Csm`, `InfoBanner`, `MetricCard` | `Layout.jsx` | Layout primitives |
| `TabBar`, `StepProgress`, `BottomNav` | `TabBar.jsx` | Horizontal tabs, step progress bars, bottom nav |
| `FAB`, `OrderCard`, `ClientRow`, `MeasRow`, `BarChart` | `Cards.jsx` | List cards, measurement row, bar chart |

### AppContext Actions

```js
dispatch({ type: 'SET_PROFILE', profile })           // switch role
dispatch({ type: 'UPDATE_NEW_ORDER', data })         // multi-step order form
dispatch({ type: 'RESET_NEW_ORDER' })
dispatch({ type: 'ADD_ORDER', order })
dispatch({ type: 'UPDATE_STATUS', id, status })
dispatch({ type: 'MARK_PAID', id })
dispatch({ type: 'SEND_MSG', orderId, text })
dispatch({ type: 'ADD_CLIENT', client })
dispatch({ type: 'UPDATE_CLIENT', id, data })
dispatch({ type: 'UPDATE_MEASUREMENTS', clientId, measurements })
```

---

## Design System

**CSS variables (`:root` in `tokens.css`):**

| Variable | Value | Usage |
|---|---|---|
| `--cr` | `#d9385e` | Crimson Rose — CTAs, active states, brand |
| `--dn` | `#0f172a` | Deep Navy — headings, text, sidebars |
| `--ow` | `#fdfbf7` | Off-White — screen backgrounds |
| `--wh` | `#ffffff` | White — cards, inputs, modals |
| `--sl` | `#64748b` | Slate — secondary text, placeholders, labels |
| `--bg` | `#f1f5f9` | Background — page bg, input bg |
| `--border` | `#e2e8f0` | Borders, dividers, table lines |
| `--success` | `#10b981` | Paid status, success states |
| `--warning` | `#f59e0b` | Partially paid, trial ending alerts |
| `--danger` | `#ef4444` | Overdue, errors, destructive actions |

**Typography:**
- `DM Sans` (300/400/500/600) — body, UI, all inputs
- `DM Serif Display` — logo, display headings, metric values
- `Hanken Grotesk` (700/800) — brand wordmark only

**Mobile frame:** 390×844px · `border-radius: 44px` · navy bezel box-shadow
**Web frame:** 960×640px · `border-radius: 16px` · flat card

---

## Complete Screen Inventory (55 screens — Phase 1.1)

### Onboarding (9)
`splash`, `login` / `s-login`, `s-signup` (sign up form), `s-otp` (OTP verify), `s-profile-picker` (Netflix grid), `s-setup` (boutique profile), `s-tmpl` (templates), `s-staff-setup`, `s-onboard-done`

### Admin Mobile (23)
`adash`, `clist`, `cprof`, `add-client`, `edit-client`, `s-meas-list` (measurements list per client), `s-meas-template` (template detail), `nord-s1`–`nord-s4` + `nord-review` (new order flow), `olist`, `odet`, `bill`, `bhist`, `mobile-analytics`, `settings`, `settings-biz`, `settings-staff`, `settings-templates`, `settings-roles`, `s-conversations`, `s-conv-dm`

### Help / Assistant (5)
`hdash`, `hords`, `h-odet`, `h-settings`, `s-h-conversations`

### Tailor (5)
`tords`, `todet`, `t-settings`, `chat`, `s-t-conversations`

### Alteration (8)
`alter-client`, `alter-new`, `alter-meas`, `alter-delivery`, `alter-review`, `alter-detail`, `alter-bill`, `t-alter-detail` (tailor view)

### Web Dashboard (5)
`wdash`, `wclients`, `wbill`, `wsettings`, `s-web-blocked`

---

## Three User Roles (+ Custom Roles in Phase 1.1)

### Admin
Full access. Only role that can access Finances. Multiple per boutique account. Every financial action permanently attributed to the specific admin (immutable).

### Help / Assistant
Can view/edit clients, measurements, all orders, order status, order chat.
**Cannot access:** billing, invoices, payments, revenue data, analytics, staff management.
**Cannot create:** new orders, templates, staff profiles.
Billing tab is **completely absent from DOM** — not hidden, not rendered.

### Tailor
Sees **only assigned orders**. Read-only measurements (order snapshot only). Forward-only status updates. Client first name only (surname hidden). No billing, no analytics, no client profiles.
3-tab bottom nav: My Orders / Chats / Settings.

### Custom Roles (Phase 1.1)
Admin can create custom roles with any name (Cutter, Embroiderer, Receptionist, etc.).
- `bill_generation` — grantable: invoices, record payment, view order history
- `finances.*` — **never grantable to any non-Admin role** — hardcoded Admin-only at API layer (HTTP 403)
- `client_data` — independently configurable per role
- Custom role cannot be deleted while staff are assigned (API returns 409)
- Tailor client name visibility: boutique-level boolean toggle in `businesses` table (default: `true`)
- Permission changes propagate within 60 seconds via Redis pub/sub — no logout required

### Role-Based Access Matrix

| Capability | Admin | Help | Tailor | Notes |
|---|---|---|---|---|
| Client Profile — View/Edit | ✔ | ✔ | ✖ | Tailors: zero client data |
| Measurements — View | ✔ | ✔ | Order only (read-only) | |
| Measurements — Edit | ✔ | ✔ | ✖ | |
| Measurement Templates | ✔ | ✖ | ✖ | Admin only |
| Order — Create | ✔ | ✖ | ✖ | Admin only |
| Order — View | All | All | Assigned only | |
| Order — Status Update | ✔ | ✔ | Forward-only, assigned | |
| Order Chat | ✔ | ✔ | Assigned only | |
| Billing / Invoice | ✔ | ✖ | ✖ | Zero exposure — API 403 |
| Analytics / Revenue | ✔ | ✖ | ✖ | Zero exposure — API 403 |
| Staff Management | ✔ | ✖ | ✖ | |
| Web Dashboard Login | ✔ | ✖ | ✖ | API 403 for non-Admin web login |
| Conversations | ✔ | ✔ | ✔ | All roles |

---

## Key Business Rules

### Order & ID Numbering
- **Order numbers:** `ORD-YYYY-NNNN` — separate auto-sequence per business per year, resets Jan 1, immutable once set
- **Invoice numbers:** `INV-YYYY-NNNN` — separate sequence from orders
- **Alteration numbers:** `ALT-YYYY-NNNN` — separate sequence, never shares with ORD or INV
- Admin is the ONLY role that can create new orders

### Measurements
- **One active record rule:** Each client has one active measurement record per template (`client_id + template_id` unique). Editing = UPDATE in place, no auto-versioning.
- **Save as New Set:** Only created on explicit user action with a user-supplied label. Creates a second record with non-null `label`.
- **Alteration measurements:** Stored on the alteration order only (`alteration_measurements` JSON). **Client master record is NEVER modified.**
- **Order measurement sync:** On order save, if values differ from client master → prompt admin to sync. Optional — admin can decline.
- **Deleted field preservation:** Deleting a field from a template does NOT delete existing measurement values — JSON values are retained, just not rendered in forms.

### Measurements Navigation (Phase 1.1)
- Client Profile → Measurements tab → opens **Measurements List** (`s-meas-list`) — lists all templates with last-updated + editor name
- Tapping a template row → **Template Detail** (`s-meas-template`): `"{Template Name} Measurements — {Client First Name}"`
- Back from Template Detail → Measurements List (NOT client profile root)
- Tailor role: Edit button absent from DOM entirely on measurement screens (not just hidden)

### Billing
- Alteration invoices: **manually triggered** by admin, never auto-created on placement
- Regular orders: empty invoice shell auto-created on order placement
- Invoice calculation: `subtotal − discount + markup + GST = total`. `balance_due = total − SUM(payments)`
- Payment status auto-derived: `balance = 0 → paid`, `balance > 0 and payments > 0 → partially_paid`, `no payments → pending`
- Every invoice + payment permanently attributed to the admin who acted (immutable `created_by` + `created_at`)

### Delivery Alerts
- Push + WhatsApp to all assigned tailors + all admins at `delivery_date − 48 hours`
- Daily cron at 00:01 IST flags overdue orders (status ≠ delivered and delivery_date < today)
- If delivery date changes: cancel previous scheduled job, reschedule

### Trial Expiry
- Days 1–11: full access, no banners
- Day 11 (3 days left): in-app banner + push notification
- Day 14: full-screen modal on app open
- Day 15+: **read-only mode** — can view all data, cannot create/edit. Data is **never deleted**.

### Signup Flow (Phase 1.1 — `s-signup` + `s-otp`)
Required fields: Boutique Name, Owner Name, Mobile, Email, City, Username (unique globally), Password
Optional: GSTIN (15-char alphanumeric — validated if provided)
- Username uniqueness validated inline (on blur + on submit). Error: "This username is already taken."
- After form submit: 6-digit OTP sent to mobile (MSG91). Expires in 5 minutes. Resend after 60s cooldown.
- On OTP success: account created. First profile auto-assigned Admin role.
- Google SSO: pre-fills email from Google; remaining fields still required.

### Profile Picker & PIN Auth (Phase 1.1 — `s-profile-picker`)
- Netflix-style profile grid after credential auth. No profile auto-selected.
- Exception: single-profile accounts skip picker → go directly to PIN entry.
- Wrong PIN: show remaining attempts. 5 consecutive wrong PINs → profile locked → alert to Admin.
- 5 wrong **password** attempts on login → 10-minute account lockout (counter in Redis). Auto-lifts after 10 min.
- Logout: clears session, returns to Login screen (NOT profile picker). No credentials cached.

### Conversations Module (Phase 1.1)
- Separate from per-order chat. All roles can access.
- 1:1 DMs + group chats (2+ members) within the same boutique account
- In-app voice calls from DM threads (all roles). Video calls optional/deferrable.
- Contact list restricted to registered team members only — no external contacts.
- Unread count badge on Conversations nav item.

### Web Dashboard (Phase 1.1)
- **Admin-only.** Non-Admin login via web → HTTP 403 → show `s-web-blocked`
- Full feature parity with mobile Admin: Dashboard, Clients, Measurements, Orders, Billing, Analytics, Settings
- Minimum viewport: 1280×800px without horizontal scrolling
- Real-time sync between web and mobile sessions via WebSocket (Supabase Realtime)

### API Security Rules (non-negotiable)
- ALL `/invoice` and `/payment` routes → HTTP 403 for non-Admin. UI hiding is NOT sufficient.
- Tailor routes → `WHERE assigned_tailor_id = :current_staff_id` enforced at query layer.
- Web login → HTTP 403 if resolved role ≠ Admin.
- `finances.*` permissions → never in `role_permissions` for non-Admin. INSERT returns 403.
- Billing tab → **absent from DOM entirely** for non-Admin. Not hidden. Not rendered.
- **Multi-tenancy:** EVERY query must filter by `business_id`. Never taken from request body — always from JWT.

---

## Tech Stack (from ADR v1.0 — LOCKED)

| Layer | Technology | Reason |
|---|---|---|
| Mobile App | **Expo (React Native)** | Camera, offline, push notifs — all plugins ready. No Mac needed for builds. |
| Web Dashboard | **Next.js (App Router)** | Admin-only web app. API routes live here too. One Vercel deployment. |
| Backend API | **Next.js API Routes** | No separate server. API + web in one codebase. |
| Database | **Supabase (PostgreSQL only)** | Managed Postgres — used as pure DB. Supabase Auth NOT used. |
| File Storage | **Supabase Storage** | S3-compatible. Handles client photos, images, logos. |
| Auth | **Custom JWT (hand-rolled)** | 2-layer auth (business login → staff PIN). Supabase Auth cannot model this. |
| OTP | **MSG91** | Indian SMS provider — reliable, cheap. |
| Google SSO | **next-auth** | Google Sign-In on login + signup. Maps to existing business account by email. |
| Real-time Sync | **Supabase Realtime** | WebSocket push. Web↔mobile sync + permission propagation. |
| Session Cache | **Redis (Upstash)** | JWT denylist on logout. Permission invalidation pub/sub. Serverless-friendly. |
| Push Notifications | **Expo Push Notifications** | Wraps FCM. Works for iOS + Android from one API call. |
| Hosting (Web) | **Vercel** | Next.js native. Zero-config deploy. |
| Hosting (Mobile) | **Expo EAS** | Cloud builds. Produces .ipa + .apk. No Mac required. |

**NOT using:** Supabase Auth, bare React Native, separate Node.js server, GraphQL, Elasticsearch, microservices.

### Auth Architecture (2-layer)

**Layer 1 — Business Account Login**
`username + password → verify in businesses table → issue Layer 1 JWT (contains: business_id)`
- Google SSO maps Google email to existing business account
- 5 wrong password attempts → 10-min account lockout (Redis counter)

**Layer 2 — Staff Profile + PIN**
`select profile → enter PIN → verify in staff_profiles table → issue Layer 2 JWT`
- JWT payload: `{ business_id, staff_id, role, permissions: [...], iat, exp: 30d }`
- 5 wrong PINs → profile locked; Admin unlocks from Settings → Staff Management
- Single-profile accounts: skip picker, go straight to PIN
- Storage (mobile): `Expo SecureStore` (iOS Keychain / Android Keystore)
- Storage (web): `httpOnly cookie` — never localStorage
- Logout: adds token to Redis denylist (immediately invalid)
- Permission change: Redis pub/sub invalidation within 60 seconds — no re-login needed

---

## Data Models (Key Fields)

### Business
`id (uuid), name, username (unique globally), city, phone, email, logo_url, gst_number, address, plan (enum: free_trial|starter|growth|premium), trial_ends_at, tailor_client_name_visible (bool, default: true)`

### Staff Profile
`id, business_id, name, role (enum: admin|help|tailor), role_id (FK roles), phone, whatsapp_number, pin_hash (bcrypt), is_active (soft delete), created_by`

### Client
`id, business_id, name, phone (10-digit Indian, unique-warn per business), email, photo_url, tags (String[]), notes, birthday, anniversary, created_by`

### Measurement Template
`id, business_id, name (unique per business), fields (JSON array of field objects), sort_order, is_active`
- Field object: `{ field_id, label, type (numeric|text|select), unit, options, is_required, sort_order }`

### Client Measurement Record
`id, client_id, template_id, business_id, label (nullable — set = named set), values (JSON: {field_id: value}), notes, updated_at, updated_by`
- Unique constraint: `(client_id, template_id)` unless `label` is non-null

### Order
`id, business_id, client_id, order_number (ORD-YYYY-NNNN, immutable), garment_type, description, reference_images (String[], max 5), measurement_template_id, measurement_values (JSON snapshot), tags, delivery_date, status (received|in_progress|ready_for_fitting|completed|delivered), assigned_tailors (UUID[]), created_by`

### Alteration Order
`id, business_id, client_id, alteration_number (ALT-YYYY-NNNN, immutable), garment_description, made_by_boutique (bool), instructions, reference_images (max 3), alteration_measurements (JSON: [{field_label, current_value, target_value, unit}]), assigned_tailors, delivery_date, status, invoice_id (nullable, FK — manually created)`

### Invoice
`id, order_id, business_id, client_id, invoice_number (INV-YYYY-NNNN, immutable), line_items (JSON), subtotal, discount_type, discount_value, discount_amount, markup_label, markup_amount, gst_rate, gst_amount, total_amount, advance_paid, payment_status (pending|partially_paid|paid), payment_method, created_by (immutable), created_at (immutable)`

### Roles (Phase 1.1)
`id, boutique_id, name (unique per boutique, case-insensitive), is_default (true for Admin/Help/Tailor), color_hex`

### Role Permissions
`id, role_id, permission (dot-notation key), granted_by`

### Permission Keys
```
clients.view / clients.add / clients.edit / clients.delete
orders.view / orders.create / orders.edit / orders.status / orders.delete
measurements.view / measurements.edit
billing.view / billing.create / billing.send / billing.record_payment
analytics.view
settings.business / settings.staff / settings.roles / settings.templates
```
`finances.*` keys are NEVER inserted for non-Admin — API returns 403 on attempt.

---

## Monetisation Tiers (PRD Phase 1 + 1.1)

| Plan | Price | Clients | Staff | Key Limits |
|---|---|---|---|---|
| Free Trial | 14 days full access | Unlimited | Unlimited | Expires → read-only. Data preserved forever. |
| Solo / Starter | ₹499/mo | 50 | 1 | 2 templates, Alternote invoice branding, no export, no WhatsApp |
| Studio | ₹799/mo | 150 | 3 | 5 templates, WhatsApp, Razorpay, Shiprocket |
| Growth | ₹1,499/mo | Unlimited | 5 | Unlimited templates, full analytics + export, team chat, web dashboard |
| Pro | ₹2,499/mo | Unlimited | 10 | Custom role names, hide client name from tailor, in-app voice + video |
| Couture / Premium | ₹3,999/mo | Unlimited | Unlimited | Everything + priority support + dedicated onboarding |

- Annual discount: 20% off upfront annual payment
- White-glove onboarding: ₹2,500 one-time (data migration + template setup)
- City-partner program: boutique associations at negotiated group rates

---

## Adding Screens to the HTML Prototype

1. Add nav item in the correct role section (left panel):
   ```html
   <div class="nav-item" onclick="show(this,'my-screen','Screen Title','Admin')">
     <span class="nav-icon">📋</span>Screen Name
   </div>
   ```
2. Add the screen block before `</div><script>`:
   ```html
   <div class="screen" id="s-my-screen">
   <div class="mf">
     <div class="sh" style="background:var(--wh)">
       <button style="width:30px;height:30px;border-radius:7px;background:var(--bg);border:none;cursor:pointer">←</button>
       <h1>Screen Title</h1>
     </div>
     <!-- content -->
     <div class="mf-nav">
       <div class="mf-ni"><span>🏠</span><span>Home</span></div>
       <div class="mf-ni"><span>👥</span><span>Clients</span></div>
       <div class="mf-ni on"><span>📦</span><span style="color:var(--cr)">Orders</span></div>
       <div class="mf-ni"><span>🧾</span><span>Billing</span></div>
       <div class="mf-ni"><span>⚙️</span><span>Settings</span></div>
     </div>
   </div>
   </div>
   ```

## Updating the FRD Programmatically

Use `python-docx`. Pattern to avoid `KeyError` on duplicate style names:
```python
def get_style(doc, name):
    for s in doc.styles:
        if s.name == name:
            return s
    return None

doc.add_paragraph("Section heading", style=get_style(doc, 'Heading 2'))
```

Tables require manual XML borders:
```python
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

def add_border(cell):
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    borders = OxmlElement('w:tcBorders')
    for side in ['top', 'left', 'bottom', 'right']:
        b = OxmlElement(f'w:{side}')
        b.set(qn('w:val'), 'single')
        b.set(qn('w:sz'), '4')
        b.set(qn('w:space'), '0')
        b.set(qn('w:color'), 'CCCCCC')
        borders.append(b)
    tcPr.append(borders)
```

To read a `.docx` as text: `textutil -convert txt file.docx -output out.txt` (macOS).
