"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { RobustImage } from "@/components/ui/robust-image"
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Heart,
  Sparkles,
  Gift,
  Truck,
  Shield,
  Tag,
  ArrowRight,
  Star,
  Crown,
} from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: "RAJ001",
      name: "Royal Kathputli Puppet",
      nameHindi: "राजकुमारी कठपुतली",
      price: 1250,
      originalPrice: 1800,
      quantity: 1,
      image: "/rajasthani-kathputli-puppet-colorful-traditional.jpg",
      artisan: "Ramesh Kumar",
      state: "Rajasthan",
      stateColor: "from-red-500 to-orange-600",
      borderPattern: "border-red-200 bg-gradient-to-r from-red-50 to-orange-50",
      inStock: true,
      culturalSignificance: "Traditional Rajasthani string puppet art form dating back to 1000 years",
    },
    {
      id: "GUJ001",
      name: "Bandhani Silk Dupatta",
      nameHindi: "बांधनी रेशम दुपट्टा",
      price: 850,
      originalPrice: 1200,
      quantity: 2,
      image: "/gujarati-bandhani-silk-dupatta-colorful-tie-dye.jpg",
      artisan: "Meera Patel",
      state: "Gujarat",
      stateColor: "from-blue-500 to-green-600",
      borderPattern: "border-blue-200 bg-gradient-to-r from-blue-50 to-green-50",
      inStock: true,
      culturalSignificance: "Ancient tie-dye technique creating beautiful patterns",
    },
    {
      id: "TN001",
      name: "Bronze Ganesha Idol",
      nameHindi: "कांस्य गणेश मूर्ति",
      price: 2200,
      originalPrice: 2800,
      quantity: 1,
      image: "/tamil-nadu-bronze-ganesha-idol-traditional-sculptu.jpg",
      artisan: "Suresh Kumar",
      state: "Tamil Nadu",
      stateColor: "from-yellow-600 to-amber-700",
      borderPattern: "border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50",
      inStock: false,
      culturalSignificance: "Traditional Chola bronze casting technique from 9th century",
    },
  ])

  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)

  const playBellSound = () => {
    // Cultural temple bell sound effect (would be actual audio in production)
    console.log("🔔 Temple bell chime - item added to cart")
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id))
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
    playBellSound()
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode === "DIWALI20") {
      setAppliedPromo("DIWALI20")
      setPromoCode("")
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 2000)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const originalTotal = cartItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0)
  const savings = originalTotal - subtotal
  const promoDiscount = appliedPromo === "DIWALI20" ? Math.round(subtotal * 0.2) : 0
  const shipping = subtotal > 1500 ? 0 : 99
  const total = subtotal - promoDiscount + shipping

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23f97316' fillOpacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-200 shadow-lg"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/explore"
                className="flex items-center text-orange-600 hover:text-orange-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Continue Shopping
              </Link>

              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    BharatKart
                  </h1>
                  <p className="text-xs text-orange-500 font-medium">Royal Shopping Basket</p>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-orange-600 hover:bg-orange-50">
                <Heart className="w-5 h-5" />
              </Button>
              <Link href="/get-started">
                <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Royal Shopping Basket
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            {cartItems.length} cultural {cartItems.length === 1 ? "treasure" : "treasures"} awaiting your blessing
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <ShoppingBag className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cultural Journey Awaits</h2>
            <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
              Discover the magnificent heritage of India through authentic crafts from master artisans
            </p>
            <Link href="/states">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <Sparkles className="mr-2 w-5 h-5" />
                Explore States
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100, scale: 0.8 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <Card
                      className={`p-6 border-2 ${item.borderPattern} hover:shadow-xl transition-all duration-300 relative overflow-hidden`}
                    >
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.stateColor}`} />

                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative w-full md:w-40 h-40 flex-shrink-0">
                          <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-red-200 rounded-lg transform rotate-1" />
                          <div className="relative bg-white p-2 rounded-lg shadow-lg">
                            <RobustImage
                              src={item.image}
                              alt={item.name}
                              className="w-full h-32 object-cover rounded"
                              context="product"
                            />
                          </div>
                          {!item.inStock && (
                            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                              <Badge className="bg-red-500 text-white">Out of Stock</Badge>
                            </div>
                          )}
                          <Badge
                            className={`absolute -top-2 -right-2 bg-gradient-to-r ${item.stateColor} text-white shadow-lg`}
                          >
                            {item.state}
                          </Badge>
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
                              <p className="text-orange-600 font-medium text-lg mb-1" style={{ fontFamily: "serif" }}>
                                {item.nameHindi}
                              </p>
                              <div className="flex items-center space-x-2 mb-2">
                                <Star className="w-4 h-4 text-orange-500 fill-current" />
                                <p className="text-sm text-gray-600">
                                  by <span className="font-medium text-orange-700">{item.artisan}</span>
                                </p>
                              </div>
                              <p className="text-xs text-gray-500 italic max-w-md">{item.culturalSignificance}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl font-bold text-gray-800">
                                ₹{item.price.toLocaleString("en-IN")}
                              </span>
                              {item.originalPrice > item.price && (
                                <span className="text-sm text-gray-500 line-through">
                                  ₹{item.originalPrice.toLocaleString("en-IN")}
                                </span>
                              )}
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                Save ₹{(item.originalPrice - item.price).toLocaleString("en-IN")}
                              </Badge>
                            </div>

                            <div className="flex items-center space-x-4">
                              <span className="text-sm font-medium text-gray-700">Quantity:</span>
                              <div className="flex items-center bg-white border-2 border-orange-200 rounded-full shadow-inner">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="text-orange-600 hover:bg-orange-50 rounded-full w-10 h-10"
                                  disabled={!item.inStock}
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <div className="px-4 py-2 font-bold text-lg min-w-[3rem] text-center">
                                  <span className="text-gray-800">{item.quantity}</span>
                                  <div className="text-xs text-orange-600" style={{ fontFamily: "serif" }}>
                                    {/* Devanagari numerals option */}
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="text-orange-600 hover:bg-orange-50 rounded-full w-10 h-10"
                                  disabled={!item.inStock}
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          {!item.inStock && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg"
                            >
                              <p className="text-sm text-red-700 font-medium">
                                🙏 This sacred item is currently unavailable. Please remove it to continue your cultural
                                journey.
                              </p>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="p-6 border-2 border-orange-100 bg-gradient-to-r from-orange-50 to-yellow-50">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Tag className="w-5 h-5 mr-2 text-orange-600" />
                    Festival Blessings & Offers
                  </h3>
                  {appliedPromo ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center justify-between p-4 bg-green-50 border-2 border-green-200 rounded-lg relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-emerald-100 opacity-50" />
                      <div className="flex items-center relative z-10">
                        <Badge className="bg-green-500 text-white mr-3 shadow-lg">{appliedPromo}</Badge>
                        <span className="text-green-700 font-medium">
                          🎉 Diwali blessing applied! 20% divine discount
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setAppliedPromo(null)}
                        className="text-green-700 hover:bg-green-100 relative z-10"
                      >
                        Remove
                      </Button>
                    </motion.div>
                  ) : (
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Enter sacred code (try DIWALI20 for divine blessings)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="border-orange-200 focus:border-orange-500 bg-white"
                      />
                      <Button
                        onClick={applyPromoCode}
                        className="bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 shadow-lg"
                      >
                        Apply Blessing
                      </Button>
                    </div>
                  )}
                </Card>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="p-6 border-2 border-orange-100 sticky top-24 bg-gradient-to-br from-white to-orange-50 shadow-xl">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Royal Treasury</h3>
                  <p className="text-sm text-orange-600">Sacred Purchase Summary</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-lg">
                    <span>Subtotal ({cartItems.length} treasures)</span>
                    <span className="font-semibold">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Divine Savings</span>
                    <span>-₹{savings.toLocaleString("en-IN")}</span>
                  </div>
                  {appliedPromo && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-between text-green-600 font-medium"
                    >
                      <span>Festival Blessing ({appliedPromo})</span>
                      <span>-₹{promoDiscount.toLocaleString("en-IN")}</span>
                    </motion.div>
                  )}
                  <div className="flex justify-between">
                    <span>Sacred Delivery</span>
                    <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                      {shipping === 0 ? "🆓 FREE" : `₹${shipping}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-sm text-orange-600 bg-orange-50 p-2 rounded">
                      Add ₹{(1500 - subtotal).toLocaleString("en-IN")} more for free sacred delivery
                    </p>
                  )}
                  <hr className="border-orange-200" />
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total Blessing</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-100">
                  <div className="flex items-center text-sm text-gray-700">
                    <Truck className="w-4 h-4 mr-2 text-orange-600" />
                    Sacred delivery blessed by tradition
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Shield className="w-4 h-4 mr-2 text-orange-600" />
                    Protected by cultural trust & security
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <Gift className="w-4 h-4 mr-2 text-orange-600" />
                    Blessed gift wrapping available
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href="/checkout">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                      disabled={cartItems.some((item) => !item.inStock)}
                    >
                      <Crown className="mr-2 w-5 h-5" />
                      Begin Sacred Checkout
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/states">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full border-2 border-orange-300 text-orange-600 bg-transparent hover:bg-orange-50"
                    >
                      <Sparkles className="mr-2 w-4 h-4" />
                      Explore More Treasures
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        )}

        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            >
              <div className="text-6xl">🎉</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
