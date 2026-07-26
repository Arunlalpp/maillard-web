"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1], delay }}
      whileHover={{ y: -6 }}
      className={cn("glass rounded-xl2 p-[clamp(1.3rem,3vw,2rem)]", className)}
    >
      {children}
    </motion.div>
  );
}
