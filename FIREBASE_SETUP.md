# Firebase Setup — Wings Resort Bookings

The booking form and admin dashboard are wired to your Firebase project
(`wingsresort-fd0cd`) via the Firestore `bookings` collection. Right now,
saving a booking or loading the admin dashboard fails with **"Missing or
insufficient permissions"** — this is expected until you set Firestore
Security Rules, which is the one step only you can do (it requires access
to your Firebase Console, which I don't have).

## Do this now: open Firestore, then set rules

1. Go to the [Firebase Console](https://console.firebase.google.com/) → project **wingsresort-fd0cd**.
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
  }
}
```

4. Tell me when this is done and I'll swap the admin login screen to sign in
   with Firebase Authentication (still showing your preferred username in
   the UI) instead of the hardcoded check — the guest-facing booking form
   doesn't need to change either way.

## What's already wired

- `src/lib/firebase.ts` — Firebase app + Firestore client, using the config you gave.
- `src/lib/bookingsRepo.ts` — `createBooking`, `subscribeToBookings` (realtime), `updateBookingStatus`, `deleteBooking`.
- Booking form (`RoomBookingModal`) writes a document per booking request, then opens WhatsApp with the bill.
- Admin dashboard (`AdminDashboardPage`) lists bookings in realtime, lets you change status or delete a booking.

Once rules are published, everything works with no further code changes —
refresh the site and submit a booking to confirm.
