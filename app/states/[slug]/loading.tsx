'use client'

import { CulturalLoading } from '@/components/cultural/cultural-loading'

export default function StateLoading() {
  return (
    <CulturalLoading 
      state="loading"
      theme="Cultural Heritage"
      colorPrimary="#DC143C"
      colorSecondary="#FFD700"
      colorAccent="#F4A460"
    />
  )
}