# HOnly — Matching & Privacy Spec (v2)

**Humans Only. Vibes Only.**
*Draft spec · June 2026 · feeds backend requirements*

This is the **v2** spec, aligned to the **new standalone onboarding flow** shipped in
`public/onboarding-standalone.html` (live at
[honly-app.vercel.app/onboarding-standalone.html](https://honly-app.vercel.app/onboarding-standalone.html)).
It supersedes nothing — the original [MATCHING_AND_PRIVACY.md](./MATCHING_AND_PRIVACY.md) is kept as
the v1 reference. Where the two differ, **v2 (this doc) describes what the onboarding actually
collects and promises today.**

How HOnly decides who you see — transparent, consent-based, and configurable per user. No swiping,
no manipulative feed.

**Discovery mechanic:** a **curated profile grid** — *"no swiping; a curated person you choose to
learn about."* The user browses recommended people and picks who to learn more about; each card
shows a **match %**, a **"WHY YOU MATCH"** reason-chip row, and a flirt-state indicator.

---

## 0. What changed from v1 → v2

The new onboarding made the model **warmer and lighter**. The biggest shift: matching preferences
are now **inferred from what you pick** (intent + vibe + interests), not configured through an
explicit Must / Nice / Off control surface.

| Area | v1 spec | v2 (this onboarding) |
|---|---|---|
| **Preference model** | Per-criterion **Must / Nice / Off** + one-tap **presets** | **No Must/Nice/Off UI, no presets.** Preferences are inferred from selections; "Add more anytime for better matches — never a wall." |
| **Location** | Three independent axes (access · discoverable · distance display) | **One 4-level selector**, *off by default*: Don't share / Country only / City–area (coarse, never exact) / Region for timezone |
| **Intent** | Single enum, overlap | **Multi-select**, 8 options incl. "Someone to talk to" & "Talking in my own language" |
| **Languages** | "share a language" | **Per-language role**: fluent/native · learning & want to practice · love chatting with speakers (asymmetric matching) |
| **Orientation / "who you're open to"** | Optional matchable criterion | **Removed** from onboarding. Not collected. |
| **Politics** | Optional matchable criterion (simple leaning) | **Not a criterion.** Appears only as an *off-limits* topic and an opt-in "Current events" interest |
| **Spirituality** | Optional matchable criterion | Folded into **interests** as a *sensitive* topic (match-only, never a label) |
| **Sensitive disclosures** | Profile-only inner-world fields | New **"Something I'm carrying"** topic — *private, match-only*, never public unless opted in |
| **New fields** | — | **Human Pledge**, **Meeting preference**, **Today's vibe**, **Cultures**, **per-field visibility badges** |
| **Conversation depth** | Matchable enum | **"Your vibe"**: Light & fun / A bit of both / Deep & thoughtful |

---

## 1. Core model in one breath

Three ideas power v2:

1. **Privacy is per-field and off by default.** Every "About you" field carries its own visibility
   (👁 *Matches* / *Hidden* / *Shows on preview*); location is **off by default** and never exact.
2. **Preferences are revealed, not configured.** What you pick in *Why you're here*, *Your vibe*, and
   *What you love* *is* your matching preference. No sliders, no Must/Nice/Off, "never a wall."
3. **Consent gates the sensitive stuff.** Flirting is **mutual-only**; sensitive topics are
   match-only and never labels; the **Human Pledge** sets the floor (real people, good faith).

---

## 2. The flow (what's collected, and how it's used)

Step order, categories, and required/optional state come straight from the flow definition
(`FLOW`). **Spine** = the required path to reach Discover; **optional** steps are skippable and can
be completed later.

| # | Step | Category | Required | Collected | Role in matching |
|---|---|---|---|---|---|
| 0 | Welcome | — | — | — | "Meet someone real." *"THIS IS NOT A DATING APP · NO PRESSURE."* Join / Sign in |
| — | Sign in | — | alt path | SSO (Google/Apple) or email + password | account only |
| 1 | **Age** | QUICK CHECK | ✅ | 18+ confirmation (boolean) | **Hard gate** (18+ enforced). Exact age stays optional |
| 2 | **Name** | CREATE ACCOUNT | ✅ | display name (≤24 chars) | profile. *"Doesn't have to be your real name."* Light impersonation/profanity filter |
| 3 | **Intent** | WHY YOU'RE HERE | ✅ | multi-select (8 options) | **matchable — overlap** |
| 4 | **Depth/vibe** | YOUR VIBE | ✅ | light / both / deep | **matchable — style overlap** |
| 5 | **Interests** | WHAT YOU LOVE | ✅ (≥3 topics) | branching topic + optional subtopics | **matchable — core signal** |
| 6 | **Flirt** | BOUNDARIES | ✅ | open / mutual / depends / platonic | **mutual-only gate** |
| 7 | **Rhythm + off-limits** | HOW YOU CHAT | optional | cadence + off-limit topics | rhythm = soft signal; off-limits = **private negative filter** |
| 8 | **Languages** | LANGUAGES | optional | language + role | **matchable — role-aware** |
| 9 | **About you** | ABOUT YOU | optional | vibe, avatar/photo, age range, gender, location, meeting, cultures | mixed (see §3) |
| 10 | **Human Pledge** | THE HONLY PART | ✅ | "I'm a real person…" (boolean) | **trust gate** (anti-bot, good-faith) |
| 11 | Done | — | — | — | completion %, profile preview, → Discover |
| — | Discover demo | — | — | — | first-match card: 92% match, reason chips, flirt indicator |

### Option sets (verbatim from the flow)

- **Intent** (multi): Casual easy chats · Deeper conversations · Someone to talk to · Practicing a
  language · Talking in my own language · Making real friends · Open to light flirting · Just exploring.
  *(For "Someone to talk to," onboarding surfaces real support resources — "HOnly doesn't replace
  professional help.")*
- **Depth/vibe:** Light & fun · A bit of both · Deep & thoughtful.
- **Flirt:** Open to light flirting · Only if it's mutual · Depends on the person · Keep it platonic
  (*a protected, hard signal*).
- **Rhythm:** Quick back-and-forth · A few messages a day · Slow & thoughtful.
- **Off-limits:** Politics · Religion · Exes · Work · Health · Money · Family drama. *(Private.)*
- **Language roles:** Fluent / native · Learning & want to practice · Love chatting with speakers.
- **Location:** Don't share *(default)* · Country only · City / area *(coarse, never exact)* ·
  Region for timezone.
- **Meeting:** Online only for me · Maybe, if we click · Open to meeting in public eventually.
- **Age range:** 18–24 · 25–34 · 35–49 · 50+ · Prefer not to say.
- **Gender:** Woman · Man · Non-binary · Self-describe · Prefer not to say.

---

## 3. Matching criteria (derived from collected data)

> **Matchable** criteria drive discovery. **Profile-only** fields are shown but never filter or rank.
> There is **no Must/Nice/Off UI** in this flow — the backend derives intent/weight from selections.

| # | Criterion | Type | Symmetric? | Suggested weight | Notes |
|---|---|---|---|---|---|
| 1 | 🎯 **Interests / topics** | overlap (topic + subtopic) | yes | ×3 by overlap | Core signal. ≥3 topics required. Includes match-only private topics (§5) |
| 2 | 💬 **Intent** | overlap (multi) | yes | ×2 | Why you're here; multi-select |
| 3 | 🌗 **Depth / vibe** | overlap | soft | ×1 | Light / both / deep |
| 4 | 🗣️ **Languages** | role-aware match | yes | ×2 | "Learning" pairs with "fluent"; "love chatting with speakers" pairs mutually — about *belonging, never nationality* |
| 5 | 😏 **Flirt openness** | **mutual gate** | yes, **mutual only** | gate only — no additive weight | Active iff **both** opted in (open/mutual). Platonic is a protected hard signal |
| 6 | ⚡ **Rhythm** | overlap | soft | ×1 | Texting cadence |
| 7 | 🎂 **Age range** | bucket | yes | filter/soft | 18+ always enforced; coarse buckets only |
| 8 | 📍 **Proximity / region** | coarse, opt-in | yes + both share | ×1 | Only if both shared location; never exact (see §4) |
| 9 | 🌍 **Cultures** | overlap / curiosity | yes | ×1 | Share *or* curious about — belonging signal |
| 10 | 🚫 **Off-limits** | **negative filter** | each user's own | exclusion / de-rank | Private; *"we quietly steer matches away"* |
| 11 | 🚶 **Meeting preference** | compatibility | yes | soft | Sets expectations (online vs. open to meet); never pressured |

**Profile-only (shown, not matched):** display name, gender (self-identification), today's vibe
(ephemeral mood), avatar/photo. **Gender is never a filter** and there is **no orientation field** in
this flow.

---

## 4. Location & privacy

The v2 flow replaces v1's three-axis model with **one selector, off by default**:

| Option | Meaning |
|---|---|
| **Don't share** *(default)* | No geo features. You see no one by proximity; no one sees you. |
| **Country only** | Coarsest signal — country-level belonging/timezone hints. |
| **City / area** | *Coarse, never exact.* Used for soft proximity; we never expose a point. |
| **Region for timezone** | Helps match active hours without revealing place. |

**Guarantees (unchanged from v1):** no exact coordinates ever; turning location off removes you from
proximity instantly; the field is labelled **"off by default"** with a *Hidden* visibility badge.

**Per-field visibility.** Every "About you" field shows its own visibility badge:
- 👁 **Matches** — visible only to people you match with (avatar/photo, age, gender, cultures).
- **Hidden** — collected for matching but not displayed (location).
- **Shows on preview** — appears on your profile preview (today's vibe).

---

## 5. Sensitive & private data

The flow distinguishes three privacy tiers inside *interests*:

1. **Private, match-only — "Something I'm carrying" 🤲.** A dedicated topic for harder things
   (illness/recovery, trying to change something, processing past experiences, shame, relationship
   doubts, family/cultural pressure, work fears, unusual interests). Data model:
   `visibility: private_matching_only` — subtopics **personalise matches but are never shown
   publicly**; the broad parent label may appear publicly **only if the user later explicitly opts
   in**. Selecting the parent alone is enough — never force a subtopic. *"Private by default. You
   choose what, if anything, appears on your profile."* It is a **conversation preference, not a
   therapy intake.**
2. **Sensitive topics** (Spirituality, Family & relationships, Mental wellbeing). Shown only as
   *"happy to talk about,"* **never as a label about you**, and **visible only to your matches.**
3. **Opt-in topics** (Current events). Off unless the user adds them.

**Off-limits** (Rhythm step) are the inverse: a **private** list — *"Only you see this"* — used to
**steer matches away** from those subjects; never displayed, never used against the user.

---

## 6. Flirting — the mutual-only gate

Flirting is a **gate, not a scored criterion**, and it is **mutual-only** by construction:

- Enabled **only if both** people opted in (open / mutual) — *"one person's yes can't reach an
  unwilling other."*
- It is **permission, not a script**: a subtle shared note on the match card, never a separate
  "flirt zone," **never sexualised.**
- **Always reversible** — switch to platonic anytime; it updates instantly and is always respected.
- **"Keep it platonic" is a protected, hard signal** — the boundary travels with the user; flirting
  is never enabled in that thread.
- Flirting **never unlocks location or contact info.** *"Still not a dating app."*

On the Discover card this renders as either *"You're both open to a little flirting — playful is
welcome. No obligation, fully reversible."* or the platonic shield: *"Kept platonic — your boundary
travels with you."*

---

## 7. Trust — the Human Pledge

A required final step (**"The HOnly part"**): *"I'm a real person … and I'll treat others like real
people."* This is the product's anti-bot / good-faith floor and is consistent with the verified
(✓) badge shown on match cards. Backend implications: pledge acceptance is a **gating boolean** for
entering Discover, and a hook point for future verification (selfie/liveness) without changing the
onboarding shape.

---

## 8. Scoring (adapted for v2)

```
1. Hard gates (both sides): 18+ ✅, Human Pledge ✅.
   Apply each user's own off-limits as exclusions/de-ranking.
2. Flirt gate: "open to flirting" state is active ONLY if both opted in;
   otherwise the pair is platonic. The gate never adds score.
3. Score survivors by Σ (weight × strength-of-match) over the revealed
   preferences: interests (×3 by overlap), intent (×2), languages (×2,
   role-aware), depth/vibe (×1), rhythm (×1), cultures (×1), proximity
   (×1, only if both shared location).
4. Symmetric criteria (languages, proximity, cultures, flirt) apply only
   when BOTH provided data / consented. If one side hasn't, the criterion
   is silently skipped — never surfaced as a nudge, never used against either user.
5. Rank by score; each card shows a match % + a "WHY YOU MATCH" reason-chip row.
```

Because there is no Must/Nice/Off UI, the backend should treat **required spine selections**
(intent, depth, ≥3 interests) as the strong signal and **optional fields** as boosts — matching the
product promise *"Add more anytime for better matches — never a wall."*

---

## 9. Open questions / backend notes

- **Language role pairing matrix** — confirm desired pairings (learner↔fluent, connect↔connect,
  fluent↔fluent) and whether "practice" should *boost* or merely *enable*.
- **Off-limits strength** — hard exclude vs. de-rank? Current copy ("quietly steer away") implies
  **de-rank**, not hard filter.
- **"Something I'm carrying" exposure** — confirm the opt-in surface for promoting the parent label
  to public lives in profile settings (not onboarding), per the data-model note.
- **Meeting preference** — purely informational on the card, or a soft compatibility input?
- **Today's vibe** — ephemeral (decays/resets) vs. sticky until changed.
- **Per-field visibility editing** post-signup — Settings screen parity (see USER_JOURNEY.md §9).

---

*Source of truth for this spec: the standalone onboarding flow at
`public/onboarding-standalone.html`. Keep this doc in sync if that flow changes.*
