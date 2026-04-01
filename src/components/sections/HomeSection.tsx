import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Shield, Zap, TrendingUp, Lock, BarChart3, Users, Globe, ArrowRight, Activity, Cpu, Target, Clock, Rocket, ChevronRight } from "lucide-react";
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
  { value: 87.3, suffix: "%", label: "Win Rate" },
  { value: 2.4, prefix: "$", suffix: "M+", label: "Total Profits Generated" },
  { value: 4821, suffix: "", label: "Signals Delivered" },
  { value: null, display: "24/7", label: "Bot Uptime" },
];

const tickerItems = [
  { pair: "BTC/USDT", change: "+3.42%", positive: true },
  { pair: "ETH/USDT", change: "+1.87%", positive: true },
  { pair: "SOL/USDT", change: "+5.21%", positive: true },
  { pair: "BNB/USDT", change: "-0.34%", positive: false },
  { pair: "XRP/USDT", change: "+2.15%", positive: true },
  { pair: "ADA/USDT", change: "+0.98%", positive: true },
  { pair: "DOGE/USDT", change: "+4.56%", positive: true },
  { pair: "AVAX/USDT", change: "-1.12%", positive: false },
];

/* Animated counter hook */
const AnimatedCounter = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    value < 100 ? v.toFixed(1) : Math.round(v).toLocaleString()
  );
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const unsub = rounded.on("change", setDisplay);
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    return () => { unsub(); controls.stop(); };
  }, [value, count, rounded]);

  return <span>{prefix}{display}{suffix}</span>;
};

const HomeSection = ({ onNavigate }: HomeSectionProps) => (
  <div className="relative">
    {/* SCROLLING TICKER */}
    <div className="relative overflow-hidden border-b border-border/20 py-2">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...tickerItems, ...tickerItems].map((t, i) => (
          <span key={i} className="flex items-center gap-2 font-orbitron text-[10px] tracking-wider">
            <Activity size={10} className="text-muted-foreground" />
            <span className="text-muted-foreground">{t.pair}</span>
            <span className={t.positive ? "text-emerald-400" : "text-red-400"}>{t.change}</span>
          </span>
        ))}
      </motion.div>
    </div>

    {/* HERO */}
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-accent/10 to-transparent rounded-full blur-3xl animate-pulse-glow pointer-events-none" />

      {/* Orbiting rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-border/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-muted-foreground/40" />
        </motion.div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          className="w-[220px] h-[220px] md:w-[380px] md:h-[380px] rounded-full border border-border/5"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
        </motion.div>
      </div>

      {/* Status indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="font-orbitron text-[9px] tracking-[0.4em] text-muted-foreground">SYSTEMS ONLINE</span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-orbitron text-[10px] tracking-[0.5em] text-muted-foreground mb-6"
      >
        Elite Trading Technology
      </motion.p>

      {/* Glitch title effect */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative mb-4"
      >
        <h1 className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold gradient-text relative z-10">
          ART SOFTWARES
        </h1>
        <h1 className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold text-foreground/5 absolute inset-0 translate-x-[2px] translate-y-[2px]" aria-hidden>
          ART SOFTWARES
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-muted-foreground text-lg md:text-xl max-w-xl mb-2"
      >
        Elite AI Trading Signals & Bots
      </motion.p>

      {/* Typing effect tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex items-center gap-2 mb-10"
      >
        <span className="font-orbitron text-[10px] tracking-[0.4em] text-art-grey-500">
          PRECISION · PROFIT · POWER
        </span>
        <motion.span
          className="inline-block w-[2px] h-3 bg-muted-foreground"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <button
          onClick={() => onNavigate("BOTS")}
          data-interactive
          className="glass magnetic-hover px-10 py-4 font-orbitron text-sm tracking-widest text-foreground rounded-lg flex items-center justify-center gap-3 group relative overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
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

    {/* LIVE STATS BAR with animated counters */}
    <section className="py-12 px-6 border-y border-border/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent pointer-events-none" />
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {liveStats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative"
          >
            <p className="font-orbitron text-2xl md:text-3xl text-foreground mb-1">
              {s.value !== null ? (
                <AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              ) : (
                s.display
              )}
            </p>
            <p className="text-muted-foreground text-xs tracking-wider">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* MARQUEE LOGOS / EXCHANGES */}
    <section className="py-10 border-b border-border/20 overflow-hidden">
      <p className="text-center font-orbitron text-[10px] tracking-[0.5em] text-muted-foreground mb-6">
        SUPPORTED EXCHANGES
      </p>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
        <motion.div
          className="flex gap-12 items-center whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(2)].flatMap((_, setIdx) =>
            ["BINANCE", "BYBIT", "OKX", "KUCOIN", "GATE.IO", "MEXC", "BITGET", "HTX"].map((name, i) => (
              <span
                key={`${setIdx}-${i}`}
                className="font-orbitron text-sm tracking-[0.3em] text-muted-foreground/40 hover:text-muted-foreground transition-colors"
              >
                {name}
              </span>
            ))
          )}
        </motion.div>
      </div>
    </section>

    {/* FEATURES */}
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <Cpu size={16} className="text-muted-foreground" />
          <span className="font-orbitron text-[10px] tracking-[0.5em] text-muted-foreground">CORE TECHNOLOGY</span>
          <Cpu size={16} className="text-muted-foreground" />
        </motion.div>
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
            className="glass rounded-2xl p-8 magnetic-hover group relative overflow-hidden"
          >
            {/* Hover shine */}
            <span className="absolute inset-0 bg-gradient-to-br from-foreground/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl glass-strong flex items-center justify-center mb-4">
                <f.icon size={22} className="text-art-grey-600" />
              </div>
              <h3 className="font-orbitron text-sm tracking-wider mb-3">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* HOW IT WORKS — TIMELINE */}
    <section className="py-24 px-6 border-y border-border/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Rocket size={16} className="text-muted-foreground" />
          <span className="font-orbitron text-[10px] tracking-[0.5em] text-muted-foreground">GET STARTED IN MINUTES</span>
        </div>
        <h2 className="font-orbitron text-2xl md:text-3xl gradient-text text-center mb-16">HOW IT WORKS</h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border/40 to-transparent md:-translate-x-px" />

          {[
            { step: "01", icon: Target, title: "Choose Your Bot", desc: "Browse our collection of AI-powered trading bots, each optimized for different strategies and markets.", delay: 0 },
            { step: "02", icon: Lock, title: "Secure Payment", desc: "Complete your purchase via Binance Pay — encrypted, instant, and hassle-free.", delay: 0.15 },
            { step: "03", icon: Clock, title: "Activation in 24H", desc: "Our team configures and activates your bot within 24 hours. You'll receive full access credentials.", delay: 0.3 },
            { step: "04", icon: TrendingUp, title: "Start Profiting", desc: "Sit back and watch your bot execute precision trades 24/7 across global markets.", delay: 0.45 },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: item.delay, duration: 0.5 }}
              className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } flex-row`}
            >
              {/* Node dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-muted border-2 border-border z-10 mt-6" />

              {/* Content card */}
              <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:ml-auto"}`}>
                <div className="glass rounded-2xl p-6 group magnetic-hover relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-br from-foreground/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className={`relative z-10 ${i % 2 === 0 ? "md:flex md:flex-col md:items-end" : ""}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-orbitron text-[10px] tracking-[0.3em] text-muted-foreground">{item.step}</span>
                      <div className="w-8 h-8 rounded-lg glass-strong flex items-center justify-center">
                        <item.icon size={16} className="text-art-grey-600" />
                      </div>
                    </div>
                    <h3 className="font-orbitron text-sm tracking-wider mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={() => onNavigate("BOTS")}
            data-interactive
            className="glass magnetic-hover px-8 py-3 font-orbitron text-[11px] tracking-widest text-foreground rounded-lg inline-flex items-center gap-2 group relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            START NOW
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>

    {/* CTA BANNER */}
    <section className="py-24 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <h3 className="font-orbitron text-xl md:text-2xl gradient-text mb-4">READY TO TRADE SMARTER?</h3>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Get started with our AI-powered bots and join thousands of profitable traders worldwide.
        </p>
        <button
          onClick={() => onNavigate("BOTS")}
          data-interactive
          className="glass magnetic-hover px-10 py-4 font-orbitron text-sm tracking-widest text-foreground rounded-lg inline-flex items-center gap-3 group relative overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          GET STARTED
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </section>
  </div>
);

export default HomeSection;
