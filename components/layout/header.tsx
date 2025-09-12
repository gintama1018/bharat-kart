"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ShoppingCart, User, Menu, X, Heart, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-white font-bold text-lg">भ</span>
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              BharatKart
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/explore" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              Explore
            </Link>
            <Link href="/states" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              States
            </Link>
            <Link href="/artisans" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              Artisans
            </Link>
            <Link href="/festivals" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              Festivals
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search for handicrafts, textiles, art..."
                className="pl-10 pr-4 py-2 w-full border-orange-200 focus:border-orange-400 focus:ring-orange-200"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Toggle */}
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="w-5 h-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Heart className="w-5 h-5" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="hidden sm:flex relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white rounded-full text-xs flex items-center justify-center">
                  3
                </span>
              </Button>
            </Link>

            {/* Profile */}
            <Link href="/get-started">
              <Button variant="ghost" size="sm">
                <User className="w-5 h-5" />
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              className="lg:hidden py-4 border-t border-orange-100"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search for handicrafts, textiles, art..."
                  className="pl-10 pr-4 py-2 w-full border-orange-200 focus:border-orange-400 focus:ring-orange-200"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              className="md:hidden py-4 border-t border-orange-100"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-4">
                <Link
                  href="/explore"
                  className="text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Explore India
                </Link>
                <Link
                  href="/states"
                  className="text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  States & Crafts
                </Link>
                <Link
                  href="/artisans"
                  className="text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Meet Artisans
                </Link>
                <Link
                  href="/festivals"
                  className="text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Festivals
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
