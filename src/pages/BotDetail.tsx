import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Check, Copy, Star, Shield, Clock, Zap, Package,
  ShoppingCart, BadgeCheck, Flame, Heart, Share2, Eye, ChevronRight,
  TrendingUp, Award, Users, Upload, ImageIcon, X, Wallet, CreditCard, User, Hash, FileText
} from "lucide-react";
import { bots } from "@/data/bots";
import CustomCursor from "@/components/CustomCursor";
import ParticleCanvas from "@/components/ParticleCanvas";

const BINANCE_ID = "849850742";

const reviews = [
  { name: "Sabbir Ahmed", rating: 5, text: "Best bot I've ever used. Profits are insane!", date: "2 days ago", profit: "+320%" },
  { name: "Nayeem Hasan", rating: 5, text: "Consistent profits every single week. Highly recommended.", date: "5 days ago", profit: "+185%" },
  { name: "Kamrul Islam", rating: 4, text: "Very good signals, support team is responsive too.", date: "1 week ago", profit: "+150%" },
  { name: "Fahim Rana", rating: 5, text: "Changed my life. I'm making more than my salary now.", date: "2 weeks ago", profit: "+410%" },
  { name: "Ariful Hossain", rating: 5, text: "I was skeptical but this bot proved me wrong. Amazing!", date: "3 weeks ago", profit: "+240%" },
  { name: "Rakibul Hasan", rating: 5, text: "Easy setup, great results. What more can you ask for?", date: "1 month ago", profit: "+175%" },
];

const BotDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const bot = bots.find((b) => b.slug === slug);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState<"detail" | "payment" | "success">("detail");
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "performance" | "reviews">("overview");
  const [txPhoto, setTxPhoto] = useState<string | null>(null);
  const [txFileName, setTxFileName] = useState("");
  const [txId, setTxId] = useState("");
  const [customerUsername, setCustomerUsername] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  if (!bot) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-orbitron text-2xl gradient-text mb-4">BOT NOT FOUND</h1>
          <button onClick={() => navigate("/")} data-interactive className="font-orbitron text-xs tracking-wider text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={14} className="inline mr-2" />GO BACK
          </button>
        </div>
      </div>
    );
  }

  const Icon = bot.icon;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(BINANCE_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTxFileName(file.name);
      const reader = new FileReader();
      reader.onload = (ev) => setTxPhoto(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const canSubmit = txPhoto && txId.trim() && customerUsername.trim();

  const handleSubmit = () => {
    if (canSubmit) setStep("success");
  };

  return (
    <div className="relative min-h-screen">
      <CustomCursor />
      <ParticleCanvas />

      {/* Top Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button data-interactive onClick={() => navigate("/")} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} />
            <span className="font-orbitron text-[11px] tracking-[0.2em]">BACK TO STORE</span>
          </button>
          <span className="font-orbitron text-lg tracking-[0.3em] text-foreground">ART SOFTWARES</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-orbitron text-[9px] tracking-wider text-muted-foreground hidden md:inline">ONLINE</span>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-24 pb-20">
        <AnimatePresence mode="wait">
          {step === "detail" && (
            <motion.div key="detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
              {/* Hero */}
              <div className="relative h-[45vh] md:h-[55vh] overflow-hidden">
                <motion.img initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5, ease: "easeOut" }}
                  src={bot.image} alt={bot.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
                <div className={`absolute inset-0 bg-gradient-to-br ${bot.accent} opacity-15 mix-blend-overlay`} />

                {bot.tag && (
                  <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                    className="absolute top-6 left-6 flex items-center gap-1.5 font-orbitron text-[9px] tracking-[0.3em] px-4 py-2 rounded-full bg-background/60 backdrop-blur-md text-foreground border border-border/20">
                    <Flame size={11} className="text-amber-400" /> {bot.tag}
                  </motion.div>
                )}

                <div className="absolute top-6 right-6 flex gap-2">
                  <button data-interactive onClick={() => setLiked(!liked)}
                    className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center border border-border/20 transition-all ${liked ? "bg-red-500/20 text-red-400" : "bg-background/40 text-muted-foreground hover:text-foreground"}`}>
                    <Heart size={16} className={liked ? "fill-red-400" : ""} />
                  </button>
                  <button data-interactive className="w-10 h-10 rounded-full bg-background/40 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-foreground border border-border/20">
                    <Share2 size={16} />
                  </button>
                </div>

                <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                  className="absolute bottom-6 left-6 flex items-center gap-1.5 text-[9px] font-orbitron tracking-wider bg-emerald-500/20 backdrop-blur-md text-emerald-400 px-4 py-2 rounded-full border border-emerald-500/20">
                  <BadgeCheck size={12} /> VERIFIED PRODUCT
                </motion.div>
              </div>

              {/* Product Content */}
              <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Main */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-[9px] font-orbitron tracking-wider text-muted-foreground">
                      <button data-interactive onClick={() => navigate("/")} className="hover:text-foreground transition-colors">STORE</button>
                      <ChevronRight size={9} />
                      <span>TRADING BOTS</span>
                      <ChevronRight size={9} />
                      <span className="text-foreground">{bot.name}</span>
                    </div>

                    {/* Title */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${bot.accent} flex items-center justify-center border border-border/20 shrink-0`}>
                          <Icon size={24} className="text-foreground" />
                        </div>
                        <div>
                          <h1 className="font-orbitron text-2xl md:text-4xl tracking-wider leading-tight gradient-text">{bot.name}</h1>
                          <div className="flex items-center gap-3 mt-2 flex-wrap">
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">(4.9 · 128 reviews)</span>
                            <span className="text-[9px] text-muted-foreground flex items-center gap-1"><Eye size={10} /> 47 viewing</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Stats Bar */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                      className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {bot.results.map((r) => (
                        <div key={r.label} className="relative rounded-2xl overflow-hidden text-center py-5">
                          <div className={`absolute inset-0 bg-gradient-to-b ${bot.accent} opacity-25`} />
                          <div className="absolute inset-[1px] rounded-[15px] bg-card/90" />
                          <div className="relative z-10">
                            <p className="font-orbitron text-xl text-foreground mb-0.5">{r.value}</p>
                            <p className="text-[8px] font-orbitron tracking-[0.15em] text-muted-foreground">{r.label}</p>
                          </div>
                        </div>
                      ))}
                    </motion.div>

                    {/* Tabs */}
                    <div className="flex gap-0 border-b border-border/10">
                      {(["overview", "performance", "reviews"] as const).map((tab) => (
                        <button key={tab} data-interactive onClick={() => setActiveTab(tab)}
                          className={`px-5 py-3 font-orbitron text-[10px] tracking-[0.15em] transition-all border-b-2 -mb-px ${
                            activeTab === tab ? "text-foreground border-foreground" : "text-muted-foreground border-transparent hover:text-foreground"
                          }`}>
                          {tab.toUpperCase()}
                        </button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      {activeTab === "overview" && (
                        <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                          <p className="text-muted-foreground leading-relaxed">{bot.desc}</p>
                          <div className="grid grid-cols-2 gap-4">
                            {[
                              { icon: Shield, title: "Secure & Encrypted", desc: "Bank-grade encryption on all connections" },
                              { icon: Clock, title: "24H Activation", desc: "Get started within hours, not days" },
                              { icon: Zap, title: "Real-Time Engine", desc: "Execute trades in milliseconds" },
                              { icon: Package, title: "Lifetime Updates", desc: "All future improvements included free" },
                            ].map(({ icon: I, title, desc }) => (
                              <div key={title} className="glass rounded-xl p-4 magnetic-hover">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="w-8 h-8 rounded-lg glass-strong flex items-center justify-center"><I size={14} className="text-foreground" /></div>
                                  <span className="font-orbitron text-[10px] tracking-wider">{title}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{desc}</p>
                              </div>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {bot.features.map((f) => (
                              <span key={f} className="inline-flex items-center gap-1.5 text-[10px] font-orbitron tracking-wider px-4 py-2 rounded-full bg-secondary/40 text-secondary-foreground border border-border/10">
                                <Check size={10} className="text-emerald-400" /> {f}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {activeTab === "performance" && (
                        <motion.div key="performance" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                          <div className="glass rounded-2xl p-6">
                            <h3 className="font-orbitron text-xs tracking-wider mb-4">PERFORMANCE HIGHLIGHTS</h3>
                            <div className="space-y-3">
                              {[
                                { icon: TrendingUp, text: "Consistently profitable across bull and bear markets" },
                                { icon: Award, text: "Top-rated trading bot in the ART ecosystem" },
                                { icon: Users, text: "Trusted by 1,200+ active traders worldwide" },
                              ].map(({ icon: I, text }) => (
                                <div key={text} className="flex items-center gap-3 text-sm text-muted-foreground">
                                  <I size={14} className="text-foreground shrink-0" /> {text}
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === "reviews" && (
                        <motion.div key="reviews" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                          {reviews.map((r, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                              className="glass rounded-xl p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center text-[10px] font-orbitron text-foreground">
                                    {r.name.charAt(0)}
                                  </div>
                                  <div>
                                    <span className="font-orbitron text-[10px] tracking-wider">{r.name}</span>
                                    <div className="flex gap-0.5 mt-0.5">
                                      {Array.from({ length: r.rating }).map((_, j) => (
                                        <Star key={j} size={9} className="fill-amber-400 text-amber-400" />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="font-orbitron text-[9px] tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">{r.profit}</span>
                                  <span className="text-[9px] text-muted-foreground">{r.date}</span>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground ml-11">"{r.text}"</p>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Sidebar */}
                  <div className="lg:col-span-1">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                      className="sticky top-24 glass-strong rounded-3xl overflow-hidden">
                      {/* Price Header */}
                      <div className="relative p-6 text-center">
                        <div className={`absolute inset-0 bg-gradient-to-br ${bot.accent} opacity-20`} />
                        <div className="relative z-10">
                          <p className="text-[9px] font-orbitron tracking-[0.3em] text-muted-foreground mb-2">PRICE</p>
                          <div className="flex items-baseline justify-center gap-2">
                            <span className="font-orbitron text-5xl text-foreground">${bot.price}</span>
                            <span className="text-sm text-muted-foreground line-through">${Math.round(bot.price * 1.5)}</span>
                          </div>
                          <span className="inline-block mt-2 text-[9px] font-orbitron tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                            -33% OFF · LIMITED TIME
                          </span>
                        </div>
                      </div>

                      <div className="p-6 pt-0 space-y-5">
                        {/* Quick stats */}
                        <div className="space-y-3 pt-5 border-t border-border/10">
                          {bot.results.slice(0, 2).map((r) => (
                            <div key={r.label} className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">{r.label}</span>
                              <span className="font-orbitron text-sm text-foreground">{r.value}</span>
                            </div>
                          ))}
                        </div>

                        {/* Stock */}
                        <div className="flex items-center justify-center gap-1.5 text-[10px] text-emerald-400 font-orbitron tracking-wider py-2 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          IN STOCK · INSTANT DELIVERY
                        </div>

                        {/* Buy Button */}
                        <button data-interactive onClick={() => setStep("payment")}
                          className="relative w-full py-4 rounded-2xl font-orbitron text-xs tracking-[0.25em] text-foreground overflow-hidden group">
                          <div className={`absolute inset-0 bg-gradient-to-r ${bot.accent}`} />
                          <div className="absolute inset-[1px] rounded-[15px] bg-card/70 group-hover:bg-card/40 transition-colors duration-300" />
                          <span className="relative z-10 flex items-center justify-center gap-3">
                            <ShoppingCart size={15} /> BUY NOW <ArrowRight size={15} />
                          </span>
                        </button>

                        {/* Trust */}
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { icon: Shield, label: "SECURE" },
                            { icon: Clock, label: "24H SETUP" },
                            { icon: BadgeCheck, label: "VERIFIED" },
                          ].map(({ icon: I, label }) => (
                            <div key={label} className="flex flex-col items-center gap-1 rounded-xl bg-secondary/20 border border-border/10 py-3">
                              <I size={14} className="text-muted-foreground" />
                              <span className="text-[7px] font-orbitron tracking-wider text-muted-foreground">{label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === "payment" && (
            <motion.div key="payment" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto px-6 pt-8">
              <button data-interactive onClick={() => setStep("detail")}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-xs font-orbitron tracking-wider mb-8">
                <ArrowLeft size={14} /> BACK TO PRODUCT
              </button>

              <div className="glass-strong rounded-3xl overflow-hidden">
                {/* Checkout Header */}
                <div className="relative p-6">
                  <div className={`absolute inset-0 bg-gradient-to-r ${bot.accent} opacity-15`} />
                  <div className="relative z-10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl glass-strong flex items-center justify-center">
                      <CreditCard size={18} className="text-foreground" />
                    </div>
                    <div>
                      <h2 className="font-orbitron text-lg tracking-wider">CHECKOUT</h2>
                      <p className="text-[9px] font-orbitron tracking-wider text-muted-foreground">SECURE PAYMENT</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-6">
                  {/* Order summary */}
                  <div className="rounded-2xl bg-secondary/20 border border-border/10 p-5">
                    <p className="text-[9px] font-orbitron tracking-[0.3em] text-muted-foreground mb-4">ORDER SUMMARY</p>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-border/10">
                        <img src={bot.image} alt={bot.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-orbitron text-xs tracking-wider text-foreground">{bot.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {bot.features.slice(0, 2).map((f) => (
                            <span key={f} className="text-[8px] text-muted-foreground bg-secondary/40 px-2 py-0.5 rounded-full">{f}</span>
                          ))}
                        </div>
                      </div>
                      <p className="font-orbitron text-xl text-foreground">${bot.price}</p>
                    </div>
                    <div className="border-t border-border/10 pt-3 flex justify-between">
                      <span className="font-orbitron text-[9px] tracking-wider text-muted-foreground">TOTAL</span>
                      <span className="font-orbitron text-lg text-foreground">${bot.price}</span>
                    </div>
                  </div>

                  {/* Step 1: Customer Username */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center text-[10px] font-orbitron text-foreground">1</div>
                      <h3 className="font-orbitron text-sm tracking-wider">YOUR USERNAME</h3>
                    </div>
                    <div className="relative">
                      <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        value={customerUsername}
                        onChange={(e) => setCustomerUsername(e.target.value)}
                        placeholder="Enter your username (e.g. Telegram / WhatsApp)"
                        className="w-full rounded-xl bg-secondary/20 border border-border/10 focus:border-border/40 p-4 pl-11 text-sm text-foreground placeholder:text-muted-foreground bg-transparent outline-none transition-colors font-mono"
                      />
                    </div>
                    <p className="text-[8px] text-muted-foreground mt-1.5 ml-1">We'll use this to deliver your bot access</p>
                  </div>

                  {/* Step 2: Payment via Binance */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center text-[10px] font-orbitron text-foreground">2</div>
                      <h3 className="font-orbitron text-sm tracking-wider">PAYMENT VIA BINANCE</h3>
                    </div>

                    <p className="text-[9px] text-muted-foreground mb-2 font-orbitron tracking-[0.2em]">BINANCE PAY ID</p>
                    <div className="rounded-xl bg-secondary/20 border border-border/10 p-4 flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                          <Wallet size={14} className="text-amber-400" />
                        </div>
                        <span className="text-sm text-foreground font-mono font-bold tracking-wider">{BINANCE_ID}</span>
                      </div>
                      <button data-interactive onClick={handleCopy}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg bg-secondary/30 border border-border/10">
                        {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <p className="text-[8px] text-muted-foreground mb-4">Send exactly <span className="text-foreground font-orbitron">${bot.price}</span> to this Binance Pay ID</p>
                  </div>

                  {/* Step 3: Transaction ID */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center text-[10px] font-orbitron text-foreground">3</div>
                      <h3 className="font-orbitron text-sm tracking-wider">TRANSACTION ID</h3>
                    </div>
                    <div className="relative">
                      <Hash size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        value={txId}
                        onChange={(e) => setTxId(e.target.value)}
                        placeholder="Paste your transaction ID here..."
                        className="w-full rounded-xl bg-secondary/20 border border-border/10 focus:border-border/40 p-4 pl-11 text-sm text-foreground placeholder:text-muted-foreground bg-transparent outline-none transition-colors font-mono"
                      />
                    </div>
                    <p className="text-[8px] text-muted-foreground mt-1.5 ml-1">Copy from your Binance payment confirmation</p>
                  </div>

                  {/* Step 4: Upload Transaction Photo */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center text-[10px] font-orbitron text-foreground">4</div>
                      <h3 className="font-orbitron text-sm tracking-wider">PROOF OF PAYMENT</h3>
                    </div>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

                    {txPhoto ? (
                      <div className="relative rounded-2xl overflow-hidden border border-border/10 mb-2">
                        <img src={txPhoto} alt="Transaction proof" className="w-full max-h-64 object-contain bg-secondary/10" />
                        <div className="absolute top-3 right-3">
                          <button data-interactive onClick={() => { setTxPhoto(null); setTxFileName(""); }}
                            className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-foreground border border-border/20">
                            <X size={14} />
                          </button>
                        </div>
                        <div className="p-3 bg-secondary/10 border-t border-border/10">
                          <div className="flex items-center gap-2">
                            <ImageIcon size={12} className="text-emerald-400" />
                            <span className="text-xs text-foreground truncate">{txFileName}</span>
                            <Check size={12} className="text-emerald-400 ml-auto shrink-0" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button data-interactive onClick={() => fileInputRef.current?.click()}
                        className="w-full rounded-2xl border-2 border-dashed border-border/30 hover:border-border/60 transition-colors p-8 flex flex-col items-center gap-3 group mb-2">
                        <div className="w-14 h-14 rounded-2xl bg-secondary/30 flex items-center justify-center group-hover:bg-secondary/50 transition-colors">
                          <Upload size={24} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                        </div>
                        <div className="text-center">
                          <p className="font-orbitron text-[10px] tracking-wider text-foreground mb-1">UPLOAD SCREENSHOT</p>
                          <p className="text-[9px] text-muted-foreground">Upload your transaction screenshot (PNG, JPG)</p>
                        </div>
                      </button>
                    )}
                  </div>

                  {/* Verification checklist */}
                  <div className="rounded-xl bg-secondary/10 border border-border/10 p-4">
                    <p className="text-[9px] font-orbitron tracking-[0.2em] text-muted-foreground mb-3">VERIFICATION CHECKLIST</p>
                    <div className="space-y-2">
                      {[
                        { label: "Username provided", done: !!customerUsername.trim(), icon: User },
                        { label: "Transaction ID entered", done: !!txId.trim(), icon: Hash },
                        { label: "Payment screenshot uploaded", done: !!txPhoto, icon: FileText },
                      ].map(({ label, done, icon: I }) => (
                        <div key={label} className="flex items-center gap-2.5">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${done ? "bg-emerald-500/20 text-emerald-400" : "bg-secondary/30 text-muted-foreground"}`}>
                            {done ? <Check size={10} /> : <I size={10} />}
                          </div>
                          <span className={`text-[10px] font-orbitron tracking-wider transition-colors ${done ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit */}
                  <button data-interactive onClick={handleSubmit}
                    disabled={!canSubmit}
                    className={`relative w-full py-4 rounded-2xl font-orbitron text-xs tracking-[0.25em] text-foreground overflow-hidden group transition-opacity ${!canSubmit ? "opacity-40 cursor-not-allowed" : ""}`}>
                    <div className={`absolute inset-0 bg-gradient-to-r ${bot.accent}`} />
                    <div className="absolute inset-[1px] rounded-[15px] bg-card/70 group-hover:bg-card/40 transition-colors duration-300" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Check size={14} /> CONFIRM & SUBMIT PROOF
                    </span>
                  </button>

                  <p className="text-[8px] text-muted-foreground text-center font-orbitron tracking-wider">
                    <Shield size={9} className="inline mr-1 -mt-0.5" /> SECURE PAYMENT · ENCRYPTED CONNECTION
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto px-6 pt-20 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring", damping: 12 }}
                className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${bot.accent} flex items-center justify-center mx-auto mb-8 border border-border/10`}>
                <Check size={40} className="text-foreground" />
              </motion.div>
              <h2 className="font-orbitron text-xl tracking-wider mb-3">ORDER CONFIRMED</h2>
              <p className="text-muted-foreground mb-1">
                <span className="text-foreground">{bot.name}</span> will be activated soon
              </p>
              <p className="text-muted-foreground text-sm mb-2">Username: <span className="text-foreground font-mono">{customerUsername}</span></p>
              <p className="text-muted-foreground text-sm mb-8">You'll receive access within 24 hours</p>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-5 py-2.5 text-[10px] font-orbitron tracking-wider text-emerald-400 mb-8">
                <BadgeCheck size={13} /> PAYMENT PROOF RECEIVED
              </div>
              <div>
                <button data-interactive onClick={() => navigate("/")}
                  className="font-orbitron text-xs tracking-wider text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft size={14} className="inline mr-2" /> BACK TO STORE
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default BotDetail;
