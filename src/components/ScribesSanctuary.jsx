import React, { useState, useEffect, useRef } from "react";
import { Send, MapPin, Mail, CheckCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { ScrollReveal } from "../hooks/useScrollReveal";

// Email icon for contact info
function EmailIcon({ className = "", style = {} }) {
  return <Mail className={className} style={style} />;
}

export default function ScribesSanctuary() {
  const [diyaPos, setDiyaPos] = useState({ x: 0, y: 0 });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const parent = document.getElementById("scribes-chamber");
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      setDiyaPos({
        x: e.clientX - rect.left - 100,
        y: e.clientY - rect.top - 100
      });
    };

    const container = document.getElementById("scribes-chamber");
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY || "33eaac11-da30-455e-b651-112c21938f23", // Failsafe: supports both Vercel/Netlify Environment Variables (VITE_WEB3FORMS_KEY) or manual override in the code
          name: form.name,
          email: form.email,
          message: form.message,
          from_name: "Portfolio Contact Form",
          subject: `New message from ${form.name} via Portfolio`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSent(true);
        setTimeout(() => {
          setSent(false);
          setForm({ name: "", email: "", message: "" });
        }, 5000);
      } else {
        setError("Message failed to send. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  const contactChannels = [
    {
      icon: <GithubIcon className="w-5 h-5" />,
      label: "GitHub",
      value: "harsh-raj00",
      href: "https://github.com/harsh-raj00"
    },
    {
      icon: <LinkedinIcon className="w-5 h-5" />,
      label: "LinkedIn",
      value: "harsh-raj10",
      href: "https://linkedin.com/in/harsh-raj10"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "harsh546raj@gmail.com",
      href: "mailto:harsh546raj@gmail.com"
    }
  ];

  return (
    <section
      id="contact"
      className="py-24 relative"
      style={{
        overflow: "hidden",
        backgroundColor: "var(--bg-primary)",
        borderTop: "1px solid rgba(205,162,80,0.1)"
      }}
    >
      {/* Background Diya tracking shadow */}
      <div id="scribes-chamber" className="absolute inset-0" style={{ zIndex: 0 }}>
        <div
          className="diya-glow"
          style={{
            opacity: 0.8,
            transform: `translate3d(${diyaPos.x}px, ${diyaPos.y}px, 0)`,
            mixBlendMode: "var(--diya-mix-blend)"
          }}
        />
      </div>

      <div className="container relative z-10">
        {/* Title */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span
              className="text-xs text-marcellus uppercase block mb-3"
              style={{ color: "var(--color-saffron)", letterSpacing: "0.3em" }}
            >
              संपर्क (Interaction)
            </span>
            <h2 className="text-cinzel text-3xl md:text-5xl font-bold tracking-wider mb-4">
              Scribe's <span className="gold-glow-text">Sanctuary</span>
            </h2>
            <div className="section-ornament">
              <span style={{ color: "var(--color-sandstone)", fontSize: "0.8rem" }}>✦</span>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left info — GitHub, LinkedIn, Email only */}
          <ScrollReveal animation="reveal-slide-left" className="lg:col-span-5 flex flex-col justify-between" style={{ gap: "2rem" }}>
            <div className="flex flex-col gap-6">
              <span
                className="text-xs font-bold uppercase text-cinzel block"
                style={{ color: "var(--color-saffron)", letterSpacing: "0.15em" }}
              >
                Connect With Me
              </span>
              <h3 className="text-cinzel text-2xl md:text-3xl font-bold leading-tight" style={{ color: "var(--color-text-primary)" }}>
                Let's Build <br />Something <span className="gold-glow-text">Amazing</span>
              </h3>
              <p
                className="text-marcellus text-sm md:text-base"
                style={{ color: "var(--color-text-secondary)", lineHeight: "1.7" }}
              >
                Open to internships/jobs , collaborations, and impactful projects. Always open to meaningful conversations around technology, development, and innovation.
              </p>

              {/* Contact Channels — GitHub, LinkedIn, Email */}
              <div className="flex flex-col gap-4" style={{ paddingTop: "0.5rem" }}>
                {contactChannels.map((channel, i) => (
                  <a
                    key={i}
                    href={channel.href}
                    target={channel.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={channel.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="flex items-center gap-4"
                    style={{ textDecoration: "none", transition: "all 0.3s ease" }}
                  >
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: "2.75rem",
                        height: "2.75rem",
                        borderRadius: "12px",
                        backgroundColor: "var(--contact-icon-bg)",
                        border: "var(--contact-icon-border)",
                        color: "var(--color-sandstone)",
                        transition: "all 0.3s ease",
                        flexShrink: 0
                      }}
                    >
                      {channel.icon}
                    </div>
                    <div>
                      <span
                        className="uppercase block font-semibold"
                        style={{ fontSize: "9px", color: "var(--color-text-secondary)", letterSpacing: "0.12em" }}
                      >
                        {channel.label}
                      </span>
                      <span className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                        {channel.value}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div
              style={{ borderTop: "1px solid rgba(205,162,80,0.1)", paddingTop: "1.5rem", marginTop: "1rem" }}
            >
              <span className="font-mono text-xs" style={{ color: "var(--color-text-secondary)", opacity: 0.5 }}>
                "Stay curious. Keep building."
              </span>
            </div>
          </ScrollReveal>

          {/* Right form */}
          <ScrollReveal animation="reveal-slide-right" className="lg:col-span-7">
            <div
              className="glass-panel relative gold-glow-border gradient-border"
              style={{
                background: "var(--form-panel-bg)"
              }}
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xs font-bold text-cinzel" style={{ color: "var(--color-sandstone)", letterSpacing: "0.08em" }}>
                  SEND A MESSAGE
                </span>
                <span className="font-mono text-xs" style={{ color: "var(--color-text-secondary)", opacity: 0.4 }}>

                </span>
              </div>

              {/* Success overlay */}
              {sent && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center z-10"
                  style={{
                    background: "var(--form-success-bg)",
                    borderRadius: "16px",
                    animation: "success-bloom 0.6s ease-out"
                  }}
                >
                  <CheckCircle className="w-16 h-16 mb-4" style={{ color: "var(--color-saffron)" }} />
                  <span className="text-cinzel text-xl font-bold mb-2" style={{ color: "var(--color-sandstone)" }}>
                    MESSAGE SENT
                  </span>
                  <span className="text-marcellus text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    Your message has been received successfully.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                {/* Name */}
                <div className="form-group">
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder=" "
                    className="form-input"
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    id="contact-name"
                  />
                  <label htmlFor="contact-name" className="floating-label">Your Name</label>
                </div>

                {/* Email */}
                <div className="form-group">
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder=" "
                    className="form-input"
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    id="contact-email"
                  />
                  <label htmlFor="contact-email" className="floating-label">Email Address</label>
                </div>

                {/* Message */}
                <div className="form-group">
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder=" "
                    className="form-input"
                    style={{ resize: "none" }}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    id="contact-message"
                  />
                  <label htmlFor="contact-message" className="floating-label">Message</label>
                </div>

                {/* Error message */}
                {error && (
                  <p className="text-sm font-semibold text-center" style={{ color: "#e05a10" }}>
                    {error}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sent || sending}
                  className="btn-primary w-full"
                  style={{
                    opacity: (sent || sending) ? 0.6 : 1,
                    cursor: (sent || sending) ? "not-allowed" : "pointer",
                    padding: "1.1rem 2rem"
                  }}
                >
                  <Send className={`w-4 h-4 ${sent ? "animate-bounce" : ""}`} />
                  {sending ? "SENDING..." : sent ? "MESSAGE SENT SUCCESSFULLY!" : "SEND MESSAGE"}
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
