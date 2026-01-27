import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";

// Mock social data - replace with your actual data
const mySocials = [
  { name: "GitHub", href: "https://github.com/vishal11u", icon: Github },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/vishal1-shitole/", icon: Linkedin },
  { name: "Email", href: "mailto:shitolevishal29@gmail.com", icon: Mail },
];

const Footer = () => {
  const brickColors = ['bg-red-500', 'bg-blue-500', 'bg-yellow-400', 'bg-green-500'];

  return (
    <footer className="relative bg-linear-to-b from-blue-200 to-purple-300 py-12 px-6 overflow-hidden">
      {/* LEGO Baseplate Background */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={`grid-${i}`}>
            <div className="absolute w-full h-1 bg-gray-800" style={{ top: `${i * 10}%` }} />
            <div className="absolute h-full w-1 bg-gray-800" style={{ left: `${i * 14}%` }} />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* LEGO Brick Divider */}
        <div className="relative mb-8 h-4">
          <div className="absolute inset-x-0 h-2 bg-linear-to-r from-red-500 via-yellow-400 to-blue-500 rounded-full" />
          <div className="absolute left-1/2 -translate-x-1/2 top-0 flex gap-3">
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-5 h-5 bg-red-500 rounded-full shadow-lg"
            />
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, delay: 0.2, repeat: Infinity }}
              className="w-5 h-5 bg-yellow-400 rounded-full shadow-lg"
            />
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, delay: 0.4, repeat: Infinity }}
              className="w-5 h-5 bg-blue-500 rounded-full shadow-lg"
            />
          </div>
        </div>

        {/* Social Links - LEGO Bricks */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {mySocials.map((social, index) => {
            const Icon = social.icon;
            const color = brickColors[index % brickColors.length];
            
            return (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -8, rotate: 5, scale: 1.1 }}
                whileTap={{ y: 0, scale: 0.95 }}
                className={`relative flex items-center justify-center w-16 h-16 ${color} rounded-lg shadow-xl border-b-4 border-black border-opacity-30 group transition-all`}
                title={social.name}
              >
                {/* LEGO studs on social bricks */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-1">
                  <div className={`w-2 h-2 ${color} rounded-full border border-black border-opacity-20`} />
                  <div className={`w-2 h-2 ${color} rounded-full border border-black border-opacity-20`} />
                </div>
                
                <Icon size={28} className="text-white group-hover:scale-110 transition-transform" />
                
                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-xs font-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {social.name}
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Copyright Text - LEGO Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block bg-white px-8 py-4 rounded-lg shadow-lg border-b-4 border-gray-300 relative">
            {/* Small LEGO studs */}
            <div className="absolute -top-2 left-4 flex gap-2">
              <div className="w-3 h-3 bg-white rounded-full border-2 border-gray-300" />
              <div className="w-3 h-3 bg-white rounded-full border-2 border-gray-300" />
            </div>
            <div className="absolute -top-2 right-4 flex gap-2">
              <div className="w-3 h-3 bg-white rounded-full border-2 border-gray-300" />
              <div className="w-3 h-3 bg-white rounded-full border-2 border-gray-300" />
            </div>

            <p className="text-gray-900 font-black text-sm uppercase flex items-center gap-2 flex-wrap justify-center">
              <span>© 2026 Vishal.</span>
              <span className="flex items-center gap-1">
                Built with
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart size={16} className="text-red-500 fill-red-500" />
                </motion.span>
                & LEGO Bricks
              </span>
            </p>
          </div>
        </motion.div>

        {/* Bottom LEGO Bricks Decoration */}
        <div className="flex justify-center gap-4 mt-8">
          {[...Array(5)].map((_, i) => {
            const colors = ['bg-red-500', 'bg-blue-500', 'bg-yellow-400', 'bg-green-500', 'bg-purple-500'];
            return (
              <motion.div
                key={i}
                initial={{ y: 0 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  duration: 2, 
                  delay: i * 0.2, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
                className={`w-12 h-8 ${colors[i]} rounded-md shadow-lg border-b-4 border-black border-opacity-30 relative`}
              >
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 flex gap-1">
                  <div className={`w-2 h-2 ${colors[i]} rounded-full border border-black border-opacity-20`} />
                  <div className={`w-2 h-2 ${colors[i]} rounded-full border border-black border-opacity-20`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Fun Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6"
        >
          <p className="text-gray-700 font-bold text-xs">
            🧱 Every great project starts with a single brick 🧱
          </p>
        </motion.div>
      </div>

      {/* Scattered LEGO studs in corners */}
      <div className="absolute bottom-4 left-4 w-6 h-6 bg-red-500 rounded-full opacity-30" />
      <div className="absolute bottom-4 right-4 w-6 h-6 bg-blue-500 rounded-full opacity-30" />
      <div className="absolute top-4 left-8 w-5 h-5 bg-yellow-400 rounded-full opacity-30" />
      <div className="absolute top-4 right-8 w-5 h-5 bg-green-500 rounded-full opacity-30" />
    </footer>
  );
};

export default Footer;