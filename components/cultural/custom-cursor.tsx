"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CursorState {
  x: number
  y: number
  isHovering: boolean
  hoverType: "default" | "button" | "product" | "text" | "loading"
}

export function CustomCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    hoverType: "default",
  })

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursor((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
      }))
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      let hoverType: CursorState["hoverType"] = "default"

      if (target.tagName === "BUTTON" || target.closest("button")) {
        hoverType = "button"
      } else if (target.closest('[data-cursor="product"]')) {
        hoverType = "product"
      } else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        hoverType = "text"
      } else if (target.closest('[data-cursor="loading"]')) {
        hoverType = "loading"
      }

      setCursor((prev) => ({
        ...prev,
        isHovering: true,
        hoverType,
      }))
    }

    const handleMouseLeave = () => {
      setCursor((prev) => ({
        ...prev,
        isHovering: false,
        hoverType: "default",
      }))
    }

    document.addEventListener("mousemove", updateCursor)
    document.addEventListener("mouseenter", handleMouseEnter, true)
    document.addEventListener("mouseleave", handleMouseLeave, true)

    return () => {
      document.removeEventListener("mousemove", updateCursor)
      document.removeEventListener("mouseenter", handleMouseEnter, true)
      document.removeEventListener("mouseleave", handleMouseLeave, true)
    }
  }, [])

  const getCursorVariant = () => {
    switch (cursor.hoverType) {
      case "button":
        return {
          scale: 1.5,
          backgroundColor: "#f97316",
          border: "2px solid #fed7aa",
        }
      case "product":
        return {
          scale: 2,
          backgroundColor: "transparent",
          border: "2px solid #f97316",
        }
      case "text":
        return {
          scaleX: 0.1,
          scaleY: 1.5,
          backgroundColor: "#f97316",
        }
      case "loading":
        return {
          scale: 1.2,
          rotate: 360,
          backgroundColor: "#fbbf24",
        }
      default:
        return {
          scale: 1,
          backgroundColor: "#f97316",
          border: "none",
        }
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursor.x - 12,
          y: cursor.y - 12,
        }}
        animate={getCursorVariant()}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        {/* Lotus Petal Cursor */}
        <div className="w-full h-full relative">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, #f97316 0%, #ea580c  70%, transparent 100%)",
              filter: "blur(1px)",
            }}
            animate={{
              rotate: cursor.hoverType === "loading" ? 360 : 0,
            }}
            transition={{
              duration: cursor.hoverType === "loading" ? 1 : 0,
              repeat: cursor.hoverType === "loading" ? Number.POSITIVE_INFINITY : 0,
              ease: "linear",
            }}
          />

          {/* Cultural Pattern Overlay */}
          {cursor.hoverType === "product" && (
            <motion.div
              className="absolute inset-0 border-2 border-orange-500 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <div className="absolute inset-1 border border-orange-300 rounded-full opacity-50" />
            </motion.div>
          )}

          {/* Traditional Hand Mudra for Buttons */}
          {cursor.hoverType === "button" && (
            <motion.div
              className="absolute -top-2 -left-2 text-white text-xs"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              🤏
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
