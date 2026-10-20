import { stats } from "@/lib/content";

export default function StatsRow() {
  if (stats.length === 0) return null;

  return (
    <section className="stats" aria-label="Studio figures">
      {stats.map((stat) => (
        <article key={stat.label}>
          <p className="stat-value">{stat.value}</p>
          <p>{stat.label}</p>
        </article>
      ))}
    </section>
  );
}
