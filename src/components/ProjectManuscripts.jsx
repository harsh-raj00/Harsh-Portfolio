import React, { useState } from "react";
import { ExternalLink, BookOpen, Shield, BookMarked, Brain, Globe, Lock, Zap, Home } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { ScrollReveal } from "../hooks/useScrollReveal";

export default function ProjectManuscripts() {
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "BookBridge",
      category: "Full-Stack Platform",
      description: "A full-stack marketplace where college students buy & sell academic textbooks and share study resources — notes, PDFs, assignments, question papers — all in one hub.",
      specs: "Python FastAPI backend with SQLAlchemy ORM, JWT authentication, and CORS middleware. Premium frontend with modern UI design principles. Includes Smart Search, 9 book categories, StudyVault resource sharing, and Dockerized deployment on Render.",
      tech: ["Python", "FastAPI", "SQLAlchemy", "JWT", "Docker", "SQLite"],
      links: { live: "https://bookbridge-xh39.onrender.com", github: "https://github.com/harsh-raj00/BookBridge" },
      sanskrit: "पुस्तक सेतु (Book Bridge)",
      icon: <BookMarked className="w-5 h-5" style={{ color: "var(--color-saffron)" }} />,
      gradient: "var(--proj-gradient-2)",
      accentColor: "#e05a10"
    },
    {
      id: 2,
      title: "LivspaceOne",
      category: "E-Commerce / Architecture",
      description: "India's premier digital storefront for sophisticated space creation — connecting luxury homeowners with elite certified contractors, architects, and design experts.",
      specs: "Dual-system architecture: LuxeBuild Mart (e-commerce for construction materials with cart, checkout, product filters) and Design Studio (professional hiring, scheduling, live-tracking). Features admin CMS panel, Smart Concierge chatbot, lightbox portfolio viewing, and custom bento grid workflow panels. Node.js + Express + MongoDB + Socket.io.",
      tech: ["Node.js", "Express.js", "MongoDB", "Socket.io", "CSS3", "JWT"],
      links: { live: "https://livspaceone.onrender.com", github: "https://github.com/harsh-raj00/livspaceone" },
      sanskrit: "लिव्स्पेस वन (LivspaceOne)",
      icon: <Home className="w-5 h-5" style={{ color: "var(--color-sandstone)" }} />,
      gradient: "var(--proj-gradient-5)",
      accentColor: "#4a9e6e"
    },
    {
      id: 3,
      title: "J.A.R.V.I.S.",
      category: "AI / Full-Stack",
      description: "An AI-powered personal assistant with a cinematic Iron Man holographic interface. Features real-time 3D holographic sphere with 8,000 particles, voice control, and smart home integration.",
      specs: "Built with React + Three.js frontend featuring Arc Reactor animations, 8K-particle holographic sphere with custom GLSL shaders, and Siri-like voice orb. FastAPI backend with Google Gemini API, WebSocket real-time chat, 5 auto-discovered plugins (System, Calendar, Smart Home, Email, Weather), SQLAlchemy ORM, and ElevenLabs voice synthesis.",
      tech: ["React", "Three.js", "FastAPI", "Gemini API", "WebSocket", "Framer Motion"],
      links: { live: "https://jarvis-frontend-uj30.onrender.com", github: "https://github.com/harsh-raj00/my-jarvis" },
      sanskrit: "जार्विस (J.A.R.V.I.S.)",
      icon: <Brain className="w-5 h-5" style={{ color: "var(--color-saffron)" }} />,
      gradient: "var(--proj-gradient-1)",
      accentColor: "#4da6ff",
    },
    {
      id: 4,
      title: "EthSecure Health",
      category: "Blockchain / Web3",
      description: "A patient-centric Ethereum blockchain system for secure electronic health records using IPFS decentralized storage, client-side AES-256 encryption, and role-based smart contracts.",
      specs: "Dual Solidity smart contracts (^0.8.20) with OpenZeppelin RBAC for patients, doctors, and diagnostic centers. Medical data encrypted client-side with AES-256 before IPFS upload via Pinata. React 19 + Vite 8 frontend with MetaMask integration. MongoDB backend for user profiles and access request workflows.",
      tech: ["Solidity", "React", "ethers.js", "MongoDB", "Hardhat", "IPFS"],
      links: { live: "https://ethsecure-health.onrender.com", github: "https://github.com/harsh-raj00/EthSecure-Health-" },
      sanskrit: "सुरक्षित स्वास्थ्य (Secure Health)",
      icon: <Lock className="w-5 h-5" style={{ color: "var(--color-saffron)" }} />,
      gradient: "var(--proj-gradient-4)",
      accentColor: "#b87333"
    },
    {
      id: 5,
      title: "DeepfakeGuard",
      category: "AI / Computer Vision",
      description: "Multi-layered biometric authentication combining real-time face detection, recognition, liveness verification, and AI-powered deepfake detection to protect identity against spoofing attacks.",
      specs: "4-layer security pipeline: SSD+ResNet face detection (~15ms), 128-D face recognition (~25ms), EAR+Head Pose liveness detection, and MesoNet CNN deepfake detection with Grad-CAM explainability. Achieves 96% accuracy, 98.68% precision. Risk-based weighted scoring engine with attack severity classification.",
      tech: ["Python", "TensorFlow", "OpenCV", "MediaPipe", "Flask", "MesoNet"],
      links: { live: "https://deepfakeguard-3ufd.onrender.com", github: "https://github.com/harsh-raj00/DeepfakeGuard" },
      sanskrit: "छल रक्षक (Deepfake Guard)",
      icon: <Shield className="w-5 h-5" style={{ color: "var(--color-sandstone)" }} />,
      gradient: "var(--proj-gradient-3)",
      accentColor: "#cda250"
    }
  ];

  // Spotlight mouse tracking
  const handleMouseMove = (e, cardEl) => {
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardEl.style.setProperty("--mouse-x", `${x}%`);
    cardEl.style.setProperty("--mouse-y", `${y}%`);
  };

  return (
    <section id="projects" className="py-24 relative" style={{ overflow: "hidden", backgroundColor: "var(--bg-secondary)" }}>
      {/* Background patterns */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.02,
          pointerEvents: "none",
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M54 48c-2 0-3 1-4 2v4c0 1-1 2-2 2h-4c-1 0-2 1-2 2s1 2 2 2h4c2 0 3-1 4-2v-4c0-1 1-2 2-2h4c1 0 2-1 2-2s-1-2-2-2h-4zM30 20c-2 0-3 1-4 2v4c0 1-1 2-2 2h-4c-1 0-2 1-2 2s1 2 2 2h4c2 0 3-1 4-2v-4c0-1 1-2 2-2h4c1 0 2-1 2-2s-1-2-2-2h-4z\' fill=\'%23cda250\' fill-opacity=\'0.15\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'
        }}
      />

      <div className="container relative z-10">
        {/* Title */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span
              className="text-xs text-marcellus uppercase block mb-3"
              style={{ color: "var(--color-saffron)", letterSpacing: "0.3em" }}
            >
              कृतयो (Creations)
            </span>
            <h2 className="text-cinzel text-3xl md:text-5xl font-bold tracking-wider mb-4">
              Manuscripts of <span className="gold-glow-text">Creation</span>
            </h2>
            <div className="section-ornament">
              <span style={{ color: "var(--color-sandstone)", fontSize: "0.8rem" }}>✦</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Project cards — top row of 3, bottom row of 2 centered */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ marginBottom: "2rem" }}>
          {projects.slice(0, 3).map((proj, index) => (
            <ProjectCard
              key={proj.id}
              proj={proj}
              index={index}
              isOpen={activeProject === proj.id}
              onToggle={() => setActiveProject(activeProject === proj.id ? null : proj.id)}
              onMouseMove={handleMouseMove}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ maxWidth: "820px", margin: "0 auto" }}>
          {projects.slice(3).map((proj, index) => (
            <ProjectCard
              key={proj.id}
              proj={proj}
              index={index + 3}
              isOpen={activeProject === proj.id}
              onToggle={() => setActiveProject(activeProject === proj.id ? null : proj.id)}
              onMouseMove={handleMouseMove}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ proj, index, isOpen, onToggle, onMouseMove }) {
  return (
    <ScrollReveal delay={index * 150} animation="reveal-fade-up">
      <div
        className="card-perspective spotlight-card"
        style={{ height: "460px", cursor: "pointer" }}
        onClick={onToggle}
        onMouseMove={(e) => onMouseMove(e, e.currentTarget)}
      >
        <div className={`card-inner ${isOpen ? "is-open" : ""}`}>
          {/* Card Front */}
          <div
            className="card-front flex flex-col justify-between p-6"
            style={{
              border: "var(--border-gold)",
              boxShadow: "var(--card-front-shadow)",
              background: proj.gradient,
              borderRadius: "16px"
            }}
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <span
                className="text-cinzel font-bold uppercase flex items-center gap-2"
                style={{ fontSize: "10px", color: "var(--color-saffron)", letterSpacing: "0.1em" }}
              >
                {proj.icon}
                {proj.sanskrit}
              </span>
              <div className="flex items-center gap-2">
                {proj.stars && (
                  <span className="font-mono" style={{ fontSize: "9px", color: "var(--color-text-secondary)" }}>
                    {proj.stars}
                  </span>
                )}
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: "var(--bg-primary)",
                    border: "1px solid var(--color-sandstone)"
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: proj.accentColor
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3" style={{ margin: "auto 0" }}>
              <span
                className="text-xs uppercase font-semibold"
                style={{ color: proj.accentColor, letterSpacing: "0.12em" }}
              >
                {proj.category}
              </span>
              <h3 className="text-cinzel text-2xl font-bold" style={{ color: "var(--color-sandstone)" }}>
                {proj.title}
              </h3>
              <p
                className="text-marcellus text-sm line-clamp-3"
                style={{ color: "var(--color-text-secondary)", lineHeight: "1.6" }}
              >
                {proj.description}
              </p>

              {/* Mini tech tags */}
              <div className="flex flex-wrap gap-1" style={{ marginTop: "0.5rem" }}>
                {proj.tech.slice(0, 4).map((t, i) => (
                  <span
                    key={i}
                    className="font-mono"
                    style={{
                      fontSize: "9px",
                      padding: "0.15rem 0.4rem",
                      borderRadius: "4px",
                      backgroundColor: "rgba(205,162,80,0.08)",
                      border: "1px solid rgba(205,162,80,0.12)",
                      color: "var(--color-sandstone)",
                      fontWeight: 600
                    }}
                  >
                    {t}
                  </span>
                ))}
                {proj.tech.length > 4 && (
                  <span className="font-mono" style={{ fontSize: "9px", color: "var(--color-text-secondary)" }}>
                    +{proj.tech.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Footer */}
            <div
              className="flex justify-between items-center"
              style={{ borderTop: "1px solid rgba(205,162,80,0.12)", paddingTop: "1rem" }}
            >
              <span className="font-mono text-xs" style={{ color: "var(--color-text-secondary)", opacity: 0.5 }}>
                LEAF #{proj.id} OF V
              </span>
              <span
                className="text-xs font-bold text-cinzel flex items-center gap-2"
                style={{ color: "var(--color-sandstone)" }}
              >
                <BookOpen className="w-4 h-4" /> UNLOCK SPECS
              </span>
            </div>
          </div>

          {/* Card Back */}
          <div
            className="card-back p-6 flex flex-col justify-between"
            style={{
              backgroundColor: "var(--card-back-bg, #f4ebe1)",
              border: "1px solid var(--color-sandstone)",
              boxShadow: "var(--card-back-shadow, inset 0 0 40px rgba(139,107,35,0.12))",
              color: "var(--card-back-text, #1c150c)",
              borderRadius: "16px"
            }}
          >
            <div>
              <span
                className="text-cinzel font-bold uppercase block mb-2"
                style={{ fontSize: "10px", color: "var(--card-back-accent, #c84b00)", letterSpacing: "0.1em" }}
              >
                {proj.sanskrit}
              </span>
              <h3 className="text-cinzel text-lg font-bold mb-3" style={{ color: "var(--card-back-heading, #8b6b23)" }}>
                {proj.title}
              </h3>
              <p
                className="text-marcellus text-xs md:text-sm mb-4"
                style={{ color: "var(--card-back-body, #584835)", lineHeight: "1.65" }}
              >
                {proj.specs}
              </p>

              {/* Tech stack tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.tech.map((t, i) => (
                  <span
                    key={i}
                    className="font-mono font-bold"
                    style={{
                      fontSize: "10px",
                      padding: "0.25rem 0.55rem",
                      borderRadius: "6px",
                      backgroundColor: "var(--card-back-tag-bg, #e8decb)",
                      border: "1px solid rgba(139,107,35,0.2)",
                      color: "var(--card-back-heading, #8b6b23)"
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div
              className="flex justify-between items-center"
              style={{ borderTop: "1px solid rgba(139,107,35,0.15)", paddingTop: "1rem" }}
            >
              <span className="font-mono text-xs" style={{ color: "var(--card-back-body, #584835)", opacity: 0.5 }}>
                REVEALED ARCHIVE
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={proj.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    padding: "0.5rem",
                    borderRadius: "8px",
                    display: "flex",
                    color: "var(--card-back-heading, #8b6b23)",
                    transition: "all 0.3s",
                    backgroundColor: "var(--card-back-tag-bg, #e8decb)"
                  }}
                  aria-label="GitHub Repository"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                {proj.links.live !== "#" && (
                  <a
                    href={proj.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-xs font-bold text-cinzel"
                    style={{
                      padding: "0.5rem 0.8rem",
                      borderRadius: "8px",
                      backgroundColor: "var(--card-back-heading, #8b6b23)",
                      color: "var(--card-back-bg, #f4ebe1)",
                      transition: "all 0.3s",
                      textDecoration: "none"
                    }}
                  >
                    <Globe className="w-3.5 h-3.5" /> LIVE
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
