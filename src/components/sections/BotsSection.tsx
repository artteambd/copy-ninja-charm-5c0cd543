import { useState } from "react";
import { motion } from "framer-motion";
import PaymentModal from "../PaymentModal";

const bots = [
  { name: "ARTRIX AI", price: 120, desc: "Our flagship AI-driven trading bot. Automated precision for maximum returns on every market move." },
  { name: "TWJ LIVE SIGNAL", price: 100, desc: "Real-time live trading signals delivered instantly. Never miss a profitable entry again." },
  { name: "TWJ FUTURE SIGNAL", price: 80, desc: "Futures market signals with advanced predictive analysis and risk management built in." },
  { name: "VELTRIX SIGNALS", price: 60, desc: "TradingView-integrated signals with chart overlays, alerts, and automated notifications." },
  { name: "RESULTS CHECKER", price: 30, desc: "Verify and track signal performance in real-time. Full transparency on every trade." },
];

const BotsSection = () => {
  const [selectedBot, setSelectedBot] = useState<string | null>(null);

  return (
    <section className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="font-orbitron text-2xl md:text-3xl gradient-text mb-4">TRADING BOTS</h2>
        <p className="text-muted-foreground text-sm tracking-wider">SELECT YOUR EDGE IN THE MARKET</p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bots.map((bot, i) => (
          <motion.div
            key={bot.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-8 magnetic-hover flex flex-col"
          >
            <h3 className="font-orbitron text-sm tracking-wider mb-3">{bot.name}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">{bot.desc}</p>
            <p className="font-orbitron text-2xl text-foreground mb-4">${bot.price}</p>
            <button
              onClick={() => setSelectedBot(bot.name)}
              data-interactive
              className="glass px-6 py-2.5 rounded-lg font-orbitron text-xs tracking-widest text-foreground hover:bg-accent/40 transition-colors"
            >
              BUY NOW
            </button>
          </motion.div>
        ))}
      </div>

      {selectedBot && (
        <PaymentModal botName={selectedBot} onClose={() => setSelectedBot(null)} />
      )}
    </section>
  );
};

export default BotsSection;
