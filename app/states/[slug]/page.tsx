"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function StatePage() {
  const params = useParams()
  const slug = params.slug as string
  const [activeTab, setActiveTab] = useState("products")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // State data - in a real app this would come from an API
  const stateData = {
    rajasthan: {
      name: "Rajasthan",
      nameHindi: "राजस्थान",
      tagline: "Land of Kings and Crafts",
      description:
        "Rajasthan's craft tradition spans over 1000 years, rooted in royal patronage and desert ingenuity. From the blue pottery of Jaipur to the intricate puppets of Udaipur, every craft tells a story of resilience and artistry.",
      colors: {
        primary: "#DC143C",
        secondary: "#F4A460",
        accent: "#FFD700",
      },
      backgroundImage: "/rajasthan-desert-palace.jpg",
      statistics: {
        artisans: 150,
        products: 1200,
        heritageSites: 35,
        festivals: 12,
      },
      specialties: [
        "Kathputli Puppets",
        "Blue Pottery",
        "Block Print Textiles",
        "Kundan Jewelry",
        "Miniature Paintings",
        "Leather Crafts",
      ],
      culturalStory:
        "The royal courts of Rajasthan have been patrons of arts and crafts for centuries. The Maharajas commissioned the finest artisans to create masterpieces that adorned their palaces. Today, these traditions continue in the hands of skilled craftspeople who have inherited techniques passed down through generations.",
      featuredProducts: [
        {
          id: 1,
          name: "Royal Kathputli Puppet",
          price: 1250,
          originalPrice: 1800,
          image: "/rajasthan-desert-palace.jpg",
          artisan: "Ramesh Kumar",
          rating: 4.9,
          reviews: 147,
        },
        {
          id: 2,
          name: "Jaipur Blue Pottery Vase",
          price: 850,
          originalPrice: 1200,
          image: "/indian-artisan-crafting-pottery.jpg",
          artisan: "Meera Devi",
          rating: 4.8,
          reviews: 89,
        },
        {
          id: 3,
          name: "Block Print Bedsheet Set",
          price: 2200,
          originalPrice: 2800,
          image: "/gujarat-colorful-textiles-kites.jpg",
          artisan: "Suresh Chand",
          rating: 4.9,
          reviews: 203,
        },
      ],
      featuredArtisans: [
        {
          id: 1,
          name: "Ramesh Kumar",
          craft: "Kathputli Puppets",
          experience: "25 years",
          location: "Udaipur",
          image: "/rajasthan-desert-palace.jpg",
          story: "Third generation puppet maker preserving ancient traditions",
          rating: 4.9,
          products: 45,
        },
        {
          id: 2,
          name: "Meera Devi",
          craft: "Blue Pottery",
          experience: "18 years",
          location: "Jaipur",
          image: "/indian-artisan-crafting-pottery.jpg",
          story: "Master potter creating contemporary designs with traditional techniques",
          rating: 4.8,
          products: 32,
        },
      ],
    },
  }

  const currentState = stateData[slug as keyof typeof stateData] || stateData.rajasthan

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
            src={currentState.backgroundImage || "/placeholder.svg"}
            alt={currentState.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 via-orange-800/70 to-yellow-900/80" />
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <motion.div
            className="text-white max-w-3xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{currentState.name}</h1>
            <p className="text-2xl text-yellow-200 mb-2 font-medium">{currentState.nameHindi}</p>
            <p className="text-xl mb-6 italic">{currentState.tagline}</p>
            <p className="text-lg mb-8 leading-relaxed">{currentState.description}</p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                Shop {currentState.name} Crafts
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
              { icon: Users, number: currentState.statistics.artisans, label: "Master Artisans" },
              { icon: ShoppingBag, number: currentState.statistics.products, label: "Unique Products" },
              { icon: MapPin, number: currentState.statistics.heritageSites, label: "Heritage Sites" },
              { icon: Calendar, number: currentState.statistics.festivals, label: "Annual Festivals" },
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
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{currentState.culturalStory}</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {currentState.specialties.map((specialty, index) => (
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
                  {currentState.featuredProducts.map((product, index) => (
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
                            src={product.image || "/placeholder.svg"}
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
                              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                            </Badge>
                          </div>
                        </div>

                        <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                          <div className="mb-4">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                            <p className="text-sm text-orange-600 mb-2">by {product.artisan}</p>
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
                              <span className="text-lg text-gray-500 line-through ml-2">₹{product.originalPrice}</span>
                            </div>
                          </div>

                          <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
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
                  {currentState.featuredArtisans.map((artisan, index) => (
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
