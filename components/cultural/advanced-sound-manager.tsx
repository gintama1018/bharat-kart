"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SoundContextType {
  isEnabled: boolean
  volume: number
  toggleSound: () => void
  setVolume: (volume: number) => void
  playSound: (soundType: SoundType, options?: { volume?: number; loop?: boolean }) => void
  stopSound: (soundType: SoundType) => void
  playAmbient: (scene: string) => void
  stopAmbient: () => void
}

type SoundType =
  | "hover"
  | "click"
  | "success"
  | "error"
  | "notification"
  | "scroll"
  | "loading"
  | "cultural-chime"
  | "traditional-bell"
  | "sitar-note"
  | "tabla-beat"

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function useSound() {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error("useSound must be used within SoundProvider")
  }
  return context
}

interface SoundProviderProps {
  children: ReactNode
}

export function AdvancedSoundProvider({ children }: SoundProviderProps) {
  const [isEnabled, setIsEnabled] = useState(false)
  const [volume, setVolumeState] = useState(0.3)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [sounds, setSounds] = useState<Map<SoundType, AudioBuffer>>(new Map())
  const [ambientAudio, setAmbientAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize Web Audio API
    if (typeof window !== "undefined" && isEnabled) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      setAudioContext(ctx)

      // Load sound files
      loadSounds(ctx)
    }

    return () => {
      if (audioContext) {
        audioContext.close()
      }
      if (ambientAudio) {
        ambientAudio.pause()
        ambientAudio.src = ""
      }
    }
  }, [isEnabled])

  const loadSounds = async (ctx: AudioContext) => {
    const soundFiles: Record<SoundType, string> = {
      hover: "/sounds/cultural-hover.mp3",
      click: "/sounds/traditional-click.mp3",
      success: "/sounds/celebration-chime.mp3",
      error: "/sounds/gentle-bell.mp3",
      notification: "/sounds/temple-bell.mp3",
      scroll: "/sounds/page-turn.mp3",
      loading: "/sounds/meditation-rhythm.mp3",
      "cultural-chime": "/sounds/cultural-chime.mp3",
      "traditional-bell": "/sounds/traditional-bell.mp3",
      "sitar-note": "/sounds/sitar-note.mp3",
      "tabla-beat": "/sounds/tabla-beat.mp3",
    }

    const loadedSounds = new Map<SoundType, AudioBuffer>()

    for (const [soundType, url] of Object.entries(soundFiles)) {
      try {
        // Create synthetic audio buffers for demo (in real app, load actual files)
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate)
        const data = buffer.getChannelData(0)

        // Generate different tones for different sound types
        const frequency = getSoundFrequency(soundType as SoundType)
        for (let i = 0; i < data.length; i++) {
          data[i] = Math.sin((2 * Math.PI * frequency * i) / ctx.sampleRate) * 0.1
        }

        loadedSounds.set(soundType as SoundType, buffer)
      } catch (error) {
        console.warn(`Failed to load sound: ${soundType}`, error)
      }
    }

    setSounds(loadedSounds)
  }

  const getSoundFrequency = (soundType: SoundType): number => {
    const frequencies: Record<SoundType, number> = {
      hover: 800,
      click: 1000,
      success: 523, // C5
      error: 220, // A3
      notification: 659, // E5
      scroll: 440, // A4
      loading: 330, // E4
      "cultural-chime": 698, // F5
      "traditional-bell": 880, // A5
      "sitar-note": 293, // D4
      "tabla-beat": 110, // A2
    }
    return frequencies[soundType] || 440
  }

  const toggleSound = () => {
    setIsEnabled(!isEnabled)
    if (isEnabled && ambientAudio) {
      ambientAudio.pause()
    }
  }

  const setVolume = (newVolume: number) => {
    setVolumeState(Math.max(0, Math.min(1, newVolume)))
  }

  const playSound = (soundType: SoundType, options: { volume?: number; loop?: boolean } = {}) => {
    if (!isEnabled || !audioContext || !sounds.has(soundType)) return

    try {
      const buffer = sounds.get(soundType)!
      const source = audioContext.createBufferSource()
      const gainNode = audioContext.createGain()

      source.buffer = buffer
      source.loop = options.loop || false
      gainNode.gain.value = (options.volume || volume) * 0.5 // Keep sounds subtle

      source.connect(gainNode)
      gainNode.connect(audioContext.destination)

      source.start()

      // Auto-stop after buffer duration if not looping
      if (!options.loop) {
        setTimeout(() => {
          try {
            source.stop()
          } catch (e) {
            // Source may already be stopped
          }
        }, buffer.duration * 1000)
      }
    } catch (error) {
      console.warn(`Failed to play sound: ${soundType}`, error)
    }
  }

  const stopSound = (soundType: SoundType) => {
    // In a real implementation, you'd track active sources to stop them
  }

  const playAmbient = (scene: string) => {
    if (!isEnabled) return

    const ambientFiles: Record<string, string> = {
      landing: "/sounds/ambient-india.mp3",
      rajasthan: "/sounds/ambient-desert.mp3",
      kerala: "/sounds/ambient-backwaters.mp3",
      gujarat: "/sounds/ambient-festival.mp3",
      "tamil-nadu": "/sounds/ambient-temple.mp3",
      punjab: "/sounds/ambient-fields.mp3",
    }

    const audioFile = ambientFiles[scene]
    if (audioFile) {
      if (ambientAudio) {
        ambientAudio.pause()
      }

      // Create placeholder ambient audio (in real app, use actual files)
      const audio = new Audio()
      audio.loop = true
      audio.volume = volume * 0.2 // Very subtle ambient

      // For demo, create a data URL with silence
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      canvas.width = 1
      canvas.height = 1
      if (ctx) {
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, 1, 1)
      }

      setAmbientAudio(audio)

      // Play with user interaction
      const playAmbientAudio = () => {
        audio.play().catch(() => {
          // Autoplay blocked, will play on user interaction
        })
      }

      document.addEventListener("click", playAmbientAudio, { once: true })
    }
  }

  const stopAmbient = () => {
    if (ambientAudio) {
      ambientAudio.pause()
      ambientAudio.currentTime = 0
    }
  }

  return (
    <SoundContext.Provider
      value={{
        isEnabled,
        volume,
        toggleSound,
        setVolume,
        playSound,
        stopSound,
        playAmbient,
        stopAmbient,
      }}
    >
      {children}
      <SoundControls />
    </SoundContext.Provider>
  )
}

function SoundControls() {
  const { isEnabled, volume, toggleSound, setVolume } = useSound()

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center space-x-2 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-orange-200">
      <Button variant="ghost" size="sm" onClick={toggleSound} className="text-orange-600 hover:bg-orange-50">
        {isEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </Button>

      {isEnabled && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
          className="w-16 h-1 bg-orange-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #f97316 0%, #f97316 ${volume * 100}%, #fed7aa ${volume * 100}%, #fed7aa 100%)`,
          }}
        />
      )}
    </div>
  )
}

// Hook for easy sound integration in components
export function useCulturalSounds() {
  const { playSound } = useSound()

  return {
    playHover: () => playSound("hover"),
    playClick: () => playSound("click"),
    playSuccess: () => playSound("success"),
    playError: () => playSound("error"),
    playCulturalChime: () => playSound("cultural-chime"),
    playTraditionalBell: () => playSound("traditional-bell"),
    playSitarNote: () => playSound("sitar-note"),
    playTabla: () => playSound("tabla-beat"),
  }
}
