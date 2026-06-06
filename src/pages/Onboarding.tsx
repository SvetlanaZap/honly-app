import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/honly-logo.svg";
import { toast } from "sonner";

function ChipGroup({ options, selected, onToggle, max, color = "hsl(var(--coral))" }: {
  options: string[]; selected: string[]; onToggle: (v: string) => void; max?: number; color?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => {
        const active = selected.includes(opt);
        const disabled = !active && max !== undefined && selected.length >= max;
        return (
          <button key={opt} type="button" disabled={disabled} onClick={() => onToggle(opt)}
            className="honly-tag transition-all"
            style={{
              backgroundColor: active ? color : undefined,
              color: active ? "white" : disabled ? "hsl(var(--slate-muted))" : undefined,
              borderColor: active ? color : disabled ? "hsl(var(--cream-dark))" : undefined,
              fontWeight: active ? 600 : 400,
              opacity: disabled ? 0.5 : 1,
              cursor: disabled ? "not-allowed" : "pointer",
            }}>{opt}</button>
        );
      })}
    </div>
  );
}

function Single({ options, value, onChange, color = "hsl(var(--coral))" }: {
  options: string[]; value: string; onChange: (v: string) => void; color?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => {
        const active = value === opt;
        return (
          <button key={opt} type="button" onClick={() => onChange(active ? "" : opt)}
            className="honly-tag transition-all"
            style={{
              backgroundColor: active ? color : undefined,
              color: active ? "white" : undefined,
              borderColor: active ? color : undefined,
              fontWeight: active ? 600 : 400,
            }}>{opt}</button>
        );
      })}
    </div>
  );
}

// ===== V4 CONSTANTS =====

// Step 1: About You (merged Basics + Lifestyle)
const GENDERS = ["Man", "Woman", "Non-binary", "Other", "Prefer not to say"];
const OPEN_TO = ["Women", "Men", "Everyone", "Prefer not to say"];
const DAY_TYPE = ["☀️ Morning person", "🌙 Night owl", "🌤️ Depends on the day"];
const SOCIAL = ["Introvert", "Extrovert", "Ambivert"];
const LOVE_LANG = ["Words of affirmation", "Quality time", "Acts of service", "Physical touch", "Gifts"];
const RELATIONSHIP = ["Single & not looking", "Single & open", "In a relationship", "It's complicated", "Prefer not to say"];
const SUBSTANCES = ["I don't drink or smoke", "Occasionally social", "Regularly", "Prefer not to say"];

// Step 2: Interests & Languages
const INTERESTS = ["Music", "Films", "TV shows", "Books", "Reels & memes", "Art", "Photography", "Gaming", "Technology", "AI", "Science", "Travel", "Food & cooking", "Fitness", "Nature & hiking", "Fashion", "Writing", "History", "Philosophy", "Psychology", "Business", "Animals", "Sports", "Dance", "Theatre", "Volunteering"];
const LANGUAGES = ["English", "Spanish", "French", "German", "Russian", "Ukrainian", "Portuguese", "Italian", "Arabic", "Hindi", "Mandarin", "Japanese", "Korean", "Turkish", "Polish", "Dutch"];

// Step 3: Location & Visibility
const LOCATION_ACCESS = ["Off", "Approximate (city)", "Precise"];
const DISTANCE_DISPLAY = ["Hidden", "Nearby / city", "Approx distance"];

// Step 4: What Matters
const PRESETS = [
  { key: "nearby", emoji: "🏙️", label: "Nearby & social", desc: "Interests + proximity" },
  { key: "deep", emoji: "💬", label: "Deep conversations", desc: "Interests + deep talks" },
  { key: "topic", emoji: "🧠", label: "Topic deep-dive", desc: "People who love the same topic" },
  { key: "flirt", emoji: "😏", label: "Open to flirt", desc: "Interests + mutual flirt" },
];

// Step 5: Photos & Media (New in v4)
// No constants needed — handled via file upload

// Step 6: Spirituality (Trimmed)
const SPIRITUAL_PATHS = ["Spiritual but not religious", "Buddhist", "Christian", "Hindu", "Muslim", "Jewish", "Mystical / esoteric", "Energy work", "Atheist but curious", "Agnostic", "Pagan / nature-based", "Secular / no label", "Still exploring"];
const SPIRIT_IMPORTANCE = ["🌱 Low", "🌿 Medium", "🌳 High", "🌟 Central"];

// Step 7: Conversation Style
const CONVO_STYLES = ["Playful & witty", "Thoughtful & reflective", "Intellectual & analytical", "Warm & nurturing", "Direct & honest", "Slow and deep", "Poetic & expressive", "Curious & questioning"];
const TEXT_FREQUENCY = ["A lot — I love long conversations", "A few times a day", "Sometimes, when inspired", "Only when there's real connection"];
const REPLY_STYLE = ["Short, punchy messages", "Long, thoughtful messages", "Voice-note style (but text)", "Fast replies — I'm always around", "Slow, deliberate replies"];
const PROMPT_LIBRARY = [
  "Ask me about…",
  "A hill I'll die on…",
  "The last thing that made me laugh…",
  "I could talk for hours about…",
  "An unpopular opinion I hold…",
  "A show, film or book everyone should try…",
];

// Step 8: Inner World
const VALUES = ["Honesty", "Kindness", "Growth", "Ambition", "Loyalty", "Freedom", "Faith", "Mindfulness", "Authenticity", "Compassion", "Courage", "Simplicity", "Curiosity", "Service to others"];
const PEACE = ["Silence", "Prayer / meditation", "Ocean / water", "Music", "Nature", "Movement / exercise", "Deep conversation", "Solitude", "Creative work", "Animals", "Reading", "Cooking"];
const APPRECIATED = ["Calm energy", "Humor", "Empathy", "Curiosity", "Wisdom", "Honesty", "Warmth", "Depth", "Creativity", "Reliability", "Playfulness"];
const WORKING_ON = ["Healing old wounds", "Personal growth", "Career & purpose", "Self-love", "Discipline", "Opening up emotionally", "Finding my path", "Letting go", "Building something meaningful", "Spiritual deepening"];

// Step 9: Topics & Boundaries (Consolidated)
const CONNECTION_INTENT = ["Friendship", "Deep talks", "Light daily chat", "Emotional support", "Language practice", "Playful banter"];
const CONVO_TOPICS = ["Big philosophical questions", "Everyday life & feelings", "Emotions & inner world", "Books & ideas", "Spirituality & beliefs", "Weird thoughts & dreams", "Humor & absurdity", "Creativity & art"];
const OPEN_TOPICS = ["Mental health", "Relationships & love", "Spirituality", "Sex & intimacy", "Trauma & healing", "Death & grief", "Money & ambition", "Family dynamics", "Controversial ideas", "Psychedelics", "Religion"];
const AVOID_TOPICS = ["Sex & intimacy details", "Trauma details", "Religion debates", "Conspiracy theories", "Negative gossip", "Graphic content"];
const FLIRTING = ["Yes, if respectful", "Light flirting is fine", "No, keep it platonic", "Depends on the person"];
const DEEP_CONVOS = ["Yes — that's why I'm here", "Sometimes, when I'm ready", "I prefer lighter topics", "Depends on the connection"];
const POLITICS = ["Progressive", "Moderate", "Conservative", "Apolitical", "Prefer not to say"];
const VISIBILITY = ["👤 Real profile", "🎭 Anonymous"];

// Step 10: Safety & Guidelines (New in v4)
// No constants needed — display only with acknowledgment button

// Step 11: Notifications (New in v4)
// No constants needed — toggle switches

const DATA_STEPS = 11;        // steps with the progress bar (data entry)
const PREVIEW_STEP = 12;      // profile preview
const WELCOME_STEP = 13;      // celebration
const TOTAL_STEPS = WELCOME_STEP;

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Step 1: About You (merged Basics + Lifestyle)
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [timezone, setTimezone] = useState("");
  const [gender, setGender] = useState("");
  const [openTo, setOpenTo] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [dayType, setDayType] = useState("");
  const [social, setSocial] = useState("");
  const [loveLang, setLoveLang] = useState("");
  const [relationship, setRelationship] = useState("");
  const [substances, setSubstances] = useState("");

  // Step 2: Interests & Languages
  const [interests, setInterests] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);

  // Step 3: Location & Visibility
  const [locationAccess, setLocationAccess] = useState("Off");
  const [discoverable, setDiscoverable] = useState(false);
  const [distanceDisplay, setDistanceDisplay] = useState("Hidden");

  // Step 4: What Matters
  const [matchPreset, setMatchPreset] = useState("");

  // Step 5: Photos & Media
  const [photoCount, setPhotoCount] = useState(0);
  const [hasVideo, setHasVideo] = useState(false);

  // Step 6: Spirituality (Trimmed)
  const [spiritualPath, setSpiritualPath] = useState("");
  const [spiritImportance, setSpiritImportance] = useState("");

  // Step 7: Conversation Style
  const [convoStyle, setConvoStyle] = useState<string[]>([]);
  const [textFreq, setTextFreq] = useState("");
  const [replyStyle, setReplyStyle] = useState("");
  const [promptAnswers, setPromptAnswers] = useState<Record<string, string>>({});

  // Step 8: Inner World
  const [values, setValues] = useState<string[]>([]);
  const [peace, setPeace] = useState<string[]>([]);
  const [appreciated, setAppreciated] = useState<string[]>([]);
  const [workingOn, setWorkingOn] = useState<string[]>([]);

  // Step 9: Topics & Boundaries (Consolidated)
  const [connectionIntent, setConnectionIntent] = useState<string[]>([]);
  const [convoTopics, setConvoTopics] = useState<string[]>([]);
  const [openTopics, setOpenTopics] = useState<string[]>([]);
  const [avoidTopics, setAvoidTopics] = useState<string[]>([]);
  const [flirting, setFlirting] = useState("");
  const [deepConvos, setDeepConvos] = useState("");
  const [politics, setPolitics] = useState("");
  const [visibility, setVisibility] = useState("");

  // Step 10: Safety & Guidelines
  const [safetyAgreed, setSafetyAgreed] = useState(false);

  // Step 11: Notifications
  const [notifMatches, setNotifMatches] = useState(true);
  const [notifMessages, setNotifMessages] = useState(true);
  const [notifTips, setNotifTips] = useState(false);
  const [notifNews, setNotifNews] = useState(false);

  const toggle = (arr: string[], set: React.Dispatch<React.SetStateAction<string[]>>, v: string) => {
    set(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);
  };

  // Pre-fill from localStorage
  useEffect(() => {
    try {
      const p = JSON.parse(localStorage.getItem("honly_profile") || "null");
      if (!p) return;
      setName(p.name || ""); setUsername(p.username || ""); setAge(p.age || ""); setTimezone(p.timezone || ""); setGender(p.gender || ""); setOpenTo(p.openTo || ""); setCity(p.city || ""); setBio(p.bio || "");
      setDayType(p.dayType || ""); setSocial(p.social || ""); setLoveLang(p.loveLang || ""); setRelationship(p.relationship || ""); setSubstances(p.substances || "");
      setInterests(p.interests || []); setLanguages(p.languages || []);
      setLocationAccess(p.locationAccess || "Off"); setDiscoverable(!!p.discoverable); setDistanceDisplay(p.distanceDisplay || "Hidden");
      setMatchPreset(p.matchPreset || "");
      setPhotoCount(p.photoCount || 0); setHasVideo(!!p.hasVideo);
      setSpiritualPath(p.spiritualPath || ""); setSpiritImportance(p.spiritImportance || "");
      setConvoStyle(p.convoStyle || []); setTextFreq(p.textFreq || ""); setReplyStyle(p.replyStyle || "");
      setValues(p.values || []); setPeace(p.peace || []); setAppreciated(p.appreciated || []); setWorkingOn(p.workingOn || []);
      setConnectionIntent(p.connectionIntent || []); setConvoTopics(p.convoTopics || []); setOpenTopics(p.openTopics || []); setAvoidTopics(p.avoidTopics || []); setFlirting(p.flirting || ""); setDeepConvos(p.deepConvos || ""); setPolitics(p.politics || ""); setVisibility(p.visibility || "");
      setSafetyAgreed(!!p.safetyAgreed);
      setNotifMatches(p.notifMatches !== false); setNotifMessages(p.notifMessages !== false); setNotifTips(!!p.notifTips); setNotifNews(!!p.notifNews);
      if (Array.isArray(p.prompts)) {
        const rec: Record<string, string> = {};
        p.prompts.forEach((x: { q: string; a: string }) => { if (x?.q) rec[x.q] = x.a || ""; });
        setPromptAnswers(rec);
      }
    } catch { /* ignore */ }
  }, []);

  const next = () => {
    // Validation
    if (step === 1) {
      if (!name.trim()) { toast.error("Please enter your name"); return; }
      if (!username.trim()) { toast.error("Please enter a @username"); return; }
      const n = parseInt(age, 10);
      if (!n || n < 18 || n > 99) { toast.error("Please enter a valid age (18–99)"); return; }
    }
    if (step === 2) {
      if (interests.length === 0) { toast.error("Pick at least one interest"); return; }
      if (languages.length === 0) { toast.error("Pick at least one language"); return; }
    }
    if (step === 4 && !matchPreset) { toast.error("Choose a vibe"); return; }
    if (step === 10 && !safetyAgreed) { toast.error("Please acknowledge the safety guidelines"); return; }

    // After the final data-entry step, persist the profile then show preview → welcome
    if (step === DATA_STEPS) {
      const profile = {
        name, username, age, timezone, gender, openTo, city, bio,
        dayType, social, loveLang, relationship, substances,
        interests, languages,
        locationAccess, discoverable, distanceDisplay,
        matchPreset,
        photoCount, hasVideo,
        spiritualPath, spiritImportance,
        convoStyle, textFreq, replyStyle,
        values, peace, appreciated, workingOn,
        connectionIntent, convoTopics, openTopics, avoidTopics, flirting, deepConvos, politics, visibility,
        safetyAgreed,
        notifMatches, notifMessages, notifTips, notifNews,
        prompts: Object.entries(promptAnswers).filter(([, a]) => a.trim()).map(([q, a]) => ({ q, a: a.trim() })),
      };
      localStorage.setItem("honly_profile", JSON.stringify(profile));
      setStep(PREVIEW_STEP);
      return;
    }

    if (step < TOTAL_STEPS) { setStep(step + 1); return; }

    // Welcome screen → into the app
    toast.success("Profile created! Let's find your people.");
    navigate("/discover");
  };

  const teal = "hsl(var(--teal))";
  const coral = "hsl(var(--coral))";

  const getStepLabel = () => {
    switch(step) {
      case 1: return { emoji: "👤", title: "About you", desc: "Name, vibe, and how to find you." };
      case 2: return { emoji: "🎯", title: "What you're into", desc: "Better conversations start here." };
      case 3: return { emoji: "📍", title: "Location & visibility", desc: "Two separate choices — off until you opt in." };
      case 4: return { emoji: "🎚️", title: "What matters to you?", desc: "Pick a vibe. Customize later in Discover." };
      case 5: return { emoji: "📸", title: "Photos & media", desc: "You can add up to 6 pictures." };
      case 6: return { emoji: "✨", title: "Spirituality", desc: "Share as little or as much as feels right." };
      case 7: return { emoji: "💬", title: "Conversation style", desc: "Help us match your vibe." };
      case 8: return { emoji: "🌿", title: "Inner world", desc: "What drives you and brings you peace." };
      case 9: return { emoji: "🛡️", title: "Topics & boundaries", desc: "What you want to talk about & your limits." };
      case 10: return { emoji: "🛡️", title: "Community guidelines", desc: "We keep HOnly safe for real people." };
      case 11: return { emoji: "🔔", title: "Notifications", desc: "Control how we reach you." };
      default: return { emoji: "👋", title: "Welcome", desc: "" };
    }
  };

  const stepInfo = getStepLabel();

  return (
    <div className="min-h-screen bg-background font-body flex flex-col items-center p-6 py-10">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <img src={logoImg} alt="HOnly" className="h-10 w-auto object-contain" />
        </div>

        {/* Progress Bar — data-entry steps only */}
        {step <= DATA_STEPS && (
          <div className="flex gap-1.5 mb-10">
            {Array.from({ length: DATA_STEPS }).map((_, i) => (
              <div key={i} className="flex-1 h-1 rounded-full transition-all" style={{ backgroundColor: i < step ? coral : "hsl(var(--cream-dark))" }} />
            ))}
          </div>
        )}

        {/* Step Header — data-entry steps only */}
        {step <= DATA_STEPS && (
          <div className="mb-8">
            <span className="text-5xl block mb-3">{stepInfo.emoji}</span>
            <h2 className="text-3xl font-bold text-navy mb-2 font-heading">{stepInfo.title}</h2>
            <p className="text-slate-muted text-sm leading-relaxed">{stepInfo.desc}</p>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>

            {step === 1 && (
              <div className="flex flex-col gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-muted mb-2 uppercase tracking-widest">Display name</label>
                    <input className="honly-input w-full" placeholder="How should people call you?" value={name} onChange={e => setName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-muted mb-2 uppercase tracking-widest">@username · unique & searchable</label>
                    <input className="honly-input w-full" placeholder="@alex_curious" value={username} onChange={e => setUsername(e.target.value)} />
                    {username && <p className="text-xs text-teal mt-1.5 font-medium">✓ Available</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-muted mb-2 uppercase tracking-widest">Age</label>
                      <input type="number" min={18} max={99} className="honly-input w-full" placeholder="18–99" value={age} onChange={e => setAge(e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-muted mb-2 uppercase tracking-widest">Time zone</label>
                      <input className="honly-input w-full" placeholder="UTC+1" value={timezone} onChange={e => setTimezone(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className="border-t border-cream-dark pt-6">
                  <p className="text-xs font-semibold text-slate-muted mb-3 uppercase tracking-widest">I am…</p>
                  <Single options={GENDERS} value={gender} onChange={setGender} />
                </div>
                <div className="border-t border-cream-dark pt-6">
                  <p className="text-xs font-semibold text-slate-muted mb-3 uppercase tracking-widest">Who you're open to connecting with</p>
                  <Single options={OPEN_TO} value={openTo} onChange={setOpenTo} color={teal} />
                </div>
                <div className="border-t border-cream-dark pt-6">
                  <label className="block text-xs font-semibold text-slate-muted mb-2 uppercase tracking-widest">City / Country</label>
                  <input className="honly-input w-full" placeholder='e.g. "Berlin, Germany"' value={city} onChange={e => setCity(e.target.value)} />
                </div>
                <div className="border-t border-cream-dark pt-6">
                  <label className="block text-xs font-semibold text-slate-muted mb-2 uppercase tracking-widest">Bio / What brings you here</label>
                  <textarea maxLength={200} className="honly-input w-full min-h-[100px] resize-none" placeholder="What's your vibe?" value={bio} onChange={e => setBio(e.target.value)} />
                  <p className="text-xs text-slate-muted mt-1.5">{bio.length}/200</p>
                </div>
                <div className="border-t border-cream-dark pt-6">
                  <p className="text-xs font-semibold text-slate-muted mb-3 uppercase tracking-widest">Daily rhythm</p>
                  <Single options={DAY_TYPE} value={dayType} onChange={setDayType} />
                </div>
                <div className="border-t border-cream-dark pt-6">
                  <p className="text-xs font-semibold text-slate-muted mb-3 uppercase tracking-widest">Socially, I'm…</p>
                  <Single options={SOCIAL} value={social} onChange={setSocial} color={teal} />
                </div>
                <div className="border-t border-cream-dark pt-6">
                  <p className="text-xs font-semibold text-slate-muted mb-3 uppercase tracking-widest">My love language</p>
                  <Single options={LOVE_LANG} value={loveLang} onChange={setLoveLang} />
                </div>
                <div className="border-t border-cream-dark pt-6">
                  <p className="text-xs font-semibold text-slate-muted mb-3 uppercase tracking-widest">Relationship status</p>
                  <Single options={RELATIONSHIP} value={relationship} onChange={setRelationship} color={teal} />
                </div>
                <div className="border-t border-cream-dark pt-6">
                  <p className="text-xs font-semibold text-slate-muted mb-3 uppercase tracking-widest">Alcohol / substances</p>
                  <Single options={SUBSTANCES} value={substances} onChange={setSubstances} />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-6">
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-slate-muted uppercase tracking-widest">Interests (pick a few)</p>
                  <ChipGroup options={INTERESTS} selected={interests} onToggle={v => toggle(interests, setInterests, v)} />
                </div>
                <div className="border-t border-cream-dark pt-6 space-y-3">
                  <p className="text-xs font-semibold text-slate-muted uppercase tracking-widest">Languages I talk in</p>
                  <ChipGroup options={LANGUAGES} selected={languages} onToggle={v => toggle(languages, setLanguages, v)} color={teal} />
                </div>
                <div className="rounded-lg bg-cream border-l-4 border-teal px-4 py-3">
                  <p className="text-sm text-navy/80">✨ More interests = better matches</p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-6">
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-slate-muted uppercase tracking-widest">Use my location?</p>
                  <Single options={LOCATION_ACCESS} value={locationAccess} onChange={setLocationAccess} />
                </div>
                {locationAccess !== "Off" && (
                  <>
                    <div className="border-t border-cream-dark pt-6">
                      <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-white border border-cream-dark">
                        <div>
                          <p className="text-sm font-medium text-navy">Let others find me nearby</p>
                          <p className="text-xs text-slate-muted">Browse nearby while staying hidden.</p>
                        </div>
                        <button type="button" onClick={() => setDiscoverable(!discoverable)}
                          className="w-12 h-6 rounded-full relative transition-colors shrink-0 border-2 border-navy flex-shrink-0"
                          style={{ backgroundColor: discoverable ? coral : "hsl(var(--cream-dark))" }}>
                          <div className="w-4 h-4 rounded-full absolute top-0.5 transition-all bg-card border border-navy"
                            style={{ left: discoverable ? "calc(100% - 18px)" : "2px" }} />
                        </button>
                      </div>
                    </div>
                    <div className="border-t border-cream-dark pt-6 space-y-3">
                      <p className="text-xs font-semibold text-slate-muted uppercase tracking-widest">Show distance on my card</p>
                      <Single options={DISTANCE_DISPLAY} value={distanceDisplay} onChange={setDistanceDisplay} color={teal} />
                    </div>
                  </>
                )}
                <div className="rounded-lg bg-cream border-l-4 border-teal px-4 py-3">
                  <p className="text-sm text-navy/80">🔒 Discoverable & distance OFF by default — your exact location is never shown.</p>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-3">
                  {PRESETS.map(p => {
                    const active = matchPreset === p.key;
                    return (
                      <button key={p.key} type="button" onClick={() => setMatchPreset(p.key)}
                        className="text-left rounded-xl border-2 p-4 transition-all"
                        style={{
                          borderColor: active ? coral : "hsl(var(--cream-dark))",
                          backgroundColor: active ? "hsl(var(--coral) / 0.06)" : "hsl(var(--card))",
                        }}>
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{p.emoji}</span>
                          <div>
                            <p className="font-bold text-navy text-sm">{p.label}</p>
                            <p className="text-xs text-slate-muted">{p.desc}</p>
                          </div>
                          {active && <div className="ml-auto" style={{ color: coral }}>✓</div>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="flex flex-col gap-6">
                <div className="space-y-4">
                  <p className="text-xs font-semibold text-slate-muted uppercase tracking-widest">Upload photos</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="aspect-square rounded-lg border-2 border-dashed border-cream-dark flex items-center justify-center text-3xl cursor-pointer hover:bg-cream transition-colors bg-white">
                        {i <= photoCount ? "📸" : "＋"}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-muted">{photoCount} of 6 photos</p>
                </div>
                <div className="border-t border-cream-dark pt-6">
                  <label className="flex items-center gap-3 p-4 border border-cream-dark rounded-lg cursor-pointer hover:bg-cream transition-colors bg-white">
                    <input type="checkbox" checked={hasVideo} onChange={e => setHasVideo(e.target.checked)} className="w-5 h-5" />
                    <div>
                      <p className="text-sm font-medium text-navy">Add a short video intro</p>
                      <p className="text-xs text-slate-muted">30-sec video · engagement boost</p>
                    </div>
                  </label>
                </div>
                <div className="rounded-lg bg-cream border-l-4 border-teal px-4 py-3">
                  <p className="text-sm text-navy/80">📷 <b>First picture = profile card</b>. Show your face or avatar.</p>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="flex flex-col gap-6">
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-slate-muted uppercase tracking-widest">Path / tradition</p>
                  <Single options={SPIRITUAL_PATHS} value={spiritualPath} onChange={setSpiritualPath} />
                </div>
                <div className="border-t border-cream-dark pt-6 space-y-3">
                  <p className="text-xs font-semibold text-slate-muted uppercase tracking-widest">Importance to you</p>
                  <Single options={SPIRIT_IMPORTANCE} value={spiritImportance} onChange={setSpiritImportance} color={teal} />
                </div>
                <div className="rounded-lg bg-cream border-l-4 border-teal px-4 py-3 text-sm text-navy/80">
                  Practices & deeper topics can be added in your profile later.
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="flex flex-col gap-6">
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-slate-muted uppercase tracking-widest">My style (up to 3)</p>
                  <ChipGroup options={CONVO_STYLES} selected={convoStyle} onToggle={v => toggle(convoStyle, setConvoStyle, v)} max={3} color={teal} />
                </div>
                <div className="border-t border-cream-dark pt-6 space-y-3">
                  <p className="text-xs font-semibold text-slate-muted uppercase tracking-widest">Texting frequency</p>
                  <Single options={TEXT_FREQUENCY} value={textFreq} onChange={setTextFreq} color={teal} />
                </div>
                <div className="border-t border-cream-dark pt-6 space-y-3">
                  <p className="text-xs font-semibold text-slate-muted uppercase tracking-widest">Reply style</p>
                  <Single options={REPLY_STYLE} value={replyStyle} onChange={setReplyStyle} />
                </div>
                <div className="border-t border-cream-dark pt-6">
                  <p className="text-xs font-semibold text-slate-muted mb-3 uppercase tracking-widest">Conversation prompts · optional</p>
                  <div className="flex flex-col gap-3">
                    {PROMPT_LIBRARY.map(q => (
                      <div key={q}>
                        <label className="block text-xs font-semibold text-teal mb-1.5">{q}</label>
                        <input className="honly-input w-full" placeholder="Your answer…" maxLength={120}
                          value={promptAnswers[q] || ""}
                          onChange={e => setPromptAnswers(prev => ({ ...prev, [q]: e.target.value }))} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 8 && (
              <div className="flex flex-col gap-6">
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-slate-muted uppercase tracking-widest">Values (up to 5)</p>
                  <ChipGroup options={VALUES} selected={values} onToggle={v => toggle(values, setValues, v)} max={5} />
                </div>
                <div className="border-t border-cream-dark pt-6 space-y-3">
                  <p className="text-xs font-semibold text-slate-muted uppercase tracking-widest">What gives me peace</p>
                  <ChipGroup options={PEACE} selected={peace} onToggle={v => toggle(peace, setPeace, v)} color={teal} />
                </div>
                <div className="border-t border-cream-dark pt-6 space-y-3">
                  <p className="text-xs font-semibold text-slate-muted uppercase tracking-widest">What people appreciate (up to 3)</p>
                  <ChipGroup options={APPRECIATED} selected={appreciated} onToggle={v => toggle(appreciated, setAppreciated, v)} max={3} />
                </div>
                <div className="border-t border-cream-dark pt-6 space-y-3">
                  <p className="text-xs font-semibold text-slate-muted uppercase tracking-widest">Working on (up to 3)</p>
                  <ChipGroup options={WORKING_ON} selected={workingOn} onToggle={v => toggle(workingOn, setWorkingOn, v)} max={3} color={teal} />
                </div>
              </div>
            )}

            {step === 9 && (
              <div className="flex flex-col gap-6">
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-slate-muted uppercase tracking-widest">Connection I want (up to 3)</p>
                  <ChipGroup options={CONNECTION_INTENT} selected={connectionIntent} onToggle={v => toggle(connectionIntent, setConnectionIntent, v)} max={3} />
                </div>
                <div className="border-t border-cream-dark pt-6 space-y-3">
                  <p className="text-xs font-semibold text-slate-muted uppercase tracking-widest">Conversation topics I love</p>
                  <ChipGroup options={CONVO_TOPICS} selected={convoTopics} onToggle={v => toggle(convoTopics, setConvoTopics, v)} color={teal} />
                </div>
                <div className="border-t border-cream-dark pt-6 space-y-3">
                  <p className="text-xs font-semibold text-slate-muted uppercase tracking-widest">Open to discussing</p>
                  <ChipGroup options={OPEN_TOPICS} selected={openTopics} onToggle={v => toggle(openTopics, setOpenTopics, v)} />
                </div>
                <div className="border-t border-cream-dark pt-6 space-y-3">
                  <p className="text-xs font-semibold text-slate-muted uppercase tracking-widest">Rather not discuss</p>
                  <ChipGroup options={AVOID_TOPICS} selected={avoidTopics} onToggle={v => toggle(avoidTopics, setAvoidTopics, v)} color={teal} />
                </div>
                <div className="border-t border-cream-dark pt-6 space-y-3">
                  <p className="text-xs font-semibold text-slate-muted uppercase tracking-widest">Flirting?</p>
                  <Single options={FLIRTING} value={flirting} onChange={setFlirting} />
                </div>
                <div className="border-t border-cream-dark pt-6 space-y-3">
                  <p className="text-xs font-semibold text-slate-muted uppercase tracking-widest">Deep conversations?</p>
                  <Single options={DEEP_CONVOS} value={deepConvos} onChange={setDeepConvos} color={teal} />
                </div>
                <div className="border-t border-cream-dark pt-6 space-y-3">
                  <p className="text-xs font-semibold text-slate-muted uppercase tracking-widest">Political leaning · optional</p>
                  <Single options={POLITICS} value={politics} onChange={setPolitics} color={teal} />
                </div>
                <div className="border-t border-cream-dark pt-6 space-y-3">
                  <p className="text-xs font-semibold text-slate-muted uppercase tracking-widest">Profile visibility</p>
                  <Single options={VISIBILITY} value={visibility} onChange={setVisibility} />
                </div>
              </div>
            )}

            {step === 10 && (
              <div className="flex flex-col gap-6">
                <div className="rounded-lg border-l-4 border-coral bg-white p-4">
                  <div className="font-bold text-navy mb-2 text-sm">🚫 Never share personal info</div>
                  <p className="text-xs text-slate-muted leading-relaxed">No phone, address, financial info until you really trust someone.</p>
                </div>
                <div className="rounded-lg border-l-4 border-teal bg-white p-4">
                  <div className="font-bold text-navy mb-2 text-sm">🛑 Block & report instantly</div>
                  <p className="text-xs text-slate-muted leading-relaxed">See someone inappropriate? Tap the menu to block or report.</p>
                </div>
                <div className="rounded-lg border-l-4 border-coral bg-white p-4">
                  <div className="font-bold text-navy mb-2 text-sm">💭 Mental health support</div>
                  <p className="text-xs text-slate-muted leading-relaxed">Text HOME to 741741 · <span className="font-bold text-coral">Crisis Text Line</span> (free, 24/7, confidential)</p>
                </div>
                <label className="flex items-center gap-3 p-4 border border-cream-dark rounded-lg cursor-pointer hover:bg-cream transition-colors bg-white">
                  <input type="checkbox" checked={safetyAgreed} onChange={e => setSafetyAgreed(e.target.checked)} className="w-5 h-5 accent-coral" />
                  <p className="text-sm text-navy font-medium">I understand & agree to keep this space safe and real</p>
                </label>
              </div>
            )}

            {step === 11 && (
              <div className="flex flex-col gap-4">
                <label className="flex items-center justify-between p-4 border border-cream-dark rounded-lg cursor-pointer hover:bg-cream transition-colors bg-white">
                  <div>
                    <p className="text-sm font-medium text-navy">New matches</p>
                    <p className="text-xs text-slate-muted">When someone matches your vibe</p>
                  </div>
                  <button type="button" onClick={() => setNotifMatches(!notifMatches)}
                    className="w-12 h-6 rounded-full relative transition-colors border-2 border-navy flex-shrink-0"
                    style={{ backgroundColor: notifMatches ? coral : "hsl(var(--cream-dark))" }}>
                    <div className="w-4 h-4 rounded-full absolute top-0.5 transition-all bg-card border border-navy"
                      style={{ left: notifMatches ? "calc(100% - 18px)" : "2px" }} />
                  </button>
                </label>
                <label className="flex items-center justify-between p-4 border border-cream-dark rounded-lg cursor-pointer hover:bg-cream transition-colors bg-white">
                  <div>
                    <p className="text-sm font-medium text-navy">Messages</p>
                    <p className="text-xs text-slate-muted">New chats & replies</p>
                  </div>
                  <button type="button" onClick={() => setNotifMessages(!notifMessages)}
                    className="w-12 h-6 rounded-full relative transition-colors border-2 border-navy flex-shrink-0"
                    style={{ backgroundColor: notifMessages ? coral : "hsl(var(--cream-dark))" }}>
                    <div className="w-4 h-4 rounded-full absolute top-0.5 transition-all bg-card border border-navy"
                      style={{ left: notifMessages ? "calc(100% - 18px)" : "2px" }} />
                  </button>
                </label>
                <label className="flex items-center justify-between p-4 border border-cream-dark rounded-lg cursor-pointer hover:bg-cream transition-colors bg-white">
                  <div>
                    <p className="text-sm font-medium text-navy">Profile tips</p>
                    <p className="text-xs text-slate-muted">Help completing your profile</p>
                  </div>
                  <button type="button" onClick={() => setNotifTips(!notifTips)}
                    className="w-12 h-6 rounded-full relative transition-colors border-2 border-navy flex-shrink-0"
                    style={{ backgroundColor: notifTips ? coral : "hsl(var(--cream-dark))" }}>
                    <div className="w-4 h-4 rounded-full absolute top-0.5 transition-all bg-card border border-navy"
                      style={{ left: notifTips ? "calc(100% - 18px)" : "2px" }} />
                  </button>
                </label>
                <label className="flex items-center justify-between p-4 border border-cream-dark rounded-lg cursor-pointer hover:bg-cream transition-colors bg-white">
                  <div>
                    <p className="text-sm font-medium text-navy">News & events</p>
                    <p className="text-xs text-slate-muted">New features & community events</p>
                  </div>
                  <button type="button" onClick={() => setNotifNews(!notifNews)}
                    className="w-12 h-6 rounded-full relative transition-colors border-2 border-navy flex-shrink-0"
                    style={{ backgroundColor: notifNews ? coral : "hsl(var(--cream-dark))" }}>
                    <div className="w-4 h-4 rounded-full absolute top-0.5 transition-all bg-card border border-navy"
                      style={{ left: notifNews ? "calc(100% - 18px)" : "2px" }} />
                  </button>
                </label>
                <div className="rounded-lg bg-cream border-l-4 border-teal px-4 py-3 text-sm text-navy/80 mt-2">
                  ⚙️ Change these anytime in Settings → Notifications.
                </div>
              </div>
            )}

            {/* ===== PROFILE PREVIEW ===== */}
            {step === PREVIEW_STEP && (
              <div className="flex flex-col gap-6">
                <div className="text-center">
                  <span className="text-5xl block mb-3">👀</span>
                  <h2 className="text-3xl font-bold text-navy mb-2 font-heading">Your profile</h2>
                  <p className="text-slate-muted text-sm">This is what others see. You can edit anything anytime.</p>
                </div>

                {/* Profile card preview */}
                <div className="rounded-2xl overflow-hidden border-2 border-navy bg-white" style={{ boxShadow: "4px 4px 0 hsl(var(--navy))" }}>
                  <div className="h-28 relative flex items-end justify-center" style={{ background: "linear-gradient(135deg, hsl(var(--coral)), #f08a72)" }}>
                    <span className="absolute top-2 left-2 bg-white rounded-full px-2.5 py-1 text-xs font-extrabold text-navy">85%</span>
                    <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full border-2 border-white" style={{ backgroundColor: "hsl(var(--green, 142 60% 49%))", background: "#3BBF6E" }} />
                    <svg width="54" height="48" viewBox="0 0 100 100"><circle cx="50" cy="30" r="19" fill="#fff" opacity=".9"/><path d="M16 100 Q16 62 50 62 Q84 62 84 100Z" fill="#fff" opacity=".9"/></svg>
                  </div>
                  <div className="p-4">
                    <div className="font-bold text-navy">{name || "Your name"}{age ? `, ${age}` : ""}</div>
                    <div className="text-xs text-slate-muted mb-3">🏙️ {city || "Your city"}{username ? ` · ${username.startsWith("@") ? username : "@" + username}` : ""}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {interests.slice(0, 3).map(i => (
                        <span key={i} className="rounded-full px-2.5 py-1 text-xs font-semibold text-navy" style={{ background: "hsl(var(--teal) / 0.13)", border: "1px solid hsl(var(--teal) / 0.45)" }}>{i}</span>
                      ))}
                      {interests.length === 0 && <span className="text-xs text-slate-muted">Add interests to stand out</span>}
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-cream-dark bg-white p-3 text-center">
                    <div className="text-lg font-extrabold text-coral">{photoCount}</div>
                    <div className="text-[10px] text-slate-muted uppercase tracking-wide">Photos</div>
                  </div>
                  <div className="rounded-xl border border-cream-dark bg-white p-3 text-center">
                    <div className="text-lg font-extrabold text-teal">{interests.length}</div>
                    <div className="text-[10px] text-slate-muted uppercase tracking-wide">Interests</div>
                  </div>
                  <div className="rounded-xl border border-cream-dark bg-white p-3 text-center">
                    <div className="text-lg font-extrabold text-navy">85%</div>
                    <div className="text-[10px] text-slate-muted uppercase tracking-wide">Complete</div>
                  </div>
                </div>

                <div className="rounded-lg bg-cream border-l-4 border-teal px-4 py-3 text-sm text-navy/80">
                  💡 This is what others see when they visit your profile.
                </div>
              </div>
            )}

            {/* ===== WELCOME CELEBRATION ===== */}
            {step === WELCOME_STEP && (
              <div className="flex flex-col items-center text-center gap-4 py-6">
                <div className="text-7xl mb-2">🎉</div>
                <p className="text-xs font-semibold text-teal uppercase tracking-widest">You're in!</p>
                <h2 className="text-3xl font-bold text-navy font-heading">Welcome to HOnly{name ? `, ${name}` : ""}!</h2>
                <p className="text-slate-muted text-sm max-w-xs">A community of real humans having real conversations.</p>

                <div className="w-full mt-4 rounded-xl border-2 border-navy bg-cream p-5">
                  <p className="text-[11px] font-bold text-slate-muted uppercase tracking-widest mb-2">Your referral code</p>
                  <div className="font-mono text-lg font-bold text-navy bg-white rounded-lg py-2 px-4 inline-block border border-cream-dark">
                    {(username ? username.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 6) : "HONLY") + "2026"}
                  </div>
                  <p className="text-xs text-slate-muted mt-3">Invite a friend — real connections grow the community.</p>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-10">
          {step > 1 && step <= DATA_STEPS ? (
            <button onClick={() => setStep(step - 1)} className="honly-btn-outline flex items-center gap-2 text-sm px-6 py-2.5">
              <ArrowLeft size={14} /> Back
            </button>
          ) : <div />}
          <button onClick={next} className="honly-btn-primary flex items-center gap-2 text-sm px-6 py-2.5">
            {step === PREVIEW_STEP ? "Looks good →" : step === WELCOME_STEP ? "Start discovering people →" : "Continue"}
            {step < PREVIEW_STEP && <ArrowRight size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}
