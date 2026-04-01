import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, X, ArrowRight, ArrowLeft, TrendingUp } from "lucide-react";
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
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background/85 backdrop-blur-md px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="glass-strong rounded-2xl max-w-2xl w-full relative max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            data-interactive
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>

          <AnimatePresence mode="wait">
            {step === "detail" && !submitted ? (
              <motion.div
                key="detail"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Hero Image */}
                <div className="relative rounded-t-2xl overflow-hidden">
                  <img
                    src={bot.image}
                    alt={bot.name}
                    width={800}
                    height={512}
                    className="w-full h-52 md:h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

                  {/* Tag overlay */}
                  {bot.tag && (
                    <span className="absolute top-4 left-4 font-orbitron text-[9px] tracking-[0.2em] px-3 py-1.5 rounded-full bg-accent/70 text-foreground border border-border/30 backdrop-blur-sm">
                      {bot.tag}
                    </span>
                  )}

                  {/* Icon + Title overlay */}
                  <div className="absolute bottom-4 left-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg glass flex items-center justify-center">
                      <Icon size={18} className="text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-orbitron text-lg tracking-wider text-foreground">{bot.name}</h3>
                      <p className="font-orbitron text-xl text-foreground">${bot.price}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                  {/* Description */}
                  <div>
                    <p className="text-[10px] font-orbitron tracking-[0.3em] text-muted-foreground mb-2">ABOUT</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{bot.desc}</p>
                  </div>

                  {/* Features */}
                  <div>
                    <p className="text-[10px] font-orbitron tracking-[0.3em] text-muted-foreground mb-3">FEATURES</p>
                    <div className="flex flex-wrap gap-2">
                      {bot.features.map((f) => (
                        <span
                          key={f}
                          className="text-[10px] font-orbitron tracking-wider px-3 py-1.5 rounded-md bg-secondary/60 text-secondary-foreground border border-border/20"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp size={14} className="text-muted-foreground" />
                      <p className="text-[10px] font-orbitron tracking-[0.3em] text-muted-foreground">PERFORMANCE</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {bot.results.map((r) => (
                        <div
                          key={r.label}
                          className="glass rounded-xl p-4 text-center"
                        >
                          <p className="font-orbitron text-lg text-foreground mb-1">{r.value}</p>
                          <p className="text-[9px] font-orbitron tracking-wider text-muted-foreground">{r.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    data-interactive
                    onClick={() => setStep("payment")}
                    className="w-full glass magnetic-hover py-3.5 rounded-xl font-orbitron text-xs tracking-[0.2em] text-foreground flex items-center justify-center gap-3 border border-border/20 hover:border-border/40 transition-all"
                  >
                    PROCEED TO PAYMENT
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ) : step === "payment" && !submitted ? (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="p-6 md:p-8"
              >
                <button
                  data-interactive
                  onClick={() => setStep("detail")}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-xs font-orbitron tracking-wider mb-6"
                >
                  <ArrowLeft size={14} />
                  BACK
                </button>

                <h3 className="font-orbitron text-lg tracking-wider mb-2">Complete Payment</h3>
                <p className="text-muted-foreground text-sm mb-1">
                  Purchasing: <span className="text-foreground">{bot.name}</span>
                </p>
                <p className="text-muted-foreground text-sm mb-6">
                  Amount: <span className="font-orbitron text-foreground">${bot.price}</span>
                </p>

                <p className="text-xs text-muted-foreground mb-2 font-orbitron tracking-wider">Binance ID</p>
                <div className="glass rounded-lg p-4 flex items-center justify-between mb-6">
                  <span className="text-xs text-foreground font-mono break-all">{BINANCE_ID}</span>
                  <button
                    data-interactive
                    onClick={handleCopy}
                    className="ml-4 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>

                <p className="text-xs text-muted-foreground mb-2 font-orbitron tracking-wider">Paste Transaction ID</p>
                <input
                  value={txId}
                  onChange={(e) => setTxId(e.target.value)}
                  placeholder="Enter your transaction ID..."
                  className="w-full glass rounded-lg p-4 text-sm text-foreground placeholder:text-muted-foreground bg-transparent outline-none focus:ring-1 focus:ring-border mb-6"
                />

                <button
                  data-interactive
                  onClick={handleSubmit}
                  className="w-full glass magnetic-hover py-3 rounded-lg font-orbitron text-xs tracking-widest text-foreground"
                >
                  SUBMIT PAYMENT PROOF
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center py-16"
              >
                <Check size={48} className="mx-auto mb-4 text-foreground" />
                <h4 className="font-orbitron text-sm tracking-wider mb-2">Payment Proof Received</h4>
                <p className="text-muted-foreground text-sm mb-1">
                  Bot: <span className="text-foreground">{bot.name}</span>
                </p>
                <p className="text-muted-foreground text-sm">Access will be granted within 24 hours.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BotDetailModal;
