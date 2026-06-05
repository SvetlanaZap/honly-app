import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, Bookmark, X, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

type Person = {
  id: number; name: string; age: number; city: string; color: string;
  interests: string[]; bio: string; online: boolean;
  languages: string[]; topics: string[]; flirt: boolean; distanceKm: number; intent: string[];
};

const PEOPLE: Person[] = [
  { id: 1, name: "Maya", age: 27, city: "Berlin", color: "hsl(10,77%,60%)", interests: ["Music", "Art", "Food & cooking"], bio: "Chasing sunsets and good conversations.", online: true, languages: ["English", "German"], topics: ["Philosophy"], flirt: true, distanceKm: 3, intent: ["Friendship", "Deep talks"] },
  { id: 2, name: "Luca", age: 31, city: "Rome", color: "hsl(170,52%,49%)", interests: ["Travel", "Books", "Food & cooking"], bio: "Ask me about my pasta recipe.", online: true, languages: ["Italian", "English"], topics: ["History"], flirt: false, distanceKm: 18, intent: ["Light daily chat", "Friendship"] },
  { id: 3, name: "Zoe", age: 24, city: "London", color: "#7B68EE", interests: ["Philosophy", "Writing", "Psychology"], bio: "Introvert with extrovert energy.", online: false, languages: ["English"], topics: ["Philosophy", "Psychology"], flirt: false, distanceKm: 41, intent: ["Deep talks"] },
  { id: 4, name: "Kai", age: 29, city: "Tokyo", color: "#F4A261", interests: ["Gaming", "Technology", "AI"], bio: "Pixel pusher by day, dreamer by night.", online: true, languages: ["Japanese", "English"], topics: ["Technology", "AI"], flirt: true, distanceKm: 9, intent: ["Playful banter", "Friendship"] },
  { id: 5, name: "Aria", age: 26, city: "Paris", color: "#2EC4B6", interests: ["Dance", "Films", "TV shows"], bio: "Life is too short for boring conversations.", online: false, languages: ["French", "English"], topics: ["Art"], flirt: true, distanceKm: 27, intent: ["Deep talks", "Friendship"] },
  { id: 6, name: "Finn", age: 33, city: "Amsterdam", color: "#E76F51", interests: ["Nature & hiking", "Science", "Music"], bio: "Looking for someone to explore the world with.", online: true, languages: ["Dutch", "English"], topics: ["Science"], flirt: false, distanceKm: 6, intent: ["Friendship", "Deep talks"] },
  { id: 7, name: "Nora", age: 22, city: "Stockholm", color: "#457B9D", interests: ["Books", "Reels & memes", "Music"], bio: "Bookworm with a caffeine addiction.", online: true, languages: ["English", "Spanish"], topics: ["Philosophy"], flirt: true, distanceKm: 12, intent: ["Light daily chat", "Emotional support"] },
  { id: 8, name: "Sam", age: 28, city: "NYC", color: "#6D6875", interests: ["Fitness", "AI", "Gaming"], bio: "Building things and breaking habits.", online: false, languages: ["English"], topics: ["Technology", "AI"], flirt: false, distanceKm: 34, intent: ["Friendship"] },
];

const PRESET_LABELS: Record<string, string> = {
  nearby: "🏙️ Nearby & social", deep: "💬 Deep conversations",
  topic: "🧠 Topic deep-dive", flirt: "😏 Open to flirt", custom: "🎚️ Custom",
};

const PRESETS = [
  { key: "nearby", emoji: "🏙️", label: "Nearby & social", desc: "Shared interests + you're near each other" },
  { key: "deep", emoji: "💬", label: "Deep conversations", desc: "Shared interests + both want deep talks" },
  { key: "topic", emoji: "🧠", label: "Topic deep-dive", desc: "People who love the same topic" },
  { key: "flirt", emoji: "😏", label: "Open to flirt", desc: "Shared interests + both open to flirt" },
  { key: "custom", emoji: "🎚️", label: "Custom", desc: "Everything counts, nothing is required" },
];

type Reason = { icon: string; text: string; weight: number };

function inter(a: string[] = [], b: string[] = []) {
  const setB = new Set(b);
  return a.filter(x => setB.has(x));
}

export default function Discover() {
  const [profile, setProfile] = useState<Record<string, unknown> | null>(() => {
    try { return JSON.parse(localStorage.getItem("honly_profile") || "null"); } catch { return null; }
  });
  const [showRefine, setShowRefine] = useState(false);
  const navigate = useNavigate();
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());
  const [whyOpen, setWhyOpen] = useState<number | null>(null);

  const toggleSave = (p: Person) => {
    setSaved(prev => {
      const n = new Set(prev);
      if (n.has(p.id)) { n.delete(p.id); toast(`Removed ${p.name} from saved`); }
      else { n.add(p.id); toast.success(`Saved ${p.name} for later`); }
      return n;
    });
  };
  const dismiss = (p: Person) => {
    setDismissed(prev => new Set(prev).add(p.id));
    toast(`Okay — we won't show ${p.name}`);
  };

  const applyPreset = (key: string) => {
    const updated = { ...(profile || {}), matchPreset: key };
    try { localStorage.setItem("honly_profile", JSON.stringify(updated)); } catch { /* quota */ }
    setProfile(updated);
    setShowRefine(false);
  };

  const userInterests: string[] = profile?.interests || [];
  const userLanguages: string[] = profile?.languages || [];
  const userIntent: string[] = profile?.intent || [];
  const userLocOn = !!profile?.locationAccess && profile.locationAccess !== "Off";
  const userFlirtOpen = !!profile?.flirting && !/platonic/i.test(profile.flirting);
  const preset: string = profile?.matchPreset || "custom";

  const evaluate = (p: Person) => {
    const reasons: Reason[] = [];
    const sharedInterests = inter(userInterests, p.interests);
    if (sharedInterests.length) reasons.push({ icon: "🎯", text: `${sharedInterests.length} shared`, weight: 3 * sharedInterests.length });
    const commonLang = inter(userLanguages, p.languages);
    if (commonLang.length) reasons.push({ icon: "🗣️", text: commonLang[0], weight: 2 });
    const topicOverlap = inter(userInterests, p.topics);
    if (topicOverlap.length) reasons.push({ icon: "✨", text: topicOverlap[0], weight: 3 });
    if (userLocOn) reasons.push({ icon: "📍", text: `~${p.distanceKm} km`, weight: Math.max(1, 4 - p.distanceKm / 12) });
    const bothFlirt = userFlirtOpen && p.flirt;
    if (bothFlirt) reasons.push({ icon: "😏", text: "both open", weight: 1 });
    const intentOverlap = inter(userIntent, p.intent);
    if (intentOverlap.length) reasons.push({ icon: "🤝", text: intentOverlap[0], weight: 2 });

    // Preset must-haves
    let passes = true;
    const nearbyOk = userLocOn && p.distanceKm <= 50;
    if (preset === "nearby" && !(nearbyOk && sharedInterests.length)) passes = false;
    if (preset === "deep" && !(sharedInterests.length && p.intent.includes("Deep talks"))) passes = false;
    if (preset === "topic" && !topicOverlap.length) passes = false;
    if (preset === "flirt" && !(sharedInterests.length && bothFlirt)) passes = false;

    const score = reasons.reduce((s, r) => s + r.weight, 0);
    const matchPct = Math.min(99, Math.round(38 + score * 6));
    const all = [...reasons].sort((a, b) => b.weight - a.weight);
    return { passes, score, matchPct, reasons: all.slice(0, 3), all };
  };

  const ranked = useMemo(() => {
    if (!profile) return PEOPLE.map(p => ({ person: p, m: null as ReturnType<typeof evaluate> | null }));
    return PEOPLE
      .map(p => ({ person: p, m: evaluate(p) }))
      .filter(x => x.m!.passes)
      .sort((a, b) => b.m!.score - a.m!.score);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const onlineCount = PEOPLE.filter(p => p.online).length;
  const visible = ranked.filter(x => !dismissed.has(x.person.id));

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar variant="app" />

      <div className="container py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-heading text-navy">Discover people</h1>
            <p className="text-slate-muted">{onlineCount} people online right now</p>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-muted" />
            <input className="honly-input pl-10 w-64" placeholder="Search by name or interest..." type="text" />
          </div>
        </div>

        {/* Active matching mode */}
        {profile ? (
          <div className="mb-8">
            <div className="flex items-center gap-2 flex-wrap text-sm">
              <span className="text-slate-muted">Matching:</span>
              <span className="honly-tag font-semibold">{PRESET_LABELS[preset] || preset}</span>
              <button onClick={() => setShowRefine(v => !v)} className="text-coral font-semibold hover:underline">Refine</button>
            </div>
            {showRefine && (
              <div className="mt-3 rounded-2xl border-2 border-navy bg-card p-3 max-w-md">
                <p className="text-xs text-slate-muted px-1 pb-2">Pick a vibe — applies instantly, no need to redo onboarding.</p>
                <div className="flex flex-col gap-2">
                  {PRESETS.map(p => {
                    const active = preset === p.key;
                    return (
                      <button key={p.key} onClick={() => applyPreset(p.key)}
                        className="text-left rounded-xl border-2 p-3 transition-all"
                        style={{ borderColor: active ? "hsl(var(--coral))" : "hsl(var(--navy))", backgroundColor: active ? "hsl(var(--coral) / 0.08)" : "hsl(var(--card))" }}>
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{p.emoji}</span>
                          <div>
                            <p className="font-bold font-heading text-navy text-sm">{p.label}</p>
                            <p className="text-xs text-slate-muted">{p.desc}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-slate-muted px-1 pt-2">Need bigger changes? <Link to="/onboarding" className="text-coral font-semibold">Edit full profile</Link></p>
              </div>
            )}
          </div>
        ) : (
          <div className="mb-8 rounded-2xl bg-cream border-2 border-navy p-4 flex items-center justify-between gap-4 flex-wrap">
            <p className="text-sm text-navy/80">Complete onboarding to get matched on interests, languages & more.</p>
            <Link to="/onboarding"><button className="honly-btn-primary text-sm px-5 py-2">Start onboarding</button></Link>
          </div>
        )}

        {ranked.length === 0 ? (
          <div className="rounded-2xl p-8 bg-cream border-2 border-navy text-center max-w-lg mx-auto">
            <span className="text-3xl block mb-2">😕</span>
            <h2 className="text-lg font-bold font-heading text-navy mb-1">No one matches all your must-haves</h2>
            <p className="text-navy/70 mb-4">Try a different vibe or loosen a requirement.</p>
            <Link to="/onboarding"><button className="honly-btn-outline">Adjust preferences</button></Link>
          </div>
        ) : visible.length === 0 ? (
          <div className="rounded-2xl p-8 bg-cream border-2 border-navy text-center max-w-lg mx-auto">
            <span className="text-3xl block mb-2">👀</span>
            <h2 className="text-lg font-bold font-heading text-navy mb-1">You've seen everyone for now</h2>
            <p className="text-navy/70 mb-4">Check back later, or take another look at people you passed.</p>
            <button className="honly-btn-outline" onClick={() => setDismissed(new Set())}>Show them again</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {visible.map(({ person, m }, i) => {
              const isSaved = saved.has(person.id);
              const open = whyOpen === person.id;
              return (
                <motion.div key={person.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <div className="honly-card overflow-hidden flex flex-col">
                    {/* Tappable header → full profile */}
                    <div className="cursor-pointer" onClick={() => navigate(`/profile/${person.id}`)}>
                      <div className="h-40 flex items-center justify-center relative" style={{ backgroundColor: person.color + "22" }}>
                        <svg viewBox="0 0 100 100" className="w-24 h-24" fill="none">
                          <circle cx="50" cy="30" r="20" fill={person.color} />
                          <path d="M15 100 Q15 60 50 60 Q85 60 85 100Z" fill={person.color} />
                        </svg>
                        {person.online && <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-green-500 border-2 border-card" />}
                        {m && (
                          <span className="absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-full bg-card border-2 border-navy text-navy font-heading">
                            {m.matchPct}% match
                          </span>
                        )}
                      </div>
                      <div className="px-4 pt-4">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-lg font-heading text-navy">{person.name}, {person.age}</h3>
                          <span className="text-xs font-medium" style={{ color: person.online ? "#22C55E" : "hsl(var(--slate-muted))" }}>
                            {person.online ? "Online" : "Offline"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mb-3">
                          <MapPin size={12} className="text-slate-muted" />
                          <span className="text-sm text-slate-muted">{person.city}</span>
                        </div>
                        {m && m.reasons.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-1">
                            {m.reasons.map((r, idx) => (
                              <span key={idx} className="text-xs px-2 py-0.5 rounded-full font-medium bg-teal/10 text-navy border border-teal/40">
                                {r.icon} {r.text}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="px-4 pb-4 pt-2 flex flex-col flex-1">
                      {/* See why you match */}
                      {m && m.all.length > 0 && (
                        <>
                          <button onClick={() => setWhyOpen(open ? null : person.id)} className="text-xs font-semibold text-teal hover:underline self-start mb-2">
                            {open ? "Hide" : "See why you match"}
                          </button>
                          {open && (
                            <div className="mb-3 rounded-xl bg-teal/10 border border-teal/30 p-3">
                              <p className="text-xs font-bold text-navy mb-1.5">{m.matchPct}% match</p>
                              <ul className="flex flex-col gap-1">
                                {m.all.map((r, idx) => (
                                  <li key={idx} className="text-xs text-navy/80">{r.icon} {r.text}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </>
                      )}

                      <p className="text-sm mb-3 line-clamp-2 text-navy/75">{person.bio}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {person.interests.map(int => (
                          <span key={int} className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: person.color + "22", color: person.color, border: `1px solid ${person.color}44` }}>{int}</span>
                        ))}
                      </div>

                      <div className="mt-auto flex flex-col gap-2">
                        {/* Primary CTA */}
                        <button onClick={() => navigate(`/profile/${person.id}`)}
                          className="w-full py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all font-heading border-2 border-navy bg-coral text-primary-foreground hover:-translate-y-0.5 hover:shadow-[3px_3px_0_hsl(var(--navy))]">
                          View profile <ArrowRight size={14} />
                        </button>
                        {/* Secondary actions */}
                        <div className="flex gap-2">
                          <button onClick={() => toggleSave(person)}
                            className="flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors font-heading border-2 border-navy"
                            style={{ backgroundColor: isSaved ? "hsl(var(--teal) / 0.15)" : "hsl(var(--card))", color: "hsl(var(--navy))" }}>
                            <Bookmark size={13} fill={isSaved ? "hsl(var(--teal))" : "none"} /> {isSaved ? "Saved" : "Save for later"}
                          </button>
                          <button onClick={() => dismiss(person)} title="Not for me"
                            className="py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors font-heading border-2 border-navy bg-card text-slate-muted hover:text-coral">
                            <X size={13} /> Not for me
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
