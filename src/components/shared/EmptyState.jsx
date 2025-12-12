const EmptyState = ({ icon = '📭', title, description, action }) => {
  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl border border-purple-500/20 p-12 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold mb-2 text-gray-300">{title}</h3>
      <p className="text-gray-400 mb-6 max-w-md mx-auto">{description}</p>
      {action && (
        <button 
          onClick={action.onClick}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-purple-500/30 hover:scale-105"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;