import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Terminal, Palette, Database, Cpu, Shield, Server, Laptop, Box, GitBranch, Brain } from "lucide-react";
import { ScrollReveal } from "../hooks/useScrollReveal";

export default function LotusMandala() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const categories = [
    {
      title: "Backend & API",
      icon: <Server className="w-6 h-6" style={{ color: "var(--color-saffron)" }} />,
      description: "Architecting high-performance APIs, secure authentication pipelines, and scalable database systems. From FastAPI microservices to Express.js REST APIs with JWT, OAuth, and role-based access control.",
      skills: [
        { name: "Python / FastAPI / Flask", icon: <Terminal className="w-5 h-5 mb-1" style={{ color: "var(--color-saffron)" }} /> },
        { name: "Node.js / Express.js", icon: <Server className="w-5 h-5 mb-1" style={{ color: "var(--color-sandstone)" }} /> },
        { name: "PostgreSQL / MongoDB / SQLite", icon: <Database className="w-5 h-5 mb-1" style={{ color: "var(--color-saffron)" }} /> },
        { name: "JWT Auth & API Security", icon: <Shield className="w-5 h-5 mb-1" style={{ color: "var(--color-sandstone)" }} /> },
        { name: "GraphQL & RESTful APIs", icon: <Server className="w-5 h-5 mb-1" style={{ color: "var(--color-saffron)" }} /> },
        { name: "Redis & Caching", icon: <Database className="w-5 h-5 mb-1" style={{ color: "var(--color-sandstone)" }} /> }
      ],
      sanskrit: "तंत्र विभाग (System Wing)"
    },
    {
      title: "Frontend & UI",
      icon: <Palette className="w-6 h-6" style={{ color: "var(--color-sandstone)" }} />,
      description: "Building premium, responsive interfaces with React 19, canvas particle systems, glassmorphism design, micro-animations, and physics-driven interactions. Prioritizing Web Vitals and visual excellence.",
      skills: [
        { name: "React / Vite / Next.js", icon: <Cpu className="w-5 h-5 mb-1" style={{ color: "var(--color-saffron)" }} /> },
        { name: "Vanilla JS / Canvas / WebGL", icon: <Palette className="w-5 h-5 mb-1" style={{ color: "var(--color-sandstone)" }} /> },
        { name: "CSS Glassmorphism & Animation", icon: <Sparkles className="w-5 h-5 mb-1" style={{ color: "var(--color-saffron)" }} /> },
        { name: "Responsive & Accessible UI", icon: <Laptop className="w-5 h-5 mb-1" style={{ color: "var(--color-sandstone)" }} /> },
        { name: "Tailwind CSS & Sass", icon: <Palette className="w-5 h-5 mb-1" style={{ color: "var(--color-saffron)" }} /> },
        { name: "Framer Motion & GSAP", icon: <Sparkles className="w-5 h-5 mb-1" style={{ color: "var(--color-sandstone)" }} /> }
      ],
      sanskrit: "कला विभाग (Aesthetic Wing)"
    },
    {
      title: "AI & ML",
      icon: <Brain className="w-6 h-6" style={{ color: "var(--color-saffron)" }} />,
      description: "Developing ML pipelines for face detection, deepfake classification, and liveness verification. Leveraging TensorFlow, OpenCV, MediaPipe, and custom CNN architectures like MesoNet with Grad-CAM explainability.",
      skills: [
        { name: "TensorFlow / Keras", icon: <Cpu className="w-5 h-5 mb-1" style={{ color: "var(--color-saffron)" }} /> },
        { name: "OpenCV / MediaPipe", icon: <Laptop className="w-5 h-5 mb-1" style={{ color: "var(--color-sandstone)" }} /> },
        { name: "CNN Architecture (MesoNet)", icon: <Brain className="w-5 h-5 mb-1" style={{ color: "var(--color-saffron)" }} /> },
        { name: "Model Evaluation & Metrics", icon: <Shield className="w-5 h-5 mb-1" style={{ color: "var(--color-sandstone)" }} /> },
        { name: "PyTorch & Deep Learning", icon: <Brain className="w-5 h-5 mb-1" style={{ color: "var(--color-saffron)" }} /> },
        { name: "Natural Language Processing", icon: <Terminal className="w-5 h-5 mb-1" style={{ color: "var(--color-sandstone)" }} /> }
      ],
      sanskrit: "बुद्धि विभाग (Cognitive Wing)"
    },
    {
      title: "Blockchain & DevOps",
      icon: <Shield className="w-6 h-6" style={{ color: "var(--color-sandstone)" }} />,
      description: "Building decentralized applications with Solidity smart contracts, IPFS storage, and ethers.js. Containerizing services with Docker, deploying to Render, and managing CI/CD pipelines for production systems.",
      skills: [
        { name: "Solidity / Hardhat / ethers.js", icon: <Shield className="w-5 h-5 mb-1" style={{ color: "var(--color-saffron)" }} /> },
        { name: "Docker / Docker Compose", icon: <Box className="w-5 h-5 mb-1" style={{ color: "var(--color-sandstone)" }} /> },
        { name: "IPFS / Pinata / AES-256", icon: <Database className="w-5 h-5 mb-1" style={{ color: "var(--color-saffron)" }} /> },
        { name: "Git / CI-CD / Deployment", icon: <GitBranch className="w-5 h-5 mb-1" style={{ color: "var(--color-sandstone)" }} /> },
        { name: "Smart Contracts & Web3", icon: <Shield className="w-5 h-5 mb-1" style={{ color: "var(--color-saffron)" }} /> },
        { name: "Kubernetes & Cloud Native", icon: <Box className="w-5 h-5 mb-1" style={{ color: "var(--color-sandstone)" }} /> }
      ],
      sanskrit: "रचना शास्त्र (Architecture Rule)"
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      id="knowledge" 
      className="py-24 relative" 
      style={{ overflow: "hidden", backgroundColor: "var(--bg-primary)" }}
    >
      {/* Background radial glow */}
      <div
        className="absolute"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70vw",
          height: "70vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(205,162,80,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0
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
              ज्ञानभाण्डार (Storehouse of Knowledge)
            </span>
            <h2 className="text-cinzel text-3xl md:text-5xl font-bold tracking-wider mb-4">
              Fields of <span className="gold-glow-text">Knowledge</span>
            </h2>
            <div className="section-ornament">
              <span style={{ color: "var(--color-sandstone)", fontSize: "0.8rem" }}>✦</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive Lotus Mandala */}
          <ScrollReveal animation="reveal-slide-left" className="lg:col-span-6">
            <div
              className="flex justify-center items-center relative"
              style={{ aspectRatio: "1/1", maxWidth: "420px", margin: "0 auto", width: "100%" }}
            >
              {/* Outer Sanskrit Ring */}
              <div
                className="absolute inset-0"
                style={{
                  borderRadius: "50%",
                  border: "1px dashed rgba(205, 162, 80, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `rotate(${activeCategory * 90}deg)`,
                  transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
              >
                <svg className="w-full h-full animate-spin-slow" style={{ opacity: 0.2 }} viewBox="0 0 200 200">
                  <path
                    id="sanskritTextPath"
                    d="M 100 15 A 85 85 0 1 1 99.9 15"
                    fill="none"
                    stroke="none"
                  />
                  <text style={{ fontSize: "7px", fontWeight: "bold" }} fill="var(--color-sandstone)" letterSpacing="5px">
                    <textPath href="#sanskritTextPath" startOffset="0%">
                      विद्या परमं बलम् • सत्यमेव जयते • योगः कर्मसु कौशलम् • धर्मो रक्षति रक्षितः •
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Lotus Mandala Core */}
              <div
                className="relative"
                style={{
                  width: "85%",
                  height: "85%",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `rotate(${activeCategory * -90}deg)`,
                  transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
              >
                {/* Central Bindu (Fixed, Non-Rotating inside rotating container offset) */}
                <div
                  className="absolute flex items-center justify-center animate-glow-breathe"
                  style={{
                    width: "3.5rem",
                    height: "3.5rem",
                    borderRadius: "50%",
                    background: "var(--mandala-bindu-bg)",
                    border: "2px solid var(--color-sandstone)",
                    zIndex: 20,
                    transform: `rotate(${activeCategory * 90}deg)`,
                    transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                >
                  <span className="animate-heartbeat" style={{ color: "var(--color-gold-glow)", fontSize: "1.1rem" }}>🕉</span>
                </div>

                {/* 4 Rotating Petals */}
                {categories.map((cat, idx) => {
                  const rotationAngle = idx * 90;
                  const isActive = activeCategory === idx;
                  return (
                    <div
                      key={idx}
                      className="absolute inset-0"
                      style={{
                        transformOrigin: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transform: `rotate(${rotationAngle}deg)`,
                        transition: "all 0.7s ease",
                        pointerEvents: "none"
                      }}
                    >
                      <div
                        onClick={() => setActiveCategory(idx)}
                        className="absolute flex flex-col items-center justify-center p-4 text-center cursor-pointer"
                        style={{
                          width: "130px",
                          height: "175px",
                          top: "-25px",
                          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                          transform: isActive ? "scale(1.08)" : "scale(0.92)",
                          opacity: isActive ? 1 : 0.4,
                          clipPath: "polygon(50% 0%, 100% 35%, 100% 85%, 50% 100%, 0% 85%, 0% 35%)",
                          background: isActive
                            ? "var(--petal-active-bg)"
                            : "var(--petal-inactive-bg)",
                          border: "1px solid var(--color-sandstone)",
                          boxShadow: isActive ? "0 0 30px rgba(224, 90, 16, 0.4)" : "none",
                          pointerEvents: "auto"
                        }}
                      >
                        <div
                          className="flex flex-col items-center justify-center"
                          style={{
                            transform: `rotate(${-rotationAngle + activeCategory * 90}deg)`,
                            transition: "all 0.7s ease"
                          }}
                        >
                          <div
                            className="mb-2 p-2"
                            style={{ borderRadius: "50%", background: "var(--petal-icon-bg)", display: "flex" }}
                          >
                            {cat.icon}
                          </div>
                          <span className="text-cinzel text-xs font-bold" style={{ color: "var(--color-text-primary)" }}>
                            {cat.title.split(" ")[0]}
                          </span>
                          <span
                            className="font-mono text-xs uppercase mt-1 block"
                            style={{ opacity: 0.6, letterSpacing: "0.15em", fontSize: "9px" }}
                          >
                            {idx + 1}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Skill details Card with floating only circular skills mandala */}
          <ScrollReveal animation="reveal-slide-right" className="lg:col-span-6">
            <div
              className="glass-panel relative gold-glow-border gradient-border"
              style={{
                borderTop: "4px solid var(--color-sandstone)",
                borderBottom: "4px solid var(--color-sandstone)",
                overflow: "hidden",
                padding: "2.5rem 2rem"
              }}
            >
              {/* Copper rivets */}
              {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => (
                <div
                  key={pos}
                  className="absolute"
                  style={{
                    [pos.includes("top") ? "top" : "bottom"]: "0.5rem",
                    [pos.includes("left") ? "left" : "right"]: "0.5rem",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-sandstone)",
                    opacity: 0.5
                  }}
                />
              ))}

              {/* Embedded styles for internal keyframes & circular arrangement */}
              <style>{`
                .floating-area {
                  min-height: 420px;
                  position: relative;
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: center;
                  align-items: flex-start;
                  background: radial-gradient(ellipse at 50% 50%, rgba(205, 162, 80, 0.04) 0%, transparent 70%);
                  border-radius: 20px;
                  width: 100%;
                  overflow: visible;
                  transition: all 0.3s;
                  margin-top: 1.5rem;
                  
                  --radius: 120px;
                  --orb-size: 88px;
                  --orb-half: 44px;
                  --bindu-size: 2.75rem;
                  --bindu-half: 1.375rem;
                }

                .skill-orb {
                  position: absolute;
                  width: var(--orb-size);
                  height: var(--orb-size);
                  border-radius: 50%;
                  background: radial-gradient(circle at 35% 30%, rgba(42, 34, 24, 0.95), rgba(26, 20, 12, 0.98));
                  backdrop-filter: blur(8px);
                  -webkit-backdrop-filter: blur(8px);
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  text-align: center;
                  border: 1.5px solid var(--color-sandstone);
                  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 215, 0, 0.15);
                  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                  cursor: default;
                  animation: floatGentle 3.5s ease-in-out infinite;
                  will-change: transform;
                }

                .skill-orb:hover {
                  transform: scale(1.1) translateY(-5px) !important;
                  border-color: var(--color-saffron);
                  box-shadow: 0 12px 28px rgba(224, 90, 16, 0.35), inset 0 1px 0 rgba(255, 215, 0, 0.3);
                }

                :root[data-theme="light"] .skill-orb {
                  background: radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.95), rgba(248, 243, 232, 0.98));
                  box-shadow: 0 8px 20px rgba(155, 123, 60, 0.1);
                }

                :root[data-theme="light"] .skill-orb:hover {
                  border-color: var(--color-saffron);
                  box-shadow: 0 12px 28px rgba(192, 90, 24, 0.2);
                }

                .skill-orb h4 {
                  font-family: var(--font-display);
                  font-size: 0.52rem;
                  color: var(--color-text-primary);
                  padding: 0 6px;
                  line-height: 1.25;
                  font-weight: 700;
                }

                @keyframes floatGentle {
                  0% { transform: translateY(0px); }
                  50% { transform: translateY(-10px); }
                  100% { transform: translateY(0px); }
                }

                @media (max-width: 768px) {
                  .floating-area {
                    --radius: 92px;
                    --orb-size: 72px;
                    --orb-half: 36px;
                    --bindu-size: 2.25rem;
                    --bindu-half: 1.125rem;
                    min-height: 340px;
                  }
                  .skill-orb h4 {
                    font-size: 0.44rem;
                    padding: 0 2px;
                  }
                }
              `}</style>

              {/* Title & Header inside details box */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="p-3"
                  style={{ backgroundColor: "rgba(205,162,80,0.08)", borderRadius: "10px", display: "flex" }}
                >
                  {categories[activeCategory].icon}
                </span>
                <div>
                  <span
                    className="text-xs font-bold uppercase text-cinzel block mb-1"
                    style={{ color: "var(--color-saffron)", letterSpacing: "0.1em" }}
                  >
                    {categories[activeCategory].sanskrit}
                  </span>
                  <h3 className="text-cinzel text-xl md:text-2xl font-bold">
                    {categories[activeCategory].title}
                  </h3>
                </div>
              </div>

              <p
                className="text-marcellus text-sm md:text-base mb-6"
                style={{ color: "var(--color-text-secondary)", lineHeight: "1.7" }}
              >
                {categories[activeCategory].description}
              </p>

              {/* Dynamic Circular Floating Area Inside Card (6 Skills arranged in a beautiful mandala) */}
              <div className="floating-area">
                {/* Centered OM Symbol in the middle of the skills circle */}
                <div
                  className="absolute flex items-center justify-center animate-glow-breathe"
                  style={{
                    width: "var(--bindu-size)",
                    height: "var(--bindu-size)",
                    borderRadius: "50%",
                    background: "var(--mandala-bindu-bg)",
                    border: "2px solid var(--color-sandstone)",
                    zIndex: 10,
                    left: "calc(50% - var(--bindu-half))",
                    top: "calc(50% - var(--bindu-half))",
                  }}
                >
                  <span className="animate-heartbeat" style={{ color: "var(--color-gold-glow)", fontSize: "0.95rem" }}>🕉</span>
                </div>

                {/* Staggered Circular Skills Orbs */}
                {categories[activeCategory].skills.map((skill, index) => {
                  // Symmetrical angular coordinates for exactly 6 skills
                  const angle = (index * 2 * Math.PI) / 6;
                  const cos = Math.cos(angle).toFixed(4);
                  const sin = Math.sin(angle).toFixed(4);
                  
                  const circularPosition = {
                    left: `calc(50% - var(--orb-half) + (${cos} * var(--radius)))`,
                    top: `calc(50% - var(--orb-half) + (${sin} * var(--radius)))`
                  };
                  
                  return (
                    <div
                      key={`${activeCategory}-${index}`}
                      className="skill-orb"
                      style={{
                        ...circularPosition,
                        animationDelay: `${index * 0.25}s`
                      }}
                    >
                      {skill.icon}
                      <h4>{skill.name}</h4>
                    </div>
                  );
                })}
              </div>

              {/* Footnote text */}
              {/* <div className="text-center mt-6">
                <p className="text-xs" style={{ color: "var(--color-text-secondary)", fontStyle: "italic", opacity: 0.8 }}>
                  ॐ fields of knowledge floating gracefully in cosmic symmetry.
                </p>
              </div> */}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
