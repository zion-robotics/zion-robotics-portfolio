import { useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { useScrollReveal } from "../hooks/useScrollReveal";
import AnimatedLetters from "../components/AnimatedLetters";

// ─── EmailJS Credentials ───────────────────────────────────────────────────
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;          // 👈 Replace this
const ADMIN_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE;   // 👈 Replace this (notifies you)
const AUTOREPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE; // 👈 Replace this (confirms to customer)
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;          // 👈 Replace this
// ──────────────────────────────────────────────────────────────────────────

const Contact = () => {
  useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
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
      message: form.message,
    };

    try {
      // Send admin notification (to you)
      await emailjs.send(SERVICE_ID, ADMIN_TEMPLATE_ID, templateParams, PUBLIC_KEY);

      // Send auto-reply (to customer)
      await emailjs.send(SERVICE_ID, AUTOREPLY_TEMPLATE_ID, templateParams, PUBLIC_KEY);

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="page-enter pt-20 md:pt-24 circuit-bg min-h-screen">
      <section className="py-12 md:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">
            <AnimatedLetters text="Let's build something" step={0.04} />
          </h1>
          <p className="reveal-blur font-body text-muted-foreground mb-12 md:mb-16 text-sm sm:text-base md:text-lg">
            Have a project in mind? I'd love to hear about it.
          </p>

          <div className="grid md:grid-cols-2 gap-10 md:gap-20">
            {/* Form */}
            <form onSubmit={handleSubmit} className="reveal-left space-y-5 md:space-y-6">
              <div>
                <label className="font-body text-sm text-muted-foreground block mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg input-glow font-body text-foreground text-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="font-body text-sm text-muted-foreground block mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg input-glow font-body text-foreground text-sm"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="font-body text-sm text-muted-foreground block mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg input-glow font-body text-foreground text-sm resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Status messages */}
              {status === "success" && (
                <p className="font-body text-sm text-accent">
                  ⚡ Message sent! I'll get back to you within 24–48 hours.
                </p>
              )}
              {status === "error" && (
                <p className="font-body text-sm text-red-400">
                  Something went wrong. Try reaching me on WhatsApp directly.
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm btn-glow btn-sheen magnetic-btn disabled:opacity-50"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>

            {/* Contact info */}
            <div className="reveal space-y-8">
              <p className="font-body text-muted-foreground text-sm leading-relaxed">
                I'm available for freelance projects, collaborations, and interesting conversations about web development and robotics.
              </p>

              <div className="space-y-4">
                <a
                  href="https://wa.me/2347016422826"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 glass-card rounded-xl px-5 py-4 group"
                >
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  <span className="font-body text-sm text-muted-foreground group-hover:text-accent transition-colors">WhatsApp</span>
                </a>

                <a
                  href="https://github.com/zion-robotics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 glass-card rounded-xl px-5 py-4 group"
                >
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  <span className="font-body text-sm text-muted-foreground group-hover:text-accent transition-colors">GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/adeogun-daniel-joseph-5895783a3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 glass-card rounded-xl px-5 py-4 group"
                >
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  <span className="font-body text-sm text-muted-foreground group-hover:text-accent transition-colors">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;