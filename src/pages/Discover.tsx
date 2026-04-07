import { Link } from "react-router-dom";
import { Search, MapPin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

const PEOPLE = [
  { id: 1, name: "Maya", age: 27, city: "Berlin", color: "hsl(10,77%,60%)", interests: ["Music", "Art", "Coffee"], bio: "Chasing sunsets and good conversations.", online: true },
  { id: 2, name: "Luca", age: 31, city: "Rome", color: "hsl(170,52%,49%)", interests: ["Travel", "Books", "Cooking"], bio: "Ask me about my pasta recipe.", online: true },
  { id: 3, name: "Zoe", age: 24, city: "London", color: "#7B68EE", interests: ["Yoga", "Philosophy", "Writing"], bio: "Introvert with extrovert energy.", online: false },
  { id: 4, name: "Kai", age: 29, city: "Tokyo", color: "#F4A261", interests: ["Gaming", "Tech", "Photography"], bio: "Pixel pusher by day, dreamer by night.", online: true },
  { id: 5, name: "Aria", age: 26, city: "Paris", color: "#2EC4B6", interests: ["Dancing", "Movies", "Art"], bio: "Life is too short for boring conversations.", online: false },
  { id: 6, name: "Finn", age: 33, city: "Amsterdam", color: "#E76F51", interests: ["Hiking", "Nature", "Podcasts"], bio: "Looking for someone to explore the world with.", online: true },
  { id: 7, name: "Nora", age: 22, city: "Stockholm", color: "#457B9D", interests: ["Books", "Coffee", "Music"], bio: "Bookworm with a caffeine addiction.", online: true },
  { id: 8, name: "Sam", age: 28, city: "NYC", color: "#6D6875", interests: ["Fitness", "Tech", "Gaming"], bio: "Building things and breaking habits.", online: false },
];

const FILTERS = ["All", "Online", "Nearby", "New", "Similar vibes"];

export default function Discover() {
  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar variant="app" />

      <div className="container py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-heading text-navy">Discover people</h1>
            <p className="text-slate-muted">{PEOPLE.filter(p => p.online).length} people online right now</p>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-muted" />
            <input className="honly-input pl-10 w-64" placeholder="Search by name or interest..." type="text" />
          </div>
        </div>

        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {FILTERS.map((f, i) => (
            <button key={f} className="honly-tag shrink-0 transition-all" style={{
              backgroundColor: i === 0 ? "hsl(var(--coral))" : undefined,
              color: i === 0 ? "white" : undefined,
              borderColor: i === 0 ? "hsl(var(--coral))" : undefined,
              fontWeight: i === 0 ? 600 : 400,
            }}>{f}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {PEOPLE.map((person, i) => (
            <motion.div key={person.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <Link to={`/profile/${person.id}`}>
                <div className="honly-card overflow-hidden cursor-pointer">
                  <div className="h-40 flex items-center justify-center relative" style={{ backgroundColor: person.color + "22" }}>
                    <svg viewBox="0 0 100 100" className="w-24 h-24" fill="none">
                      <circle cx="50" cy="30" r="20" fill={person.color} />
                      <path d="M15 100 Q15 60 50 60 Q85 60 85 100Z" fill={person.color} />
                    </svg>
                    {person.online && <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-green-500 border-2 border-card" />}
                  </div>
                  <div className="p-4">
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
                    <p className="text-sm mb-3 line-clamp-2 text-navy/75">{person.bio}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {person.interests.map(int => (
                        <span key={int} className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: person.color + "22", color: person.color, border: `1px solid ${person.color}44` }}>{int}</span>
                      ))}
                    </div>
                    <button className="w-full py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all font-heading border-2 border-navy" style={{ backgroundColor: person.color, color: "white" }}
                      onClick={e => { e.preventDefault(); toast.success(`Message sent to ${person.name}!`); }}>
                      <MessageCircle size={14} /> Say hello
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
