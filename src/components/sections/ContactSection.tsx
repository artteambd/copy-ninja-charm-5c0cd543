import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check, Mail, User, MessageSquare, MapPin, Phone } from "lucide-react";

const ContactSection = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) setSent(true);
  };

  return (
    <section className="min-h-screen pt-32 pb-24 px-6 relative">
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      {!sent ? (
        <>
          <div className="max-w-5xl mx-auto text-center mb-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-6"
            >
              <Mail size={12} className="text-muted-foreground" />
              <span className="font-orbitron text-[9px] tracking-[0.4em] text-muted-foreground">GET IN TOUCH</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-orbitron text-3xl md:text-4xl gradient-text mb-4"
            >
              CONTACT US
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-sm"
            >
              Have questions? We'd love to hear from you.
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8 relative z-10">
            {/* Info cards */}
            <div className="md:col-span-2 space-y-4">
              {[
                { icon: MapPin, title: "Location", text: "Dhaka, Bangladesh" },
                { icon: Mail, title: "Email", text: "support@artsoftwares.com" },
                { icon: Phone, title: "Support", text: "24/7 Available" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-5 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl glass-strong flex items-center justify-center shrink-0">
                    <item.icon size={16} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-orbitron text-[9px] tracking-wider text-muted-foreground">{item.title}</p>
                    <p className="text-sm text-foreground">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="md:col-span-3 glass rounded-2xl p-6 space-y-4"
            >
              <div className="relative">
                <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl p-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground bg-secondary/20 border border-border/10 outline-none focus:border-border/30 transition-colors"
                />
              </div>
              <div className="relative">
                <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl p-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground bg-secondary/20 border border-border/10 outline-none focus:border-border/30 transition-colors"
                />
              </div>
              <div className="relative">
                <MessageSquare size={14} className="absolute left-4 top-4 text-muted-foreground" />
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl p-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground bg-secondary/20 border border-border/10 outline-none focus:border-border/30 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                data-interactive
                className="relative w-full py-4 rounded-xl font-orbitron text-[10px] tracking-[0.25em] text-foreground overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent/40 to-muted/40" />
                <div className="absolute inset-[1px] rounded-[11px] bg-card/80 group-hover:bg-card/60 transition-colors duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  SEND MESSAGE
                  <Send size={13} />
                </span>
              </button>
            </motion.form>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto text-center pt-32"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12 }}
            className="w-16 h-16 rounded-2xl glass-strong flex items-center justify-center mx-auto mb-6"
          >
            <Check size={32} className="text-foreground" />
          </motion.div>
          <h3 className="font-orbitron text-lg tracking-wider mb-2">Message Sent</h3>
          <p className="text-muted-foreground text-sm">We'll get back to you within 24 hours.</p>
        </motion.div>
      )}
    </section>
  );
};

export default ContactSection;
