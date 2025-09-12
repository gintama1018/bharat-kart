"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface ThreeDBackgroundProps {
  scene?: "landing" | "rajasthan" | "kerala" | "gujarat" | "tamilnadu"
  intensity?: "low" | "medium" | "high"
}

export function ThreeDBackground({ scene = "landing", intensity = "medium" }: ThreeDBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isWebGLSupported, setIsWebGLSupported] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Check WebGL support
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    if (!gl) {
      setIsWebGLSupported(false)
      return
    }

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Simple 3D-like animation using Canvas 2D (fallback for complex 3D)
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const particles: Array<{
      x: number
      y: number
      z: number
      vx: number
      vy: number
      vz: number
      size: number
      color: string
      type: "diya" | "lotus" | "peacock" | "mandala"
    }> = []

    // Initialize particles based on scene
    const initParticles = () => {
      const colors = getSceneColors(scene)
      const particleCount = intensity === "low" ? 15 : intensity === "medium" ? 25 : 40

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          vz: (Math.random() - 0.5) * 2,
          size: Math.random() * 20 + 10,
          color: colors[Math.floor(Math.random() * colors.length)],
          type: getSceneParticleType(scene),
        })
      }
    }

    const getSceneColors = (sceneType: string) => {
      switch (sceneType) {
        case "rajasthan":
          return ["#dc2626", "#ea580c", "#f59e0b", "#fbbf24"]
        case "kerala":
          return ["#059669", "#0d9488", "#0891b2", "#0284c7"]
        case "gujarat":
          return ["#dc2626", "#f59e0b", "#ec4899", "#8b5cf6"]
        case "tamilnadu":
          return ["#b45309", "#dc2626", "#ea580c", "#f59e0b"]
        default:
          return ["#f97316", "#ea580c", "#dc2626", "#fbbf24"]
      }
    }

    const getSceneParticleType = (sceneType: string) => {
      const types = ["diya", "lotus", "peacock", "mandala"] as const
      return types[Math.floor(Math.random() * types.length)]
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.z += particle.vz

        // Wrap around screen
        if (particle.x < -50) particle.x = canvas.width + 50
        if (particle.x > canvas.width + 50) particle.x = -50
        if (particle.y < -50) particle.y = canvas.height + 50
        if (particle.y > canvas.height + 50) particle.y = -50
        if (particle.z < 0) particle.z = 1000
        if (particle.z > 1000) particle.z = 0

        // Calculate 3D perspective
        const perspective = 800
        const scale = perspective / (perspective + particle.z)
        const x2d = particle.x * scale + (canvas.width / 2) * (1 - scale)
        const y2d = particle.y * scale + (canvas.height / 2) * (1 - scale)
        const size2d = particle.size * scale

        // Draw particle based on type
        ctx.save()
        ctx.globalAlpha = Math.max(0.1, scale)

        switch (particle.type) {
          case "diya":
            drawDiya(ctx, x2d, y2d, size2d, particle.color)
            break
          case "lotus":
            drawLotus(ctx, x2d, y2d, size2d, particle.color)
            break
          case "peacock":
            drawPeacock(ctx, x2d, y2d, size2d, particle.color)
            break
          case "mandala":
            drawMandala(ctx, x2d, y2d, size2d, particle.color)
            break
        }

        ctx.restore()
      })

      animationId = requestAnimationFrame(animate)
    }

    // Drawing functions for cultural elements
    const drawDiya = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.ellipse(x, y, size * 0.6, size * 0.3, 0, 0, Math.PI * 2)
      ctx.fill()

      // Flame
      ctx.fillStyle = "#fbbf24"
      ctx.beginPath()
      ctx.ellipse(x, y - size * 0.4, size * 0.2, size * 0.4, 0, 0, Math.PI * 2)
      ctx.fill()
    }

    const drawLotus = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
      ctx.fillStyle = color
      for (let i = 0; i < 8; i++) {
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate((i * Math.PI) / 4)
        ctx.beginPath()
        ctx.ellipse(0, -size * 0.3, size * 0.2, size * 0.5, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    const drawPeacock = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(x, y, size * 0.3, 0, Math.PI * 2)
      ctx.fill()

      // Feather pattern
      for (let i = 0; i < 5; i++) {
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate((i * Math.PI) / 2.5)
        ctx.fillStyle = `${color}80`
        ctx.beginPath()
        ctx.ellipse(0, -size * 0.5, size * 0.1, size * 0.4, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    const drawMandala = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
      ctx.strokeStyle = color
      ctx.lineWidth = 2

      for (let i = 0; i < 12; i++) {
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate((i * Math.PI) / 6)
        ctx.beginPath()
        ctx.arc(0, -size * 0.3, size * 0.1, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }
    }

    initParticles()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [scene, intensity])

  if (!isWebGLSupported) {
    // Fallback for devices without WebGL
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 20% 30%, rgba(249, 115, 22, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, rgba(234, 88, 12, 0.2) 0%, transparent 50%),
                        radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.1) 0%, transparent 50%)`,
          }}
          animate={{
            background: [
              `radial-gradient(circle at 20% 30%, rgba(249, 115, 22, 0.3) 0%, transparent 50%),
               radial-gradient(circle at 80% 70%, rgba(234, 88, 12, 0.2) 0%, transparent 50%)`,
              `radial-gradient(circle at 80% 30%, rgba(249, 115, 22, 0.3) 0%, transparent 50%),
               radial-gradient(circle at 20% 70%, rgba(234, 88, 12, 0.2) 0%, transparent 50%)`,
            ],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>
    )
  }

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30" style={{ zIndex: 1 }} />
}
