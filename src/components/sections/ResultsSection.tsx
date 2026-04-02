import { motion } from "framer-motion";
import { Star, Quote, TrendingUp, Users, Award } from "lucide-react";

const testimonials = [
  { name: "Rafiqul Islam", text: "ARTRIX AI completely changed my trading. Consistent profits since day one. Best decision I ever made.", rating: 5, profit: "+320%", role: "Futures Trader" },
  { name: "Shakib Rahman", text: "TWJ signals are incredibly accurate. Worth every penny for the precision and timing.", rating: 5, profit: "+185%", role: "Day Trader" },
  { name: "Ariful Hossain", text: "The Results Checker gave me full transparency. Trust is everything in this game.", rating: 4, profit: "+95%", role: "Swing Trader" },
  { name: "Tanvir Hasan", text: "Best trading bot I've ever used. The team is responsive and professional.", rating: 5, profit: "+210%", role: "Spot Trader" },
  { name: "Mahmudul Karim", text: "I was skeptical at first, but after 3 months of consistent profits, I'm a believer. Amazing system!", rating: 5, profit: "+270%", role: "Crypto Investor" },
  { name: "Nazmul Haque", text: "Started with a small investment and grew it 4x in just 2 months. The signals are unmatched.", rating: 5, profit: "+400%", role: "Full-Time Trader" },
  { name: "Fahim Chowdhury", text: "The automation saves me hours every day. I can focus on my job while the bot handles trades.", rating: 4, profit: "+150%", role: "Part-Time Trader" },
  { name: "Jubayer Ahmed", text: "Customer support is incredible. They helped me set everything up in minutes. Highly recommend!", rating: 5, profit: "+190%", role: "Beginner Trader" },
  { name: "Sabbir Hossain", text: "I've tried many bots before but nothing comes close to ARTRIX. The accuracy is insane.", rating: 5, profit: "+350%", role: "Pro Trader" },
  { name: "Kamrul Alam", text: "From zero trading knowledge to making real profits. This platform made it possible.", rating: 5, profit: "+120%", role: "New Investor" },
  { name: "Imran Sheikh", text: "The risk management features are top-notch. I feel safe with every trade.", rating: 4, profit: "+145%", role: "Risk Analyst" },
  { name: "Rezaul Karim", text: "Been using for 6 months now. Every month has been profitable. Can't ask for more.", rating: 5, profit: "+380%", role: "Veteran Trader" },
];

const stats = [
  { icon: Users, value: "1,200+", label: "Active Traders" },
  { icon: TrendingUp, value: "87.3%", label: "Win Rate" },
  { icon: Award, value: "4.9/5", label: "Rating" },
];

const ResultsSection = () => (
  <section className="min-h-screen pt-32 pb-24 px-6 relative">
    {/* Background */}
    <div className="absolute top-40 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
    <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

    <div className="max-w-5xl mx-auto text-center mb-12 relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6"
      >
        <Quote size={12} className="text-muted-foreground" />
        <span className="font-orbitron text-[9px] tracking-[0.4em] text-muted-foreground">REAL TRADERS · REAL RESULTS</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-orbitron text-3xl md:text-4xl gradient-text mb-4"
      >
        TRADER FEEDBACK
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-muted-foreground text-sm tracking-wider"
      >
        Verified reviews from our trading community
      </motion.p>
    </div>

    {/* Stats bar */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="max-w-3xl mx-auto grid grid-cols-3 gap-4 mb-16"
    >
      {stats.map(({ icon: I, value, label }) => (
        <div key={label} className="glass rounded-2xl p-5 text-center">
          <I size={18} className="text-muted-foreground mx-auto mb-2" />
          <p className="font-orbitron text-lg text-foreground">{value}</p>
          <p className="text-[8px] font-orbitron tracking-[0.15em] text-muted-foreground mt-1">{label}</p>
        </div>
      ))}
    </motion.div>

    {/* Reviews grid */}
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
      {testimonials.map((t, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.04 }}
          className="glass rounded-2xl p-5 magnetic-hover group relative overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-br from-foreground/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star key={si} size={10} className={si < t.rating ? "fill-amber-400 text-amber-400" : "text-muted"} />
                ))}
              </div>
              <span className="font-orbitron text-[9px] tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                {t.profit}
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center text-[10px] font-orbitron text-foreground">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="font-orbitron text-[10px] tracking-wider text-foreground">{t.name}</p>
                <p className="text-[8px] text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default ResultsSection;
