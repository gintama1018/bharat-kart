"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-orange-50 to-red-50 border-t border-orange-100">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Stay Connected with Indian Heritage</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest updates on festivals, new artisan collections, and exclusive
            cultural insights from across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Enter your email" className="flex-1 border-orange-200 focus:border-orange-400" />
            <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
              Subscribe
            </Button>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">भ</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                BharatKart
              </span>
            </div>
            <p className="text-gray-600 mb-4 text-sm">
              Celebrating India's rich cultural heritage through authentic handicrafts, textiles, and artisan creations
              from every corner of our diverse nation.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="p-2">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/states" className="text-gray-600 hover:text-orange-600 transition-colors">
                  All States
                </Link>
              </li>
              <li>
                <Link href="/artisans" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Meet Artisans
                </Link>
              </li>
              <li>
                <Link href="/festivals" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Festivals
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/heritage" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Heritage Sites
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>+91 1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>support@bharatkart.com</span>
              </div>
              <div className="flex items-start space-x-2 text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>
                  Heritage House, Connaught Place
                  <br />
                  New Delhi, India 110001
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cultural Quote */}
        <motion.div
          className="text-center py-8 border-t border-orange-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-lg italic text-gray-700 mb-2">"वसुधैव कुटुम्बकम्"</p>
          <p className="text-sm text-gray-600">The world is one family - Ancient Sanskrit wisdom</p>
        </motion.div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-orange-200 text-sm text-gray-600">
          <div className="mb-4 md:mb-0">© 2024 BharatKart. All rights reserved. Made with ❤️ for Indian heritage.</div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-orange-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-orange-600 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-orange-600 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
