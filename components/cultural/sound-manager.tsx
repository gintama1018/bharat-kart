"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface SoundContextType {
  isEnabled: boolean
  volume: number
  toggleSound: () => void
  setVolume: (volume: number) => void
  playSound: (soundType: SoundType, context?: string) => void
}

type SoundType = "hover" | "click" | "success" | "error" | "ambient" | "scroll" | "loading"

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function useSoundManager() {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error("useSoundManager must be used within SoundProvider")
  }
  return context
}

interface SoundProviderProps {
  children: ReactNode
}

export function SoundProvider({ children }: SoundProviderProps) {
  const [isEnabled, setIsEnabled] = useState(false)
  const [volume, setVolumeState] = useState(0.3)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)

  useEffect(() => {
    // Initialize Web Audio API
    if (typeof window !== "undefined" && isEnabled) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      setAudioContext(ctx)

      return () => {
        ctx.close()
      }
    }
  }, [isEnabled])

  const toggleSound = () => {
    setIsEnabled(!isEnabled)
  }

  const setVolume = (newVolume: number) => {
    setVolumeState(Math.max(0, Math.min(1, newVolume)))
  }

  const playSound = (soundType: SoundType, context?: string) => {
    if (!isEnabled || !audioContext) return

    // Generate cultural sounds using Web Audio API
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    // Configure sound based on type and cultural context
    const soundConfig = getSoundConfig(soundType, context)

    oscillator.frequency.setValueAtTime(soundConfig.frequency, audioContext.currentTime)
    oscillator.type = soundConfig.waveType

    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(volume * soundConfig.volume, audioContext.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + soundConfig.duration)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + soundConfig.duration)
  }

  const getSoundConfig = (soundType: SoundType, context?: string) => {
    const baseConfigs = {
      hover: { frequency: 800, volume: 0.1, duration: 0.1, waveType: "sine" as OscillatorType },
      click: { frequency: 1200, volume: 0.2, duration: 0.15, waveType: "triangle" as OscillatorType },
      success: { frequency: 523.25, volume: 0.3, duration: 0.5, waveType: "sine" as OscillatorType }, // C5 note
      error: { frequency: 220, volume: 0.2, duration: 0.3, waveType: "sawtooth" as OscillatorType },
      ambient: { frequency: 432, volume: 0.05, duration: 2, waveType: "sine" as OscillatorType },
      scroll: { frequency: 660, volume: 0.05, duration: 0.1, waveType: "sine" as OscillatorType },
      loading: { frequency: 440, volume: 0.1, duration: 0.2, waveType: "triangle" as OscillatorType },
    }

    // Modify based on cultural context
    const config = { ...baseConfigs[soundType] }

    if (context) {
      switch (context) {
        case "rajasthan":
          config.frequency *= 1.2 // Higher pitch for desert theme
          break
        case "kerala":
          config.frequency *= 0.8 // Lower pitch for water theme
          break
        case "gujarat":
          config.frequency *= 1.1 // Slightly higher for vibrant theme
          break
        case "tamilnadu":
          config.frequency *= 0.9 // Traditional temple bell frequency
          break
      }
    }

    return config
  }

  return (
    <SoundContext.Provider value={{ isEnabled, volume, toggleSound, setVolume, playSound }}>
      {children}
      <SoundControls />
    </SoundContext.Provider>
  )
}

function SoundControls() {
  const { isEnabled, volume, toggleSound, setVolume } = useSoundManager()
  const [showControls, setShowControls] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        className="relative"
        onHoverStart={() => setShowControls(true)}
        onHoverEnd={() => setShowControls(false)}
      >
        {/* Sound Toggle Button */}
        <motion.button
          onClick={toggleSound}
          className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          data-cursor="button"
        >
          {isEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </motion.button>

        {/* Volume Control */}
        <AnimatePresence>
          {showControls && isEnabled && (
            <motion.div
              className="absolute bottom-16 right-0 bg-white/90 backdrop-blur-md rounded-lg p-4 shadow-xl border border-orange-200"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col items-center space-y-2">
                <span className="text-xs text-gray-600 font-medium">Volume</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
                  className="w-20 h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #f97316 0%, #f97316 ${volume * 100}%, #fed7aa ${volume * 100}%, #fed7aa 100%)`,
                  }}
                />
                <span className="text-xs text-gray-500">{Math.round(volume * 100)}%</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
