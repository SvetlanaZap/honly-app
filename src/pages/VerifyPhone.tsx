import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import logoImg from "@/assets/honly-logo.svg";
import { toast } from "sonner";

export default function VerifyPhone() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);

  const sendCode = () => {
    if (!phone.trim()) { toast.error("Enter your phone number"); return; }
    setSent(true);
    toast.success("Verification code sent");
  };

  const verify = () => {
    if (!code.trim()) { toast.error("Enter the code we sent you"); return; }
    toast.success("Phone verified!");
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-background font-body flex flex-col items-center p-6 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center mb-10">
          <img src={logoImg} alt="HOnly" className="h-10 w-auto object-contain" />
        </div>

        {/* Header */}
        <div className="mb-8">
          <span className="text-5xl block mb-3">📱</span>
          <p className="text-xs font-semibold text-teal mb-1 uppercase tracking-widest">Trust &amp; Safety</p>
          <h1 className="text-3xl font-bold text-navy mb-2 font-heading">Verify your phone</h1>
          <p className="text-slate-muted text-sm leading-relaxed">SMS verification adds a trust signal. We'll send you a code.</p>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-muted mb-2 uppercase tracking-widest">Phone number</label>
            <input className="honly-input w-full" placeholder="+49 160 123 4567" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>

          {sent && (
            <div>
              <label className="block text-xs font-semibold text-slate-muted mb-2 uppercase tracking-widest">Verification code</label>
              <input className="honly-input w-full tracking-[0.5em] text-center" placeholder="••••••" maxLength={6} value={code} onChange={e => setCode(e.target.value)} />
            </div>
          )}

          <div className="rounded-lg bg-cream border-l-4 border-teal px-4 py-3">
            <p className="text-sm text-navy/80">📱 This helps us keep the community safe and real. We never share your number.</p>
          </div>

          {!sent ? (
            <button onClick={sendCode} className="honly-btn-primary w-full flex items-center justify-center gap-2">
              Send code <ArrowRight size={16} />
            </button>
          ) : (
            <button onClick={verify} className="honly-btn-primary w-full flex items-center justify-center gap-2">
              Verify <ArrowRight size={16} />
            </button>
          )}

          <Link to="/onboarding" className="text-center text-sm font-semibold text-teal">
            Skip for now
          </Link>
        </div>

        <Link to="/signup" className="honly-btn-outline mt-10 inline-flex items-center gap-2 text-sm px-6 py-2.5">
          <ArrowLeft size={14} /> Back
        </Link>
      </motion.div>
    </div>
  );
}
