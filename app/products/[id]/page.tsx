"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Star,
  Heart,
  ShoppingBag,
  Share2,
  ZoomIn,
  Truck,
  Shield,
  RotateCcw,
  Award,
  Sparkles,
  Plus,
  Minus,
  Play,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ProductDetailPage() {
  const params = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const [isWishlisted, setIsWishlisted] = useState(false)

  // Sample product data - in real app this would come from API
  const product = {
    id: "RAJ001",
    name: "Royal Kathputli Puppet",
    nameHindi: "राजकुमारी कठपुतली",
    price: 1250,
    originalPrice: 1800,
    discount: 30,
    rating: 4.8,
    reviewCount: 147,
    inStock: true,
    stockCount: 25,
    images: [
      "/rajasthan-desert-palace.jpg",
      "/indian-artisan-crafting-pottery.jpg",
      "/gujarat-colorful-textiles-kites.jpg",
      "/tamil-nadu-bronze-temple.jpg",
    ],
    description:
      "Handcrafted Kathputli puppet representing 500+ years of Rajasthani tradition. Each puppet is meticulously carved from mango wood and dressed in vibrant traditional attire with intricate embroidery and mirror work.",
    culturalSignificance:
      "Kathputli is an ancient string puppet theatre form that originated in Rajasthan over 1000 years ago. These puppets were traditionally used by traveling bards to tell stories of heroic deeds and romantic tales.",
    materials: ["Mango Wood", "Cotton Fabric", "Natural Colors", "Mirror Work"],
    dimensions: "30cm height, 15cm width",
    weight: "200g",
    deliveryTime: "5-7 days",
    artisan: {
      id: "ART001",
      name: "Ramesh Kumar",
      experience: "25 years",
      location: "Udaipur, Rajasthan",
      specialty: "Traditional Puppet Making",
      story: "Third generation puppet maker preserving ancient Rajasthani traditions",
      photo: "/rajasthan-desert-palace.jpg",
      rating: 4.9,
      totalSales: 1200,
    },
    features: {
      handmade: true,
      ecoFriendly: true,
      fastDelivery: true,
      giftWrapping: true,
      customizable: false,
    },
    reviews: [
      {
        id: 1,
        user: "Priya Sharma",
        rating: 5,
        comment: "Absolutely beautiful craftsmanship! The attention to detail is incredible.",
        date: "2024-01-15",
        verified: true,
      },
      {
        id: 2,
        user: "Amit Patel",
        rating: 4,
        comment: "Great quality puppet. My daughter loves it. Fast delivery too.",
        date: "2024-01-10",
        verified: true,
      },
    ],
    relatedProducts: [
      {
        id: "RAJ002",
        name: "Blue Pottery Vase",
        price: 850,
        image: "/indian-artisan-crafting-pottery.jpg",
        rating: 4.7,
      },
      {
        id: "RAJ003",
        name: "Block Print Bedsheet",
        price: 2200,
        image: "/gujarat-colorful-textiles-kites.jpg",
        rating: 4.9,
      },
    ],
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
              <Link href="/explore" className="flex items-center text-orange-600 hover:text-orange-700">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Products
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

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-orange-600">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-orange-600 relative">
                <ShoppingBag className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1">3</Badge>
              </Button>
              <Link href="/get-started">
                <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square overflow-hidden rounded-xl bg-white shadow-lg">
                <img
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <Button size="sm" className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800">
                  <ZoomIn className="w-4 h-4" />
                </Button>
                {product.discount > 0 && (
                  <Badge className="absolute top-4 left-4 bg-red-500 text-white">{product.discount}% OFF</Badge>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? "border-orange-500" : "border-gray-200"
                    }`}
                  >
                    <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="space-y-6">
              {/* Title and Rating */}
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                <p className="text-lg text-orange-600 font-medium mb-2">{product.nameHindi}</p>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) ? "text-yellow-500 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
                  <Badge variant="secondary" className="text-green-600">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-800">₹{product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                )}
                <Badge className="bg-green-100 text-green-800">Save ₹{product.originalPrice - product.price}</Badge>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {product.features.handmade && (
                  <Badge variant="outline" className="border-orange-300 text-orange-600">
                    <Award className="w-3 h-3 mr-1" />
                    Handmade
                  </Badge>
                )}
                {product.features.ecoFriendly && (
                  <Badge variant="outline" className="border-green-300 text-green-600">
                    Eco-Friendly
                  </Badge>
                )}
                {product.features.fastDelivery && (
                  <Badge variant="outline" className="border-blue-300 text-blue-600">
                    <Truck className="w-3 h-3 mr-1" />
                    Fast Delivery
                  </Badge>
                )}
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center border border-orange-200 rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-orange-600"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-orange-600"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-gray-500">({product.stockCount} available)</span>
                </div>

                <div className="flex space-x-4">
                  <Button
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`border-orange-300 ${
                      isWishlisted ? "bg-orange-50 text-red-500" : "text-orange-600"
                    } hover:bg-orange-50`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium">Free Delivery</p>
                    <p className="text-xs text-gray-600">{product.deliveryTime}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium">Easy Returns</p>
                    <p className="text-xs text-gray-600">30 day return</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium">Secure Payment</p>
                    <p className="text-xs text-gray-600">100% protected</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex space-x-1 bg-orange-100 rounded-lg p-1 mb-8 max-w-2xl">
            {[
              { id: "description", label: "Description" },
              { id: "artisan", label: "Meet the Artisan" },
              { id: "reviews", label: "Reviews" },
              { id: "shipping", label: "Shipping & Returns" },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className={
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                    : "text-orange-600 hover:bg-orange-200"
                }
              >
                {tab.label}
              </Button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "description" && (
              <motion.div
                key="description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Product Description</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

                  <h4 className="text-lg font-semibold mb-3 text-gray-800">Cultural Significance</h4>
                  <p className="text-gray-700 mb-6 leading-relaxed">{product.culturalSignificance}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-800">Specifications</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-medium">Materials:</span>
                      <span className="text-gray-600">{product.materials.join(", ")}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-medium">Dimensions:</span>
                      <span className="text-gray-600">{product.dimensions}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-medium">Weight:</span>
                      <span className="text-gray-600">{product.weight}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-medium">Delivery Time:</span>
                      <span className="text-gray-600">{product.deliveryTime}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "artisan" && (
              <motion.div
                key="artisan"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="p-8 bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex items-center space-x-6">
                      <img
                        src={product.artisan.photo || "/placeholder.svg"}
                        alt={product.artisan.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-orange-200"
                      />
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{product.artisan.name}</h3>
                        <p className="text-orange-600 font-medium mb-1">{product.artisan.specialty}</p>
                        <p className="text-gray-600 text-sm mb-2">
                          {product.artisan.location} • {product.artisan.experience}
                        </p>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                            <span className="text-sm font-medium">{product.artisan.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500">{product.artisan.totalSales} sales</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-3 text-gray-800">Artisan's Story</h4>
                      <p className="text-gray-700 mb-4 leading-relaxed">{product.artisan.story}</p>
                      <div className="flex space-x-4">
                        <Button
                          variant="outline"
                          className="border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                        >
                          View Profile
                        </Button>
                        <Button
                          variant="outline"
                          className="border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Watch Story
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">Customer Reviews</h3>
                    <div className="space-y-4">
                      {product.reviews.map((review) => (
                        <Card key={review.id} className="p-6 border-orange-100">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-gray-800">{review.user}</h4>
                              <div className="flex items-center space-x-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                {review.verified && (
                                  <Badge variant="secondary" className="text-green-600 text-xs">
                                    Verified Purchase
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-gray-800">Write a Review</h4>
                    <Card className="p-6 border-orange-100">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Rating</label>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-6 h-6 text-gray-300 cursor-pointer hover:text-yellow-500" />
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Your Review</label>
                          <Textarea
                            placeholder="Share your experience with this product..."
                            className="border-orange-200 focus:border-orange-500"
                          />
                        </div>
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white">
                          Submit Review
                        </Button>
                      </div>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Related Products */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 text-gray-800">You Might Also Like</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.relatedProducts.map((relatedProduct, index) => (
              <motion.div
                key={relatedProduct.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-4 right-4 bg-white/80 hover:bg-white text-red-500"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="p-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-2">{relatedProduct.name}</h4>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-gray-800">₹{relatedProduct.price}</span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                        <span className="text-sm">{relatedProduct.rating}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                      View Product
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
