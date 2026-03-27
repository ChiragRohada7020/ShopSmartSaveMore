import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext';
const Navbar = () => {

    const { user } = useAuth();

  return (
    <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">ShopSmart</span>
                <span className="ml-1 text-2xl font-bold text-orange-500">.</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/how-it-works" className="text-gray-600 hover:text-blue-600 text-sm font-medium">
                How It Works
              </Link>
              <Link to="/stores" className="text-gray-600 hover:text-blue-600 text-sm font-medium">
                Supported Stores
              </Link>
              {user ? (
                <div className='gap-5 flex'>
                  <Link
                  to="/cart"
                  className="bg-black  text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-blue-600 transition-colors"
                >
                  Basket  🛒
                </Link>
                
                <Link
                  to="/logout"
                  className="bg-black  text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-blue-600 transition-colors"
                >
                  Logout  🛒
                </Link>
                  </div>
              ) : (
                <div className="flex space-x-4">
                  <Link
                    to="/login"
                    className="text-blue-600 px-3 py-2 text-sm font-medium hover:text-blue-800"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors"
                  >
                    Get Started Free
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

  );
};

export default Navbar;