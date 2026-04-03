import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, ArrowRight, Star, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { bots, type BotData } from "@/data/bots";

const TiltCard = ({ bot, index }: { bot: BotData; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  const Icon = bot.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="perspective-[1200px]"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
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
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />

            {bot.tag && (
              <motion.span initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="absolute top-3 right-3 font-orbitron text-[8px] tracking-[0.3em] px-3 py-1.5 rounded-full bg-background/60 backdrop-blur-md text-foreground border border-border/20">
                <Sparkles size={10} className="inline mr-1.5 -mt-0.5" />
                {bot.tag}
              </motion.span>
            )}

            {/* Price */}
            <div className="absolute bottom-3 left-4">
              <div className="flex items-baseline gap-2">
                <span className="font-orbitron text-2xl text-foreground drop-shadow-lg">${bot.price}</span>
                <span className="text-xs text-muted-foreground line-through">${Math.round(bot.price * 1.5)}</span>
              </div>
            </div>

            <div className="absolute bottom-3 right-4 flex items-center gap-1 text-[9px] text-muted-foreground">
              <Eye size={10} /> 47
            </div>
          </div>

          {/* Content */}
          <div className="p-6 pt-3">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${bot.accent} flex items-center justify-center border border-border/10`}>
                <Icon size={18} className="text-foreground" />
              </div>
              <div>
                <h3 className="font-orbitron text-xs tracking-[0.15em] text-foreground">{bot.name}</h3>
                <div className="flex items-center gap-1 mt-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={8} className="fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-[8px] text-muted-foreground ml-1">(128)</span>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-2">{bot.desc}</p>

            {/* Mini stats */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              {bot.results.slice(0, 2).map((r) => (
                <div key={r.label} className="rounded-xl bg-secondary/30 border border-border/10 px-3 py-2.5 text-center">
                  <p className="font-orbitron text-sm text-foreground">{r.value}</p>
                  <p className="text-[8px] font-orbitron tracking-[0.15em] text-muted-foreground mt-0.5">{r.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => navigate(`/bot/${bot.slug}`)}
              data-interactive
              className="relative w-full py-3.5 rounded-xl font-orbitron text-[10px] tracking-[0.25em] text-foreground overflow-hidden group/btn transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${bot.accent} opacity-60 group-hover/btn:opacity-100 transition-opacity duration-300`} />
              <div className="absolute inset-[1px] rounded-[11px] bg-card/90 group-hover/btn:bg-card/70 transition-colors duration-300" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                VIEW DETAILS
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

const BotsSection = () => {
  return (
    <section className="min-h-screen pt-32 pb-24 px-6 relative">
      <div className="absolute top-40 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center mb-20 relative z-10">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-orbitron text-[9px] tracking-[0.4em] text-muted-foreground">5 TOOLS AVAILABLE</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
          className="font-orbitron text-4xl md:text-5xl gradient-text mb-5 leading-tight">
          TRADING BOTS
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-muted-foreground text-sm tracking-wider max-w-lg mx-auto leading-relaxed">
          Precision-engineered tools built for serious traders.<br />Select your edge in the market.
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {bots.map((bot, i) => (
          <TiltCard key={bot.name} bot={bot} index={i} />
        ))}
      </div>
    </section>
  );
};

export default BotsSection;
