import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, X, ArrowRight, ArrowLeft, TrendingUp, Shield, Clock, Sparkles } from "lucide-react";
import type { BotData } from "./sections/BotsSection";

interface BotDetailModalProps {
  bot: BotData;
  onClose: () => void;
}

const BINANCE_ID = "bc1qxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

const BotDetailModal = ({ bot, onClose }: BotDetailModalProps) => {
  const [step, setStep] = useState<"detail" | "payment">("detail");
  const [txId, setTxId] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const Icon = bot.icon;

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
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-xl px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 40 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="relative max-w-2xl w-full max-h-[90vh] overflow-hidden rounded-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Outer glow */}
          <div className={`absolute -inset-[1px] rounded-3xl bg-gradient-to-br ${bot.accent} blur-sm opacity-60`} />

          <div className="relative rounded-3xl bg-card/95 backdrop-blur-2xl border border-border/10 overflow-hidden">
            {/* Close */}
            <button
              data-interactive
              onClick={onClose}
              className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-background/40 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors border border-border/10"
            >
              <X size={14} />
            </button>

            <div className="max-h-[90vh] overflow-y-auto">
              <AnimatePresence mode="wait">
                {step === "detail" && !submitted ? (
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Cinematic Hero */}
                    <div className="relative h-56 md:h-72 overflow-hidden">
                      <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        src={bot.image}
                        alt={bot.name}
                        width={800}
                        height={512}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-card/20" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${bot.accent} opacity-30 mix-blend-overlay`} />

                      {/* Tag */}
                      {bot.tag && (
                        <div className="absolute top-4 left-4 flex items-center gap-1.5 font-orbitron text-[8px] tracking-[0.3em] px-3 py-1.5 rounded-full bg-background/50 backdrop-blur-md text-foreground border border-border/20">
                          <Sparkles size={10} />
                          {bot.tag}
                        </div>
                      )}

                      {/* Title overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <div className="flex items-end justify-between">
                          <div className="flex items-center gap-4">
                            <motion.div
                              initial={{ scale: 0, rotate: -20 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ delay: 0.2, type: "spring" }}
                              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${bot.accent} flex items-center justify-center border border-border/20 backdrop-blur-sm`}
                            >
                              <Icon size={22} className="text-foreground" />
                            </motion.div>
                            <div>
                              <h3 className="font-orbitron text-xl md:text-2xl tracking-wider text-foreground">
                                {bot.name}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                {bot.features.slice(0, 2).map((f) => (
                                  <span key={f} className="text-[8px] font-orbitron tracking-wider text-muted-foreground">
                                    {f}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[8px] font-orbitron tracking-[0.3em] text-muted-foreground">PRICE</p>
                            <p className="font-orbitron text-3xl text-foreground">${bot.price}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 md:p-8 space-y-6">
                      {/* Description */}
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                      >
                        <p className="text-sm text-muted-foreground leading-relaxed">{bot.desc}</p>
                      </motion.div>

                      {/* Performance Grid */}
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <TrendingUp size={13} className="text-muted-foreground" />
                          <p className="text-[9px] font-orbitron tracking-[0.3em] text-muted-foreground">PERFORMANCE METRICS</p>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {bot.results.map((r, i) => (
                            <motion.div
                              key={r.label}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 + i * 0.05 }}
                              className={`relative rounded-2xl overflow-hidden text-center py-4 px-2`}
                            >
                              <div className={`absolute inset-0 bg-gradient-to-b ${bot.accent} opacity-30`} />
                              <div className="absolute inset-[1px] rounded-[15px] bg-card/90" />
                              <div className="relative z-10">
                                <p className="font-orbitron text-base md:text-lg text-foreground mb-1">{r.value}</p>
                                <p className="text-[7px] md:text-[8px] font-orbitron tracking-[0.15em] text-muted-foreground">{r.label}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Features list */}
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="flex flex-wrap gap-2"
                      >
                        {bot.features.map((f) => (
                          <span
                            key={f}
                            className="inline-flex items-center gap-1.5 text-[9px] font-orbitron tracking-wider px-3 py-2 rounded-xl bg-secondary/40 text-secondary-foreground border border-border/10"
                          >
                            <Check size={10} className="text-emerald-400" />
                            {f}
                          </span>
                        ))}
                      </motion.div>

                      {/* Trust badges */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-4 text-[9px] text-muted-foreground font-orbitron tracking-wider pt-2"
                      >
                        <span className="flex items-center gap-1.5"><Shield size={11} /> SECURE</span>
                        <span className="flex items-center gap-1.5"><Clock size={11} /> 24H DELIVERY</span>
                        <span className="flex items-center gap-1.5"><Check size={11} /> VERIFIED</span>
                      </motion.div>

                      {/* CTA */}
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        data-interactive
                        onClick={() => setStep("payment")}
                        className="relative w-full py-4 rounded-2xl font-orbitron text-xs tracking-[0.25em] text-foreground overflow-hidden group"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r ${bot.accent}`} />
                        <div className="absolute inset-[1px] rounded-[15px] bg-card/80 group-hover:bg-card/60 transition-colors duration-300" />
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          PROCEED TO PAYMENT
                          <ArrowRight size={16} />
                        </span>
                      </motion.button>
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
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-xs font-orbitron tracking-wider mb-8"
                    >
                      <ArrowLeft size={14} />
                      BACK
                    </button>

                    {/* Summary bar */}
                    <div className="flex items-center justify-between glass rounded-2xl p-4 mb-8">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${bot.accent} flex items-center justify-center border border-border/10`}>
                          <Icon size={16} className="text-foreground" />
                        </div>
                        <div>
                          <p className="font-orbitron text-xs tracking-wider text-foreground">{bot.name}</p>
                          <p className="text-[9px] text-muted-foreground">One-time purchase</p>
                        </div>
                      </div>
                      <p className="font-orbitron text-xl text-foreground">${bot.price}</p>
                    </div>

                    <h3 className="font-orbitron text-lg tracking-wider mb-6">Complete Payment</h3>

                    <p className="text-[9px] text-muted-foreground mb-2 font-orbitron tracking-[0.2em]">BINANCE ID</p>
                    <div className="glass rounded-xl p-4 flex items-center justify-between mb-6 border border-border/10">
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
                      className="w-full rounded-xl p-4 text-sm text-foreground placeholder:text-muted-foreground bg-secondary/30 border border-border/10 outline-none focus:border-border/30 transition-colors mb-8"
                    />

                    <button
                      data-interactive
                      onClick={handleSubmit}
                      className="relative w-full py-4 rounded-2xl font-orbitron text-xs tracking-[0.25em] text-foreground overflow-hidden group"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${bot.accent}`} />
                      <div className="absolute inset-[1px] rounded-[15px] bg-card/80 group-hover:bg-card/60 transition-colors duration-300" />
                      <span className="relative z-10">SUBMIT PAYMENT PROOF</span>
                    </button>
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
                    <h4 className="font-orbitron text-base tracking-wider mb-2">Payment Proof Received</h4>
                    <p className="text-muted-foreground text-sm mb-1">
                      <span className="text-foreground">{bot.name}</span> will be activated soon
                    </p>
                    <p className="text-muted-foreground text-xs">Access granted within 24 hours</p>
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
