import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import logoImg from "@/assets/logo.png";

export default function SignUp() {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="min-h-screen flex bg-background font-body">
      {/* Left Panel */}
      <div className="hidden md:flex flex-col justify-between p-12 w-5/12 shrink-0 bg-coral border-r-2 border-navy">
        <Link to="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <img src={logoImg} alt="HOnly" className="w-8 h-8 object-contain brightness-0 invert" />
            <span className="text-2xl font-bold font-heading text-primary-foreground">HOnly</span>
          </div>
        </Link>

        <div>
          <svg viewBox="0 0 300 260" className="w-64 mb-10" fill="none">
            <ellipse cx="100" cy="60" rx="38" ry="38" fill="rgba(255,255,255,0.3)" />
            <path d="M40 260 Q40 160 100 160 Q160 160 160 260Z" fill="rgba(255,255,255,0.3)" />
            <ellipse cx="200" cy="60" rx="38" ry="38" fill="rgba(26,35,50,0.4)" />
            <path d="M140 260 Q140 160 200 160 Q260 160 260 260Z" fill="rgba(26,35,50,0.4)" />
          </svg>
          <h2 className="text-4xl font-bold text-primary-foreground mb-4 font-heading">Join the human side of the internet</h2>
          <p className="text-primary-foreground/80 text-lg">Real people. Real conversations. No algorithms deciding who you meet.</p>
        </div>

        <p className="text-primary-foreground/50 text-sm">Humans Only. Vibes Only.</p>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
          <Link to="/">
            <div className="flex items-center gap-2 mb-8 md:hidden">
              <img src={logoImg} alt="HOnly" className="w-8 h-8 object-contain" />
              <span className="text-2xl font-bold font-heading text-navy">H<span className="text-coral">Only</span></span>
            </div>
          </Link>

          <h1 className="text-3xl md:text-4xl mb-2 font-heading text-navy">Create your account</h1>
          <p className="mb-8 text-slate-muted">
            Already have one? <Link to="/signin" className="text-coral font-semibold">Sign in</Link>
          </p>

          <form className="flex flex-col gap-5" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-navy">First name</label>
                <input className="honly-input" placeholder="Alex" type="text" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-navy">Last name</label>
                <input className="honly-input" placeholder="Kim" type="text" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-navy">Email address</label>
              <input className="honly-input" placeholder="you@example.com" type="email" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-navy">Password</label>
              <div className="relative">
                <input className="honly-input pr-12" placeholder="At least 8 characters" type={showPass ? "text" : "password"} />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-muted" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-navy">Date of birth</label>
              <input className="honly-input" type="date" />
            </div>

            <div className="flex items-start gap-3 mt-1">
              <input type="checkbox" id="terms" className="mt-1 w-4 h-4 rounded accent-coral" />
              <label htmlFor="terms" className="text-sm text-slate-muted">
                I agree to the <span className="text-coral font-semibold">Terms of Service</span> and <span className="text-coral font-semibold">Privacy Policy</span>
              </label>
            </div>

            <Link to="/onboarding">
              <button type="submit" className="honly-btn-primary w-full flex items-center justify-center gap-2 mt-2">
                Create account <ArrowRight size={16} />
              </button>
            </Link>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
