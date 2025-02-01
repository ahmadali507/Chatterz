import React from 'react'
import { Skeleton } from '../ui/skeleton';

const SkeletonTemplate = () => {
  return (
    <div className="min-h-screen items-center bg-gradient-to-b from-gray-900 via-purple-700 to-gray-900 text-gray-100 flex flex-col overflow-hidden">
      {/* Simulating Header */}
      <Skeleton className="h-12 w-1/3 mb-6" />

      {/* Simulating Hero Section */}
      <Skeleton className="h-8 w-2/3 mb-4" />
      <Skeleton className="h-6 w-1/2 mb-6" />
      <Skeleton className="h-10 w-1/4 mb-8" />

      {/* Simulating Features Section */}
      <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
        <Skeleton className="h-40 w-full rounded-lg" />
        <Skeleton className="h-40 w-full rounded-lg" />
        <Skeleton className="h-40 w-full rounded-lg" />
      </div>

      {/* Simulating Footer */}
      <Skeleton className="h-6 w-1/4 mt-12" />
    </div>
  )
}

export default SkeletonTemplate; 
