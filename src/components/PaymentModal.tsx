import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, X } from "lucide-react";

interface PaymentModalProps {
  botName: string;
  onClose: () => void;
}

const BINANCE_ID = "bc1qxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

const PaymentModal = ({ botName, onClose }: PaymentModalProps) => {
  const [txId, setTxId] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="glass-strong rounded-2xl p-8 max-w-md w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            data-interactive
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>

          {!submitted ? (
            <>
              <h3 className="font-orbitron text-lg tracking-wider mb-2">Complete Payment via Binance</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Purchasing: <span className="text-foreground">{botName}</span>
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
            </>
          ) : (
            <div className="text-center py-8">
              <Check size={48} className="mx-auto mb-4 text-foreground" />
              <h4 className="font-orbitron text-sm tracking-wider mb-2">Payment Proof Received</h4>
              <p className="text-muted-foreground text-sm">Access will be granted within 24 hours.</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentModal;
