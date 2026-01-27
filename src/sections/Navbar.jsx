import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Menu, X, Mail, Download } from "lucide-react";

function Navigation({ closeMenu }) {
  const navItems = ["home", "about", "work", "contact", "projects"];

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      closeMenu?.();
    }
  };

  return (
    <ul className="flex flex-col gap-4 sm:flex-row sm:gap-2 text-sm font-black uppercase">
      {navItems.map((item, index) => {
        // LEGO brick colors rotation
        const colors = ['bg-red-500', 'bg-blue-500', 'bg-yellow-400', 'bg-green-500', 'bg-purple-500'];
        const color = colors[index % colors.length];
        
        return (
          <motion.li 
            key={item}
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ y: 0 }}
          >
            <button
              onClick={() => handleClick(item)}
              className={`relative w-full md:px-6 py-2 ${color} cursor-pointer text-white rounded-lg shadow-md border-b-4 border-opacity-50 border-black hover:shadow-lg transition-all duration-200`}
            >
              {/* LEGO studs on button */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex gap-1">
                <div className="w-2 h-2 bg-black bg-opacity-20 rounded-full" />
                <div className="w-2 h-2 bg-black bg-opacity-20 rounded-full" />
              </div>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          </motion.li>
        );
      })}
    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 shadow-xl border-b-8 border-yellow-500">
      {/* LEGO baseplate pattern on navbar */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-black"
            style={{ top: `${(i + 1) * 25}%` }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-4 sm:py-5 flex items-center justify-between">
        {/* Logo - LEGO Style */}
        <motion.a
          href="/"
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-black text-xl uppercase shadow-lg border-b-4 border-red-700"
        >
          <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center border-2 border-red-700">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-1.5 h-1.5 bg-red-700 rounded-full" />
              <div className="w-1.5 h-1.5 bg-red-700 rounded-full" />
              <div className="w-1.5 h-1.5 bg-red-700 rounded-full" />
              <div className="w-1.5 h-1.5 bg-red-700 rounded-full" />
            </div>
          </div>
          Vishal
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4">
          <Navigation />

          {/* Action Buttons - LEGO Style */}
          <div className="flex gap-3 ml-4">
            <motion.a
              whileHover={{ y: -4 }}
              whileTap={{ y: 0 }}
              href="https://mail.google.com/mail/?view=cm&fs=1&to=shitolevishal29@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-black uppercase text-white bg-green-500 hover:bg-green-600 shadow-md border-b-4 border-green-700 transition-all"
            >
              <Mail size={16} />
              <span className="hidden xl:inline">Hire Me</span>
            </motion.a>
            
            <motion.a
              whileHover={{ y: -4 }}
              whileTap={{ y: 0 }}
              href="/Vishal-Shitole-Resume-.pdf"
              download
              className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-black uppercase text-white bg-orange-500 hover:bg-orange-600 shadow-md border-b-4 border-orange-700 transition-all"
            >
              <Download size={16} />
              <span className="hidden xl:inline">Resume</span>
            </motion.a>
            
            <motion.a
              whileHover={{ y: -4, rotate: 5 }}
              whileTap={{ y: 0 }}
              href="https://github.com/vishal11u"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-black uppercase bg-white text-gray-900 hover:bg-gray-100 shadow-md border-b-4 border-gray-300 transition-all"
            >
              <Github size={16} />
              <span className="hidden xl:inline">GitHub</span>
            </motion.a>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <motion.a
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            href="https://github.com/vishal11u"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white text-gray-900 shadow-md border-b-4 border-gray-300"
          >
            <Github size={20} />
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-yellow-400 text-gray-900 shadow-md border-b-4 border-yellow-600 focus:outline-none"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation - LEGO Style */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="lg:hidden bg-linear-to-b from-purple-400 to-blue-400 px-4 py-6 border-t-4 border-yellow-500 shadow-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-4">
              <Navigation closeMenu={() => setIsOpen(false)} />
              
              <div className="pt-4 space-y-3">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=shitolevishal29@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-black uppercase text-white bg-green-500 shadow-md border-b-4 border-green-700"
                >
                  <Mail size={18} />
                  Hire Me
                </motion.a>
                
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="/Vishal-Shitole-Resume-.pdf"
                  download
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-black uppercase text-white bg-orange-500 shadow-md border-b-4 border-orange-700"
                >
                  <Download size={18} />
                  Download Resume
                </motion.a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* LEGO studs decoration at bottom of navbar */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        <div className="w-3 h-3 bg-red-500 rounded-full shadow" />
        <div className="w-3 h-3 bg-blue-500 rounded-full shadow" />
        <div className="w-3 h-3 bg-yellow-400 rounded-full shadow" />
        <div className="w-3 h-3 bg-green-500 rounded-full shadow" />
      </div>
    </header>
  );
};

export default Navbar;