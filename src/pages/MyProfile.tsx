import { Edit3, MessageCircle, Sparkles, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const PROFILE = {
  name: "You",
  age: 25,
  city: "New York",
  bio: "Complete the onboarding to fill in your profile with all your interests, values, and conversation style.",
  interests: ["Music", "Travel", "Coffee", "Photography"],
  convoStyle: ["Curious & questioning", "Warm & nurturing"],
  values: ["Honesty", "Growth", "Curiosity"],
};

function Chip({ label, color = "hsl(var(--coral))" }: { label: string; color?: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
      style={{ backgroundColor: color + "18", color, border: `1.5px solid ${color}40` }}>
      {label}
    </span>
  );
}

export default function MyProfile() {
  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar variant="app" />
      <div className="container max-w-2xl mx-auto py-8 px-4 flex flex-col gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl overflow-hidden border-2 border-navy">
          <div className="h-28 relative bg-coral">
            <div className="absolute -bottom-11 left-6">
              <div className="w-[88px] h-[88px] rounded-full flex items-center justify-center font-bold text-primary-foreground font-heading text-3xl bg-coral border-[3px] border-card" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
                Y
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
            <h1 className="text-2xl font-bold font-heading text-navy">{PROFILE.name}, {PROFILE.age}</h1>
            <div className="flex items-center gap-1.5 mt-1 mb-4">
              <MapPin size={14} className="text-slate-muted" />
              <span className="text-slate-muted">{PROFILE.city}</span>
            </div>
            <p className="text-navy/75 leading-relaxed mb-4">{PROFILE.bio}</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl p-6 bg-card border-2 border-navy">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-coral"><Sparkles size={16} color="white" /></div>
            <h3 className="text-lg font-bold font-heading text-navy">Interests</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {PROFILE.interests.map(i => <Chip key={i} label={i} />)}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl p-6 bg-card border-2 border-navy">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-teal"><MessageCircle size={16} color="white" /></div>
            <h3 className="text-lg font-bold font-heading text-navy">Conversation style</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {PROFILE.convoStyle.map(s => <Chip key={s} label={s} color="hsl(var(--teal))" />)}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
