import { motion } from "framer-motion";

const timeline = [
  { year: "2019", title: "Genesis", desc: "First automated trading script built in Dhaka. The seed of ART SOFTWARES was planted." },
  { year: "2020", title: "Market Entry", desc: "Launched ARTRIX AI v1.0. Early adopters saw 15% monthly returns consistently." },
  { year: "2021", title: "Signal Network", desc: "Expanded to TWJ Live & Future Signals. Community grew to 500+ active traders." },
  { year: "2022", title: "TradingView Integration", desc: "VELTRIX Signals launched with native TradingView support. Global reach achieved." },
  { year: "2023", title: "Transparency Era", desc: "Results Checker released. Full public audit trail for all signals and bot performance." },
  { year: "2024", title: "Global Dominance", desc: "1,200+ active users across 30+ countries. From Dhaka to global markets — the mission continues." },
];

const HistorySection = () => (
  <section className="min-h-screen pt-32 pb-24 px-6">
    <div className="max-w-5xl mx-auto text-center mb-16">
      <h2 className="font-orbitron text-2xl md:text-3xl gradient-text mb-4">DEVELOPER HISTORY</h2>
      <p className="text-muted-foreground text-sm tracking-wider">FROM DHAKA TO GLOBAL MARKETS</p>
    </div>

    {/* About */}
    <div className="max-w-2xl mx-auto mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass rounded-2xl p-8 text-center"
      >
        <h3 className="font-orbitron text-lg tracking-wider mb-4">ARTRIX</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          A self-taught developer and quantitative trader from Dhaka, Bangladesh.
          What started as a passion for markets and code evolved into ART SOFTWARES —
          a platform trusted by traders worldwide. Every algorithm, every signal,
          every line of code carries a singular obsession: precision that generates profit.
        </p>
      </motion.div>
    </div>

    {/* Timeline */}
    <div className="max-w-2xl mx-auto relative">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border/30" />

      {timeline.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className={`relative flex items-start gap-8 mb-12 ${
            i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          } flex-row`}
        >
          {/* Dot */}
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-art-grey-600 mt-2" />

          <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
            <p className="font-orbitron text-xs tracking-[0.3em] text-muted-foreground mb-1">{item.year}</p>
            <h4 className="font-orbitron text-sm tracking-wider mb-2">{item.title}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default HistorySection;
