import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "next-themes"
import { Suspense } from "react"
import { Toaster } from "react-hot-toast"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AdvancedSoundProvider } from "@/components/cultural/advanced-sound-manager"
import { NotificationProvider } from "@/components/cultural/premium-notifications"
import { PremiumCursor } from "@/components/cultural/premium-cursor"
import { AuthProvider } from "@/contexts/AuthContext"
import { CartProvider } from "@/contexts/CartContext"

export const metadata: Metadata = {
  title: "BharatKart - Celebrating India's Heritage",
  description: "Discover authentic Indian crafts and support traditional artisans",
  generator: "v0.app",
}

const geistSans = GeistSans.variable
const geistMono = GeistMono.variable

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans} ${geistMono} antialiased`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <CartProvider>
              <AdvancedSoundProvider>
                <NotificationProvider>
                  <PremiumCursor />
                  <Suspense fallback={<div>Loading...</div>}>
                    <Header />
                    <main className="min-h-screen">{children}</main>
                    <Footer />
                  </Suspense>
                  <Toaster
                    position="top-right"
                    toastOptions={{
                      duration: 4000,
                      style: {
                        background: '#fff',
                        color: '#333',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '14px',
                      },
                      success: {
                        iconTheme: {
                          primary: '#10b981',
                          secondary: '#fff',
                        },
                      },
                      error: {
                        iconTheme: {
                          primary: '#ef4444',
                          secondary: '#fff',
                        },
                      },
                    }}
                  />
                </NotificationProvider>
              </AdvancedSoundProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
