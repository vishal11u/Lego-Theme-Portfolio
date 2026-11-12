import {
  Github,
  Linkedin,
  Mail,
  ArrowUp,
  Terminal,
  Instagram,
} from "lucide-react";
import { mySocials } from "../constants";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getSocialIcon = (name) => {
    switch (name.toLowerCase()) {
      case "github":
        return <Github size={16} />;
      case "linkedin":
        return <Linkedin size={16} />;
      case "instagram":
        return <Instagram size={16} />;
      default:
        return <Mail size={16} />;
    }
  };

  return (
    <footer className="space-section w-full bg-[#05070a] border-t border-white/[0.08] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="footer-signal" aria-hidden="true" />
      <div className="max-w-7xl mx-auto flex flex-col space-y-8">
        {/* Top Row: System Status & Quick Scroll */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-8 border-b border-white/[0.06] gap-4">
          <div className="space-reveal flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Terminal size={15} />
            </div>
            <div>
              <div className="font-mono text-xs font-bold text-white tracking-wider flex items-center gap-2">
                <span>VISHAL SHITOLE</span>
                <span className="text-[10px] text-cyan-400 font-normal">
                  // PROD_BUILD_v2.6
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-500">
                INDIA // LATENCY &lt;800MS // UTC+5:30
              </div>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="footer-back-top space-reveal group flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs text-slate-400 hover:text-cyan-400 bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] transition-all cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp
              size={13}
              className="transition-transform duration-300 group-hover:-translate-y-1"
            />
          </button>
        </div>

        {/* Bottom Row: Social Channels & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
          <div className="space-reveal">
            © {new Date().getFullYear()} Vishal Shitole. Designed &amp;
            engineered with Next-Gen
          </div>

          {/* Social Channels */}
          <div className="flex items-center gap-3">
            {mySocials.map((social, index) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ transitionDelay: `${index * 70}ms` }}
                className="footer-social-link space-reveal p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-slate-400 hover:text-cyan-400 transition-all"
                title={social.name}
                aria-label={social.name}
              >
                {getSocialIcon(social.name)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
