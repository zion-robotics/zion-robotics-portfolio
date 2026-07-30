import { useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { useScrollReveal } from "../hooks/useScrollReveal";
import AnimatedLetters from "../components/AnimatedLetters";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const ADMIN_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE;
const AUTOREPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const socials = [
  {
    label: "WhatsApp",
    href: "https://wa.me/2347016422826",
    hint: "+234 701 642 2826",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:adeogunjosephdaniel@gmail.com",
    hint: "adeogunjosephdaniel@gmail.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/zion-robotics",
    hint: "github.com/zion-robotics",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/adeogun-daniel-joseph-5895783a3/",
    hint: "Adeogun Daniel Joseph",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

const Contact = () => {
  useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatus("idle");

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      to_name: form.name,
      subject: form.subject,
      message: form.message,
    };

    try {
      await emailjs.send(SERVICE_ID, ADMIN_TEMPLATE_ID, templateParams, PUBLIC_KEY);
      await emailjs.send(SERVICE_ID, AUTOREPLY_TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="page-enter pt-20 md:pt-24 min-h-screen">

      {/* ── Header ─────────────────────────────────── */}
      <section className="py-14 md:py-20 px-4 sm:px-6 circuit-bg">
        <div className="max-w-7xl mx-auto">
          <p className="font-exo text-xs tracking-[0.3em] uppercase text-accent mb-3">Get in touch</p>
          <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            <AnimatedLetters text="Let's build something" step={0.04} />
          </h1>
          <p className="reveal-blur font-body text-muted-foreground text-sm sm:text-base max-w-lg">
            Available for freelance projects, collaborations, and interesting conversations. I typically respond within 24 hours.
          </p>
        </div>
      </section>

      {/* ── Main content ───────────────────────────── */}
      <section className="py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-10 md:gap-16">

          {/* Form — 3 cols */}
          <div className="md:col-span-3 reveal-left">
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <h2 className="font-orbitron text-lg font-bold text-foreground mb-6">Send a message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-body text-xs text-muted-foreground block mb-2 uppercase tracking-wider">Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg input-glow font-body text-foreground text-sm bg-background border border-border focus:border-accent focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-muted-foreground block mb-2 uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg input-glow font-body text-foreground text-sm bg-background border border-border focus:border-accent focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-body text-xs text-muted-foreground block mb-2 uppercase tracking-wider">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg input-glow font-body text-foreground text-sm bg-background border border-border focus:border-accent focus:outline-none transition-colors"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="font-body text-xs text-muted-foreground block mb-2 uppercase tracking-wider">Message</label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg input-glow font-body text-foreground text-sm bg-background border border-border focus:border-accent focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project or idea..."
                  />
                </div>

                {status === "success" && (
                  <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-accent/5 border border-accent/20">
                    <span className="text-accent">⚡</span>
                    <p className="font-body text-sm text-accent">Message sent! I'll get back to you within 24 hours.</p>
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-400/5 border border-red-400/20">
                    <span className="text-red-400">✕</span>
                    <p className="font-body text-sm text-red-400">Something went wrong. Try reaching me on WhatsApp instead.</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm btn-glow btn-sheen magnetic-btn disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  {sending ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                      </svg>
                      Sending...
                    </span>
                  ) : "Send Message →"}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar — 2 cols */}
          <div className="md:col-span-2 reveal-right space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-orbitron text-sm font-bold text-foreground mb-4">Find me on</h2>
              <div className="space-y-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 px-4 py-3 rounded-xl border border-border hover:border-accent group transition-all duration-200"
                  >
                    <span className="text-accent group-hover:scale-110 transition-transform">{s.icon}</span>
                    <div>
                      <p className="font-body text-sm font-medium text-foreground group-hover:text-accent transition-colors">{s.label}</p>
                      <p className="font-body text-xs text-muted-foreground truncate max-w-[160px]">{s.hint}</p>
                    </div>
                    <span className="ml-auto text-muted-foreground group-hover:text-accent transition-colors text-sm">→</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-orbitron text-sm font-bold text-foreground mb-3">Availability</h2>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-body text-sm text-green-400">Open to work</span>
              </div>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                Available for freelance projects, SaaS collaboration, and AI integrations. Response time: within 24 hours.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
