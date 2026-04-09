import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, ShoppingCart, Zap, Shield, Check, Users, Sparkles, Crown, ChevronRight, Activity, Target, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { bots, type BotData } from "@/data/bots";

/* ─── Product Card (works for all screen sizes) ─── */
const ProductCard = ({ bot, index }: { bot: BotData; index: number }) => {
  const navigate = useNavigate();
  const Icon = bot.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-border/10 bg-card/60 backdrop-blur-xl hover:border-border/25 transition-all duration-500">
        {/* Hover glow */}
        <div className={`absolute -inset-px rounded-2xl sm:rounded-3xl bg-gradient-to-br ${bot.accent} opacity-0 group-hover:opacity-30 transition-opacity duration-700 blur-sm -z-10`} />

        {/* Image */}
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
          <img
            src={bot.image}
            alt={bot.name}
            loading="lazy"
            className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

          {/* Tags */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-col gap-1.5">
            {bot.tag && (
              <span className="font-orbitron text-[7px] sm:text-[8px] tracking-[0.3em] px-3 py-1.5 rounded-full bg-background/50 backdrop-blur-xl text-foreground border border-border/20 inline-flex items-center gap-1 w-fit">
                <Crown size={9} className="text-amber-400" />
                {bot.tag}
              </span>
            )}
            <span className="font-orbitron text-[7px] tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 backdrop-blur-md text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1 w-fit">
              <Check size={7} /> VERIFIED
            </span>
          </div>

          {/* Price badge */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
            <div className="flex items-baseline gap-2">
              <span className="font-orbitron text-xl sm:text-2xl text-foreground font-bold drop-shadow-lg">${bot.price}</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground line-through">${Math.round(bot.price * 1.5)}</span>
            </div>
          </div>

          {/* Live indicator */}
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/40 backdrop-blur-xl border border-border/10">
            <Activity size={8} className="text-emerald-400 animate-pulse" />
            <span className="text-[7px] font-orbitron tracking-wider text-muted-foreground">LIVE</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 md:p-6">
          {/* Title */}
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${bot.accent} flex items-center justify-center border border-border/10 shrink-0`}>
              <Icon size={18} className="text-foreground" />
            </div>
            <div className="min-w-0">
              <h3 className="font-orbitron text-[11px] sm:text-xs tracking-[0.12em] text-foreground truncate">{bot.name}</h3>
              <div className="flex items-center gap-1 mt-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={9} className="fill-amber-400 text-amber-400" />
                ))}
                <span className="text-[8px] text-muted-foreground ml-1">(128)</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-[11px] sm:text-xs leading-relaxed mb-4 line-clamp-2">{bot.desc}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {bot.results.slice(0, 2).map((r) => (
              <div key={r.label} className="relative rounded-xl overflow-hidden text-center py-2.5 sm:py-3">
                <div className={`absolute inset-0 bg-gradient-to-b ${bot.accent} opacity-10`} />
                <div className="absolute inset-[1px] rounded-[10px] bg-card/80" />
                <div className="relative z-10">
                  <p className="font-orbitron text-sm sm:text-base text-foreground font-bold">{r.value}</p>
                  <p className="text-[6px] sm:text-[7px] font-orbitron tracking-[0.15em] text-muted-foreground mt-0.5 uppercase">{r.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {bot.features.map((f) => (
              <span key={f} className="inline-flex items-center gap-1 text-[7px] sm:text-[8px] font-orbitron tracking-wider px-2 sm:px-2.5 py-1 rounded-full bg-secondary/20 text-muted-foreground border border-border/10">
                <Check size={7} className="text-emerald-400" />{f}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate(`/bot/${bot.slug}`)}
            data-interactive
            className="relative w-full py-3 sm:py-3.5 rounded-xl font-orbitron text-[9px] sm:text-[10px] tracking-[0.2em] text-foreground overflow-hidden group/btn active:scale-[0.98] transition-transform"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${bot.accent} opacity-40 group-hover/btn:opacity-80 transition-opacity duration-300`} />
            <div className="absolute inset-[1px] rounded-[11px] bg-card/80 group-hover/btn:bg-card/40 transition-colors duration-300" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              <ShoppingCart size={12} />
              VIEW & BUY
              <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Tabs ─── */
const tabs = [
  { id: "all", label: "ALL", count: bots.length },
  { id: "bots", label: "AI BOTS", count: 1 },
  { id: "signals", label: "SIGNALS", count: 3 },
  { id: "tools", label: "TOOLS", count: 1 },
];

const BotsSection = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredBots = activeTab === "all" ? bots :
    activeTab === "bots" ? bots.filter(b => b.slug.includes("artrix")) :
    activeTab === "signals" ? bots.filter(b => b.slug.includes("signal") || b.slug.includes("veltrix")) :
    bots.filter(b => b.slug.includes("checker"));

  return (
    <section className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24 md:pb-28 px-4 sm:px-6 relative overflow-hidden">
      {/* Ambient BG */}
      <div className="absolute top-0 left-0 right-0 h-[400px] sm:h-[600px] bg-gradient-to-b from-blue-500/[0.03] to-transparent pointer-events-none" />
      <div className="absolute top-40 -left-40 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-500/[0.04] rounded-full blur-[120px] sm:blur-[180px] pointer-events-none" />
      <div className="absolute bottom-40 -right-40 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-emerald-500/[0.04] rounded-full blur-[120px] sm:blur-[180px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-10 sm:mb-14 md:mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 sm:mb-8 bg-secondary/20 border border-border/10"
        >
          <Sparkles size={11} className="text-amber-400" />
          <span className="font-orbitron text-[8px] sm:text-[9px] tracking-[0.4em] sm:tracking-[0.5em] text-muted-foreground">PREMIUM COLLECTION</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-orbitron text-2xl sm:text-4xl md:text-5xl lg:text-6xl gradient-text mb-4 sm:mb-6 leading-[1.1]"
        >
          CHOOSE YOUR<br />
          <span className="text-foreground">TRADING EDGE</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-xs sm:text-sm tracking-wider max-w-md mx-auto leading-relaxed mb-8 sm:mb-10 px-2"
        >
          Precision-engineered tools for serious traders.
          Every product is verified, tested, and backed by real results.
        </motion.p>

        {/* Trust metrics */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12"
        >
          {[
            { icon: Target, value: "87.3%", label: "Win Rate" },
            { icon: Users, value: "1,200+", label: "Active Users" },
            { icon: Shield, value: "100%", label: "Verified" },
            { icon: Clock, value: "24/7", label: "Support" },
          ].map(({ icon: I, value, label }) => (
            <div key={label} className="flex items-center gap-2.5 sm:gap-3 px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-card/40 border border-border/10 backdrop-blur-sm">
              <I size={14} className="text-emerald-400 shrink-0" />
              <div className="text-left min-w-0">
                <p className="font-orbitron text-xs sm:text-sm text-foreground font-bold">{value}</p>
                <p className="text-[7px] sm:text-[8px] font-orbitron tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center gap-0.5 sm:gap-1 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl bg-card/40 border border-border/10 backdrop-blur-sm overflow-x-auto max-w-full"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-interactive
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-orbitron text-[8px] sm:text-[9px] tracking-[0.15em] sm:tracking-[0.2em] transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="botTab"
                  className="absolute inset-0 bg-secondary/40 border border-border/20 rounded-lg sm:rounded-xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                {tab.label}
                <span className="text-[6px] sm:text-[7px] px-1 sm:px-1.5 py-0.5 rounded-full bg-foreground/5 text-muted-foreground">{tab.count}</span>
              </span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Product Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
        >
          {filteredBots.map((bot, i) => (
            <ProductCard key={bot.slug} bot={bot} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mt-12 sm:mt-16 text-center relative z-10"
      >
        <div className="inline-flex flex-col items-center gap-3 sm:gap-4 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-card/30 border border-border/10 backdrop-blur-sm">
          <Zap size={18} className="text-amber-400" />
          <p className="font-orbitron text-[9px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.25em] text-muted-foreground px-2">
            NEED HELP? <span className="text-foreground">CONTACT US</span> FOR RECOMMENDATIONS
          </p>
          <div className="flex items-center gap-1.5 text-[8px] sm:text-[9px] font-orbitron tracking-wider text-emerald-400">
            <ChevronRight size={9} />
            INSTANT ACTIVATION AFTER PURCHASE
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default BotsSection;
