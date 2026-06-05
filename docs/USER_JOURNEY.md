# HOnly — Complete User Journey

**Humans Only. Vibes Only.**
*June 2026*

End-to-end path: **Landing → Signup → Onboarding → Profile → Discovery → Profile view → Chat → Call → Report/Block → Settings → Sign out.**

Legend: **✅ Built today** (front-end prototype) · **🚧 Planned** (needs backend / future phase)

> Matching, privacy, and the expanded onboarding are specified in detail in [MATCHING_AND_PRIVACY.md](./MATCHING_AND_PRIVACY.md).

---

## 0. Entry / Landing — `/`
- **Sees:** "Meet someone real," the *No dating expectations* callout, value tags, CTAs **Join HOnly** / **Sign in**, "How it works." ✅
- **Does:** → `/signup`, `/signin`, or `/how-it-works`. ✅

## 1. Signup — `/signup`
- **Sees:** name, email, password, date of birth, Terms checkbox, **Create account**. ✅
- **Does:** → `/onboarding`. ✅
- **🚧 Planned:** real account (framework + REST API + PostgreSQL), email verification, **18+ age gate**, error states. Alt: **Sign in** (`/signin`).

## 2. Onboarding — `/onboarding`
Split into **Essentials** (to start) and **Deepen your profile** (optional, finish later) with a completion bar.

**Essentials:** Basics (+ pronouns) · **Interests** *(new)* · **Languages** *(new)* · **Intent** *(new)* · **Location & visibility** (3 privacy settings) · **What matters to you** (match preset/custom).
**Deepen (optional):** Conversation · **Active hours** *(new)* · **Conversation prompts** *(new)* · **Voice intro** *(new, optional)* · Inner world · **Spirituality (optional)** · **Politics (optional, "prefer not to say")** · Boundaries & safety (incl. *"never ask me to meet offline"*) · *(future)* Verification.

- **Today:** 6 steps saved to browser (`honly_profile`) → `/discover`. ✅
- **🚧 Planned:** the new structure above; persist to backend; resume/partial save. See matching spec.

## 3. Profile — `/profile`
- **Sees:** hero (avatar, name, age, location/hidden, bio), completion %, stats, sections; **conversation prompts** shown here. ✅ (prompts 🚧)
- **Photos:** up to **6**, first = avatar. ✅
- **Does:** **Edit** → `/onboarding`. ✅

## 4. Discovery — `/discover` — **no swiping**
- **Sees:** people ranked by **match score**, each card showing **match-reason chips** (🎯 interests · 🌙 hours · 📍 nearby). Search, **Refine** panel to adjust Must/Nice live. ✅ list today (static) · 🚧 real ranking & reasons.
- **Empty state:** if Must-haves too strict → suggest loosening. 🚧
- **Does:** open a profile (`/profile/:id`). ✅

## 5. Viewing a Profile — `/profile/:id`
- **Sees:** full profile + **Share**, **Report**, **Send message**. ✅ (Report = stub)
- **🚧 Planned:** **Block** here; report flow with reasons; respect privacy/blocked state.

## 6. Chat — `/chats`, `/chats/:id`
- **List:** conversations, unread badges, online dots, search. ✅
- **Conversation:** text, **photos/GIFs, voice messages**, **reply/quote**, **read receipts** (✓→✓✓), **typing indicator**, auto-scroll. ✅
- **🚧 Planned:** real-time server-backed messaging, cross-device sync, media moderation, push notifications, in-chat Report/Block.

## 7. Call — voice & video 🚧
- **🚧 Planned:** opt-in **voice/video calls** from a conversation (accept/decline, mute, end); RTC provider TBD; honors blocked/boundary state; never required.

## 8. Report / Block — safety
- **Today:** Report on profile (toast stub); "Blocked users" in Settings ("Coming soon"). ✅
- **🚧 Planned:** Report from profile **and** chat with reasons (harassment/abuse, **pressuring to meet offline**, spam/bot, inappropriate, underage, other) + details; **Block** (mutual hide, ends convo, prevents contact); **moderation pipeline** (anti-bot + human review); manage/unblock list.

## 9. Settings — `/settings`
- **Today (UI):** Account (language, dark mode, password) · Notifications · Privacy (**public profile, show age, show location, blocked users**) · Account actions (**sign out, delete account**). ✅
- **🚧 Planned:** make settings real & persisted; the **3 location/visibility controls** and **match preferences** editable here; working sign-out & account deletion.

## 10. Return / Sign out
- Sign out → Landing. Returning user → Discover (or resume onboarding). 🚧 backend auth.

---

## Journey at a glance
```
Landing → Signup [🚧 18+] → Onboarding (Essentials + Deepen)
  → Profile [✅ 6 photos, 🚧 prompts]
     → Discover [no swiping; 🚧 match score + reasons]
        → View profile → Chat [✅ media/voice/reply/receipts/typing]
           → Call [🚧 voice/video]
           → Report / Block [✅ stub · 🚧 full flow]
Settings [privacy · blocked · delete] → Sign out
```

## Open questions
1. Age assurance — self-declared 18+ vs. stronger checks later.
2. Calling/RTC provider.
3. Match signals & taxonomy (see matching spec).
4. Report taxonomy + auto-action vs. human-review thresholds.
5. Privacy defaults (location/discoverable On or Off).
