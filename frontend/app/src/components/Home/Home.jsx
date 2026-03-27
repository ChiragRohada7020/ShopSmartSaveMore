import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
const HomePage = () => {

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Never overpay</span>
                  <span className="block text-blue-600">again</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  ShopSmart compares prices across all major retailers to find you the best deals instantly.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/search"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors"
                    >
                      Compare Prices Now
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/how-it-works"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition-colors"
                    >
                      How It Works
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
            alt="Online shopping on multiple devices"
          />
        </div>
      </div>

      {/* Supported Stores */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">We Compare</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              All Your Favorite Stores
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Get the best prices from top retailers all in one place
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
              {stores.map((store) => (
                <div key={store.name} className="flex items-center justify-center">
                  <img className="h-12" src={store.logo} alt={store.name} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Simple Steps</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              How ShopSmart Works
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {steps.map((step) => (
                <div key={step.name} className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                    <span className="text-xl font-bold">{step.number}</span>
                  </div>
                  <p className="mt-5 text-lg leading-6 font-medium text-gray-900">{step.name}</p>
                  <p className="mt-2 text-base text-gray-500">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to start saving?</span>
            <span className="block">Join thousands of smart shoppers today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-200">
            Average users save 15-30% on every purchase by comparing prices first.
          </p>
          <Link
            to="/register"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">ShopSmart</h3>
              <ul className="mt-4 space-y-4">
                <li><Link to="/about" className="text-base text-gray-300 hover:text-white">About Us</Link></li>
                <li><Link to="/careers" className="text-base text-gray-300 hover:text-white">Careers</Link></li>
                <li><Link to="/press" className="text-base text-gray-300 hover:text-white">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Features</h3>
              <ul className="mt-4 space-y-4">
                <li><Link to="/price-alerts" className="text-base text-gray-300 hover:text-white">Price Alerts</Link></li>
                <li><Link to="/browser-extension" className="text-base text-gray-300 hover:text-white">Browser Extension</Link></li>
                <li><Link to="/price-history" className="text-base text-gray-300 hover:text-white">Price History</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li><Link to="/privacy" className="text-base text-gray-300 hover:text-white">Privacy</Link></li>
                <li><Link to="/terms" className="text-base text-gray-300 hover:text-white">Terms</Link></li>
                <li><Link to="/cookies" className="text-base text-gray-300 hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Connect</h3>
              <ul className="mt-4 space-y-4">
                <li><Link to="/contact" className="text-base text-gray-300 hover:text-white">Contact Us</Link></li>
                <li><Link to="/blog" className="text-base text-gray-300 hover:text-white">Blog</Link></li>
                <li><Link to="/help" className="text-base text-gray-300 hover:text-white">Help Center</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 text-center">
              &copy; {new Date().getFullYear()} ShopSmart, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Data for supported stores
const stores = [
  { name: 'Amazon', logo: 'https://1000logos.net/wp-content/uploads/2016/10/Amazon-logo-meaning.jpg' },
  { name: 'Flipkart', logo: 'https://images.seeklogo.com/logo-png/31/1/flipkart-logo-png_seeklogo-318406.png' },
  { name: 'Myntra', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7rNHan2cUP-6EdvyibQCOriaPqI1B2arwjg&s' },
  { name: 'Ajio', logo: 'https://logos-world.net/wp-content/uploads/2022/12/Ajio-Logo.png' },
  { name: 'Target', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/54/JioMart_logo.svg/2048px-JioMart_logo.svg.png' },
  { name: 'Home Depot', logo: 'https://images.moneycontrol.com/static-mcnews/2023/06/Meesho-682x435.jpg' },
];

// Data for how it works steps
const steps = [
  {
    number: '1',
    name: 'Search for Products',
    description: 'Find what you want to buy using our powerful search engine.'
  },
  {
    number: '2',
    name: 'Compare Prices',
    description: 'See prices from all supported stores in one simple view.'
  },
  {
    number: '3',
    name: 'Save Money',
    description: 'Choose the best deal and save on every purchase.'
  }
];

export default HomePage;