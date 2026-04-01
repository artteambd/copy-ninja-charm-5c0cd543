import { motion } from "framer-motion";

const stats = [
  { label: "Win Rate", value: "87.3%", bar: 87 },
  { label: "Avg Monthly Profit", value: "23.6%", bar: 72 },
  { label: "Total Signals", value: "4,821", bar: 95 },
  { label: "Active Users", value: "1,200+", bar: 60 },
];

const testimonials = [
  { name: "M. Rahman", text: "ARTRIX AI completely changed my trading. Consistent profits since day one.", rating: 5 },
  { name: "S. Khan", text: "TWJ signals are incredibly accurate. Worth every penny for the precision.", rating: 5 },
  { name: "A. Hossain", text: "The Results Checker gave me full transparency. Trust is everything in this game.", rating: 4 },
  { name: "R. Islam", text: "Best trading bot I've ever used. The team is responsive and professional.", rating: 5 },
];

const ResultsSection = () => (
  <section className="min-h-screen pt-32 pb-24 px-6">
    <div className="max-w-5xl mx-auto text-center mb-16">
      <h2 className="font-orbitron text-2xl md:text-3xl gradient-text mb-4">PERFORMANCE</h2>
      <p className="text-muted-foreground text-sm tracking-wider">VERIFIED RESULTS. REAL NUMBERS.</p>
    </div>

    {/* Stats Dashboard */}
    <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
      {stats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="glass rounded-xl p-6 text-center"
        >
          <p className="text-muted-foreground text-xs mb-2">{s.label}</p>
          <p className="font-orbitron text-xl text-foreground mb-3">{s.value}</p>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${s.bar}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
              className="h-full bg-art-grey-600 rounded-full"
            />
          </div>
        </motion.div>
      ))}
    </div>

    {/* Testimonials */}
    <div className="max-w-5xl mx-auto">
      <p className="text-center font-orbitron text-xs tracking-[0.3em] text-muted-foreground mb-10">TRADER FEEDBACK</p>
      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-6"
          >
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, si) => (
                <span key={si} className={si < t.rating ? "text-foreground" : "text-muted"}>★</span>
              ))}
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">"{t.text}"</p>
            <p className="font-orbitron text-xs tracking-wider text-foreground">— {t.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ResultsSection;
