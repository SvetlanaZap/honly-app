import { Link } from "react-router-dom";
import { Search, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const CHATS = [
  { id: 1, name: "Maya", color: "hsl(10,77%,60%)", lastMsg: "That sounds amazing! When are you free?", time: "2m ago", unread: 3, online: true },
  { id: 2, name: "Luca", color: "hsl(170,52%,49%)", lastMsg: "I'll send you the recipe tonight 🍝", time: "15m ago", unread: 0, online: true },
  { id: 3, name: "Zoe", color: "#7B68EE", lastMsg: "Have you read 'The Midnight Library'?", time: "1h ago", unread: 1, online: false },
  { id: 4, name: "Kai", color: "#F4A261", lastMsg: "Let me know what you think of the game!", time: "3h ago", unread: 0, online: true },
  { id: 5, name: "Aria", color: "#2EC4B6", lastMsg: "That movie was incredible, right?", time: "Yesterday", unread: 0, online: false },
  { id: 6, name: "Finn", color: "#E76F51", lastMsg: "The trail was worth every step 🏔", time: "2 days ago", unread: 0, online: true },
];

export default function ChatList() {
  const totalUnread = CHATS.reduce((sum, c) => sum + c.unread, 0);

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar variant="app" />
      <div className="container py-8 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-heading text-navy">Messages</h1>
            {totalUnread > 0 && <p className="text-coral font-semibold">{totalUnread} unread message{totalUnread > 1 ? "s" : ""}</p>}
          </div>
        </div>

        <div className="relative mb-6">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-muted" />
          <input className="honly-input pl-10" placeholder="Search conversations..." type="text" />
        </div>

        <div className="flex flex-col gap-2">
          {CHATS.map((chat, i) => (
            <motion.div key={chat.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Link to={`/chats/${chat.id}`}>
                <div className="honly-card flex items-center gap-4 p-4 cursor-pointer" style={{ borderColor: chat.unread > 0 ? "hsl(var(--coral))" : undefined }}>
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: chat.color + "22", border: `2px solid ${chat.color}` }}>
                      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
                        <circle cx="20" cy="12" r="8" fill={chat.color} />
                        <path d="M4 40 Q4 24 20 24 Q36 24 36 40Z" fill={chat.color} />
                      </svg>
                    </div>
                    {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-card" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-semibold font-heading text-navy" style={{ fontWeight: chat.unread > 0 ? 700 : 600 }}>{chat.name}</span>
                      <span className="text-xs shrink-0 ml-2 text-slate-muted">{chat.time}</span>
                    </div>
                    <p className="text-sm truncate" style={{ color: chat.unread > 0 ? "hsl(var(--navy))" : "hsl(var(--slate-muted))", fontWeight: chat.unread > 0 ? 500 : 400 }}>{chat.lastMsg}</p>
                  </div>

                  {chat.unread > 0 && (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 font-heading bg-coral text-primary-foreground">{chat.unread}</div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
