import { Link } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import logoImg from "@/assets/logo.png";

export default function SignIn() {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background font-body">
      <div className="fixed top-0 right-0 w-96 h-96 rounded-full opacity-20 pointer-events-none bg-coral" style={{ transform: "translate(30%, -30%)" }} />
      <div className="fixed bottom-0 left-0 w-72 h-72 rounded-full opacity-15 pointer-events-none bg-teal" style={{ transform: "translate(-30%, 30%)" }} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md relative">
        <Link to="/">
          <div className="flex items-center justify-center gap-2 mb-10">
            <img src={logoImg} alt="HOnly" className="w-9 h-9 object-contain" />
            <span className="text-2xl font-bold font-heading text-navy">H<span className="text-coral">Only</span></span>
          </div>
        </Link>

        <div className="p-8 md:p-10 rounded-2xl bg-card border-2 border-navy">
          <h1 className="text-3xl mb-2 font-heading text-navy">Welcome back</h1>
          <p className="mb-8 text-slate-muted">
            New here? <Link to="/signup" className="text-coral font-semibold">Create an account</Link>
          </p>

          <form className="flex flex-col gap-5" onSubmit={e => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-navy">Email address</label>
              <input className="honly-input" placeholder="you@example.com" type="email" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium text-navy">Password</label>
                <span className="text-sm text-coral font-semibold cursor-pointer">Forgot password?</span>
              </div>
              <div className="relative">
                <input className="honly-input pr-12" placeholder="Your password" type={showPass ? "text" : "password"} />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-muted" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Link to="/discover">
              <button type="submit" className="honly-btn-primary w-full flex items-center justify-center gap-2 mt-2">
                Sign in <ArrowRight size={16} />
              </button>
            </Link>
          </form>
        </div>

        <p className="text-center text-xs mt-6 text-slate-muted">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}
