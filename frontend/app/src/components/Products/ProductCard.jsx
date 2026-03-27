import { useState } from 'react';
import { useAuth } from '../Context/AuthContext';

const ProductCard = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

 const onAddToCart = async () => {
  setIsAdding(true);
  setError(null);
  
  try {
    console.log(user);
    const response = await fetch('cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email:user,
        product: {
          id: product.id,
          title: product.title,
          source: product.source,
          cost: product.cost,
          imageUrl: product.imageUrl,
          productUrl: product.productUrl
        }
      })
    });

    // First check if the response is OK (status 200-299)
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to add to cart');
    }

    // Try to parse as JSON only if there's content
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      console.log('Added to cart:', data);
      // You might want to show a success message here
    } else {
      const text = await response.text();
      console.log('Success:', text);
      // Handle non-JSON successful responses
    }
  } catch (err) {
    setError(err.message);
    console.error('Error adding to cart:', err);
  } finally {
    setIsAdding(false);
  }
};

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden transition-all duration-300 ease-in-out 
                  border border-gray-200 hover:border-gray-300
                  shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)] hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]
                  ring-1 ring-gray-100 hover:ring-gray-200">

      {/* Floating border animation */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent 
                     group-hover:border-gray-200/60 pointer-events-none 
                     transition-all duration-500 ease-out -z-10" />

      {/* Product Image with inner shadow */}
      <div className="relative h-56 bg-gray-50 flex items-center justify-center p-4 
                     shadow-[inset_0_0_8px_rgba(0,0,0,0.04)]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/30" />
        <img
          src={product.imageUrl}
          alt={product.title}
          className="max-h-full max-w-full object-contain transition-all duration-500 
                    group-hover:scale-[1.03]"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300?text=Product+Image';
          }}
        />
      </div>

      {/* Product Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2 leading-snug 
                      group-hover:text-gray-700 transition-colors">
          {product.title}
        </h3>

        {/* Price and Source */}
        <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
          <span className="text-xl font-semibold text-gray-800">
            ₹{product.cost.toLocaleString('en-IN')}
          </span>
         <span className="text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300 pb-0.5">
  {product.source.toLowerCase().includes('amazon') ? (
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/d/de/Amazon_icon.png" 
      alt="Amazon" 
      className="h-10 w-auto"
    />
  ) : product.source.toLowerCase().includes('flipkart') ? (
    <img 
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVWzGxiYGlEM-IzG4PWRrn875F0LOcXLulhQ&s" 
      alt="Flipkart" 
      className="h-10 w-auto"
    />
  ) : (
    product.source
  )}
</span>
        </div>

        {/* Error message */}
        {error && (
          <div className="text-red-500 text-sm mb-3">
            {error}
          </div>
        )}

        {/* Action Buttons with inner shadows */}
        <div className="flex space-x-3">
          <a
            href={product.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center px-4 py-2 text-sm font-medium rounded-md 
                      text-gray-700 bg-white border border-gray-300 hover:border-gray-400 
                      shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)]
                      hover:shadow-[inset_0_1px_3px_rgba(255,255,255,0.9)]
                      focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 
                      transition-all duration-200"
          >
            View
          </a>
          <button
            onClick={onAddToCart}
            disabled={isAdding}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md 
                     text-white ${isAdding ? 'bg-gray-600' : 'bg-gray-900 hover:bg-gray-800'} 
                     shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]
                     hover:shadow-[inset_0_1px_3px_rgba(255,255,255,0.15)]
                     focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-1 
                     transition-all duration-200 relative overflow-hidden`}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-gray-700/10 to-gray-900/10 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center justify-center">
              {isAdding ? (
                'Adding...'
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add to Cart
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;