export function TranscriptSkeleton() {
  return (
    <div className="flex-1 bg-gray-900 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-6">
          <div className="h-8 bg-gray-700 rounded w-1/3 mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2 animate-pulse"></div>
        </div>

        {/* Tabs skeleton */}
        <div className="mb-6">
          <div className="flex space-x-4">
            <div className="h-10 bg-gray-700 rounded w-24 animate-pulse"></div>
            <div className="h-10 bg-gray-700 rounded w-24 animate-pulse"></div>
            <div className="h-10 bg-gray-700 rounded w-24 animate-pulse"></div>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="space-y-4">
          {/* Transcript lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex space-x-3">
              <div className="h-4 bg-gray-700 rounded w-16 animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary skeleton */}
        <div className="mt-8">
          <div className="h-6 bg-gray-700 rounded w-1/4 mb-4 animate-pulse"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-4/5 animate-pulse"></div>
          </div>
        </div>

        {/* Action items skeleton */}
        <div className="mt-8">
          <div className="h-6 bg-gray-700 rounded w-1/3 mb-4 animate-pulse"></div>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="h-4 w-4 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded w-2/3 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
