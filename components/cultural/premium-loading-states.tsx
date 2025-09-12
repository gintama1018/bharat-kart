"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface PremiumLoadingProps {
  type?: "general" | "rajasthan" | "kerala" | "gujarat" | "tamil-nadu" | "punjab" | "product"
  message?: string
  isVisible: boolean
}

export function PremiumLoading({ type = "general", message, isVisible }: PremiumLoadingProps) {
  const [loadingText, setLoadingText] = useState("")

  useEffect(() => {
    if (!isVisible) return

    const messages = {
      general: ["Loading cultural treasures...", "Connecting with artisans...", "Preparing your journey..."],
      rajasthan: ["Crossing desert sands...", "Entering royal palaces...", "Meeting puppet masters..."],
      kerala: ["Sailing through backwaters...", "Gathering spices...", "Weaving coconut stories..."],
      gujarat: ["Flying colorful kites...", "Threading vibrant textiles...", "Dancing with traditions..."],
      "tamil-nadu": ["Crafting bronze sculptures...", "Weaving silk dreams...", "Painting temple stories..."],
      punjab: ["Harvesting golden fields...", "Beating dhol rhythms...", "Celebrating abundance..."],
      product: ["Handcrafting your selection...", "Adding cultural essence...", "Blessing your choice..."],
    }

    const typeMessages = messages[type]
    let index = 0

    const interval = setInterval(() => {
      setLoadingText(typeMessages[index])
      index = (index + 1) % typeMessages.length
    }, 2000)

    return () => clearInterval(interval)
  }, [type, isVisible])

  const getLoadingAnimation = () => {
    switch (type) {
      case "rajasthan":
        return (
          <div className="relative">
            {/* Camel caravan animation */}
            <motion.div
              className="flex items-center space-x-4"
              animate={{ x: [-100, 100, -100] }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <span className="text-4xl">🐪</span>
              <span className="text-3xl">🐪</span>
              <span className="text-2xl">🐪</span>
            </motion.div>
            {/* Desert sunset background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full opacity-20"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        )

      case "kerala":
        return (
          <div className="relative">
            {/* Boat sailing animation */}
            <motion.div
              animate={{
                x: [-50, 50, -50],
                y: [0, -10, 0],
              }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <span className="text-4xl">🛶</span>
            </motion.div>
            {/* Water ripples */}
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-400 rounded-full opacity-60"
              animate={{ scaleX: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        )

      case "gujarat":
        return (
          <div className="relative">
            {/* Kite flying animation */}
            <motion.div
              animate={{
                y: [-40, 0, -40],
                x: [-20, 20, -20],
                rotate: [0, 360],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <span className="text-4xl">🪁</span>
            </motion.div>
            {/* Colorful thread trail */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-1 h-20 bg-gradient-to-b from-purple-500 via-pink-500 to-yellow-500 rounded-full"
              animate={{
                scaleY: [0.5, 1, 0.5],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        )

      case "product":
        return (
          <div className="relative">
            {/* Artisan hands crafting */}
            <motion.div
              className="flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <span className="text-4xl">🙏</span>
            </motion.div>
            {/* Cultural patterns forming */}
            <motion.div
              className="absolute inset-0 border-2 border-orange-300 rounded-full"
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
              }}
            />
          </div>
        )

      default:
        return (
          <div className="relative">
            {/* Ashoka Chakra spinning */}
            <motion.div
              className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            {/* Golden particle trails */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                style={{
                  top: "50%",
                  left: "50%",
                  transformOrigin: "0 0",
                }}
                animate={{
                  rotate: [i * 45, i * 45 + 360],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        )
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm mx-4 text-center"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
          >
            <div className="mb-6 flex justify-center">{getLoadingAnimation()}</div>

            <motion.h3
              className="text-xl font-bold text-gray-800 mb-2"
              key={loadingText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {message || loadingText}
            </motion.h3>

            <p className="text-gray-600 text-sm">Crafting your cultural experience...</p>

            {/* Progress indicator */}
            <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
              <motion.div
                className="bg-gradient-to-r from-orange-500 to-red-600 h-1 rounded-full"
                animate={{ width: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Hook for easy loading state management
export function usePremiumLoading() {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingType, setLoadingType] = useState<PremiumLoadingProps["type"]>("general")
  const [loadingMessage, setLoadingMessage] = useState<string>()

  const showLoading = (type?: PremiumLoadingProps["type"], message?: string) => {
    setLoadingType(type || "general")
    setLoadingMessage(message)
    setIsLoading(true)
  }

  const hideLoading = () => {
    setIsLoading(false)
  }

  return {
    isLoading,
    loadingType,
    loadingMessage,
    showLoading,
    hideLoading,
    LoadingComponent: () => <PremiumLoading type={loadingType} message={loadingMessage} isVisible={isLoading} />,
  }
}
