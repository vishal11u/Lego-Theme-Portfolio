import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Menu, X, Mail, Download, Radio, Terminal } from "lucide-react";

function Navigation({ closeMenu }) {
  const navItems = [
    { id: "about", label: "01 // ABOUT" },
    { id: "projects", label: "02 // SYSTEMS" },
    { id: "work", label: "03 // EXPERIENCE" },
    { id: "contact", label: "04 // CONTACT" },
  ];

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      closeMenu?.();
    }
  };

  return (
    <ul className="flex flex-col lg:flex-row items-center gap-1 xl:gap-2">
      {navItems.map((item) => (
        <li key={item.id} className="w-full lg:w-auto">
          <button
            onClick={() => handleClick(item.id)}
            className="w-full text-left lg:text-center px-3 py-1.5 rounded-md font-mono text-xs tracking-wider text-slate-300 hover:text-cyan-400 hover:bg-white/[0.04] border border-transparent hover:border-white/[0.08] transition-all duration-200 cursor-pointer"
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Top Telemetry Strip */}
      <div className="w-full bg-[#05070a]/90 border-b border-white/[0.06] backdrop-blur-md px-4 py-2 hidden sm:flex items-center justify-between text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-emerald-400 font-semibold tracking-wide">
              SYSTEM ONLINE
            </span>
          </div>
          <span className="text-white/20">|</span>
          <span className="flex items-center gap-1 text-slate-300">
            <Radio size={12} className="text-cyan-400" />
            INDIA [{time || "18:00:00"} IST]
          </span>
          <span className="text-white/20">|</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-cyan-400/90 font-bold">LATENCY: &lt;800ms</span>
          <span className="text-white/20">|</span>
          <span className="text-slate-400">STATUS: OPEN FOR NEW ROLES</span>
        </div>
      </div>

      {/* Main Cockpit Navbar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2.5">
        <div className="cockpit-panel rounded-xl px-4 py-2.5 flex items-center justify-between shadow-2xl border border-white/[0.08]">
          {/* Logo / Terminal Tag */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:bg-cyan-500/20 transition-all">
              <Terminal size={16} />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-sm font-bold text-white tracking-tight flex items-center gap-1">
                vishal.shitole
                <span className="text-cyan-400 animate-pulse font-mono font-normal">
                  _
                </span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 -mt-0.5">
                2.6+ YRS SOFTWARE DEV
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4">
            <Navigation />

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 pl-4 border-l border-white/[0.08]">
              <motion.a
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
                href="/Vishal-Shitole-Resume.pdf"
                download
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-cyan-400/40 transition-all cursor-pointer"
              >
                <Download size={13} className="text-cyan-400" />
                <span>RESUME</span>
              </motion.a>

              <motion.a
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
                href="https://mail.google.com/mail/?view=cm&fs=1&to=shitolevishal29@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-mono text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all cursor-pointer"
              >
                <Mail size={13} />
                <span>HIRE ME</span>
              </motion.a>

              <motion.a
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
                href="https://github.com/vishal11u"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all cursor-pointer"
                aria-label="GitHub Profile"
              >
                <Github size={15} />
              </motion.a>
            </div>
          </nav>

          {/* Mobile Actions & Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="/Vishal-Shitole-Resume.pdf"
              download
              className="p-2 rounded-lg text-slate-200 bg-white/[0.04] border border-white/[0.08]"
              aria-label="Download Resume"
            >
              <Download size={16} className="text-cyan-400" />
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden px-4 sm:px-6 pt-1"
          >
            <div className="cockpit-panel rounded-xl p-5 border border-white/[0.1] shadow-2xl space-y-4">
              <Navigation closeMenu={() => setIsOpen(false)} />

              <div className="pt-3 border-t border-white/[0.08] flex gap-2">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=shitolevishal29@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-mono text-xs font-semibold text-slate-900 bg-cyan-400 shadow-md"
                >
                  <Mail size={14} />
                  HIRE ME
                </a>
                <a
                  href="https://github.com/vishal11u"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg text-slate-200 bg-white/[0.06] border border-white/[0.1] flex items-center justify-center"
                >
                  <Github size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
