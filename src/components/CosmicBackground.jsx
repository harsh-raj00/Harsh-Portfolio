import React, { useEffect, useRef } from "react";

export default function CosmicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let scrollY = 0;
    let mouseX = -1000;
    let mouseY = -1000;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Detect current theme
    const getTheme = () => document.documentElement.getAttribute("data-theme") || "dark";
    let currentTheme = getTheme();

    // Sanskrit glyphs
    const sanskritGlyphs = ["ॐ", "ऋ", "वे", "द", "ज्ञ", "आ", "न", "श", "म", "ध", "क", "त", "य", "भ", "स", "र"];

    // =========================================================
    // DARK THEME SYSTEMS
    // =========================================================
    const particles = [];
    const starsNear = [];
    const starsMid = [];
    const starsFar = [];
    const nebulaClouds = [];
    const shootingStars = [];
    const orbitRings = [];

    const NEAR_COUNT = 25;
    const MID_COUNT = 45;
    const FAR_COUNT = 60;
    const PARTICLE_COUNT = 14;
    const NEBULA_COUNT = 5;
    const ORBIT_COUNT = 3;

    class CosmicStar {
      constructor(layer) {
        this.layer = layer;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        if (layer === "near") {
          this.size = Math.random() * 2.5 + 1.5;
          this.speedX = (Math.random() - 0.5) * 0.3;
          this.speedY = (Math.random() - 0.5) * 0.3;
          this.parallaxFactor = 0.08;
          this.baseOpacity = 0.7;
        } else if (layer === "mid") {
          this.size = Math.random() * 1.5 + 0.8;
          this.speedX = (Math.random() - 0.5) * 0.15;
          this.speedY = (Math.random() - 0.5) * 0.15;
          this.parallaxFactor = 0.04;
          this.baseOpacity = 0.5;
        } else {
          this.size = Math.random() * 0.8 + 0.3;
          this.speedX = (Math.random() - 0.5) * 0.05;
          this.speedY = (Math.random() - 0.5) * 0.05;
          this.parallaxFactor = 0.015;
          this.baseOpacity = 0.3;
        }
        this.opacity = Math.random() * this.baseOpacity;
        this.fadeSpeed = Math.random() * 0.008 + 0.002;
        this.direction = Math.random() > 0.5 ? 1 : -1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
        if (this.y < -10) this.y = height + 10;
        if (this.y > height + 10) this.y = -10;
        this.opacity += this.fadeSpeed * this.direction;
        if (this.opacity >= this.baseOpacity) { this.opacity = this.baseOpacity; this.direction = -1; }
        else if (this.opacity <= 0.05) { this.opacity = 0.05; this.direction = 1; }
      }
      draw() {
        const offsetY = scrollY * this.parallaxFactor;
        const drawX = this.x;
        const drawY = ((this.y + offsetY) % (height + 20)) - 10;
        const dx = drawX - mouseX;
        const dy = drawY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseInfluence = dist < 200 ? (1 - dist / 200) * 0.5 : 0;
        const finalOpacity = Math.min(this.opacity + mouseInfluence, 1);
        const finalSize = this.size + mouseInfluence * 2;
        ctx.fillStyle = `rgba(205, 162, 80, ${finalOpacity * 0.6})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, finalSize, 0, Math.PI * 2);
        ctx.fill();
        if (this.layer === "near" && finalOpacity > 0.4) {
          ctx.fillStyle = `rgba(255, 215, 0, ${finalOpacity * 0.15})`;
          ctx.beginPath();
          ctx.arc(drawX, drawY, finalSize * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    class NebulaCloud {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 200 + 120;
        this.speedX = (Math.random() - 0.5) * 0.08;
        this.speedY = (Math.random() - 0.5) * 0.05;
        this.hue = Math.random() > 0.5 ? 32 : 20;
        this.opacity = Math.random() * 0.025 + 0.01;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < -this.radius) this.x = width + this.radius;
        if (this.x > width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = height + this.radius;
        if (this.y > height + this.radius) this.y = -this.radius;
      }
      draw() {
        const offsetY = scrollY * 0.02;
        const drawY = ((this.y + offsetY) % (height + this.radius * 2)) - this.radius;
        const gradient = ctx.createRadialGradient(this.x, drawY, 0, this.x, drawY, this.radius);
        gradient.addColorStop(0, `hsla(${this.hue}, 70%, 50%, ${this.opacity})`);
        gradient.addColorStop(0.5, `hsla(${this.hue}, 60%, 40%, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, drawY, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class ShootingStar {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * width * 0.5;
        this.y = -20;
        this.length = Math.random() * 80 + 60;
        this.speed = Math.random() * 6 + 4;
        this.angle = (Math.random() * 20 + 25) * (Math.PI / 180);
        this.opacity = 1;
        this.life = 0;
        this.maxLife = Math.random() * 60 + 40;
        this.active = false;
        this.nextSpawn = Math.random() * 400 + 200;
        this.cooldown = this.nextSpawn;
      }
      update() {
        if (!this.active) {
          this.cooldown--;
          if (this.cooldown <= 0) { this.active = true; this.x = Math.random() * width * 0.7; this.y = -20; this.life = 0; }
          return;
        }
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.life++;
        if (this.life > this.maxLife * 0.6) {
          this.opacity = Math.max(0, 1 - (this.life - this.maxLife * 0.6) / (this.maxLife * 0.4));
        }
        if (this.life >= this.maxLife || this.x > width + 100 || this.y > height + 100) this.reset();
      }
      draw() {
        if (!this.active) return;
        const tailX = this.x - Math.cos(this.angle) * this.length;
        const tailY = this.y - Math.sin(this.angle) * this.length;
        const gradient = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
        gradient.addColorStop(0, `rgba(205, 162, 80, 0)`);
        gradient.addColorStop(0.7, `rgba(255, 215, 0, ${this.opacity * 0.4})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${this.opacity * 0.8})`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.6})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class SanskritParticle {
      constructor(isLight = false) {
        this.isLight = isLight;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.glyph = sanskritGlyphs[Math.floor(Math.random() * sanskritGlyphs.length)];
        this.fontSize = Math.random() * 16 + 10;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = isLight ? -Math.random() * 0.2 - 0.04 : -Math.random() * 0.35 - 0.08;
        this.opacity = isLight ? Math.random() * 0.15 + 0.05 : Math.random() * 0.3 + 0.08;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.004;
        this.parallaxFactor = 0.03;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        if (this.y < -40) { this.y = height + 40; this.x = Math.random() * width; }
        if (this.x < -40) this.x = width + 40;
        if (this.x > width + 40) this.x = -40;
      }
      draw() {
        const offsetY = scrollY * this.parallaxFactor;
        const drawY = ((this.y + offsetY) % (height + 80)) - 40;
        ctx.save();
        ctx.translate(this.x, drawY);
        ctx.rotate(this.rotation);
        ctx.font = `${this.fontSize}px 'Cinzel', serif`;
        if (this.isLight) {
          ctx.fillStyle = `rgba(155, 123, 60, ${this.opacity * 0.3})`;
          ctx.shadowColor = "rgba(155, 123, 60, 0.08)";
        } else {
          ctx.fillStyle = `rgba(205, 162, 80, ${this.opacity * 0.25})`;
          ctx.shadowColor = "rgba(255, 215, 0, 0.15)";
        }
        ctx.shadowBlur = 6;
        ctx.fillText(this.glyph, 0, 0);
        ctx.restore();
      }
    }

    class OrbitRing {
      constructor(index) {
        this.centerX = width * (0.2 + Math.random() * 0.6);
        this.centerY = height * (0.2 + Math.random() * 0.6);
        this.radius = 120 + index * 90 + Math.random() * 50;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (0.0003 + index * 0.0001) * (Math.random() > 0.5 ? 1 : -1);
        this.opacity = 0.03 + index * 0.005;
        this.dashPattern = [4 + index * 2, 8 + index * 3];
      }
      update() { this.rotation += this.rotationSpeed; }
      draw(isLight = false) {
        const offsetY = scrollY * 0.01;
        ctx.save();
        ctx.translate(this.centerX, ((this.centerY + offsetY) % height));
        ctx.rotate(this.rotation);
        const alpha = isLight ? this.opacity * 0.6 : this.opacity;
        ctx.strokeStyle = isLight
          ? `rgba(155, 123, 60, ${alpha})`
          : `rgba(205, 162, 80, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.setLineDash(this.dashPattern);
        ctx.beginPath();
        ctx.ellipse(0, 0, this.radius, this.radius * 0.6, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }
    }

    // =========================================================
    // LIGHT THEME SYSTEMS
    // =========================================================
    const lightDustParticles = [];
    const lightGlowPools = [];
    const LIGHT_DUST_COUNT = 40;
    const LIGHT_GLOW_COUNT = 4;

    class GoldenDust {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.speedY = -Math.random() * 0.25 - 0.05;
        this.opacity = Math.random() * 0.25 + 0.05;
        this.fadeSpeed = Math.random() * 0.005 + 0.001;
        this.direction = Math.random() > 0.5 ? 1 : -1;
        this.parallaxFactor = 0.03;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y < -10) { this.y = height + 10; this.x = Math.random() * width; }
        if (this.x < -10) this.x = width + 10;
        if (this.x > width + 10) this.x = -10;
        this.opacity += this.fadeSpeed * this.direction;
        if (this.opacity >= 0.3) { this.opacity = 0.3; this.direction = -1; }
        else if (this.opacity <= 0.03) { this.opacity = 0.03; this.direction = 1; }
      }
      draw() {
        const offsetY = scrollY * this.parallaxFactor;
        const drawY = ((this.y + offsetY) % (height + 20)) - 10;
        // Mouse proximity glow
        const dx = this.x - mouseX;
        const dy = drawY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseInfluence = dist < 180 ? (1 - dist / 180) * 0.3 : 0;
        const finalOpacity = Math.min(this.opacity + mouseInfluence, 0.5);
        const finalSize = this.size + mouseInfluence * 2;

        ctx.fillStyle = `rgba(175, 140, 70, ${finalOpacity})`;
        ctx.beginPath();
        ctx.arc(this.x, drawY, finalSize, 0, Math.PI * 2);
        ctx.fill();
        // Soft glow halo
        if (finalOpacity > 0.15) {
          ctx.fillStyle = `rgba(175, 140, 70, ${finalOpacity * 0.2})`;
          ctx.beginPath();
          ctx.arc(this.x, drawY, finalSize * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    class WarmGlowPool {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 250 + 150;
        this.speedX = (Math.random() - 0.5) * 0.06;
        this.speedY = (Math.random() - 0.5) * 0.04;
        this.opacity = Math.random() * 0.025 + 0.008;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < -this.radius) this.x = width + this.radius;
        if (this.x > width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = height + this.radius;
        if (this.y > height + this.radius) this.y = -this.radius;
      }
      draw() {
        const offsetY = scrollY * 0.015;
        const drawY = ((this.y + offsetY) % (height + this.radius * 2)) - this.radius;
        const gradient = ctx.createRadialGradient(this.x, drawY, 0, this.x, drawY, this.radius);
        gradient.addColorStop(0, `rgba(192, 155, 80, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(192, 155, 80, ${this.opacity * 0.4})`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, drawY, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // =========================================================
    // INIT BOTH SYSTEMS
    // =========================================================
    // Dark
    for (let i = 0; i < FAR_COUNT; i++) starsFar.push(new CosmicStar("far"));
    for (let i = 0; i < MID_COUNT; i++) starsMid.push(new CosmicStar("mid"));
    for (let i = 0; i < NEAR_COUNT; i++) starsNear.push(new CosmicStar("near"));
    for (let i = 0; i < NEBULA_COUNT; i++) nebulaClouds.push(new NebulaCloud());
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new SanskritParticle(false));
    for (let i = 0; i < 3; i++) shootingStars.push(new ShootingStar());
    for (let i = 0; i < ORBIT_COUNT; i++) orbitRings.push(new OrbitRing(i));

    // Light
    for (let i = 0; i < LIGHT_DUST_COUNT; i++) lightDustParticles.push(new GoldenDust());
    for (let i = 0; i < LIGHT_GLOW_COUNT; i++) lightGlowPools.push(new WarmGlowPool());
    const lightSanskritParticles = [];
    for (let i = 0; i < 10; i++) lightSanskritParticles.push(new SanskritParticle(true));
    const lightOrbitRings = [];
    for (let i = 0; i < 2; i++) lightOrbitRings.push(new OrbitRing(i));

    // Constellations (dark only)
    const drawConstellations = () => {
      ctx.strokeStyle = "rgba(205, 162, 80, 0.025)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < starsMid.length; i++) {
        for (let j = i + 1; j < starsMid.length; j++) {
          const dx = starsMid[i].x - starsMid[j].x;
          const dy = starsMid[i].y - starsMid[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            const lineOpacity = (1 - distance / 120) * 0.04;
            ctx.strokeStyle = `rgba(205, 162, 80, ${lineOpacity})`;
            ctx.beginPath();
            ctx.moveTo(starsMid[i].x, starsMid[i].y);
            ctx.lineTo(starsMid[j].x, starsMid[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      currentTheme = getTheme();
      ctx.clearRect(0, 0, width, height);

      if (currentTheme === "light") {
        // ---- LIGHT THEME RENDERING ----
        lightGlowPools.forEach((g) => { g.update(); g.draw(); });
        lightOrbitRings.forEach((r) => { r.update(); r.draw(true); });
        lightDustParticles.forEach((d) => { d.update(); d.draw(); });
        lightSanskritParticles.forEach((p) => { p.update(); p.draw(); });
      } else {
        // ---- DARK THEME RENDERING ----
        nebulaClouds.forEach((cloud) => { cloud.update(); cloud.draw(); });
        orbitRings.forEach((ring) => { ring.update(); ring.draw(false); });
        starsFar.forEach((star) => { star.update(); star.draw(); });
        starsMid.forEach((star) => { star.update(); star.draw(); });
        drawConstellations();
        starsNear.forEach((star) => { star.update(); star.draw(); });
        shootingStars.forEach((ss) => { ss.update(); ss.draw(); });
        particles.forEach((particle) => { particle.update(); particle.draw(); });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleScroll = () => { scrollY = window.scrollY; };
    const handleMouseMove = (e) => { mouseX = e.clientX; mouseY = e.clientY; };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
