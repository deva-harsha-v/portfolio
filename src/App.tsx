/**
 * Deva Harsha — Portfolio (TypeScript Fixed)
 * All 48 TS errors resolved with proper type annotations
 */

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  motion, useScroll, useTransform, useInView,
  useMotionValue, useSpring, AnimatePresence,
  type Variants, type MotionStyle
} from "framer-motion";
import {
  ArrowUpRight, Mail, Phone,
  ChevronDown, Star, Zap, Shield, Layers, RefreshCw, ExternalLink,
} from "lucide-react";

// ─── SOCIAL ICONS (SVG — lucide-react removed Github/Twitter/Instagram) ────────
const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

// ─── BASE STYLES ─────────────────────────────────────────────────────────────
const _st = document.createElement("style");
_st.textContent = `
  :root {
    --accent: #6366F1;
    --accent-hover: #4f46e5;
    --accent-glow: rgba(99, 102, 241, 0.12);
    --accent-glow-strong: rgba(99, 102, 241, 0.25);
    --cream: #F4F0E6;
    --cream-muted: #8A8578;
    --bg-dark: #0A0A0A;
  }
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{background:var(--bg-dark);color:var(--cream);font-family:'Almarai',sans-serif;overflow-x:hidden}
  ::-webkit-scrollbar{width:2px}
  ::-webkit-scrollbar-track{background:#000}
  ::-webkit-scrollbar-thumb{background:var(--accent)}
  .serif-italic{font-family:'Instrument Serif',serif;font-style:italic}
  .noise-overlay{
    position:absolute;inset:0;pointer-events:none;z-index:1;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    background-size:200px 200px;opacity:.35
  }
  .cream{color:var(--cream)}
  .bg-feature{background:#161619}
  .bg-about{background:#101014; border: 1px solid rgba(99, 102, 241, 0.08) !important;}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes pulse-ring{0%{transform:scale(1);opacity:.6}100%{transform:scale(2.2);opacity:0}}
  .float{animation:float 6s ease-in-out infinite}
  .btn-primary{
    background:var(--accent);color:#fff;font-family:'Almarai',sans-serif;
    font-weight:700;border:none;cursor:pointer;transition:all .25s cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: 0 4px 14px var(--accent-glow);
  }
  .btn-primary:hover{background:#fff;color:#000;transform:translateY(-2px);box-shadow: 0 6px 20px var(--accent-glow-strong);}
  .btn-secondary{
    background:transparent;color:var(--cream);font-family:'Almarai',sans-serif;
    font-weight:400;border:1px solid rgba(99, 102, 241, 0.3);cursor:pointer;transition:all .25s cubic-bezier(0.22, 1, 0.36, 1)
  }
  .btn-secondary:hover{border-color:var(--accent);background:var(--accent-glow);transform:translateY(-2px);}
  .step-line{position:absolute;left:11px;top:24px;bottom:-24px;width:1px;background:linear-gradient(to bottom,var(--accent),transparent);opacity:0.35;}
  .tag{
    display:inline-flex;align-items:center;padding:4px 10px;
    background:rgba(99, 102, 241, 0.04);border:1px solid rgba(99, 102, 241, 0.15);
    border-radius:100px;font-size:11px;font-weight:300;color:rgba(244,240,230,0.85);letter-spacing:.05em;
    transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .tag:hover{
    background:rgba(99, 102, 241, 0.15);
    border-color:var(--accent);
    color:#fff;
    transform:translateY(-1.5px);
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.15);
  }
  .superscript-star{font-size:.35em;vertical-align:super;color:var(--accent);position:relative;top:-.2em}
  .agent-tooltip{
    position:absolute;pointer-events:none;
    background:rgba(10,10,10,.95);border:1px solid rgba(99, 102, 241, 0.15);
    border-radius:8px;padding:10px 14px;min-width:140px;
    box-shadow:0 12px 40px rgba(0,0,0,.6);z-index:20;
    backdrop-filter:blur(8px);
  }
  @keyframes grain {
    0%,100%{transform:translate(0,0)}
    10%{transform:translate(-2%,-3%)}
    20%{transform:translate(3%,2%)}
    30%{transform:translate(-1%,4%)}
    40%{transform:translate(4%,-2%)}
    50%{transform:translate(-3%,1%)}
    60%{transform:translate(2%,3%)}
    70%{transform:translate(-4%,-1%)}
    80%{transform:translate(1%,-4%)}
    90%{transform:translate(3%,1%)}
  }
  .film-grain::after {
    content:'';
    position:absolute;inset:-50%;
    width:200%;height:200%;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='1'/%3E%3C/svg%3E");
    background-size:180px 180px;
    opacity:0.09;
    animation:grain 0.4s steps(1) infinite;
    pointer-events:none;
    z-index:3;
    border-radius:inherit;
  }
  .portrait-scan::before {
    content:'';
    position:absolute;inset:0;
    background:linear-gradient(180deg, transparent 0%, transparent 60%, #000 100%);
    z-index:2;border-radius:inherit;pointer-events:none;
  }
  .hero-left-side {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 6vh;
  }
  .hero-portrait-wrapper {
    position: relative;
    width: min(420px, 40vw);
    max-width: 420px;
    perspective: 1000px;
  }
  .hero-portrait-label {
    position: absolute;
    right: -36px;
    top: 50%;
    transform: translateY(-50%) rotate(90deg);
    font-size: 9px;
    letter-spacing: 0.2em;
    color: rgba(222,219,200,0.2);
    text-transform: uppercase;
    font-weight: 300;
    white-space: nowrap;
  }
  @media(max-width:900px){
    .hero-main-grid{
      grid-template-columns: 1fr !important;
      gap: 32px !important;
    }
    .hero-left-side {
      padding-bottom: 2vh !important;
    }
    .hero-portrait-wrapper {
      width: min(320px, 80vw) !important;
      margin: 0 auto;
    }
    .hero-portrait-label {
      display: none !important;
    }
    .beyond-grid{grid-template-columns:1fr !important}
    .autoresearch-grid{
      grid-template-columns:1fr !important;
      gap:28px !important;
    }
    .autoresearch-grid > div:last-child {
      min-height:340px;
      border-top:1px solid rgba(222,219,200,0.08);
      padding-top:24px;
    }
    .featured-card-inner {
      padding: 28px 24px 36px !important;
    }
  }
`;
document.head.appendChild(_st);

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  role: string;
  color: string;
  r: number;
}

interface Edge {
  from: string;
  to: string;
  label: string;
}

interface ParticleNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
}

// ─── UTILS ───────────────────────────────────────────────────────────────────
const isMobile = (): boolean =>
  typeof window !== "undefined" && window.innerWidth < 768;

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────────────
// Fix: use [number,number,number,number] tuple for cubic-bezier ease
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────
interface SectionLabelProps { text: string }
function SectionLabel({ text }: SectionLabelProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#DEDBC8" }} />
      <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(222,219,200,0.5)", fontWeight: 300 }}>{text}</span>
    </div>
  );
}

interface FadeSectionProps {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}
function FadeSection({ children, delay = 0, style: s = {} }: FadeSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUp}
      custom={delay}
      style={s}
    >
      {children}
    </motion.div>
  );
}

// ─── 3D CARD TILT ─────────────────────────────────────────────────────────────
interface TiltCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  intensity?: number;
}
function TiltCard({ children, style: s = {}, className = "", intensity = 12 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 200, damping: 20 });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 200, damping: 20 });
  const scale = useSpring(1, { stiffness: 200, damping: 20 });
  const shadowOpacity = useSpring(0, { stiffness: 200, damping: 20 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile()) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const onEnter = () => { scale.set(1.02); shadowOpacity.set(1); };
  const onLeave = () => { x.set(0); y.set(0); scale.set(1); shadowOpacity.set(0); };

  const boxShadow = useTransform(shadowOpacity, [0, 1],
    ["0 4px 20px rgba(222,219,200,0)", "0 24px 60px rgba(222,219,200,0.07)"]);

  const motionStyle: MotionStyle = {
    rotateX: rotX,
    rotateY: rotY,
    scale,
    boxShadow,
    transformStyle: "preserve-3d",
    ...s,
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={motionStyle}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── HERO 3D: PARTICLE NETWORK ───────────────────────────────────────────────
interface ParticleNetworkProps {
  mouseX: React.MutableRefObject<number>;
  mouseY: React.MutableRefObject<number>;
}
function ParticleNetwork({ mouseX, mouseY }: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mobile = isMobile();
  const NODE_COUNT = mobile ? 28 : 55;
  const MAX_DIST = mobile ? 110 : 160;

  const nodes = useMemo<ParticleNode[]>(() => {
    return Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.15,
    }));
  }, [NODE_COUNT]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    let mx = 0.5, my = 0.5;

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      mx += (mouseX.current - mx) * 0.04;
      my += (mouseY.current - my) * 0.04;

      nodes.forEach(n => {
        n.x += n.vx + (mx - 0.5) * 0.00008;
        n.y += n.vy + (my - 0.5) * 0.00006;
        if (n.x < 0) n.x = 1; if (n.x > 1) n.x = 0;
        if (n.y < 0) n.y = 1; if (n.y > 1) n.y = 0;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = (a.x - b.x) * W, dy = (a.y - b.y) * H;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(222,219,200,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(a.x * W, a.y * H);
            ctx.lineTo(b.x * W, b.y * H);
            ctx.stroke();
          }
        }
      }

      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x * W, n.y * H, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(222,219,200,${n.opacity})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [nodes, mouseX, mouseY, MAX_DIST]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.6, pointerEvents: "none" }}
    />
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let ticking = false;
    const fn = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["Skills", "Projects", "Approach", "Experience", "Internships", "Contact"];
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", justifyContent: "center", padding: "20px 24px",
        transition: "background 0.4s ease",
        background: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
    >
      <div style={{ display: "flex", gap: 32 }}>
        {links.map(link => (
          <a key={link} href={`#${link.toLowerCase()}`}
            style={{ color: "rgba(225,224,204,0.5)", fontSize: 13, fontWeight: 300, textDecoration: "none", letterSpacing: "0.08em", transition: "color 0.2s", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = "#DEDBC8"}
            onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(225,224,204,0.5)"}
          >{link}</a>
        ))}
      </div>
    </motion.nav>
  );
}

// ─── SECTION 1: HERO ─────────────────────────────────────────────────────────
function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useRef<number>(0.5);
  const mouseY = useRef<number>(0.5);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, 30]);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.current = (e.clientX - rect.left) / rect.width;
    mouseY.current = (e.clientY - rect.top) / rect.height;
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={onMouseMove}
      style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 5vw 6vh", paddingTop: "100px" }}
    >
      <motion.div style={{ y: bgY, position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(222,219,200,0.06) 0%, transparent 70%), radial-gradient(circle at 20% 50%, rgba(99,102,241,0.04) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(222,219,200,0.03) 0%, transparent 60%), #0A0A0A", zIndex: 0 }} />

      <motion.div style={{ y: midY, position: "absolute", inset: 0, zIndex: 1 }}>
        <ParticleNetwork mouseX={mouseX} mouseY={mouseY} />
      </motion.div>

      <div className="noise-overlay" style={{ zIndex: 2 }} />

      <motion.div className="float" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "10%", right: "8%", width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle, rgba(222,219,200,0.05) 0%, transparent 70%)", filter: "blur(50px)" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "3%", width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(222,219,200,0.03) 0%, transparent 70%)", filter: "blur(36px)" }} />
      </motion.div>

      <motion.div
        className="hero-main-grid"
        style={{ y, opacity, position: "relative", zIndex: 3, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, alignItems: "center", minHeight: "calc(100vh - 160px)" }}
      >
        {/* LEFT SIDE */}
        <div className="hero-left-side">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.3 }}>
            <h1 style={{ fontSize: "clamp(56px, 10vw, 150px)", fontWeight: 800, lineHeight: 0.88, letterSpacing: "-0.04em", color: "#E1E0CC", marginBottom: "4vh" }}>
              Deva<br />Harsha<span className="superscript-star">✦</span>
            </h1>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
            style={{ fontSize: "clamp(13px, 1.2vw, 16px)", color: "rgba(225,224,204,0.55)", lineHeight: 1.7, maxWidth: 480, marginBottom: 28, fontWeight: 300 }}>
            Building intelligent systems that automate real-world problems — from multi-agent AI research pipelines to full-stack platforms — with a focus on clarity, reliability, and user experience.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
            {["Developer", "AI Systems", "Full-Stack", "Storyteller", "Based in India"].map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }}
            style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
            <a href="#projects" className="btn-primary" style={{ padding: "12px 28px", borderRadius: 6, fontSize: 14, display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none" }}>
              View Projects <ArrowUpRight size={14} />
            </a>
            <a href="#contact" className="btn-secondary" style={{ padding: "12px 28px", borderRadius: 6, fontSize: 14, display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
              Get in touch
            </a>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.3 }}
            style={{ display: "flex", gap: "clamp(16px, 4vw, 32px)", flexWrap: "wrap" }}>
            {[["8+", "Projects"], ["7", "Certifications"], ["2+", "Years Coding"]].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontSize: "clamp(22px, 2.5vw, 36px)", fontWeight: 800, color: "#DEDBC8", lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: 11, color: "rgba(225,224,204,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT SIDE — Cinematic portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", minHeight: 400 }}
        >
          <div className="hero-portrait-wrapper">
            {/* Outer decorative frame */}
            <div style={{
              position: "absolute", inset: -14,
              border: "1px solid rgba(222,219,200,0.08)",
              borderRadius: 6,
              pointerEvents: "none", zIndex: 0,
            }} />
            <div style={{
              position: "absolute", inset: -6,
              border: "1px solid rgba(222,219,200,0.12)",
              borderRadius: 4,
              pointerEvents: "none", zIndex: 0,
            }} />

            {/* Photo container — continuous subtle 3D drift, like a slowly turning 3D model */}
            <motion.div
              className="film-grain portrait-scan"
              style={{
                position: "relative",
                borderRadius: 4,
                overflow: "hidden",
                aspectRatio: "3/4",
                transformStyle: "preserve-3d",
              }}
              animate={{
                rotateY: [-4, 4, -4],
                rotateX: [2, -2, 2],
                y: [0, -8, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src="/profile.jpeg"
                alt="Deva Harsha"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                  filter: "grayscale(100%) contrast(1.05) brightness(0.88)",
                  mixBlendMode: "normal",
                }}
              />

              {/* Duotone tint overlay */}
              <div style={{
                position: "absolute", inset: 0, zIndex: 3,
                background: "rgba(99, 102, 241, 0.12)",
                mixBlendMode: "color",
                pointerEvents: "none",
              }} />

              {/* Vignette overlay */}
              <div style={{
                position: "absolute", inset: 0, zIndex: 1,
                background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)",
                pointerEvents: "none",
              }} />

              {/* Top fade */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "18%", zIndex: 2,
                background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 100%)",
                pointerEvents: "none",
              }} />

              {/* Bottom name tag */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 4,
                padding: "28px 20px 18px",
                background: "linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 100%)",
              }}>
                <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(222,219,200,0.4)", fontWeight: 300, marginBottom: 4 }}>
                  Full-Stack
                </div>
                <div style={{ fontSize: 13, letterSpacing: "0.06em", color: "rgba(222,219,200,0.7)", fontWeight: 300 }}>
                  Based in Andhra Pradesh, India
                </div>
              </div>

              {/* Corner marks — film-style */}
              {[
                { top: 10, left: 10, borderTop: "1px solid rgba(222,219,200,0.35)", borderLeft: "1px solid rgba(222,219,200,0.35)" },
                { top: 10, right: 10, borderTop: "1px solid rgba(222,219,200,0.35)", borderRight: "1px solid rgba(222,219,200,0.35)" },
                { bottom: 10, left: 10, borderBottom: "1px solid rgba(222,219,200,0.35)", borderLeft: "1px solid rgba(222,219,200,0.35)" },
                { bottom: 10, right: 10, borderBottom: "1px solid rgba(222,219,200,0.35)", borderRight: "1px solid rgba(222,219,200,0.35)" },
              ].map((style, i) => (
                <div key={i} style={{ position: "absolute", ...style, width: 18, height: 18, zIndex: 5, pointerEvents: "none" }} />
              ))}
            </motion.div>

            {/* Side label */}
            <div className="hero-portrait-label">
              Deva Harsha · 2026
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
        style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, zIndex: 4 }}>
        <span style={{ fontSize: 10, letterSpacing: "0.15em", color: "rgba(222,219,200,0.3)", textTransform: "uppercase" }}>Scroll</span>
        <ChevronDown size={14} color="rgba(222,219,200,0.3)" className="float" />
      </motion.div>
    </section>
  );
}

// ─── SECTION 2: SKILLS ───────────────────────────────────────────────────────
function Skills() {
  const groups = [
    {
      label: "Languages",
      pills: ["Python", "TypeScript"],
      variant: "default",
    },
    {
      label: "Frontend",
      pills: ["Next.js", "React"],
      variant: "alt",
    },
    {
      label: "Backend",
      pills: ["Node.js", "Django"],
      variant: "alt",
    },
    {
      label: "Auth & Security",
      pills: ["NextAuth.js", "JWT"],
      variant: "neutral",
    },
    {
      label: "Databases",
      pills: ["PostgreSQL", "MySQL", "Supabase"],
      variant: "neutral",
    },
    {
      label: "Cloud & Tools",
      pills: ["Vercel", "Railway", "GitHub", "Postman", "VS Code", "Cloudinary"],
      variant: "neutral",
    },
  ];

  const pillStyles: Record<string, React.CSSProperties> = {
    default: {
      background: "rgba(222,219,200,0.1)",
      border: "1px solid rgba(222,219,200,0.2)",
      color: "#DEDBC8",
    },
    alt: {
      background: "rgba(222,219,200,0.05)",
      border: "1px solid rgba(222,219,200,0.12)",
      color: "rgba(222,219,200,0.8)",
    },
    neutral: {
      background: "transparent",
      border: "1px solid rgba(222,219,200,0.1)",
      color: "rgba(222,219,200,0.6)",
    },
  };

  return (
    <section id="skills" style={{ padding: "12vh 5vw", position: "relative", background: "#0F0F12" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeSection>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}>
            <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(222,219,200,0.3)", fontWeight: 300 }}>01</span>
            <span style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(222,219,200,0.5)", fontWeight: 300 }}>Skills</span>
            <div style={{ flex: 1, height: 1, background: "rgba(222,219,200,0.08)" }} />
          </div>
        </FadeSection>
        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          {groups.map((group, i) => (
            <FadeSection key={group.label} delay={i * 0.3}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(222,219,200,0.35)", fontWeight: 300 }}>
                  {group.label}
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {group.pills.map(pill => (
                    <span
                      key={pill}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "6px 14px",
                        borderRadius: 100,
                        fontSize: 12,
                        fontWeight: 300,
                        letterSpacing: "0.04em",
                        fontFamily: "'Almarai', sans-serif",
                        transition: "all 0.2s ease",
                        cursor: "default",
                        ...pillStyles[group.variant],
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLSpanElement).style.background = "rgba(222,219,200,0.15)";
                        (e.currentTarget as HTMLSpanElement).style.borderColor = "rgba(222,219,200,0.35)";
                        (e.currentTarget as HTMLSpanElement).style.color = "#DEDBC8";
                      }}
                      onMouseLeave={(e) => {
                        Object.assign((e.currentTarget as HTMLSpanElement).style, pillStyles[group.variant]);
                      }}
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 3: HOW I BUILD ───────────────────────────────────────────────────
function HowIBuild() {
  const steps = [
    { num: "01", title: "Understand", desc: "Define the real problem and constraints before writing a single line.", icon: <Star size={14} /> },
    { num: "02", title: "Break",      desc: "Divide complexity into manageable, independent parts.",               icon: <Layers size={14} /> },
    { num: "03", title: "Build",      desc: "Implement modular components with clear interfaces.",                 icon: <Zap size={14} /> },
    { num: "04", title: "Test",       desc: "Validate behavior and handle edge cases explicitly.",                 icon: <Shield size={14} /> },
    { num: "05", title: "Improve",    desc: "Optimize for clarity, performance, and maintainability.",             icon: <RefreshCw size={14} /> },
  ];
  return (
    <section id="approach" style={{ padding: "12vh 5vw", position: "relative" }}>
      <div className="noise-overlay" style={{ opacity: 0.15 }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <FadeSection><SectionLabel text="System Thinking" /></FadeSection>
        <FadeSection delay={1}><h2 style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>I don't just build features,</h2></FadeSection>
        <FadeSection delay={2}><h2 className="serif-italic" style={{ fontSize: "clamp(30px, 4.5vw, 60px)", lineHeight: 1.1, marginBottom: 12, color: "#DEDBC8" }}>I structure systems.</h2></FadeSection>
        <FadeSection delay={3}><p style={{ fontSize: 15, color: "rgba(225,224,204,0.45)", maxWidth: 460, marginBottom: 60, lineHeight: 1.7, fontWeight: 300 }}>From breaking problems into components to designing reliable workflows.</p></FadeSection>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          <FadeSection delay={2}>
            <div className="bg-about" style={{ borderRadius: 16, padding: "40px 36px", border: "1px solid rgba(222,219,200,0.07)" }}>
              <p style={{ fontSize: "clamp(14px, 1.3vw, 16px)", lineHeight: 1.85, color: "rgba(225,224,204,0.7)", fontWeight: 300 }}>
                I focus on building systems that are not just functional, but{" "}
                <span className="cream" style={{ fontWeight: 700 }}>clear, reliable, and maintainable</span> — with the understanding that good software communicates its intent as clearly as it executes its logic.
              </p>
              <div style={{ marginTop: 28, paddingTop: 28, borderTop: "1px solid rgba(222,219,200,0.07)" }}>
                <p style={{ fontSize: 12, color: "rgba(222,219,200,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 300 }}>The approach behind every project</p>
              </div>
            </div>
          </FadeSection>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {steps.map((step, i) => (
              <FadeSection key={step.num} delay={i * 0.5}>
                <div style={{ position: "relative", display: "flex", gap: 20, paddingBottom: i < steps.length - 1 ? 28 : 0 }}>
                  {i < steps.length - 1 && <div className="step-line" />}
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(222,219,200,0.08)", border: "1px solid rgba(222,219,200,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#DEDBC8" }}>
                    <span style={{ fontSize: 9, fontWeight: 700 }}>{step.num}</span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#DEDBC8", marginBottom: 3 }}>{step.title}</div>
                    <div style={{ fontSize: 13, color: "rgba(225,224,204,0.45)", lineHeight: 1.6, fontWeight: 300 }}>{step.desc}</div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── AGENT SYSTEM VISUALIZATION ──────────────────────────────────────────────
function AgentSystemViz() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [tick, setTick] = useState(0);
  const inView = useInView(containerRef, { once: false, margin: "-10% 0px" });
 
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setTick(t => (t + 1) % 100), 60);
    return () => clearInterval(id);
  }, [inView]);
 
  const W = 520, H = 300;
 
  const nodes: Node[] = [
    { id: "input",  x: 60,  y: 150, label: "Research Query",   role: "Entry point for user input",              color: "rgba(222,219,200,0.5)", r: 14 },
    { id: "search", x: 185, y: 70,  label: "Search Agent",     role: "Retrieves relevant sources from the web", color: "#DEDBC8",               r: 18 },
    { id: "summ",   x: 185, y: 230, label: "Summarizer Agent", role: "Condenses and extracts key insights",     color: "#DEDBC8",               r: 18 },
    { id: "valid",  x: 345, y: 150, label: "Validation Agent", role: "Cross-checks facts and scores confidence",color: "#DEDBC8",               r: 20 },
    { id: "output", x: 465, y: 150, label: "Verified Report",  role: "Final synthesized research output",       color: "rgba(222,219,200,0.5)", r: 14 },
  ];
 
  const edges: Edge[] = [
    { from: "input",  to: "search", label: "query"   },
    { from: "input",  to: "summ",   label: "query"   },
    { from: "search", to: "valid",  label: "sources" },
    { from: "summ",   to: "valid",  label: "summary" },
    { from: "valid",  to: "output", label: "report"  },
  ];
 
  const getNode = (id: string): Node | undefined => nodes.find(n => n.id === id);
 
  interface FlowParticleProps { from: string; to: string; phase: number }
  const FlowParticle = ({ from, to, phase }: FlowParticleProps) => {
    const a = getNode(from);
    const b = getNode(to);
    if (!a || !b) return null;
    const t = ((tick / 100) + phase) % 1;
    const px = a.x + (b.x - a.x) * t;
    const py = a.y + (b.y - a.y) * t;
    return <circle cx={px} cy={py} r={2.5} fill="#DEDBC8" opacity={0.7 * Math.sin(t * Math.PI)} />;
  };
 
  const handleNodeHover = (e: React.MouseEvent, node: Node | null) => {
    if (!node) { setHoveredNode(null); return; }
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setHoveredNode(node);
    setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top - 60 });
  };
 
  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        style={{ position: "relative", maxWidth: W, width: "100%" }}
      >
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", overflow: "visible", cursor: "default" }}>
          {edges.map((edge, i) => {
            const a = getNode(edge.from);
            const b = getNode(edge.to);
            if (!a || !b) return null;
            const isActive = hoveredNode && (hoveredNode.id === edge.from || hoveredNode.id === edge.to);
            return (
              <g key={i}>
                <line
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={isActive ? "rgba(222,219,200,0.35)" : "rgba(222,219,200,0.12)"}
                  strokeWidth={isActive ? 1.5 : 1}
                  strokeDasharray="5 4"
                  style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                />
                {inView && <FlowParticle from={edge.from} to={edge.to} phase={i * 0.18} />}
              </g>
            );
          })}
 
          {nodes.map((node) => {
            const isHovered = hoveredNode?.id === node.id;
            const isCore = ["search", "summ", "valid"].includes(node.id);
            return (
              <g key={node.id}
                onMouseEnter={(e) => handleNodeHover(e, node)}
                onMouseLeave={(e) => handleNodeHover(e, null)}
                style={{ cursor: "pointer" }}
              >
                {isHovered && (
                  <>
                    <circle cx={node.x} cy={node.y} r={node.r + 8}  fill="none" stroke="rgba(222,219,200,0.15)" strokeWidth="1" style={{ animation: "pulse-ring 1.2s ease-out infinite" }} />
                    <circle cx={node.x} cy={node.y} r={node.r + 14} fill="none" stroke="rgba(222,219,200,0.07)" strokeWidth="1" style={{ animation: "pulse-ring 1.2s ease-out 0.4s infinite" }} />
                  </>
                )}
                <circle cx={node.x} cy={node.y} r={node.r + 4} fill="none"
                  stroke={isHovered ? "rgba(222,219,200,0.2)" : "rgba(222,219,200,0.06)"}
                  strokeWidth="1" style={{ transition: "stroke 0.3s" }} />
                <circle cx={node.x} cy={node.y} r={node.r}
                  fill={isHovered ? "rgba(222,219,200,0.18)" : isCore ? "rgba(222,219,200,0.06)" : "rgba(222,219,200,0.03)"}
                  stroke={isHovered ? "#DEDBC8" : isCore ? "rgba(222,219,200,0.35)" : "rgba(222,219,200,0.15)"}
                  strokeWidth={isHovered ? 1.5 : 1}
                  style={{ transition: "all 0.3s ease" }} />
                <circle cx={node.x} cy={node.y} r={isCore ? 3.5 : 2}
                  fill={isHovered ? "#fff" : "#DEDBC8"}
                  opacity={isHovered ? 1 : 0.6}
                  style={{ transition: "all 0.2s" }} />
                <text x={node.x} y={node.y + node.r + 16}
                  textAnchor="middle" fill={isHovered ? "#DEDBC8" : "rgba(222,219,200,0.35)"}
                  fontSize="9" fontFamily="Almarai, sans-serif" fontWeight="300" letterSpacing="0.04em"
                  style={{ transition: "fill 0.2s", userSelect: "none" }}>
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
 
        <AnimatePresence>
          {hoveredNode && (
            <motion.div
              className="agent-tooltip"
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              style={{ left: Math.min(tooltipPos.x - 70, W - 160), top: tooltipPos.y }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: "#DEDBC8", marginBottom: 4 }}>{hoveredNode.label}</div>
              <div style={{ fontSize: 11, color: "rgba(225,224,204,0.5)", lineHeight: 1.6, fontWeight: 300 }}>{hoveredNode.role}</div>
            </motion.div>
          )}
        </AnimatePresence>
 
      </motion.div>
 
      {/* Legend */}
      <div style={{ position: "absolute", bottom: -8, right: 0, display: "flex", gap: 16 }}>
        {[["Node", "rgba(222,219,200,0.35)"], ["Flow", "rgba(222,219,200,0.5)"]].map(([l, c]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
            <span style={{ fontSize: 10, color: "rgba(222,219,200,0.3)", letterSpacing: "0.08em" }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LABSCAN SYSTEM VISUALIZATION ────────────────────────────────────────────
function LabScanViz() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const inView = useInView(containerRef, { once: false, margin: "-10% 0px" });

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setTick(t => (t + 1) % 100), 55);
    return () => clearInterval(id);
  }, [inView]);

  const W = 540, H = 320;

  interface LSNode {
    id: string; x: number; y: number; label: string; sublabel: string;
    role: string; color: string; r: number; shape: "circle" | "rect";
  }

  const nodes: LSNode[] = [
    { id: "faculty",  x: 60,  y: 80,  label: "Faculty",       sublabel: "Creator",     role: "Creates experiments & links ArUco markers to staged content", color: "rgba(222,219,200,0.6)", r: 16, shape: "circle" },
    { id: "aruco",    x: 200, y: 80,  label: "ArUco Marker",  sublabel: "Physical QR", role: "Physical marker printed & placed in the lab — scanned by student", color: "#DEDBC8", r: 20, shape: "circle" },
    { id: "student",  x: 60,  y: 220, label: "Student",       sublabel: "Scanner",     role: "Scans ArUco marker with device camera to unlock experiment", color: "rgba(222,219,200,0.6)", r: 16, shape: "circle" },
    { id: "content",  x: 330, y: 150, label: "Staged Content", sublabel: "Theory→Video→Submit", role: "Sequential content unlocked per stage: Theory → Video → Submission form", color: "#DEDBC8", r: 22, shape: "circle" },
    { id: "backend",  x: 200, y: 220, label: "Backend API",   sublabel: "Node + Express", role: "Handles auth, session state, ArUco resolution, file uploads via Cloudinary", color: "#DEDBC8", r: 18, shape: "circle" },
    { id: "db",       x: 330, y: 290, label: "PostgreSQL",    sublabel: "Prisma ORM",  role: "Stores experiments, sessions, submissions and mark data", color: "rgba(222,219,200,0.5)", r: 14, shape: "circle" },
    { id: "hod",      x: 470, y: 80,  label: "HOD",           sublabel: "Analytics",   role: "Tracks marks and performance across sections via dashboard", color: "rgba(222,219,200,0.6)", r: 16, shape: "circle" },
    { id: "marks",    x: 470, y: 220, label: "Marks Dashboard", sublabel: "Real-time", role: "Live view of submissions, scores and section-level analytics", color: "#DEDBC8", r: 18, shape: "circle" },
  ];

  interface LSEdge { from: string; to: string; label: string; phase: number }
  const edges: LSEdge[] = [
    { from: "faculty",  to: "aruco",    label: "creates",  phase: 0 },
    { from: "faculty",  to: "content",  label: "stages",   phase: 0.15 },
    { from: "student",  to: "aruco",    label: "scans",    phase: 0.3 },
    { from: "aruco",    to: "backend",  label: "resolves", phase: 0.45 },
    { from: "backend",  to: "content",  label: "unlocks",  phase: 0.6 },
    { from: "backend",  to: "db",       label: "persists", phase: 0.2 },
    { from: "content",  to: "marks",    label: "submits",  phase: 0.75 },
    { from: "marks",    to: "hod",      label: "reports",  phase: 0.1 },
    { from: "db",       to: "marks",    label: "queries",  phase: 0.5 },
  ];

  const getNode = (id: string) => nodes.find(n => n.id === id);

  interface FPProps { from: string; to: string; phase: number; idx: number }
  const FlowParticle = ({ from, to, phase, idx }: FPProps) => {
    const a = getNode(from); const b = getNode(to);
    if (!a || !b) return null;
    const t = ((tick / 100) + phase) % 1;
    const px = a.x + (b.x - a.x) * t;
    const py = a.y + (b.y - a.y) * t;
    const isHot = hoveredNode === from || hoveredNode === to;
    return <circle key={idx} cx={px} cy={py} r={2} fill="#DEDBC8" opacity={(isHot ? 1 : 0.55) * Math.sin(t * Math.PI)} />;
  };

  const handleHover = (id: string | null) => setHoveredNode(id);

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
        style={{ position: "relative", maxWidth: W, width: "100%" }}
      >
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", overflow: "visible", cursor: "default" }}>
          {/* Edges */}
          {edges.map((edge, i) => {
            const a = getNode(edge.from); const b = getNode(edge.to);
            if (!a || !b) return null;
            const isActive = hoveredNode === edge.from || hoveredNode === edge.to;
            const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
            return (
              <g key={i}>
                <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={isActive ? "rgba(222,219,200,0.4)" : "rgba(222,219,200,0.1)"}
                  strokeWidth={isActive ? 1.5 : 1} strokeDasharray="4 4"
                  style={{ transition: "stroke 0.3s, stroke-width 0.3s" }} />
                {isActive && (
                  <text x={mx} y={my - 5} textAnchor="middle" fill="rgba(222,219,200,0.4)"
                    fontSize="8" fontFamily="Almarai, sans-serif" fontWeight="300" letterSpacing="0.06em">
                    {edge.label}
                  </text>
                )}
                {inView && <FlowParticle from={edge.from} to={edge.to} phase={edge.phase} idx={i} />}
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map(node => {
            const isHovered = hoveredNode === node.id;
            const isCore = ["aruco", "content", "backend", "marks"].includes(node.id);
            return (
              <g key={node.id}
                onMouseEnter={() => handleHover(node.id)}
                onMouseLeave={() => handleHover(null)}
                style={{ cursor: "pointer" }}>
                {isHovered && (
                  <>
                    <circle cx={node.x} cy={node.y} r={node.r + 9} fill="none" stroke="rgba(222,219,200,0.12)" strokeWidth="1" style={{ animation: "pulse-ring 1.2s ease-out infinite" }} />
                    <circle cx={node.x} cy={node.y} r={node.r + 16} fill="none" stroke="rgba(222,219,200,0.05)" strokeWidth="1" style={{ animation: "pulse-ring 1.2s ease-out 0.4s infinite" }} />
                  </>
                )}
                <circle cx={node.x} cy={node.y} r={node.r + 4} fill="none"
                  stroke={isHovered ? "rgba(222,219,200,0.18)" : "rgba(222,219,200,0.05)"}
                  strokeWidth="1" style={{ transition: "stroke 0.3s" }} />
                <circle cx={node.x} cy={node.y} r={node.r}
                  fill={isHovered ? "rgba(222,219,200,0.16)" : isCore ? "rgba(222,219,200,0.06)" : "rgba(222,219,200,0.03)"}
                  stroke={isHovered ? "#DEDBC8" : isCore ? "rgba(222,219,200,0.3)" : "rgba(222,219,200,0.15)"}
                  strokeWidth={isHovered ? 1.5 : 1}
                  style={{ transition: "all 0.3s ease" }} />
                <circle cx={node.x} cy={node.y} r={isCore ? 3.5 : 2}
                  fill={isHovered ? "#fff" : "#DEDBC8"}
                  opacity={isHovered ? 1 : 0.55}
                  style={{ transition: "all 0.2s" }} />
                <text x={node.x} y={node.y + node.r + 14}
                  textAnchor="middle" fill={isHovered ? "#DEDBC8" : "rgba(222,219,200,0.35)"}
                  fontSize="8.5" fontFamily="Almarai, sans-serif" fontWeight={isHovered ? "700" : "300"} letterSpacing="0.04em"
                  style={{ transition: "fill 0.2s", userSelect: "none" }}>
                  {node.label}
                </text>
                {isHovered && (
                  <text x={node.x} y={node.y + node.r + 24}
                    textAnchor="middle" fill="rgba(222,219,200,0.4)"
                    fontSize="7.5" fontFamily="Almarai, sans-serif" fontWeight="300" letterSpacing="0.04em"
                    style={{ userSelect: "none" }}>
                    {node.sublabel}
                  </text>
                )}
              </g>
            );
          })}

          {/* Role lanes — subtle background labels */}
          {[["Faculty", 60, 18], ["Student", 60, 265], ["HOD", 470, 18]].map(([label, x, y]) => (
            <text key={label as string} x={x as number} y={y as number}
              textAnchor="middle" fill="rgba(222,219,200,0.12)"
              fontSize="8" fontFamily="Almarai, sans-serif" fontWeight="300" letterSpacing="0.14em"
              textDecoration="none" style={{ textTransform: "uppercase", userSelect: "none" }}>
              {(label as string).toUpperCase()}
            </text>
          ))}
        </svg>

        {/* Tooltip */}
        <AnimatePresence>
          {hoveredNode && (() => {
            const node = getNode(hoveredNode);
            if (!node) return null;
            return (
              <motion.div className="agent-tooltip"
                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.97 }}
                transition={{ duration: 0.18 }}
                style={{ left: Math.min(Math.max(node.x - 70, 0), W - 160), top: node.y - node.r - 72 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#DEDBC8", marginBottom: 4 }}>{node.label}</div>
                <div style={{ fontSize: 11, color: "rgba(225,224,204,0.5)", lineHeight: 1.6, fontWeight: 300 }}>{node.role}</div>
              </motion.div>
            );
          })()}
        </AnimatePresence>

        {/* Legend */}
        <div style={{ position: "absolute", bottom: -8, right: 0, display: "flex", gap: 16 }}>
          {[["Node", "rgba(222,219,200,0.35)"], ["Flow", "rgba(222,219,200,0.5)"]].map(([l, c]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />
              <span style={{ fontSize: 10, color: "rgba(222,219,200,0.3)", letterSpacing: "0.08em" }}>{l}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── SECTION 3: PROJECTS (IMPROVED) ──────────────────────────────────────────
interface ProjectDetail {
  num: string;
  title: string;
  subtitle: string;
  desc: string;
  problem?: string;           // why it was built / what pain it solves
  challenges?: string[];      // only included where source content exists
  future?: string[];          // only included where source content exists
  tags: string[];
  github: string;
  live: string;
}

// Small reusable "deep dive" toggle used on the grid cards.
function ProjectDeepDive({ challenges, future }: { challenges?: string[]; future?: string[] }) {
  const [open, setOpen] = useState(false);
  if (!challenges && !future) return null;

  return (
    <div style={{ marginTop: 4 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          background: "transparent", border: "none", cursor: "pointer",
          padding: 0, fontFamily: "'Almarai', sans-serif",
          fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
          color: "rgba(222,219,200,0.4)", fontWeight: 300, transition: "color 0.2s",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#DEDBC8"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(222,219,200,0.4)"; }}
      >
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} style={{ display: "flex" }}>
          <ChevronDown size={12} />
        </motion.span>
        {open ? "Hide engineering notes" : "Challenges & what's next"}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
              {challenges && (
                <div>
                  <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(222,219,200,0.3)", marginBottom: 6, fontWeight: 300 }}>
                    Challenges
                  </div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
                    {challenges.map((c, i) => (
                      <li key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <div style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(222,219,200,0.35)", marginTop: 7, flexShrink: 0 }} />
                        <span style={{ fontSize: 12, color: "rgba(225,224,204,0.5)", lineHeight: 1.6, fontWeight: 300 }}>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {future && (
                <div>
                  <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(222,219,200,0.3)", marginBottom: 6, fontWeight: 300 }}>
                    Next Up
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {future.map((f, i) => (
                      <span key={i} className="tag" style={{ fontSize: 10.5 }}>{f}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Projects() {
  const others: ProjectDetail[] = [
    {
      num: "03", title: "DocuChat", subtitle: "Offline RAG Knowledge Assistant",
      desc: "Local-first RAG pipeline to chat with your PDFs — hybrid vector + keyword search (BM25), page-level source attribution, and streaming answers via Ollama. No API keys, fully offline.",
      problem: "Most AI document assistants require internet access and send confidential files to third-party APIs — a privacy and cost problem. DocuChat runs the entire retrieval + generation pipeline locally.",
      challenges: [
        "Balancing retrieval precision between BM25 (lexical) and vector (semantic) search.",
        "Managing memory footprint during local LLM inference.",
        "Designing chunking strategies that preserve retrieval quality.",
      ],
      future: ["Multi-document conversations", "Image OCR", "Knowledge graph integration", "Multi-user workspace", "GPU optimization"],
      tags: ["Python · Flask", "Ollama", "BM25 + Vector DB", "RAG", "Offline-first"],
      github: "https://github.com/deva-harsha-v/DocuChat",
      live: "https://github.com/deva-harsha-v/DocuChat",
    },
    {
      num: "04", title: "Smart Canteen", subtitle: "Full-Stack Ordering Platform",
      desc: "Developed a full-stack food ordering system with real-time order tracking and role-based authentication.",
      problem: "College canteens rely on manual ordering, which leads to long queues, delayed service, and poor order management. Smart Canteen digitizes the workflow end to end.",
      future: ["Online payments", "Push notifications", "Vendor analytics dashboard", "Recommendation engine", "Inventory prediction"],
      tags: ["End-to-end flow", "Supabase auth", "CI/CD · Vercel"],
      github: "https://github.com/deva-harsha-v/smart-canteen",
      live: "https://smart-canteen-sigma.vercel.app/",
    },
    {
      num: "05", title: "Auth System", subtitle: "MFA & Google OAuth",
      desc: "A Next.js 15+ authentication platform featuring Multi-Method Login (Google SSO & Local OTP), MFA, and Open-Source IAS integration with middleware-based route protection.",
      problem: "Most auth systems only support a single login method, which doesn't hold up for enterprise apps that need multiple authentication strategies. This platform is built as a modular, multi-provider system.",
      future: ["Passkey authentication (WebAuthn)", "SAML support", "OAuth provider expansion", "Device management", "Audit logging", "Single Logout (SLO)"],
      tags: ["OTP + MFA flows", "NextAuth.js", "Google OAuth", "JWT"],
      github: "https://github.com/deva-harsha-v/authentication-system",
      live: "https://authentication-system-xhaw.vercel.app/",
    },
    {
      num: "06",
      title: "Design Stamp",
      subtitle: "Desktop Logo Generator",
      desc: "A Python desktop application for generating customizable stamp-style logos with real-time preview, allowing users to create personalized logos through an intuitive graphical interface without external design software.",
      problem: "Creating simple logos often requires professional design software or online tools that can be difficult for beginners. Design Stamp provides a lightweight desktop solution for generating customizable logos quickly and efficiently.",
      future: [
        "SVG export support",
        "Gradient & advanced styling",
        "Template library",
        "Custom font uploads",
        "Batch logo generation",
        "Dark mode interface"
      ],
      tags: [
        "Python",
        "Tkinter",
        "Pillow (PIL)",
        "Real-time Preview"
      ],
      github: "https://github.com/deva-harsha-v/design-stamp-logo-generator",
      live: "https://design-stamp-logo-generator.onrender.com/",
    },
    {
      num: "07",
      title: "EduPredict",
      subtitle: "Student Performance Intelligence System",
      desc: "A full-stack academic analytics platform that predicts student performance using SGPA, CGPA, attendance, and engagement metrics while providing role-based dashboards for students, faculty, and administrators.",
      problem: "Educational institutions often identify struggling students only after semester results are published. EduPredict analyzes multiple academic indicators to provide early performance insights, enabling proactive academic intervention.",
      future: [
        "Machine Learning prediction models",
        "Explainable AI recommendations",
        "Faculty intervention dashboard",
        "Student performance alerts",
        "Real-time academic analytics",
        "Data visualization reports"
      ],
      tags: [
        "Python + Flask",
        "REST APIs",
        "Predictive Analytics",
        "Role-Based Dashboards"
      ],
      github: "https://github.com/deva-harsha-v/edu-predict",
      live: "https://edu-predict-alpha.vercel.app/",
    },
    {
      num: "08",
      title: "Bolisetti Blue Waves",
      subtitle: "Full-Stack Pool Management Platform",
      desc: "A modern pool management platform that streamlines online bookings, membership management, and administrative operations with dynamic slot availability and a responsive management dashboard.",
      problem: "Traditional swimming pool management relies on manual booking processes, leading to scheduling conflicts, inefficient capacity utilization, and increased administrative workload. This platform digitizes the complete booking workflow through a centralized management system.",
      future: [
        "Online payment integration",
        "QR-based pool entry",
        "Membership renewals",
        "Automated notifications",
        "Analytics dashboard",
        "Mobile application"
      ],
      tags: [
        "Next.js + React",
        "MongoDB",
        "Booking System",
        "Admin Dashboard"
      ],
      github: "https://github.com/deva-harsha-v/bolisetti-blue-waves",
      live: "https://bolisetti-blue-waves.vercel.app",
    },
    {
      num: "09",
      title: "Curriculum Management System",
      subtitle: "Role-Based Academic Platform",
      desc: "A role-based Curriculum Management System built with Django for managing academic curricula, course outcomes (COs), program outcomes (POs), graduate attributes, departments, and version-controlled curriculum workflows.",
      problem: "Academic institutions often struggle to maintain, version, and align curricula with outcome-based education standards across departments. This system centralizes curriculum design, tracking, and compliance in one role-based platform.",
      future: [
        "Automated CO-PO mapping analytics",
        "Bulk curriculum import/export",
        "Multi-institution support",
        "Accreditation report generation",
        "Notification system for curriculum revisions",
        "REST API for external integrations"
      ],
      tags: [
        "Django",
        "Python",
        "Role-Based Access",
        "PDF Generation"
      ],
      github: "https://github.com/deva-harsha-v/curriculum-management-system",
      live: "",
    },
    {
      num: "10",
      title: "Library Management System",
      subtitle: "Full-Stack Book & Member Platform",
      desc: "A production-ready full-stack Library Management System built with React.js, Spring Boot, PostgreSQL, and JWT Authentication featuring secure role-based access, book/member management, issue-return workflows, overdue tracking, and RESTful API integration.",
      problem: "Traditional library systems often lack modern web interfaces and secure role-based workflows for managing books, members, and lending cycles efficiently. This system provides a scalable, secure, full-stack solution for real-world library operations.",
      future: [
        "Barcode/QR scanning for books",
        "Fine payment gateway integration",
        "Email/SMS overdue reminders",
        "Advanced search & recommendation engine",
        "Mobile app companion",
        "Analytics dashboard for library usage"
      ],
      tags: [
        "React",
        "TypeScript",
        "Spring Boot",
        "PostgreSQL",
        "JWT",
        "Tailwind CSS"
      ],
      github: "https://github.com/deva-harsha-v/library-management-system",
      live: "https://library-management-system-blush-one.vercel.app",
    },
    {
      num: "11",
      title: "DigiHealth ID",
      subtitle: "Digital Health Card & Member Profile System",
      desc: "A Digital Health Card & Member Profile Management System — a vanilla JS multi-page app for enrolling members, tracking vaccinations, and generating printable digital health ID cards.",
      problem: "Manual health record and vaccination tracking is error-prone and hard to access on demand. DigiHealth ID digitizes member enrollment, health tracking, and ID generation into one lightweight, dependency-free web app.",
      future: [
        "Backend database integration (replace localStorage)",
        "QR code verification for health cards",
        "Multi-admin role support",
        "Vaccination reminder notifications",
        "Data export/reporting enhancements",
        "Cloud sync across devices"
      ],
      tags: [
        "JavaScript",
        "HTML/CSS",
        "LocalStorage",
        "Vanilla JS"
      ],
      github: "https://github.com/deva-harsha-v/health-card-system",
      live: "https://digihealthid.netlify.app",
    },
  ];

  return (
    <section id="projects" style={{ padding: "12vh 5vw", position: "relative", background: "linear-gradient(180deg, #0A0A0A 0%, #0F0F12 100%)" }}>
      <div className="noise-overlay" />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <FadeSection><SectionLabel text="Selected Work" /></FadeSection>
        <FadeSection delay={1}><h2 style={{ fontSize: "clamp(28px, 4.5vw, 56px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 8 }}>Systems I've built.</h2></FadeSection>
        <FadeSection delay={2}><p style={{ fontSize: "clamp(13px, 1.3vw, 16px)", color: "rgba(225,224,204,0.4)", marginBottom: 60, fontWeight: 300, maxWidth: 420, lineHeight: 1.7 }}>Focused on solving real problems, not just demos.</p></FadeSection>

        {/* Featured cards wrapper — stacked with 32px gap */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32, marginBottom: 32 }}>

          {/* LabScan — featured #1 */}
          <FadeSection delay={2}>
            <TiltCard intensity={4} style={{ borderRadius: 16 }}>
              <div className="autoresearch-grid featured-card-inner" style={{
                background: "#141414", borderRadius: 16,
                padding: "40px 40px 48px",
                border: "1px solid rgba(222,219,200,0.15)",
                display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 56, alignItems: "start"
              }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "rgba(222,219,200,0.3)", fontWeight: 300, letterSpacing: "0.1em" }}>01</span>
                    <div style={{ display: "flex", gap: 12 }}>
                      <a href="https://github.com/deva-harsha-v/lab-scan" target="_blank" rel="noopener noreferrer"
                        style={{ color: "rgba(222,219,200,0.35)", textDecoration: "none", fontSize: 11, fontWeight: 300, letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 4, transition: "color 0.2s" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "#DEDBC8"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(222,219,200,0.35)"; }}>
                        <GithubIcon size={12} /> GitHub
                      </a>
                      <a href="https://lab-scan.vercel.app" target="_blank" rel="noopener noreferrer"
                        style={{ color: "rgba(222,219,200,0.35)", textDecoration: "none", fontSize: 11, fontWeight: 300, letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 4, transition: "color 0.2s" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "#DEDBC8"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(222,219,200,0.35)"; }}>
                        <ExternalLink size={12} /> Live
                      </a>
                    </div>
                  </div>
                  <div>
                    <h3 style={{ fontSize: "clamp(22px, 2.8vw, 36px)", fontWeight: 800, color: "#E1E0CC", marginBottom: 6, lineHeight: 1.15 }}>LabScan</h3>
                    <p style={{ fontSize: 12, color: "rgba(222,219,200,0.4)", fontWeight: 300, letterSpacing: "0.02em" }}>Laboratory Experiment Management Platform</p>
                  </div>
                  <p style={{ fontSize: 13, color: "rgba(225,224,204,0.5)", lineHeight: 1.8, fontWeight: 300 }}>
                    Full-stack lab management platform for colleges — faculty create ArUco-linked experiments and sessions, students scan physical markers to access staged content (theory → video → submit), and HODs track marks across sections.
                  </p>

                  {/* Problem statement */}
                  <div style={{ padding: "14px 16px", background: "rgba(222,219,200,0.03)", borderLeft: "2px solid rgba(222,219,200,0.25)", borderRadius: "0 6px 6px 0" }}>
                    <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(222,219,200,0.35)", marginBottom: 6, fontWeight: 300 }}>Problem</div>
                    <p style={{ fontSize: 12.5, color: "rgba(225,224,204,0.55)", lineHeight: 1.7, fontWeight: 300 }}>
                      Traditional lab sessions run on printed manuals and physical record books — students lose access to material outside the lab, and faculty spend hours on manual submissions and attendance.
                    </p>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {["ArUco markers", "Role-based auth", "Socket.IO", "Cloudinary", "Prisma + PostgreSQL", "Live deployed"].map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>

                  <ProjectDeepDive
                    challenges={[
                      "Synchronizing physical ArUco markers with dynamic experiment data.",
                      "Designing DB relationships across faculty, labs, experiments, and submissions.",
                      "Maintaining a scalable authorization system across multiple academic roles.",
                    ]}
                    future={["QR fallback", "Attendance tracking", "Analytics dashboard", "AI lab assistant", "Offline sync"]}
                  />

                  <div style={{ paddingTop: 16, borderTop: "1px solid rgba(222,219,200,0.07)" }}>
                    <p style={{ fontSize: 12, color: "#DEDBC8", lineHeight: 1.65, fontFamily: "Instrument Serif, serif", fontStyle: "italic" }}>
                      Bridges physical lab infrastructure with digital workflows — scan a marker, unlock your experiment.
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(222,219,200,0.2)", fontWeight: 300, marginBottom: 6 }}>
                    System Architecture · Hover to Explore
                  </div>
                  <LabScanViz />
                </div>
              </div>
            </TiltCard>
          </FadeSection>

          {/* AutoResearch — featured #2 */}
          <FadeSection delay={2}>
            <TiltCard intensity={4} style={{ borderRadius: 16 }}>
              <div className="autoresearch-grid featured-card-inner" style={{
                background: "#141414", borderRadius: 16,
                padding: "40px 40px 48px",
                border: "1px solid rgba(222,219,200,0.15)",
                display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 56, alignItems: "start"
              }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "rgba(222,219,200,0.3)", fontWeight: 300, letterSpacing: "0.1em" }}>02</span>
                    <div style={{ display: "flex", gap: 12 }}>
                      <a href="https://github.com/deva-harsha-v/AutoResearch-MultiAgent" target="_blank" rel="noopener noreferrer"
                        style={{ color: "rgba(222,219,200,0.35)", textDecoration: "none", fontSize: 11, fontWeight: 300, letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 4, transition: "color 0.2s" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "#DEDBC8"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(222,219,200,0.35)"; }}>
                        <GithubIcon size={12} /> GitHub
                      </a>
                      <a href="https://autoresearch-multiagent.netlify.app/" target="_blank" rel="noopener noreferrer"
                        style={{ color: "rgba(222,219,200,0.35)", textDecoration: "none", fontSize: 11, fontWeight: 300, letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 4, transition: "color 0.2s" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "#DEDBC8"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(222,219,200,0.35)"; }}>
                        <ExternalLink size={12} /> Live
                      </a>
                    </div>
                  </div>
                  <div>
                    <h3 style={{ fontSize: "clamp(22px, 2.8vw, 36px)", fontWeight: 800, color: "#E1E0CC", marginBottom: 6, lineHeight: 1.15 }}>AutoResearch</h3>
                    <p style={{ fontSize: 12, color: "rgba(222,219,200,0.4)", fontWeight: 300, letterSpacing: "0.02em" }}>Multi-Agent AI Research System</p>
                  </div>
                  <p style={{ fontSize: 13, color: "rgba(225,224,204,0.5)", lineHeight: 1.8, fontWeight: 300 }}>
                    Built a multi-agent AI system that automates research workflows by handling search, summarization, and fact-checking through specialized agents — deployed as a live web application.
                  </p>

                  {/* Problem statement */}
                  <div style={{ padding: "14px 16px", background: "rgba(222,219,200,0.03)", borderLeft: "2px solid rgba(222,219,200,0.25)", borderRadius: "0 6px 6px 0" }}>
                    <div style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(222,219,200,0.35)", marginBottom: 6, fontWeight: 300 }}>Problem</div>
                    <p style={{ fontSize: 12.5, color: "rgba(225,224,204,0.55)", lineHeight: 1.7, fontWeight: 300 }}>
                      A single LLM call often produces hallucinated or poorly-referenced answers. AutoResearch splits the work across specialized agents that validate information before the final report is generated.
                    </p>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {["Multi-agent architecture", "Confidence scoring", "Gemini API", "Live deployed"].map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>

                  <ProjectDeepDive
                    challenges={[
                      "Designing an agent orchestration pipeline for autonomous task execution.",
                      "Building confidence scoring to estimate response reliability.",
                      "Keeping agent-to-agent communication modular and easy to extend.",
                    ]}
                    future={["Parallel agent execution", "Research memory", "Academic paper search", "PDF export", "Human-in-the-loop verification"]}
                  />

                  <div style={{ paddingTop: 16, borderTop: "1px solid rgba(222,219,200,0.07)" }}>
                    <p style={{ fontSize: 12, color: "#DEDBC8", lineHeight: 1.65, fontFamily: "Instrument Serif, serif", fontStyle: "italic" }}>
                      Focuses on multi-step reasoning and validation — not just AI responses.
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(222,219,200,0.2)", fontWeight: 300, marginBottom: 6 }}>
                    System Architecture · Hover to Explore
                  </div>
                  <AgentSystemViz />
                </div>
              </div>
            </TiltCard>
          </FadeSection>

        </div>{/* end featured wrapper */}

        {/* Divider before others grid */}
        <div style={{ height: 1, background: "rgba(222,219,200,0.06)", marginBottom: 32 }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {others.map((p, i) => (
            <FadeSection key={p.num} delay={i * 0.3}>
              <TiltCard intensity={10} style={{ borderRadius: 14, height: "100%" }}>
                <div style={{ background: "#141414", borderRadius: 14, padding: "28px 24px", border: "1px solid rgba(222,219,200,0.08)", height: "100%", display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "rgba(222,219,200,0.3)", fontWeight: 300, letterSpacing: "0.1em" }}>{p.num}</span>
                    <div style={{ display: "flex", gap: 10 }}>
                      <a href={p.github} target="_blank" rel="noopener noreferrer"
                        style={{ color: "rgba(222,219,200,0.3)", textDecoration: "none", fontSize: 11, fontWeight: 300, letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 4, transition: "color 0.2s" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "#DEDBC8"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(222,219,200,0.3)"; }}>
                        <GithubIcon size={12} /> GitHub
                      </a>
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer"
                          style={{ color: "rgba(222,219,200,0.3)", textDecoration: "none", fontSize: 11, fontWeight: 300, letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 4, transition: "color 0.2s" }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = "#DEDBC8"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(222,219,200,0.3)"; }}>
                          <ExternalLink size={12} /> Live
                        </a>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 800, color: "#E1E0CC", marginBottom: 4, lineHeight: 1.2 }}>{p.title}</h3>
                    <p style={{ fontSize: 12, color: "rgba(222,219,200,0.4)", fontWeight: 300 }}>{p.subtitle}</p>
                  </div>
                  <p style={{ fontSize: 13, color: "rgba(225,224,204,0.5)", lineHeight: 1.75, fontWeight: 300, flex: 1 }}>{p.desc}</p>

                  {p.problem && (
                    <div style={{ padding: "10px 12px", background: "rgba(222,219,200,0.03)", borderLeft: "2px solid rgba(222,219,200,0.2)", borderRadius: "0 5px 5px 0" }}>
                      <div style={{ fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(222,219,200,0.3)", marginBottom: 4, fontWeight: 300 }}>Problem</div>
                      <p style={{ fontSize: 11.5, color: "rgba(225,224,204,0.5)", lineHeight: 1.6, fontWeight: 300 }}>{p.problem}</p>
                    </div>
                  )}

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {p.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>

                  <ProjectDeepDive challenges={p.challenges} future={p.future} />
                </div>
              </TiltCard>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 4: EXPERIENCE ────────────────────────────────────────────────────
function Experience() {
  const roles = [
    { title: "Media & Content Lead",      org: "Microsoft Learn Student Chapter",                  bullets: ["Led content strategy and media production for the Microsoft Learn Student Chapter", "Designed visual assets, managed social channels, and drove member engagement"] },
    { title: "Content Writer",            org: "GeeksForGeeks Club",         bullets: ["Published technical articles on DSA, web development, and AI concepts", "Contributed to growing the club's knowledge base and online presence"] },
    { title: "Web Developer",             org: "Community Service Project",  bullets: ["Built and deployed a full-stack platform for community outreach", "Handled end-to-end development from design to CI/CD deployment"] },
    { title: "Cinematic Content Creator", org: "@vdh_films",                 bullets: ["Creates cinematic short-form content blending storytelling with visual aesthetics", "Applies narrative design principles to both video and tech communication"] },
  ];
  return (
    <section id="experience" style={{ padding: "12vh 5vw", background: "#0A0A0A" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <FadeSection><SectionLabel text="Experience" /></FadeSection>
        <FadeSection delay={1}><h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, marginBottom: 60, lineHeight: 1.1 }}>Roles & responsibilities.</h2></FadeSection>
        {roles.map((role, i) => (
          <FadeSection key={role.title} delay={i * 0.3}>
            <div style={{ paddingBottom: 36, borderBottom: "1px solid rgba(222,219,200,0.07)", marginBottom: 36 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                <h3 style={{ fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 700, color: "#E1E0CC" }}>{role.title}</h3>
                <span style={{ fontSize: 12, color: "#DEDBC8", fontWeight: 300, letterSpacing: "0.06em" }}>{role.org}</span>
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                {role.bullets.map((b, j) => (
                  <li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(222,219,200,0.3)", marginTop: 8, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "rgba(225,224,204,0.5)", lineHeight: 1.7, fontWeight: 300 }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeSection>
        ))}
      </div>
    </section>
  );
}

// ─── SECTION 5: INTERNSHIPS ───────────────────────────────────────────────────
interface Internship {
  role: string;
  org: string;
  duration: string;
  domain: string;
  desc: string;
  link?: string;
  status?: "completed" | "upcoming";
}

function Internships() {
  const internships: Internship[] = [
    {
      role: "Web Development Intern",
      org: "ExcelR EdTech Pvt. Ltd.",
      duration: "May – Jun 2026",
      domain: "Web Development · JavaScript",
      desc: "Completed a short-term internship on Web Development / JavaScript, organized by ExcelR EdTech in collaboration with the Andhra Pradesh State Council of Higher Education (APSCHE).",
      link: "https://drive.google.com/file/d/1_07lYj5mDAgnsdDnkLSJ7GdUVRjAH0QT/view?usp=sharing",
      status: "completed",
    },
    {
      role: "Full Stack Developer Intern",
      org: "NIT — Dept. of Electrical & Electronics Engineering",
      duration: "May - Jun 2026",
      domain: "EEE",
      desc: "Completed a Full Stack Developer Internship at NIT Andhra Pradesh, focused on developing a laboratory management platform with secure REST APIs, JWT authentication, role-based access control, and PostgreSQL.",
      link: "https://drive.google.com/file/d/1DCoq5nAOz6E8RkweE8lrmzL175xMkiGf/view?usp=sharing",
      status: "completed",
    },
    {
      role: "Backend Developer Intern",
      org: "NIT — Dept. of Computer Science & Engineering",
      duration: "May - Jul 2026",
      domain: "CSE",
      desc: "Completed a Backend Development Internship at NIT Andhra Pradesh, focused on developing a Django-based curriculum management platform with role-based authorization, relational databases, and automated PDF report generation.",
      link: "https://drive.google.com/file/d/1DCoq5nAOz6E8RkweE8lrmzL175xMkiGf/view?usp=sharing",
      status: "upcoming",
    },
  ];

  return (
    <section id="internships" style={{ padding: "12vh 5vw", background: "linear-gradient(180deg, #0A0A0A 0%, #0F0F12 100%)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeSection><SectionLabel text="Internships" /></FadeSection>
        <FadeSection delay={1}><h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, marginBottom: 12, lineHeight: 1.1 }}>Hands-on, beyond the classroom.</h2></FadeSection>
        <FadeSection delay={2}><p style={{ fontSize: "clamp(13px, 1.3vw, 16px)", color: "rgba(225,224,204,0.4)", marginBottom: 56, fontWeight: 300, maxWidth: 460, lineHeight: 1.7 }}>Structured internships across web development and core engineering departments.</p></FadeSection>

        <div style={{ position: "relative" }}>
          {internships.map((ip, i) => (
            <FadeSection key={ip.role + ip.org} delay={i * 0.3}>
              <div style={{ position: "relative", display: "flex", gap: 24, paddingBottom: i < internships.length - 1 ? 32 : 0 }}>
                {/* timeline rail */}
                {i < internships.length - 1 && (
                  <div style={{ position: "absolute", left: 11, top: 26, bottom: -6, width: 1, background: "linear-gradient(to bottom, rgba(222,219,200,0.25), rgba(222,219,200,0.06))" }} />
                )}
                <div style={{
                  width: 24, height: 24, borderRadius: "50%", flexShrink: 0, marginTop: 2,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: ip.status === "upcoming" ? "transparent" : "rgba(222,219,200,0.1)",
                  border: ip.status === "upcoming" ? "1px dashed rgba(222,219,200,0.3)" : "1px solid rgba(222,219,200,0.3)",
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: ip.status === "upcoming" ? "rgba(222,219,200,0.3)" : "#DEDBC8" }} />
                </div>

                <TiltCard intensity={6} style={{ borderRadius: 14, flex: 1 }}>
                  <div
                    onClick={() => ip.link && window.open(ip.link, "_blank")}
                    style={{
                      background: "#141414", borderRadius: 14, padding: "24px 26px",
                      border: "1px solid rgba(222,219,200,0.08)",
                      cursor: ip.link ? "pointer" : "default",
                      transition: "border-color 0.2s",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => { if (ip.link) e.currentTarget.style.borderColor = "rgba(222,219,200,0.22)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(222,219,200,0.08)"; }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                      <div>
                        <h3 style={{ fontSize: "clamp(16px, 1.8vw, 19px)", fontWeight: 700, color: "#E1E0CC", marginBottom: 4 }}>{ip.role}</h3>
                        <p style={{ fontSize: 13, color: "#DEDBC8", fontWeight: 300, letterSpacing: "0.02em" }}>{ip.org}</p>
                      </div>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(222,219,200,0.4)", fontWeight: 300, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                        {ip.duration}
                        {ip.link && <ExternalLink size={11} color="#DEDBC8" style={{ opacity: 0.5, flexShrink: 0 }} />}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: "rgba(225,224,204,0.5)", lineHeight: 1.7, fontWeight: 300, marginBottom: 14 }}>{ip.desc}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <span className="tag">{ip.domain}</span>
                      {ip.status === "upcoming" && (
                        <span style={{ fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(222,219,200,0.35)", fontWeight: 300, border: "1px dashed rgba(222,219,200,0.2)", borderRadius: 100, padding: "4px 10px" }}>
                          Certificate pending
                        </span>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 6: CERTIFICATIONS ────────────────────────────────────────────────
function Certifications() {
  const certs = [
    { title: "ServiceNow Certified System Administrator (CSA)", issuer: "ServiceNow", context: "IT service management, platform administration, and workflow automation on ServiceNow", link: "https://drive.google.com/file/d/1WEHhVVenCXpiAC6xEzwTE1VuBln_AqBx/view?usp=drive_link" },
    { title: "Anthropic Claude Code 101", issuer: "Anthropic", context: "Agentic AI coding workflows using Claude — prompting, tool use, and AI-assisted development", link: "https://drive.google.com/file/d/1fUGmqXgAOABaZFxMyiPweJoUW5MKC-TK/view?usp=drive_link" },
    { title: "Oracle Cloud Infrastructure 2025 — Generative AI Professional", issuer: "Oracle",                       context: "Generative AI concepts on OCI, including LLM deployment and prompt engineering",         link: "https://drive.google.com/file/d/1qia5AoUM-pv4qo5EA0dQSA6vbplE2tFX/view?usp=drive_link" },
    { title: "Oracle Cloud Infrastructure 2025 — Data Science Professional",  issuer: "Oracle",                       context: "End-to-end ML workflows, model training and deployment on Oracle Cloud",                  link: "https://drive.google.com/file/d/16ZGyz2jxNro18AMPcClBQ22DvL-zEibz/view?usp=drive_link" },
    { title: "Salesforce Certified Agentforce Specialist",                     issuer: "Salesforce",                   context: "Building and deploying AI agents using the Salesforce Agentforce platform",               link: "https://drive.google.com/file/d/17B8oytLYP3DTz8k4NRjKkasY3MyyqBGK/view?usp=drive_link" },
    { title: "NPTEL Elite — Entrepreneurship (71%)",                           issuer: "IIT Madras · Jul–Oct 2025",    context: "Business models, startup strategy and entrepreneurial thinking",                         link: "https://drive.google.com/file/d/1OskXqM7rZCD0cNIrMtn7V0LkzkkHzXS0/view?usp=drive_link" },
    { title: "NPTEL Elite — Introduction to Internet of Things (67%)",         issuer: "IIT Kharagpur · Jan–Apr 2025", context: "IoT architecture, sensors, embedded systems and communication protocols",                link: "https://drive.google.com/file/d/1_iVlgNEslW16wP4gYH5yLlVrXYXSKrKI/view?usp=drive_link" },
  ];
  return (
    <section style={{ padding: "10vh 5vw", background: "#0A0A0A" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeSection><SectionLabel text="Credentials" /></FadeSection>
        <FadeSection delay={1}><h2 style={{ fontSize: "clamp(24px, 3.5vw, 44px)", fontWeight: 800, marginBottom: 48 }}>Certifications.</h2></FadeSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
          {certs.map((c, i) => (
            <FadeSection key={c.title} delay={i * 0.3}>
              <TiltCard intensity={8} style={{ borderRadius: 12, height: "100%" }}>
                <div
                  onClick={() => c.link && window.open(c.link, "_blank")}
                  style={{
                    background: "#141414", borderRadius: 12, padding: "22px 20px",
                    border: "1px solid rgba(222,219,200,0.06)", height: "100%",
                    cursor: c.link ? "pointer" : "default",
                    transition: "border-color 0.2s",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => { if (c.link) e.currentTarget.style.borderColor = "rgba(222,219,200,0.2)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(222,219,200,0.06)"; }}
                >
                  {c.link && (
                    <div style={{ position: "absolute", top: 14, right: 14, opacity: 0.3 }}>
                      <ExternalLink size={11} color="#DEDBC8" />
                    </div>
                  )}
                  <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#DEDBC8", marginBottom: 10, fontWeight: 300 }}>{c.issuer}</div>
                  <div style={{ fontSize: "clamp(13px, 1.2vw, 15px)", fontWeight: 700, color: "#E1E0CC", lineHeight: 1.3, marginBottom: 8 }}>{c.title}</div>
                  <div style={{ fontSize: 12, color: "rgba(225,224,204,0.35)", lineHeight: 1.6, fontWeight: 300 }}>{c.context}</div>
                </div>
              </TiltCard>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 7: BEYOND THE CODE ───────────────────────────────────────────────
function BeyondTheCode() {
  return (
    <section style={{ padding: "12vh 5vw", background: "#0F0F12" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeSection><SectionLabel text="Beyond the Code" /></FadeSection>
        <FadeSection delay={1}><h2 style={{ fontSize: "clamp(24px, 3.5vw, 44px)", fontWeight: 800, marginBottom: 48 }}>The other side.</h2></FadeSection>
        <div className="beyond-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 14 }}>
          <FadeSection delay={1}>
            <TiltCard intensity={5} style={{ borderRadius: 16 }}>
              <div
                onClick={() => window.open("https://www.inkitt.com/devaharsha", "_blank")}
                style={{
                  background: "#101010", borderRadius: 16, padding: "40px 36px",
                  border: "1px solid rgba(222,219,200,0.1)", position: "relative",
                  overflow: "hidden", cursor: "pointer",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(222,219,200,0.25)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(222,219,200,0.1)"; }}
              >
                <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(222,219,200,0.04), transparent 70%)" }} />
                <div style={{ position: "absolute", top: 20, right: 20, opacity: 0.35 }}>
                  <ExternalLink size={13} color="#DEDBC8" />
                </div>
                <div className="tag" style={{ marginBottom: 20 }}>Featured</div>
                <h3 style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>Novel Writer</h3>
                <p className="serif-italic" style={{ fontSize: "clamp(16px, 1.8vw, 22px)", color: "#DEDBC8", marginBottom: 16, lineHeight: 1.4 }}>Published on Inkitt</p>
                <p style={{ fontSize: 14, color: "rgba(225,224,204,0.5)", lineHeight: 1.7, fontWeight: 300 }}>
                  Long-form storytelling and narrative design — skills that directly inform how I design user experiences and communicate technical systems.
                </p>
              </div>
            </TiltCard>
          </FadeSection>
          <FadeSection delay={2}>
            <TiltCard intensity={10} style={{ borderRadius: 16 }}>
              <div style={{ background: "#212121", borderRadius: 16, padding: "28px 24px", border: "1px solid rgba(222,219,200,0.06)" }}>
                <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, color: "#E1E0CC" }}>Cinematic Creator</h3>
                <p style={{ fontSize: 12, color: "#DEDBC8", marginBottom: 12, fontWeight: 300 }}>@vdh_films</p>
                <p style={{ fontSize: 13, color: "rgba(225,224,204,0.45)", lineHeight: 1.7, fontWeight: 300 }}>Short-form cinematic content blending visual storytelling with creative direction.</p>
              </div>
            </TiltCard>
          </FadeSection>
          <FadeSection delay={3}>
            <TiltCard intensity={10} style={{ borderRadius: 16 }}>
              <div style={{ background: "#212121", borderRadius: 16, padding: "28px 24px", border: "1px solid rgba(222,219,200,0.06)" }}>
                <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, color: "#E1E0CC" }}>Narrative in Tech</h3>
                <p style={{ fontSize: 12, color: "#DEDBC8", marginBottom: 12, fontWeight: 300 }}>Applied storytelling</p>
                <p style={{ fontSize: 13, color: "rgba(225,224,204,0.45)", lineHeight: 1.7, fontWeight: 300 }}>Applying narrative thinking to UX design and technical communication.</p>
              </div>
            </TiltCard>
          </FadeSection>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION 7: CONTACT ───────────────────────────────────────────────────────
function Contact() {
  const socials = [
    { icon: <GithubIcon size={16} />,    label: "GitHub",    href: "https://github.com/deva-harsha-v" },
    { icon: <LinkedInIcon size={16} />,  label: "LinkedIn",  href: "https://www.linkedin.com/in/devaharshaveerla" },
    { icon: <InstagramIcon size={16} />, label: "@vdh_films", href: "https://www.instagram.com/vdh_films" },
  ];
  return (
    <section id="contact" style={{ padding: "14vh 5vw 10vh", position: "relative", textAlign: "center", background: "#0A0A0A" }}>
      <div className="noise-overlay" style={{ opacity: 0.2 }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(222,219,200,0.04) 0%, transparent 70%)" }} />
      <div style={{ maxWidth: 680, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <FadeSection><SectionLabel text="Contact" /></FadeSection>
        <FadeSection delay={1}>
          <h2 style={{ fontSize: "clamp(40px, 8vw, 100px)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.03em", marginBottom: 24 }}>
            Let's build<br /><span className="serif-italic" style={{ color: "#DEDBC8" }}>something.</span>
          </h2>
        </FadeSection>
        <FadeSection delay={2}>
          <p style={{ fontSize: "clamp(13px, 1.3vw, 16px)", color: "rgba(225,224,204,0.45)", lineHeight: 1.8, marginBottom: 48, fontWeight: 300 }}>
            Developer focused on building intelligent systems and communicating them clearly — combining technical execution with structured thinking and storytelling.
          </p>
        </FadeSection>
        <FadeSection delay={3}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", marginBottom: 48 }}>
            <a href="mailto:devaharshaveerla@gmail.com"
              style={{ display: "flex", alignItems: "center", gap: 10, color: "#E1E0CC", textDecoration: "none", fontSize: 15, fontWeight: 300, padding: "12px 24px", borderRadius: 8, border: "1px solid rgba(222,219,200,0.1)", background: "rgba(222,219,200,0.03)", transition: "all 0.2s", width: "fit-content" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(222,219,200,0.3)"; e.currentTarget.style.background = "rgba(222,219,200,0.06)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(222,219,200,0.1)"; e.currentTarget.style.background = "rgba(222,219,200,0.03)"; }}>
              <Mail size={15} color="#DEDBC8" /> devaharshaveerla@gmail.com
            </a>
            <a href="tel:+918333043234"
              style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(225,224,204,0.5)", textDecoration: "none", fontSize: 14, fontWeight: 300, padding: "10px 24px", borderRadius: 8, border: "1px solid rgba(222,219,200,0.06)", transition: "all 0.2s", width: "fit-content" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#E1E0CC"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(225,224,204,0.5)"; }}>
              <Phone size={14} /> +91 83330 43234
            </a>
          </div>
        </FadeSection>
        <FadeSection delay={4}>
          <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(225,224,204,0.3)", textDecoration: "none", fontSize: 12, fontWeight: 300, letterSpacing: "0.06em", transition: "color 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#DEDBC8"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(225,224,204,0.3)"; }}>
                {s.icon} {s.label}
              </a>
            ))}
          </div>
        </FadeSection>
      </div>
      <div style={{ marginTop: "12vh", paddingTop: 24, borderTop: "1px solid rgba(222,219,200,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontSize: 12, color: "rgba(225,224,204,0.2)", fontWeight: 300 }}>Veerla Deva Harsha · 2025</span>
        <span style={{ fontSize: 12, color: "rgba(225,224,204,0.2)", fontWeight: 300, fontFamily: "Instrument Serif, serif", fontStyle: "italic" }}>Built with clarity and intent.</span>
      </div>
    </section>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <Skills />
      <HowIBuild />
      <Projects />
      <Experience />
      <Internships />
      <Certifications />
      <BeyondTheCode />
      <Contact />
    </div>
  );
}