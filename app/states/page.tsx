"use client"
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { RobustImage } from "@/components/ui/robust-image"
import {
  ArrowLeft,
  MapPin,
  Search,
  Star,
  Heart,
  ShoppingBag,
  Filter,
  Grid3X3,
  List,
  Users,
  Calendar,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { getAllStates, getStatesByRegion } from "@/lib/states-data"

export default function StatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("name")
  
  const allStates = getAllStates()
  
  const regions = [
    { id: "all", name: "All Regions", count: allStates.length },
    { id: "North", name: "Northern States", count: getStatesByRegion("North").length },
    { id: "South", name: "Southern States", count: getStatesByRegion("South").length },
    { id: "East", name: "Eastern States", count: getStatesByRegion("East").length },
    { id: "West", name: "Western States", count: getStatesByRegion("West").length },
    { id: "Northeast", name: "Northeast States", count: getStatesByRegion("Northeast").length },
    { id: "Central", name: "Central States", count: getStatesByRegion("Central").length },
  ]

  const filteredStates = allStates
    .filter((state) => {
      const matchesSearch = state.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           state.nameHindi.includes(searchTerm) ||
                           state.specialties.some(specialty => 
                             specialty.toLowerCase().includes(searchTerm.toLowerCase())
                           )
      const matchesRegion = selectedRegion === "all" || state.region === selectedRegion
      return matchesSearch && matchesRegion
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "artisans":
          return b.statistics.artisans - a.statistics.artisans
        case "products":
          return b.statistics.products - a.statistics.products
        default:
          return 0
      }
    })

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
              <Link href="/" className="flex items-center text-orange-600 hover:text-orange-700">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
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

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/indian-mandala-pattern.png')] bg-repeat" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Explore India's Heritage
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              Journey through 28 states, each with unique traditions and masterful artisans
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">28</div>
                <div className="text-orange-200">States</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">2000+</div>
                <div className="text-orange-200">Artisans</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">500+</div>
                <div className="text-orange-200">Crafts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">15K+</div>
                <div className="text-orange-200">Products</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b border-orange-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search states, crafts, or specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-orange-200 focus:border-orange-500"
              />
            </div>

            {/* Region Filter */}
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <Button
                  key={region.id}
                  variant={selectedRegion === region.id ? "default" : "outline"}
                  onClick={() => setSelectedRegion(region.id)}
                  size="sm"
                  className={
                    selectedRegion === region.id
                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                      : "border-orange-300 text-orange-600 hover:bg-orange-50"
                  }
                >
                  {region.name} ({region.count})
                </Button>
              ))}
            </div>

            {/* View Controls */}
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="name">Sort by Name</option>
                <option value="artisans">Sort by Artisans</option>
                <option value="products">Sort by Products</option>
              </select>

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
            </div>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="py-4 bg-orange-50">
        <div className="container mx-auto px-4">
          <p className="text-gray-600">
            Showing {filteredStates.length} of {allStates.length} states
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedRegion !== "all" && ` in ${regions.find(r => r.id === selectedRegion)?.name}`}
          </p>
        </div>
      </section>

      {/* States Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${viewMode}-${selectedRegion}-${searchTerm}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`grid gap-8 ${
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                  : "grid-cols-1"
              }`}
            >
              {filteredStates.map((state, index) => (
                <motion.div
                  key={state.slug}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Link href={`/states/${state.slug}`}>
                    <Card
                      className={`overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                        viewMode === "list" ? "flex" : ""
                      }`}
                    >
                      <div className={`relative overflow-hidden ${viewMode === "list" ? "w-80 h-48" : "h-64"}`}>
                        <RobustImage
                          src={state.backgroundImage}
                          alt={state.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          context="state"
                        />
                        <div 
                          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                          style={{
                            background: `linear-gradient(to top, ${state.colors.primary}CC, transparent)`
                          }}
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-white/90 text-gray-800">
                            {state.specialties.length} Crafts
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="text-xl font-bold">{state.name}</h3>
                          <p className="text-orange-200">{state.nameHindi}</p>
                        </div>
                      </div>

                      <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                              {state.region}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm">4.8</span>
                            </div>
                          </div>
                          <p className="text-gray-600 text-sm italic mb-3">{state.tagline}</p>
                          <p className="text-gray-700 text-sm line-clamp-2">{state.description}</p>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                          <div>
                            <div className="text-orange-600 font-bold">{state.statistics.artisans}</div>
                            <div className="text-xs text-gray-500">Artisans</div>
                          </div>
                          <div>
                            <div className="text-orange-600 font-bold">{state.statistics.products}</div>
                            <div className="text-xs text-gray-500">Products</div>
                          </div>
                          <div>
                            <div className="text-orange-600 font-bold">{state.statistics.festivals}</div>
                            <div className="text-xs text-gray-500">Festivals</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {state.specialties.slice(0, 3).map((specialty) => (
                            <Badge
                              key={specialty}
                              variant="outline"
                              className="text-xs border-orange-200 text-orange-600"
                            >
                              {specialty}
                            </Badge>
                          ))}
                          {state.specialties.length > 3 && (
                            <Badge variant="outline" className="text-xs border-orange-200 text-orange-600">
                              +{state.specialties.length - 3} more
                            </Badge>
                          )}
                        </div>

                        <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                          Explore {state.name}
                        </Button>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredStates.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No states found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedRegion("all")
                }}
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
