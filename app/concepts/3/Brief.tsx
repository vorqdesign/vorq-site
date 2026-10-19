"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { customWork, projects, services, site } from "@/lib/content";
import { useLockScroll } from "../useLockScroll";
import styles from "./brief.module.css";

export default function Brief() {
  useLockScroll();
  const [id, setId] = useState<(typeof services)[number]["id"]>("website");
  const service = services.find((item) => item.id === id) ?? services[1];

  return (
    <div className={styles.root}>
      <header className={styles.top}>
        <strong>Vorq</strong>
        <span>Websites and MVPs. Pick a scope.</span>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </header>
      <div className={styles.main}>
        <div className={styles.choices} role="listbox" aria-label="Choose a scope">
          {services.map((item) => (
            <button
              key={item.id}
              type="button"
              role="option"
              aria-selected={item.id === service.id}
              data-on={item.id === service.id}
              onClick={() => setId(item.id)}
            >
              <strong>{item.name}</strong>
              <span>{item.price}</span>
            </button>
          ))}
        </div>
        <div className={styles.detail}>
          <p className={styles.price}>{service.price}</p>
          <h2>{service.tagline}</h2>
          <ul className={styles.includes}>
            {service.includes.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p>{customWork.title} {customWork.body}</p>
          <div className={styles.actions}>
            <Link href={site.bookPath}>{service.cta}</Link>
            <a className={styles.mail} href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>
        </div>
      </div>
      <div className={styles.strip} aria-label="Recent work">
        {projects.map((project) => (
          <a key={project.href} href={project.href} target="_blank" rel="noopener noreferrer">
            <span className={styles.thumb}>
              <Image src={project.image} alt={project.alt} fill sizes="(max-width: 800px) 70vw, 25vw" />
            </span>
            <span>
              {project.title} · {project.timeline}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
