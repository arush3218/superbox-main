"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type React from "react";
import { useEffect } from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <MotionConfig transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{
            opacity: 0,
            y: 8,
            scale: 0.995,
            filter: "blur(4px) saturate(0.95)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px) saturate(1)",
          }}
          exit={{
            opacity: 0,
            y: -8,
            scale: 0.995,
            filter: "blur(4px) saturate(0.95)",
          }}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}
