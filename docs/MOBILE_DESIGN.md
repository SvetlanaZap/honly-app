# HOnly — Mobile App Design Template

*June 2026 · approved baseline for all mobile screens*

This is the confirmed visual template for the HOnly mobile app. All future user-flow screens should be built on these tokens, components, and patterns.

**Live mockup:** https://honly-app.vercel.app/mobile.html
**Source:** [`public/mobile.html`](../public/mobile.html)

---

## Design tokens

| Token | Value |
|---|---|
| Coral (primary) | `#E8654A` |
| Teal (secondary) | `#3CBEA8` |
| Navy (text / dark surfaces) | `#1B2532` (sheet `#1A2332`) |
| Cream (background) | `#F5EFE6` |
| Muted text | `#5A6A7E` · lighter `#8A9BAE` |
| Hairline / borders | `#E8E4DF` |
| Online green | `#3BBF6E` · alert red `#FF2D2D` |
| Headings font | **Space Grotesk** (700–900) |
| Body font | **Inter** (400–700) |
| Radii | cards 18px · inputs 14px · buttons/pills 50px · sheet 28px |
| Shadows | soft (`0 3px 14px rgba(0,0,0,.07)`), colored glow on primary buttons |

Style is **bright & friendly** (soft shadows, gradients, glow), **not** the old hard neo-brutalist offset shadows.

---

## Core components

- **Phone frame** — 375×812 (mock 340×736), notch + status bar (`9:41 · 📶 🔋`).
- **Logo** — real bubble-O wordmark with notification badge; `#honly` (navy) on light, `#honly-light` (white "nly") on dark. Same size across hero screens (~148×63), centered.
- **Buttons** — pill (`border-radius:50px`); primary coral with glow, `.teal`, `.outline`, `.outline.dk` (on dark).
- **Tags / chips** — interest pills (`.tag`, states `.on/.coral/.teal`); **reason chips** (teal-tint) for match reasons (`🎯 7 shared`).
- **Cards** — white, rounded, soft shadow; accent top-bar variants.
- **Match %** pill, **progress dots** (onboarding), **toggles** (privacy), **bottom tab nav** (Discover/Chats/Profile/Settings), **avatar** + online dot.

---

## Screen patterns

- **Welcome (hero):** full-bleed hands photo on top → **navy bottom sheet** with centered logo, headline, "not a dating app" chip, CTAs. *(Option C1 — approved.)*
- **Auth (Sign in):** dark screen, centered logo + header, SSO + email.
- **Onboarding step:** back + **progress dots** + step counter; eyebrow label, big headline, content, primary "Continue". Steps: Sign up (18+) · Interests & Languages · Location & Visibility · What Matters (presets) · Conversation Prompts · Boundaries · Welcome 🎉.
- **Discover:** header w/ logo, search, active-preset chip + Refine; **curated 2-col grid** — card = photo, match %, reason chips, **View profile**. No swiping.
- **Profile view:** gradient hero, prompt card, why-you-match chips, interests, **Start conversation** + secondary (♡ / 🔖).
- **My profile:** avatar + completion bar, photo grid (up to 6), conversation starters, stats.
- **Chat:** bubbles, image/voice, read receipts (✓✓), typing; media + mic input.
- **Settings:** grouped lists, privacy toggles **off by default**, match preferences, account actions.

---

## Guardrails (must hold in every screen)

- **No swiping** — discovery is a curated grid; user chooses *who to learn more about*.
- **Conversation-first** — primary actions are *View profile* / *Start conversation*; "Not for me" is a quiet pass.
- **Privacy off by default** — location/discoverable/distance opt-in only.
- **Not a dating app** — keep the positioning visible; flirting & politics optional.
- Always show the **real HOnly logo** and brand palette.

---

## Screens covered in the template today
Welcome · Sign in · Sign up · Interests & Languages · Location & Visibility · What Matters · Conversation Prompts · Boundaries · Welcome 🎉 · Discover · Profile view · My profile · Chat · Settings.

*Next: extend with the remaining user flows (report/block, calls, password reset, verification, blocked-users, etc.) using these same tokens & patterns.*
