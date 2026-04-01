import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";

const ContactSection = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.message) setSent(true);
  };

  return (
    <section className="min-h-screen pt-32 pb-24 px-6">
      {!sent ? (
        <>
          <div className="max-w-5xl mx-auto text-center mb-16">
            <h2 className="font-orbitron text-2xl md:text-3xl gradient-text mb-4">CONTACT</h2>
            <p className="text-muted-foreground text-sm">Get in touch with the ART SOFTWARES team.</p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto space-y-4"
          >
            <input
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full glass rounded-lg p-4 text-sm text-foreground placeholder:text-muted-foreground bg-transparent outline-none focus:ring-1 focus:ring-border"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full glass rounded-lg p-4 text-sm text-foreground placeholder:text-muted-foreground bg-transparent outline-none focus:ring-1 focus:ring-border"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full glass rounded-lg p-4 text-sm text-foreground placeholder:text-muted-foreground bg-transparent outline-none focus:ring-1 focus:ring-border resize-none"
            />
            <button
              type="submit"
              data-interactive
              className="w-full glass magnetic-hover py-4 rounded-lg font-orbitron text-xs tracking-widest text-foreground flex items-center justify-center gap-3"
            >
              SEND MESSAGE
              <Send size={14} />
            </button>
          </motion.form>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto text-center pt-32"
        >
          <Check size={48} className="mx-auto mb-4 text-foreground" />
          <h3 className="font-orbitron text-lg tracking-wider mb-2">Message Sent</h3>
          <p className="text-muted-foreground text-sm">We'll get back to you soon.</p>
        </motion.div>
      )}
    </section>
  );
};

export default ContactSection;
