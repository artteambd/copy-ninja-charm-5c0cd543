import { motion } from "framer-motion";
import { Code, Rocket, Crown, Users, Globe, Zap } from "lucide-react";
import jakariaImg from "@/assets/jakaria-dev.png";
import ariyanImg from "@/assets/artrix-owner.png";

const timeline = [
  { year: "2019", title: "Genesis", desc: "First automated trading script built in Dhaka. The seed of ART SOFTWARES was planted." },
  { year: "2020", title: "Market Entry", desc: "Launched ARTRIX AI v1.0. Early adopters saw 15% monthly returns consistently." },
  { year: "2021", title: "Signal Network", desc: "Expanded to TWJ Live & Future Signals. Community grew to 500+ active traders." },
  { year: "2022", title: "TradingView Integration", desc: "VELTRIX Signals launched with native TradingView support. Global reach achieved." },
  { year: "2023", title: "Transparency Era", desc: "Results Checker released. Full public audit trail for all signals and bot performance." },
  { year: "2024", title: "Global Dominance", desc: "1,200+ active users across 30+ countries. From Dhaka to global markets — the mission continues." },
];

const developers = [
  {
    name: "TRADE WITH JAKARIA",
    role: "Full-Stack Developer",
    image: jakariaImg,
    icon: Code,
    badge: "👨‍💻 DEVELOPER",
    skills: ["HTML & CSS", "Python", "React", "Automation"],
    intro: "A passionate and dedicated full-stack developer with strong expertise in modern web technologies. Specializes in building high-performance, visually appealing, and user-friendly digital experiences.",
    description: "Committed to delivering high-quality solutions that meet both user needs and business goals. Whether it's crafting sleek front-end interfaces with React, designing responsive layouts, or building powerful backend logic with Python — every project is optimized, secure, and future-ready.",
    gradient: "from-emerald-500/20 to-cyan-500/20",
    accentColor: "text-emerald-400",
    borderColor: "border-emerald-500/30",
    glowColor: "shadow-emerald-500/10",
  },
  {
    name: "ARIYAN",
    role: "Owner of Artrix & ART Community",
    image: ariyanImg,
    icon: Crown,
    badge: "👑 ART OWNER",
    skills: ["Vision", "Leadership", "Innovation", "Community"],
    intro: "The visionary founder and owner of ARTRIX, as well as the leader of the growing ART Community. Focused on innovation, creativity, and digital excellence.",
    description: "Through ARTRIX and the ART Community, Ariyan aims to empower individuals with advanced tools, knowledge, and opportunities in the digital and trading world. His mission is to create a trusted platform where ideas turn into success.",
    gradient: "from-amber-500/20 to-orange-500/20",
    accentColor: "text-amber-400",
    borderColor: "border-amber-500/30",
    glowColor: "shadow-amber-500/10",
  },
];

const HistorySection = () => (
  <section className="min-h-screen pt-32 pb-24 px-6">
    <div className="max-w-5xl mx-auto text-center mb-16">
      <h2 className="font-orbitron text-2xl md:text-3xl gradient-text mb-4">DEVELOPER HISTORY</h2>
      <p className="text-muted-foreground text-sm tracking-wider">THE MINDS BEHIND ART SOFTWARES</p>
    </div>

    {/* Developer Profiles */}
    <div className="max-w-5xl mx-auto mb-32 space-y-20">
      {developers.map((dev, i) => (
        <motion.div
          key={dev.name}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.2 }}
          className={`relative rounded-3xl border ${dev.borderColor} bg-gradient-to-br ${dev.gradient} backdrop-blur-xl overflow-hidden shadow-2xl ${dev.glowColor}`}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-white/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
          </div>

          <div className="relative p-8 md:p-12">
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.2, type: "spring" }}
              className={`inline-block px-4 py-1.5 rounded-full border ${dev.borderColor} bg-background/50 backdrop-blur-sm mb-8`}
            >
              <span className={`font-orbitron text-xs tracking-[0.2em] ${dev.accentColor}`}>{dev.badge}</span>
            </motion.div>

            <div className="flex flex-col md:flex-row items-center gap-10">
              {/* Image */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`relative shrink-0 w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2 ${dev.borderColor} shadow-2xl ${dev.glowColor}`}
              >
                <img src={dev.image} alt={dev.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </motion.div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-orbitron text-xl md:text-2xl tracking-wider mb-2">{dev.name}</h3>
                <p className={`${dev.accentColor} font-orbitron text-xs tracking-[0.2em] mb-6`}>{dev.role}</p>

                {/* Skills */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                  {dev.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 rounded-full text-xs font-orbitron tracking-wider border ${dev.borderColor} bg-background/30 backdrop-blur-sm`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{dev.intro}</p>
                <p className="text-muted-foreground/80 text-sm leading-relaxed">{dev.description}</p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Timeline */}
    <div className="max-w-5xl mx-auto text-center mb-16">
      <h2 className="font-orbitron text-xl md:text-2xl gradient-text mb-4">OUR JOURNEY</h2>
      <p className="text-muted-foreground text-sm tracking-wider">FROM DHAKA TO GLOBAL MARKETS</p>
    </div>

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
