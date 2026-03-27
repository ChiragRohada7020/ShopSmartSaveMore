import { useState } from 'react';

const SearchBar = ({ 
  value, 
  onChange, 
  onSubmit, 
  placeholder = "Search for products...", 
  className = "" 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <form onSubmit={onSubmit} className={`w-full ${className}`}>
      <div className={`relative flex items-center transition-all duration-200 ${isFocused ? 'ring-2 ring-blue-500' : ''}`}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full px-6 py-4 border border-gray-300 rounded-full shadow-sm text-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          aria-label="Search for products"
        />
        <button
          type="submit"
          className={`absolute right-2 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isFocused ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
          aria-label="Search"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;