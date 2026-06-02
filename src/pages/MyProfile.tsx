import { Edit3, MapPin, Sparkles, MessageCircle, Heart, Leaf, Moon, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

type Profile = {
  name: string; age: string; gender: string; city: string; showLocation: string; timezone: string; bio: string;
  spiritualPath: string; spiritImportance: string; practices: string[]; beliefs: string[]; spiritTopics: string[]; spiritMeaning: string;
  connectionType: string[]; convoStyle: string[]; textFreq: string; replyStyle: string; convoStarters: string[];
  values: string[]; peace: string[]; appreciated: string[]; workingOn: string[];
  dayType: string; social: string; loveLang: string; relationship: string; substances: string;
  openTopics: string[]; avoidTopics: string[]; flirting: string; deepConvos: string; visibility: string;
};

function Chip({ label, color = "hsl(var(--coral))" }: { label: string; color?: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
      style={{ backgroundColor: color + "18", color, border: `1.5px solid ${color}40` }}>
      {label}
    </span>
  );
}

function Field({ label, value, color = "hsl(var(--coral))" }: { label: string; value?: string; color?: string }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs uppercase tracking-wider text-slate-muted font-heading">{label}</span>
      <Chip label={value} color={color} />
    </div>
  );
}

function Group({ label, values, color = "hsl(var(--coral))" }: { label: string; values?: string[]; color?: string }) {
  if (!values || values.length === 0) return null;
  return (
    <div>
      <p className="text-xs uppercase tracking-wider mb-2 text-slate-muted font-heading">{label}</p>
      <div className="flex flex-wrap gap-2">
        {values.map(v => <Chip key={v} label={v} color={color} />)}
      </div>
    </div>
  );
}

function Section({ icon, title, accent, children }: { icon: React.ReactNode; title: string; accent: string; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl p-6 bg-card border-2 border-navy">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: accent }}>
          {icon}
        </div>
        <h3 className="text-lg font-bold font-heading text-navy">{title}</h3>
      </div>
      <div className="flex flex-col gap-5">{children}</div>
    </motion.div>
  );
}

export default function MyProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("honly_profile");
    if (raw) {
      try { setProfile(JSON.parse(raw)); } catch { /* ignore */ }
    }
  }, []);

  const coral = "hsl(var(--coral))";
  const teal = "hsl(var(--teal))";

  const name = profile?.name || "You";
  const age = profile?.age ? `, ${profile.age}` : "";
  const showLoc = profile?.showLocation !== "No, keep it hidden";
  const city = showLoc ? (profile?.city || "Add your city") : "Location hidden";
  const bio = profile?.bio || "Complete the onboarding to fill in your profile with all your interests, values, and conversation style.";
  const initial = (profile?.name?.[0] || "Y").toUpperCase();

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar variant="app" />
      <div className="container max-w-2xl mx-auto py-8 px-4 flex flex-col gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl overflow-hidden border-2 border-navy">
          <div className="h-28 relative bg-coral">
            <div className="absolute -bottom-11 left-6">
              <div className="w-[88px] h-[88px] rounded-full flex items-center justify-center font-bold text-primary-foreground font-heading text-3xl bg-coral border-[3px] border-card" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
                {initial}
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <Link to="/onboarding">
                <button className="text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2 font-heading" style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white", border: "1.5px solid rgba(255,255,255,0.5)" }}>
                  <Edit3 size={14} /> Edit profile
                </button>
              </Link>
            </div>
          </div>

          <div className="pt-14 pb-6 px-6 bg-card">
            <h1 className="text-2xl font-bold font-heading text-navy">{name}{age}</h1>
            <div className="flex items-center gap-1.5 mt-1 mb-4 flex-wrap">
              {showLoc ? (
                <>
                  <MapPin size={14} className="text-slate-muted" />
                  <span className="text-slate-muted">{city}</span>
                </>
              ) : (
                <span className="text-slate-muted italic">{city}</span>
              )}
              {profile?.gender && <><span className="mx-1 text-cream-dark">·</span><span className="text-slate-muted">{profile.gender}</span></>}
              {profile?.timezone && <><span className="mx-1 text-cream-dark">·</span><span className="text-slate-muted">{profile.timezone}</span></>}
            </div>
            <p className="text-navy/75 leading-relaxed">{bio}</p>
          </div>
        </motion.div>

        {!profile && (
          <div className="rounded-2xl p-6 bg-cream border-2 border-navy text-center">
            <p className="text-navy mb-3">You haven't completed onboarding yet.</p>
            <Link to="/onboarding">
              <button className="honly-btn-primary">Start onboarding</button>
            </Link>
          </div>
        )}

        {profile && (
          <>
            <Section icon={<Sparkles size={16} color="white" />} title="Spirituality" accent={coral}>
              <Field label="Spiritual path" value={profile.spiritualPath} color={coral} />
              <Field label="Importance" value={profile.spiritImportance} color={teal} />
              <Group label="Practices" values={profile.practices} color={teal} />
              <Group label="Beliefs" values={profile.beliefs} color={coral} />
              <Group label="Topics I love" values={profile.spiritTopics} color={teal} />
              {profile.spiritMeaning && (
                <div>
                  <p className="text-xs uppercase tracking-wider mb-2 text-slate-muted font-heading">What spirituality means to me</p>
                  <p className="text-navy/80 leading-relaxed">{profile.spiritMeaning}</p>
                </div>
              )}
            </Section>

            <Section icon={<MessageCircle size={16} color="white" />} title="Conversation" accent={teal}>
              <Group label="Connection I want" values={profile.connectionType} color={coral} />
              <Group label="My style" values={profile.convoStyle} color={teal} />
              <Field label="Texting frequency" value={profile.textFreq} color={teal} />
              <Field label="Reply style" value={profile.replyStyle} color={coral} />
              <Group label="Conversation starters" values={profile.convoStarters} color={teal} />
            </Section>

            <Section icon={<Leaf size={16} color="white" />} title="Inner world" accent={coral}>
              <Group label="Values" values={profile.values} color={coral} />
              <Group label="What gives me peace" values={profile.peace} color={teal} />
              <Group label="People appreciate" values={profile.appreciated} color={coral} />
              <Group label="Working on" values={profile.workingOn} color={teal} />
            </Section>

            <Section icon={<Moon size={16} color="white" />} title="Lifestyle" accent={teal}>
              <Field label="Day type" value={profile.dayType} color={coral} />
              <Field label="Socially" value={profile.social} color={teal} />
              <Field label="Love language" value={profile.loveLang} color={coral} />
              <Field label="Relationship" value={profile.relationship} color={teal} />
              <Field label="Alcohol / substances" value={profile.substances} color={coral} />
            </Section>

            <Section icon={<Shield size={16} color="white" />} title="Boundaries" accent={coral}>
              <Group label="Open to discussing" values={profile.openTopics} color={coral} />
              <Group label="Rather not discuss" values={profile.avoidTopics} color={teal} />
              <Field label="Flirting" value={profile.flirting} color={coral} />
              <Field label="Deep conversations" value={profile.deepConvos} color={teal} />
              <Field label="Visibility" value={profile.visibility} color={coral} />
            </Section>

            <div className="flex items-center justify-center gap-2 text-slate-muted text-sm">
              <Heart size={14} /> Your answers are saved on this device.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
