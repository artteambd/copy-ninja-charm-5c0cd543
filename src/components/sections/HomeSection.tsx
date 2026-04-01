import { motion } from "framer-motion";
import { Shield, Zap, TrendingUp, Lock, BarChart3, Users, Globe, ArrowRight } from "lucide-react";
import type { Page } from "../Navbar";

interface HomeSectionProps {
  onNavigate: (page: Page) => void;
}

const badges = [
  { icon: Shield, label: "Encrypted Signals" },
  { icon: Zap, label: "Real-Time Execution" },
  { icon: TrendingUp, label: "Proven Results" },
  { icon: Lock, label: "Secure Payments" },
];

const features = [
  {
    icon: BarChart3,
    title: "AI-Powered Analysis",
    desc: "Our proprietary algorithms analyze thousands of data points in real-time to deliver precision signals with unmatched accuracy.",
  },
  {
    icon: Users,
    title: "1,200+ Active Traders",
    desc: "Join a growing community of professional traders who trust ART SOFTWARES for consistent, reliable market intelligence.",
  },
  {
    icon: Globe,
    title: "Global Market Coverage",
    desc: "From crypto futures to spot trading — our bots operate 24/7 across every major exchange worldwide.",
  },
];

const liveStats = [
  { value: "87.3%", label: "Win Rate" },
  { value: "$2.4M+", label: "Total Profits Generated" },
  { value: "4,821", label: "Signals Delivered" },
  { value: "24/7", label: "Bot Uptime" },
];

const HomeSection = ({ onNavigate }: HomeSectionProps) => (
  <div className="relative">
    {/* HERO */}
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative">
      {/* Radial glow behind title */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-accent/10 to-transparent rounded-full blur-3xl animate-pulse-glow pointer-events-none" />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-orbitron text-[10px] tracking-[0.5em] text-muted-foreground mb-6"
      >
        Elite Trading Technology
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold gradient-text mb-4"
      >
        ART SOFTWARES
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-muted-foreground text-lg md:text-xl max-w-xl mb-2"
      >
        Elite AI Trading Signals & Bots
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="font-orbitron text-[10px] tracking-[0.4em] text-art-grey-500 mb-10"
      >
        PRECISION · PROFIT · POWER
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <button
          onClick={() => onNavigate("BOTS")}
          data-interactive
          className="glass magnetic-hover px-10 py-4 font-orbitron text-sm tracking-widest text-foreground rounded-lg flex items-center justify-center gap-3 group"
        >
          BROWSE BOTS
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <button
          onClick={() => onNavigate("RESULTS")}
          data-interactive
          className="magnetic-hover px-10 py-4 font-orbitron text-sm tracking-widest text-muted-foreground rounded-lg border border-border/30 hover:border-border/60 transition-colors"
        >
          VIEW RESULTS
        </button>
      </motion.div>

      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mt-16 flex flex-wrap justify-center gap-6"
      >
        {badges.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-muted-foreground text-xs">
            <Icon size={14} />
            <span className="font-orbitron tracking-wider text-[10px]">{label}</span>
          </div>
        ))}
      </motion.div>
    </section>

    {/* LIVE STATS BAR */}
    <section className="py-12 px-6 border-y border-border/20">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {liveStats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <p className="font-orbitron text-2xl md:text-3xl text-foreground mb-1">{s.value}</p>
            <p className="text-muted-foreground text-xs tracking-wider">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* FEATURES */}
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="font-orbitron text-2xl md:text-3xl gradient-text mb-4">WHY ART SOFTWARES</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Built by traders, for traders. Every tool is engineered for one purpose — your edge in the market.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass rounded-2xl p-8 magnetic-hover"
          >
            <f.icon size={28} className="text-art-grey-600 mb-4" />
            <h3 className="font-orbitron text-sm tracking-wider mb-3">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* CTA BANNER */}
    <section className="py-24 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />
      <h3 className="font-orbitron text-xl md:text-2xl gradient-text mb-4 relative z-10">READY TO TRADE SMARTER?</h3>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto relative z-10">
        Get started with our AI-powered bots and join thousands of profitable traders worldwide.
      </p>
      <button
        onClick={() => onNavigate("BOTS")}
        data-interactive
        className="glass magnetic-hover px-10 py-4 font-orbitron text-sm tracking-widest text-foreground rounded-lg relative z-10 inline-flex items-center gap-3 group"
      >
        GET STARTED
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </section>
  </div>
);

export default HomeSection;
