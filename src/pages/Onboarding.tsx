import { useState } from "react";
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

// Step 1
const GENDERS = ["Man", "Woman", "Non-binary", "Other", "Prefer not to say"];
const SHOW_LOCATION = ["Yes, show my city", "No, keep it hidden"];

// Step 2
const SPIRITUAL_PATHS = ["Spiritual but not religious", "Buddhist", "Christian", "Hindu", "Muslim", "Jewish", "Mystical / esoteric", "Energy work", "Atheist but curious", "Agnostic", "Pagan / nature-based", "Secular / no label", "Still exploring"];
const SPIRIT_IMPORTANCE = ["🌱 Low", "🌿 Medium", "🌳 High", "🌟 Central"];
const PRACTICES = ["Meditation", "Prayer", "Tarot / oracle cards", "Astrology", "Yoga", "Journaling", "Breathwork", "Church / temple / mosque", "Rituals", "Nature walks", "Fasting", "Sound healing", "Dream work", "Somatic practices"];
const BELIEFS = ["Intuition", "Karma", "God / higher power", "The Universe", "Manifestation", "Reincarnation", "Healing energy", "Science first", "Synchronicity", "Ancestral wisdom", "Free will", "Fate / destiny"];
const SPIRIT_TOPICS = ["Meaning of life", "Relationships & attachment", "Shadow work", "Dreams & the subconscious", "Consciousness", "Purpose & calling", "Healing & trauma", "Death & afterlife", "Mystical experiences", "Religion & culture", "Psychedelics & expansion", "Awakening"];

// Step 3
const CONNECTION_TYPES = ["Deep, meaningful talks", "Light daily chat", "Emotional support", "Philosophical exchange", "Spiritual connection", "Intellectual sparring", "Playful banter", "Slow and intentional", "Flirty energy"];
const CONVO_STYLES = ["Playful & witty", "Thoughtful & reflective", "Intellectual & analytical", "Warm & nurturing", "Direct & honest", "Slow and deep", "Poetic & expressive", "Curious & questioning"];
const TEXT_FREQUENCY = ["A lot — I love long conversations", "A few times a day", "Sometimes, when inspired", "Only when there's real connection"];
const REPLY_STYLE = ["Short, punchy messages", "Long, thoughtful messages", "Voice-note style (but text)", "Fast replies — I'm always around", "Slow, deliberate replies"];
const CONVO_STARTERS = ["Big philosophical questions", "Everyday life & feelings", "Emotions & inner world", "Books & ideas", "Spirituality & beliefs", "Weird thoughts & dreams", "Humor & absurdity", "Creativity & art"];

// Step 4
const VALUES = ["Honesty", "Kindness", "Growth", "Ambition", "Loyalty", "Freedom", "Faith", "Mindfulness", "Authenticity", "Compassion", "Courage", "Simplicity", "Curiosity", "Service to others"];
const PEACE = ["Silence", "Prayer / meditation", "Ocean / water", "Music", "Nature", "Movement / exercise", "Deep conversation", "Solitude", "Creative work", "Animals", "Reading", "Cooking"];
const APPRECIATED = ["Calm energy", "Humor", "Empathy", "Curiosity", "Wisdom", "Honesty", "Warmth", "Depth", "Creativity", "Reliability", "Playfulness"];
const WORKING_ON = ["Healing old wounds", "Personal growth", "Career & purpose", "Self-love", "Discipline", "Opening up emotionally", "Finding my path", "Letting go", "Building something meaningful", "Spiritual deepening"];

// Step 5
const DAY_TYPE = ["☀️ Morning person", "🌙 Night owl", "🌤️ Depends on the day"];
const SOCIAL = ["Introvert", "Extrovert", "Ambivert"];
const LOVE_LANG = ["Words of affirmation", "Quality time", "Acts of service", "Physical touch", "Gifts"];
const RELATIONSHIP = ["Single & not looking", "Single & open", "In a relationship", "It's complicated", "Prefer not to say"];
const SUBSTANCES = ["I don't drink or smoke", "Occasionally social", "Regularly", "Prefer not to say"];

// Step 6
const OPEN_TOPICS = ["Mental health", "Relationships & love", "Spirituality", "Politics", "Sex & intimacy", "Trauma & healing", "Death & grief", "Money & ambition", "Family dynamics", "Controversial ideas", "Psychedelics", "Religion"];
const AVOID_TOPICS = ["Politics", "Sex & intimacy", "Trauma details", "Religion debates", "Conspiracy theories", "Negative gossip", "Graphic content", "Relationship drama"];
const FLIRTING = ["Yes, if it's respectful", "Light flirting is fine", "No, please keep it platonic", "Depends on the person"];
const DEEP_CONVOS = ["Yes — that's why I'm here", "Sometimes, when I'm ready", "I prefer lighter topics", "Depends on the connection"];
const VISIBILITY = ["👤 Real profile", "🎭 Anonymous"];
const POLITICS = ["Progressive", "Moderate", "Conservative", "Apolitical", "Prefer not to say"];
const PROMPT_LIBRARY = [
  "Ask me about…",
  "A hill I'll die on…",
  "The last thing that made me laugh…",
  "I could talk for hours about…",
  "An unpopular opinion I hold…",
  "A show, film or book everyone should try…",
];

// Matching essentials
const INTERESTS = ["Music", "Films", "TV shows", "Books", "Reels & memes", "Art", "Photography", "Gaming", "Technology", "Science", "Travel", "Food & cooking", "Fitness", "Nature & hiking", "Fashion", "Writing", "Politics", "History", "Philosophy", "Psychology", "Business", "Animals", "Sports", "Dance", "Theatre", "Volunteering"];
const LANGUAGES = ["English", "Spanish", "French", "German", "Russian", "Ukrainian", "Portuguese", "Italian", "Arabic", "Hindi", "Mandarin", "Japanese", "Korean", "Turkish", "Polish", "Dutch"];
const INTENT = ["Friendship", "Deep talks", "Light daily chat", "Emotional support", "Language practice", "Playful banter"];

// Location & visibility
const LOCATION_ACCESS = ["Off", "Approximate (city)", "Precise"];
const DISTANCE_DISPLAY = ["Hidden", "Nearby / city", "Approx distance"];

// Match presets
const PRESETS = [
  { key: "nearby", emoji: "🏙️", label: "Nearby & social", desc: "Interests + proximity" },
  { key: "deep", emoji: "💬", label: "Deep conversations", desc: "Interests + deep talks" },
  { key: "topic", emoji: "🧠", label: "Topic deep-dive", desc: "A topic, location off" },
  { key: "flirt", emoji: "😏", label: "Open to flirt", desc: "Interests + mutual flirt" },
  { key: "custom", emoji: "🎚️", label: "Custom", desc: "Fine-tune later in Discover" },
];

const TOTAL_STEPS = 9;

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Step 1
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [showLocation, setShowLocation] = useState("yes");
  const [timezone, setTimezone] = useState("");
  const [bio, setBio] = useState("");

  // Matching essentials (new steps 2–4)
  const [interests, setInterests] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [intent, setIntent] = useState<string[]>([]);
  const [locationAccess, setLocationAccess] = useState("Off");
  const [discoverable, setDiscoverable] = useState(false);
  const [distanceDisplay, setDistanceDisplay] = useState("Hidden");
  const [matchPreset, setMatchPreset] = useState("");
  const [promptAnswers, setPromptAnswers] = useState<Record<string, string>>({});

  // Step 2
  const [spiritualPath, setSpiritualPath] = useState("");
  const [spiritImportance, setSpiritImportance] = useState("");
  const [practices, setPractices] = useState<string[]>([]);
  const [beliefs, setBeliefs] = useState<string[]>([]);
  const [spiritTopics, setSpiritTopics] = useState<string[]>([]);
  const [spiritMeaning, setSpiritMeaning] = useState("");

  // Step 3
  const [connectionType, setConnectionType] = useState<string[]>([]);
  const [convoStyle, setConvoStyle] = useState<string[]>([]);
  const [textFreq, setTextFreq] = useState("");
  const [replyStyle, setReplyStyle] = useState("");
  const [convoStarters, setConvoStarters] = useState<string[]>([]);

  // Step 4
  const [values, setValues] = useState<string[]>([]);
  const [peace, setPeace] = useState<string[]>([]);
  const [appreciated, setAppreciated] = useState<string[]>([]);
  const [workingOn, setWorkingOn] = useState<string[]>([]);

  // Step 5
  const [dayType, setDayType] = useState("");
  const [social, setSocial] = useState("");
  const [loveLang, setLoveLang] = useState("");
  const [relationship, setRelationship] = useState("");
  const [substances, setSubstances] = useState("");

  // Step 6
  const [openTopics, setOpenTopics] = useState<string[]>([]);
  const [avoidTopics, setAvoidTopics] = useState<string[]>([]);
  const [flirting, setFlirting] = useState("");
  const [deepConvos, setDeepConvos] = useState("");
  const [visibility, setVisibility] = useState("");
  const [politics, setPolitics] = useState("");

  const toggle = (arr: string[], set: React.Dispatch<React.SetStateAction<string[]>>, v: string) => {
    set(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);
  };

  const next = () => {
    if (step === 1) {
      if (!name.trim()) { toast.error("Please enter your name"); return; }
      const n = parseInt(age, 10);
      if (!n || n < 18 || n > 99) { toast.error("Please enter a valid age (18–99)"); return; }
    }
    if (step === 2) {
      if (interests.length === 0) { toast.error("Pick at least one interest"); return; }
      if (languages.length === 0) { toast.error("Pick at least one language"); return; }
    }
    if (step === 4 && !matchPreset) { toast.error("Choose a vibe (or Custom)"); return; }
    if (step < TOTAL_STEPS) setStep(step + 1);
    else {
      const profile = {
        name, age, gender, city, showLocation, timezone, bio,
        interests, languages, intent, locationAccess, discoverable, distanceDisplay, matchPreset,
        spiritualPath, spiritImportance, practices, beliefs, spiritTopics, spiritMeaning,
        connectionType, convoStyle, textFreq, replyStyle, convoStarters,
        values, peace, appreciated, workingOn,
        dayType, social, loveLang, relationship, substances,
        openTopics, avoidTopics, flirting, deepConvos, visibility, politics,
        prompts: Object.entries(promptAnswers).filter(([, a]) => a.trim()).map(([q, a]) => ({ q, a: a.trim() })),
      };
      localStorage.setItem("honly_profile", JSON.stringify(profile));
      toast.success("Profile created! Let's find your people.");
      navigate("/discover");
    }
  };

  const teal = "hsl(var(--teal))";
  const coral = "hsl(var(--coral))";

  return (
    <div className="min-h-screen bg-background font-body flex flex-col items-center p-6 py-10">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <img src={logoImg} alt="HOnly" className="h-11 w-auto object-contain" />
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div key={i} className="flex-1 h-1.5 rounded-full transition-all" style={{ backgroundColor: i < step ? coral : "hsl(var(--cream-dark))" }} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            {step === 1 && (
              <div className="flex flex-col gap-6">
                <div>
                  <span className="text-4xl mb-3 block">👤</span>
                  <h2 className="text-3xl mb-1 font-heading text-navy">Basics</h2>
                  <p className="text-slate-muted">This is what people will see on your profile. Be real — that's the whole point.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-navy">Display name</label>
                  <input className="honly-input" placeholder="How should people call you?" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-navy">Age</label>
                    <input type="number" min={18} max={99} className="honly-input" placeholder="18–99" value={age} onChange={e => setAge(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-navy">Time zone</label>
                    <input className="honly-input" placeholder="e.g. UTC+3, EST" value={timezone} onChange={e => setTimezone(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-navy">I am…</label>
                  <Single options={GENDERS} value={gender} onChange={setGender} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-navy">City / Country</label>
                  <input className="honly-input" placeholder='e.g. "Berlin, Germany"' value={city} onChange={e => setCity(e.target.value)} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">Show location on profile?</p>
                  <Single options={SHOW_LOCATION} value={showLocation} onChange={setShowLocation} color={teal} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-navy">Short bio</label>
                  <textarea maxLength={200} className="honly-input min-h-[100px] resize-none" placeholder="What's your vibe?" value={bio} onChange={e => setBio(e.target.value)} />
                  <p className="text-xs text-slate-muted mt-1">{bio.length}/200</p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-8">
                <div>
                  <span className="text-4xl mb-3 block">🎯</span>
                  <h2 className="text-3xl mb-1 font-heading text-navy">Interests & languages</h2>
                  <p className="text-slate-muted">This is how we find people you'll actually click with.</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">My interests (pick a few)</p>
                  <ChipGroup options={INTERESTS} selected={interests} onToggle={v => toggle(interests, setInterests, v)} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">Languages I talk in</p>
                  <ChipGroup options={LANGUAGES} selected={languages} onToggle={v => toggle(languages, setLanguages, v)} color={teal} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">Why I'm here (up to 3)</p>
                  <ChipGroup options={INTENT} selected={intent} onToggle={v => toggle(intent, setIntent, v)} max={3} />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-8">
                <div>
                  <span className="text-4xl mb-3 block">📍</span>
                  <h2 className="text-3xl mb-1 font-heading text-navy">Location & visibility</h2>
                  <p className="text-slate-muted">Two separate choices — everything stays off until you opt in.</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">Let the app use your location?</p>
                  <Single options={LOCATION_ACCESS} value={locationAccess} onChange={setLocationAccess} />
                </div>
                {locationAccess !== "Off" && (
                  <>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-navy">Let others find me nearby</p>
                        <p className="text-xs text-slate-muted">You can browse nearby while staying hidden.</p>
                      </div>
                      <button type="button" onClick={() => setDiscoverable(!discoverable)}
                        className="w-12 h-6 rounded-full relative transition-colors shrink-0 border-2 border-navy"
                        style={{ backgroundColor: discoverable ? coral : "hsl(var(--cream-dark))" }}>
                        <div className="w-4 h-4 rounded-full absolute top-0.5 transition-all bg-card border border-navy"
                          style={{ left: discoverable ? "calc(100% - 18px)" : "2px" }} />
                      </button>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2 text-navy">Show distance on my card</p>
                      <Single options={DISTANCE_DISPLAY} value={distanceDisplay} onChange={setDistanceDisplay} color={teal} />
                    </div>
                  </>
                )}
                <div className="rounded-xl bg-cream border-l-4 border-teal px-4 py-3">
                  <p className="text-sm text-navy/80">🔒 We never show your exact location — only a fuzzy distance, and only if you choose to.</p>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col gap-6">
                <div>
                  <span className="text-4xl mb-3 block">🎚️</span>
                  <h2 className="text-3xl mb-1 font-heading text-navy">What matters to you</h2>
                  <p className="text-slate-muted">Pick a vibe for who we show you. You can fine-tune later in Discover.</p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {PRESETS.map(p => {
                    const active = matchPreset === p.key;
                    return (
                      <button key={p.key} type="button" onClick={() => setMatchPreset(p.key)}
                        className="text-left rounded-2xl border-2 p-4 transition-all"
                        style={{
                          borderColor: active ? coral : "hsl(var(--navy))",
                          backgroundColor: active ? "hsl(var(--coral) / 0.08)" : "hsl(var(--card))",
                          boxShadow: active ? "3px 3px 0 hsl(var(--navy))" : "none",
                        }}>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{p.emoji}</span>
                          <div>
                            <p className="font-bold font-heading text-navy">{p.label}</p>
                            <p className="text-sm text-slate-muted">{p.desc}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="flex flex-col gap-8">
                <div>
                  <span className="text-4xl mb-3 block">✨</span>
                  <h2 className="text-3xl mb-1 font-heading text-navy">Spirituality <span className="text-slate-muted text-lg font-body">· optional</span></h2>
                  <p className="text-slate-muted">Not about religion — about how you relate to the deeper parts of life. Skip anything that's not you.</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">My spiritual path or tradition</p>
                  <Single options={SPIRITUAL_PATHS} value={spiritualPath} onChange={setSpiritualPath} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">How important is spirituality?</p>
                  <Single options={SPIRIT_IMPORTANCE} value={spiritImportance} onChange={setSpiritImportance} color={teal} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">Practices I do</p>
                  <ChipGroup options={PRACTICES} selected={practices} onToggle={v => toggle(practices, setPractices, v)} color={teal} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">What I believe in</p>
                  <ChipGroup options={BELIEFS} selected={beliefs} onToggle={v => toggle(beliefs, setBeliefs, v)} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">Topics I love discussing (up to 5)</p>
                  <ChipGroup options={SPIRIT_TOPICS} selected={spiritTopics} onToggle={v => toggle(spiritTopics, setSpiritTopics, v)} max={5} color={teal} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-navy">What does spirituality mean to you?</label>
                  <textarea maxLength={240} className="honly-input min-h-[90px] resize-none" placeholder="One honest sentence…" value={spiritMeaning} onChange={e => setSpiritMeaning(e.target.value)} />
                  <p className="text-xs text-slate-muted mt-1">{spiritMeaning.length}/240</p>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="flex flex-col gap-8">
                <div>
                  <span className="text-4xl mb-3 block">💬</span>
                  <h2 className="text-3xl mb-1 font-heading text-navy">Conversation</h2>
                  <p className="text-slate-muted">How you connect — before anyone even says hello.</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">Connection I'm looking for (up to 3)</p>
                  <ChipGroup options={CONNECTION_TYPES} selected={connectionType} onToggle={v => toggle(connectionType, setConnectionType, v)} max={3} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">My conversation style (up to 3)</p>
                  <ChipGroup options={CONVO_STYLES} selected={convoStyle} onToggle={v => toggle(convoStyle, setConvoStyle, v)} max={3} color={teal} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">How often do you like texting?</p>
                  <Single options={TEXT_FREQUENCY} value={textFreq} onChange={setTextFreq} color={teal} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">My reply style</p>
                  <Single options={REPLY_STYLE} value={replyStyle} onChange={setReplyStyle} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">Best conversation starters for me</p>
                  <ChipGroup options={CONVO_STARTERS} selected={convoStarters} onToggle={v => toggle(convoStarters, setConvoStarters, v)} color={teal} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1 text-navy">Conversation prompts <span className="text-slate-muted font-normal">· optional</span></p>
                  <p className="text-xs text-slate-muted mb-3">Give people an easy way to break the ice. Fill in any that feel like you.</p>
                  <div className="flex flex-col gap-3">
                    {PROMPT_LIBRARY.map(q => (
                      <div key={q}>
                        <label className="block text-xs font-semibold text-teal mb-1">{q}</label>
                        <input className="honly-input" placeholder="Your answer…" maxLength={120}
                          value={promptAnswers[q] || ""}
                          onChange={e => setPromptAnswers(prev => ({ ...prev, [q]: e.target.value }))} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="flex flex-col gap-8">
                <div>
                  <span className="text-4xl mb-3 block">🌿</span>
                  <h2 className="text-3xl mb-1 font-heading text-navy">Inner World</h2>
                  <p className="text-slate-muted">The things that make you, you. Where real compatibility lives.</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">Values that matter most (up to 5)</p>
                  <ChipGroup options={VALUES} selected={values} onToggle={v => toggle(values, setValues, v)} max={5} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">What gives me peace</p>
                  <ChipGroup options={PEACE} selected={peace} onToggle={v => toggle(peace, setPeace, v)} color={teal} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">What people appreciate in me (up to 3)</p>
                  <ChipGroup options={APPRECIATED} selected={appreciated} onToggle={v => toggle(appreciated, setAppreciated, v)} max={3} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">What I'm working on (up to 3)</p>
                  <ChipGroup options={WORKING_ON} selected={workingOn} onToggle={v => toggle(workingOn, setWorkingOn, v)} max={3} color={teal} />
                </div>
              </div>
            )}

            {step === 8 && (
              <div className="flex flex-col gap-8">
                <div>
                  <span className="text-4xl mb-3 block">🌙</span>
                  <h2 className="text-3xl mb-1 font-heading text-navy">Lifestyle</h2>
                  <p className="text-slate-muted">Small details that matter for real connection.</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">I am a…</p>
                  <Single options={DAY_TYPE} value={dayType} onChange={setDayType} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">Socially, I'm…</p>
                  <Single options={SOCIAL} value={social} onChange={setSocial} color={teal} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">My love language</p>
                  <Single options={LOVE_LANG} value={loveLang} onChange={setLoveLang} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">Relationship status</p>
                  <Single options={RELATIONSHIP} value={relationship} onChange={setRelationship} color={teal} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">Alcohol, smoking, substances</p>
                  <Single options={SUBSTANCES} value={substances} onChange={setSubstances} />
                </div>
              </div>
            )}

            {step === 9 && (
              <div className="flex flex-col gap-8">
                <div>
                  <span className="text-4xl mb-3 block">🛡️</span>
                  <h2 className="text-3xl mb-1 font-heading text-navy">Boundaries</h2>
                  <p className="text-slate-muted">Knowing your limits upfront makes things safer and more honest.</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">Topics I'm open to discussing</p>
                  <ChipGroup options={OPEN_TOPICS} selected={openTopics} onToggle={v => toggle(openTopics, setOpenTopics, v)} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">Topics I'd rather not discuss</p>
                  <ChipGroup options={AVOID_TOPICS} selected={avoidTopics} onToggle={v => toggle(avoidTopics, setAvoidTopics, v)} color={teal} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">Am I okay with flirting?</p>
                  <Single options={FLIRTING} value={flirting} onChange={setFlirting} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">Am I okay with deep conversations?</p>
                  <Single options={DEEP_CONVOS} value={deepConvos} onChange={setDeepConvos} color={teal} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1 text-navy">Political leaning <span className="text-slate-muted font-normal">· optional</span></p>
                  <p className="text-xs text-slate-muted mb-2">Only used if you want it for matching. Always private if you pick "Prefer not to say."</p>
                  <Single options={POLITICS} value={politics} onChange={setPolitics} color={teal} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">Profile visibility</p>
                  <Single options={VISIBILITY} value={visibility} onChange={setVisibility} />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-10">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="honly-btn-outline flex items-center gap-2 text-sm px-6 py-2.5">
              <ArrowLeft size={14} /> Back
            </button>
          ) : <div />}
          <button onClick={next} className="honly-btn-primary flex items-center gap-2 text-sm px-6 py-2.5">
            {step === TOTAL_STEPS ? "Start exploring" : "Continue"} <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
