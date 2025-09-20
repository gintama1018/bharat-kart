"use client"

import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { getImageSource, getImageSourceWithFallbacks, imageConfig } from '@/lib/image-config'
import { CulturalShimmer } from './image-shimmer'

interface RobustImageProps {
  src: string | null | undefined
  alt: string
  className?: string
  fallbackSrc?: string
  context?: 'state' | 'product' | 'artisan' | 'general'
  width?: number
  height?: number
  onLoad?: () => void
  onError?: () => void
  [key: string]: any
}

export function RobustImage({
  src,
  alt,
  className,
  fallbackSrc,
  context = 'general',
  width,
  height,
  onLoad,
  onError,
  ...props
}: RobustImageProps) {
  // Get the best available image source using the config
  const initialSrc = getImageSource(src, context)
  const allSources = getImageSourceWithFallbacks(
    src, 
    fallbackSrc ? [fallbackSrc] : [], 
    context
  )
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  
  const currentSrc = allSources[currentIndex] || '/placeholder.svg'

  const handleError = useCallback(() => {
    // Try next source in the chain
    if (currentIndex < allSources.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
    onError?.()
  }, [currentIndex, allSources.length, onError])

  const handleLoad = useCallback(() => {
    setIsLoading(false)
    onLoad?.()
  }, [onLoad])

  // If no valid src and no fallback, show placeholder div
  if (!currentSrc) {
    return (
      <div 
        className={cn(
          "bg-gray-200 flex items-center justify-center text-gray-500",
          className
        )}
        style={{ width, height }}
      >
        <span className="text-sm">No Image</span>
      </div>
    )
  }

  return (
    <div className="relative">
      <img
        src={currentSrc}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoading && "opacity-0",
          className
        )}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
      
      {isLoading && (
        <CulturalShimmer 
          className={cn(
            "absolute inset-0",
            className
          )}
        />
      )}
    </div>
  )
}

// Hook for managing image sources with fallbacks
export function useImageFallback(initialSrc: string | null | undefined, fallbacks: string[] = []) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const allSources = [initialSrc, ...fallbacks, "/placeholder.svg"].filter(Boolean) as string[]
  
  const currentSrc = allSources[currentIndex] || "/placeholder.svg"
  
  const handleError = useCallback(() => {
    if (currentIndex < allSources.length - 1) {
      setCurrentIndex(prev => prev + 1)
    }
  }, [currentIndex, allSources.length])
  
  return { currentSrc, handleError, hasMoreFallbacks: currentIndex < allSources.length - 1 }
}