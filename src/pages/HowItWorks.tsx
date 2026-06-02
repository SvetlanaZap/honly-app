import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, MessageCircle, Users, Sparkles, Shield } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const STEPS = [
  { num: "01", icon: Users, title: "Create your profile", desc: "Sign up in under 2 minutes. Tell us who you are — your name, interests, and a short bio." },
  { num: "02", icon: Sparkles, title: "Discover real people", desc: "Browse profiles of real humans. Filter by interests, location, or online status." },
  { num: "03", icon: MessageCircle, title: "Start a conversation", desc: "See someone interesting? Say hello. No swipe mechanics, no match requirements." },
  { num: "04", icon: CheckCircle, title: "Make a connection", desc: "Whether it's a casual chat or a lasting friendship — HOnly is where real connections happen." },
];

const VALUES = [
  { icon: Shield, title: "Safety first", desc: "We use profile review, anti-bot checks, and community reporting to help keep HOnly human and safe." },
  { icon: Users, title: "Matched on your terms", desc: "We connect you around shared interests and the preferences you set — like whether you're open to flirting. No manipulative feeds designed to keep you scrolling." },
  { icon: MessageCircle, title: "Real conversations", desc: "No swipe culture. Messages are front and center." },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar variant="landing" />

      <section className="container py-16 md:py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-5xl md:text-6xl mb-4 font-heading text-navy">How HOnly works</h1>
          <p className="text-lg text-slate-muted max-w-2xl mx-auto mb-16">
            We built HOnly to be the simplest, most human way to meet new people online. Here's how it works.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-20">
          {STEPS.map((step, i) => (
            <motion.div key={step.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="honly-card p-8 text-left">
              <span className="text-5xl font-bold font-heading text-coral/30">{step.num}</span>
              <div className="w-10 h-10 rounded-full flex items-center justify-center mt-4 mb-4" style={{ backgroundColor: i % 2 === 0 ? "hsl(var(--coral))" : "hsl(var(--teal))" }}>
                <step.icon size={18} color="white" />
              </div>
              <h3 className="text-xl mb-2 font-heading text-navy">{step.title}</h3>
              <p className="text-slate-muted leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-navy rounded-3xl p-12 md:p-16 mb-20 border-2 border-navy">
          <h2 className="text-3xl md:text-4xl mb-8 font-heading text-primary-foreground">Our values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <v.icon size={28} className="mx-auto mb-4" style={{ color: i === 0 ? "hsl(var(--coral))" : i === 1 ? "hsl(var(--teal))" : "hsl(var(--cream))" }} />
                <h3 className="text-lg mb-2 font-heading text-primary-foreground">{v.title}</h3>
                <p className="text-primary-foreground/70 text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl mb-4 font-heading text-navy">Ready to try it?</h2>
          <p className="text-lg mb-8 text-slate-muted">Join HOnly today. It takes less than 2 minutes.</p>
          <Link to="/signup">
            <button className="honly-btn-primary text-lg px-10 py-4 flex items-center gap-2 mx-auto">
              Join HOnly <ArrowRight size={18} />
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
