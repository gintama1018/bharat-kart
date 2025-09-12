"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Check, AlertCircle } from "lucide-react"

interface PremiumInputProps {
  label?: string
  placeholder?: string
  type?: "text" | "email" | "password" | "tel"
  value?: string
  onChange?: (value: string) => void
  error?: string
  success?: boolean
  className?: string
  icon?: ReactNode
}

export function PremiumInput({
  label,
  placeholder,
  type = "text",
  value = "",
  onChange,
  error,
  success,
  className,
  icon,
}: PremiumInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [hasContent, setHasContent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setHasContent(newValue.length > 0)
    onChange?.(newValue)
  }

  return (
    <div className={cn("relative group", className)}>
      {/* Traditional Scroll Pattern Border */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        style={{
          background: "linear-gradient(45deg, #f97316, #ea580c, #dc2626, #f97316)",
          backgroundSize: "300% 300%",
          padding: "2px",
        }}
        animate={{
          backgroundPosition: isFocused ? ["0% 0%", "100% 100%"] : "0% 0%",
        }}
        transition={{
          duration: 2,
          repeat: isFocused ? Number.POSITIVE_INFINITY : 0,
          ease: "linear",
        }}
      >
        <div className="w-full h-full bg-white rounded-lg" />
      </motion.div>

      {/* Input Container */}
      <div className="relative">
        {/* Floating Label */}
        {label && (
          <motion.label
            className={cn(
              "absolute left-3 transition-all duration-300 pointer-events-none",
              isFocused || hasContent ? "top-2 text-xs text-orange-600 font-medium" : "top-4 text-gray-500",
            )}
            animate={{
              y: isFocused || hasContent ? -8 : 0,
              scale: isFocused || hasContent ? 0.85 : 1,
              color: isFocused ? "#ea580c" : "#6b7280",
            }}
          >
            {label}
          </motion.label>
        )}

        {/* Input Field */}
        <motion.input
          type={type}
          placeholder={isFocused ? placeholder : ""}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "relative z-10 w-full px-3 py-4 bg-transparent border-none outline-none text-gray-800",
            label ? "pt-6" : "pt-4",
            icon ? "pl-12" : "pl-3",
          )}
        />

        {/* Icon */}
        {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">{icon}</div>}

        {/* Success/Error Icons */}
        <AnimatePresence>
          {(success || error) && (
            <motion.div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {success && <Check className="w-5 h-5 text-green-500" />}
              {error && <AlertCircle className="w-5 h-5 text-red-500" />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Golden Glow Focus Effect */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(249, 115, 22, 0.1) 0%, transparent 70%)",
          filter: "blur(10px)",
        }}
        animate={{
          opacity: isFocused ? 1 : 0,
          scale: isFocused ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Traditional Lamp Light Corners */}
      {isFocused && (
        <>
          <motion.div
            className="absolute top-0 left-0 w-2 h-2 bg-yellow-400 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          />
          <motion.div
            className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-2 h-2 bg-yellow-400 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-2 h-2 bg-yellow-400 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
          />
        </>
      )}

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="mt-2 text-sm text-red-600 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <motion.div animate={{ x: [0, -2, 2, 0] }} transition={{ duration: 0.4, repeat: 2 }}>
              <AlertCircle className="w-4 h-4" />
            </motion.div>
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Message */}
      <AnimatePresence>
        {success && (
          <motion.div
            className="mt-2 text-sm text-green-600 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ duration: 0.5 }}>
              <Check className="w-4 h-4" />
            </motion.div>
            Verified successfully
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
