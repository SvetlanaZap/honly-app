import { Edit3, MapPin, Sparkles, MessageCircle, Heart, Leaf, Moon, Shield, Clock, User, Globe2, Quote, Camera, X, ImagePlus } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";

const MAX_PHOTOS = 6;

type Profile = {
  name: string; age: string; gender: string; orientation?: string; city: string; showLocation: string; timezone: string; bio: string;
  spiritualPath: string; spiritImportance: string; practices: string[]; beliefs: string[]; spiritTopics: string[]; spiritMeaning: string;
  connectionType: string[]; convoStyle: string[]; textFreq: string; replyStyle: string; convoStarters: string[];
  values: string[]; peace: string[]; appreciated: string[]; workingOn: string[];
  dayType: string; social: string; loveLang: string; relationship: string; substances: string;
  openTopics: string[]; avoidTopics: string[]; flirting: string; deepConvos: string; visibility: string;
  interests?: string[]; languages?: string[]; intent?: string[]; politics?: string;
  prompts?: { q: string; a: string }[];
};

function Chip({ label, tone = "coral" }: { label: string; tone?: "coral" | "teal" | "navy" | "cream" }) {
  const map = {
    coral: "bg-coral/12 text-coral border-coral/40",
    teal: "bg-teal/12 text-teal border-teal/40",
    navy: "bg-navy/8 text-navy border-navy/30",
    cream: "bg-cream-dark text-navy border-navy/20",
  } as const;
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border-[1.5px] ${map[tone]}`}>
      {label}
    </span>
  );
}

function Field({ label, value, tone = "coral" }: { label: string; value?: string; tone?: "coral" | "teal" | "navy" | "cream" }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] uppercase tracking-[0.12em] text-slate-muted font-heading font-semibold">{label}</span>
      <div><Chip label={value} tone={tone} /></div>
    </div>
  );
}

function Group({ label, values, tone = "coral" }: { label: string; values?: string[]; tone?: "coral" | "teal" | "navy" | "cream" }) {
  if (!values || values.length === 0) return null;
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.12em] mb-2 text-slate-muted font-heading font-semibold">{label}</p>
      <div className="flex flex-wrap gap-2">
        {values.map(v => <Chip key={v} label={v} tone={tone} />)}
      </div>
    </div>
  );
}

function Section({
  icon, title, subtitle, accent, children, delay = 0,
}: {
  icon: React.ReactNode; title: string; subtitle?: string;
  accent: "coral" | "teal"; children: React.ReactNode; delay?: number;
}) {
  const accentBg = accent === "coral" ? "bg-coral" : "bg-teal";
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="relative rounded-2xl bg-card border-2 border-navy overflow-hidden transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_hsl(var(--navy))]"
    >
      <div className={`absolute top-0 left-0 right-0 h-1 ${accentBg}`} />
      <div className="p-6">
        <div className="flex items-start gap-3 mb-5">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${accentBg} border-2 border-navy`}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold font-heading text-navy leading-tight">{title}</h3>
            {subtitle && <p className="text-xs text-slate-muted mt-0.5">{subtitle}</p>}
          </div>
        </div>
        <div className="flex flex-col gap-5">{children}</div>
      </div>
    </motion.section>
  );
}

function Stat({ label, value, tone }: { label: string; value: number | string; tone: "coral" | "teal" | "navy" }) {
  const c = tone === "coral" ? "text-coral" : tone === "teal" ? "text-teal" : "text-navy";
  return (
    <div className="flex-1 min-w-0 rounded-xl border-2 border-navy bg-card px-4 py-3">
      <div className={`text-2xl font-bold font-heading leading-none ${c}`}>{value}</div>
      <div className="text-[11px] uppercase tracking-wider text-slate-muted mt-1 font-heading font-semibold truncate">{label}</div>
    </div>
  );
}

export default function MyProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const raw = localStorage.getItem("honly_profile");
    if (raw) {
      try { setProfile(JSON.parse(raw)); } catch { /* ignore */ }
    }
    const rawPhotos = localStorage.getItem("honly_photos");
    if (rawPhotos) {
      try { setPhotos(JSON.parse(rawPhotos)); } catch { /* ignore */ }
    }
  }, []);

  const persistPhotos = (next: string[]) => {
    setPhotos(next);
    try { localStorage.setItem("honly_photos", JSON.stringify(next)); } catch { /* quota */ }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const slots = MAX_PHOTOS - photos.length;
    const toRead = files.filter(f => f.type.startsWith("image/")).slice(0, slots);
    if (toRead.length === 0) { e.target.value = ""; return; }
    Promise.all(
      toRead.map(file => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      }))
    ).then(dataUrls => {
      persistPhotos([...photos, ...dataUrls].slice(0, MAX_PHOTOS));
    });
    e.target.value = "";
  };

  const removePhoto = (idx: number) => persistPhotos(photos.filter((_, i) => i !== idx));

  const name = profile?.name || "You";
  const age = profile?.age ? `, ${profile.age}` : "";
  const showLoc = profile?.showLocation !== "No, keep it hidden";
  const city = showLoc ? (profile?.city || "Add your city") : "Location hidden";
  const bio = profile?.bio || "Complete the onboarding to fill in your profile with all your interests, values, and conversation style.";
  const initial = (profile?.name?.[0] || "Y").toUpperCase();

  // Stats
  const valuesCount = profile?.values?.length || 0;
  const practicesCount = profile?.practices?.length || 0;
  const topicsCount = (profile?.openTopics?.length || 0) + (profile?.spiritTopics?.length || 0);

  // Completion %
  const completion = (() => {
    if (!profile) return 0;
    const fields = [
      profile.name, profile.age, profile.bio, profile.spiritualPath, profile.textFreq,
      profile.dayType, profile.flirting, profile.visibility,
    ];
    const arrs = [profile.values, profile.practices, profile.connectionType, profile.openTopics];
    const filled = fields.filter(Boolean).length + arrs.filter(a => a && a.length).length;
    return Math.round((filled / (fields.length + arrs.length)) * 100);
  })();

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar variant="app" />

      <div className="container max-w-3xl mx-auto py-8 px-4 flex flex-col gap-6">
        {/* HERO CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden border-2 border-navy bg-card"
        >
          {/* Decorative banner */}
          <div className="h-36 relative bg-gradient-to-br from-coral via-coral to-[hsl(var(--coral)/0.7)] overflow-hidden">
            {/* Brutalist pattern */}
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, white 1.5px, transparent 0)",
                backgroundSize: "18px 18px",
              }}
            />
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-teal/40 border-2 border-navy" />
            <div className="absolute top-10 right-28 w-14 h-14 rounded-2xl bg-cream border-2 border-navy rotate-12" />

            <div className="absolute top-4 right-4 z-10">
              <Link to="/onboarding">
                <button className="text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2 font-heading bg-card text-navy border-2 border-navy transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_hsl(var(--navy))]">
                  <Edit3 size={14} /> Edit
                </button>
              </Link>
            </div>
          </div>

          {/* Avatar */}
          <div className="px-6 -mt-12 relative">
            <div className="w-24 h-24 rounded-2xl overflow-hidden flex items-center justify-center font-bold text-primary-foreground font-heading text-4xl bg-coral border-[3px] border-navy shadow-[4px_4px_0_hsl(var(--navy))]">
              {photos[0]
                ? <img src={photos[0]} alt={name} className="w-full h-full object-cover" />
                : initial}
            </div>
          </div>

          {/* Identity */}
          <div className="pt-4 pb-6 px-6">
            <h1 className="text-3xl font-bold font-heading text-navy">{name}{age}</h1>

            <div className="flex items-center gap-3 mt-2 mb-4 flex-wrap text-sm">
              <span className="inline-flex items-center gap-1.5 text-slate-muted">
                {showLoc ? <MapPin size={14} /> : <Shield size={14} />}
                <span className={showLoc ? "" : "italic"}>{city}</span>
              </span>
              {profile?.gender && (
                <span className="inline-flex items-center gap-1.5 text-slate-muted">
                  <User size={14} /> {profile.gender}
                </span>
              )}
              {profile?.orientation && profile.orientation !== "Prefer not to say" && (
                <span className="inline-flex items-center gap-1.5 text-slate-muted">
                  <Heart size={14} /> {profile.orientation}
                </span>
              )}
              {profile?.timezone && (
                <span className="inline-flex items-center gap-1.5 text-slate-muted">
                  <Globe2 size={14} /> {profile.timezone}
                </span>
              )}
            </div>

            {profile?.bio ? (
              <div className="relative rounded-xl bg-cream border-l-4 border-coral px-4 py-3">
                <Quote size={14} className="text-coral mb-1" />
                <p className="text-navy/80 leading-relaxed italic">{bio}</p>
              </div>
            ) : (
              <p className="text-navy/70 leading-relaxed">{bio}</p>
            )}

            {/* Completion bar */}
            {profile && (
              <div className="mt-5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] uppercase tracking-wider text-slate-muted font-heading font-semibold">
                    Profile completion
                  </span>
                  <span className="text-sm font-bold font-heading text-navy">{completion}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-cream-dark border border-navy/20 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${completion}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-coral to-teal"
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* PHOTOS */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="relative rounded-2xl bg-card border-2 border-navy overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-teal" />
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-teal border-2 border-navy">
                  <Camera size={18} className="text-primary-foreground" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading text-navy leading-tight">Photos</h3>
                  <p className="text-xs text-slate-muted mt-0.5">Optional · up to {MAX_PHOTOS} · first one is your avatar</p>
                </div>
              </div>
              <span className="text-sm font-bold font-heading text-navy">{photos.length}/{MAX_PHOTOS}</span>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleUpload}
            />

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {photos.map((src, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border-2 border-navy group">
                  <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                  {i === 0 && (
                    <span className="absolute bottom-1 left-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-coral text-primary-foreground border border-navy">
                      Avatar
                    </span>
                  )}
                  <button
                    onClick={() => removePhoto(i)}
                    title="Remove photo"
                    className="absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center bg-card border-2 border-navy text-navy opacity-0 group-hover:opacity-100 transition-opacity hover:bg-coral hover:text-primary-foreground"
                  >
                    <X size={13} />
                  </button>
                </div>
              ))}

              {photos.length < MAX_PHOTOS && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square rounded-xl border-2 border-dashed border-navy/40 flex flex-col items-center justify-center gap-1 text-slate-muted hover:border-teal hover:text-teal transition-colors bg-cream"
                >
                  <ImagePlus size={22} />
                  <span className="text-[11px] font-semibold">Add</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* CONVERSATION PROMPTS */}
        {profile?.prompts && profile.prompts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="relative rounded-2xl bg-card border-2 border-navy overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-coral" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-coral border-2 border-navy">
                  <MessageCircle size={18} className="text-primary-foreground" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading text-navy leading-tight">Conversation starters</h3>
                  <p className="text-xs text-slate-muted mt-0.5">Easy ways to break the ice with me</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {profile.prompts.map((p, i) => (
                  <div key={i} className="rounded-xl bg-cream border-l-4 border-teal px-4 py-3">
                    <p className="text-xs font-semibold text-teal mb-0.5">{p.q}</p>
                    <p className="text-navy/85 leading-relaxed">{p.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* STATS */}
        {profile && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-3"
          >
            <Stat label="Core values" value={valuesCount} tone="coral" />
            <Stat label="Practices" value={practicesCount} tone="teal" />
            <Stat label="Open topics" value={topicsCount} tone="navy" />
          </motion.div>
        )}

        {/* Empty state */}
        {!profile && (
          <div className="rounded-2xl p-8 bg-cream border-2 border-navy text-center">
            <Sparkles className="mx-auto mb-3 text-coral" size={32} />
            <h2 className="text-lg font-bold font-heading text-navy mb-1">Your profile is empty</h2>
            <p className="text-navy/70 mb-4">Complete the onboarding to bring it to life.</p>
            <Link to="/onboarding">
              <button className="honly-btn-primary">Start onboarding</button>
            </Link>
          </div>
        )}

        {/* SECTIONS */}
        {profile && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Section
              icon={<Sparkles size={18} className="text-primary-foreground" strokeWidth={2.5} />}
              title="Spirituality"
              subtitle="Path, practice & meaning"
              accent="coral"
              delay={0.15}
            >
              <Field label="Spiritual path" value={profile.spiritualPath} tone="coral" />
              <Field label="Importance" value={profile.spiritImportance} tone="teal" />
              <Group label="Practices" values={profile.practices} tone="teal" />
              <Group label="Beliefs" values={profile.beliefs} tone="coral" />
              <Group label="Topics I love" values={profile.spiritTopics} tone="teal" />
              {profile.spiritMeaning && (
                <div>
                  <p className="text-[11px] uppercase tracking-[0.12em] mb-2 text-slate-muted font-heading font-semibold">What it means to me</p>
                  <p className="text-navy/80 leading-relaxed text-sm">{profile.spiritMeaning}</p>
                </div>
              )}
            </Section>

            <Section
              icon={<MessageCircle size={18} className="text-primary-foreground" strokeWidth={2.5} />}
              title="Conversation"
              subtitle="How I connect & chat"
              accent="teal"
              delay={0.2}
            >
              <Group label="Connection I want" values={profile.connectionType} tone="coral" />
              <Group label="My style" values={profile.convoStyle} tone="teal" />
              <Field label="Texting frequency" value={profile.textFreq} tone="teal" />
              <Field label="Reply style" value={profile.replyStyle} tone="coral" />
              <Group label="Conversation starters" values={profile.convoStarters} tone="teal" />
            </Section>

            <Section
              icon={<Leaf size={18} className="text-primary-foreground" strokeWidth={2.5} />}
              title="Inner world"
              subtitle="Values & growth"
              accent="coral"
              delay={0.25}
            >
              <Group label="Values" values={profile.values} tone="coral" />
              <Group label="What gives me peace" values={profile.peace} tone="teal" />
              <Group label="People appreciate" values={profile.appreciated} tone="coral" />
              <Group label="Working on" values={profile.workingOn} tone="teal" />
            </Section>

            <Section
              icon={<Moon size={18} className="text-primary-foreground" strokeWidth={2.5} />}
              title="Lifestyle"
              subtitle="Day-to-day & love"
              accent="teal"
              delay={0.3}
            >
              <Field label="Day type" value={profile.dayType} tone="coral" />
              <Field label="Socially" value={profile.social} tone="teal" />
              <Field label="Love language" value={profile.loveLang} tone="coral" />
              <Field label="Relationship" value={profile.relationship} tone="teal" />
              <Field label="Alcohol / substances" value={profile.substances} tone="coral" />
            </Section>

            <div className="md:col-span-2">
              <Section
                icon={<Shield size={18} className="text-primary-foreground" strokeWidth={2.5} />}
                title="Boundaries"
                subtitle="What I'm open to and what I'm not"
                accent="coral"
                delay={0.35}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Group label="Open to discussing" values={profile.openTopics} tone="coral" />
                  <Group label="Rather not discuss" values={profile.avoidTopics} tone="teal" />
                  <Field label="Flirting" value={profile.flirting} tone="coral" />
                  <Field label="Deep conversations" value={profile.deepConvos} tone="teal" />
                  <Field label="Visibility" value={profile.visibility} tone="coral" />
                </div>
              </Section>
            </div>
          </div>
        )}

        {profile && (
          <div className="flex items-center justify-center gap-2 text-slate-muted text-sm py-4">
            <Heart size={14} className="text-coral" fill="hsl(var(--coral))" />
            Your answers are saved on this device.
          </div>
        )}
      </div>
    </div>
  );
}
