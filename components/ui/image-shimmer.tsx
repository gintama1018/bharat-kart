"use client"

import { cn } from '@/lib/utils'

interface ImageShimmerProps {
  className?: string
  width?: number
  height?: number
}

export function ImageShimmer({ className, width, height }: ImageShimmerProps) {
  return (
    <div 
      className={cn(
        "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-size-200 animate-shimmer",
        className
      )}
      style={{ width, height }}
    >
      <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
    </div>
  )
}

// Alternative shimmer with cultural pattern
export function CulturalShimmer({ className, width, height }: ImageShimmerProps) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-orange-100 to-yellow-100",
        className
      )}
      style={{ width, height }}
    >
      {/* Mandala pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-repeat bg-center" 
             style={{ backgroundImage: 'url("/indian-mandala-pattern.png")', backgroundSize: '100px 100px' }} />
      </div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-200/30 to-transparent animate-pulse" />
      
      {/* Loading indicator */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  )
}