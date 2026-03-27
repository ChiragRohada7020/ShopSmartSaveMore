import { Link } from 'react-router-dom';

const SupportedStores = () => {
  const stores = [
    {
      name: 'Amazon',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
      description: 'World\'s largest online retailer with millions of products',
      categories: ['Electronics', 'Home', 'Books', 'Fashion']
    },
    {
      name: 'Flipkart',
      logo: 'https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png',
      description: 'Leading Indian e-commerce platform with great deals',
      categories: ['Mobiles', 'Appliances', 'Fashion', 'Groceries']
    },
    {
      name: 'Myntra',
      logo: 'https://images.indianexpress.com/2021/01/myntra.png',
      description: 'India\'s premier fashion destination',
      categories: ['Clothing', 'Footwear', 'Accessories', 'Beauty']
    },
    {
      name: 'Ajio',
      logo: 'https://logos-world.net/wp-content/uploads/2022/12/Ajio-Logo.png',
      description: 'Trendy fashion for men and women',
      categories: ['Premium Brands', 'Ethnic Wear', 'Casual Wear']
    },
    {
      name: 'JioMart',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/54/JioMart_logo.svg/1200px-JioMart_logo.svg.png',
      description: 'Online grocery and daily essentials',
      categories: ['Groceries', 'Household', 'Personal Care']
    },
    {
      name: 'Meesho',
      logo: 'https://images.moneycontrol.com/static-mcnews/2023/06/Meesho-682x435.jpg',
      description: 'Affordable products from local sellers',
      categories: ['Home Decor', 'Kitchenware', 'Fashion', 'Beauty']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation (same as your other pages) */}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Supported Stores
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            We compare prices across all these popular retailers
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stores.map((store) => (
            <div key={store.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-white p-2 rounded-md">
                    <img className="h-16 w-auto object-contain" src={store.logo} alt={store.name} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{store.name}</h3>
                    <p className="text-sm text-gray-500">{store.description}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-500">Popular Categories:</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {store.categories.map((category) => (
                      <span 
                        key={category} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <Link
                  to={`/stores/${store.name.toLowerCase()}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  View price comparisons<span aria-hidden="true"> &rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white shadow rounded-lg p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Don't see your favorite store?
            </h2>
            <p className="mt-2 text-lg text-gray-600 mb-6">
              We're constantly adding new retailers. Let us know which stores you'd like us to support!
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Suggest a Store
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupportedStores;