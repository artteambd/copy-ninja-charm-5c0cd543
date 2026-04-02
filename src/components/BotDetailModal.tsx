import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, Copy, X, ArrowRight, ArrowLeft, TrendingUp, Shield, Clock,
  Sparkles, Star, Package, Zap, Eye, ShoppingCart, ChevronLeft, ChevronRight,
  BadgeCheck, Flame, Heart, Share2
} from "lucide-react";
import type { BotData } from "./sections/BotsSection";

interface BotDetailModalProps {
  bot: BotData;
  onClose: () => void;
}

const BINANCE_ID = "bc1qxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

const fakeReviews = [
  { name: "Sabbir Ahmed", rating: 5, text: "Best bot I've ever used. Profits are insane!", date: "2 days ago" },
  { name: "Nayeem Hasan", rating: 5, text: "Consistent profits every single week. Highly recommended.", date: "5 days ago" },
  { name: "Kamrul Islam", rating: 4, text: "Very good signals, support team is responsive too.", date: "1 week ago" },
  { name: "Fahim Rana", rating: 5, text: "Changed my life. I'm making more than my salary now.", date: "2 weeks ago" },
];

const BotDetailModal = ({ bot, onClose }: BotDetailModalProps) => {
  const [step, setStep] = useState<"detail" | "payment">("detail");
  const [txId, setTxId] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "performance" | "reviews">("overview");
  const [liked, setLiked] = useState(false);
  const [quantity] = useState(1);

  const Icon = bot.icon;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(BINANCE_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = () => {
    if (txId.trim()) setSubmitted(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-2xl px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 280 }}
          className="relative max-w-4xl w-full max-h-[92vh] overflow-hidden rounded-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Outer glow */}
          <div className={`absolute -inset-[2px] rounded-3xl bg-gradient-to-br ${bot.accent} blur-md opacity-40`} />

          <div className="relative rounded-3xl bg-card/95 backdrop-blur-2xl border border-border/10 overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-border/10 bg-secondary/20">
              <div className="flex items-center gap-2">
                <ShoppingCart size={12} className="text-muted-foreground" />
                <span className="font-orbitron text-[8px] tracking-[0.3em] text-muted-foreground">ART SOFTWARES STORE</span>
              </div>
              <button
                data-interactive
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-background/40 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors border border-border/10"
              >
                <X size={12} />
              </button>
            </div>

            <div className="max-h-[85vh] overflow-y-auto">
              <AnimatePresence mode="wait">
                {step === "detail" && !submitted ? (
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* E-commerce Layout: Image + Info side by side */}
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Left: Product Image Gallery */}
                      <div className="relative">
                        <div className="relative h-64 md:h-full md:min-h-[500px] overflow-hidden">
                          <motion.img
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            src={bot.image}
                            alt={bot.name}
                            width={800}
                            height={512}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-card/30" />
                          <div className={`absolute inset-0 bg-gradient-to-br ${bot.accent} opacity-20 mix-blend-overlay`} />

                          {/* Badge overlays */}
                          {bot.tag && (
                            <motion.div
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.3 }}
                              className="absolute top-4 left-4 flex items-center gap-1.5 font-orbitron text-[8px] tracking-[0.3em] px-3 py-1.5 rounded-full bg-background/60 backdrop-blur-md text-foreground border border-border/20"
                            >
                              <Flame size={10} className="text-amber-400" />
                              {bot.tag}
                            </motion.div>
                          )}

                          {/* Like & Share */}
                          <div className="absolute top-4 right-4 flex gap-2">
                            <button
                              data-interactive
                              onClick={() => setLiked(!liked)}
                              className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center border border-border/20 transition-all ${liked ? "bg-red-500/20 text-red-400" : "bg-background/40 text-muted-foreground hover:text-foreground"}`}
                            >
                              <Heart size={13} className={liked ? "fill-red-400" : ""} />
                            </button>
                            <button
                              data-interactive
                              className="w-8 h-8 rounded-full bg-background/40 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-foreground border border-border/20"
                            >
                              <Share2 size={13} />
                            </button>
                          </div>

                          {/* Verified badge */}
                          <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-4 left-4 flex items-center gap-1.5 text-[8px] font-orbitron tracking-wider bg-emerald-500/20 backdrop-blur-md text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/20"
                          >
                            <BadgeCheck size={11} />
                            VERIFIED PRODUCT
                          </motion.div>
                        </div>
                      </div>

                      {/* Right: Product Info */}
                      <div className="p-6 md:p-8 flex flex-col">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-[8px] font-orbitron tracking-wider text-muted-foreground mb-4">
                          <span>STORE</span>
                          <ChevronRight size={8} />
                          <span>TRADING BOTS</span>
                          <ChevronRight size={8} />
                          <span className="text-foreground">{bot.name}</span>
                        </div>

                        {/* Title */}
                        <div className="flex items-start gap-3 mb-2">
                          <motion.div
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${bot.accent} flex items-center justify-center border border-border/20 shrink-0`}
                          >
                            <Icon size={18} className="text-foreground" />
                          </motion.div>
                          <div>
                            <h2 className="font-orbitron text-lg md:text-xl tracking-wider text-foreground leading-tight">
                              {bot.name}
                            </h2>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
                                ))}
                              </div>
                              <span className="text-[9px] text-muted-foreground">(4.9 · 128 reviews)</span>
                            </div>
                          </div>
                        </div>

                        {/* Price section */}
                        <div className="my-5 p-4 rounded-2xl bg-secondary/20 border border-border/10">
                          <div className="flex items-end justify-between">
                            <div>
                              <p className="text-[8px] font-orbitron tracking-[0.3em] text-muted-foreground mb-1">PRICE</p>
                              <div className="flex items-baseline gap-2">
                                <span className="font-orbitron text-3xl text-foreground">${bot.price}</span>
                                <span className="text-xs text-muted-foreground line-through">${Math.round(bot.price * 1.5)}</span>
                                <span className="text-[9px] font-orbitron tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                  -33% OFF
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-[9px] text-emerald-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              IN STOCK
                            </div>
                          </div>
                        </div>

                        {/* Quick features */}
                        <div className="flex flex-wrap gap-2 mb-5">
                          {bot.features.map((f) => (
                            <span
                              key={f}
                              className="inline-flex items-center gap-1.5 text-[9px] font-orbitron tracking-wider px-3 py-1.5 rounded-full bg-secondary/40 text-secondary-foreground border border-border/10"
                            >
                              <Check size={9} className="text-emerald-400" />
                              {f}
                            </span>
                          ))}
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-0 border-b border-border/10 mb-4">
                          {(["overview", "performance", "reviews"] as const).map((tab) => (
                            <button
                              key={tab}
                              data-interactive
                              onClick={() => setActiveTab(tab)}
                              className={`px-4 py-2.5 font-orbitron text-[9px] tracking-[0.15em] transition-all border-b-2 -mb-px ${
                                activeTab === tab
                                  ? "text-foreground border-foreground"
                                  : "text-muted-foreground border-transparent hover:text-foreground"
                              }`}
                            >
                              {tab.toUpperCase()}
                            </button>
                          ))}
                        </div>

                        {/* Tab content */}
                        <div className="flex-1 min-h-[120px]">
                          <AnimatePresence mode="wait">
                            {activeTab === "overview" && (
                              <motion.div
                                key="overview"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                              >
                                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{bot.desc}</p>
                                <div className="space-y-2">
                                  {[
                                    { icon: Shield, text: "Secure & encrypted connection" },
                                    { icon: Clock, text: "Activated within 24 hours" },
                                    { icon: Zap, text: "Real-time execution engine" },
                                    { icon: Package, text: "Lifetime updates included" },
                                  ].map(({ icon: I, text }) => (
                                    <div key={text} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                                      <I size={12} className="text-foreground shrink-0" />
                                      {text}
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}

                            {activeTab === "performance" && (
                              <motion.div
                                key="performance"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="grid grid-cols-2 gap-2">
                                  {bot.results.map((r, i) => (
                                    <motion.div
                                      key={r.label}
                                      initial={{ opacity: 0, scale: 0.9 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: i * 0.05 }}
                                      className="relative rounded-2xl overflow-hidden text-center py-4"
                                    >
                                      <div className={`absolute inset-0 bg-gradient-to-b ${bot.accent} opacity-30`} />
                                      <div className="absolute inset-[1px] rounded-[15px] bg-card/90" />
                                      <div className="relative z-10">
                                        <p className="font-orbitron text-lg text-foreground mb-0.5">{r.value}</p>
                                        <p className="text-[8px] font-orbitron tracking-[0.15em] text-muted-foreground">{r.label}</p>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}

                            {activeTab === "reviews" && (
                              <motion.div
                                key="reviews"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-3"
                              >
                                {fakeReviews.map((r, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="rounded-xl bg-secondary/20 border border-border/10 p-3"
                                  >
                                    <div className="flex items-center justify-between mb-1">
                                      <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center text-[8px] font-orbitron text-foreground">
                                          {r.name.charAt(0)}
                                        </div>
                                        <span className="font-orbitron text-[9px] tracking-wider">{r.name}</span>
                                      </div>
                                      <span className="text-[8px] text-muted-foreground">{r.date}</span>
                                    </div>
                                    <div className="flex gap-0.5 mb-1 ml-8">
                                      {Array.from({ length: r.rating }).map((_, j) => (
                                        <Star key={j} size={8} className="fill-amber-400 text-amber-400" />
                                      ))}
                                    </div>
                                    <p className="text-[10px] text-muted-foreground ml-8">{r.text}</p>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Trust bar */}
                        <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/10">
                          <div className="flex items-center gap-4 text-[8px] text-muted-foreground font-orbitron tracking-wider">
                            <span className="flex items-center gap-1"><Shield size={10} /> SECURE</span>
                            <span className="flex items-center gap-1"><Clock size={10} /> 24H</span>
                            <span className="flex items-center gap-1"><BadgeCheck size={10} /> VERIFIED</span>
                          </div>
                          <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
                            <Eye size={10} />
                            <span>47 viewing now</span>
                          </div>
                        </div>

                        {/* Buy CTA */}
                        <motion.button
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          data-interactive
                          onClick={() => setStep("payment")}
                          className="relative w-full py-4 mt-4 rounded-2xl font-orbitron text-xs tracking-[0.25em] text-foreground overflow-hidden group"
                        >
                          <div className={`absolute inset-0 bg-gradient-to-r ${bot.accent}`} />
                          <div className="absolute inset-[1px] rounded-[15px] bg-card/70 group-hover:bg-card/40 transition-colors duration-300" />
                          <span className="relative z-10 flex items-center justify-center gap-3">
                            <ShoppingCart size={15} />
                            BUY NOW — ${bot.price}
                            <ArrowRight size={15} />
                          </span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ) : step === "payment" && !submitted ? (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.25 }}
                    className="p-6 md:p-8"
                  >
                    <button
                      data-interactive
                      onClick={() => setStep("detail")}
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-xs font-orbitron tracking-wider mb-6"
                    >
                      <ArrowLeft size={14} />
                      BACK TO PRODUCT
                    </button>

                    {/* Order summary */}
                    <div className="rounded-2xl border border-border/10 bg-secondary/10 p-5 mb-6">
                      <p className="text-[9px] font-orbitron tracking-[0.3em] text-muted-foreground mb-4">ORDER SUMMARY</p>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-border/10">
                          <img src={bot.image} alt={bot.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="font-orbitron text-xs tracking-wider text-foreground">{bot.name}</p>
                          <p className="text-[9px] text-muted-foreground mt-0.5">Qty: {quantity} × ${bot.price}</p>
                        </div>
                        <p className="font-orbitron text-lg text-foreground">${bot.price * quantity}</p>
                      </div>
                      <div className="border-t border-border/10 pt-3 flex justify-between">
                        <span className="font-orbitron text-[9px] tracking-wider text-muted-foreground">TOTAL</span>
                        <span className="font-orbitron text-sm text-foreground">${bot.price * quantity}</span>
                      </div>
                    </div>

                    <h3 className="font-orbitron text-sm tracking-wider mb-5">PAYMENT VIA BINANCE</h3>

                    <p className="text-[9px] text-muted-foreground mb-2 font-orbitron tracking-[0.2em]">BINANCE ID</p>
                    <div className="rounded-xl bg-secondary/20 border border-border/10 p-4 flex items-center justify-between mb-5">
                      <span className="text-xs text-foreground font-mono break-all">{BINANCE_ID}</span>
                      <button
                        data-interactive
                        onClick={handleCopy}
                        className="ml-4 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
                      >
                        {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        {copied ? "Copied" : "Copy"}
                      </button>
                    </div>

                    <p className="text-[9px] text-muted-foreground mb-2 font-orbitron tracking-[0.2em]">TRANSACTION ID</p>
                    <input
                      value={txId}
                      onChange={(e) => setTxId(e.target.value)}
                      placeholder="Paste your transaction ID here..."
                      className="w-full rounded-xl p-4 text-sm text-foreground placeholder:text-muted-foreground bg-secondary/20 border border-border/10 outline-none focus:border-border/30 transition-colors mb-6"
                    />

                    <button
                      data-interactive
                      onClick={handleSubmit}
                      className="relative w-full py-4 rounded-2xl font-orbitron text-xs tracking-[0.25em] text-foreground overflow-hidden group"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${bot.accent}`} />
                      <div className="absolute inset-[1px] rounded-[15px] bg-card/70 group-hover:bg-card/40 transition-colors duration-300" />
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Check size={14} />
                        CONFIRM & SUBMIT PROOF
                      </span>
                    </button>

                    <p className="text-[8px] text-muted-foreground text-center mt-4 font-orbitron tracking-wider">
                      <Shield size={9} className="inline mr-1 -mt-0.5" />
                      SECURE PAYMENT · ENCRYPTED CONNECTION
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", damping: 20 }}
                    className="p-8 text-center py-20"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", damping: 12 }}
                      className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${bot.accent} flex items-center justify-center mx-auto mb-6 border border-border/10`}
                    >
                      <Check size={36} className="text-foreground" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h4 className="font-orbitron text-base tracking-wider mb-2">ORDER CONFIRMED</h4>
                      <p className="text-muted-foreground text-sm mb-1">
                        <span className="text-foreground">{bot.name}</span> will be activated soon
                      </p>
                      <p className="text-muted-foreground text-xs mb-6">You'll receive access within 24 hours</p>
                      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 text-[9px] font-orbitron tracking-wider text-emerald-400">
                        <BadgeCheck size={12} />
                        PAYMENT PROOF RECEIVED
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BotDetailModal;
