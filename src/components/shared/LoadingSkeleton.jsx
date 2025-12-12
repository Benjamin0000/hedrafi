const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  const skeletons = Array(count).fill(0);

  if (type === 'card') {
    return (
      <>
        {skeletons.map((_, i) => (
          <div key={i} className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl border border-purple-500/20 overflow-hidden animate-pulse">
            <div className="aspect-square bg-gray-700/50"></div>
            <div className="p-4 space-y-3">
              <div className="h-5 bg-gray-700/50 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700/50 rounded w-1/2"></div>
              <div className="flex justify-between items-center pt-3">
                <div className="h-4 bg-gray-700/50 rounded w-1/4"></div>
                <div className="h-8 bg-gray-700/50 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (type === 'collection') {
    return (
      <>
        {skeletons.map((_, i) => (
          <div key={i} className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl border border-purple-500/20 overflow-hidden animate-pulse">
            <div className="h-32 bg-gray-700/50"></div>
            <div className="p-4 space-y-3">
              <div className="w-20 h-20 -mt-16 bg-gray-700/50 rounded-xl"></div>
              <div className="h-5 bg-gray-700/50 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700/50 rounded w-full"></div>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-12 bg-gray-700/50 rounded"></div>
                <div className="h-12 bg-gray-700/50 rounded"></div>
                <div className="h-12 bg-gray-700/50 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (type === 'detail') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
        <div className="aspect-square bg-gray-700/50 rounded-2xl"></div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-700/50 rounded w-3/4"></div>
          <div className="h-6 bg-gray-700/50 rounded w-1/2"></div>
          <div className="h-32 bg-gray-700/50 rounded"></div>
          <div className="h-12 bg-gray-700/50 rounded"></div>
        </div>
      </div>
    );
  }

  return null;
};

export default LoadingSkeleton;