"use client";

import type { IconType } from "react-icons";
import { GlassCard } from "@/components/ui/GlassCard";

interface FeatureCardProps {
  icon: IconType;
  title: string;
  body: string;
  index: number;
  delay?: number;
}

export function FeatureCard({ icon: Icon, title, body, index, delay = 0 }: FeatureCardProps) {
  return (
    <GlassCard delay={delay} className="group flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ember/12 text-ember transition-transform duration-500 group-hover:scale-110">
          <Icon size={22} />
        </span>
        <span className="font-mono text-fluid-eyebrow text-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="font-display text-fluid-h3 font-bold">{title}</h3>
      <p className="text-base text-muted">{body}</p>
    </GlassCard>
  );
}
