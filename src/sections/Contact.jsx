import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mail,
  User,
  MessageSquare,
  Check,
  AlertCircle,
  Copy,
  Terminal,
  MapPin,
  Phone,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success" | "error", message: string }
  const [copied, setCopied] = useState(false);

  const email = "shitolevishal29@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({
        type: "error",
        message: "Please fill out all required transmission parameters.",
      });
      return;
    }

    setIsLoading(true);
    setStatus(null);

    try {
      const response = await fetch("https://formspree.io/f/xjkovvdy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: "", email: "", message: "" });
        setStatus({
          type: "success",
          message: "Transmission received successfully! I will respond within 24 hours.",
        });
      } else {
        throw new Error("Failed to transmit message.");
      }
    } catch {
      setStatus({
        type: "error",
        message: "Transmission failed. Please reach me directly at shitolevishal29@gmail.com.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 mb-2 tracking-widest uppercase">
            <span>// 05. INITIALIZE CONNECTION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            START A CONVERSATION
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
            Whether you are building high-throughput SaaS, architecting real-time
            trading engines, or looking for a senior developer who owns outcomes
            end-to-end — my terminal is open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Telemetry & Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Status Card */}
            <div className="cockpit-panel rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="font-mono text-xs text-emerald-400 font-bold tracking-wide">
                  AVAILABILITY: OPEN FOR OPPORTUNITIES
                </span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                Currently open for full-time frontend/full-stack roles,
                architectural consultations, and high-impact contractor
                engagements worldwide.
              </p>
            </div>

            {/* Direct Channel Cards */}
            <div className="cockpit-panel rounded-2xl p-6 space-y-4">
              <div className="font-mono text-xs text-slate-400 tracking-wider">
                DIRECT COMM CHANNELS:
              </div>

              {/* Email Button */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono text-slate-400">
                  PRIMARY EMAIL
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=shitolevishal29@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-xs font-mono text-white hover:text-cyan-400 transition-colors truncate"
                  >
                    {email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-3 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    {copied ? (
                      <Check size={16} className="text-emerald-400" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              </div>

              {/* Phone & Location */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 mb-1">
                    <Phone size={12} className="text-cyan-400" />
                    <span>PHONE / WA</span>
                  </div>
                  <div className="text-xs font-mono text-slate-200">
                    +91 9075393810
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 mb-1">
                    <MapPin size={12} className="text-amber-400" />
                    <span>BASE</span>
                  </div>
                  <div className="text-xs font-mono text-slate-200 truncate">
                    Pune, IN (Remote)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Terminal Cockpit Form (7 cols) */}
          <div className="lg:col-span-7 cockpit-panel rounded-2xl p-6 sm:p-8 relative">
            <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Terminal size={16} className="text-cyan-400" />
                <span className="font-mono text-xs text-white font-bold tracking-wider">
                  SEND SECURE DISPATCH
                </span>
              </div>
              <span className="font-mono text-[10px] text-slate-500">
                TLS // 256-BIT ENCRYPTED
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-mono text-xs text-slate-300 uppercase mb-2">
                  // 01. YOUR IDENTITY / NAME
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Mercer"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/[0.1] focus:border-cyan-400 focus:outline-none font-mono text-sm text-white placeholder-slate-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-slate-300 uppercase mb-2">
                  // 02. RETURN COMM CHANNEL / EMAIL
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@company.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/[0.1] focus:border-cyan-400 focus:outline-none font-mono text-sm text-white placeholder-slate-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-slate-300 uppercase mb-2">
                  // 03. MISSION PARAMETERS / MESSAGE
                </label>
                <div className="relative">
                  <MessageSquare
                    size={16}
                    className="absolute left-3.5 top-3.5 text-slate-500"
                  />
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your product, high-level requirements, or timeline..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/[0.1] focus:border-cyan-400 focus:outline-none font-mono text-sm text-white placeholder-slate-600 transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Status Notice */}
              <AnimatePresence>
                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className={`flex items-center gap-2 p-3 rounded-lg font-mono text-xs ${
                      status.type === "success"
                        ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                        : "bg-rose-500/10 border border-rose-500/30 text-rose-400"
                    }`}
                  >
                    {status.type === "success" ? (
                      <Check size={16} />
                    ) : (
                      <AlertCircle size={16} />
                    )}
                    <span>{status.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Action Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-mono text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.35)] disabled:opacity-50 transition-all cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                    <span>TRANSMITTING DISPATCH...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>TRANSMIT DISPATCH [ENTER]</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
