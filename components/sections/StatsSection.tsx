import { StatCounter } from "@/components/StatCounter/StatCounter";
import { stats } from "@/lib/content";

/** Section 6: statistics with counter animations. */
export function StatsSection() {
  return (
    <section id="stats" className="wrap py-section">
      <div className="grid gap-[clamp(1.5rem,3vw,2rem)] border-y border-hair py-[clamp(2rem,5vw,3.5rem)] sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCounter key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
