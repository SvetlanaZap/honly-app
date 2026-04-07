import { useState } from "react";
import { Bell, Lock, Eye, LogOut, ChevronRight, Moon, Globe, Shield, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className="w-12 h-6 rounded-full relative transition-colors shrink-0 border-2 border-navy"
      style={{ backgroundColor: value ? "hsl(var(--coral))" : "hsl(var(--cream-dark))" }}>
      <div className="w-4 h-4 rounded-full absolute top-0.5 transition-all bg-card border border-navy"
        style={{ left: value ? "calc(100% - 18px)" : "2px" }} />
    </button>
  );
}

function SettingRow({ icon: Icon, label, desc, toggle, onClick, danger }: {
  icon: React.ElementType; label: string; desc?: string;
  toggle?: { value: boolean; onChange: () => void }; onClick?: () => void; danger?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 p-4 cursor-pointer transition-all border-b border-cream-dark" onClick={onClick}>
      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ backgroundColor: danger ? "hsl(var(--coral) / 0.1)" : "hsl(var(--cream))", border: `1.5px solid ${danger ? "hsl(var(--coral))" : "hsl(var(--cream-dark))"}` }}>
        <Icon size={16} style={{ color: danger ? "hsl(var(--coral))" : "hsl(var(--navy))" }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium font-heading" style={{ color: danger ? "hsl(var(--coral))" : "hsl(var(--navy))" }}>{label}</p>
        {desc && <p className="text-sm text-slate-muted">{desc}</p>}
      </div>
      {toggle ? <Toggle value={toggle.value} onChange={toggle.onChange} /> : <ChevronRight size={16} className="text-slate-muted" />}
    </div>
  );
}

export default function Settings() {
  const [notifs, setNotifs] = useState(true);
  const [messages, setMessages] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);
  const [showAge, setShowAge] = useState(true);
  const [showLocation, setShowLocation] = useState(false);

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar variant="app" />
      <div className="container py-8 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl mb-8 font-heading text-navy">Settings</h1>

          {[
            { title: "Account", items: [
              { icon: Globe, label: "Language", desc: "English", onClick: () => toast.info("Language settings coming soon") },
              { icon: Moon, label: "Dark mode", desc: "Switch to dark theme", toggle: { value: darkMode, onChange: () => { setDarkMode(!darkMode); toast.info("Dark mode coming soon"); } } },
              { icon: Lock, label: "Change password", onClick: () => toast.info("Password change coming soon") },
            ]},
            { title: "Notifications", items: [
              { icon: Bell, label: "Push notifications", desc: "Get notified about new messages", toggle: { value: notifs, onChange: () => setNotifs(!notifs) } },
              { icon: Bell, label: "New message alerts", desc: "Sound and vibration", toggle: { value: messages, onChange: () => setMessages(!messages) } },
            ]},
            { title: "Privacy", items: [
              { icon: Eye, label: "Public profile", desc: "Let others discover you", toggle: { value: publicProfile, onChange: () => setPublicProfile(!publicProfile) } },
              { icon: Eye, label: "Show age", desc: "Display your age on profile", toggle: { value: showAge, onChange: () => setShowAge(!showAge) } },
              { icon: Eye, label: "Show location", desc: "Display your city", toggle: { value: showLocation, onChange: () => setShowLocation(!showLocation) } },
              { icon: Shield, label: "Blocked users", desc: "Manage blocked contacts", onClick: () => toast.info("Coming soon") },
            ]},
            { title: "Account actions", items: [
              { icon: LogOut, label: "Sign out", onClick: () => toast.info("Signing out...") },
              { icon: Trash2, label: "Delete account", desc: "This action cannot be undone", danger: true, onClick: () => toast.error("Account deletion coming soon.") },
            ]},
          ].map(section => (
            <div key={section.title} className="mb-6">
              <h2 className="text-xs font-semibold uppercase tracking-widest mb-3 text-slate-muted font-heading">{section.title}</h2>
              <div className="rounded-2xl overflow-hidden bg-card border-2 border-navy">
                {section.items.map(item => <SettingRow key={item.label} {...item} />)}
              </div>
            </div>
          ))}

          <p className="text-center text-xs text-slate-muted">HOnly v1.0 · Humans Only. Vibes Only.</p>
        </motion.div>
      </div>
    </div>
  );
}
