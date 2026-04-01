import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Bot, Zap, BarChart3, Radio, CheckCircle, Sparkles } from "lucide-react";
import BotDetailModal from "../BotDetailModal";

import botArtrix from "@/assets/bot-artrix.jpg";
import botTwjLive from "@/assets/bot-twj-live.jpg";
import botTwjFuture from "@/assets/bot-twj-future.jpg";
import botVeltrix from "@/assets/bot-veltrix.jpg";
import botResults from "@/assets/bot-results.jpg";

export interface BotData {
  name: string;
  price: number;
  desc: string;
  icon: typeof Bot;
  tag: string | null;
  features: string[];
  image: string;
  results: { label: string; value: string }[];
  accent: string;
}

const bots: BotData[] = [
  {
    name: "ARTRIX AI",
    price: 120,
    desc: "Our flagship AI-driven trading bot. Automated precision for maximum returns on every market move. Powered by deep learning algorithms that adapt to real-time market conditions.",
    icon: Bot,
    tag: "FLAGSHIP",
    features: ["Fully Automated", "AI-Powered", "24/7 Trading"],
    image: botArtrix,
    accent: "from-blue-500/20 to-purple-500/20",
    results: [
      { label: "Win Rate", value: "87.3%" },
      { label: "Monthly ROI", value: "+32.4%" },
      { label: "Total Trades", value: "12,847" },
      { label: "Avg. Profit", value: "+4.2%" },
    ],
  },
  {
    name: "TWJ LIVE SIGNAL",
    price: 100,
    desc: "Real-time live trading signals delivered instantly. Never miss a profitable entry again. Get precise entry, stop-loss, and take-profit levels for every signal.",
    icon: Zap,
    tag: "POPULAR",
    features: ["Live Alerts", "Instant Delivery", "Multi-Pair"],
    image: botTwjLive,
    accent: "from-emerald-500/20 to-cyan-500/20",
    results: [
      { label: "Win Rate", value: "82.1%" },
      { label: "Monthly ROI", value: "+28.7%" },
      { label: "Signals/Day", value: "8-12" },
      { label: "Avg. Profit", value: "+3.6%" },
    ],
  },
  {
    name: "TWJ FUTURE SIGNAL",
    price: 80,
    desc: "Futures market signals with advanced predictive analysis and risk management built in. Leverage-optimized entries with calculated risk-reward ratios.",
    icon: BarChart3,
    tag: null,
    features: ["Futures Focus", "Risk Management", "Predictive AI"],
    image: botTwjFuture,
    accent: "from-amber-500/20 to-orange-500/20",
    results: [
      { label: "Win Rate", value: "79.5%" },
      { label: "Monthly ROI", value: "+24.1%" },
      { label: "Signals/Day", value: "5-8" },
      { label: "Risk/Reward", value: "1:3.2" },
    ],
  },
  {
    name: "VELTRIX SIGNALS",
    price: 60,
    desc: "TradingView-integrated signals with chart overlays, alerts, and automated notifications. Seamless integration with your existing trading setup.",
    icon: Radio,
    tag: null,
    features: ["TradingView", "Chart Overlays", "Auto Alerts"],
    image: botVeltrix,
    accent: "from-rose-500/20 to-pink-500/20",
    results: [
      { label: "Win Rate", value: "76.8%" },
      { label: "Monthly ROI", value: "+19.3%" },
      { label: "Pairs", value: "25+" },
      { label: "Avg. Profit", value: "+2.8%" },
    ],
  },
  {
    name: "RESULTS CHECKER",
    price: 30,
    desc: "Verify and track signal performance in real-time. Full transparency on every trade. Comprehensive analytics dashboard with historical performance data.",
    icon: CheckCircle,
    tag: "VALUE",
    features: ["Performance Logs", "Transparency", "Real-Time"],
    image: botResults,
    accent: "from-violet-500/20 to-indigo-500/20",
    results: [
      { label: "Accuracy", value: "99.9%" },
      { label: "Tracked Bots", value: "All" },
      { label: "History", value: "90 Days" },
      { label: "Reports", value: "Daily" },
    ],
  },
];

const TiltCard = ({ bot, index, onClick }: { bot: BotData; index: number; onClick: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
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

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

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
        {/* Animated border gradient */}
        <div className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-br ${bot.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[1px]`} />

        <div className="relative rounded-3xl bg-card/80 backdrop-blur-xl border border-border/10 overflow-hidden">
          {/* Image with overlay */}
          <div className="relative h-44 overflow-hidden">
            <img
              src={bot.image}
              alt={bot.name}
              loading="lazy"
              width={800}
              height={512}
              className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />

            {/* Floating tag */}
            {bot.tag && (
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="absolute top-3 right-3 font-orbitron text-[8px] tracking-[0.3em] px-3 py-1.5 rounded-full bg-background/60 backdrop-blur-md text-foreground border border-border/20"
              >
                <Sparkles size={10} className="inline mr-1.5 -mt-0.5" />
                {bot.tag}
              </motion.span>
            )}

            {/* Price badge floating */}
            <div className="absolute bottom-3 right-4">
              <div className="font-orbitron text-2xl text-foreground drop-shadow-lg">
                ${bot.price}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 pt-2">
            {/* Icon + Name */}
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${bot.accent} flex items-center justify-center border border-border/10`}>
                <Icon size={16} className="text-foreground" />
              </div>
              <h3 className="font-orbitron text-xs tracking-[0.15em] text-foreground">{bot.name}</h3>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-xs leading-relaxed mb-5 line-clamp-2">{bot.desc}</p>

            {/* Mini stats row */}
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
              onClick={onClick}
              data-interactive
              className={`relative w-full py-3 rounded-xl font-orbitron text-[10px] tracking-[0.25em] text-foreground overflow-hidden group/btn transition-all duration-300`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${bot.accent} opacity-60 group-hover/btn:opacity-100 transition-opacity duration-300`} />
              <div className="absolute inset-[1px] rounded-[11px] bg-card/90 group-hover/btn:bg-card/70 transition-colors duration-300" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                VIEW & BUY
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  →
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
  const [selectedBot, setSelectedBot] = useState<BotData | null>(null);

  return (
    <section className="min-h-screen pt-32 pb-24 px-6 relative">
      {/* Background decorative elements */}
      <div className="absolute top-40 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-orbitron text-[9px] tracking-[0.4em] text-muted-foreground">
            5 TOOLS AVAILABLE
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="font-orbitron text-4xl md:text-5xl gradient-text mb-5 leading-tight"
        >
          TRADING BOTS
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-sm tracking-wider max-w-lg mx-auto leading-relaxed"
        >
          Precision-engineered tools built for serious traders.
          <br />
          Select your edge in the market.
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {bots.map((bot, i) => (
          <TiltCard
            key={bot.name}
            bot={bot}
            index={i}
            onClick={() => setSelectedBot(bot)}
          />
        ))}
      </div>

      {selectedBot && (
        <BotDetailModal bot={selectedBot} onClose={() => setSelectedBot(null)} />
      )}
    </section>
  );
};

export default BotsSection;
