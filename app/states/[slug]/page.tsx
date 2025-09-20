"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CulturalLoading } from "@/components/cultural/cultural-loading"
import { getStateData } from "@/lib/states-data"
import { useCart } from "@/contexts/CartContext"
import {
  ArrowLeft,
  MapPin,
  Users,
  Star,
  Heart,
  ShoppingBag,
  Play,
  Calendar,
  Award,
  Sparkles,
  Filter,
  Grid3X3,
  List,
  Plus,
  Minus,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import toast from "react-hot-toast"

interface FeaturedProduct {
  id: number
  name: string
  description: string
  price: number
  originalPrice: number
  image: string
  artisan: string
  rating: number
  reviews: number
}

interface FeaturedArtisan {
  id: number
  name: string
  craft: string
  location: string
  experience: string
  story: string
  image: string
  rating: number
  products: number
}

export default function StatePage() {
  const params = useParams()
  const slug = params.slug as string
  const [activeTab, setActiveTab] = useState("products")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [loading, setLoading] = useState(true)
  const [stateData, setStateData] = useState<any>(null)
  const [products, setProducts] = useState<any[]>([])
  const [artisans, setArtisans] = useState<any[]>([])
  
  const { addToCart, totalItems } = useCart()

  useEffect(() => {
    const loadStateData = async () => {
      setLoading(true)
      
      try {
        // First try to get data from API
        const response = await fetch(`/api/states/${slug}`)
        if (response.ok) {
          const apiData = await response.json()
          setStateData(apiData.state)
          setProducts(apiData.products)
          setArtisans(apiData.artisans)
        } else {
          // Fallback to static data
          const fallbackData = getStateData(slug)
          if (fallbackData) {
            setStateData(fallbackData)
            setProducts(fallbackData.featuredProducts || [])
            setArtisans(fallbackData.featuredArtisans || [])
          }
        }
      } catch (error) {
        console.error('Error loading state data:', error)
        // Fallback to static data
        const fallbackData = getStateData(slug)
        if (fallbackData) {
          setStateData(fallbackData)
          setProducts(fallbackData.featuredProducts || [])
          setArtisans(fallbackData.featuredArtisans || [])
        }
      }
      
      setLoading(false)
    }

    loadStateData()
  }, [slug])

  const handleAddToCart = async (product: any) => {
    try {
      // For now, we'll create a mock product object
      // In a real app, this would come from the API
      const mockProduct = {
        id: product.id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        original_price: product.originalPrice,
        images: [product.image],
        category: 'handicraft',
        state_id: slug,
        artisan_id: '1',
        rating: product.rating,
        reviews_count: product.reviews,
        stock_quantity: 10,
        features: [],
        materials: [],
        dimensions: '',
        weight: '',
        is_featured: true,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      await addToCart(mockProduct)
    } catch (error) {
      toast.error('Failed to add item to cart')
    }
  }

  if (loading || !stateData) {
    return (
      <CulturalLoading 
        state={slug}
        theme={stateData?.theme || 'Cultural Heritage'}
        colorPrimary={stateData?.colors.primary || '#DC143C'}
        colorSecondary={stateData?.colors.secondary || '#FFD700'}
        colorAccent={stateData?.colors.accent || '#F4A460'}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-200"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/states" className="flex items-center text-orange-600 hover:text-orange-700">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to States
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

      {/* Hero Banner */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={stateData.backgroundImage || "/placeholder.svg"}
            alt={stateData.name}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${stateData.heroGradient}`} />
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <motion.div
            className="text-white max-w-3xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{stateData.name}</h1>
            <p className="text-2xl text-yellow-200 mb-2 font-medium">{stateData.nameHindi}</p>
            <p className="text-xl mb-6 italic">{stateData.tagline}</p>
            <p className="text-lg mb-8 leading-relaxed">{stateData.description}</p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                Shop {stateData.name} Crafts
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Cultural Stories
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 bg-white border-b border-orange-100">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {[
              { icon: Users, number: stateData.artisans_count || artisans.length || 0, label: "Master Artisans" },
              { icon: ShoppingBag, number: stateData.products_count || products.length || 0, label: "Unique Products" },
              { icon: MapPin, number: stateData.heritage_sites || 12, label: "Heritage Sites" },
              { icon: Calendar, number: stateData.festivals || 8, label: "Annual Festivals" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Cultural Heritage Section */}
      <section className="py-16 bg-gradient-to-br from-white via-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Cultural Heritage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{stateData.cultural_story || stateData.culturalStory}</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {(stateData.specialties || []).map((specialty: string, index: number) => (
              <motion.div
                key={specialty}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <Card className="p-4 text-center bg-white border-orange-200 hover:shadow-lg transition-all cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm">{specialty}</h3>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-8 bg-white border-b border-orange-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex space-x-1 bg-orange-100 rounded-lg p-1">
              {[
                { id: "products", label: "Products" },
                { id: "artisans", label: "Artisans" },
                { id: "heritage", label: "Heritage Sites" },
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

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  onClick={() => setViewMode("grid")}
                  size="sm"
                  className={
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                      : "border-orange-300 text-orange-600"
                  }
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  onClick={() => setViewMode("list")}
                  size="sm"
                  className={
                    viewMode === "list"
                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                      : "border-orange-300 text-orange-600"
                  }
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <Button variant="outline" className="border-orange-300 text-orange-600 bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {activeTab === "products" && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div
                  className={`grid gap-8 ${
                    viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                  }`}
                >
                  {products.map((product: any, index: number) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -10 }}
                    >
                      <Card
                        className={`overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                          viewMode === "list" ? "flex" : ""
                        }`}
                      >
                        <div className={`relative overflow-hidden ${viewMode === "list" ? "w-64 h-48" : "h-64"}`}>
                          <img
                            src={(product.images?.[0] || product.image) || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-4 right-4">
                            <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white text-red-500">
                              <Heart className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="absolute bottom-4 left-4">
                            <Badge className="bg-red-500 text-white">
                              {Math.round((((product.original_price || product.originalPrice) - product.price) / (product.original_price || product.originalPrice)) * 100)}% OFF
                            </Badge>
                          </div>
                        </div>

                        <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                          <div className="mb-4">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                            <p className="text-sm text-orange-600 mb-2">by {product.artisan?.name || product.artisan}</p>
                            <div className="flex items-center space-x-2 mb-3">
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium ml-1">{product.rating}</span>
                              </div>
                              <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <span className="text-2xl font-bold text-gray-800">₹{product.price}</span>
                              <span className="text-lg text-gray-500 line-through ml-2">₹{product.original_price || product.originalPrice}</span>
                            </div>
                          </div>

                          <Button 
                            onClick={() => handleAddToCart(product)}
                            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "artisans" && (
              <motion.div
                key="artisans"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {artisans.map((artisan: any, index: number) => (
                    <motion.div
                      key={artisan.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      whileHover={{ y: -10 }}
                    >
                      <Card className="overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={artisan.image || "/placeholder.svg"}
                            alt={artisan.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4 text-white">
                            <div className="flex items-center space-x-2 mb-2">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{artisan.rating}</span>
                            </div>
                            <Badge className="bg-white/20 text-white border-white/30">
                              {artisan.products} Products
                            </Badge>
                          </div>
                          <Button
                            size="sm"
                            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white border-white/30"
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="p-6">
                          <div className="mb-4">
                            <h3 className="text-xl font-bold text-gray-800 mb-1">{artisan.name}</h3>
                            <p className="text-orange-600 font-medium">{artisan.craft}</p>
                            <p className="text-sm text-gray-600">
                              {artisan.location} • {artisan.experience}
                            </p>
                          </div>

                          <p className="text-gray-700 text-sm mb-4">{artisan.story}</p>

                          <Button
                            variant="outline"
                            className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                          >
                            View Profile & Products
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
