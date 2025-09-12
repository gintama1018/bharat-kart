"use client"

import { motion } from "framer-motion"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  type?: "chakra" | "lotus" | "mandala"
}

export function LoadingSpinner({ size = "md", type = "chakra" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-24 h-24",
  }

  if (type === "chakra") {
    return (
      <div className="flex items-center justify-center">
        <motion.div
          className={`${sizeClasses[size]} relative`}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <svg viewBox="0 0 24 24" className="w-full h-full text-orange-600">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray="31.416"
              strokeDashoffset="31.416"
            />
            {/* Ashoka Chakra spokes */}
            {[...Array(24)].map((_, i) => (
              <motion.line
                key={i}
                x1="12"
                y1="2"
                x2="12"
                y2="4"
                stroke="currentColor"
                strokeWidth="1"
                transform={`rotate(${i * 15} 12 12)`}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.08,
                }}
              />
            ))}
          </svg>
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-red-600 opacity-20"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>
      </div>
    )
  }

  if (type === "lotus") {
    return (
      <div className="flex items-center justify-center">
        <motion.div className={`${sizeClasses[size]} relative`}>
          {/* Lotus petals */}
          {[...Array(8)].map((_, i) => (
            <motion.div key={i} className="absolute inset-0" style={{ transform: `rotate(${i * 45}deg)` }}>
              <motion.div
                className="w-2 h-6 bg-gradient-to-t from-pink-500 to-orange-400 rounded-full mx-auto"
                animate={{
                  scaleY: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.25,
                }}
              />
            </motion.div>
          ))}
          <motion.div
            className="absolute inset-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </motion.div>
      </div>
    )
  }

  // Mandala type
  return (
    <div className="flex items-center justify-center">
      <motion.div className={`${sizeClasses[size]} relative`}>
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 border-4 border-orange-500 rounded-full border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        {/* Middle ring */}
        <motion.div
          className="absolute inset-2 border-2 border-red-500 rounded-full border-r-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        {/* Inner circle */}
        <motion.div
          className="absolute inset-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.div>
    </div>
  )
}
