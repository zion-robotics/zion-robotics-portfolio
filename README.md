# Zion Robotics — Developer Portfolio

## Vision
A cinematic, dark-themed developer portfolio that feels like deep space meets a world-class robotics lab. Electric blue and cyan glows, glassmorphism, and smooth animations throughout.

## Brand System
- **Background**: Deep space black-navy (#060D1F)
- **Primary**: Electric blue (#2563EB)
- **Accent**: Cyan glow (#00D4FF)
- **Text**: White (#FFFFFF) + Soft grey (#A0AEC0)
- **Fonts**: Orbitron + Exo 2 (headings), DM Sans (body)
- **Aesthetic**: Dark cinematic sci-fi premium tech

## Pages & Features

### 1. Home
- Full-screen hero with animated particle/mesh grid background (CSS/canvas, lightweight)
- Real background video (space/tech-themed, from a free stock source) with dark overlay
- Staggered text reveal: name → brand → tagline → supporting line
- Two CTAs: "See My Work" (solid blue) + "Contact Me" (ghost glow)
- Animated scroll indicator
- Asymmetric intro section with glowing decorative element
- 3 featured project cards (glassmorphism)
- Minimal footer with social links

### 2. About
- Two-column dramatic split layout
- Glowing pulsing frame placeholder for profile photo
- Full bio text with "About Me" heading
- Skill pill badges with glow hover (React, JS, HTML/CSS, Lovable, Sanity, Paystack, EmailJS, Git, Vercel)
- Stats strip: "6 months experience · 3 projects shipped · 2 SaaS platforms built"

### 3. Portfolio (Work)
- Massive "Work" heading with glowing underline
- Responsive grid of glassmorphism project cards
- Hover: lift + cyan border glow + inner light bloom
- "View Details" opens animated full-screen modal (scale-in + fade)
- All data from `projectsData.js`

### 4. Contact
- "Let's build something" heading
- Two-column: form (Name, Email, Message with glowing focus) + contact info
- EmailJS placeholders ready
- WhatsApp, GitHub, LinkedIn links with icons and glow hover

## Navigation
- Sticky navbar with "Zion Robotics" logo (Orbitron) + cyan dot
- Frosted glass on scroll with cyan bottom border
- Mobile: full-screen dark overlay hamburger menu
- Active link: glowing cyan underline

## Animations (CSS + Vanilla JS only)
- Staggered hero text reveal with animation-delay
- Intersection Observer scroll reveal (fade + slide up) on all sections
- Project card lift + glow on hover
- Button glow pulse + scale on hover
- Modal scale-in + fade
- Smooth route fade transitions
- Custom glowing cursor with CSS trail
- Animated noise/grain texture overlay on hero
- Subtle circuit-board grid pattern backgrounds
- Every page scrolls to top on navigate

## Data
- `src/data/projectsData.js` with Litepress, Ingenium AI, and Bioresonance Nigeria

## Technical
- React + React Router (multi-page)
- Google Fonts: Orbitron, Exo 2, DM Sans
- Fully responsive (mobile + desktop)
- No Three.js, GSAP, or Framer Motion
- Lightweight canvas particles for hero
- Lazy loading where needed
- EmailJS placeholder integration

## Author
Adeogun Daniel Joseph — [Zion Robotics](https://zionrobotics.dev)