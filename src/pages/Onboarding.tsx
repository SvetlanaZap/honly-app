import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo.png";
import { toast } from "sonner";

function ChipGroup({ options, selected, onToggle, max, color = "hsl(var(--coral))" }: {
  options: string[]; selected: string[]; onToggle: (v: string) => void; max?: number; color?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => {
        const active = selected.includes(opt);
        const disabled = !active && max !== undefined && selected.length >= max;
        return (
          <button key={opt} type="button" disabled={disabled} onClick={() => onToggle(opt)}
            className="honly-tag transition-all"
            style={{
              backgroundColor: active ? color : undefined,
              color: active ? "white" : disabled ? "hsl(var(--slate-muted))" : undefined,
              borderColor: active ? color : disabled ? "hsl(var(--cream-dark))" : undefined,
              fontWeight: active ? 600 : 400,
              opacity: disabled ? 0.5 : 1,
              cursor: disabled ? "not-allowed" : "pointer",
            }}>{opt}</button>
        );
      })}
    </div>
  );
}

const INTERESTS = ["Music", "Art", "Photography", "Travel", "Cooking", "Reading", "Gaming", "Fitness", "Nature", "Tech", "Movies", "Writing", "Yoga", "Dancing", "Coffee", "Philosophy"];
const CONVO_STYLES = ["Playful & witty", "Thoughtful & reflective", "Intellectual & analytical", "Warm & nurturing", "Direct & honest", "Curious & questioning"];
const VALUES = ["Honesty", "Kindness", "Growth", "Freedom", "Authenticity", "Compassion", "Curiosity", "Courage"];

const TEXT_FREQUENCY = ["A few times a day", "Once a day", "Every few days", "Whenever it flows"];
const RESPONSE_TIME = ["Within minutes", "Within a few hours", "Same day", "No expectations"];
const FLIRTING = ["Love it", "Light & playful only", "Prefer to keep it friendly", "Not into it"];
const CALL_PREFS = ["Open to voice notes", "Open to voice calls", "Open to video calls", "Text only for now"];
const BOUNDARIES = ["No late-night texts", "No explicit content", "No pet names early on", "Please ask before calling", "Slow build-up preferred"];

const TOTAL_STEPS = 6;

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [convoStyle, setConvoStyle] = useState<string[]>([]);
  const [values, setValues] = useState<string[]>([]);
  const [textFreq, setTextFreq] = useState<string[]>([]);
  const [responseTime, setResponseTime] = useState<string[]>([]);
  const [flirting, setFlirting] = useState<string[]>([]);
  const [callPrefs, setCallPrefs] = useState<string[]>([]);
  const [boundaries, setBoundaries] = useState<string[]>([]);

  const toggle = (arr: string[], set: React.Dispatch<React.SetStateAction<string[]>>, v: string) => {
    set(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);
  };

  const next = () => {
    if (step === 1 && !name.trim()) { toast.error("Please enter your name"); return; }
    if (step < TOTAL_STEPS) setStep(step + 1);
    else { toast.success("Profile created!"); navigate("/discover"); }
  };

  return (
    <div className="min-h-screen bg-background font-body flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <img src={logoImg} alt="HOnly" className="w-8 h-8 object-contain" />
          <span className="text-xl font-bold font-heading text-navy">H<span className="text-coral">Only</span></span>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div key={i} className="flex-1 h-1.5 rounded-full transition-all" style={{ backgroundColor: i < step ? "hsl(var(--coral))" : "hsl(var(--cream-dark))" }} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            {step === 1 && (
              <div className="flex flex-col gap-6">
                <div><span className="text-4xl mb-3 block">👤</span><h2 className="text-3xl mb-1 font-heading text-navy">About you</h2><p className="text-slate-muted">Let's start with the basics.</p></div>
                <div><label className="block text-sm font-medium mb-1.5 text-navy">Display name</label><input className="honly-input" placeholder="What should people call you?" value={name} onChange={e => setName(e.target.value)} /></div>
                <div><label className="block text-sm font-medium mb-1.5 text-navy">City</label><input className="honly-input" placeholder="Where are you based?" value={city} onChange={e => setCity(e.target.value)} /></div>
                <div><label className="block text-sm font-medium mb-1.5 text-navy">Short bio</label><textarea className="honly-input min-h-[100px] resize-none" placeholder="Tell people something about yourself..." value={bio} onChange={e => setBio(e.target.value)} /></div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-6">
                <div><span className="text-4xl mb-3 block">✨</span><h2 className="text-3xl mb-1 font-heading text-navy">Your interests</h2><p className="text-slate-muted">Pick up to 6 things you love.</p></div>
                <ChipGroup options={INTERESTS} selected={interests} onToggle={v => toggle(interests, setInterests, v)} max={6} />
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-6">
                <div><span className="text-4xl mb-3 block">💬</span><h2 className="text-3xl mb-1 font-heading text-navy">Conversation style</h2><p className="text-slate-muted">How do you like to talk?</p></div>
                <ChipGroup options={CONVO_STYLES} selected={convoStyle} onToggle={v => toggle(convoStyle, setConvoStyle, v)} max={3} color="hsl(var(--teal))" />
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col gap-6">
                <div><span className="text-4xl mb-3 block">🌿</span><h2 className="text-3xl mb-1 font-heading text-navy">Your values</h2><p className="text-slate-muted">What matters most to you?</p></div>
                <ChipGroup options={VALUES} selected={values} onToggle={v => toggle(values, setValues, v)} max={4} />
              </div>
            )}

            {step === 5 && (
              <div className="flex flex-col gap-8">
                <div><span className="text-4xl mb-3 block">📱</span><h2 className="text-3xl mb-1 font-heading text-navy">Chat rhythm</h2><p className="text-slate-muted">How and how often do you like to connect?</p></div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">Texting frequency</p>
                  <ChipGroup options={TEXT_FREQUENCY} selected={textFreq} onToggle={v => toggle(textFreq, setTextFreq, v)} max={1} color="hsl(var(--teal))" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">Response time</p>
                  <ChipGroup options={RESPONSE_TIME} selected={responseTime} onToggle={v => toggle(responseTime, setResponseTime, v)} max={1} color="hsl(var(--teal))" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">Voice & video</p>
                  <ChipGroup options={CALL_PREFS} selected={callPrefs} onToggle={v => toggle(callPrefs, setCallPrefs, v)} />
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="flex flex-col gap-8">
                <div><span className="text-4xl mb-3 block">💞</span><h2 className="text-3xl mb-1 font-heading text-navy">Vibe & boundaries</h2><p className="text-slate-muted">Set the tone for your conversations.</p></div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">Flirting</p>
                  <ChipGroup options={FLIRTING} selected={flirting} onToggle={v => toggle(flirting, setFlirting, v)} max={1} />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-navy">Boundaries (optional)</p>
                  <ChipGroup options={BOUNDARIES} selected={boundaries} onToggle={v => toggle(boundaries, setBoundaries, v)} color="hsl(var(--teal))" />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-10">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="honly-btn-outline flex items-center gap-2 text-sm px-6 py-2.5">
              <ArrowLeft size={14} /> Back
            </button>
          ) : <div />}
          <button onClick={next} className="honly-btn-primary flex items-center gap-2 text-sm px-6 py-2.5">
            {step === TOTAL_STEPS ? "Start exploring" : "Continue"} <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
