import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Clock, Minus, Plus} from 'lucide-react-native';
import styles from './index.styles';
import {ProductCardProps} from '../../../types';
import {useCartStore} from '../../../store/cartStore';
import {DeleteFromCart} from '../../../Services/cart'; // Import your delete function
import {useAuthStore} from '../../../store/authStore';
import useProductStore from '../../../store/productsStore';

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  borderColor = '#EB575766',
  buttonColor = '#EB575766',
  backgroundColor = '#FFEBD4',
  style,
  addingToCart = false,
}) => {
  const productId = parseInt(product.id, 10);
  const customer_id = useAuthStore(state => state.customer_id);

  const quantity = useCartStore(state =>
    state.getProductQuantity(customer_id?.toString() ?? '', productId),
  );
  const setProductQuantity = useCartStore(state => state.setProductQuantity);

  const [isLoading, setIsLoading] = useState(false);
  const {getOriginalProduct} = useProductStore();
  const originalProduct = getOriginalProduct(productId.toString());
  const availableInventory = originalProduct?.StockAvailableInInventory || 0;
  const isOutOfStock = availableInventory === 0;
  const canIncreaseQuantity = quantity < availableInventory;
  const handleAddItem = async () => {
    if (isLoading) {
      return;
    }

    try {
      setIsLoading(true);
      if (onAddToCart) {
        await onAddToCart(product.id, 1);
      }
      setProductQuantity(customer_id?.toString() ?? '', productId, 1);
    } catch (error) {
      console.error('Add item error:', error);
      setProductQuantity(customer_id?.toString() ?? '', productId, 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncrement = async () => {
    if (isLoading || !canIncreaseQuantity) {
      return;
    }

    setProductQuantity(customer_id?.toString() ?? '', productId, quantity + 1);
  };

  const handleDecrement = async () => {
    if (isLoading || quantity <= 0) {
      return;
    }

    const newQuantity = quantity - 1;

    try {
      setIsLoading(true);

      if (newQuantity === 0) {
        const res = await DeleteFromCart(customer_id?.toString() ?? '', [
          productId,
        ]);
        console.log('deleted', res);
      }

      setProductQuantity(customer_id?.toString() ?? '', productId, newQuantity);
    } catch (error) {
      console.error('Delete from cart error:', error);

      setProductQuantity(customer_id?.toString() ?? '', productId, quantity);
    } finally {
      setIsLoading(false);
    }
  };

  const showLoading = isLoading || addingToCart;

  const dynamicStyles = {
    cardContainer: {
      borderColor: borderColor,
      backgroundColor: backgroundColor,
    },
    addButton: {
      backgroundColor: buttonColor,
    },
    counterContainer: {
      backgroundColor: buttonColor,
    },
  };

  return (
    <View style={[styles.cardContainer, dynamicStyles.cardContainer, style]}>
      <View style={styles.imageContainer}>
        <Image source={{uri: product.image}} style={styles.productImage} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.quantityContainer}>
          <Text style={styles.quantityText}>{product.quantity}</Text>
        </View>

        <View style={styles.deliveryContainer}>
          <Clock size={12} color="#666" />
          <Text style={styles.deliveryText}>{product.delivery}</Text>
        </View>

        {/* <View style={styles.discountContainer}>
          <Text style={styles.originalPrice}>₹{product.discountedPrice}</Text>
          <Text style={styles.discountPercentage}>
            {product.discountPercentage}% off
          </Text>
        </View> */}
        <View style={styles.discountContainer}>
          <Text style={styles.originalPrice}>₹{product.discountedPrice}</Text>
          <Text style={styles.discountPercentage}>
            {Math.round(
              ((product.discountedPrice - product.originalPrice) /
                product.discountedPrice) *
                100,
            )}
            % off
          </Text>
        </View>

        <Text style={styles.currentPrice}>₹{product.originalPrice}</Text>
      </View>

      {quantity > 0 ? (
        <View style={[styles.counterContainer, dynamicStyles.counterContainer]}>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={handleDecrement}
            disabled={showLoading}>
            {showLoading && quantity === 1 ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Minus size={14} color="#FFF" />
            )}
          </TouchableOpacity>

          <Text style={styles.counterText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={handleIncrement}
            disabled={showLoading || !canIncreaseQuantity}>
            <Plus size={14} color={!canIncreaseQuantity ? '#cccccc' : '#FFF'} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.addButtonForOutofStock, dynamicStyles.addButton]}
          onPress={handleAddItem}
          disabled={showLoading || isOutOfStock}>
          {showLoading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : isOutOfStock ? (
            <Text style={styles.outOfStockButtonText}>Out of Stock</Text>
          ) : (
            <Plus size={16} color="#FFF" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProductCard;
