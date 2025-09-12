"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  type: "petal" | "particle" | "pattern"
}

export function FloatingElements({ count = 20 }: { count?: number }) {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const newElements = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15,
      type: ["petal", "particle", "pattern"][Math.floor(Math.random() * 3)] as FloatingElement["type"],
    }))
    setElements(newElements)
  }, [count])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
          }}
          animate={{
            y: [-20, -100, -20],
            x: [0, Math.sin(element.id) * 50, 0],
            rotate: [0, 360],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: element.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: element.delay,
            ease: "easeInOut",
          }}
        >
          {element.type === "petal" && (
            <div className="w-full h-full bg-gradient-to-br from-pink-400 to-orange-400 rounded-full opacity-30" />
          )}
          {element.type === "particle" && (
            <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-red-400 rounded-full opacity-20" />
          )}
          {element.type === "pattern" && (
            <svg viewBox="0 0 24 24" className="w-full h-full text-orange-400 opacity-10">
              <path fill="currentColor" d="M12 2L2 7L12 12L22 7L12 2Z M12 12L2 17L12 22L22 17L12 12Z" />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  )
}
