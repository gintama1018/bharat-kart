"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { ReactNode } from "react"

interface CulturalTransitionProps {
  children: ReactNode
  type?: "kaleidoscope" | "scroll" | "mandala" | "fade"
  isVisible?: boolean
}

export function CulturalTransition({ children, type = "fade", isVisible = true }: CulturalTransitionProps) {
  const variants = {
    kaleidoscope: {
      initial: {
        scale: 0,
        rotate: -180,
        opacity: 0,
        filter: "hue-rotate(0deg)",
      },
      animate: {
        scale: 1,
        rotate: 0,
        opacity: 1,
        filter: "hue-rotate(360deg)",
      },
      exit: {
        scale: 0,
        rotate: 180,
        opacity: 0,
        filter: "hue-rotate(720deg)",
      },
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        filter: { duration: 2 },
      },
    },
    scroll: {
      initial: {
        x: "100%",
        opacity: 0,
        rotateY: 90,
      },
      animate: {
        x: "0%",
        opacity: 1,
        rotateY: 0,
      },
      exit: {
        x: "-100%",
        opacity: 0,
        rotateY: -90,
      },
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
    mandala: {
      initial: {
        scale: 0.8,
        opacity: 0,
        rotate: -45,
        borderRadius: "50%",
      },
      animate: {
        scale: 1,
        opacity: 1,
        rotate: 0,
        borderRadius: "0%",
      },
      exit: {
        scale: 1.2,
        opacity: 0,
        rotate: 45,
        borderRadius: "50%",
      },
      transition: {
        duration: 0.7,
        ease: "easeInOut",
      },
    },
    fade: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.4 },
    },
  }

  const currentVariant = variants[type]

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={currentVariant.initial}
          animate={currentVariant.animate}
          exit={currentVariant.exit}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
