import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.farmfresh.com/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// Product categories
const PRODUCT_CATEGORIES = {
  VEGETABLES: 'Vegetables',
  FRUITS: 'Fruits',
  GRAINS: 'Grains',
  DAIRY: 'Dairy',
  DESI_NONVEG: 'Desi Non-Veg',
  LOCAL_PROCESSED: 'Local Processed Foods'
};

// Mock farmers data
const mockFarmers = [
  {
    id: 'farmer-1',
    name: 'Ramesh Kumar',
    farmName: 'Green Acres Farm',
    location: 'Bhagalpur, Bihar',
    specialties: ['Organic Vegetables', 'Rice', 'Lentils'],
    yearsExperience: 15,
    certification: 'Organic Certified',
    contact: '9876543210',
    image: '/farmer1.jpg',
    description: 'Third generation farmer specializing in organic farming techniques. Uses traditional methods combined with modern organic practices.'
  },
  {
    id: 'farmer-2',
    name: 'Sita Devi',
    farmName: 'Ganga Dairy Farm',
    location: 'Naugachia, Bihar',
    specialties: ['A2 Milk', 'Ghee', 'Paneer'],
    yearsExperience: 20,
    certification: 'A2 Certified',
    contact: '9765432109',
    image: '/farmer2.jpg',
    description: 'Family-run dairy farm with 50+ desi cows. Produces pure A2 milk and traditional dairy products.'
  },
  {
    id: 'farmer-3',
    name: 'Amit Yadav',
    farmName: 'Local Harvest',
    location: 'Kahalgaon, Bihar',
    specialties: ['Seasonal Vegetables', 'Fruits', 'Herbs'],
    yearsExperience: 8,
    certification: 'Natural Farming',
    contact: '8765432190',
    image: '/farmer3.jpg',
    description: 'Young farmer using natural farming methods. Specializes in seasonal produce and heirloom varieties.'
  }
];

// Import natural-farming-products.json directly (Vite handles this)
import naturalFarmingData from '../data/natural-farming-products.json';

// Function to fetch products from natural-farming-products.json
function fetchProductsFromDataJson() {
  try {
    // Use only natural farming data
    const allData = [...naturalFarmingData];
    
    // Map data.json items to our product format
    return allData.map(item => {
      // Natural farming categories (keep as-is)
      const naturalFarmingCategories = [
        'natural-fertilizers',
        'bio-pesticides',
        'bio-fertilizers',
        'desi-seeds',
        'plants-saplings',
        'farm-tools',
        'small-machinery',
        'irrigation',
        'animal-care',
        'storage-packaging',
        'training-services'
      ];
      
      let productCategory;
      
      // Check if it's a natural farming product category
      if (naturalFarmingCategories.includes(item.category)) {
        productCategory = item.category; // Keep the original category
      } else {
        // Map old categories from data.json to our PRODUCT_CATEGORIES
        switch(item.category) {
          case 'vegetable':
            productCategory = PRODUCT_CATEGORIES.VEGETABLES;
            break;
          case 'fruit':
            productCategory = PRODUCT_CATEGORIES.FRUITS;
            break;
          case 'pulses_grains':
            productCategory = PRODUCT_CATEGORIES.GRAINS;
            break;
          case 'dairy':
            productCategory = PRODUCT_CATEGORIES.DAIRY;
            break;
          case 'oils_spices':
            productCategory = PRODUCT_CATEGORIES.LOCAL_PROCESSED;
            break;
          case 'locery':
            productCategory = PRODUCT_CATEGORIES.LOCAL_PROCESSED;
            break;
          case 'nonveg_local':
            productCategory = PRODUCT_CATEGORIES.DESI_NONVEG;
            break;
          case 'herb':
            productCategory = PRODUCT_CATEGORIES.VEGETABLES;
            break;
          default:
            productCategory = PRODUCT_CATEGORIES.VEGETABLES;
        }
      }

      // Map quantity units to our standard units
      let unit;
      switch(item.quantity_units) {
        case 'kg':
          unit = 'kg';
          break;
        case 'litre':
          unit = 'liter';
          break;
        case 'dozen':
          unit = 'dozen';
          break;
        case 'bundle':
          unit = 'bundle';
          break;
        case 'piece':
          unit = 'piece';
          break;
        case 'jar':
          unit = 'jar';
          break;
        default:
          unit = 'kg';
      }

      // Assign random farmer and pricing
      const randomFarmer = mockFarmers[Math.floor(Math.random() * mockFarmers.length)];
      // Use the price from the item if available, otherwise generate random price
      const basePrice = item.price || (Math.floor(Math.random() * 200) + 30);

      return {
        id: item.id,
        name: item.name,
        description: item.description,
        category: productCategory,
        price: basePrice,
        unit: unit,
        images: [item.image],
        isOrganic: item.local_only || false,
        certification: item.local_only ? 'Local Certified' : 'Standard',
        benefits: [
          item.description,
          item.local_only ? 'Locally sourced' : 'Fresh produce',
          item.farmer_sold ? 'Farmer direct' : 'Quality assured'
        ].filter(Boolean),
        deliveryDays: ['Monday', 'Wednesday', 'Friday'],
        stock: Math.floor(Math.random() * 100) + 20,
        farmerId: randomFarmer.id,
        offReference: item.off_reference
      };
    });
  } catch (error) {
    console.error('Error fetching data from data.json:', error);
    return []; // Return empty array on error
  }
}

// Function to fetch products from OpenFoodFacts API or data.json
function fetchProductsFromAPI(category, count = 10) {
  try {
    // Fetch products from data.json
    const products = fetchProductsFromDataJson();

    // Filter by category if specified
    if (category) {
      return products.filter(product => product.category === category);
    }

    return products.slice(0, count);
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Return empty array on error
  }
}

// API Service Methods
export const apiService = {
  // Auth endpoints
  sendOTP: (phone) => {
    console.log('Mock: Sending OTP to', phone);
    return Promise.resolve({ success: true, message: 'OTP sent successfully' });
  },

  verifyOTP: (phone, otp) => {
    console.log('Mock: Verifying OTP', otp, 'for', phone);
    return Promise.resolve({
      success: true,
      user: {
        id: 'user-123',
        phone,
        name: '',
        addresses: [],
        profileCompleted: false
      },
      token: 'mock-token-' + Math.random().toString(36).substr(2, 9)
    });
  },

  completeProfile: (profileData) => {
    console.log('Mock: Completing profile', profileData);
    return Promise.resolve({
      success: true,
      user: {
        ...profileData,
        id: 'user-123',
        phone: profileData.phone,
        profileCompleted: true
      },
      token: 'mock-token-' + Math.random().toString(36).substr(2, 9)
    });
  },

  getUserProfile: () => {
    const token = localStorage.getItem('token');
    if (!token) return Promise.reject(new Error('Not authenticated'));

    // Parse the token to extract phone number (mock token format: 'mock-token-{phone}')
    const phone = token.replace('mock-token-', '');
    const profileCompleted = token.includes('mock-token-') && phone.length === 10;

    return Promise.resolve({
      user: {
        id: 'user-123',
        phone: phone,
        name: profileCompleted ? 'John Doe' : '',
        email: profileCompleted ? 'john@example.com' : '',
        addresses: profileCompleted ? [
          {
            id: 'addr-1',
            name: 'Home',
            phone: phone,
            addressLine1: '123 Farm Lane',
            city: 'Bangalore',
            state: 'Karnataka',
            pincode: '560001',
            isDefault: true
          }
        ] : [],
        profileCompleted: profileCompleted
      }
    });
  },

  // Product endpoints
  getFeaturedProducts: async () => {
    // Get 6 random products from natural-farming-products.json
    const shuffled = [...naturalFarmingData].sort(() => 0.5 - Math.random());
    const randomProducts = shuffled.slice(0, 6);
    
    // Map to product format
    return randomProducts.map(item => {
      const randomFarmer = mockFarmers[Math.floor(Math.random() * mockFarmers.length)];
      const basePrice = item.price || (Math.floor(Math.random() * 200) + 30);
      
      let unit;
      switch(item.quantity_units) {
        case 'kg':
          unit = 'kg';
          break;
        case 'litre':
          unit = 'liter';
          break;
        case 'dozen':
          unit = 'dozen';
          break;
        case 'bundle':
          unit = 'bundle';
          break;
        case 'piece':
          unit = 'piece';
          break;
        case 'jar':
          unit = 'jar';
          break;
        default:
          unit = 'kg';
      }
      
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        category: item.category,
        price: basePrice,
        unit: unit,
        images: [item.image],
        isOrganic: item.local_only || false,
        certification: item.local_only ? 'Local Certified' : 'Standard',
        benefits: [
          item.description,
          item.local_only ? 'Locally sourced' : 'Fresh produce',
          item.farmer_sold ? 'Farmer direct' : 'Quality assured'
        ].filter(Boolean),
        deliveryDays: ['Monday', 'Wednesday', 'Friday'],
        stock: Math.floor(Math.random() * 100) + 20,
        farmerId: randomFarmer.id
      };
    });
  },

  getComboPacks: () => {
    try {
      const products = fetchProductsFromDataJson();

      // Create combo packs using products from data.json
      const vegetableProducts = products.filter(p => p.category === PRODUCT_CATEGORIES.VEGETABLES);
      const dairyProducts = products.filter(p => p.category === PRODUCT_CATEGORIES.DAIRY);
      const grainProducts = products.filter(p => p.category === PRODUCT_CATEGORIES.GRAINS);

      const combos = [];

      // Vegetable Combo - use first 2 vegetable products
      if (vegetableProducts.length >= 2) {
        combos.push({
          id: 'combo-1',
          name: 'Vegetable Combo',
          description: 'Weekly essential vegetables',
          items: [
            {
              id: vegetableProducts[0].id,
              name: vegetableProducts[0].name,
              price: vegetableProducts[0].price,
              images: [vegetableProducts[0].images[0]]
            },
            {
              id: vegetableProducts[1].id,
              name: vegetableProducts[1].name,
              price: vegetableProducts[1].price,
              images: [vegetableProducts[1].images[0]]
            }
          ],
          price: vegetableProducts[0].price + vegetableProducts[1].price - 10,
          originalPrice: vegetableProducts[0].price + vegetableProducts[1].price,
          discount: 10,
          image: vegetableProducts[0].images[0]
        });
      }

      // Local Specials Combo with Onion and Brinjal Daal
      const onionProduct = products.find(p => p.id === 'veg_onion');
      const brinjalProduct = products.find(p => p.id === 'veg_brinjal');
      const toorDalProduct = products.find(p => p.id === 'pulse_toor');

      if (onionProduct && brinjalProduct && toorDalProduct) {
        combos.push({
          id: 'combo-special',
          name: 'Local Specials Combo',
          description: 'Onion, Brinjal and Toor Daal combo - local favorites',
          items: [
            {
              id: onionProduct.id,
              name: onionProduct.name,
              price: onionProduct.price,
              images: [onionProduct.images[0]]
            },
            {
              id: brinjalProduct.id,
              name: brinjalProduct.name,
              price: brinjalProduct.price,
              images: [brinjalProduct.images[0]]
            },
            {
              id: toorDalProduct.id,
              name: toorDalProduct.name,
              price: toorDalProduct.price,
              images: [toorDalProduct.images[0]]
            }
          ],
          price: onionProduct.price + brinjalProduct.price + toorDalProduct.price - 40,
          originalPrice: onionProduct.price + brinjalProduct.price + toorDalProduct.price,
          discount: 40,
          image: onionProduct.images[0]
        });
      }

      // Dairy Combo - use first 2 dairy products if available, otherwise use other products
      if (dairyProducts.length >= 2) {
        combos.push({
          id: 'combo-2',
          name: 'Dairy Combo',
          description: 'Weekly dairy essentials',
          items: [
            {
              id: dairyProducts[0].id,
              name: dairyProducts[0].name,
              price: dairyProducts[0].price,
              images: [dairyProducts[0].images[0]]
            },
            {
              id: dairyProducts[1].id,
              name: dairyProducts[1].name,
              price: dairyProducts[1].price,
              images: [dairyProducts[1].images[0]]
            }
          ],
          price: dairyProducts[0].price + dairyProducts[1].price - 50,
          originalPrice: dairyProducts[0].price + dairyProducts[1].price,
          discount: 50,
          image: dairyProducts[0].images[0]
        });
      } else if (products.length >= 2) {
        // Fallback combo if no dairy products
        combos.push({
          id: 'combo-2',
          name: 'Local Specials Combo',
          description: 'Weekly local specials',
          items: [
            {
              id: products[0].id,
              name: products[0].name,
              price: products[0].price,
              images: [products[0].images[0]]
            },
            {
              id: products[1].id,
              name: products[1].name,
              price: products[1].price,
              images: [products[1].images[0]]
            }
          ],
          price: products[0].price + products[1].price - 30,
          originalPrice: products[0].price + products[1].price,
          discount: 30,
          image: products[0].images[0]
        });
      }

      return Promise.resolve(combos);
    } catch (error) {
      console.error('Error creating combo packs:', error);
      // Fallback to original mock data if there's an error
      return Promise.resolve([
        {
          id: 'combo-1',
          name: 'Vegetable Combo',
          description: 'Weekly essential vegetables',
          items: [
            { id: 'veg-1', name: 'Organic Tomatoes', price: 50, images: ['https://static.openfoodfacts.org/images/products/356/007/045/5302/front_en.44.400.jpg'] },
            { id: 'veg-2', name: 'Local Okra', price: 40, images: ['https://static.openfoodfacts.org/images/products/356/007/045/5302/front_en.44.400.jpg'] }
          ],
          price: 250,
          originalPrice: 280,
          discount: 30,
          image: 'https://static.openfoodfacts.org/images/products/356/007/045/5302/front_en.44.400.jpg'
        },
        {
          id: 'combo-2',
          name: 'Dairy Combo',
          description: 'Weekly dairy essentials',
          items: [
            { id: 'dairy-1', name: 'A2 Cow Milk', price: 60, images: ['https://static.openfoodfacts.org/images/products/356/007/045/5302/front_en.44.400.jpg'] },
            { id: 'dairy-2', name: 'Desi Ghee', price: 600, images: ['https://static.openfoodfacts.org/images/products/356/007/045/5302/front_en.44.400.jpg'] }
          ],
          price: 1200,
          originalPrice: 1300,
          discount: 100,
          image: 'https://static.openfoodfacts.org/images/products/356/007/045/5302/front_en.44.400.jpg'
        }
      ]);
    }
  },

  getProductsByCategory: async (categoryId) => {
    const allProducts = fetchProductsFromDataJson();
    
    // Natural farming products use the category slug directly (e.g., 'desi-seeds')
    // Regular products use old format (e.g., 'vegetable')
    // We need to check both formats
    
    // First, try to find products with the exact category match (for natural farming products)
    const directMatch = allProducts.filter(product => product.category === categoryId);
    
    if (directMatch.length > 0) {
      return directMatch;
    }
    
    // If no direct match, try mapping old category format to new slugs
    const categoryMap = {
      'Vegetables': 'vegetable',
      'Fruits': 'fruit',
      'Grains': 'pulses_grains',
      'Dairy': 'dairy',
      'Desi Non-Veg': 'nonveg_local',
      'Local Processed Foods': 'locery'
    };
    
    const mappedCategory = categoryMap[categoryId];
    
    if (mappedCategory) {
      return allProducts.filter(product => product.category === mappedCategory);
    }
    
    return allProducts;
  },

  getProductDetails: async (productId) => {
    const products = await fetchProductsFromAPI();
    const product = products.find(p => p.id === productId);
    if (!product) return Promise.reject(new Error('Product not found'));
    return product;
  },

  // Request endpoints
  getActiveRequest: () => {
    try {
      // Get products from data.json
      const products = fetchProductsFromDataJson();

      // Select 3 random products for the active request
      const selectedItems = [];
      const itemCount = Math.min(3, products.length);

      // Get random indices
      const randomIndices = [];
      while (randomIndices.length < itemCount) {
        const randomIndex = Math.floor(Math.random() * products.length);
        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex);
        }
      }

      // Create items for the request
      let totalAmount = 0;
      for (let i = 0; i < itemCount; i++) {
        const product = products[randomIndices[i]];
        const quantity = Math.floor(Math.random() * 3) + 1; // 1-3 quantity
        const itemTotal = product.price * quantity;
        totalAmount += itemTotal;

        selectedItems.push({
          id: product.id,
          name: product.name,
          quantity: quantity,
          price: product.price,
          image: product.images[0] || '/placeholder-product.jpg'
        });
      }

      return Promise.resolve({
        id: 'req-123',
        status: 'pending',
        items: selectedItems,
        totalAmount: totalAmount,
        deliveryDay: 'Friday',
        deliveryDate: '2025-12-15'
      });
    } catch (error) {
      console.error('Error creating active request:', error);
      // Fallback to original mock data if there's an error
      return Promise.resolve({
        id: 'req-123',
        status: 'pending',
        items: [
          { id: '1', name: 'Organic Tomatoes', quantity: 2, price: 50, image: '/tomato.jpg' },
          { id: '3', name: 'Brown Rice', quantity: 1, price: 80, image: '/rice.jpg' }
        ],
        totalAmount: 180,
        deliveryDay: 'Friday',
        deliveryDate: '2025-12-15'
      });
    }
  },

  createRequest: (requestData) => {
    console.log('Mock: Creating request', requestData);

    // Validate that user has provided delivery address
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.addresses || user.addresses.length === 0) {
      return Promise.reject(new Error('Please complete your delivery address before placing a request'));
    }

    return Promise.resolve({
      success: true,
      requestId: 'req-' + Math.random().toString(36).substr(2, 8),
      message: 'Request submitted successfully'
    });
  },

  // Farmer endpoints
  getAllFarmers: () => {
    return Promise.resolve(mockFarmers);
  },

  getFarmerDetails: (farmerId) => {
    const farmer = mockFarmers.find(f => f.id === farmerId);
    if (!farmer) return Promise.reject(new Error('Farmer not found'));
    return Promise.resolve(farmer);
  },

  getProductsByFarmer: async (farmerId) => {
    const products = await fetchProductsFromAPI();
    return products.filter(product => product.farmerId === farmerId);
  },

  getProductCategories: () => {
    return Promise.resolve(Object.values(PRODUCT_CATEGORIES));
  }
};

export { fetchProductsFromDataJson };
export default api;