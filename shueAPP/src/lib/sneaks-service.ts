import { Product } from './data';

export interface SneaksProduct {
  shoeName: string;
  brand: string;
  silhoutte: string;
  styleID: string;
  retailPrice: number;
  releaseDate: string;
  description: string;
  imageLinks: string[];
  thumbnail: string;
  urlKey: string;
  colorway: string;
  resellLinks: {
    stockX: string;
    goat: string;
    flightClub: string;
    stadiumGoods: string;
  };
  resellPrices: {
    stockX: number;
    goat: number;
    flightClub: number;
    stadiumGoods: number;
  };
  lowestResellPrice: {
    stockX: number;
    goat: number;
    flightClub: number;
    stadiumGoods: number;
  };
}

export interface SneaksProductWithPrices {
  shoeName: string;
  brand: string;
  silhoutte: string;
  styleID: string;
  retailPrice: number;
  releaseDate: string;
  description: string;
  imageLinks: string[];
  thumbnail: string;
  urlKey: string;
  colorway: string;
  resellLinks: {
    stockX: string;
    goat: string;
    flightClub: string;
    stadiumGoods: string;
  };
  resellPrices: {
    stockX: { [size: string]: number };
    goat: { [size: string]: number };
    flightClub: { [size: string]: number };
    stadiumGoods: { [size: string]: number };
  };
  lowestResellPrice: {
    stockX: number;
    goat: number;
    flightClub: number;
    stadiumGoods: number;
  };
}

class SneaksService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private sneaks: any;

  constructor() {
    this.initializeSneaks();
  }

  private async initializeSneaks() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
      const SneaksAPI = require('sneaks-api');
      this.sneaks = new SneaksAPI();
    } catch (error) {
      console.error('Failed to initialize Sneaks API:', error);
    }
  }

  private async ensureSneaksInitialized() {
    if (!this.sneaks) {
      await this.initializeSneaks();
    }
  }

  // Search for products by keyword
  async searchProducts(keyword: string, limit: number = 10): Promise<SneaksProduct[]> {
    await this.ensureSneaksInitialized();
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.sneaks.getProducts(keyword, limit, (err: any, products: SneaksProduct[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(products || []);
        }
      });
    });
  }

  // Get detailed product information with prices by style ID
  async getProductPrices(styleID: string): Promise<SneaksProductWithPrices> {
    await this.ensureSneaksInitialized();
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.sneaks.getProductPrices(styleID, (err: any, product: SneaksProductWithPrices) => {
        if (err) {
          reject(err);
        } else {
          resolve(product);
        }
      });
    });
  }

  // Get most popular products
  async getMostPopular(limit: number = 10): Promise<SneaksProduct[]> {
    await this.ensureSneaksInitialized();
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.sneaks.getMostPopular(limit, (err: any, products: SneaksProduct[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(products || []);
        }
      });
    });
  }

  // Convert Sneaks product to our app's Product format
  convertToAppProduct(sneaksProduct: SneaksProduct, sellerId: string = '1'): Product {
    // Generate sizes with realistic pricing based on retail price
    const generateSizes = (retailPrice: number) => {
      const sizes = ['8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'];
      const baseMultiplier = Math.random() * 0.5 + 1.2; // 1.2x to 1.7x retail
      
      return sizes.map(size => ({
        size,
        price: Math.round(retailPrice * (baseMultiplier + (Math.random() * 0.3 - 0.15)))
      }));
    };

    return {
      id: sneaksProduct.styleID || Math.random().toString(36).substr(2, 9),
      name: sneaksProduct.shoeName || 'Unknown Sneaker',
      brand: sneaksProduct.brand || 'Unknown',
      colorway: sneaksProduct.colorway || 'Unknown',
      releaseDate: sneaksProduct.releaseDate || new Date().toISOString().split('T')[0],
      retailPrice: sneaksProduct.retailPrice || 0,
      images: sneaksProduct.imageLinks && sneaksProduct.imageLinks.length > 0 
        ? sneaksProduct.imageLinks.slice(0, 3) 
        : [sneaksProduct.thumbnail || '/images/placeholder.jpg'],
      sizes: generateSizes(sneaksProduct.retailPrice || 100),
      category: this.getCategoryFromBrand(sneaksProduct.brand),
      condition: 'New',
      sellerId: sellerId,
      styleID: sneaksProduct.styleID,
      description: sneaksProduct.description || '',
      resellLinks: sneaksProduct.resellLinks || {}
    };
  }

  private getCategoryFromBrand(brand: string): string {
    const brandLower = brand?.toLowerCase() || '';
    if (brandLower.includes('jordan') || brandLower.includes('nike basketball')) {
      return 'Basketball';
    } else if (brandLower.includes('nike') || brandLower.includes('adidas') || brandLower.includes('new balance')) {
      return 'Lifestyle';
    } else {
      return 'Lifestyle';
    }
  }

  // Get featured products for homepage
  async getFeaturedProducts(): Promise<Product[]> {
    try {
      const popularProducts = await this.getMostPopular(6);
      return popularProducts.map(product => this.convertToAppProduct(product));
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }
  }

  // Search and convert products for the app
  async searchAndConvertProducts(keyword: string, limit: number = 10): Promise<Product[]> {
    try {
      const products = await this.searchProducts(keyword, limit);
      return products.map(product => this.convertToAppProduct(product));
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  }
}

export const sneaksService = new SneaksService();
