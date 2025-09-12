"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  ShoppingBag,
  Heart,
  Star,
  MapPin,
  Users,
  Sparkles,
  Filter,
  Grid3X3,
  List,
  ArrowRight,
  Play,
  Calendar,
  Award,
  Globe,
} from "lucide-react"
import Link from "next/link"

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentFestival, setCurrentFestival] = useState(0)

  const festivals = [
    {
      name: "Diwali",
      nameHindi: "दीवाली",
      date: "Nov 12, 2024",
      description: "Festival of Lights",
      products: ["Diyas", "Rangoli", "Sweets"],
      color: "from-yellow-500 to-orange-600",
    },
    {
      name: "Holi",
      nameHindi: "होली",
      date: "Mar 14, 2025",
      description: "Festival of Colors",
      products: ["Gulal", "Pichkari", "Sweets"],
      color: "from-pink-500 to-purple-600",
    },
    {
      name: "Durga Puja",
      nameHindi: "दुर्गा पूजा",
      date: "Oct 9, 2024",
      description: "Divine Mother Festival",
      products: ["Idols", "Decorations", "Offerings"],
      color: "from-red-500 to-yellow-500",
    },
  ]

  const artisanStories = [
    {
      id: 1,
      name: "Ramesh Kumar",
      craft: "Kathputli Puppets",
      state: "Rajasthan",
      experience: "25 years",
      image: "/rajasthan-desert-palace.jpg",
      story: "Third generation puppet maker preserving ancient traditions",
      rating: 4.9,
      products: 45,
    },
    {
      id: 2,
      name: "Lakshmi Devi",
      craft: "Madhubani Paintings",
      state: "Bihar",
      experience: "18 years",
      image: "/kerala-backwaters-coconut.jpg",
      story: "Bringing mythological stories to life through vibrant art",
      rating: 4.8,
      products: 32,
    },
    {
      id: 3,
      name: "Suresh Patel",
      craft: "Bandhani Textiles",
      state: "Gujarat",
      experience: "30 years",
      image: "/gujarat-colorful-textiles-kites.jpg",
      story: "Master of tie-dye techniques passed down through generations",
      rating: 4.9,
      products: 67,
    },
  ]

  const collections = [
    {
      name: "Textiles",
      count: "2,500+ items",
      image: "/gujarat-colorful-textiles-kites.jpg",
      description: "Handwoven fabrics from across India",
      color: "from-blue-500 to-purple-600",
    },
    {
      name: "Pottery",
      count: "1,800+ items",
      image: "/indian-artisan-crafting-pottery.jpg",
      description: "Clay creations from master potters",
      color: "from-orange-500 to-red-600",
    },
    {
      name: "Jewelry",
      count: "3,200+ items",
      image: "/tamil-nadu-bronze-temple.jpg",
      description: "Traditional ornaments and accessories",
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Paintings",
      count: "950+ items",
      image: "/indian-mandala-pattern.png",
      description: "Folk and classical art forms",
      color: "from-green-500 to-teal-600",
    },
    {
      name: "Sculptures",
      count: "650+ items",
      image: "/tamil-nadu-bronze-temple.jpg",
      description: "Stone and metal masterpieces",
      color: "from-purple-500 to-pink-600",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFestival((prev) => (prev + 1) % festivals.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Cultural Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-200"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  BharatKart
                </h1>
                <p className="text-xs text-orange-600 font-medium">भारत कार्ट</p>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" />
                <Input
                  placeholder="Search for crafts, artisans, or states..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 border-orange-200 focus:border-orange-500 focus:ring-orange-500 rounded-full"
                />
              </div>
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

      {/* Hero Cultural Carousel */}
      <section className="relative h-96 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFestival}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className={`absolute inset-0 bg-gradient-to-br ${festivals[currentFestival].color}`}
          >
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
              <div className="text-white max-w-2xl">
                <motion.h2
                  className="text-5xl font-bold mb-4"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {festivals[currentFestival].name}
                </motion.h2>
                <motion.p
                  className="text-xl mb-2 text-yellow-100"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {festivals[currentFestival].nameHindi}
                </motion.p>
                <motion.p
                  className="text-lg mb-6"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {festivals[currentFestival].description} • {festivals[currentFestival].date}
                </motion.p>
                <motion.div
                  className="flex flex-wrap gap-2 mb-6"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {festivals[currentFestival].products.map((product) => (
                    <Badge key={product} className="bg-white/20 text-white border-white/30">
                      {product}
                    </Badge>
                  ))}
                </motion.div>
                <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
                  <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                    Shop Festival Collection
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Festival Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {festivals.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentFestival(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentFestival ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* States Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Explore Our Heritage
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Journey through 28 states, each with unique traditions and masterful artisans
            </p>

            <div className="flex items-center justify-center space-x-4">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                onClick={() => setViewMode("grid")}
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white"
              >
                <Grid3X3 className="w-4 h-4 mr-2" />
                Grid View
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                onClick={() => setViewMode("list")}
                className="border-orange-300 text-orange-600"
              >
                <List className="w-4 h-4 mr-2" />
                List View
              </Button>
              <Button variant="outline" className="border-orange-300 text-orange-600 bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {[
              { icon: MapPin, number: "28", label: "States Covered" },
              { icon: Users, number: "2000+", label: "Active Artisans" },
              { icon: ShoppingBag, number: "15K+", label: "Unique Products" },
              { icon: Star, number: "4.9", label: "Average Rating" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 bg-white rounded-xl shadow-lg border border-orange-100"
                whileHover={{ y: -5 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* States Grid - Showing first 8 states */}
          <div
            className={`grid ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1"} gap-8`}
          >
            {[
              {
                name: "Rajasthan",
                nameHindi: "राजस्थान",
                specialties: ["Blue Pottery", "Kathputli", "Block Prints"],
                image: "/rajasthan-desert-palace.jpg",
                color: "from-red-600 to-orange-500",
              },
              {
                name: "Kerala",
                nameHindi: "केरल",
                specialties: ["Coir Products", "Spices", "Ayurveda"],
                image: "/kerala-backwaters-coconut.jpg",
                color: "from-green-600 to-teal-500",
              },
              {
                name: "Gujarat",
                nameHindi: "गुजरात",
                specialties: ["Bandhani", "Mirror Work", "Patola"],
                image: "/gujarat-colorful-textiles-kites.jpg",
                color: "from-yellow-500 to-pink-500",
              },
              {
                name: "Tamil Nadu",
                nameHindi: "तमिल नाडु",
                specialties: ["Bronze Idols", "Silk Sarees", "Tanjore Art"],
                image: "/tamil-nadu-bronze-temple.jpg",
                color: "from-amber-600 to-red-500",
              },
              {
                name: "West Bengal",
                nameHindi: "पश्चिम बंगाल",
                specialties: ["Kantha Embroidery", "Terracotta", "Dokra Art"],
                image: "/indian-mandala-pattern.png",
                color: "from-purple-600 to-blue-500",
              },
              {
                name: "Uttar Pradesh",
                nameHindi: "उत्तर प्रदेश",
                specialties: ["Chikankari", "Brass Work", "Carpets"],
                image: "/indian-artisan-crafting-pottery.jpg",
                color: "from-indigo-600 to-purple-500",
              },
              {
                name: "Maharashtra",
                nameHindi: "महाराष्ट्र",
                specialties: ["Warli Art", "Paithani Sarees", "Kolhapuri Chappals"],
                image: "/rajasthan-desert-palace.jpg",
                color: "from-orange-600 to-yellow-500",
              },
              {
                name: "Karnataka",
                nameHindi: "कर्नाटक",
                specialties: ["Mysore Silk", "Sandalwood Crafts", "Channapatna Toys"],
                image: "/kerala-backwaters-coconut.jpg",
                color: "from-teal-600 to-green-500",
              },
            ].map((state, index) => (
              <motion.div
                key={state.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Link href={`/states/${state.name.toLowerCase().replace(" ", "-")}`}>
                  <Card className="overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={state.image || "/placeholder.svg"}
                        alt={state.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${state.color} opacity-60 group-hover:opacity-40 transition-opacity`}
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 text-gray-800 font-medium">
                          {state.specialties.length} Crafts
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-3">
                        <h3 className="text-xl font-bold text-gray-800">{state.name}</h3>
                        <p className="text-sm text-orange-600 font-medium">{state.nameHindi}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {state.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link href="/states">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
              >
                View All 28 States
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Artisan Stories Showcase */}
      <section className="py-20 bg-gradient-to-br from-white via-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Meet Our Creators
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the passionate artisans behind every masterpiece
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {artisanStories.map((artisan, index) => (
              <motion.div
                key={artisan.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
                      <Badge className="bg-white/20 text-white border-white/30">{artisan.products} Products</Badge>
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
                        {artisan.state} • {artisan.experience}
                      </p>
                    </div>

                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">{artisan.story}</p>

                    <Button
                      variant="outline"
                      className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                    >
                      View Profile
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Collections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Cultural Collections
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our curated collections of authentic Indian crafts
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="perspective-1000"
              >
                <Card className="overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-80">
                  <div className="relative h-full">
                    <img
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${collection.color} opacity-70 group-hover:opacity-50 transition-opacity`}
                    />

                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold mb-2">{collection.name}</h3>
                        <p className="text-sm opacity-90 mb-2">{collection.description}</p>
                        <Badge className="bg-white/20 text-white border-white/30">{collection.count}</Badge>
                      </div>

                      <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm">
                        Explore Collection
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Impact Dashboard */}
      <section className="py-20 bg-gradient-to-br from-orange-600 via-red-600 to-yellow-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/indian-mandala-pattern.png" alt="Pattern" className="w-full h-full object-cover" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Cultural Impact Dashboard</h2>
            <p className="text-xl text-yellow-100 max-w-3xl mx-auto">
              Real-time insights into how we're preserving heritage and empowering communities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              { icon: Users, number: "2,847", label: "Artisans Supported", change: "+12%" },
              { icon: Globe, number: "₹2.4Cr", label: "Earnings Generated", change: "+28%" },
              { icon: Award, number: "547", label: "Traditions Preserved", change: "+8%" },
              { icon: Calendar, number: "156", label: "Cultural Events", change: "+15%" },
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                className="text-center p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <metric.icon className="w-6 h-6 text-yellow-300" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2 text-yellow-300">{metric.number}</div>
                <div className="text-lg font-semibold mb-1">{metric.label}</div>
                <Badge className="bg-green-500/20 text-green-300 border-green-400/30">{metric.change} this month</Badge>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
            >
              View Detailed Impact Report
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
