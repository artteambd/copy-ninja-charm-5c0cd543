import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Zap, BarChart3, Radio, CheckCircle } from "lucide-react";
import PaymentModal from "../PaymentModal";

const bots = [
  {
    name: "ARTRIX AI",
    price: 120,
    desc: "Our flagship AI-driven trading bot. Automated precision for maximum returns on every market move.",
    icon: Bot,
    tag: "FLAGSHIP",
    features: ["Fully Automated", "AI-Powered", "24/7 Trading"],
  },
  {
    name: "TWJ LIVE SIGNAL",
    price: 100,
    desc: "Real-time live trading signals delivered instantly. Never miss a profitable entry again.",
    icon: Zap,
    tag: "POPULAR",
    features: ["Live Alerts", "Instant Delivery", "Multi-Pair"],
  },
  {
    name: "TWJ FUTURE SIGNAL",
    price: 80,
    desc: "Futures market signals with advanced predictive analysis and risk management built in.",
    icon: BarChart3,
    tag: null,
    features: ["Futures Focus", "Risk Management", "Predictive AI"],
  },
  {
    name: "VELTRIX SIGNALS",
    price: 60,
    desc: "TradingView-integrated signals with chart overlays, alerts, and automated notifications.",
    icon: Radio,
    tag: null,
    features: ["TradingView", "Chart Overlays", "Auto Alerts"],
  },
  {
    name: "RESULTS CHECKER",
    price: 30,
    desc: "Verify and track signal performance in real-time. Full transparency on every trade.",
    icon: CheckCircle,
    tag: "VALUE",
    features: ["Performance Logs", "Transparency", "Real-Time"],
  },
];

const BotsSection = () => {
  const [selectedBot, setSelectedBot] = useState<string | null>(null);

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
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-b from-accent/30 to-transparent" />

              {/* Tag */}
              {bot.tag && (
                <span className="absolute top-4 right-4 font-orbitron text-[9px] tracking-[0.2em] px-3 py-1 rounded-full bg-accent/60 text-foreground border border-border/30">
                  {bot.tag}
                </span>
              )}

              {/* Icon */}
              <div className="relative z-10 w-12 h-12 rounded-xl glass flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon size={20} className="text-foreground" />
              </div>

              {/* Title & Description */}
              <h3 className="relative z-10 font-orbitron text-sm tracking-wider mb-3 text-foreground">
                {bot.name}
              </h3>
              <p className="relative z-10 text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                {bot.desc}
              </p>

              {/* Features */}
              <div className="relative z-10 flex flex-wrap gap-2 mb-6">
                {bot.features.map((f) => (
                  <span
                    key={f}
                    className="text-[10px] font-orbitron tracking-wider px-2.5 py-1 rounded-md bg-secondary/60 text-secondary-foreground border border-border/20"
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* Price & CTA */}
              <div className="relative z-10 flex items-end justify-between mt-auto pt-4 border-t border-border/20">
                <div>
                  <p className="text-[10px] text-muted-foreground font-orbitron tracking-wider mb-1">PRICE</p>
                  <p className="font-orbitron text-2xl text-foreground">${bot.price}</p>
                </div>
                <button
                  onClick={() => setSelectedBot(bot.name)}
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
        <PaymentModal botName={selectedBot} onClose={() => setSelectedBot(null)} />
      )}
    </section>
  );
};

export default BotsSection;
