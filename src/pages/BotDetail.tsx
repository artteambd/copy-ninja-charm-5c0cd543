import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Check, Copy, Star, Shield, Clock, Zap, Package,
  ShoppingCart, BadgeCheck, Flame, Heart, Share2, Eye, ChevronRight,
  TrendingUp, Award, Users
} from "lucide-react";
import { bots } from "@/data/bots";
import CustomCursor from "@/components/CustomCursor";
import ParticleCanvas from "@/components/ParticleCanvas";

const BINANCE_ID = "bc1qxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

const reviews = [
  { name: "Sabbir Ahmed", rating: 5, text: "Best bot I've ever used. Profits are insane!", date: "2 days ago" },
  { name: "Nayeem Hasan", rating: 5, text: "Consistent profits every single week. Highly recommended.", date: "5 days ago" },
  { name: "Kamrul Islam", rating: 4, text: "Very good signals, support team is responsive too.", date: "1 week ago" },
  { name: "Fahim Rana", rating: 5, text: "Changed my life. I'm making more than my salary now.", date: "2 weeks ago" },
  { name: "Ariful Hossain", rating: 5, text: "I was skeptical but this bot proved me wrong. Amazing!", date: "3 weeks ago" },
  { name: "Rakibul Hasan", rating: 5, text: "Easy setup, great results. What more can you ask for?", date: "1 month ago" },
];

const BotDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const bot = bots.find((b) => b.slug === slug);

  const [step, setStep] = useState<"detail" | "payment" | "success">("detail");
  const [txId, setTxId] = useState("");
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "performance" | "reviews">("overview");

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

  const handleSubmit = () => {
    if (txId.trim()) setStep("success");
  };

  return (
    <div className="relative min-h-screen">
      <CustomCursor />
      <ParticleCanvas />

      {/* Top Nav Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button data-interactive onClick={() => navigate("/")} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} />
            <span className="font-orbitron text-[11px] tracking-[0.2em]">BACK TO STORE</span>
          </button>
          <span className="font-orbitron text-lg tracking-[0.3em] text-foreground">ART SOFTWARES</span>
          <div className="w-24" />
        </div>
      </nav>

      <main className="relative z-10 pt-24 pb-20">
        <AnimatePresence mode="wait">
          {step === "detail" && (
            <motion.div key="detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
              {/* Hero Image Section */}
              <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  src={bot.image}
                  alt={bot.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className={`absolute inset-0 bg-gradient-to-br ${bot.accent} opacity-20 mix-blend-overlay`} />

                {/* Floating badges */}
                {bot.tag && (
                  <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}
                    className="absolute top-6 left-6 flex items-center gap-1.5 font-orbitron text-[9px] tracking-[0.3em] px-4 py-2 rounded-full bg-background/60 backdrop-blur-md text-foreground border border-border/20">
                    <Flame size={11} className="text-amber-400" />
                    {bot.tag}
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
                  <BadgeCheck size={12} />
                  VERIFIED PRODUCT
                </motion.div>
              </div>

              {/* Product Content */}
              <div className="max-w-6xl mx-auto px-6 -mt-20 relative z-20">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-[9px] font-orbitron tracking-wider text-muted-foreground mb-6">
                      <button data-interactive onClick={() => navigate("/")} className="hover:text-foreground transition-colors">STORE</button>
                      <ChevronRight size={9} />
                      <span>TRADING BOTS</span>
                      <ChevronRight size={9} />
                      <span className="text-foreground">{bot.name}</span>
                    </div>

                    {/* Title & Rating */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${bot.accent} flex items-center justify-center border border-border/20 shrink-0`}>
                          <Icon size={24} className="text-foreground" />
                        </div>
                        <div>
                          <h1 className="font-orbitron text-2xl md:text-4xl tracking-wider text-foreground leading-tight gradient-text">
                            {bot.name}
                          </h1>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">(4.9 · 128 reviews)</span>
                            <span className="text-[9px] text-muted-foreground flex items-center gap-1">
                              <Eye size={10} /> 47 viewing
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Tabs */}
                    <div className="flex gap-0 border-b border-border/10 mt-8 mb-6">
                      {(["overview", "performance", "reviews"] as const).map((tab) => (
                        <button key={tab} data-interactive onClick={() => setActiveTab(tab)}
                          className={`px-5 py-3 font-orbitron text-[10px] tracking-[0.15em] transition-all border-b-2 -mb-px ${
                            activeTab === tab ? "text-foreground border-foreground" : "text-muted-foreground border-transparent hover:text-foreground"
                          }`}>
                          {tab.toUpperCase()}
                        </button>
                      ))}
                    </div>

                    {/* Tab Content */}
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
                              <div key={title} className="glass rounded-xl p-4 group magnetic-hover">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="w-8 h-8 rounded-lg glass-strong flex items-center justify-center">
                                    <I size={14} className="text-foreground" />
                                  </div>
                                  <span className="font-orbitron text-[10px] tracking-wider">{title}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{desc}</p>
                              </div>
                            ))}
                          </div>

                          {/* Features list */}
                          <div className="flex flex-wrap gap-2">
                            {bot.features.map((f) => (
                              <span key={f} className="inline-flex items-center gap-1.5 text-[10px] font-orbitron tracking-wider px-4 py-2 rounded-full bg-secondary/40 text-secondary-foreground border border-border/10">
                                <Check size={10} className="text-emerald-400" />
                                {f}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {activeTab === "performance" && (
                        <motion.div key="performance" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {bot.results.map((r, i) => (
                              <motion.div key={r.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}
                                className="relative rounded-2xl overflow-hidden text-center py-6">
                                <div className={`absolute inset-0 bg-gradient-to-b ${bot.accent} opacity-30`} />
                                <div className="absolute inset-[1px] rounded-[15px] bg-card/90" />
                                <div className="relative z-10">
                                  <p className="font-orbitron text-2xl text-foreground mb-1">{r.value}</p>
                                  <p className="text-[9px] font-orbitron tracking-[0.15em] text-muted-foreground">{r.label}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          <div className="glass rounded-2xl p-6">
                            <h3 className="font-orbitron text-xs tracking-wider mb-4">PERFORMANCE HIGHLIGHTS</h3>
                            <div className="space-y-3">
                              {[
                                { icon: TrendingUp, text: "Consistently profitable across bull and bear markets" },
                                { icon: Award, text: "Top-rated trading bot in the ART ecosystem" },
                                { icon: Users, text: "Trusted by 1,200+ active traders worldwide" },
                              ].map(({ icon: I, text }) => (
                                <div key={text} className="flex items-center gap-3 text-sm text-muted-foreground">
                                  <I size={14} className="text-foreground shrink-0" />
                                  {text}
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
                                <span className="text-[9px] text-muted-foreground">{r.date}</span>
                              </div>
                              <p className="text-sm text-muted-foreground ml-11">{r.text}</p>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Sidebar - Purchase Card */}
                  <div className="lg:col-span-1">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                      className="sticky top-24 glass-strong rounded-3xl p-6 space-y-5">
                      {/* Price */}
                      <div className="text-center pb-5 border-b border-border/10">
                        <p className="text-[9px] font-orbitron tracking-[0.3em] text-muted-foreground mb-2">PRICE</p>
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="font-orbitron text-4xl text-foreground">${bot.price}</span>
                          <span className="text-sm text-muted-foreground line-through">${Math.round(bot.price * 1.5)}</span>
                        </div>
                        <span className="inline-block mt-2 text-[9px] font-orbitron tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                          -33% OFF
                        </span>
                      </div>

                      {/* Quick Info */}
                      <div className="space-y-3">
                        {bot.results.slice(0, 2).map((r) => (
                          <div key={r.label} className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{r.label}</span>
                            <span className="font-orbitron text-sm text-foreground">{r.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Stock */}
                      <div className="flex items-center justify-center gap-1.5 text-[10px] text-emerald-400 font-orbitron tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        IN STOCK · INSTANT DELIVERY
                      </div>

                      {/* Buy Button */}
                      <button data-interactive onClick={() => setStep("payment")}
                        className="relative w-full py-4 rounded-2xl font-orbitron text-xs tracking-[0.25em] text-foreground overflow-hidden group">
                        <div className={`absolute inset-0 bg-gradient-to-r ${bot.accent}`} />
                        <div className="absolute inset-[1px] rounded-[15px] bg-card/70 group-hover:bg-card/40 transition-colors duration-300" />
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          <ShoppingCart size={15} />
                          BUY NOW
                          <ArrowRight size={15} />
                        </span>
                      </button>

                      {/* Trust */}
                      <div className="flex items-center justify-center gap-4 text-[8px] text-muted-foreground font-orbitron tracking-wider">
                        <span className="flex items-center gap-1"><Shield size={9} /> SECURE</span>
                        <span className="flex items-center gap-1"><Clock size={9} /> 24H</span>
                        <span className="flex items-center gap-1"><BadgeCheck size={9} /> VERIFIED</span>
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

              <div className="glass-strong rounded-3xl p-8">
                <h2 className="font-orbitron text-lg tracking-wider mb-6">CHECKOUT</h2>

                {/* Order summary */}
                <div className="rounded-2xl bg-secondary/20 border border-border/10 p-5 mb-8">
                  <p className="text-[9px] font-orbitron tracking-[0.3em] text-muted-foreground mb-4">ORDER SUMMARY</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-border/10">
                      <img src={bot.image} alt={bot.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-orbitron text-xs tracking-wider text-foreground">{bot.name}</p>
                      <p className="text-[9px] text-muted-foreground mt-0.5">1 × ${bot.price}</p>
                    </div>
                    <p className="font-orbitron text-xl text-foreground">${bot.price}</p>
                  </div>
                  <div className="border-t border-border/10 pt-3 flex justify-between">
                    <span className="font-orbitron text-[9px] tracking-wider text-muted-foreground">TOTAL</span>
                    <span className="font-orbitron text-sm text-foreground">${bot.price}</span>
                  </div>
                </div>

                <h3 className="font-orbitron text-sm tracking-wider mb-5">PAYMENT VIA BINANCE</h3>

                <p className="text-[9px] text-muted-foreground mb-2 font-orbitron tracking-[0.2em]">BINANCE ID</p>
                <div className="rounded-xl bg-secondary/20 border border-border/10 p-4 flex items-center justify-between mb-5">
                  <span className="text-xs text-foreground font-mono break-all">{BINANCE_ID}</span>
                  <button data-interactive onClick={handleCopy} className="ml-4 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0">
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>

                <p className="text-[9px] text-muted-foreground mb-2 font-orbitron tracking-[0.2em]">TRANSACTION ID</p>
                <input value={txId} onChange={(e) => setTxId(e.target.value)} placeholder="Paste your transaction ID here..."
                  className="w-full rounded-xl p-4 text-sm text-foreground placeholder:text-muted-foreground bg-secondary/20 border border-border/10 outline-none focus:border-border/30 transition-colors mb-6" />

                <button data-interactive onClick={handleSubmit}
                  className="relative w-full py-4 rounded-2xl font-orbitron text-xs tracking-[0.25em] text-foreground overflow-hidden group">
                  <div className={`absolute inset-0 bg-gradient-to-r ${bot.accent}`} />
                  <div className="absolute inset-[1px] rounded-[15px] bg-card/70 group-hover:bg-card/40 transition-colors duration-300" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Check size={14} /> CONFIRM & SUBMIT PROOF
                  </span>
                </button>

                <p className="text-[8px] text-muted-foreground text-center mt-4 font-orbitron tracking-wider">
                  <Shield size={9} className="inline mr-1 -mt-0.5" /> SECURE PAYMENT · ENCRYPTED CONNECTION
                </p>
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
