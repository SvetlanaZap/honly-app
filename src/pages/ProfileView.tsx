import { Link, useParams } from "react-router-dom";
import { MapPin, MessageCircle, ArrowLeft, Flag, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

const PEOPLE: Record<string, { name: string; age: number; city: string; color: string; interests: string[]; bio: string; online: boolean; joined: string }> = {
  "1": { name: "Maya", age: 27, city: "Berlin, Germany", color: "hsl(10,77%,60%)", interests: ["Music", "Art", "Coffee", "Travel", "Photography"], bio: "Chasing sunsets and good conversations. I believe the best connections happen when you're not trying too hard. Ask me about my vinyl collection or the last book that made me cry.", online: true, joined: "March 2026" },
  "2": { name: "Luca", age: 31, city: "Rome, Italy", color: "hsl(170,52%,49%)", interests: ["Travel", "Books", "Cooking", "Philosophy", "Hiking"], bio: "Ask me about my pasta recipe. I'm a firm believer that food is the best conversation starter. Currently reading Dostoevsky and learning to make sourdough.", online: true, joined: "January 2026" },
  "3": { name: "Zoe", age: 24, city: "London, UK", color: "#7B68EE", interests: ["Yoga", "Philosophy", "Writing", "Tea", "Mindfulness"], bio: "Introvert with extrovert energy. I write poetry at midnight and practice yoga at dawn.", online: false, joined: "February 2026" },
  "4": { name: "Kai", age: 29, city: "Tokyo, Japan", color: "#F4A261", interests: ["Gaming", "Tech", "Photography", "Anime", "Code"], bio: "Pixel pusher by day, dreamer by night. Building the future one commit at a time.", online: true, joined: "December 2025" },
};

export default function ProfileView() {
  const { id } = useParams();
  const person = PEOPLE[id || "1"] || PEOPLE["1"];

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar variant="app" />
      <div className="container py-8 max-w-3xl mx-auto">
        <Link to="/discover">
          <button className="flex items-center gap-2 mb-6 text-sm font-medium text-slate-muted">
            <ArrowLeft size={16} /> Back to Discover
          </button>
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="rounded-2xl overflow-hidden mb-6 bg-card border-2 border-navy">
            <div className="h-48 flex items-end justify-between px-8 pb-0 relative" style={{ backgroundColor: person.color + "22" }}>
              <div className="relative">
                <svg viewBox="0 0 120 120" className="w-32 h-32 translate-y-8" fill="none">
                  <circle cx="60" cy="36" r="24" fill={person.color} />
                  <path d="M10 120 Q10 72 60 72 Q110 72 110 120Z" fill={person.color} />
                </svg>
                {person.online && <div className="absolute bottom-8 right-0 w-4 h-4 rounded-full bg-green-500 border-[3px] border-card" />}
              </div>
              <div className="flex gap-2 mb-4">
                <button className="w-9 h-9 rounded-full flex items-center justify-center bg-card border-2 border-navy" onClick={() => toast.success("Profile link copied!")}>
                  <Share2 size={15} className="text-navy" />
                </button>
                <button className="w-9 h-9 rounded-full flex items-center justify-center bg-card border-2 border-navy" onClick={() => toast.info("Report submitted.")}>
                  <Flag size={15} className="text-slate-muted" />
                </button>
              </div>
            </div>

            <div className="px-8 pt-12 pb-8">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-4xl font-heading text-navy">{person.name}, {person.age}</h1>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin size={14} className="text-slate-muted" />
                    <span className="text-slate-muted">{person.city}</span>
                    <span className="mx-2 text-cream-dark">·</span>
                    <span className="text-sm font-medium" style={{ color: person.online ? "#22C55E" : "hsl(var(--slate-muted))" }}>
                      {person.online ? "● Online now" : "● Offline"}
                    </span>
                  </div>
                </div>
                <Link to="/chats/1">
                  <button className="honly-btn-primary flex items-center gap-2"><MessageCircle size={16} /> Send message</button>
                </Link>
              </div>

              <div className="p-5 rounded-xl mb-6 bg-background border border-cream-dark">
                <p className="text-navy leading-relaxed">{person.bio}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium mb-3 uppercase tracking-wider text-slate-muted font-heading">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {person.interests.map(int => (
                    <span key={int} className="honly-tag" style={{ backgroundColor: person.color + "18", color: person.color, borderColor: person.color + "44" }}>{int}</span>
                  ))}
                </div>
              </div>

              <p className="text-sm text-slate-muted">Member since {person.joined}</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-navy border-2 border-navy">
            <h3 className="text-xl text-primary-foreground mb-2 font-heading">Vibe check ✨</h3>
            <p className="text-primary-foreground/70 text-sm mb-4">
              You both like <strong className="text-primary-foreground">Music</strong> and <strong className="text-primary-foreground">Travel</strong>. Great starting point!
            </p>
            <Link to="/chats/1">
              <button className="text-sm font-medium px-5 py-2.5 rounded-full font-heading bg-coral text-primary-foreground border-2 border-coral">Start a conversation</button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
