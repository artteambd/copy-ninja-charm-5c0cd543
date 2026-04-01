import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Zap, BarChart3, Radio, CheckCircle } from "lucide-react";
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
    results: [
      { label: "Accuracy", value: "99.9%" },
      { label: "Tracked Bots", value: "All" },
      { label: "History", value: "90 Days" },
      { label: "Reports", value: "Daily" },
    ],
  },
];

const BotsSection = () => {
  const [selectedBot, setSelectedBot] = useState<BotData | null>(null);

  return (
    <section className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto text-center mb-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-orbitron text-[10px] tracking-[0.4em] text-muted-foreground mb-4"
        >
          PREMIUM TOOLS
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-orbitron text-3xl md:text-4xl gradient-text mb-4"
        >
          TRADING BOTS
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-sm tracking-wider max-w-md mx-auto"
        >
          Select your edge in the market. Each tool is precision-engineered for performance.
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bots.map((bot, i) => {
          const Icon = bot.icon;
          return (
            <motion.div
              key={bot.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative glass rounded-2xl p-8 flex flex-col magnetic-hover overflow-hidden"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-b from-accent/30 to-transparent" />

              {bot.tag && (
                <span className="absolute top-4 right-4 font-orbitron text-[9px] tracking-[0.2em] px-3 py-1 rounded-full bg-accent/60 text-foreground border border-border/30">
                  {bot.tag}
                </span>
              )}

              {/* Preview image */}
              <div className="relative z-10 rounded-xl overflow-hidden mb-6 border border-border/20">
                <img
                  src={bot.image}
                  alt={bot.name}
                  loading="lazy"
                  width={800}
                  height={512}
                  className="w-full h-36 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              </div>

              <div className="relative z-10 w-10 h-10 rounded-lg glass flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Icon size={18} className="text-foreground" />
              </div>

              <h3 className="relative z-10 font-orbitron text-sm tracking-wider mb-2 text-foreground">
                {bot.name}
              </h3>
              <p className="relative z-10 text-muted-foreground text-xs leading-relaxed mb-5 flex-1 line-clamp-2">
                {bot.desc}
              </p>

              <div className="relative z-10 flex items-end justify-between mt-auto pt-4 border-t border-border/20">
                <div>
                  <p className="text-[10px] text-muted-foreground font-orbitron tracking-wider mb-1">PRICE</p>
                  <p className="font-orbitron text-2xl text-foreground">${bot.price}</p>
                </div>
                <button
                  onClick={() => setSelectedBot(bot)}
                  data-interactive
                  className="glass px-6 py-2.5 rounded-lg font-orbitron text-[10px] tracking-[0.2em] text-foreground hover:bg-accent/40 transition-all duration-300 border border-border/20 hover:border-border/40"
                >
                  BUY NOW
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {selectedBot && (
        <BotDetailModal bot={selectedBot} onClose={() => setSelectedBot(null)} />
      )}
    </section>
  );
};

export default BotsSection;
