# HOnly — Ideal Onboarding Flow (v2)

*Rebuilt around your inline comments from both research docs. This version overrides v1 where your notes disagreed with it. Exact wording, rationale, and build remarks for every screen.*

---

## How each of your comments was addressed

| Your comment | Where it lives in v2 |
|---|---|
| "If user shows interest in a topic — open sub-options (Family → marriage/divorce/single; Pets → dogs/cats; Spirituality → psychedelics/Buddhism)" | **Screen 5** — the branching interests engine (the spine of the whole flow) |
| "Some people want to share approximate location… optional, but possible. Never by default." | **Screen 9 — Location**, fully reworked: opt-in, off by default, *can* include city/approximate area |
| "Some people want the possibility to meet in person eventually." | **Screen 9 — "Open to meeting eventually"** toggle + reframed welcome (Screen 0) + safety note |
| "Make a badge the user can change anytime — how they feel today, shown on preview. Optional." | **Screen 9 — Today's vibe badge** (settable at signup, editable forever, shown on profile preview) |
| "Being single / going through divorce is sometimes an interesting topic to discuss." | **Screen 5 → Family & relationships** branch (as *topics*, not status fields) |
| "People want to discuss divorce, teens' difficulties, affairs… we can't skip these." | **Screen 5** rich Family/Parenting/Relationships sub-topics + remarks |
| "Work on list of topics" / "Add podcasts" / "Work on best options. Important!!!" | **Full interest taxonomy** section below — expanded and structured |
| "Add a 'looking for flirt' option." | **Screen 6** flirt question now includes an explicit *open-to-flirting* option |
| "Ask AI: what if [they] say 'Yes' [to flirt], what next? How to deal with this?" | **"How the flirt 'Yes' path works"** section below — answered in full |
| "Non-native speakers sometimes want to talk to someone who speaks their language, besides English." | **Screen 8 — Languages**, reworked for native-language matching, not just practice |
| "This repeats Q3." | Depth is now asked **once** (Screen 4); the duplicate mood/depth question is gone |
| "Review — there are good suggestions in another research." | The Manus interview matrix (Q1–Q18) is reconciled into this single flow |

---

## What changed in the product vision (because of your notes)

v1 assumed HOnly was strictly online-only with offline meeting treated as a risk. Your comments correct that:

> **HOnly is online-first and pressure-free — but not anti-offline.** Meeting in person is allowed if *both* people choose it. Location and city can be shared if the user *wants* to. The app never pushes either; it just doesn't forbid them. And the hard, real topics of adult life — divorce, single life, raising teenagers, messy relationships — are welcomed as things to talk about, not hidden.

Everything below follows from that.

---

## Flow at a glance

| # | Screen | Required? | ~Time |
|---|---|---|---|
| 0 | Welcome + promise | — | 5s |
| 1 | Age gate (18+) | ✅ | 2s |
| 2 | Display name | ✅ | 10s |
| 3 | Intent — "What brings you here?" | ✅ | 15s |
| 4 | Depth preference | ✅ | 10s |
| 5 | **Interests (branching sub-topics)** | ✅ | 45s |
| 6 | Flirt setting (incl. "open to flirting") | ✅ | 10s |
| — | *core profile complete (~2 min)* | | |
| 7 | Rhythm + off-limits topics | optional | 15s |
| 8 | Languages (native + practice) | optional* | 15s |
| 9 | About you: **vibe badge, avatar, age, gender, location, "open to meeting"** | optional | 30s |
| 10 | Human pledge | ✅ tap | 5s |
| 11 | Done → Discover / first chat | — | — |

\*Auto-surfaced for the language-practice or "talk in my language" intents.

---

## Screen 0 — Welcome + promise *(revised for IRL)*

> **Real people. Real conversations. Your pace.**
> HOnly is for talking with actual humans — not bots, not dating games. Go as light or as deep as you like, set your own boundaries, and if you ever *both* want to meet in person, that's your choice — never the pressure.
> Takes about 2 minutes.
> [ Let's go → ]

**Why:** Sets the three felt promises — *human · your pace · your choice about meeting.* The "if you both want to meet… your choice, never the pressure" line directly encodes your comment without turning HOnly into a dating app.

---

## Screen 1 — Age gate

> **First, a quick check.**
> ◉ I'm 18 or older   [ Continue ]

**Required:** Yes · **Visibility:** Private · **Matching:** none (gate only). Exact age is optional, later (Screen 9).

---

## Screen 2 — Display name

> **What should people call you?** *(Doesn't have to be your real name.)*
> [ __________ ]   [ Continue ]

**Required:** Yes · **Visibility:** Public · **Matching:** none. Light impersonation/profanity filter only.

---

## Screen 3 — Intent

> **What brings you to HOnly?** Pick anything that fits — you can change it anytime.
> ☐ Casual, easy chats
> ☐ Deeper conversations
> ☐ Someone to talk to / a kind ear
> ☐ Practicing a language
> ☐ Talking in my own language *(new — see Screen 8)*
> ☐ Making real friends
> ☐ Open to light flirting *(new — mirrors Screen 6)*
> ☐ Just exploring
> [ Continue ]

**Required:** Yes (≥1, multi-select) · **Visibility:** matching-only, optional soft label · **Matching:** Tier 1.

**Remarks:** No "looking for…" phrasing. "Talking in my own language" and "Open to light flirting" are surfaced here so the relevant later screens (8 and 6) feel like follow-ups, not surprises. "A kind ear" keeps a footer link to real support resources without implying HOnly replaces professional help.

---

## Screen 4 — Depth preference *(asked once — your "repeats Q3" note)*

> **What kind of conversations feel good right now?**
> ◯ Light & fun   ◯ A bit of both   ◯ Deep & thoughtful
> [ Continue ]

**Required:** Yes · **Visibility:** matching-only · **Matching:** Tier 1.

**Remarks:** v1 effectively asked this twice (a "mood" question and a "depth" scale). Collapsed into this single question.

---

## Screen 5 — Interests (the branching engine)

This is the heart of HOnly, and where your "open sub-options" idea and your "can't skip the hard topics" note both live.

**Layer 1 — broad topics**
> **What do you love talking about?** Pick a few. Tap one to add detail (optional).
> *(chips — see full taxonomy below)*
> *Choose at least 3.*   [ Continue ]

**Layer 2 — appears inline when a topic is tapped.** Examples that honor your comments:

- **Family & relationships →** Friendship · Dating life · Single life · Married life · **Divorce & starting over** · Co-parenting · **Raising teenagers** · Long-distance · In-laws & family drama · Complicated relationships · Caring for aging parents
- **Spirituality →** Meditation · Buddhism · Astrology · Tarot · Manifestation · **Psychedelics & consciousness** · Religion & faith · Agnostic / secular · Energy & healing
- **Pets & animals →** Dogs · Cats · Birds · Reptiles · Horses · Wildlife · Rescue & fostering
- **Listening & watching →** Podcasts · True crime · Audiobooks · Film · TV & streaming · YouTube *(your "add podcasts")*
- **Mental wellbeing →** Mindfulness · Therapy & growth · Burnout · Anxiety · Grief · Just venting sometimes

**Why this design carries your "we can't skip these" note:** Divorce, raising teens, messy relationships, affairs — these are entered as *topics a person enjoys or wants to talk about,* never as a status the app extracts. Picking **"Divorce & starting over"** tells the matcher this person welcomes that conversation; they experienced it as choosing an interest. That's how HOnly includes the hard, real subjects *without* feeling like a vetting form or a dating profile.

**Required:** Layer 1 yes (≥3); Layer 2 always optional · **Visibility:** public, per-topic hide toggle · **Matching:** Tier 1 weight, never a hard exclusion filter.

**Build remarks:**
- **Two layers max.** Store as `topic` + optional `subtopic[]`. Keep the taxonomy in config so you can expand/A-B test without a release.
- **Sensitive sub-topics** (psychedelics, divorce, affairs, anxiety): allowed, opt-in only, framed as *"a topic I'm happy to talk about,"* visibility-controlled, and **never** shown as a demographic label ("Divorced") — only as an interest ("Open to talking about: starting over"). Psychedelics stays a *discussion* tag; HOnly never facilitates sourcing.
- **"+ Add your own"** on every category — essential for niche interests and for topics your list doesn't name.

---

## Screen 6 — Flirt setting *(your "looking for flirt" note)*

> **HOnly is about real conversation — flirting is optional and only ever mutual.**
> How do you feel about light flirting here?
> ◯ Open to light flirting
> ◯ Only if it's mutual
> ◯ Depends on the person
> ◯ Keep it platonic
> [ Continue ]

**Why:** v1 had no positive "yes" option; you asked for one. Now flirt-open users can find each other, while "Keep it platonic" stays a protected, visible, hard signal.

**Required:** Yes · **Visibility:** Public · **Matching:** Tier 1 **hard filter** — see the next section for exactly what "Yes" triggers.

---

## How the flirt "Yes" path works *(answering your "what next?" question)*

You asked: *if someone says Yes to flirting, what do we do next? How do we deal with it?* Here's the mechanic, built so it's safe and never imposed on anyone:

1. **Flirting is mutual-only.** Flirt energy is *enabled* between two people **only if both** chose "Open to light flirting" or "Only if mutual." If either side is "Keep it platonic," flirting is never enabled, never suggested, and the platonic user is never shown as flirt-available. One person's "Yes" can't reach an unwilling other.
2. **What "Yes" actually unlocks.** When two flirt-open people match, the app shows a small mutual indicator (e.g., a subtle "you're both open to a little flirting" note) and the tone guidance shifts to "playful is welcome." It does **not** open a separate "flirt zone," and it never implies obligation — it's permission, not a script.
3. **"Depends on the person"** behaves as platonic-by-default and only becomes flirt-open if that user later signals it in chat — never auto-enabled by matching.
4. **Instant, respected opt-out.** The setting is editable anytime. Switching to "Keep it platonic" immediately updates matching and is visible to current chats; the other person is expected to respect it, and reporting/blocking is one tap away.
5. **Guardrails.** Light, consensual, adult flirting only — community guidelines prohibit sexual/explicit content and any pressure. Flirting never unlocks location or contact info; those remain separate, opt-in (Screen 9).
6. **It stays "not a dating app."** Flirting here is a *flavor of friendly conversation between consenting adults,* not a romance funnel — there's still no swiping, no match-to-date pressure, no "looking for a partner" framing.

> Net answer to your note: a "Yes" simply makes someone *eligible* to be paired with other yes/maybe users and lightly signals it when both agree — fully reversible, never imposed, never sexualized.

---

## Screen 7 — Rhythm + off-limits *(optional)*

> **A couple of things that help us match you well.** *(Optional)*
> **How do you like to chat?** ◯ Quick back-and-forth · ◯ A few messages a day · ◯ Slow & thoughtful
> **Anything you'd rather not talk about?** *(Only you see this — we quietly steer matches away.)* [ chips: Politics · Religion · Exes · Work · Health · + add ]
> [ Skip ]  [ Save ]

**Visibility:** rhythm = matching-only; off-limits = **private** · **Matching:** rhythm Tier 2; off-limits used only to exclude clashes.

---

## Screen 8 — Languages *(reworked for your native-language note)*

> **Languages — speak, practice, or just connect in.** *(Optional)*
> For each language you add, pick what you want:
> [ + Add language ] → ◯ I'm fluent / native here · ◯ I'm learning & want to practice · ◯ **I'd love to chat with others who speak this**
> [ Skip ]  [ Save ]

**Why:** Your comment: non-native speakers sometimes want someone who speaks *their* language, not only English practice. The third option ("chat with others who speak this") enables **native-language matching** — pairing, say, two Portuguese speakers who'd rather talk in Portuguese — separate from the "I'm learning" practice case.

**Visibility:** public · **Matching:** Tier 2; becomes a near-hard filter for the "practice" and "chat in my language" intents. Frame around *practice and belonging*, never nationality.

---

## Screen 9 — About you *(all optional; each field has its own visibility toggle + "prefer not to say")*

> **A little about you — share only what you want.**

**Today's vibe** *(your badge idea)*
> **How are you feeling today?** *(Optional, changeable anytime, shows on your profile preview.)*
> [ emoji/word chips: 🙂 Chatty · 😌 Mellow · 🤔 Reflective · 😅 Need a distraction · 💪 Motivated · 😶 Quiet today · + custom ]

- **Why:** A low-commitment, living signal that makes a profile feel human and current, and gives others an easy opener. Editable forever; shown on the preview card; never used as a hard matching filter.
- **Build:** store as a separate mutable `mood` field with a timestamp; let users clear it. Don't surface stale moods — fade after ~24–48h.

**Photo or avatar** — [ Upload ] or [ Pick an avatar ] · 👁 Public / Matches / Hidden
- Avatar is fully equal to a photo. Never nudge toward a face. (App currently has no photo upload — this is where to add it, optional-first.)

**Age** — ◯ 18–24 ◯ 25–34 ◯ 35–49 ◯ 50+ ◯ Prefer not to say · 👁 …

**Gender** — Woman / Man / Non-binary / Self-describe / Prefer not to say · 👁 …

**Location** *(reworked for your "optional but possible" note)*
> **Want to share where you are?** *Off by default. You choose how precise.*
> ◯ Don't share  ◯ Country only  ◯ City / area  ◯ Region for timezone matching
> 👁 Public / Matches / Hidden

- **Why:** Your comment — never on by default, but users *can* share city/approximate area, because HOnly doesn't forbid finding friends in real life. This replaces v1's "country/region only, never city."
- **Build:** default **Don't share**. If "City / area," store coarse area, not GPS/exact address. Never put location in a URL or expose it to non-matches.

**Open to meeting eventually?** *(your IRL note)*
> ◯ Online only for me  ◯ Maybe, if we click  ◯ Open to meeting in public eventually
> [ small print: HOnly never pressures anyone to meet. If you do, meet in a public place and tell a friend. ]

- **Why:** Some users want the *possibility* of meeting; this lets them signal it without pushing anyone. Matching can softly pair "open to meeting" with "open to meeting," and keeps "Online only" people clear of meet-up nudges.
- **Build:** soft preference, not a filter; pair with safety copy and easy report/block.

**Cultures you love sharing or learning about** — [ chips + add ] · 👁 …
- Framed as curiosity/exchange, never a filter the system uses to sort or exclude.

> [ Skip for now ]  [ Finish ]

**Remarks:** Still **no** standalone relationship-status, family-status, job, income, or orientation fields — that context now arrives, by choice, through the Screen 5 topic branches, which is exactly what you wanted.

---

## Screen 10 — Human pledge

> **One last thing — the HOnly part.**
> Everyone here agrees to be a real human, here in good faith.
> ◉ I'm a real person and I'll treat others like real people.
> [ Enter HOnly ]

**Remarks:** Your Features doc claims "verified profiles" but the app has no verification yet — fix that honestly: either soften the marketing until real verification ships, or add a lightweight check (email/phone or a simple liveness step) and *then* show a badge. The pledge is honest either way.

---

## Screen 11 — Done

Drop straight into **Discover** (or a first-conversation suggestion from intent + top interests + vibe). Don't gate value behind a "100% complete" profile; a gentle, dismissible "add more anytime for better matches" is fine — never a wall.

---

## Full interest taxonomy *(your "work on the list — important!" note)*

A starting taxonomy designed for *conversation*, with branchable sub-topics. Keep it in config; let "+ add your own" cover the long tail.

**Listening & watching** — Podcasts · True crime · Audiobooks · Film · TV & streaming · YouTube · Documentaries · Anime
**Music** — Pop · Rock · Hip-hop · Electronic · Classical · Jazz · K-pop · Indie · Making music · Concerts & live
**Books & writing** — Fiction · Non-fiction · Poetry · Fantasy & sci-fi · Writing my own · Book recommendations
**Gaming** — PC · Console · Mobile · Cozy games · Competitive · Tabletop & D&D · Retro
**Science & tech** — Space · AI · Gadgets · Coding · Psychology · Nature & biology · Future & ideas
**Philosophy & big questions** — Meaning of life · Ethics · Consciousness · Stoicism · Debates (friendly)
**Travel & cultures** — Backpacking · Living abroad · Food travel · A culture I'm from · A culture I'm curious about · Hidden gems
**Food & cooking** — Home cooking · Baking · Coffee · Tea · Restaurants · Specific cuisines · Veggie/vegan
**Art & creativity** — Drawing · Photography · Design · Crafts · Fashion · Film-making
**Sport & movement** — Running · Gym & lifting · Yoga · Football · Climbing · Cycling · Martial arts · Dance
**Nature & outdoors** — Hiking · Camping · Gardening · Birdwatching · Beaches · Mountains
**Spirituality** — Meditation · Buddhism · Astrology · Tarot · Manifestation · Psychedelics & consciousness · Religion & faith · Agnostic / secular · Energy & healing
**Pets & animals** — Dogs · Cats · Birds · Reptiles · Horses · Wildlife · Rescue & fostering
**Family & relationships** — Friendship · Dating life · Single life · Married life · Divorce & starting over · Co-parenting · Raising teenagers · Long-distance · In-laws & family drama · Complicated relationships · Caring for aging parents
**Mental wellbeing** — Mindfulness · Therapy & growth · Burnout · Anxiety · Grief · Just venting sometimes
**Work & ambition** — Career changes · Side projects · Entrepreneurship · Studying · Burnout at work · Money & saving
**Humour & internet** — Memes · Banter · Shitposting · Internet culture
**Current events** — World news · Local news · Tech news · Social issues *(kept opt-in so non-political users never see it)*

---

## Quick note on the two research docs

Your "review — good suggestions in another research" comment was right: the Manus interview matrix (Q1–Q18) and my research overlapped but didn't agree on demographics. This v2 reconciles them into one source of truth — intent/depth/interests/flirt as the required spine, demographics and location as opt-in, and the Manus matrix's strongest items (intent "today" framing, "what would feel good right now," reply-pace, "what makes a first chat feel safe," progressive personalization) folded into the screens above. Use this doc as the single onboarding spec going into interviews.

---

*Still hypotheses until tested: which interests matter most, whether the flirt "Yes" mechanic feels safe in practice, and how people react to optional location. The interview + survey plan exists to validate exactly these before you lock the build.*
