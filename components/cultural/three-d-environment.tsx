"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface ThreeDEnvironmentProps {
  scene: "landing" | "rajasthan" | "kerala" | "gujarat" | "tamil-nadu" | "punjab"
  className?: string
}

export function ThreeDEnvironment({ scene, className }: ThreeDEnvironmentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // 3D Scene Configuration
    const sceneConfig = {
      landing: {
        particles: 150,
        colors: ["#f97316", "#ea580c", "#dc2626", "#fbbf24"],
        objects: ["lotus", "diya", "peacock"],
        ambientColor: "#fff7ed",
      },
      rajasthan: {
        particles: 100,
        colors: ["#f59e0b", "#d97706", "#92400e", "#fbbf24"],
        objects: ["palace", "camel", "puppet"],
        ambientColor: "#fef3c7",
      },
      kerala: {
        particles: 120,
        colors: ["#059669", "#047857", "#065f46", "#10b981"],
        objects: ["coconut", "boat", "spice"],
        ambientColor: "#ecfdf5",
      },
      gujarat: {
        particles: 200,
        colors: ["#7c3aed", "#6d28d9", "#5b21b6", "#8b5cf6"],
        objects: ["kite", "textile", "garba"],
        ambientColor: "#f3e8ff",
      },
      "tamil-nadu": {
        particles: 80,
        colors: ["#b45309", "#92400e", "#78350f", "#d97706"],
        objects: ["bronze", "temple", "dancer"],
        ambientColor: "#fef3c7",
      },
      punjab: {
        particles: 90,
        colors: ["#eab308", "#ca8a04", "#a16207", "#facc15"],
        objects: ["wheat", "turban", "dhol"],
        ambientColor: "#fefce8",
      },
    }

    const config = sceneConfig[scene]
    const particles: Array<{
      x: number
      y: number
      z: number
      vx: number
      vy: number
      vz: number
      color: string
      size: number
      rotation: number
      rotationSpeed: number
    }> = []

    // Initialize particles
    for (let i = 0; i < config.particles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        vz: (Math.random() - 0.5) * 2,
        color: config.colors[Math.floor(Math.random() * config.colors.length)],
        size: Math.random() * 4 + 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      })
    }

    let animationId: number
    let time = 0

    const animate = () => {
      time += 0.016

      // Clear canvas with ambient color
      ctx.fillStyle = config.ambientColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Update position with 3D movement
        particle.x += particle.vx + Math.sin(time + index * 0.1) * 0.5
        particle.y += particle.vy + Math.cos(time + index * 0.1) * 0.3
        particle.z += particle.vz

        // Mouse interaction
        const mouseInfluence = 50
        const dx = mousePosition.x - particle.x
        const dy = mousePosition.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseInfluence) {
          const force = (mouseInfluence - distance) / mouseInfluence
          particle.vx += dx * force * 0.001
          particle.vy += dy * force * 0.001
        }

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
        if (particle.z < 0) particle.z = 1000
        if (particle.z > 1000) particle.z = 0

        // Update rotation
        particle.rotation += particle.rotationSpeed

        // Calculate 3D perspective
        const perspective = 800
        const scale = perspective / (perspective + particle.z)
        const x = particle.x * scale
        const y = particle.y * scale
        const size = particle.size * scale

        // Draw particle with cultural shape
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(particle.rotation)
        ctx.globalAlpha = 0.6 + Math.sin(time + index * 0.1) * 0.2

        // Draw different shapes based on scene
        ctx.fillStyle = particle.color
        if (scene === "landing" || scene === "rajasthan") {
          // Lotus petal shape
          ctx.beginPath()
          ctx.ellipse(0, 0, size, size * 1.5, 0, 0, Math.PI * 2)
          ctx.fill()
        } else if (scene === "kerala") {
          // Coconut leaf shape
          ctx.beginPath()
          ctx.ellipse(0, 0, size * 2, size * 0.5, 0, 0, Math.PI * 2)
          ctx.fill()
        } else if (scene === "gujarat") {
          // Kite shape
          ctx.beginPath()
          ctx.moveTo(0, -size)
          ctx.lineTo(size, 0)
          ctx.lineTo(0, size)
          ctx.lineTo(-size, 0)
          ctx.closePath()
          ctx.fill()
        } else {
          // Default circle
          ctx.beginPath()
          ctx.arc(0, 0, size, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      })

      animationId = requestAnimationFrame(animate)
    }

    // Start animation
    animate()
    setIsLoaded(true)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [scene, mousePosition])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        className="absolute inset-0 w-full h-full"
        style={{ background: "transparent" }}
      />

      {/* Cultural Objects Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {scene === "rajasthan" && (
          <>
            <motion.div
              className="absolute top-1/4 left-1/4 text-6xl opacity-20"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              🏰
            </motion.div>
            <motion.div
              className="absolute bottom-1/3 right-1/4 text-4xl opacity-30"
              animate={{
                x: [0, 30, 0],
                rotate: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              🐪
            </motion.div>
          </>
        )}

        {scene === "kerala" && (
          <>
            <motion.div
              className="absolute top-1/3 right-1/3 text-5xl opacity-25"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              🥥
            </motion.div>
            <motion.div
              className="absolute bottom-1/4 left-1/3 text-4xl opacity-30"
              animate={{
                x: [0, 20, 0],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 7,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              🛶
            </motion.div>
          </>
        )}

        {scene === "gujarat" && (
          <>
            <motion.div
              className="absolute top-1/5 left-1/2 text-4xl opacity-40"
              animate={{
                y: [0, -40, 0],
                x: [0, 20, -20, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              🪁
            </motion.div>
            <motion.div
              className="absolute bottom-1/3 right-1/5 text-3xl opacity-35"
              animate={{
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              🧵
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  )
}
