"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { product, projects, services, site, team } from "@/lib/content";
import { useLockScroll } from "../useLockScroll";
import styles from "./desk.module.css";

type WinId = "work" | "prices" | "studio" | "mail";

type Win = { id: WinId; x: number; y: number; z: number; open: boolean; title: string };

const seed: Win[] = [
  { id: "work", title: "Work", x: 124, y: 22, z: 2, open: true },
  { id: "prices", title: "Prices", x: 680, y: 48, z: 3, open: true },
  { id: "studio", title: "Studio", x: 280, y: 110, z: 1, open: false },
  { id: "mail", title: "Book", x: 460, y: 160, z: 1, open: false },
];

export default function Desk() {
  useLockScroll();
  const [wins, setWins] = useState(seed);
  const [active, setActive] = useState(0);
  const [app, setApp] = useState<WinId | null>(null);
  const drag = useRef<{ id: WinId; dx: number; dy: number } | null>(null);
  const z = useRef(4);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }));
    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, []);

  function open(id: WinId) {
    z.current += 1;
    const next = z.current;
    setWins((list) => list.map((win) => (win.id === id ? { ...win, open: true, z: next } : win)));
    setApp(id);
  }

  function close(id: WinId) {
    setWins((list) => list.map((win) => (win.id === id ? { ...win, open: false } : win)));
  }

  function focus(id: WinId) {
    z.current += 1;
    const next = z.current;
    setWins((list) => list.map((win) => (win.id === id ? { ...win, z: next } : win)));
  }

  return (
    <div className={styles.root}>
      <header className={styles.bar}>
        <span>Vorq — websites and MVPs</span>
        <span className={styles.clock}>{clock}</span>
        <Link className={styles.book} href={site.bookPath}>
          Book a call
        </Link>
      </header>

      <div className={styles.desktop}>
        <div className={styles.icons}>
          {seed.map((win) => (
            <button key={win.id} className={styles.icon} type="button" aria-label={win.title} onClick={() => open(win.id)}>
              <span className={styles.glyph} aria-hidden="true">{win.title.slice(0, 1)}</span>
              {win.title}
            </button>
          ))}
        </div>

        <p className={styles.wallpaper}>
          Priyanshu Bhardwaj and Ravi Pratap Singh
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>

        {wins.filter((win) => win.open).map((win) => (
          <section
            key={win.id}
            className={styles.window}
            style={{ left: win.x, top: win.y, zIndex: win.z, width: win.id === "work" ? 520 : 340 }}
            onPointerDown={() => focus(win.id)}
          >
            <header
              className={styles.title}
              onPointerDown={(event) => {
                focus(win.id);
                drag.current = { id: win.id, dx: event.clientX - win.x, dy: event.clientY - win.y };
                event.currentTarget.setPointerCapture(event.pointerId);
              }}
              onPointerMove={(event) => {
                if (!drag.current || drag.current.id !== win.id) return;
                const x = event.clientX - drag.current.dx;
                const y = Math.max(8, event.clientY - drag.current.dy);
                setWins((list) => list.map((item) => (item.id === win.id ? { ...item, x, y } : item)));
              }}
              onPointerUp={() => {
                drag.current = null;
              }}
            >
              <span>{win.title}</span>
              <button type="button" aria-label={`Close ${win.title}`} onClick={() => close(win.id)}>
                Close
              </button>
            </header>
            <div className={styles.body}>
              {win.id === "work" ? (
                <div className={styles.work}>
                  <div className={styles.list}>
                    {projects.map((project, index) => (
                      <button key={project.href} type="button" data-on={active === index} onClick={() => setActive(index)}>
                        {project.title}
                      </button>
                    ))}
                    <a href={product.href} target="_blank" rel="noopener noreferrer">
                      {product.name}
                    </a>
                  </div>
                  <div>
                    <div className={styles.shot}>
                      <Image src={projects[active].image} alt={projects[active].alt} fill sizes="420px" />
                    </div>
                    <p className={styles.note}>
                      {projects[active].title} · {projects[active].kind} · {projects[active].timeline}
                    </p>
                    <p className={styles.note}>
                      <a href={projects[active].href} target="_blank" rel="noopener noreferrer">
                        Open live site
                      </a>
                    </p>
                  </div>
                </div>
              ) : null}
              {win.id === "prices" ? (
                <div>
                  {services.map((service) => (
                    <p className={styles.priceRow} key={service.id}>
                      <span>{service.name}</span>
                      <span>{service.price}</span>
                    </p>
                  ))}
                  <p className={styles.note}>Fixed scope. You own the code. Most projects go live in under a week.</p>
                </div>
              ) : null}
              {win.id === "studio" ? (
                <div className={styles.people}>
                  {team.map((member) => (
                    <article key={member.name}>
                      <Image src={member.image} alt={member.name} width={480} height={600} />
                      <h3>{member.name}</h3>
                      <p>{member.role}</p>
                    </article>
                  ))}
                </div>
              ) : null}
              {win.id === "mail" ? (
                <div>
                  <p>Tell us the work, the deadline, and the budget.</p>
                  <p>
                    <Link href={site.bookPath}>Book a call</Link>
                  </p>
                  <p>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </p>
                </div>
              ) : null}
            </div>
          </section>
        ))}
      </div>

      <div className={styles.phone}>
        {app === null ? (
          <div className={styles.apps}>
            <p className={styles.phoneLine}>Websites and MVPs. Open a folder.</p>
            {seed.map((win) => (
              <button key={win.id} type="button" aria-label={win.title} onClick={() => setApp(win.id)}>
                <span className={styles.glyph} aria-hidden="true">{win.title.slice(0, 1)}</span>
                {win.title}
              </button>
            ))}
          </div>
        ) : (
          <div className={styles.sheet}>
            <header>
              <strong>{seed.find((win) => win.id === app)?.title}</strong>
              <button type="button" onClick={() => setApp(null)}>
                Desk
              </button>
            </header>
            <div className={styles.body}>
              {app === "work"
                ? projects.map((project) => (
                    <a key={project.href} href={project.href} target="_blank" rel="noopener noreferrer">
                      <Image src={project.image} alt={project.alt} width={800} height={500} style={{ width: "100%", height: "auto", marginTop: "0.7rem" }} />
                      <span>
                        {project.title} · {project.kind} · {project.timeline}
                      </span>
                    </a>
                  ))
                : null}
              {app === "prices"
                ? services.map((service) => (
                    <p className={styles.priceRow} key={service.id}>
                      <span>{service.name}</span>
                      <span>{service.price}</span>
                    </p>
                  ))
                : null}
              {app === "studio"
                ? team.map((member) => (
                    <p key={member.name}>
                      <strong>{member.name}</strong> · {member.role}
                    </p>
                  ))
                : null}
              {app === "mail" ? (
                <p>
                  <Link href={site.bookPath}>Book a call</Link>
                  {" · "}
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
