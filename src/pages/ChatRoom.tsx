import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Send, Reply, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PEOPLE: Record<string, { name: string; color: string; online: boolean }> = {
  "1": { name: "Maya", color: "hsl(10,77%,60%)", online: true },
  "2": { name: "Luca", color: "hsl(170,52%,49%)", online: true },
  "3": { name: "Zoe", color: "#7B68EE", online: false },
};

type ReplyRef = { text: string; from: "me" | "them" };
type Msg = { id: number; from: "me" | "them"; text: string; time: string; replyTo?: ReplyRef };

const INITIAL_MESSAGES: Msg[] = [
  { id: 1, from: "them", text: "Hey! I saw you're into photography too. What kind of shots do you usually take?", time: "10:32" },
  { id: 2, from: "me", text: "Hey! Mostly street photography and portraits. I love capturing candid moments. You?", time: "10:34" },
  { id: 3, from: "them", text: "Same! I've been doing a lot of urban exploration lately. Found some incredible abandoned buildings.", time: "10:35" },
  { id: 4, from: "me", text: "That sounds amazing! Do you ever get nervous going into abandoned places?", time: "10:37" },
  { id: 5, from: "them", text: "A little, but the shots are always worth it 😄 I'll send you some of my favorites!", time: "10:38" },
];

const AUTO_REPLIES = [
  "Haha, totally agree! 😄",
  "Oh that's interesting — tell me more!",
  "I was just thinking the same thing.",
  "Love that. What made you get into it?",
  "Honestly same. We should swap recommendations sometime.",
  "That's a great point. I hadn't thought about it like that.",
  "Yes! 🙌 Couldn't have said it better.",
];

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatRoom() {
  const { id } = useParams();
  const person = PEOPLE[id || "1"] || PEOPLE["1"];
  const [messages, setMessages] = useState<Msg[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [replyTo, setReplyTo] = useState<Msg | null>(null);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const newMsg: Msg = {
      id: Date.now(),
      from: "me",
      text,
      time: nowTime(),
      replyTo: replyTo ? { text: replyTo.text, from: replyTo.from } : undefined,
    };
    setMessages(prev => [...prev, newMsg]);
    setInput("");
    setReplyTo(null);

    // Simulated reply from the other person
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "them",
          text: AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)],
          time: nowTime(),
          replyTo: { text, from: "me" },
        },
      ]);
    }, 1400);
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
          <p className="text-xs" style={{ color: person.online ? "#22C55E" : "hsl(var(--slate-muted))" }}>
            {typing ? "Typing…" : person.online ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((msg) => (
          <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`group flex items-center gap-2 ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
            {/* Reply button (left side for my messages) */}
            {msg.from === "me" && (
              <button onClick={() => setReplyTo(msg)} title="Reply"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-muted hover:text-coral shrink-0">
                <Reply size={16} />
              </button>
            )}

            <div className="max-w-[75%] px-4 py-3 rounded-2xl" style={{
              backgroundColor: msg.from === "me" ? "hsl(var(--coral))" : "white",
              color: msg.from === "me" ? "white" : "hsl(var(--navy))",
              border: msg.from === "me" ? "none" : "2px solid hsl(var(--navy))",
              borderRadius: msg.from === "me" ? "1rem 1rem 0.25rem 1rem" : "1rem 1rem 1rem 0.25rem",
            }}>
              {msg.replyTo && (
                <div className="mb-2 pl-2 border-l-2 rounded-sm text-xs" style={{
                  borderColor: msg.from === "me" ? "rgba(255,255,255,0.6)" : "hsl(var(--teal))",
                  backgroundColor: msg.from === "me" ? "rgba(255,255,255,0.12)" : "hsl(var(--cream-dark))",
                  opacity: 0.95, padding: "4px 8px",
                }}>
                  <span className="font-semibold">{msg.replyTo.from === "me" ? "You" : person.name}</span>
                  <p className="truncate" style={{ maxWidth: 220 }}>{msg.replyTo.text}</p>
                </div>
              )}
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <p className="text-xs mt-1" style={{ opacity: 0.6 }}>{msg.time}</p>
            </div>

            {/* Reply button (right side for their messages) */}
            {msg.from === "them" && (
              <button onClick={() => setReplyTo(msg)} title="Reply"
                className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-muted hover:text-coral shrink-0">
                <Reply size={16} />
              </button>
            )}
          </motion.div>
        ))}

        {/* Typing indicator */}
        {typing && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
            <div className="px-4 py-3 rounded-2xl bg-white border-2 border-navy" style={{ borderRadius: "1rem 1rem 1rem 0.25rem" }}>
              <div className="flex gap-1.5 items-center">
                <span className="w-2 h-2 rounded-full bg-navy/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-navy/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-navy/40 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-card border-t-2 border-navy">
        {/* Reply preview */}
        <AnimatePresence>
          {replyTo && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden">
              <div className="flex items-center justify-between gap-3 px-4 pt-3">
                <div className="flex-1 min-w-0 pl-3 border-l-2 border-teal">
                  <p className="text-xs font-semibold text-teal">Replying to {replyTo.from === "me" ? "yourself" : person.name}</p>
                  <p className="text-sm truncate text-navy/70">{replyTo.text}</p>
                </div>
                <button onClick={() => setReplyTo(null)} className="text-slate-muted hover:text-coral shrink-0" title="Cancel reply">
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-3 p-4">
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
