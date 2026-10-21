import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Terminal, Palette, Database, Cpu, Shield, Server, Laptop, Box, GitBranch, Brain, RotateCw, RotateCcw } from "lucide-react";
import { ScrollReveal } from "../hooks/useScrollReveal";

export default function LotusMandala() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sectionRef = useRef(null);
  const floatingAreaRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startAngleRef = useRef(0);
  const startRotationRef = useRef(0);

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

  const getAngle = (clientX, clientY) => {
    if (!floatingAreaRef.current) return 0;
    const rect = floatingAreaRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    return Math.atan2(clientY - cy, clientX - cx);
  };

  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    const angle = getAngle(e.clientX, e.clientY);
    startAngleRef.current = angle;
    startRotationRef.current = rotation;
    if (floatingAreaRef.current) {
      try {
        floatingAreaRef.current.setPointerCapture(e.pointerId);
      } catch (err) {
        // ignore
      }
    }
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const currentAngle = getAngle(e.clientX, e.clientY);
    const delta = currentAngle - startAngleRef.current;
    setRotation(startRotationRef.current + delta);
  };

  const handlePointerUp = (e) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
      try {
        if (floatingAreaRef.current && floatingAreaRef.current.hasPointerCapture(e.pointerId)) {
          floatingAreaRef.current.releasePointerCapture(e.pointerId);
        }
      } catch (err) {
        // ignore
      }
    }
  };

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
          {/* Left Column: Vertical Line-by-Line List */}
          <ScrollReveal animation="reveal-slide-left" className="lg:col-span-6">
            <style>{`
              .wing-nav-item {
                width: 100%;
                text-align: left;
                position: relative;
                padding: 1.15rem 1.4rem;
                border-radius: 14px;
                display: flex;
                align-items: center;
                transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                cursor: pointer;
                background: rgba(23, 17, 12, 0.65);
                border: 1px solid rgba(205, 162, 80, 0.16);
                border-left: 3px solid transparent;
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
              }
              .wing-nav-item:hover {
                background: rgba(36, 26, 18, 0.8);
                border-color: rgba(205, 162, 80, 0.35);
                transform: translateX(4px);
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
              }
              .wing-nav-item.active {
                background: linear-gradient(135deg, rgba(224, 90, 16, 0.14) 0%, rgba(23, 17, 12, 0.85) 100%);
                border: 1px solid rgba(224, 90, 16, 0.5);
                border-left: 4px solid var(--color-saffron);
                box-shadow: 0 10px 28px -4px rgba(0, 0, 0, 0.5), 0 0 20px rgba(224, 90, 16, 0.15);
                transform: translateX(6px);
              }
              :root[data-theme="light"] .wing-nav-item {
                background: rgba(255, 255, 255, 0.7);
                border: 1px solid rgba(155, 123, 60, 0.2);
                border-left: 3px solid transparent;
                box-shadow: 0 4px 15px rgba(155, 123, 60, 0.05);
              }
              :root[data-theme="light"] .wing-nav-item:hover {
                background: rgba(255, 255, 255, 0.95);
                border-color: rgba(155, 123, 60, 0.4);
                transform: translateX(4px);
                box-shadow: 0 8px 20px rgba(155, 123, 60, 0.1);
              }
              :root[data-theme="light"] .wing-nav-item.active {
                background: linear-gradient(135deg, rgba(192, 90, 24, 0.08) 0%, rgba(255, 255, 255, 0.95) 100%);
                border: 1px solid rgba(192, 90, 24, 0.45);
                border-left: 4px solid var(--color-saffron);
                box-shadow: 0 10px 28px -4px rgba(155, 123, 60, 0.12), 0 0 20px rgba(192, 90, 24, 0.08);
                transform: translateX(6px);
              }
            `}</style>

            <div className="flex flex-col gap-3.5 max-w-md mx-auto lg:mx-0">
              <div className="mb-2 px-1">
                <span
                  className="text-xs font-bold uppercase tracking-widest text-cinzel"
                  style={{ color: "var(--color-sandstone)", letterSpacing: "0.18em" }}
                >
                  Select Engineering Wing
                </span>
              </div>

              {categories.map((cat, idx) => {
                const isActive = activeCategory === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveCategory(idx);
                      setRotation(0);
                    }}
                    className={`wing-nav-item focus:outline-none ${isActive ? "active" : ""}`}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <span
                        className="font-mono text-sm sm:text-base font-bold tracking-wider transition-colors duration-200"
                        style={{
                          color: isActive ? "var(--color-saffron)" : "var(--color-sandstone)",
                          minWidth: "2rem"
                        }}
                      >
                        0{idx + 1}
                      </span>
                      <h4
                        className="text-cinzel text-sm sm:text-base md:text-lg font-bold tracking-wide transition-colors duration-200"
                        style={{
                          color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)"
                        }}
                      >
                        {cat.title}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Right Column: Skill details Card with floating rotatable circular skills mandala */}
          <ScrollReveal animation="reveal-slide-right" className="lg:col-span-6">
            <div
              className="glass-panel relative gold-glow-border gradient-border"
              style={{
                borderTop: "4px solid var(--color-sandstone)",
                borderBottom: "4px solid var(--color-sandstone)",
                overflow: "hidden",
                padding: "1.75rem 1.5rem"
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
                  min-height: 310px;
                  position: relative;
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: center;
                  align-items: center;
                  background: radial-gradient(ellipse at 50% 50%, rgba(205, 162, 80, 0.05) 0%, transparent 70%);
                  border-radius: 20px;
                  width: 100%;
                  overflow: visible;
                  transition: all 0.3s;
                  margin-top: 0.25rem;
                  touch-action: none;
                  user-select: none;
                  -webkit-user-select: none;
                  cursor: grab;
                  
                  --radius: 102px;
                  --orb-size: 76px;
                  --orb-half: 38px;
                  --bindu-size: 2.35rem;
                  --bindu-half: 1.175rem;
                }

                .floating-area.is-dragging {
                  cursor: grabbing;
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
                  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 215, 0, 0.15);
                  cursor: grab;
                  animation: floatGentle 3.5s ease-in-out infinite;
                  will-change: left, top, transform;
                  user-select: none;
                  -webkit-user-select: none;
                }

                .floating-area.is-dragging .skill-orb {
                  cursor: grabbing;
                }

                .skill-orb:hover {
                  transform: scale(1.1) translateY(-4px) !important;
                  border-color: var(--color-saffron);
                  box-shadow: 0 12px 28px rgba(224, 90, 16, 0.35), inset 0 1px 0 rgba(255, 215, 0, 0.3);
                  z-index: 20;
                }

                :root[data-theme="light"] .skill-orb {
                  background: radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.95), rgba(248, 243, 232, 0.98));
                  box-shadow: 0 8px 18px rgba(155, 123, 60, 0.1);
                }

                :root[data-theme="light"] .skill-orb:hover {
                  border-color: var(--color-saffron);
                  box-shadow: 0 12px 28px rgba(192, 90, 24, 0.2);
                }

                .skill-orb h4 {
                  font-family: var(--font-display);
                  font-size: 0.48rem;
                  color: var(--color-text-primary);
                  padding: 0 4px;
                  line-height: 1.2;
                  font-weight: 700;
                  pointer-events: none;
                  user-select: none;
                }

                .skill-orb svg {
                  pointer-events: none;
                }

                @keyframes floatGentle {
                  0% { transform: translateY(0px); }
                  50% { transform: translateY(-5px); }
                  100% { transform: translateY(0px); }
                }

                @media (max-width: 768px) {
                  .floating-area {
                    --radius: 80px;
                    --orb-size: 64px;
                    --orb-half: 32px;
                    --bindu-size: 2rem;
                    --bindu-half: 1rem;
                    min-height: 260px;
                  }
                  .skill-orb h4 {
                    font-size: 0.42rem;
                    padding: 0 2px;
                  }
                }
              `}</style>

              {/* Title & Header inside details box - compact & balanced */}
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="p-2.5"
                  style={{ backgroundColor: "rgba(205,162,80,0.08)", borderRadius: "10px", display: "flex" }}
                >
                  {categories[activeCategory].icon}
                </span>
                <div>
                  <span
                    className="text-xs font-bold uppercase text-cinzel block mb-0.5"
                    style={{ color: "var(--color-saffron)", letterSpacing: "0.1em" }}
                  >
                    {categories[activeCategory].sanskrit}
                  </span>
                  <h3 className="text-cinzel text-lg md:text-xl font-bold">
                    {categories[activeCategory].title}
                  </h3>
                </div>
              </div>

              <p
                className="text-marcellus text-xs md:text-sm mb-2.5"
                style={{ color: "var(--color-text-secondary)", lineHeight: "1.55" }}
              >
                {categories[activeCategory].description}
              </p>

              {/* Dynamic Rotatable Circular Floating Area (Interactive Mandala) */}
              <div
                ref={floatingAreaRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className={`floating-area ${isDragging ? "is-dragging" : ""}`}
                title="Click and drag around the center to rotate skills circle"
              >
                {/* Concentric Golden Orbit Guide Rings */}
                <svg
                  className="absolute pointer-events-none"
                  style={{
                    width: "calc(var(--radius) * 2)",
                    height: "calc(var(--radius) * 2)",
                    left: "calc(50% - var(--radius))",
                    top: "calc(50% - var(--radius))",
                    opacity: 0.22
                  }}
                  viewBox="0 0 240 240"
                >
                  <circle
                    cx="120"
                    cy="120"
                    r="118"
                    fill="none"
                    stroke="var(--color-sandstone)"
                    strokeWidth="1.5"
                    strokeDasharray="4 6"
                  />
                  <circle
                    cx="120"
                    cy="120"
                    r="58"
                    fill="none"
                    stroke="var(--color-saffron)"
                    strokeWidth="1"
                    strokeDasharray="2 4"
                    opacity="0.5"
                  />
                </svg>

                {/* Centered Core in the middle of the skills circle */}
                <div
                  className="absolute flex items-center justify-center animate-glow-breathe pointer-events-none"
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
                  <Sparkles className="w-4 h-4 animate-pulse-gentle" style={{ color: "var(--color-gold-glow)" }} />
                </div>

                {/* Rotatable Circular Skills Orbs */}
                {categories[activeCategory].skills.map((skill, index) => {
                  const angle = (index * 2 * Math.PI) / 6 + rotation;
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
                        transition: isDragging
                          ? "none"
                          : "left 0.4s cubic-bezier(0.16, 1, 0.3, 1), top 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                        animationDelay: `${index * 0.25}s`
                      }}
                    >
                      {skill.icon}
                      <h4>{skill.name}</h4>
                    </div>
                  );
                })}
              </div>

              {/* Rotation Toolbar: Touch/Drag Hint + Rotate Buttons */}
              <div className="flex items-center justify-between mt-2.5 px-1">
                <div
                  className="flex items-center gap-1.5"
                  style={{ color: "var(--color-sandstone)", opacity: 0.8 }}
                >
                  <RotateCw
                    className={`w-3 h-3 ${isDragging ? "animate-spin" : ""}`}
                    style={{ color: "var(--color-saffron)" }}
                  />
                  <span className="font-mono text-[10px] md:text-xs tracking-wider uppercase">
                    {isDragging ? "Rotating Mandala..." : "Drag circle or use buttons to rotate"}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setRotation((prev) => prev - Math.PI / 3)}
                    title="Rotate Counter-Clockwise (60°)"
                    className="p-1.5 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center"
                    style={{
                      background: "rgba(205, 162, 80, 0.08)",
                      border: "1px solid rgba(205, 162, 80, 0.2)",
                      color: "var(--color-sandstone)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(224, 90, 16, 0.2)";
                      e.currentTarget.style.borderColor = "var(--color-saffron)";
                      e.currentTarget.style.color = "var(--color-saffron)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(205, 162, 80, 0.08)";
                      e.currentTarget.style.borderColor = "rgba(205, 162, 80, 0.2)";
                      e.currentTarget.style.color = "var(--color-sandstone)";
                    }}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setRotation((prev) => prev + Math.PI / 3)}
                    title="Rotate Clockwise (60°)"
                    className="p-1.5 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center"
                    style={{
                      background: "rgba(205, 162, 80, 0.08)",
                      border: "1px solid rgba(205, 162, 80, 0.2)",
                      color: "var(--color-sandstone)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(224, 90, 16, 0.2)";
                      e.currentTarget.style.borderColor = "var(--color-saffron)";
                      e.currentTarget.style.color = "var(--color-saffron)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(205, 162, 80, 0.08)";
                      e.currentTarget.style.borderColor = "rgba(205, 162, 80, 0.2)";
                      e.currentTarget.style.color = "var(--color-sandstone)";
                    }}
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
