"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Sol, Helmet, Firma } from "./Art";
import { timeline, stats, season2026, helmets, offTrack } from "../data";

gsap.registerPlugin(ScrollTrigger);

const MENU = [
  { id: "inicio", label: "Inicio" },
  { id: "historia", label: "Historia" },
  { id: "en-pista", label: "En pista" },
  { id: "cascos", label: "Cascos" },
  { id: "fuera-de-pista", label: "Fuera de pista" },
];

const MANIFIESTO =
  "Un pibe de Pilar que se fue solo a Europa con catorce años, una familia que lo apostó todo y un país entero que se levanta a las tres de la mañana para verlo correr. Esto no es solo automovilismo, es la Argentina arriba de un Fórmula 1.";

function SplitChars({ text, className = "" }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((c, i) => (
        <span key={i} className="char" aria-hidden="true">
          {c === " " ? " " : c}
        </span>
      ))}
    </span>
  );
}

function Marquee({ items, reverse = false, className = "" }) {
  const row = [...items, ...items];
  return (
    <div className={`marquee ${reverse ? "marquee--rev" : ""} ${className}`}>
      <div className="marquee__track">
        {row.map((t, i) => (
          <span key={i} className="marquee__item">
            {t}
            <Sol className="marquee__sol" rays={16} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Site() {
  const root = useRef(null);
  const lenisRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Scroll suave (Lenis) sincronizado con ScrollTrigger.
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    menuOpen || !loaded ? lenis.stop() : lenis.start();
  }, [menuOpen, loaded]);

  // Preloader, intro del hero y todas las animaciones de scroll.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const intro = gsap.timeline({ onComplete: () => setLoaded(true) });
      intro
        .to(counter, {
          v: 43,
          duration: reduce ? 0.2 : 2,
          ease: "power2.inOut",
          onUpdate: () => {
            const el = document.querySelector(".loader__count");
            if (el) el.textContent = String(Math.round(counter.v)).padStart(2, "0");
          },
        })
        .to(".loader__bar span", { scaleX: 1, duration: reduce ? 0.2 : 2, ease: "power2.inOut" }, 0)
        .to(".loader__sol", { rotate: 180, duration: 2, ease: "power2.inOut" }, 0)
        .to(".loader", { yPercent: -100, duration: 1, ease: "expo.inOut" }, "+=0.15")
        .from(".hero .char", { yPercent: 110, rotate: 6, duration: 1.1, stagger: 0.035, ease: "expo.out" }, "-=0.45")
        .from(".hero__sol", { scale: 0.4, opacity: 0, duration: 1.4, ease: "expo.out" }, "<")
        .from(".hero__meta > *", { y: 30, opacity: 0, stagger: 0.08, duration: 0.8, ease: "power3.out" }, "-=0.9")
        .from(".firma-path", { strokeDashoffset: 1200, duration: 2, ease: "power2.inOut" }, "-=0.8")
        .from(".nav", { y: -80, duration: 0.8, ease: "power3.out" }, "<");

      if (reduce) return;

      gsap.to(".hero__sol", { rotate: 360, duration: 60, repeat: -1, ease: "none" });

      // Parallax del hero al scrollear.
      gsap.to(".hero__title", {
        yPercent: 40,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero__num", {
        yPercent: -30,
        scale: 1.2,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });

      // Manifiesto: las palabras se van encendiendo con el scroll.
      gsap.fromTo(
        ".manifiesto .word",
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: ".manifiesto", start: "top 75%", end: "bottom 45%", scrub: true },
        }
      );

      // Historia: scroll horizontal fijado.
      const track = document.querySelector(".historia__track");
      if (track) {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: ".historia",
            start: "top top",
            end: () => "+=" + (track.scrollWidth - window.innerWidth),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.to(".historia__progress span", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".historia",
            start: "top top",
            end: () => "+=" + (track.scrollWidth - window.innerWidth),
            scrub: true,
          },
        });
      }

      // Reveals genéricos.
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".title-split").forEach((el) => {
        gsap.from(el.querySelectorAll(".char"), {
          yPercent: 110,
          duration: 1,
          stagger: 0.025,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Contadores.
      gsap.utils.toArray(".stat__value").forEach((el) => {
        const target = Number(el.dataset.value);
        const prefix = el.dataset.prefix || "";
        const obj = { v: el.dataset.plain ? target - 21 : 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => (el.textContent = prefix + Math.round(obj.v)),
        });
      });

      // Barras de la temporada.
      gsap.from(".race__bar span", {
        scaleX: 0,
        duration: 1.2,
        stagger: 0.05,
        ease: "expo.out",
        scrollTrigger: { trigger: ".races", start: "top 75%" },
      });

      // Cascos entrando escalonados.
      gsap.from(".helmet", {
        y: 120,
        rotate: (i) => (i % 2 ? 8 : -8),
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: ".cascos__grid", start: "top 80%" },
      });

      // Cambio de color de fondo por sección.
      gsap.utils.toArray("[data-theme]").forEach((sec) => {
        ScrollTrigger.create({
          trigger: sec,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (self) => self.isActive && document.body.setAttribute("data-bg", sec.dataset.theme),
        });
      });

      // Footer que aparece por debajo.
      gsap.from(".footer__big .char", {
        yPercent: 100,
        stagger: 0.03,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".footer", start: "top 70%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  // Cursor custom y botones magnéticos.
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const cursor = document.querySelector(".cursor");
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
    const heroSol = document.querySelector(".hero__sol-wrap");
    const move = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (heroSol) {
        gsap.to(heroSol, {
          x: (e.clientX / window.innerWidth - 0.5) * 40,
          y: (e.clientY / window.innerHeight - 0.5) * 40,
          duration: 1,
          ease: "power3.out",
        });
      }
    };
    const over = (e) => {
      const t = e.target.closest("a, button, [data-cursor]");
      cursor.classList.toggle("cursor--big", !!t);
      cursor.dataset.label = t?.dataset.cursor || "";
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);

    const magnets = document.querySelectorAll("[data-magnet]");
    const handlers = [];
    magnets.forEach((m) => {
      const mm = (e) => {
        const r = m.getBoundingClientRect();
        gsap.to(m, {
          x: (e.clientX - r.left - r.width / 2) * 0.35,
          y: (e.clientY - r.top - r.height / 2) * 0.35,
          duration: 0.6,
          ease: "power3.out",
        });
      };
      const ml = () => gsap.to(m, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
      m.addEventListener("mousemove", mm);
      m.addEventListener("mouseleave", ml);
      handlers.push([m, mm, ml]);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      handlers.forEach(([m, mm, ml]) => {
        m.removeEventListener("mousemove", mm);
        m.removeEventListener("mouseleave", ml);
      });
    };
  }, []);

  // Menú a pantalla completa.
  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(".menu", { clipPath: "circle(0% at 95% 4%)" }, { clipPath: "circle(150% at 95% 4%)", duration: 0.9, ease: "expo.inOut" });
      gsap.fromTo(".menu__link", { yPercent: 120 }, { yPercent: 0, duration: 0.9, stagger: 0.06, delay: 0.3, ease: "expo.out" });
    }
  }, [menuOpen]);

  const goTo = (id) => {
    setMenuOpen(false);
    requestAnimationFrame(() => lenisRef.current?.scrollTo(`#${id}`, { duration: 1.6 }));
  };

  const helmetMove = (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(card.querySelector(".helmet__svg"), { rotateY: px * 30, rotateX: -py * 30, scale: 1.08, duration: 0.5, ease: "power3.out" });
  };
  const helmetLeave = (e) => {
    gsap.to(e.currentTarget.querySelector(".helmet__svg"), { rotateY: 0, rotateX: 0, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" });
  };

  const maxPos = 20;

  return (
    <div ref={root}>
      <div className="cursor" aria-hidden="true" />

      {/* Preloader */}
      <div className="loader" aria-hidden="true">
        <Sol className="loader__sol" />
        <div className="loader__count">00</div>
        <div className="loader__label">Calentando gomas en Pilar…</div>
        <div className="loader__bar">
          <span />
        </div>
      </div>

      {/* Nav */}
      <header className="nav">
        <button className="nav__logo" onClick={() => goTo("inicio")} aria-label="Ir al inicio">
          <Sol className="nav__sol" rays={16} />
          <span>FC43</span>
        </button>
        <div className="nav__tag">Fórmula 1 · Alpine · desde 2024</div>
        <button className="nav__burger" onClick={() => setMenuOpen((v) => !v)} data-magnet aria-expanded={menuOpen}>
          {menuOpen ? "Cerrar" : "Menú"}
        </button>
      </header>

      {menuOpen && (
        <nav className="menu">
          <ul>
            {MENU.map((m, i) => (
              <li key={m.id}>
                <button className="menu__link" onClick={() => goTo(m.id)}>
                  <span className="menu__num">0{i + 1}</span>
                  {m.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="menu__foot">
            <span>Fan site no oficial</span>
            <span>Hecho en Argentina 🇦🇷</span>
          </div>
        </nav>
      )}

      <main>
        {/* Hero */}
        <section className="hero" id="inicio" data-theme="celeste">
          <div className="hero__flag" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="hero__sol-wrap">
            <Sol className="hero__sol" />
          </div>
          <div className="hero__num" aria-hidden="true">43</div>
          <h1 className="hero__title">
            <span className="line"><SplitChars text="Franco" /></span>
            <span className="line"><SplitChars text="Colapinto" /></span>
          </h1>
          <Firma className="hero__firma" />
          <div className="hero__meta">
            <span>Piloto de Fórmula 1 · BWT Alpine · 2026</span>
            <span>Pilar, Buenos Aires · 27.05.2003</span>
            <button className="pill" data-magnet onClick={() => goTo("historia")}>
              Conocé la historia ↓
            </button>
          </div>
        </section>

        <Marquee items={["Vamos Franco", "Dale campeón", "Desde Pilar al mundo", "Número 43", "Aguante la Argentina"]} />

        {/* Manifiesto */}
        <section className="manifiesto" data-theme="crema">
          <div className="eyebrow" data-reveal>Por qué lo seguimos</div>
          <p>
            {MANIFIESTO.split(" ").map((w, i) => (
              <span key={i} className="word">
                {w}{" "}
              </span>
            ))}
          </p>
        </section>

        {/* Historia (scroll horizontal) */}
        <section className="historia" id="historia" data-theme="noche">
          <div className="historia__head">
            <h2 className="title-split"><SplitChars text="La historia" /></h2>
            <div className="historia__progress"><span /></div>
          </div>
          <div className="historia__track">
            {timeline.map((t, i) => (
              <article key={t.year} className={`hito ${i % 2 ? "hito--alt" : ""}`}>
                <div className="hito__year">{t.year}</div>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
                <Sol className="hito__sol" rays={16} />
              </article>
            ))}
            <article className="hito hito--end">
              <div className="hito__year">∞</div>
              <h3>Lo que viene</h3>
              <p>Confirmado en Alpine para 2027. La historia recién empieza.</p>
            </article>
          </div>
        </section>

        {/* En pista */}
        <section className="enpista" id="en-pista" data-theme="crema">
          <div className="section-head">
            <div className="eyebrow" data-reveal>En pista</div>
            <h2 className="title-split"><SplitChars text="Números" /></h2>
          </div>
          <div className="stats">
            {stats.map((s) => (
              <div className="stat" key={s.label} data-reveal>
                <div
                  className="stat__value"
                  data-value={s.value}
                  data-prefix={s.prefix || ""}
                  data-plain={s.plain ? "1" : undefined}
                >
                  {(s.prefix || "") + s.value}
                </div>
                <div className="stat__label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="season" data-reveal>
            <h3>Temporada 2026 <small>posición final en cada Gran Premio</small></h3>
            <ul className="races">
              {season2026.map((r) => (
                <li key={r.gp} className={`race ${r.pts ? "race--pts" : ""}`}>
                  <span className="race__gp">{r.gp}</span>
                  <span className="race__bar">
                    <span style={{ width: `${((maxPos + 1 - r.pos) / maxPos) * 100}%` }} />
                  </span>
                  <span className="race__pos">P{r.pos}</span>
                  <span className="race__pts">{r.pts ? `+${r.pts}` : "–"}</span>
                </li>
              ))}
            </ul>
            <p className="season__note">Datos a octubre de 2026. En celeste, las carreras con puntos.</p>
          </div>
        </section>

        <Marquee reverse className="marquee--dark" items={["Williams 2024", "Alpine 2025", "Bakú P8", "Canadá P6", "Monza 2024"]} />

        {/* Cascos */}
        <section className="cascos" id="cascos" data-theme="celeste">
          <div className="section-head">
            <div className="eyebrow" data-reveal>Salón de la fama</div>
            <h2 className="title-split"><SplitChars text="Cascos" /></h2>
            <p className="section-sub" data-reveal>
              Diseños inspirados en cada etapa. Pasá el mouse para girarlos.
            </p>
          </div>
          <div className="cascos__grid">
            {helmets.map((h) => (
              <div className="helmet" key={h.name} onMouseMove={helmetMove} onMouseLeave={helmetLeave} data-cursor="Girar">
                <div className="helmet__stage">
                  <Helmet className="helmet__svg" {...h} />
                </div>
                <div className="helmet__info">
                  <span>{h.name}</span>
                  <span>{h.year}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fuera de pista */}
        <section className="fuera" id="fuera-de-pista" data-theme="crema">
          <div className="section-head">
            <div className="eyebrow" data-reveal>Fuera de pista</div>
            <h2 className="title-split"><SplitChars text="El pibe" /></h2>
          </div>
          <div className="fuera__grid">
            {offTrack.map((o) => (
              <div className="dato" key={o.k} data-reveal>
                <span className="dato__k">{o.k}</span>
                <span className="dato__v">{o.v}</span>
              </div>
            ))}
          </div>
          <blockquote className="fuera__quote" data-reveal>
            “La Colapintomanía”: banderas en Monza, mate en el paddock y miles de argentinos llenando las tribunas en cada
            Gran Premio.
          </blockquote>
        </section>
      </main>

      <footer className="footer" data-theme="noche">
        <div className="footer__big" aria-label="Dale Franco">
          <SplitChars text="Dale Franco" />
        </div>
        <div className="footer__row">
          <div>
            {MENU.map((m) => (
              <button key={m.id} className="footer__link" onClick={() => goTo(m.id)}>
                {m.label}
              </button>
            ))}
          </div>
          <Sol className="footer__sol" />
          <div className="footer__legal">
            <span>Fan site no oficial. No está afiliado a Franco Colapinto, Alpine ni la Fórmula 1.</span>
            <span>© {new Date().getFullYear()} · Hecho con mate en Argentina</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
