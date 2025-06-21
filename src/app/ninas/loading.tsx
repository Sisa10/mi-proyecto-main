export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top bar skeleton */}
      <div className="bg-gray-100 py-2 px-4 border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-40 animate-pulse"></div>
          </div>
          <div className="h-8 bg-gray-300 rounded w-24 animate-pulse"></div>
        </div>
      </div>

      {/* Header skeleton */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-between items-center">
            <div className="h-12 bg-gray-300 rounded w-32 animate-pulse"></div>
            <div className="hidden md:flex space-x-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
              ))}
            </div>
            <div className="flex items-center gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-5 w-5 bg-gray-300 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb skeleton */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2">
            <div className="h-4 bg-gray-300 rounded w-12 animate-pulse"></div>
            <span>/</span>
            <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Main content skeleton */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Controls skeleton */}
          <div className="flex justify-between items-center mb-8">
            <div className="h-10 bg-gray-300 rounded w-40 animate-pulse"></div>
            <div className="flex items-center space-x-4">
              <div className="h-8 bg-gray-300 rounded w-16 animate-pulse"></div>
              <div className="h-8 bg-gray-300 rounded w-20 animate-pulse"></div>
              <div className="h-8 bg-gray-300 rounded w-32 animate-pulse"></div>
            </div>
          </div>

          {/* Products grid skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-square bg-gray-300 rounded-lg animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto animate-pulse"></div>
                  <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto animate-pulse"></div>
                  <div className="flex justify-center space-x-2">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer skeleton */}
      <footer className="bg-black py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-6 bg-gray-600 rounded w-24 animate-pulse"></div>
                <div className="space-y-2">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="h-4 bg-gray-600 rounded w-32 animate-pulse"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
