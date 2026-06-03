import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Send, Reply, X, ImagePlus, Mic, Square, Check, CheckCheck, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PEOPLE: Record<string, { name: string; color: string; online: boolean }> = {
  "1": { name: "Maya", color: "hsl(10,77%,60%)", online: true },
  "2": { name: "Luca", color: "hsl(170,52%,49%)", online: true },
  "3": { name: "Zoe", color: "#7B68EE", online: false },
};

type Kind = "text" | "image" | "audio";
type ReplyRef = { text: string; from: "me" | "them" };
type Msg = {
  id: number;
  from: "me" | "them";
  kind: Kind;
  text?: string;
  media?: string;
  time: string;
  replyTo?: ReplyRef;
  status?: "sent" | "read";
};

const INITIAL_MESSAGES: Msg[] = [
  { id: 1, from: "them", kind: "text", text: "Hey! I saw you're into photography too. What kind of shots do you usually take?", time: "10:32" },
  { id: 2, from: "me", kind: "text", text: "Hey! Mostly street photography and portraits. I love capturing candid moments. You?", time: "10:34", status: "read" },
  { id: 3, from: "them", kind: "text", text: "Same! I've been doing a lot of urban exploration lately. Found some incredible abandoned buildings.", time: "10:35" },
  { id: 4, from: "me", kind: "text", text: "That sounds amazing! Do you ever get nervous going into abandoned places?", time: "10:37", status: "read" },
  { id: 5, from: "them", kind: "text", text: "A little, but the shots are always worth it 😄 I'll send you some of my favorites!", time: "10:38" },
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

function previewText(m: { kind: Kind; text?: string }) {
  if (m.kind === "image") return "📷 Photo";
  if (m.kind === "audio") return "🎤 Voice message";
  return m.text || "";
}

export default function ChatRoom() {
  const { id } = useParams();
  const person = PEOPLE[id || "1"] || PEOPLE["1"];
  const [messages, setMessages] = useState<Msg[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [replyTo, setReplyTo] = useState<Msg | null>(null);
  const [typing, setTyping] = useState(false);

  // voice recording
  const [recording, setRecording] = useState(false);
  const [recSeconds, setRecSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // mark my messages read + push an auto-reply that quotes the last thing I sent
  const triggerAutoReply = (quote: ReplyRef) => {
    setTyping(true);
    // recipient is reading -> mark my sent messages as read
    setMessages(prev => prev.map(m => (m.from === "me" ? { ...m, status: "read" } : m)));
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "them",
          kind: "text",
          text: AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)],
          time: nowTime(),
          replyTo: quote,
        },
      ]);
    }, 1400);
  };

  const pushMine = (msg: Omit<Msg, "id" | "from" | "time" | "status">) => {
    const full: Msg = {
      ...msg,
      id: Date.now(),
      from: "me",
      time: nowTime(),
      status: "sent",
      replyTo: replyTo ? { text: previewText(replyTo), from: replyTo.from } : undefined,
    };
    setMessages(prev => [...prev, full]);
    setReplyTo(null);
    triggerAutoReply({ text: previewText(full), from: "me" });
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    pushMine({ kind: "text", text });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => pushMine({ kind: "image", media: reader.result as string });
    reader.readAsDataURL(file);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (ev) => { if (ev.data.size > 0) chunksRef.current.push(ev.data); };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mr.mimeType || "audio/webm" });
        const url = URL.createObjectURL(blob);
        pushMine({ kind: "audio", media: url });
        stream.getTracks().forEach(t => t.stop());
      };
      mediaRecorderRef.current = mr;
      mr.start();
      setRecording(true);
      setRecSeconds(0);
      recTimerRef.current = setInterval(() => setRecSeconds(s => s + 1), 1000);
    } catch {
      alert("Microphone access is needed to record a voice message.");
    }
  };

  const stopRecording = (send: boolean) => {
    const mr = mediaRecorderRef.current;
    if (recTimerRef.current) clearInterval(recTimerRef.current);
    setRecording(false);
    if (!mr) return;
    if (!send) mr.onstop = () => mr.stream.getTracks().forEach(t => t.stop());
    mr.stop();
    mediaRecorderRef.current = null;
  };

  useEffect(() => () => { if (recTimerRef.current) clearInterval(recTimerRef.current); }, []);

  const fmtRec = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

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
        {messages.map((msg) => {
          const mine = msg.from === "me";
          return (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className={`group flex items-center gap-2 ${mine ? "justify-end" : "justify-start"}`}>
              {mine && (
                <button onClick={() => setReplyTo(msg)} title="Reply"
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-muted hover:text-coral shrink-0">
                  <Reply size={16} />
                </button>
              )}

              <div className="max-w-[78%] px-2.5 py-2.5 rounded-2xl" style={{
                backgroundColor: mine ? "hsl(var(--coral))" : "white",
                color: mine ? "white" : "hsl(var(--navy))",
                border: mine ? "none" : "2px solid hsl(var(--navy))",
                borderRadius: mine ? "1rem 1rem 0.25rem 1rem" : "1rem 1rem 1rem 0.25rem",
              }}>
                {msg.replyTo && (
                  <div className="mb-2 rounded-sm text-xs border-l-2" style={{
                    borderColor: mine ? "rgba(255,255,255,0.6)" : "hsl(var(--teal))",
                    backgroundColor: mine ? "rgba(255,255,255,0.12)" : "hsl(var(--cream-dark))",
                    padding: "4px 8px",
                  }}>
                    <span className="font-semibold">{msg.replyTo.from === "me" ? "You" : person.name}</span>
                    <p className="truncate" style={{ maxWidth: 220 }}>{msg.replyTo.text}</p>
                  </div>
                )}

                {msg.kind === "image" && msg.media && (
                  <img src={msg.media} alt="Shared" className="rounded-lg max-w-[240px] w-full block" />
                )}

                {msg.kind === "audio" && msg.media && (
                  <audio controls src={msg.media} className="max-w-[240px] w-[240px] mt-0.5" />
                )}

                {msg.kind === "text" && (
                  <p className="text-sm leading-relaxed px-1.5">{msg.text}</p>
                )}

                <div className="flex items-center gap-1 justify-end mt-1 px-1.5">
                  <span className="text-xs" style={{ opacity: 0.6 }}>{msg.time}</span>
                  {mine && (
                    msg.status === "read"
                      ? <CheckCheck size={14} style={{ opacity: 0.95 }} />
                      : <Check size={14} style={{ opacity: 0.7 }} />
                  )}
                </div>
              </div>

              {!mine && (
                <button onClick={() => setReplyTo(msg)} title="Reply"
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-muted hover:text-coral shrink-0">
                  <Reply size={16} />
                </button>
              )}
            </motion.div>
          );
        })}

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
                  <p className="text-sm truncate text-navy/70">{previewText(replyTo)}</p>
                </div>
                <button onClick={() => setReplyTo(null)} className="text-slate-muted hover:text-coral shrink-0" title="Cancel reply">
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <input ref={imageInputRef} type="file" accept="image/*,image/gif" className="hidden" onChange={handleImage} />

        {recording ? (
          <div className="flex items-center gap-3 p-4">
            <button onClick={() => stopRecording(false)} title="Cancel" className="text-slate-muted hover:text-coral">
              <Trash2 size={20} />
            </button>
            <div className="flex-1 flex items-center gap-2 text-coral font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-coral animate-pulse" />
              Recording… {fmtRec(recSeconds)}
            </div>
            <button onClick={() => stopRecording(true)} title="Send voice message"
              className="w-11 h-11 rounded-full flex items-center justify-center bg-coral border-2 border-navy transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[3px_3px_0_hsl(var(--navy))]">
              <Send size={18} color="white" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 p-4">
            <button onClick={() => imageInputRef.current?.click()} title="Send photo or GIF"
              className="w-10 h-10 rounded-full flex items-center justify-center text-navy border-2 border-navy bg-card transition-all hover:bg-cream-dark shrink-0">
              <ImagePlus size={18} />
            </button>
            <input className="honly-input flex-1" placeholder="Type a message..." value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()} />
            {input.trim() ? (
              <button onClick={sendMessage} title="Send"
                className="w-11 h-11 rounded-full flex items-center justify-center bg-coral border-2 border-navy transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[3px_3px_0_hsl(var(--navy))] shrink-0">
                <Send size={18} color="white" />
              </button>
            ) : (
              <button onClick={startRecording} title="Record voice message"
                className="w-11 h-11 rounded-full flex items-center justify-center bg-teal border-2 border-navy transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[3px_3px_0_hsl(var(--navy))] shrink-0">
                <Mic size={18} color="white" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
