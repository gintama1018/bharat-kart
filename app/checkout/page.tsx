"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Building,
  Wallet,
  Truck,
  Shield,
  CheckCircle,
  Sparkles,
  MapPin,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  })
  
  const { items, totalAmount, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const steps = [
    { id: 1, title: "Address", icon: MapPin },
    { id: 2, title: "Delivery", icon: Truck },
    { id: 3, title: "Payment", icon: CreditCard },
    { id: 4, title: "Review", icon: CheckCircle },
  ]

  const shipping = 0 // Free shipping
  const total = totalAmount + shipping

  const handlePayment = async () => {
    if (!user) {
      toast.error('Please sign in to complete your order')
      router.push('/auth')
      return
    }

    if (!paymentMethod) {
      toast.error('Please select a payment method')
      return
    }

    setIsProcessing(true)

    try {
      let paymentResponse
      
      if (paymentMethod === 'razorpay' || paymentMethod === 'upi') {
        // Use Razorpay for UPI and card payments in India
        paymentResponse = await fetch('/api/payments/razorpay', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: total,
            currency: 'INR',
            receipt: `order_${Date.now()}`,
            notes: {
              userId: user.id,
              items: items.length,
            },
          }),
        })
      } else {
        // Use Stripe for international payments
        paymentResponse = await fetch('/api/payments/stripe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: total,
            currency: 'inr',
            metadata: {
              userId: user.id,
              items: items.length,
            },
          }),
        })
      }

      const paymentData = await paymentResponse.json()

      if (!paymentResponse.ok) {
        throw new Error(paymentData.error || 'Payment setup failed')
      }

      // For demo purposes, we'll simulate successful payment
      setTimeout(() => {
        toast.success('Payment successful! Order placed.')
        clearCart()
        router.push('/orders')
      }, 2000)

    } catch (error: any) {
      console.error('Payment error:', error)
      toast.error(error.message || 'Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleAddressChange = (field: string, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-200"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/cart" className="flex items-center text-orange-600 hover:text-orange-700">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Cart
              </Link>

              <Link href="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    BharatKart
                  </h1>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">Secure Checkout</span>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-center space-x-4 md:space-x-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    currentStep >= step.id
                      ? "bg-gradient-to-r from-orange-500 to-red-600 border-orange-500 text-white"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${currentStep >= step.id ? "text-orange-600" : "text-gray-400"}`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${currentStep > step.id ? "bg-orange-500" : "bg-gray-300"}`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Address */}
              {currentStep === 1 && (
                <motion.div
                  key="address"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <Card className="p-6 border-orange-100">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Delivery Address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          placeholder="Enter first name" 
                          value={shippingAddress.firstName}
                          onChange={(e) => handleAddressChange('firstName', e.target.value)}
                          className="mt-1" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          placeholder="Enter last name" 
                          value={shippingAddress.lastName}
                          onChange={(e) => handleAddressChange('lastName', e.target.value)}
                          className="mt-1" 
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="Enter email address" 
                          value={shippingAddress.email}
                          onChange={(e) => handleAddressChange('email', e.target.value)}
                          className="mt-1" 
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          placeholder="+91 XXXXX XXXXX" 
                          value={shippingAddress.phone}
                          onChange={(e) => handleAddressChange('phone', e.target.value)}
                          className="mt-1" 
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input 
                          id="address" 
                          placeholder="House no, Building, Street" 
                          value={shippingAddress.address}
                          onChange={(e) => handleAddressChange('address', e.target.value)}
                          className="mt-1" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input 
                          id="city" 
                          placeholder="Enter city" 
                          value={shippingAddress.city}
                          onChange={(e) => handleAddressChange('city', e.target.value)}
                          className="mt-1" 
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Select value={shippingAddress.state} onValueChange={(value) => handleAddressChange('state', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rajasthan">Rajasthan</SelectItem>
                            <SelectItem value="gujarat">Gujarat</SelectItem>
                            <SelectItem value="maharashtra">Maharashtra</SelectItem>
                            <SelectItem value="kerala">Kerala</SelectItem>
                            <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                            <SelectItem value="west-bengal">West Bengal</SelectItem>
                            <SelectItem value="punjab">Punjab</SelectItem>
                            <SelectItem value="karnataka">Karnataka</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="pincode">PIN Code</Label>
                        <Input 
                          id="pincode" 
                          placeholder="Enter PIN code" 
                          value={shippingAddress.pincode}
                          onChange={(e) => handleAddressChange('pincode', e.target.value)}
                          className="mt-1" 
                        />
                      </div>
                    </div>
                    <Button
                      onClick={() => setCurrentStep(2)}
                      className="mt-6 bg-gradient-to-r from-orange-500 to-red-600 text-white"
                    >
                      Continue to Delivery
                    </Button>
                  </Card>
                </motion.div>
              )}

              {/* Step 2: Delivery */}
              {currentStep === 2 && (
                <motion.div
                  key="delivery"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <Card className="p-6 border-orange-100">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Delivery Options</h2>
                    <div className="space-y-4">
                      <div className="p-4 border-2 border-orange-200 rounded-lg bg-orange-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-800">Standard Delivery</h3>
                            <p className="text-sm text-gray-600">5-7 business days</p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-green-600">FREE</span>
                            <p className="text-xs text-gray-500">Above ₹1500</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-800">Express Delivery</h3>
                            <p className="text-sm text-gray-600">2-3 business days</p>
                          </div>
                          <span className="text-lg font-bold text-gray-800">₹199</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-4 mt-6">
                      <Button
                        onClick={() => setCurrentStep(1)}
                        variant="outline"
                        className="border-orange-300 text-orange-600 bg-transparent"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={() => setCurrentStep(3)}
                        className="bg-gradient-to-r from-orange-500 to-red-600 text-white"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <Card className="p-6 border-orange-100">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Payment Method</h2>
                    <div className="space-y-4">
                      {[
                        { id: "razorpay", label: "Razorpay (UPI/Cards)", icon: Smartphone, desc: "Pay using UPI, Cards, Wallets" },
                        { id: "stripe", label: "International Cards", icon: CreditCard, desc: "Visa, Mastercard (International)" },
                        { id: "cod", label: "Cash on Delivery", icon: Wallet, desc: "Pay when you receive" },
                      ].map((method) => (
                        <div
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            paymentMethod === method.id
                              ? "border-orange-500 bg-orange-50"
                              : "border-gray-200 hover:border-orange-300"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <method.icon className="w-6 h-6 text-orange-600" />
                            <div>
                              <h3 className="font-semibold text-gray-800">{method.label}</h3>
                              <p className="text-sm text-gray-600">{method.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {paymentMethod === "card" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-6 p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" className="mt-1" />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div className="flex space-x-4 mt-6">
                      <Button
                        onClick={() => setCurrentStep(2)}
                        variant="outline"
                        className="border-orange-300 text-orange-600 bg-transparent"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={() => setCurrentStep(4)}
                        disabled={!paymentMethod}
                        className="bg-gradient-to-r from-orange-500 to-red-600 text-white"
                      >
                        Review Order
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <Card className="p-6 border-orange-100">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Review Your Order</h2>

                    <div className="space-y-6">
                      {/* Order Items */}
                      <div>
                        <h3 className="font-semibold mb-4">Order Items</h3>
                        <div className="space-y-3">
                          {items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                              <img
                                src={item.product.images?.[0] || "/placeholder.svg"}
                                alt={item.product.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium">{item.product.name}</h4>
                                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                              </div>
                              <span className="font-semibold">₹{item.product.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div>
                        <h3 className="font-semibold mb-2">Payment Method</h3>
                        <p className="text-gray-600 capitalize">{paymentMethod.replace(/([A-Z])/g, " $1")}</p>
                      </div>
                    </div>

                    <div className="flex space-x-4 mt-6">
                      <Button
                        onClick={() => setCurrentStep(3)}
                        variant="outline"
                        className="border-orange-300 text-orange-600 bg-transparent"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className="bg-gradient-to-r from-orange-500 to-red-600 text-white"
                      >
                        {isProcessing ? "Processing..." : `Pay ₹${total}`}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card className="p-6 border-orange-100 sticky top-24">
              <h3 className="text-xl font-bold mb-6 text-gray-800">Order Summary</h3>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.product.name} × {item.quantity}
                    </span>
                    <span>₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <div className="space-y-3 p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center text-sm text-gray-700">
                  <Shield className="w-4 h-4 mr-2 text-orange-600" />
                  100% secure payment
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Truck className="w-4 h-4 mr-2 text-orange-600" />
                  Free delivery in 5-7 days
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
