# HOnly — Matching & Privacy Spec

**Humans Only. Vibes Only.**
*Draft spec · June 2026 · feeds backend requirements*

How HOnly decides who you see — transparent, consent-based, and configurable per user. No swiping, no manipulative feed.

---

## 1. Core model in one breath

Two ideas power everything:

1. **Two independent privacy axes** for location (see others vs. be seen).
2. **Per-criterion Must / Nice / Off** matching — each user decides what *they* require vs. what merely boosts ranking. Symmetric criteria only apply when **both** sides agree.

Everything below is built on these two ideas.

---

## 2. Location & visibility — three independent settings

These are **separate** controls. "Let the app see where I am" ≠ "let others see I'm nearby."

| Setting | Options | Effect |
|---|---|---|
| **Location access** | Off / Approximate (city) / Precise | The data source. **Off** disables all geo features for you (you see no one by proximity, and no one sees you by proximity). |
| **Discoverable by location** | On / **Off (default)** | Outbound visibility. You can search nearby while staying invisible yourself. |
| **Distance display on my card** | **Hidden (default)** / Fuzzy ("Nearby", "In your city") / Approx ("~3 km") | We **never** show an exact point. Coordinates are snapped to a grid / jittered. |

**Privacy guarantees:** no exact coordinates ever exposed; no direction/bearing; turning location Off removes you from everyone's "nearby" instantly.

**Privacy-first defaults:** *Discoverable by location* and *distance display* are **Off until you explicitly opt in**. Nothing about your location is shared by default.

---

## 3. Matching criteria

> **Matchable** criteria drive discovery (Must/Nice/Off). **Profile-only** fields are shown on the profile but never filter or rank — this keeps the settings surface small.

### Matchable criteria

| # | Criterion | Symmetric? | Value | Must = | Nice (default weight) | Notes |
|---|---|---|---|---|---|---|
| 1 | 🎯 Shared interests | overlap | tags | "≥ N shared" | ×3 by overlap count | Core signal |
| 2 | 🗣️ Common language | yes | languages | "share a language" | ×2 | Key for newcomers/immigrants |
| 3 | ✨ Topic focus | overlap | topic tags | "topic matches" | ×3 | e.g. psychedelics, philosophy |
| 4 | 🤝 Intent ("why I'm here") | overlap | enum | "intent matches" | ×2 | friendship / deep talks / language practice / support / banter |
| 5 | 💬 Conversation depth & style | overlap | enum | — | ×1 | reflective, witty, etc. |
| 6 | 📍 Proximity | yes + both share location | radius | "within X km" | ×2 (closer = higher) | needs mutual location |
| 7 | 😏 Flirt openness | yes, **mutual only** | bool | "both open" | gating (not weighted) | platonic-only protected by default |
| 8 | 🎂 Age range | yes | range (18+) | filter by range | — | 18+ always enforced |
| 9 | 🕉️ Spiritual alignment | overlap | path/tags | optional | ×1 | **Optional — default Off** |
| 10 | 🗳️ Political alignment | overlap | **simple leaning** | optional | ×1 | **Optional — default Off**, sensitive (see below) |

**Sensitive, optional criteria (spirituality & politics):**
- Default **Off**. Used only if the user opts in.
- Always include **"Prefer not to say."** If a user keeps it private, it is never exposed or used against them.
- Politics matters to some users (especially in the US) — supported, but never a forced or default filter. A user may use it to *find aligned* people **or** simply to display openness; HOnly takes no stance.
- **Representation is a simple leaning** (e.g., progressive / moderate / conservative / apolitical / prefer not to say) — **not** granular issue tags — to keep it low-heat and easy.

### Profile-only fields (shown, not matched)
Inner-world details (values, "what I'm working on," what gives me peace), lifestyle extras, etc. — they enrich the profile but don't drive Discover.

---

## 4. Scoring

```
1. Apply ALL Must-haves from BOTH users (intersection).
   If any Must fails on either side → pair is excluded.
2. For survivors: score = Σ (weight × strength-of-match) over Nice-to-haves.
3. Symmetric criteria (language, proximity, flirt, spirituality, politics)
   are active only when BOTH provided data / consented.
4. Rank the feed by score; each card shows a **match %** plus its **top 3 reason chips**.
```

**Example.** Ann: must = interests, language; nice = proximity, depth.
Bob: must = interests; nice = depth.
→ Must of both satisfied (shared interests ✅, shared language ✅). Score (Ann's side) = interests(3×4=12) + proximity(2) + depth(1) = **15**. Card shows: `92% · 🎯 4 shared · 📍 ~3 km · 💬 deep talks`.

This is "no forced" in math: if Bob is closed to flirt, Ann's "flirt = nice" simply never activates.

---

## 5. Avoiding setting-overload: presets + progressive disclosure

**Layer 1 — Presets (one tap):**

| Preset | Contents |
|---|---|
| 🏙️ Nearby & social | interests (must) + proximity (must) |
| 💬 Deep conversations | interests (must) + intent "deep talks" (must) |
| 🧠 Topic deep-dive | a topic (must), location Off |
| 😏 Open to flirt | interests (must) + flirt mutual (must) |
| 🎚️ Custom | opens Layer 2 |

**Layer 2 — Advanced:** each criterion → Off / Nice / Must (+ optional weight). New users pick a preset in seconds; power users fine-tune.

---

## 6. Wireframes (text)

**Onboarding → Location & visibility**
```
Use your location?   ( )Off  (•)Approximate  ( )Precise
  Discoverable nearby      [ ON ◯ ]
  Show distance:  ( )Hidden  (•)"Nearby"  ( )"~3 km"
  🔒 We never show your exact location.
```

**Onboarding → What matters to you**
```
Pick a vibe:
[🏙️ Nearby & social] [💬 Deep conversations]
[🧠 Topic deep-dive] [😏 Open to flirt] [🎚️ Custom ▾]
  ▾ Custom:
   🎯 Interests   [Off][Nice][•Must]
   🗣️ Language    [Off][•Nice][Must]
   📍 Proximity   [Off][Nice][•Must]
   😏 Flirt       [•Off][ Mutual ]
```

**Discover card** (match % + reason chips)
```
[photo] Maya, 27 · Berlin  ● online   match 92%
        🎯 7 shared · ✨ psychedelics · 📍 ~3 km
        "Chasing sunsets…"            [ Message ]
```

**Empty state**
```
No one matches all your must-haves 😕
Looks like "Proximity = Must" is the blocker.
[ Make Proximity optional ]  [ Widen radius to 50 km ]
```

---

## 7. Onboarding — expanded structure

Split onboarding into **Essentials** (needed to start) and **Deepen your profile** (optional, can finish later). Progressive profiling reduces drop-off; a "60% complete" bar nudges completion.

### Essentials (to reach Discover)
1. **Basics** — name, age (18+), pronouns *(new)*, city, bio.
2. **Interests** *(new — currently missing!)* — explicit tag picker (music, **films, TV shows, books, reels & memes**, sport, gaming, art, tech, nature…). Foundation of criterion #1.
3. **Languages** *(new)* — languages you converse in.
4. **Intent** *(new)* — why you're here (friendship / deep talks / language practice / support / banter).
5. **Location & visibility** — the three privacy settings.
6. **What matters to you** — match preset (or Custom).

### Deepen your profile (optional, skippable)
7. **Conversation** — depth/style, texting frequency, reply style.
8. **Conversation prompts** *(new — see §8)*.
9. **Voice intro** *(new, optional)* — a short clip "say hi in your own voice." Humanizes, helps anti-bot, very on-brand (reuses chat voice recording).
10. **Inner world** — values, peace, working on (profile-only).
11. **Spirituality** — **optional**, default Off as a match factor.
12. **Politics** — **optional**, default Off, **simple leaning** (progressive / moderate / conservative / apolitical), "prefer not to say" always available.
13. **Boundaries & safety** — open/avoid topics, flirting stance, **"never ask me to meet offline"** toggle, visibility (real / anonymous).
14. *(future)* **Verification** — selfie/liveness anti-bot.

---

## 8. Conversation prompts (icebreakers) ⭐

The most HOnly-native feature: HOnly is conversation-first, so we help conversations *start*.

- During onboarding (optional), users answer **2–3 prompts** from a rotating library:
  - "Ask me about…"
  - "A hill I'll die on…"
  - "The last thing that made me laugh…"
  - "I could talk for hours about…"
  - "An unpopular opinion I hold…"
- Prompts appear on the **profile** and as **tappable openers** in Discover / first message — so the other person never faces a blank box.
- Reduces first-message anxiety, sets a warm tone, and gives shy users an on-ramp.

---

