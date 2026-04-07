import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { motion } from "framer-motion";

const PEOPLE: Record<string, { name: string; color: string; online: boolean }> = {
  "1": { name: "Maya", color: "hsl(10,77%,60%)", online: true },
  "2": { name: "Luca", color: "hsl(170,52%,49%)", online: true },
  "3": { name: "Zoe", color: "#7B68EE", online: false },
};

const INITIAL_MESSAGES = [
  { id: 1, from: "them", text: "Hey! I saw you're into photography too. What kind of shots do you usually take?", time: "10:32" },
  { id: 2, from: "me", text: "Hey! Mostly street photography and portraits. I love capturing candid moments. You?", time: "10:34" },
  { id: 3, from: "them", text: "Same! I've been doing a lot of urban exploration lately. Found some incredible abandoned buildings.", time: "10:35" },
  { id: 4, from: "me", text: "That sounds amazing! Do you ever get nervous going into abandoned places?", time: "10:37" },
  { id: 5, from: "them", text: "A little, but the shots are always worth it 😄 I'll send you some of my favorites!", time: "10:38" },
];

export default function ChatRoom() {
  const { id } = useParams();
  const person = PEOPLE[id || "1"] || PEOPLE["1"];
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: prev.length + 1, from: "me", text: input.trim(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    setInput("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-body">
      {/* Header */}
      <div className="sticky top-0 z-40 flex items-center gap-4 px-4 py-3 bg-card border-b-2 border-navy">
        <Link to="/chats"><button className="text-navy"><ArrowLeft size={20} /></button></Link>
        <div className="relative">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: person.color + "22", border: `2px solid ${person.color}` }}>
            <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
              <circle cx="20" cy="12" r="8" fill={person.color} />
              <path d="M4 40 Q4 24 20 24 Q36 24 36 40Z" fill={person.color} />
            </svg>
          </div>
          {person.online && <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-card" />}
        </div>
        <div>
          <p className="font-semibold font-heading text-navy">{person.name}</p>
          <p className="text-xs" style={{ color: person.online ? "#22C55E" : "hsl(var(--slate-muted))" }}>{person.online ? "Online" : "Offline"}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((msg) => (
          <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
            <div className="max-w-[75%] px-4 py-3 rounded-2xl" style={{
              backgroundColor: msg.from === "me" ? "hsl(var(--coral))" : "white",
              color: msg.from === "me" ? "white" : "hsl(var(--navy))",
              border: msg.from === "me" ? "none" : "2px solid hsl(var(--navy))",
              borderRadius: msg.from === "me" ? "1rem 1rem 0.25rem 1rem" : "1rem 1rem 1rem 0.25rem",
            }}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p className="text-xs mt-1" style={{ opacity: 0.6 }}>{msg.time}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="sticky bottom-0 p-4 bg-card border-t-2 border-navy">
        <div className="flex items-center gap-3">
          <input className="honly-input flex-1" placeholder="Type a message..." value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()} />
          <button onClick={sendMessage} className="w-11 h-11 rounded-full flex items-center justify-center bg-coral border-2 border-navy transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[3px_3px_0_hsl(var(--navy))]">
            <Send size={18} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
}
