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

**Essentials:** Basics (+ pronouns, gender, sexual orientation) · **Interests** *(new)* · **Languages** *(new)* · **Intent** *(new)* · **Location & visibility** (3 privacy settings, **Off by default / opt-in**) · **What matters to you** (match preset/custom).
**Deepen (optional):** Conversation · **Conversation prompts** *(new)* · **Voice intro** *(new, optional)* · Inner world · **Spirituality (optional)** · **Politics (optional, simple leaning, "prefer not to say")** · Boundaries & safety (incl. *"never ask me to meet offline"*) · *(future)* Verification.

- **Today:** 6 steps saved to browser (`honly_profile`) → `/discover`. ✅
- **🚧 Planned:** the new structure above; persist to backend; resume/partial save. See matching spec.

## 3. Profile — `/profile`
- **Sees:** hero (avatar, name, age, location/hidden, bio), completion %, stats, sections. ✅ | **Conversation prompt cards** displayed on profile: 🚧 (section placeholder exists; prompt content & functionality not yet built)
- **Photos:** up to **6**, first = avatar. ✅
- **Does:** **Edit** → `/onboarding`. ✅

## 4. Discovery — `/discover` — curated profile grid (no swiping)

HOnly replaces swiping with a **curated profile grid**. The user opens Discover and sees a grid / vertical list of recommended people. Each card shows a photo, name, short bio, context (match % + reason chips), and a few tags. Tapping a card opens the full profile, where the user takes an action.

The interface never asks *"Accept or reject this person instantly?"* — it asks **"Who do I want to learn more about?"**

- **Sees:** recommended people ranked by **match score**; each card has a **match %** + **reason chips** (🎯 interests · ✨ topic · 📍 nearby) and interest tags. Search + **Refine** panel to switch preset live. ✅ static list today · 🚧 real ranking.
- **Empty state:** if must-haves too strict → suggest loosening. 🚧
- **Does:** tap a card → full profile (`/profile/:id`) → take an action (CTAs below). ✅

### Card / profile CTAs
Primary action is **View Profile** — learn more, not judge. CTAs are chosen to stay low-pressure and conversation-first:

| CTA | Best use | Feeling |
|---|---|---|
| **View Profile** | Main button on each grid card | Neutral, intentional, familiar |
| **See Why You Match** | Card / profile, uses compatibility logic | Smart, personalized, meaningful |
| **Start Conversation** | When messaging is allowed immediately | Clear, active, social |
| **Send Intro** | After opening full profile | Direct, relationship-oriented |
| **Show Interest** | Softer alternative to "Like" | Soft, intentional |
| **Like Prompt** | On a specific profile answer / interest | Low-pressure, contextual |
| **Save for Later** | Secondary action | Gentle, non-committal |
| **Not for Me** | Pass action | Respectful, less harsh than "Reject" |

**Guardrail:** no instant accept/reject. CTAs favor *learning more* and *starting a conversation* over binary judgments; "Not for Me" is a quiet pass, never a public rejection.

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
- **🚧 Planned:** make settings real & persisted; the **3 location/visibility controls** (Off by default) and **match preferences** editable here; working sign-out & account deletion.

## 10. Return / Sign out
- Sign out → Landing. Returning user → Discover (or resume onboarding). 🚧 backend auth.

---

## Journey at a glance
```
Landing → Signup [🚧 18+] → Onboarding (Essentials + Deepen)
  → Profile [✅ 6 photos · ✅ profile shell · 🚧 conversation prompts]
     → Discover [no swiping; 🚧 match score + reasons]
        → View profile → Chat [✅ media/voice/reply/receipts/typing]
           → Call [🚧 voice/video]
           → Report / Block [✅ stub · 🚧 full flow]
Settings [privacy · blocked · delete] → Sign out
```

## Decisions & open questions

**Resolved** (see matching spec): no active-hours matching · politics = simple leaning · location/discoverable/distance **Off by default (opt-in)** · Discover shows **match % + reason chips**.

**Still open:**
1. Age assurance — self-declared 18+ vs. stronger checks later.
2. Calling/RTC provider.
3. Interest & topic taxonomy + default proximity radius (see matching spec).
4. Report taxonomy + auto-action vs. human-review thresholds.
