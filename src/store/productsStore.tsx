import {create} from 'zustand';
import {ProductCardProps} from '../types';
import {Product} from '../types';
interface ProductStore {
  originalProducts: Product[];
  cardProducts: ProductCardProps['product'][];
  setProducts: (products: Product[]) => void;
  getOriginalProduct: (id: string) => Product | undefined;
}

const useProductStore = create<ProductStore>((set, get) => ({
  originalProducts: [],
  cardProducts: [],

  setProducts: products => {
    const cardProducts = products.map(product => ({
      id: product.productId.toString(),
      name: product.ProductName,
      description: product.ProductInformation || 'No description available',
      quantity: `Available: ${product.StockAvailableInInventory}`,
      delivery: 'Delivery in 2-3 days',
      originalPrice: parseFloat(product.SellingPrice),
      discountedPrice: parseFloat(product.CostPrice),
      discountPercentage: parseFloat(product.DiscountedPercentage),
      Category: product.Category?.toString() ?? '',
      SubCategory: product.subCategory?.toString() ?? '',
      image: product.images?.[0] || '',

      // Store reference to original product
      _originalProduct: product,
    }));

    set({
      originalProducts: products,
      cardProducts,
    });
  },

  getOriginalProduct: id => {
    return get().originalProducts.find(
      product => product.productId.toString() === id,
    );
  },
}));

export default useProductStore;
