// Image optimization and fallback configuration for BharatKart

export const imageConfig = {
  // Base paths for different image types
  basePaths: {
    states: '/states/',
    products: '/products/',
    artisans: '/artisans/',
    categories: '/categories/',
    patterns: '/patterns/'
  },
  
  // Available images in public directory
  availableImages: [
    '/gujarat-colorful-textiles-kites.jpg',
    '/gujarati-bandhani-silk-dupatta-colorful-tie-dye.jpg',
    '/indian-artisan-crafting-pottery.jpg',
    '/indian-mandala-pattern.png',
    '/kerala-backwaters-coconut.jpg',
    '/placeholder-logo.png',
    '/placeholder-logo.svg',
    '/placeholder-user.jpg',
    '/placeholder.jpg',
    '/placeholder.svg',
    '/rajasthan-desert-palace.jpg',
    '/rajasthani-kathputli-puppet-colorful-traditional.jpg',
    '/tamil-nadu-bronze-ganesha-idol-traditional-sculptu.jpg',
    '/tamil-nadu-bronze-temple.jpg'
  ],

  // Fallback chain for different contexts
  fallbacks: {
    state: ['/placeholder.svg'],
    product: ['/placeholder.svg'],
    artisan: ['/placeholder-user.jpg', '/placeholder.svg'],
    general: ['/placeholder.svg']
  },

  // External image sources with fallbacks
  externalSources: {
    unsplash: {
      baseUrl: 'https://images.unsplash.com/',
      categories: {
        indian_crafts: '?w=800&h=600&fit=crop&crop=center&q=80',
        textiles: '?w=800&h=600&fit=crop&crop=center&q=80',
        pottery: '?w=800&h=600&fit=crop&crop=center&q=80'
      }
    }
  }
}

// Helper function to get appropriate image source
export function getImageSource(
  primarySrc: string | null | undefined,
  context: keyof typeof imageConfig.fallbacks = 'general'
): string {
  // If primary source exists and is in available images, use it
  if (primarySrc && imageConfig.availableImages.includes(primarySrc)) {
    return primarySrc
  }

  // Check if it's a valid external URL
  if (primarySrc && (primarySrc.startsWith('http') || primarySrc.startsWith('https'))) {
    return primarySrc
  }

  // Use context-specific fallback
  const fallbacks = imageConfig.fallbacks[context]
  return fallbacks[0] || '/placeholder.svg'
}

// Helper to generate image source with multiple fallbacks
export function getImageSourceWithFallbacks(
  primarySrc: string | null | undefined,
  customFallbacks: string[] = [],
  context: keyof typeof imageConfig.fallbacks = 'general'
): string[] {
  const sources: string[] = []
  
  // Add primary source if valid
  if (primarySrc) {
    sources.push(primarySrc)
  }
  
  // Add custom fallbacks
  sources.push(...customFallbacks)
  
  // Add context fallbacks
  sources.push(...imageConfig.fallbacks[context])
  
  // Filter out duplicates and invalid sources
  return [...new Set(sources)].filter(Boolean)
}

// Real image mappings for states (using available images)
export const stateImageMap: Record<string, string> = {
  'rajasthan': '/rajasthan-desert-palace.jpg',
  'kerala': '/kerala-backwaters-coconut.jpg',
  'gujarat': '/gujarat-colorful-textiles-kites.jpg',
  'tamil-nadu': '/tamil-nadu-bronze-temple.jpg',
  // Add more mappings as needed
}

// Real image mappings for products
export const productImageMap: Record<string, string> = {
  'rajasthani-puppet': '/rajasthani-kathputli-puppet-colorful-traditional.jpg',
  'gujarati-dupatta': '/gujarati-bandhani-silk-dupatta-colorful-tie-dye.jpg',
  'bronze-ganesha': '/tamil-nadu-bronze-ganesha-idol-traditional-sculptu.jpg',
  'pottery': '/indian-artisan-crafting-pottery.jpg',
  // Add more mappings as needed
}

// Function to get the best available image for a given key
export function getBestImage(key: string, type: 'state' | 'product' | 'artisan' = 'product'): string {
  switch (type) {
    case 'state':
      return stateImageMap[key] || '/placeholder.svg'
    case 'product':
      return productImageMap[key] || '/placeholder.svg'
    case 'artisan':
      return '/placeholder-user.jpg'
    default:
      return '/placeholder.svg'
  }
}