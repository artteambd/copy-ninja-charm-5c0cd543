import { motion } from "framer-motion";

const testimonials = [
  { name: "Rafiqul Islam", text: "ARTRIX AI completely changed my trading. Consistent profits since day one. Best decision I ever made.", rating: 5 },
  { name: "Shakib Rahman", text: "TWJ signals are incredibly accurate. Worth every penny for the precision and timing.", rating: 5 },
  { name: "Ariful Hossain", text: "The Results Checker gave me full transparency. Trust is everything in this game.", rating: 4 },
  { name: "Tanvir Hasan", text: "Best trading bot I've ever used. The team is responsive and professional.", rating: 5 },
  { name: "Mahmudul Karim", text: "I was skeptical at first, but after 3 months of consistent profits, I'm a believer. Amazing system!", rating: 5 },
  { name: "Nazmul Haque", text: "Started with a small investment and grew it 4x in just 2 months. The signals are unmatched.", rating: 5 },
  { name: "Fahim Chowdhury", text: "The automation saves me hours every day. I can focus on my job while the bot handles trades.", rating: 4 },
  { name: "Jubayer Ahmed", text: "Customer support is incredible. They helped me set everything up in minutes. Highly recommend!", rating: 5 },
  { name: "Sabbir Hossain", text: "I've tried many bots before but nothing comes close to ARTRIX. The accuracy is insane.", rating: 5 },
  { name: "Kamrul Alam", text: "From zero trading knowledge to making real profits. This platform made it possible.", rating: 5 },
  { name: "Imran Sheikh", text: "The risk management features are top-notch. I feel safe with every trade.", rating: 4 },
  { name: "Rezaul Karim", text: "Been using for 6 months now. Every month has been profitable. Can't ask for more.", rating: 5 },
];

const ResultsSection = () => (
  <section className="min-h-screen pt-32 pb-24 px-6">
    <div className="max-w-5xl mx-auto text-center mb-16">
      <h2 className="font-orbitron text-2xl md:text-3xl gradient-text mb-4">TRADER FEEDBACK</h2>
      <p className="text-muted-foreground text-sm tracking-wider">REAL TRADERS. REAL RESULTS. REAL TRUST.</p>
    </div>

    <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((t, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
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
  </section>
);

export default ResultsSection;
