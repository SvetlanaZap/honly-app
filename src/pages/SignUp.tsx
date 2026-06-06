import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import logoImg from "@/assets/honly-logo.svg";

export default function SignUp() {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="min-h-screen flex bg-background font-body">
      {/* Left Panel */}
      <div className="hidden md:flex flex-col justify-between p-12 w-5/12 shrink-0 bg-coral border-r-2 border-navy">
        <Link to="/">
          <div className="flex items-center cursor-pointer">
            <span className="text-4xl font-bold font-heading text-primary-foreground">HOnly</span>
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
          <p className="text-primary-foreground/80 text-lg">Real people. Real conversations. No manipulative feeds deciding what you see.</p>
        </div>

        <p className="text-primary-foreground/50 text-sm">Humans Only. Vibes Only.</p>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
          <Link to="/">
            <div className="flex items-center mb-8 md:hidden">
              <img src={logoImg} alt="HOnly" className="h-12 w-auto object-contain" />
            </div>
          </Link>

          <h1 className="text-3xl md:text-4xl mb-2 font-heading text-navy">Create your account</h1>
          <p className="mb-6 text-slate-muted">
            Already have one? <Link to="/signin" className="text-coral font-semibold">Sign in</Link>
          </p>

          {/* Social sign-on */}
          <div className="flex flex-col gap-3 mb-5">
            <Link to="/verify-phone">
              <button type="button" className="w-full flex items-center justify-center gap-3 rounded-full border-2 border-navy bg-white py-3 font-semibold text-navy transition-colors hover:bg-cream">
                <svg width="18" height="18" viewBox="0 0 20 20"><path d="M19 10.2c0-.7-.1-1.3-.2-2H10v3.8h5a4.3 4.3 0 01-1.9 2.8v2.3h3.1A9.4 9.4 0 0019 10.2z" fill="#4285F4"/><path d="M10 19.3c2.5 0 4.7-.8 6.2-2.2l-3-2.3a5.9 5.9 0 01-8.8-3.1H1.3v2.4A9.4 9.4 0 0010 19.3z" fill="#34A853"/><path d="M4.4 11.7a5.6 5.6 0 010-3.4V5.9H1.3a9.4 9.4 0 000 8.2l3.1-2.4z" fill="#FBBC04"/><path d="M10 4.4a5.1 5.1 0 013.6 1.4l2.7-2.7A9 9 0 0010 .7 9.4 9.4 0 001.3 5.9l3.1 2.4A5.6 5.6 0 0110 4.4z" fill="#E94235"/></svg>
                Continue with Google
              </button>
            </Link>
            <Link to="/verify-phone">
              <button type="button" className="w-full flex items-center justify-center gap-3 rounded-full border-2 border-navy bg-navy py-3 font-semibold text-white transition-opacity hover:opacity-90">
                <span className="text-lg leading-none"></span> Continue with Apple
              </button>
            </Link>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-cream-dark" />
            <span className="text-xs text-slate-muted">or sign up with email</span>
            <div className="flex-1 h-px bg-cream-dark" />
          </div>

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

            <Link to="/verify-phone">
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
