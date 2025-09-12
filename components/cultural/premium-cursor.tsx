"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function PremiumCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorType, setCursorType] = useState<"default" | "button" | "product" | "text" | "loading">("default")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    // Detect cursor context
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const cursorData = target.getAttribute("data-cursor")

      if (cursorData) {
        setCursorType(cursorData as any)
      } else if (target.tagName === "BUTTON" || target.closest("button")) {
        setCursorType("button")
      } else if (target.closest("[data-product]")) {
        setCursorType("product")
      } else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        setCursorType("text")
      } else {
        setCursorType("default")
      }
    }

    document.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    // Hide default cursor
    document.body.style.cursor = "none"

    return () => {
      document.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.body.style.cursor = "auto"
    }
  }, [])

  const getCursorContent = () => {
    switch (cursorType) {
      case "button":
        return (
          <motion.div
            className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
          >
            <span className="text-white text-xs">👆</span>
          </motion.div>
        )
      case "product":
        return (
          <motion.div
            className="w-10 h-10 bg-white border-2 border-orange-500 rounded-full flex items-center justify-center shadow-lg"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <span className="text-orange-600 text-sm">🔍</span>
          </motion.div>
        )
      case "text":
        return (
          <motion.div
            className="w-6 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-sm"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          />
        )
      case "loading":
        return (
          <motion.div
            className="w-12 h-12 border-2 border-orange-500 rounded-full flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <motion.div
              className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-full"
              animate={{ scale: [1, 0.8, 1] }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
        )
      default:
        return (
          <motion.div
            className="relative"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            {/* Golden Lotus Petal */}
            <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-80 shadow-lg" />
            {/* Trailing particles */}
            <motion.div
              className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-300 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.1,
              }}
            />
            <motion.div
              className="absolute -bottom-1 -right-1 w-2 h-2 bg-orange-400 rounded-full"
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.3,
              }}
            />
          </motion.div>
        )
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
          style={{
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {getCursorContent()}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
