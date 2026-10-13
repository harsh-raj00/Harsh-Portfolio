import React, { useState, useEffect, useRef } from "react";
import { Moon, Sun, Menu, X, ArrowUp, Compass, Mail, Download, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "./components/SocialIcons";
import CosmicBackground from "./components/CosmicBackground";
import LotusMandala from "./components/LotusMandala";
import ProjectManuscripts from "./components/ProjectManuscripts";
import ScribesSanctuary from "./components/ScribesSanctuary";
import { ScrollReveal } from "./hooks/useScrollReveal";

function TypewriterSubtitle() {
  const words = ["Software Engineer", "AI/ML Engineer", "Systems Builder", "Backend Developer"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer;
    const activeWord = words[currentWordIndex];

    if (!isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, currentText.length + 1));
      }, typingSpeed);

      if (currentText === activeWord) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
      }
    } else {
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, currentText.length - 1));
      }, 50);

      if (currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setTypingSpeed(100);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, typingSpeed]);

  return (
    <span
      className="font-mono text-sm block typewriter-cursor"
      style={{
        color: "var(--color-saffron)",
        fontWeight: "600",
        letterSpacing: "0.08em",
        borderRight: "2px solid var(--color-saffron)",
        paddingRight: "4px",
        minHeight: "1.4em",
        display: "inline-block"
      }}
    >
      {currentText}
    </span>
  );
}



function HomeSanskritQuote() {
  const quote = "विद्या ददाति विनयं विनयाद् याति पात्रताम्";
  const [textRevealed, setTextRevealed] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Staggered text reveal on mount
  useEffect(() => {
    const timer = setTimeout(() => setTextRevealed(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Typewriter quote effect with organic keypress timing simulation
  useEffect(() => {
    if (!textRevealed) return;
    if (quoteIndex >= quote.length) return;

    // Simulate natural human/mechanical typewriter pacing variation (55ms - 125ms)
    const randomDelay = 55 + Math.random() * 70;

    const timer = setTimeout(() => {
      setQuoteIndex((i) => i + 1);
    }, randomDelay);
    return () => clearTimeout(timer);
  }, [textRevealed, quoteIndex]);

  return (
    <div
      className="max-w-xl mx-auto mb-10 text-center relative"
      style={{
        padding: "1.2rem 2rem",
        background: "linear-gradient(90deg, transparent, rgba(205, 162, 80, 0.04), transparent)",
        borderTop: "1px solid rgba(205, 162, 80, 0.12)",
        borderBottom: "1px solid rgba(205, 162, 80, 0.12)",
      }}
    >
      {/* Small glowing badge in the center top */}
      <div
        className="absolute left-1/2 -top-3.5 flex items-center justify-center font-bold"
        style={{
          width: "26px",
          height: "26px",
          borderRadius: "50%",
          border: "1px solid rgba(205, 162, 80, 0.25)",
          background: "var(--bg-primary)",
          color: "var(--color-gold-glow)",
          transform: "translateX(-50%)",
          boxShadow: "0 0 10px rgba(224, 90, 16, 0.25)"
        }}
      >
        <Sparkles className="w-3.5 h-3.5" style={{ color: "var(--color-gold-glow)" }} />
      </div>

      <p
        className="text-base md:text-xl leading-relaxed font-semibold block"
        style={{
          color: "var(--color-text-primary)",
          fontFamily: "var(--font-classic)",
          minHeight: "1.5em",
          letterSpacing: "0.06em"
        }}
      >
        &ldquo;
        <span style={{ textShadow: "0 0 10px rgba(255, 215, 0, 0.15)" }}>
          {quote.slice(0, quoteIndex)}
        </span>
        {quoteIndex < quote.length && (
          <span
            className="typewriter-cursor"
            style={{
              display: "inline-block",
              width: "3px",
              height: "1.15em",
              backgroundColor: "var(--color-saffron)",
              marginLeft: "4px",
              verticalAlign: "middle",
              boxShadow: "0 0 8px var(--color-saffron)"
            }}
          />
        )}
        &rdquo;
      </p>
      <p
        className="text-xs md:text-sm mt-2.5 transition-all duration-1000"
        style={{
          color: "var(--color-saffron)",
          opacity: quoteIndex >= quote.length ? 0.9 : 0,
          fontFamily: "var(--font-classic)",
          letterSpacing: "0.08em"
        }}
      >
        (Knowledge gives humility, humility gives worthiness)
      </p>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState("light");
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);

  // Initialize Theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Handle Scroll Progress & Active Section highlights
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
      setNavScrolled(window.scrollY > 50);

      const sections = ["home", "about", "knowledge", "projects", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "knowledge", label: "Knowledge" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <div className="relative min-h-screen" style={{ width: "100%", overflowX: "hidden" }}>
      {/* Dynamic Cosmic Background */}
      <CosmicBackground />

      {/* Main Portfolio Content */}
      <div
        className="transition-all"
        style={{
          opacity: 1,
          display: "block"
        }}
      >
        {/* Top Scroll Indicator */}
        <div
          className="fixed"
          style={{
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(to right, var(--color-saffron), var(--color-gold-glow), var(--color-sandstone))",
            zIndex: 100,
            width: `${scrollProgress}%`,
            transition: "width 0.1s ease",
            boxShadow: "0 0 10px rgba(224, 90, 16, 0.5)"
          }}
        />

        {/* Global Navigation bar */}
        <nav
          className="fixed"
          style={{
            top: 0,
            left: 0,
            right: 0,
            zIndex: 40,
            backgroundColor: navScrolled
              ? "var(--nav-bg-scrolled)"
              : "transparent",
            backdropFilter: navScrolled ? "blur(20px) saturate(1.2)" : "none",
            WebkitBackdropFilter: navScrolled ? "blur(20px) saturate(1.2)" : "none",
            borderBottom: navScrolled ? "1px solid rgba(205, 162, 80, 0.12)" : "1px solid transparent",
            padding: navScrolled ? "0.75rem 0" : "1.25rem 0",
            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          <div className="container flex justify-between items-center">
            {/* Logo */}
            <a href="#home" className="header-logo">
              <Compass
                className="w-5 h-5"
                style={{
                  color: "var(--color-saffron)",
                  transition: "transform 0.5s ease",
                }}
              />
              HARSH RAJ
            </a>

            {/* Desktop Navigation */}
            <div className="hidden-mobile flex items-center gap-2">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`nav-tab ${activeTab === item.id ? "active" : ""}`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Theme Toggle & Mobile Menu Trigger */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center"
                style={{
                  padding: "0.55rem",
                  borderRadius: "10px",
                  border: "1px solid rgba(205, 162, 80, 0.2)",
                  backgroundColor: "transparent",
                  color: "var(--color-sandstone)",
                  cursor: "pointer",
                  transition: "var(--transition-smooth)"
                }}
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="toggle-mobile-menu flex items-center justify-center"
                style={{
                  padding: "0.55rem",
                  borderRadius: "10px",
                  border: "1px solid rgba(205, 162, 80, 0.2)",
                  backgroundColor: "transparent",
                  color: "var(--color-sandstone)",
                  cursor: "pointer"
                }}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation overlay */}
        <div
          className="fixed flex flex-col justify-center items-center gap-8"
          style={{
            inset: 0,
            zIndex: 30,
            backgroundColor: "var(--mobile-overlay-bg)",
            transform: mobileMenuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            backdropFilter: "blur(20px)"
          }}
        >
          {navItems.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-cinzel font-bold tracking-widest"
              style={{
                fontSize: "1.4rem",
                textDecoration: "none",
                color: activeTab === item.id ? "var(--color-saffron)" : "var(--color-text-secondary)",
                transition: "all 0.3s ease",
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${i * 80}ms`
              }}
            >
              {item.label.toUpperCase()}
            </a>
          ))}
        </div>

        {/* Floating Top Anchor */}
        <a
          href="#home"
          className="fixed flex items-center justify-center"
          style={{
            bottom: "1.5rem",
            right: "1.5rem",
            zIndex: 40,
            padding: "0.75rem",
            borderRadius: "14px",
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid rgba(205, 162, 80, 0.25)",
            color: "var(--color-sandstone)",
            textDecoration: "none",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            opacity: scrollProgress > 12 ? 1 : 0,
            transform: scrollProgress > 12 ? "scale(1) translateY(0)" : "scale(0.5) translateY(10px)",
            pointerEvents: scrollProgress > 12 ? "auto" : "none",
            boxShadow: "var(--scroll-anchor-shadow)",
            backdropFilter: "blur(10px)"
          }}
        >
          <ArrowUp className="w-5 h-5" />
        </a>

        {/* ========================================
            HOME SECTION
            ======================================== */}
        <div id="home" className="min-h-screen flex items-center relative" style={{ overflow: "hidden", paddingTop: "6rem" }}>
          <div className="sacred-grid" />
          <div className="container relative z-10 py-16 text-center">
            {/* PRIMARY: Name — the biggest thing on screen */}
            <ScrollReveal delay={100}>
              <h1 className="text-cinzel text-5xl md:text-7xl font-bold tracking-wider mb-3" style={{ lineHeight: "1.05" }}>
                <span className="gold-glow-text">HARSH</span>{" "}
                <span style={{ color: "var(--color-saffron)" }}>RAJ</span>
              </h1>
            </ScrollReveal>

            {/* Role typewriter */}
            <ScrollReveal delay={200}>
              <div className="mb-6" style={{ minHeight: "1.8em" }}>
                <TypewriterSubtitle />
              </div>
            </ScrollReveal>

            {/* Subtitle — role-specific, SEO-friendly */}
            <ScrollReveal delay={300}>
              <p
                className="text-marcellus text-lg md:text-xl max-w-2xl mb-8"
                style={{ color: "var(--color-text-secondary)", margin: "0 auto 2rem auto", lineHeight: "1.7" }}
              >
                Building intelligent, scalable systems at the intersection of AI/ML, Full-Stack Engineering, and Modern System Design
              </p>
            </ScrollReveal>

            {/* Sanskrit Quote */}
            <ScrollReveal delay={400}>
              <HomeSanskritQuote />
            </ScrollReveal>

            {/* CTAs — Projects + Resume
            <ScrollReveal delay={550}>
              <div className="flex gap-4 items-center justify-center flex-wrap mb-8">
                <a href="#projects" className="btn-primary text-sm">
                  VIEW MY PROJECTS
                </a>
                <a
                  href="/Harsh_Raj_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm"
                >
                  <Download className="w-4 h-4" /> DOWNLOAD RESUME
                </a>
              </div>
            </ScrollReveal> */}

            {/* Social Links
            <ScrollReveal delay={650}>
              <div className="social-links mb-12">
                <a href="https://github.com/harsh-raj00" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/in/harsh-raj10" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a href="mailto:harsh546raj@gmail.com" className="social-link" aria-label="Email">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </ScrollReveal> */}


          </div>
        </div>

        {/* ========================================
            ABOUT SECTION
            ======================================== */}
        <section id="about" className="py-24 relative" style={{ overflow: "hidden", backgroundColor: "var(--bg-secondary)" }}>
          <div className="container relative z-10">
            {/* Title */}
            <ScrollReveal>
              <div className="text-center mb-16">
                <span
                  className="text-xs text-marcellus uppercase block mb-3"
                  style={{ color: "var(--color-saffron)", letterSpacing: "0.3em" }}
                >
                  जीवनी (Biography)
                </span>
                <h2 className="text-cinzel text-3xl md:text-5xl font-bold tracking-wider mb-4">
                  Illuminated <span className="gold-glow-text">Biography</span>
                </h2>
                <div className="section-ornament">
                  <span style={{ color: "var(--color-sandstone)", fontSize: "0.8rem" }}>✦</span>
                </div>
              </div>
            </ScrollReveal>

            <div className="flex justify-center items-center w-full">
              <ScrollReveal animation="reveal-slide-up" className="w-full max-w-4xl">
                <div className="glass-panel gold-glow-border gradient-border relative">
                  <span
                    className="text-xs font-bold uppercase text-cinzel block mb-4"
                    style={{ color: "var(--color-saffron)", letterSpacing: "0.12em" }}
                  >
                    THE SCHOLARLY INVOCATION
                  </span>
                  <p
                    className="text-marcellus text-base md:text-lg mb-6 font-light"
                    style={{ color: "var(--color-text-primary)", lineHeight: "1.8" }}
                  >
                    I am a Data Science student & Artificial Intelligence student passionate about building intelligent, scalable, and production-grade software systems that solve meaningful real-world problems. My work lies at the intersection of software engineering, machine learning, and modern system design, where I focus on transforming complex ideas into reliable, high-performance, and impactful digital products.
                  </p>
                  <p
                    className="text-marcellus text-sm md:text-base mb-6"
                    style={{ color: "var(--color-text-secondary)", lineHeight: "1.7" }}
                  >
                    With expertise in Python, FastAPI, React, Solidity, PyTorch, and TensorFlow, I build end-to-end systems that combine rigorous engineering, intelligent automation, and scalable architecture. Driven by curiosity and continuous learning, I strive to create technology that is not only functional, but also intelligent, efficient, and impactful at scale.
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {["Full Stack Dev", "Machine Learning", "Generative AI", "Agentic AI", "System Design", "Cloud Tech", "Cyber Security", "Open Source"].map((tech, i) => (
                      <span
                        key={i}
                        className="font-mono font-semibold"
                        style={{
                          fontSize: "10px",
                          padding: "0.3rem 0.7rem",
                          borderRadius: "6px",
                          backgroundColor: "rgba(205,162,80,0.08)",
                          border: "1px solid rgba(205,162,80,0.15)",
                          color: "var(--color-sandstone)",
                          letterSpacing: "0.05em"
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Fields of Knowledge (Skills) */}
        <LotusMandala />

        {/* Manuscripts of Creation (Projects) */}
        <ProjectManuscripts />





        {/* Scribe's Sanctuary (Contact) */}
        <ScribesSanctuary />

        {/* Footer */}
        <footer
          className="py-12 text-center relative"
          style={{
            backgroundColor: "var(--footer-bg)",
            borderTop: "1px solid rgba(205,162,80,0.1)",
            overflow: "hidden"
          }}
        >
          <div className="container relative z-10">
            <span className="text-cinzel text-xl font-bold block mb-4" style={{ color: "var(--color-sandstone)", letterSpacing: "0.15em" }}>
              HARSH RAJ
            </span>
            <p className="text-xs mb-4" style={{ color: "var(--color-text-secondary)", letterSpacing: "0.05em" }}>
              "तपः स्वाध्याय ईश्वरप्रणिधानानि क्रियायोगः" — Austerity, study, and surrender constitute active yoga.
            </p>


            {/* Footer Social Links */}
            <div className="social-links mb-6" style={{ justifyContent: "center" }}>
              <a href="https://github.com/harsh-raj00" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub" style={{ width: "36px", height: "36px", borderRadius: "10px" }}>
                <GithubIcon className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com/in/harsh-raj10" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn" style={{ width: "36px", height: "36px", borderRadius: "10px" }}>
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href="mailto:harsh546raj@gmail.com" className="social-link" aria-label="Email" style={{ width: "36px", height: "36px", borderRadius: "10px" }}>
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div className="footer-divider" />
            <p className="font-mono" style={{ fontSize: "10px", color: "var(--color-text-secondary)", opacity: 0.5 }}>
              © 2026 HARSH RAJ. ALL KNOWLEDGE PRESERVED. ENGINEERED IN BHARAT 🇮🇳
            </p>
          </div>
        </footer>
      </div>

      {/* Embedded style tags for responsiveness helper rules */}
      <style>{`
        @media (max-width: 1023px) {
          .hidden-mobile {
            display: none !important;
          }
        }
        @media (min-width: 1024px) {
          .toggle-mobile-menu {
            display: none !important;
          }
        }
        @keyframes blink-cursor {
          from, to { opacity: 1 }
          50% { opacity: 0 }
        }
        .typewriter-cursor {
          animation: blink-cursor 0.75s step-end infinite;
        }
        @keyframes ink-reveal {
          0% {
            opacity: 0;
            filter: blur(5px);
            transform: scale(1.15);
          }
          100% {
            opacity: 1;
            filter: blur(0);
            transform: scale(1);
          }
        }
        .ink-char {
          display: inline-block;
          animation: ink-reveal 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          white-space: pre-wrap;
        }
        .biography-name {
          font-size: 3.4rem !important;
        }
        @media (max-width: 768px) {
          .biography-name {
            font-size: 2.4rem !important;
          }
        }
      `}</style>
    </div>
  );
}
