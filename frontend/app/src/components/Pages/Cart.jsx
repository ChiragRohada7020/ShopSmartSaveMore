import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const { token ,user} = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCartItems();
  }, [token]);

  const fetchCartItems = async () => {
    try {
      if (!token) {
        throw new Error('User not authenticated');
      }
      console.log(token)

      const response = await axios.post(
        'cart/cart_products',
        {
          token: token
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(response.data);
      if (response.data && Array.isArray(response.data)) {
        // Transform the API response to match our frontend structure
        const transformedItems = response.data.map(item => ({
          id: item.id,
          title: item.title,
          price: item.cost,
          imageUrl: item.imageUrl,
          source: item.source,
          productUrl: item.productUrl,
          // These fields might not be in the API response
          originalPrice: item.originalPrice || item.cost * 1.2, // Default to 20% higher if not provided
          priceDropDate: item.priceDropDate ? new Date(item.priceDropDate) : new Date(Date.now() - 86400000) // Default to 1 day ago if not provided
        }));
        setCartItems(transformedItems);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error('Error fetching cart items:', err);
      setError(err.message);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

 const removeFromCart = async (product) => {  // Now accepts the whole product object
  try {
    setLoading(true);
    const response = await fetch('cart/remove', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user,
        product: {  // Now sending the full product object
          id: product.id,
          title: product.title,
          source: product.source,
          cost: product.price,  // Note: Changed from product.cost to product.price to match your cart item structure
          imageUrl: product.imageUrl,
          productUrl: product.productUrl
        }
      })
    });
    
    if (response.ok) {
      await fetchCartItems();
    } else {
      throw new Error(data.message || 'Failed to remove item from cart');
    }
  } catch (err) {
    console.error('Error removing item from cart:', err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const totalSavings = cartItems.reduce((sum, item) => {
    const original = item.originalPrice || item.price;
    return sum + (original - item.price);
  }, 0);

  // Function to format how long ago price dropped
  const formatPriceDropTime = (date) => {
    if (!date) return '';
    const hours = Math.floor((Date.now() - date) / 3600000);
    if (hours < 24) return `Dropped ${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    const days = Math.floor(hours / 24);
    return `Dropped ${days} ${days === 1 ? 'day' : 'days'} ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-lg font-medium text-gray-900">Error loading cart</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Shopping Selection ({cartItems.length} items)</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-gray-500">Your selection is empty</h2>
            <Link
              to="/search"
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            {/* Items List */}
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        className="h-24 w-24 rounded-md object-contain"
                        src={item.imageUrl}
                        alt={item.title}
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="ml-4 flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div>
                          <h3 className="text-base font-medium text-gray-900">
                            <a href={item.productUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                              {item.title}
                            </a>
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">Sold by: {item.source}</p>
                        </div>
                        
                        {/* Price Information with Drop Indicator */}
                        <div className="mt-2 sm:mt-0">
                          <div className="flex flex-col items-end">
                            {item.originalPrice && item.originalPrice > item.price ? (
                              <>
                                <div className="flex items-center">
                                  <span className="text-gray-500 line-through mr-2">
                                    ₹{item.originalPrice.toFixed(2)}
                                  </span>
                                  <span className="text-lg font-medium text-gray-900">
                                    ₹{item.price.toFixed(2)}
                                  </span>
                                </div>
                                <div className="flex items-center mt-1">
                                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded mr-2">
                                    {Math.round((1 - item.price/item.originalPrice) * 100)}% OFF
                                  </span>
                                  {item.priceDropDate && (
                                    <span className="text-xs text-gray-500">
                                      {formatPriceDropTime(item.priceDropDate)}
                                    </span>
                                  )}
                                </div>
                              </>
                            ) : (
                              <span className="text-lg font-medium text-gray-900">
                                ₹{item.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="mt-4 flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
                        <a
                          href={item.productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600"
                        >
                          Buy Now on {item.source}
                        </a>
                       <button
  onClick={() => removeFromCart(item)}  // Now passing the entire item object
  className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
>
  Remove
</button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            {/* Price Summary */}
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Price Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total ({cartItems.length} items)</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                
                {totalSavings > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Savings</span>
                    <span className="font-medium text-green-600">-₹{totalSavings.toFixed(2)}</span>
                  </div>
                )}
                
                {totalSavings > 0 && (
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-green-600 flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      You're saving ₹{totalSavings.toFixed(2)} today!
                    </p>
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <Link
                  to="/search"
                  className="w-full text-center inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;