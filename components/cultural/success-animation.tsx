"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

export function SuccessAnimation({ message = "Success!" }: { message?: string }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-8"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Lotus bloom animation */}
      <motion.div
        className="relative mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
      >
        {/* Outer petals */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16"
            style={{
              transform: `rotate(${i * 45}deg)`,
              transformOrigin: "center",
            }}
            initial={{ scale: 0, rotate: i * 45 - 90 }}
            animate={{ scale: 1, rotate: i * 45 }}
            transition={{
              delay: 0.3 + i * 0.1,
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            <div className="w-6 h-12 bg-gradient-to-t from-pink-400 to-orange-300 rounded-full mx-auto opacity-80" />
          </motion.div>
        ))}

        {/* Center circle with checkmark */}
        <motion.div
          className="relative w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4, ease: "easeOut" }}
        >
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, duration: 0.3 }}>
            <CheckCircle className="w-8 h-8 text-white" />
          </motion.div>
        </motion.div>

        {/* Sparkle effects */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full"
            style={{
              left: `${50 + 30 * Math.cos((i * 30 * Math.PI) / 180)}%`,
              top: `${50 + 30 * Math.sin((i * 30 * Math.PI) / 180)}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              delay: 1.2 + i * 0.1,
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 2,
            }}
          />
        ))}
      </motion.div>

      {/* Success message */}
      <motion.h3
        className="text-2xl font-bold text-center bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        {message}
      </motion.h3>

      {/* Cultural blessing text */}
      <motion.p
        className="text-sm text-gray-600 mt-2 text-center italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        "सफलता आपके साथ हो" - May success be with you
      </motion.p>
    </motion.div>
  )
}
