"use client"

import { motion } from "framer-motion"
import { type ReactNode, useState } from "react"
import { cn } from "@/lib/utils"

interface PremiumButtonProps {
  children: ReactNode
  variant?: "primary" | "secondary" | "cultural" | "ghost"
  size?: "sm" | "md" | "lg"
  onClick?: () => void
  onMouseEnter?: () => void
  className?: string
  disabled?: boolean
}

export function PremiumButton({
  children,
  variant = "primary",
  size = "md",
  onClick,
  onMouseEnter,
  className,
  disabled = false,
}: PremiumButtonProps) {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    if (disabled) return
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 600)
    onClick?.()
  }

  const baseClasses = "relative overflow-hidden font-medium transition-all duration-300 rounded-lg"

  const variantClasses = {
    primary: "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg hover:shadow-xl",
    secondary: "border-2 border-orange-300 text-orange-600 bg-transparent hover:bg-orange-50",
    cultural: "bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white shadow-lg",
    ghost: "border-2 border-transparent text-orange-600 bg-transparent hover:bg-orange-50 hover:border-orange-200",
  }

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <motion.button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      disabled={disabled}
      whileHover={{
        scale: 1.02,
        boxShadow: variant === "primary" ? "0 10px 25px rgba(249, 115, 22, 0.4)" : "0 5px 15px rgba(249, 115, 22, 0.2)",
      }}
      whileTap={{ scale: 0.98 }}
      data-cursor="button"
    >
      {/* Golden Scrollwork Border Animation */}
      <motion.div
        className="absolute inset-0 border-2 border-transparent rounded-lg"
        style={{
          background:
            variant === "secondary"
              ? "linear-gradient(45deg, transparent, rgba(249, 115, 22, 0.3), transparent)"
              : "linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Typewriter Effect for Text */}
      <motion.span
        className="relative z-10 block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.span>

      {/* Diya Flame Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-yellow-400/30 via-orange-400/20 to-transparent rounded-lg"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1.2, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Rangoli Pattern Ripple on Click */}
      {isClicked && (
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-yellow-300/50 via-orange-300/30 to-transparent rounded-full"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}

      {/* Lotus Bloom Success Animation */}
      {isClicked && (
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: [0, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-4 h-4 text-yellow-300">🪷</div>
        </motion.div>
      )}
    </motion.button>
  )
}
