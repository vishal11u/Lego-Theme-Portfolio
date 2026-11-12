import { useEffect } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

const App = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="bg-[#080a0f] text-slate-100 min-h-screen selection:bg-cyan-400 selection:text-slate-950 scroll-smooth">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Experiences />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
