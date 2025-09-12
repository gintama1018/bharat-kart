"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PremiumButton } from "@/components/cultural/premium-buttons"
import { PremiumInput } from "@/components/cultural/premium-inputs"
import { ThreeDBackground } from "@/components/cultural/three-d-background"
import { useSound } from "@/components/cultural/advanced-sound-manager"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Mail, Lock, User, Phone, MapPin, Sparkles } from "lucide-react"
import Link from "next/link"

export default function GetStartedPage() {
  const [mode, setMode] = useState<"choice" | "login" | "register">("choice")
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { playSound } = useSound()

  const culturalPatterns = [
    "M12 2L2 7L12 12L22 7L12 2Z",
    "M12 2L2 7V17L12 22L22 17V7L12 2Z",
    "M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2Z",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format"
    } else if (currentStep === 2) {
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
      if (!formData.location.trim()) newErrors.location = "State selection is required"
    } else if (currentStep === 3) {
      if (!formData.password.trim()) newErrors.password = "Password is required"
      else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      playSound("success")
      setStep(step + 1)
    } else {
      playSound("error")
    }
  }

  const handleBack = () => {
    playSound("click")
    setStep(step - 1)
  }

  const handleModeChange = (newMode: typeof mode) => {
    playSound("click")
    setMode(newMode)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 relative overflow-hidden">
      <ThreeDBackground scene="landing" intensity="low" />

      {/* Cultural Background Elements */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <svg width="60" height="60" viewBox="0 0 24 24" className="text-orange-600">
              <path fill="currentColor" d={culturalPatterns[i % culturalPatterns.length]} />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/30 rounded-full"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Header */}
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>

            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  BharatKart
                </h1>
                <p className="text-sm text-orange-600 font-medium">भारत कार्ट</p>
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {mode === "choice" && (
              <motion.div
                key="choice"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-8 bg-white/80 backdrop-blur-md border-orange-200 shadow-xl">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Heritage Gateway</h2>
                    <p className="text-gray-600">Begin your journey through India's cultural treasures</p>
                  </div>

                  <div className="space-y-4">
                    <PremiumButton
                      onClick={() => handleModeChange("login")}
                      variant="primary"
                      size="lg"
                      className="w-full py-6 text-lg"
                    >
                      <Mail className="w-5 h-5 mr-3" />
                      Sign In to Your Account
                    </PremiumButton>

                    <PremiumButton
                      onClick={() => handleModeChange("register")}
                      variant="secondary"
                      size="lg"
                      className="w-full py-6 text-lg"
                    >
                      <User className="w-5 h-5 mr-3" />
                      Create New Account
                    </PremiumButton>
                  </div>

                  <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500 mb-4">Or continue as guest</p>
                    <Link href="/explore">
                      <PremiumButton variant="cultural" className="text-orange-600 hover:text-orange-700">
                        Explore Without Account
                      </PremiumButton>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            )}

            {mode === "login" && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-8 bg-white/80 backdrop-blur-md border-orange-200 shadow-xl">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Heritage Gateway</h2>
                    <p className="text-gray-600">Welcome back to your cultural journey</p>
                  </div>

                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <PremiumInput
                      label="Email Address"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(value) => handleInputChange("email", value)}
                      error={errors.email}
                      icon={<Mail className="w-5 h-5" />}
                    />

                    <PremiumInput
                      label="Password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(value) => handleInputChange("password", value)}
                      error={errors.password}
                      icon={<Lock className="w-5 h-5" />}
                    />

                    <PremiumButton type="submit" variant="primary" size="lg" className="w-full py-3">
                      Sign In
                    </PremiumButton>
                  </form>

                  <div className="mt-6 text-center">
                    <PremiumButton
                      onClick={() => handleModeChange("choice")}
                      variant="cultural"
                      className="text-orange-600 hover:text-orange-700 text-sm"
                    >
                      ← Back to options
                    </PremiumButton>
                  </div>
                </Card>
              </motion.div>
            )}

            {mode === "register" && (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-8 bg-white/80 backdrop-blur-md border-orange-200 shadow-xl">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Cultural Discovery</h2>
                    <p className="text-gray-600">Join our community of heritage enthusiasts</p>

                    {/* Progress Mandala */}
                    <div className="flex justify-center mt-4">
                      <div className="flex space-x-2">
                        {[1, 2, 3].map((s) => (
                          <motion.div
                            key={s}
                            className={`w-3 h-3 rounded-full transition-all ${s <= step ? "bg-orange-500" : "bg-orange-200"}`}
                            animate={{ scale: s === step ? 1.2 : 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.form
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <PremiumInput
                          label="Full Name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(value) => handleInputChange("name", value)}
                          error={errors.name}
                          icon={<User className="w-5 h-5" />}
                        />

                        <PremiumInput
                          label="Email Address"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(value) => handleInputChange("email", value)}
                          error={errors.email}
                          success={formData.email && !errors.email && /\S+@\S+\.\S+/.test(formData.email)}
                          icon={<Mail className="w-5 h-5" />}
                        />

                        <PremiumButton
                          type="button"
                          onClick={handleNext}
                          variant="primary"
                          size="lg"
                          className="w-full py-3"
                        >
                          Continue
                        </PremiumButton>
                      </motion.form>
                    )}

                    {step === 2 && (
                      <motion.form
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <PremiumInput
                          label="Phone Number"
                          placeholder="+91 XXXXX XXXXX"
                          value={formData.phone}
                          onChange={(value) => handleInputChange("phone", value)}
                          error={errors.phone}
                          icon={<Phone className="w-5 h-5" />}
                        />

                        <PremiumInput
                          label="Your State"
                          placeholder="Select your state"
                          value={formData.location}
                          onChange={(value) => handleInputChange("location", value)}
                          error={errors.location}
                          icon={<MapPin className="w-5 h-5" />}
                        />

                        <div className="flex space-x-3">
                          <PremiumButton
                            type="button"
                            onClick={handleBack}
                            variant="secondary"
                            size="lg"
                            className="flex-1"
                          >
                            Back
                          </PremiumButton>
                          <PremiumButton
                            type="button"
                            onClick={handleNext}
                            variant="primary"
                            size="lg"
                            className="flex-1"
                          >
                            Continue
                          </PremiumButton>
                        </div>
                      </motion.form>
                    )}

                    {step === 3 && (
                      <motion.form
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <PremiumInput
                          label="Create Password"
                          type="password"
                          placeholder="Create a strong password"
                          value={formData.password}
                          onChange={(value) => handleInputChange("password", value)}
                          error={errors.password}
                          success={formData.password && formData.password.length >= 6}
                          icon={<Lock className="w-5 h-5" />}
                        />

                        <PremiumInput
                          label="Confirm Password"
                          type="password"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(value) => handleInputChange("confirmPassword", value)}
                          error={errors.confirmPassword}
                          success={formData.confirmPassword && formData.password === formData.confirmPassword}
                          icon={<Lock className="w-5 h-5" />}
                        />

                        <div className="flex space-x-3">
                          <PremiumButton
                            type="button"
                            onClick={handleBack}
                            variant="secondary"
                            size="lg"
                            className="flex-1"
                          >
                            Back
                          </PremiumButton>
                          <PremiumButton
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="flex-1"
                            onClick={() => {
                              if (validateStep(3)) {
                                playSound("success")
                                // Handle form submission
                              } else {
                                playSound("error")
                              }
                            }}
                          >
                            Create Account
                          </PremiumButton>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>

                  <div className="mt-6 text-center">
                    <PremiumButton
                      onClick={() => handleModeChange("choice")}
                      variant="cultural"
                      className="text-orange-600 hover:text-orange-700 text-sm"
                    >
                      ← Back to options
                    </PremiumButton>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
