import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "next-themes"
import { Suspense } from "react"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AdvancedSoundProvider } from "@/components/cultural/advanced-sound-manager"
import { NotificationProvider } from "@/components/cultural/premium-notifications"
import { PremiumCursor } from "@/components/cultural/premium-cursor"

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
          <AdvancedSoundProvider>
            <NotificationProvider>
              <PremiumCursor />
              <Suspense fallback={<div>Loading...</div>}>
                <Header />
                <main className="min-h-screen">{children}</main>
                <Footer />
              </Suspense>
            </NotificationProvider>
          </AdvancedSoundProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
