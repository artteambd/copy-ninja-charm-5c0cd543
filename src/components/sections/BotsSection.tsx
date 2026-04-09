import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, ShoppingCart, Zap, Shield, Check, Users, Sparkles, Crown, ChevronRight, Activity, Target, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { bots, type BotData } from "@/data/bots";

/* ─── Showcase Card ─── */
const ShowcaseCard = ({ bot, index }: { bot: BotData; index: number }) => {
  const navigate = useNavigate();
  const Icon = bot.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className={`relative flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} rounded-[2rem] overflow-hidden border border-border/10 bg-card/60 backdrop-blur-2xl hover:border-border/30 transition-all duration-700`}>
        {/* Hover glow */}
        <div className={`absolute -inset-px rounded-[2rem] bg-gradient-to-br ${bot.accent} opacity-0 group-hover:opacity-40 transition-opacity duration-700 blur-sm -z-10`} />

        {/* Image Panel */}
        <div className="relative lg:w-[45%] h-72 lg:h-[420px] overflow-hidden">
          <img
            src={bot.image}
            alt={bot.name}
            loading="lazy"
            className="w-full h-full object-cover scale-[1.05] group-hover:scale-100 transition-transform duration-[1200ms] ease-out"
          />
          <div className={`absolute inset-0 ${isEven ? "bg-gradient-to-r" : "bg-gradient-to-l"} from-transparent via-transparent to-card`} />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent lg:from-transparent" />

          {/* Floating tag */}
          <div className="absolute top-5 left-5 flex flex-col gap-2">
            {bot.tag && (
              <motion.span
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="font-orbitron text-[8px] tracking-[0.35em] px-4 py-2 rounded-full bg-background/50 backdrop-blur-xl text-foreground border border-border/20 inline-flex items-center gap-1.5 w-fit shadow-lg"
              >
                <Crown size={10} className="text-amber-400" />
                {bot.tag}
              </motion.span>
            )}
          </div>

          {/* Bottom overlay info */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/40 backdrop-blur-xl border border-border/10">
              <Activity size={10} className="text-emerald-400 animate-pulse" />
              <span className="text-[8px] font-orbitron tracking-wider text-muted-foreground">LIVE · ACTIVE NOW</span>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={11} className="fill-amber-400 text-amber-400 drop-shadow-sm" />
              ))}
            </div>
          </div>
        </div>

        {/* Content Panel */}
        <div className="lg:w-[55%] p-8 lg:p-10 flex flex-col justify-center">
          {/* Title row */}
          <div className="flex items-start gap-4 mb-5">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${bot.accent} flex items-center justify-center border border-border/10 shadow-xl shrink-0`}
            >
              <Icon size={24} className="text-foreground" />
            </motion.div>
            <div>
              <h3 className="font-orbitron text-lg lg:text-xl tracking-[0.15em] text-foreground leading-tight">
                {bot.name}
              </h3>
              <p className="text-[10px] font-orbitron tracking-wider text-muted-foreground mt-1.5">
                PRO TRADING TOOL · v3.0
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-[1.8] mb-6 max-w-md">{bot.desc}</p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {bot.results.map((r, ri) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + ri * 0.08 }}
                className="relative rounded-2xl overflow-hidden py-4 px-3 text-center group/stat cursor-default"
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${bot.accent} opacity-10 group-hover/stat:opacity-25 transition-opacity duration-500`} />
                <div className="absolute inset-[1px] rounded-[15px] bg-card/80" />
                <div className="relative z-10">
                  <p className="font-orbitron text-lg text-foreground font-bold">{r.value}</p>
                  <p className="text-[7px] font-orbitron tracking-[0.2em] text-muted-foreground mt-1 uppercase">{r.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feature chips */}
          <div className="flex flex-wrap gap-2 mb-7">
            {bot.features.map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1.5 text-[9px] font-orbitron tracking-[0.15em] px-3.5 py-2 rounded-full bg-secondary/20 text-muted-foreground border border-border/10 hover:border-border/30 hover:text-foreground transition-all duration-300"
              >
                <Check size={9} className="text-emerald-400" />
                {f}
              </span>
            ))}
          </div>

          {/* Price + CTA */}
          <div className="flex items-center gap-6">
            <div>
              <div className="flex items-baseline gap-2.5">
                <span className="font-orbitron text-3xl lg:text-4xl text-foreground font-bold">${bot.price}</span>
                <span className="text-sm text-muted-foreground line-through">${Math.round(bot.price * 1.5)}</span>
                <span className="text-[9px] font-orbitron tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/15">
                  SAVE ${Math.round(bot.price * 0.5)}
                </span>
              </div>
              <span className="text-[8px] font-orbitron tracking-[0.2em] text-muted-foreground mt-1 block">ONE-TIME PAYMENT</span>
            </div>

            <button
              onClick={() => navigate(`/bot/${bot.slug}`)}
              data-interactive
              className={`ml-auto relative px-8 py-4 rounded-2xl font-orbitron text-[10px] tracking-[0.25em] text-foreground overflow-hidden group/btn`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${bot.accent} opacity-50 group-hover/btn:opacity-100 transition-opacity duration-500`} />
              <div className="absolute inset-[1px] rounded-[15px] bg-card/70 group-hover/btn:bg-card/20 transition-colors duration-500" />
              <span className="relative z-10 flex items-center gap-2.5">
                <ShoppingCart size={14} />
                VIEW & BUY
                <ArrowRight size={14} className="group-hover/btn:translate-x-1.5 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Main Section ─── */
const BotsSection = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "ALL PRODUCTS", count: bots.length },
    { id: "bots", label: "AI BOTS", count: 1 },
    { id: "signals", label: "SIGNALS", count: 3 },
    { id: "tools", label: "TOOLS", count: 1 },
  ];

  const filteredBots = activeTab === "all" ? bots :
    activeTab === "bots" ? bots.filter(b => b.slug.includes("artrix")) :
    activeTab === "signals" ? bots.filter(b => b.slug.includes("signal") || b.slug.includes("veltrix")) :
    bots.filter(b => b.slug.includes("checker"));

  return (
    <section className="min-h-screen pt-28 pb-28 px-5 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-blue-500/[0.03] to-transparent pointer-events-none" />
      <div className="absolute top-40 -left-40 w-[600px] h-[600px] bg-purple-500/[0.04] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-40 -right-40 w-[600px] h-[600px] bg-emerald-500/[0.04] rounded-full blur-[180px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 mb-8 bg-secondary/20 border border-border/10"
        >
          <Sparkles size={12} className="text-amber-400" />
          <span className="font-orbitron text-[9px] tracking-[0.5em] text-muted-foreground">PREMIUM ARSENAL</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="font-orbitron text-4xl md:text-6xl gradient-text mb-6 leading-[1.1]"
        >
          CHOOSE YOUR<br />
          <span className="text-foreground">TRADING EDGE</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-sm tracking-wider max-w-lg mx-auto leading-relaxed mb-10"
        >
          Precision-engineered tools for serious traders.
          Every product is verified, tested, and backed by real results.
        </motion.p>

        {/* Trust metrics */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          {[
            { icon: Target, value: "87.3%", label: "Win Rate" },
            { icon: Users, value: "1,200+", label: "Active Users" },
            { icon: Shield, value: "100%", label: "Verified" },
            { icon: Clock, value: "24/7", label: "Support" },
          ].map(({ icon: I, value, label }) => (
            <div key={label} className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-card/40 border border-border/10 backdrop-blur-sm">
              <I size={16} className="text-emerald-400" />
              <div className="text-left">
                <p className="font-orbitron text-sm text-foreground font-bold">{value}</p>
                <p className="text-[8px] font-orbitron tracking-[0.2em] text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center gap-1 p-1.5 rounded-2xl bg-card/40 border border-border/10 backdrop-blur-sm"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-interactive
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-5 py-2.5 rounded-xl font-orbitron text-[9px] tracking-[0.2em] transition-all duration-300 ${
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-secondary/40 border border-border/20 rounded-xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab.label}
                <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-foreground/5 text-muted-foreground">{tab.count}</span>
              </span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Bot Showcase */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-5xl mx-auto relative z-10 flex flex-col gap-8"
        >
          {filteredBots.map((bot, i) => (
            <ShowcaseCard key={bot.slug} bot={bot} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="max-w-5xl mx-auto mt-16 text-center relative z-10"
      >
        <div className="inline-flex flex-col items-center gap-4 p-8 rounded-3xl bg-card/30 border border-border/10 backdrop-blur-sm">
          <Zap size={20} className="text-amber-400" />
          <p className="font-orbitron text-[11px] tracking-[0.25em] text-muted-foreground">
            NEED HELP CHOOSING? <span className="text-foreground">CONTACT US</span> FOR PERSONALIZED RECOMMENDATIONS
          </p>
          <div className="flex items-center gap-1.5 text-[9px] font-orbitron tracking-wider text-emerald-400">
            <ChevronRight size={10} />
            INSTANT ACTIVATION AFTER PURCHASE
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default BotsSection;
