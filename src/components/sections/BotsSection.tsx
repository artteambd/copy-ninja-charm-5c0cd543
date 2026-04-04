import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Star, Eye, ShoppingCart, TrendingUp, Zap, Shield, ChevronDown, Grid3X3, LayoutList, Flame, Check, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { bots, type BotData } from "@/data/bots";

/* ─── Featured Hero Card (first bot) ─── */
const FeaturedCard = ({ bot }: { bot: BotData }) => {
  const navigate = useNavigate();
  const Icon = bot.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="group relative rounded-3xl overflow-hidden mb-10"
    >
      {/* Glow border */}
      <div className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-r ${bot.accent} opacity-40 group-hover:opacity-70 transition-opacity duration-700 blur-sm`} />

      <div className="relative rounded-3xl bg-card/90 backdrop-blur-xl border border-border/10 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Image side */}
          <div className="relative lg:w-1/2 h-64 lg:h-auto overflow-hidden">
            <img src={bot.image} alt={bot.name} className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card lg:bg-gradient-to-r lg:from-transparent lg:to-card" />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent lg:from-transparent" />

            {bot.tag && (
              <div className="absolute top-5 left-5 flex items-center gap-1.5">
                <span className="font-orbitron text-[8px] tracking-[0.3em] px-4 py-2 rounded-full bg-background/70 backdrop-blur-md text-foreground border border-border/20">
                  <Flame size={10} className="inline mr-1.5 -mt-0.5 text-amber-400" />{bot.tag}
                </span>
                <span className="font-orbitron text-[8px] tracking-wider px-3 py-2 rounded-full bg-emerald-500/15 backdrop-blur-md text-emerald-400 border border-emerald-500/20">
                  BEST SELLER
                </span>
              </div>
            )}
          </div>

          {/* Content side */}
          <div className="lg:w-1/2 p-8 lg:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${bot.accent} flex items-center justify-center border border-border/10`}>
                <Icon size={22} className="text-foreground" />
              </div>
              <div>
                <h3 className="font-orbitron text-lg tracking-[0.15em] text-foreground">{bot.name}</h3>
                <div className="flex items-center gap-1.5 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={11} className="fill-amber-400 text-amber-400" />)}
                  <span className="text-[10px] text-muted-foreground ml-1">(128 reviews)</span>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed mb-6">{bot.desc}</p>

            {/* Stats grid */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {bot.results.map((r) => (
                <div key={r.label} className="relative rounded-xl overflow-hidden text-center py-3">
                  <div className={`absolute inset-0 bg-gradient-to-b ${bot.accent} opacity-15`} />
                  <div className="absolute inset-[1px] rounded-[10px] bg-card/90" />
                  <div className="relative z-10">
                    <p className="font-orbitron text-base text-foreground">{r.value}</p>
                    <p className="text-[7px] font-orbitron tracking-[0.15em] text-muted-foreground mt-0.5">{r.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Price + CTA row */}
            <div className="flex items-center gap-5">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-orbitron text-3xl text-foreground">${bot.price}</span>
                  <span className="text-sm text-muted-foreground line-through">${Math.round(bot.price * 1.5)}</span>
                </div>
                <span className="text-[9px] font-orbitron tracking-wider text-emerald-400">SAVE ${Math.round(bot.price * 0.5)}</span>
              </div>
              <button onClick={() => navigate(`/bot/${bot.slug}`)} data-interactive
                className="flex-1 relative py-4 rounded-2xl font-orbitron text-[11px] tracking-[0.25em] text-foreground overflow-hidden group/btn">
                <div className={`absolute inset-0 bg-gradient-to-r ${bot.accent} opacity-60 group-hover/btn:opacity-100 transition-opacity duration-300`} />
                <div className="absolute inset-[1px] rounded-[15px] bg-card/80 group-hover/btn:bg-card/50 transition-colors duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <ShoppingCart size={14} /> VIEW & BUY
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Tilt Card ─── */
const TiltCard = ({ bot, index, layout }: { bot: BotData; index: number; layout: "grid" | "list" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [hovered, setHovered] = useState(false);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => { x.set(0); y.set(0); setHovered(false); };

  const Icon = bot.icon;

  /* ─── List Layout ─── */
  if (layout === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ delay: index * 0.08, duration: 0.5 }}
        className="group"
      >
        <div className="relative rounded-2xl overflow-hidden">
          <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r ${bot.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]`} />
          <div className="relative rounded-2xl bg-card/80 backdrop-blur-xl border border-border/10 p-5 flex flex-col md:flex-row gap-6">
            <div className="relative w-full md:w-56 h-40 md:h-auto rounded-xl overflow-hidden shrink-0">
              <img src={bot.image} alt={bot.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/60" />
              {bot.tag && (
                <span className="absolute top-2 left-2 font-orbitron text-[7px] tracking-[0.3em] px-2.5 py-1 rounded-full bg-background/70 backdrop-blur-md text-foreground border border-border/20">
                  <Sparkles size={8} className="inline mr-1 -mt-0.5" />{bot.tag}
                </span>
              )}
            </div>
            <div className="flex-1 flex flex-col justify-between min-w-0">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${bot.accent} flex items-center justify-center border border-border/10`}>
                    <Icon size={16} className="text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-orbitron text-xs tracking-[0.15em] text-foreground">{bot.name}</h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={8} className="fill-amber-400 text-amber-400" />)}
                      <span className="text-[8px] text-muted-foreground ml-1">4.9</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">{bot.desc}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {bot.results.map((r) => (
                    <span key={r.label} className="text-[9px] font-orbitron tracking-wider px-2.5 py-1 rounded-lg bg-secondary/30 border border-border/10 text-foreground">
                      {r.label}: <span className="text-emerald-400">{r.value}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-orbitron text-xl text-foreground">${bot.price}</span>
                  <span className="text-[10px] text-muted-foreground line-through">${Math.round(bot.price * 1.5)}</span>
                </div>
                <button onClick={() => navigate(`/bot/${bot.slug}`)} data-interactive
                  className="ml-auto flex items-center gap-2 px-5 py-2.5 rounded-xl font-orbitron text-[9px] tracking-[0.2em] glass border border-border/20 hover:border-border/40 text-foreground transition-all group/btn">
                  VIEW & BUY <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  /* ─── Grid Layout ─── */
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="perspective-[1200px]"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative rounded-3xl overflow-hidden"
      >
        {/* Animated border glow */}
        <div className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-br ${bot.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[1px]`} />

        <div className="relative rounded-3xl bg-card/80 backdrop-blur-xl border border-border/10 overflow-hidden">
          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            <img src={bot.image} alt={bot.name} loading="lazy" width={800} height={512}
              className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

            {/* Scan line effect on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(transparent 50%, hsla(0,0%,100%,0.02) 50%)", backgroundSize: "100% 4px" }}
              animate={hovered ? { opacity: [0, 0.5, 0] } : { opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Tag */}
            {bot.tag && (
              <motion.span initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="absolute top-3 right-3 font-orbitron text-[7px] tracking-[0.3em] px-3 py-1.5 rounded-full bg-background/60 backdrop-blur-md text-foreground border border-border/20">
                <Sparkles size={9} className="inline mr-1.5 -mt-0.5" />{bot.tag}
              </motion.span>
            )}

            {/* Price overlay */}
            <div className="absolute bottom-3 left-4">
              <div className="flex items-center gap-2">
                <span className="font-orbitron text-2xl text-foreground drop-shadow-lg">${bot.price}</span>
                <span className="text-xs text-muted-foreground line-through">${Math.round(bot.price * 1.5)}</span>
                <span className="text-[8px] font-orbitron tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">-33%</span>
              </div>
            </div>

            <div className="absolute bottom-3 right-4 flex items-center gap-1 text-[9px] text-muted-foreground">
              <Eye size={10} /> 47
            </div>
          </div>

          {/* Content */}
          <div className="p-5 pt-3">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${bot.accent} flex items-center justify-center border border-border/10 group-hover:shadow-lg transition-shadow duration-500`}>
                <Icon size={18} className="text-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-orbitron text-[11px] tracking-[0.15em] text-foreground">{bot.name}</h3>
                <div className="flex items-center gap-1 mt-0.5">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={8} className="fill-amber-400 text-amber-400" />)}
                  <span className="text-[8px] text-muted-foreground ml-1">(128)</span>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground text-[11px] leading-relaxed mb-4 line-clamp-2">{bot.desc}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {bot.results.slice(0, 2).map((r) => (
                <div key={r.label} className="relative rounded-xl overflow-hidden text-center py-3">
                  <div className={`absolute inset-0 bg-gradient-to-b ${bot.accent} opacity-15`} />
                  <div className="absolute inset-[1px] rounded-[10px] bg-card/90" />
                  <div className="relative z-10">
                    <p className="font-orbitron text-sm text-foreground">{r.value}</p>
                    <p className="text-[7px] font-orbitron tracking-[0.15em] text-muted-foreground mt-0.5">{r.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {bot.features.map((f) => (
                <span key={f} className="inline-flex items-center gap-1 text-[8px] font-orbitron tracking-wider px-2 py-1 rounded-full bg-secondary/30 text-muted-foreground border border-border/10">
                  <Check size={7} className="text-emerald-400" />{f}
                </span>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => navigate(`/bot/${bot.slug}`)}
              data-interactive
              className="relative w-full py-3.5 rounded-xl font-orbitron text-[10px] tracking-[0.25em] text-foreground overflow-hidden group/btn transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${bot.accent} opacity-50 group-hover/btn:opacity-100 transition-opacity duration-300`} />
              <div className="absolute inset-[1px] rounded-[11px] bg-card/90 group-hover/btn:bg-card/50 transition-colors duration-300" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <ShoppingCart size={12} />
                VIEW & BUY
                <motion.span className="inline-block" animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
                  <ArrowRight size={13} />
                </motion.span>
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const sortOptions = ["Popular", "Price: Low", "Price: High", "Newest"];

const BotsSection = () => {
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("Popular");
  const [showSort, setShowSort] = useState(false);

  const sortedBots = [...bots].sort((a, b) => {
    if (sortBy === "Price: Low") return a.price - b.price;
    if (sortBy === "Price: High") return b.price - a.price;
    return 0;
  });

  const featuredBot = sortedBots[0];
  const remainingBots = sortedBots.slice(1);

  return (
    <section className="min-h-screen pt-32 pb-24 px-6 relative">
      {/* Background */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/3 rounded-full blur-[200px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-14 relative z-10">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-orbitron text-[9px] tracking-[0.4em] text-muted-foreground">PREMIUM COLLECTION</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
          className="font-orbitron text-4xl md:text-5xl gradient-text mb-5 leading-tight">
          TRADING BOTS & SIGNALS
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-muted-foreground text-sm tracking-wider max-w-lg mx-auto leading-relaxed mb-10">
          Precision-engineered tools built for serious traders.<br />Select your edge in the market.
        </motion.p>

        {/* Trust bar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="inline-flex flex-wrap justify-center gap-4 glass rounded-2xl px-6 py-3">
          {[
            { icon: TrendingUp, label: "87.3% Win Rate", color: "text-emerald-400" },
            { icon: Users, label: "1,200+ Traders", color: "text-blue-400" },
            { icon: Zap, label: "Real-Time Signals", color: "text-amber-400" },
            { icon: Shield, label: "Verified & Secure", color: "text-purple-400" },
            { icon: Clock, label: "24H Activation", color: "text-rose-400" },
          ].map(({ icon: I, label, color }, idx) => (
            <div key={label} className="flex items-center gap-2 text-xs text-muted-foreground">
              {idx > 0 && <span className="w-px h-3 bg-border/30 mr-2 hidden sm:block" />}
              <I size={13} className={color} />
              <span className="font-orbitron text-[9px] tracking-wider">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Featured Bot */}
      <div className="max-w-6xl mx-auto relative z-10">
        <FeaturedCard bot={featuredBot} />
      </div>

      {/* Toolbar */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="max-w-6xl mx-auto flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <span className="font-orbitron text-[10px] tracking-wider text-muted-foreground">{remainingBots.length} MORE PRODUCTS</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Sort */}
          <div className="relative">
            <button data-interactive onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg glass text-[10px] font-orbitron tracking-wider text-muted-foreground hover:text-foreground transition-colors">
              {sortBy} <ChevronDown size={11} className={`transition-transform ${showSort ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {showSort && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                  className="absolute right-0 top-full mt-1 glass-strong rounded-xl overflow-hidden z-30 min-w-[140px]">
                  {sortOptions.map((opt) => (
                    <button key={opt} data-interactive onClick={() => { setSortBy(opt); setShowSort(false); }}
                      className={`block w-full text-left px-4 py-2.5 text-[10px] font-orbitron tracking-wider transition-colors ${
                        sortBy === opt ? "text-foreground bg-secondary/30" : "text-muted-foreground hover:text-foreground hover:bg-secondary/20"
                      }`}>
                      {opt}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Layout toggle */}
          <div className="flex items-center glass rounded-lg overflow-hidden">
            <button data-interactive onClick={() => setLayout("grid")}
              className={`p-2 transition-colors ${layout === "grid" ? "text-foreground bg-secondary/40" : "text-muted-foreground hover:text-foreground"}`}>
              <Grid3X3 size={14} />
            </button>
            <button data-interactive onClick={() => setLayout("list")}
              className={`p-2 transition-colors ${layout === "list" ? "text-foreground bg-secondary/40" : "text-muted-foreground hover:text-foreground"}`}>
              <LayoutList size={14} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Bot Cards */}
      <AnimatePresence mode="wait">
        <motion.div key={layout} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
          className={`max-w-6xl mx-auto relative z-10 ${
            layout === "grid" ? "grid md:grid-cols-2 lg:grid-cols-4 gap-5" : "flex flex-col gap-4"
          }`}>
          {remainingBots.map((bot, i) => (
            <TiltCard key={bot.name} bot={bot} index={i} layout={layout} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default BotsSection;
