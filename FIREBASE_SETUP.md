# Firebase Setup — Wings Resort Bookings

The booking form and admin dashboard are wired to your Firebase project
(`wingsresort-1063b`) via three Firestore collections: `bookings`,
`roomBlocks` (admin block/unblock of individual rooms), and `roomPricing`
(admin price overrides). Right now, saving a booking, blocking a room, or
updating a price fails with **"Missing or insufficient permissions"** — this
is expected until you set Firestore Security Rules, which is the one step
only you can do (it requires access to your Firebase Console, which I
don't have).

> **Already published Option A before?** You only had `bookings` covered.
> Re-publish the rules below (still Option A) to add `roomBlocks` and
> `roomPricing` — otherwise the new Rooms & Pricing tab in the admin
> dashboard will fail to load or save.

## Do this now: open Firestore, then set rules

1. Go to the [Firebase Console](https://console.firebase.google.com/) → project **wingsresort-1063b**.
2. **Build → Firestore Database.** If you see a "Create database" button, click it once (any region close to India, e.g. `asia-south1`), start in **production mode**.
3. Go to the **Rules** tab and replace the contents with the block below, then click **Publish**.

### Option A — quick, matches the site exactly as built (ships today)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /bookings/{bookingId} {
      allow create: if true;
      allow read, update, delete: if true;
    }
    match /roomBlocks/{blockId} {
      allow create, read, update, delete: if true;
    }
    match /roomPricing/{roomId} {
      allow create, read, update, delete: if true;
    }
  }
}
```

**Important tradeoff:** the admin login screen (`wingsresort` / `123456`) is
a UI gate only — it lives in the browser bundle, so it can be read by
anyone who opens dev tools. It is **not** real authentication. With the
rules above, anyone who finds your Firestore project id could read or
change guest bookings directly (name, phone, email, address) without going
through your website at all. This is fine for a quick internal/demo
rollout, but not for storing real guest data long-term.

### Option B — recommended before going live with real guests

Add real Firebase Authentication so only a logged-in admin can read/update/
delete bookings, while guests can still create a booking without logging in:

1. **Build → Authentication → Sign-in method** → enable **Email/Password**.
2. **Authentication → Users → Add user** → create one admin account (e.g. `admin@wingsresort.in` + a strong password).
3. Use these rules instead:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /bookings/{bookingId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    match /roomBlocks/{blockId} {
      allow create, read, update, delete: if request.auth != null;
    }
    match /roomPricing/{roomId} {
      allow create, read, update, delete: if request.auth != null;
    }
  }
}
```

4. Tell me when this is done and I'll swap the admin login screen to sign in
   with Firebase Authentication (still showing your preferred username in
   the UI) instead of the hardcoded check — the guest-facing booking form
   doesn't need to change either way.

## Email Notifications on Booking

Every confirmed booking opens WhatsApp with the full details, and separately
emails the same details to **reception@wingsresort.com** via
[Web3Forms](https://web3forms.com) — a client-side form-to-email service, so
it needs no Firestore collection, no SMTP, and no Firebase Console setup at
all. See `src/lib/web3forms.ts`. (An earlier version of this routed through a
Firestore `mail` collection + the Firebase "Trigger Email" extension — that's
been replaced by Web3Forms, so there's no extension to install or SMTP to
configure anymore.)

## What's already wired

- `src/lib/firebase.ts` — Firebase app + Firestore client, using the config you gave.
- `src/lib/bookingsRepo.ts` — `createBooking`, `subscribeToBookings` (realtime), `updateBookingStatus`, `deleteBooking`.
- `src/lib/roomsRepo.ts` — `createRoomBlock`, `deleteRoomBlock`, `subscribeToRoomBlocks`, `updateRoomPricing`, `subscribeToRoomPricing`.
- `src/lib/web3forms.ts` — `sendBookingEnquiryEmail`, emails reception via Web3Forms.
- Booking form (`RoomBookingModal`) writes a document per booking request, opens WhatsApp with the bill, and emails reception the same details (best-effort — never blocks the booking if the email fails).
- Admin dashboard (`AdminDashboardPage`) has two tabs:
  - **Bookings** — lists bookings in realtime, lets you change status or delete a booking.
  - **Rooms & Pricing** (`AdminRoomsPanel`) — edit each room category's weekday/weekend price (applies site-wide instantly), block/unblock individual rooms (3BHK Room 1–2, 2BHK Room 201–207, Couples Rooms 1–5, A Type Wood House, Wood House, Family Room) with a date range and reason, and a rolling 12-month calendar (per room) showing nightly rate + open/blocked dates.

Once rules are published, everything works with no further code changes —
refresh the site and submit a booking to confirm.
