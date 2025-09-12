"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Users, Star, Sparkles, Filter, Grid3X3, List, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function StatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedRegion, setSelectedRegion] = useState<string>("all")

  const states = [
    {
      name: "Rajasthan",
      nameHindi: "राजस्थान",
      tagline: "राजस्थान की शान - Land of Kings",
      region: "North",
      specialties: [
        "Blue Pottery",
        "Kathputli Puppets",
        "Block Print Textiles",
        "Kundan Jewelry",
        "Miniature Paintings",
      ],
      artisans: 150,
      products: 1200,
      image: "/rajasthan-desert-palace.jpg",
      color: "from-red-600 to-orange-500",
      description: "Royal desert palace heritage with master craftsmen creating timeless masterpieces",
      theme: "Royal Desert Palace",
      colorPalette: { primary: "#8B0000", secondary: "#FFD700", accent: "#F4A460" },
    },
    {
      name: "Kerala",
      nameHindi: "केरल",
      tagline: "God's Own Country",
      region: "South",
      specialties: ["Coir Products", "Spice Blends", "Ayurvedic Items", "Kathakali Masks", "Coconut Shell Crafts"],
      artisans: 120,
      products: 890,
      image: "/kerala-backwaters-coconut.jpg",
      color: "from-green-600 to-teal-500",
      description: "Tropical backwaters paradise with coconut crafts and spice heritage",
      theme: "Tropical Backwaters Paradise",
      colorPalette: { primary: "#228B22", secondary: "#4682B4", accent: "#8B4513" },
    },
    {
      name: "Gujarat",
      nameHindi: "गुजरात",
      tagline: "Vibrant Gujarat",
      region: "West",
      specialties: ["Bandhani Textiles", "Mirror Work", "Patola Silk", "Kutch Embroidery", "Beadwork"],
      artisans: 200,
      products: 1500,
      image: "/gujarat-colorful-textiles-kites.jpg",
      color: "from-yellow-500 to-pink-500",
      description: "Festival of colors and mirrors with vibrant textile traditions",
      theme: "Festival of Colors & Mirrors",
      colorPalette: { primary: "#FFD700", secondary: "#FF1493", accent: "#C0C0C0" },
    },
    {
      name: "Tamil Nadu",
      nameHindi: "तमिल नाडु",
      tagline: "Tamil Heritage",
      region: "South",
      specialties: ["Bronze Idols", "Kanchipuram Silk", "Tanjore Paintings", "Stone Sculptures", "Temple Jewelry"],
      artisans: 180,
      products: 1100,
      image: "/tamil-nadu-bronze-temple.jpg",
      color: "from-amber-600 to-red-500",
      description: "Temple architecture and classical arts with bronze craftsmanship",
      theme: "Temple Architecture & Classical Arts",
      colorPalette: { primary: "#CD7F32", secondary: "#FFD700", accent: "#DC143C" },
    },
    {
      name: "West Bengal",
      nameHindi: "पश्चिम बंगाल",
      tagline: "Cultural Renaissance",
      region: "East",
      specialties: ["Kantha Embroidery", "Terracotta Art", "Dokra Metal Work", "Baluchari Sarees", "Shola Pith Craft"],
      artisans: 140,
      products: 950,
      image: "/indian-mandala-pattern.png",
      color: "from-purple-600 to-blue-500",
      description: "Intellectual heritage and Durga Puja traditions with rich cultural arts",
      theme: "Intellectual Heritage & Durga Puja",
      colorPalette: { primary: "#DC143C", secondary: "#000080", accent: "#FFD700" },
    },
    {
      name: "Punjab",
      nameHindi: "पंजाब",
      tagline: "Land of Five Rivers",
      region: "North",
      specialties: ["Phulkari Embroidery", "Juttis", "Wooden Toys", "Punjabi Suits", "Truck Art"],
      artisans: 90,
      products: 650,
      image: "/gujarat-colorful-textiles-kites.jpg",
      color: "from-yellow-600 to-orange-500",
      description: "Harvest festival and Sikh heritage with vibrant embroidery traditions",
      theme: "Harvest Festival & Sikh Heritage",
      colorPalette: { primary: "#DAA520", secondary: "#FF9933", accent: "#4169E1" },
    },
    {
      name: "Maharashtra",
      nameHindi: "महाराष्ट्र",
      tagline: "Cultural Capital",
      region: "West",
      specialties: ["Warli Art", "Paithani Sarees", "Kolhapuri Chappals", "Bidriware", "Dhol Tasha"],
      artisans: 160,
      products: 1050,
      image: "/rajasthan-desert-palace.jpg",
      color: "from-orange-600 to-yellow-500",
      description: "Maratha heritage and Mumbai spirit with tribal art traditions",
      theme: "Maratha Heritage & Mumbai Spirit",
      colorPalette: { primary: "#FF6600", secondary: "#000080", accent: "#FFD700" },
    },
    {
      name: "Karnataka",
      nameHindi: "कर्नाटक",
      tagline: "Silicon Valley meets Heritage",
      region: "South",
      specialties: ["Mysore Silk", "Sandalwood Crafts", "Channapatna Toys", "Ilkal Sarees", "Kasuti Embroidery"],
      artisans: 130,
      products: 920,
      image: "/kerala-backwaters-coconut.jpg",
      color: "from-teal-600 to-green-500",
      description: "Technology and tradition blend with royal silk and sandalwood heritage",
      theme: "Technology & Tradition Blend",
      colorPalette: { primary: "#6A0DAD", secondary: "#8B7355", accent: "#FFD700" },
    },
    {
      name: "Andhra Pradesh",
      nameHindi: "आंध्र प्रदेश",
      tagline: "Kohinoor of India",
      region: "South",
      specialties: ["Pearl Jewelry", "Kalamkari Paintings", "Pochampally Ikat", "Kondapalli Dolls", "Bidriware"],
      artisans: 125,
      products: 875,
      image: "/tamil-nadu-bronze-temple.jpg",
      color: "from-blue-600 to-white",
      description: "Pearl city and spicy heritage with Hyderabadi craftsmanship",
      theme: "Pearl City & Spicy Heritage",
      colorPalette: { primary: "#F8F8FF", secondary: "#FF4500", accent: "#4169E1" },
    },
    {
      name: "Telangana",
      nameHindi: "तेलंगाना",
      tagline: "State of Art & Culture",
      region: "South",
      specialties: ["Pochampally Ikat", "Gadwal Sarees", "Warangal Durries", "Pearl Work", "Nizami Crafts"],
      artisans: 95,
      products: 680,
      image: "/indian-mandala-pattern.png",
      color: "from-gold-500 to-green-600",
      description: "Nizami heritage and modern identity with traditional weaving",
      theme: "Nizami Heritage & Modern Identity",
      colorPalette: { primary: "#FFD700", secondary: "#228B22", accent: "#8B0000" },
    },
    {
      name: "Assam",
      nameHindi: "असम",
      tagline: "Gateway to Northeast",
      region: "Northeast",
      specialties: ["Muga Silk", "Bamboo Crafts", "Cane Work", "Traditional Jewelry", "Gamosa Textiles"],
      artisans: 80,
      products: 560,
      image: "/kerala-backwaters-coconut.jpg",
      color: "from-emerald-500 to-teal-500",
      description: "Tea gardens and silk heritage with golden muga traditions",
      theme: "Tea Gardens & Silk Heritage",
      colorPalette: { primary: "#90EE90", secondary: "#FFD700", accent: "#4682B4" },
    },
    {
      name: "Odisha",
      nameHindi: "ओडिशा",
      tagline: "Soul of India",
      region: "East",
      specialties: ["Pattachitra Paintings", "Ikat Textiles", "Silver Filigree", "Palm Leaf Art", "Sambalpuri Sarees"],
      artisans: 110,
      products: 780,
      image: "/tamil-nadu-bronze-temple.jpg",
      color: "from-red-500 to-pink-500",
      description: "Jagannath culture and Pattachitra art with classical Odissi dance",
      theme: "Jagannath Culture & Pattachitra Art",
      colorPalette: { primary: "#FF6347", secondary: "#FFD700", accent: "#4169E1" },
    },
    {
      name: "Madhya Pradesh",
      nameHindi: "मध्य प्रदेश",
      tagline: "Heart of India",
      region: "Central",
      specialties: ["Chanderi Silk", "Gond Art", "Dhokra Craft", "Maheshwari Sarees", "Tribal Paintings"],
      artisans: 100,
      products: 720,
      image: "/indian-mandala-pattern.png",
      color: "from-green-500 to-blue-500",
      description: "Tribal heritage and handloom textiles from India's geographical center",
      theme: "Tribal Heritage & Handloom",
      colorPalette: { primary: "#228B22", secondary: "#8B4513", accent: "#FFD700" },
    },
    {
      name: "Uttar Pradesh",
      nameHindi: "उत्तर प्रदेश",
      tagline: "Heartland of India",
      region: "North",
      specialties: ["Chikankari Embroidery", "Brass Work", "Carpets", "Zardozi Work", "Pottery"],
      artisans: 220,
      products: 1600,
      image: "/indian-artisan-crafting-pottery.jpg",
      color: "from-indigo-600 to-purple-500",
      description: "Mughal-influenced crafts and traditional embroidery heritage",
      theme: "Mughal Heritage & Embroidery",
      colorPalette: { primary: "#4B0082", secondary: "#FFD700", accent: "#DC143C" },
    },
    {
      name: "Bihar",
      nameHindi: "बिहार",
      tagline: "Land of Buddha",
      region: "East",
      specialties: ["Madhubani Paintings", "Sikki Grass Work", "Stone Carving", "Applique Work", "Bamboo Crafts"],
      artisans: 85,
      products: 590,
      image: "/indian-mandala-pattern.png",
      color: "from-saffron-500 to-red-600",
      description: "Ancient Buddhist heritage with vibrant Madhubani art traditions",
      theme: "Buddhist Heritage & Folk Art",
      colorPalette: { primary: "#FF8C00", secondary: "#8B0000", accent: "#FFD700" },
    },
    {
      name: "Jharkhand",
      nameHindi: "झारखंड",
      tagline: "Land of Forests",
      region: "East",
      specialties: ["Tribal Art", "Dokra Metal Work", "Bamboo Crafts", "Stone Sculptures", "Handloom Textiles"],
      artisans: 70,
      products: 480,
      image: "/kerala-backwaters-coconut.jpg",
      color: "from-forest-green to-brown-600",
      description: "Tribal forest heritage with metal work and stone carving traditions",
      theme: "Tribal Forest Heritage",
      colorPalette: { primary: "#228B22", secondary: "#8B4513", accent: "#FFD700" },
    },
    {
      name: "Haryana",
      nameHindi: "हरियाणा",
      tagline: "Land of Rotis",
      region: "North",
      specialties: ["Phulkari Embroidery", "Pottery", "Handloom Textiles", "Wooden Crafts", "Metalwork"],
      artisans: 65,
      products: 450,
      image: "/gujarat-colorful-textiles-kites.jpg",
      color: "from-green-600 to-yellow-500",
      description: "Agricultural heritage with vibrant embroidery and pottery traditions",
      theme: "Agricultural Heritage",
      colorPalette: { primary: "#32CD32", secondary: "#FFD700", accent: "#FF6347" },
    },
    {
      name: "Himachal Pradesh",
      nameHindi: "हिमाचल प्रदेश",
      tagline: "Dev Bhoomi",
      region: "North",
      specialties: ["Woolen Shawls", "Wood Carving", "Metalwork", "Himachali Caps", "Chamba Rumals"],
      artisans: 75,
      products: 520,
      image: "/kerala-backwaters-coconut.jpg",
      color: "from-blue-600 to-white",
      description: "Mountain heritage with woolen crafts and wood carving traditions",
      theme: "Mountain Heritage",
      colorPalette: { primary: "#4169E1", secondary: "#FFFFFF", accent: "#228B22" },
    },
    {
      name: "Uttarakhand",
      nameHindi: "उत्तराखंड",
      tagline: "Land of Gods",
      region: "North",
      specialties: ["Woolen Products", "Wood Carving", "Aipan Art", "Ringaal Crafts", "Stone Work"],
      artisans: 60,
      products: 420,
      image: "/indian-mandala-pattern.png",
      color: "from-blue-500 to-green-600",
      description: "Himalayan heritage with traditional mountain crafts and spiritual art",
      theme: "Himalayan Heritage",
      colorPalette: { primary: "#4682B4", secondary: "#228B22", accent: "#FFD700" },
    },
    {
      name: "Chhattisgarh",
      nameHindi: "छत्तीसगढ़",
      tagline: "Rice Bowl of India",
      region: "Central",
      specialties: ["Tribal Art", "Bell Metal Craft", "Bamboo Work", "Handloom Textiles", "Wood Carving"],
      artisans: 55,
      products: 380,
      image: "/tamil-nadu-bronze-temple.jpg",
      color: "from-green-500 to-brown-600",
      description: "Tribal heritage with bell metal crafts and bamboo work traditions",
      theme: "Tribal Heritage & Metal Crafts",
      colorPalette: { primary: "#228B22", secondary: "#8B4513", accent: "#FFD700" },
    },
    {
      name: "Goa",
      nameHindi: "गोवा",
      tagline: "Pearl of the Orient",
      region: "West",
      specialties: ["Azulejo Tiles", "Cashew Products", "Coconut Crafts", "Portuguese Pottery", "Seashell Art"],
      artisans: 40,
      products: 280,
      image: "/kerala-backwaters-coconut.jpg",
      color: "from-blue-400 to-yellow-500",
      description: "Portuguese heritage with coastal crafts and tile work traditions",
      theme: "Portuguese Heritage & Coastal Crafts",
      colorPalette: { primary: "#4169E1", secondary: "#FFD700", accent: "#FF6347" },
    },
    {
      name: "Manipur",
      nameHindi: "मणिपुर",
      tagline: "Jewel of India",
      region: "Northeast",
      specialties: ["Manipuri Textiles", "Bamboo Crafts", "Pottery", "Jewelry", "Traditional Dolls"],
      artisans: 45,
      products: 320,
      image: "/indian-mandala-pattern.png",
      color: "from-purple-500 to-pink-500",
      description: "Classical dance heritage with exquisite textiles and bamboo crafts",
      theme: "Classical Dance Heritage",
      colorPalette: { primary: "#8A2BE2", secondary: "#FF69B4", accent: "#FFD700" },
    },
    {
      name: "Meghalaya",
      nameHindi: "मेघालय",
      tagline: "Abode of Clouds",
      region: "Northeast",
      specialties: ["Bamboo Crafts", "Cane Work", "Traditional Textiles", "Pottery", "Wood Carving"],
      artisans: 35,
      products: 250,
      image: "/kerala-backwaters-coconut.jpg",
      color: "from-green-400 to-blue-500",
      description: "Cloud heritage with bamboo crafts and traditional weaving",
      theme: "Cloud Heritage & Bamboo Crafts",
      colorPalette: { primary: "#32CD32", secondary: "#4682B4", accent: "#FFD700" },
    },
    {
      name: "Tripura",
      nameHindi: "त्रिपुरा",
      tagline: "Land of Diversity",
      region: "Northeast",
      specialties: ["Bamboo Crafts", "Handloom Textiles", "Cane Work", "Traditional Jewelry", "Wood Carving"],
      artisans: 30,
      products: 210,
      image: "/indian-mandala-pattern.png",
      color: "from-green-500 to-red-500",
      description: "Diverse tribal heritage with bamboo and textile traditions",
      theme: "Diverse Tribal Heritage",
      colorPalette: { primary: "#228B22", secondary: "#DC143C", accent: "#FFD700" },
    },
    {
      name: "Mizoram",
      nameHindi: "मिजोरम",
      tagline: "Land of Blue Mountains",
      region: "Northeast",
      specialties: ["Bamboo Crafts", "Traditional Textiles", "Wood Carving", "Cane Work", "Pottery"],
      artisans: 25,
      products: 180,
      image: "/kerala-backwaters-coconut.jpg",
      color: "from-blue-500 to-green-500",
      description: "Blue mountain heritage with bamboo crafts and traditional weaving",
      theme: "Blue Mountain Heritage",
      colorPalette: { primary: "#4169E1", secondary: "#228B22", accent: "#FFD700" },
    },
    {
      name: "Nagaland",
      nameHindi: "नागालैंड",
      tagline: "Land of Festivals",
      region: "Northeast",
      specialties: ["Traditional Textiles", "Bamboo Crafts", "Wood Carving", "Jewelry", "Pottery"],
      artisans: 40,
      products: 290,
      image: "/indian-mandala-pattern.png",
      color: "from-red-500 to-black",
      description: "Festival heritage with vibrant textiles and wood carving traditions",
      theme: "Festival Heritage & Textiles",
      colorPalette: { primary: "#DC143C", secondary: "#000000", accent: "#FFD700" },
    },
    {
      name: "Arunachal Pradesh",
      nameHindi: "अरुणाचल प्रदेश",
      tagline: "Land of Rising Sun",
      region: "Northeast",
      specialties: ["Traditional Textiles", "Bamboo Crafts", "Wood Carving", "Masks", "Jewelry"],
      artisans: 35,
      products: 240,
      image: "/kerala-backwaters-coconut.jpg",
      color: "from-orange-500 to-red-600",
      description: "Rising sun heritage with traditional crafts and tribal art",
      theme: "Rising Sun Heritage",
      colorPalette: { primary: "#FF8C00", secondary: "#DC143C", accent: "#FFD700" },
    },
    {
      name: "Sikkim",
      nameHindi: "सिक्किम",
      tagline: "Himalayan Paradise",
      region: "Northeast",
      specialties: ["Woolen Products", "Thangka Paintings", "Wood Carving", "Traditional Textiles", "Carpets"],
      artisans: 30,
      products: 200,
      image: "/indian-mandala-pattern.png",
      color: "from-blue-600 to-white",
      description: "Himalayan paradise with Buddhist art and woolen craft traditions",
      theme: "Himalayan Paradise & Buddhist Art",
      colorPalette: { primary: "#4169E1", secondary: "#FFFFFF", accent: "#FFD700" },
    },
  ]

  const regions = ["all", "North", "South", "East", "West", "Central", "Northeast"]

  const filteredStates = states.filter((state) => {
    const matchesSearch =
      state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      state.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesRegion = selectedRegion === "all" || state.region === selectedRegion
    return matchesSearch && matchesRegion
  })

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

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/explore" className="text-gray-700 hover:text-orange-600 transition-colors">
                Explore
              </Link>
              <Link href="/artisans" className="text-gray-700 hover:text-orange-600 transition-colors">
                Artisans
              </Link>
              <Link href="/collections" className="text-gray-700 hover:text-orange-600 transition-colors">
                Collections
              </Link>
            </nav>

            <Link href="/get-started">
              <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-600 via-red-600 to-yellow-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/indian-mandala-pattern.png" alt="Pattern" className="w-full h-full object-cover" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Explore India's 28 States</h1>
            <p className="text-xl text-yellow-100 max-w-3xl mx-auto mb-8">
              Journey through diverse cultures, traditions, and craftsmanship from every corner of incredible India
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-orange-500" />
                <Input
                  placeholder="Search states, crafts, or specialties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 pr-4 py-4 text-lg border-white/30 bg-white/10 backdrop-blur-md text-white placeholder:text-white/70 focus:border-white focus:ring-white"
                />
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {[
              { icon: MapPin, number: "28", label: "States & UTs" },
              { icon: Users, number: "2000+", label: "Master Artisans" },
              { icon: Star, number: "15K+", label: "Unique Products" },
              { icon: Sparkles, number: "500+", label: "Craft Traditions" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20"
                whileHover={{ scale: 1.05 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-3">
                  <stat.icon className="w-8 h-8 text-yellow-300" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-yellow-200">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 bg-white border-b border-orange-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Region Filters */}
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <Button
                  key={region}
                  variant={selectedRegion === region ? "default" : "outline"}
                  onClick={() => setSelectedRegion(region)}
                  className={
                    selectedRegion === region
                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                      : "border-orange-300 text-orange-600 hover:bg-orange-50"
                  }
                >
                  {region === "all" ? "All Regions" : region}
                </Button>
              ))}
            </div>

            {/* View Controls */}
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
                More Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* States Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <p className="text-gray-600">
              Showing {filteredStates.length} of {states.length} states
              {selectedRegion !== "all" && ` in ${selectedRegion} India`}
            </p>
          </div>

          <div
            className={`grid gap-8 ${
              viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
            }`}
          >
            {filteredStates.map((state, index) => (
              <motion.div
                key={state.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Link href={`/states/${state.name.toLowerCase().replace(/\s+/g, "-")}`}>
                  <Card
                    className={`overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                  >
                    <div className={`relative overflow-hidden ${viewMode === "list" ? "w-64 h-48" : "h-64"}`}>
                      <img
                        src={state.image || "/placeholder.svg"}
                        alt={state.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${state.color} opacity-60 group-hover:opacity-40 transition-opacity`}
                      />

                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 text-gray-800 font-medium">{state.region}</Badge>
                      </div>

                      <div className="absolute bottom-4 left-4 text-white">
                        <Badge className="bg-white/20 text-white border-white/30 mb-2">{state.artisans} Artisans</Badge>
                      </div>
                    </div>

                    <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{state.name}</h3>
                        <p className="text-sm text-orange-600 font-medium mb-1">{state.nameHindi}</p>
                        <p className="text-sm text-gray-600 italic mb-2">{state.tagline}</p>
                        {viewMode === "list" && <p className="text-gray-700 text-sm mb-4">{state.description}</p>}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {state.specialties.slice(0, viewMode === "list" ? 4 : 3).map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                        {state.specialties.length > (viewMode === "list" ? 4 : 3) && (
                          <Badge variant="secondary" className="text-xs">
                            +{state.specialties.length - (viewMode === "list" ? 4 : 3)} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span>{state.products} Products</span>
                        <span className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                          4.8
                        </span>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 group-hover:bg-orange-600 group-hover:text-white transition-colors bg-transparent"
                      >
                        Explore {state.name}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredStates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No states found matching your search criteria.</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedRegion("all")
                }}
                className="mt-4 bg-gradient-to-r from-orange-500 to-red-600 text-white"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
