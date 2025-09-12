import { LoadingSpinner } from "@/components/cultural/loading-spinner"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" type="chakra" />
        <p className="mt-4 text-orange-600 font-medium">Loading BharatKart...</p>
        <p className="text-sm text-gray-600">भारत कार्ट</p>
      </div>
    </div>
  )
}
