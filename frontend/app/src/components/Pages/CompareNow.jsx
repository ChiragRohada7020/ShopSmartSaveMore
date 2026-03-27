import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import SearchBar from '../components/Products/SearchBar';
import ProductCard from "../Products/ProductCard";
import Navbar from '../Header/Navbar';

const CompareNow = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to fetch products from API
 const fetchProducts = async (query) => {
  try {
    setLoading(true);
    setError(null);
    setProducts([]);
    
    const response = await fetch(`/compare?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Received non-JSON response');
    }

    const data = await response.json();
    
    // Filter out invalid products instead of failing completely
    const validProducts = data.filter(product => (
      product?.id && 
      product?.title && 
      product?.source && 
      typeof product?.cost === 'number' && 
      product?.imageUrl && 
      product?.productUrl
    ));

    if (validProducts.length === 0 && data.length > 0) {
      console.warn('No valid products found in response:', data);
      throw new Error('No product found ');
    }

    if (validProducts.length < data.length) {
      console.warn(`Filtered out ${data.length - validProducts.length} invalid products`);
    }

    setProducts(validProducts);
    
  } catch (err) {
    console.error('Fetch error:', err);
    setError(err.message || 'Failed to load products');
  } finally {
    setLoading(false);
  }
};
  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchProducts(searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">


      {/* Navigation (you can reuse your existing nav or create a separate component) */}
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Compare Prices Across Stores
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Find the best deals for any product you're looking for
          </p>
        </div>

        {/* Big Search Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <form onSubmit={handleSearch}>
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products (e.g., iPhone 15, Nike shoes)"
                className="w-full px-6 py-4 border border-gray-300 rounded-full shadow-sm text-lg focus:ring-blue-500 focus:border-blue-500"
                aria-label="Search for products to compare prices"
              />
              <button
                type="submit"
                className="absolute right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Searching for products...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {products.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Results for "{searchQuery}"
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-gray-500">
              Try searching for something else or check your spelling.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default CompareNow;