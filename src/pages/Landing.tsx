import { Link } from "react-router-dom";
import { MessageCircle, Users, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import heroImg from "@/assets/hero-silhouettes.jpg";
import howImg from "@/assets/how-it-works.jpg";

const features = [
  { icon: MessageCircle, title: "Real conversations", desc: "No swipe culture. Start a conversation with someone who shares your vibe." },
  { icon: Users, title: "Humans only", desc: "Every profile is verified. No bots, no fake accounts, just real people." },
  { icon: Sparkles, title: "Good vibes", desc: "Community guidelines that actually work. Respectful by design." },
];

const steps = [
  { num: "01", title: "Create your profile", desc: "Tell us who you are. Your interests, your vibe, your story." },
  { num: "02", title: "Discover people", desc: "Browse real humans nearby or worldwide. No algorithms hiding people from you." },
  { num: "03", title: "Start talking", desc: "Send a message. Have a real conversation. Make a real connection." },
];

const testimonials = [
  { name: "Alex K.", age: 26, text: "Finally an app where people actually respond. Met three amazing friends in the first week." },
  { name: "Mia R.", age: 31, text: "No pressure, no weird expectations. Just genuine conversations. I love it." },
  { name: "Sam T.", age: 24, text: "The vibe check feature is genius. Instantly know if someone's on the same wavelength." },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar variant="landing" />

      {/* Hero */}
      <section className="container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-7xl leading-tight mb-4 font-heading text-navy">
              Meet someone<br />
              <span className="text-coral">real</span>
            </h1>
            <p className="text-lg mb-2 text-navy/75 max-w-[480px]">
              HOnly helps you meet real people for casual chats, deep conversations, and meaningful human connection.
            </p>
            <p className="text-base font-medium mb-8 text-teal">
              No dating expectations. No pressure. No forced next step.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <span className="honly-tag"><MessageCircle size={14} className="text-coral" /> Real conversations</span>
              <span className="honly-tag"><Users size={14} className="text-teal" /> Humans only</span>
              <span className="honly-tag"><Sparkles size={14} className="text-coral" /> Good vibes</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/signup">
                <button className="honly-btn-primary text-base px-8 py-3">Join HOnly</button>
              </Link>
              <Link to="/signin">
                <button className="honly-btn-outline text-base px-8 py-3">Sign in</button>
              </Link>
            </div>

            <p className="mt-8 text-sm text-slate-muted">Humans Only. Vibes Only.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="flex justify-center items-center">
            <div className="w-full max-w-lg rounded-3xl overflow-hidden flex items-center justify-center bg-cream-dark border-2 border-navy" style={{ minHeight: 340 }}>
              <img src={heroImg} alt="Two hands holding — a warm connection" className="w-full h-full object-cover" width={1024} height={768} style={{ maxHeight: 380 }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-card border-t-2 border-b-2 border-navy">
        <div className="container">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl mb-4 font-heading text-navy">
            Why HOnly?
          </motion.h2>
          <p className="text-lg mb-12 text-slate-muted">We built something different. Something human.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="honly-card p-8">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: i === 1 ? "hsl(var(--teal))" : i === 2 ? "hsl(var(--navy))" : "hsl(var(--coral))" }}>
                  <f.icon size={22} color="white" />
                </div>
                <h3 className="text-xl mb-3 font-heading text-navy">{f.title}</h3>
                <p className="text-slate-muted leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl mb-12 font-heading text-navy">
              How it works
            </motion.h2>
            <div className="flex flex-col gap-8">
              {steps.map((step, i) => (
                <motion.div key={step.num} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="flex gap-6 items-start">
                  <span className="text-4xl font-bold shrink-0 font-heading text-coral leading-none">{step.num}</span>
                  <div>
                    <h4 className="text-xl mb-1 font-heading text-navy">{step.title}</h4>
                    <p className="text-slate-muted">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <Link to="/how-it-works">
              <button className="honly-btn-outline mt-10 flex items-center gap-2">Learn more <ArrowRight size={16} /></button>
            </Link>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <img src={howImg} alt="How HOnly works" className="w-full rounded-2xl border-2 border-navy" loading="lazy" width={1024} height={768} />
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-navy">
        <div className="container">
          <h2 className="text-4xl md:text-5xl mb-12 text-primary-foreground font-heading">Real people. Real stories.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl" style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.15)" }}>
                <p className="text-primary-foreground/90 mb-4 leading-relaxed">"{t.text}"</p>
                <p className="text-sm font-heading" style={{ color: i === 0 ? "hsl(var(--coral))" : i === 1 ? "hsl(var(--teal))" : "hsl(var(--cream))" }}>
                  {t.name}, {t.age}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 container text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-5xl mb-4 font-heading text-navy">Ready to meet someone real?</h2>
          <p className="text-lg mb-8 text-slate-muted max-w-lg mx-auto">Join thousands of real humans having real conversations. No algorithms. No pressure.</p>
          <Link to="/signup">
            <button className="honly-btn-primary text-lg px-10 py-4">Join HOnly — it's free</button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t-2 border-navy">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-muted">© 2026 HOnly. Humans Only. Vibes Only.</p>
          <div className="flex gap-6 text-sm text-slate-muted">
            <Link to="/how-it-works" className="hover:text-coral transition-colors">How it works</Link>
            <span className="cursor-pointer hover:text-coral transition-colors">Privacy</span>
            <span className="cursor-pointer hover:text-coral transition-colors">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
