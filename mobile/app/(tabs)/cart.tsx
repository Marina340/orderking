import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '@/context/CartContext';
import { ordersService } from '@/services/orders';
import Button from '@/components/Button';
import EmptyState from '@/components/EmptyState';
import InputModal from '@/components/InputModal';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '@/constants/theme';
import { handleApiError } from '@/services/api';

export default function CartScreen() {
  const { items, updateQuantity, removeFromCart, totalAmount, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [phoneModalVisible, setPhoneModalVisible] = useState(false);
  const [tempAddress, setTempAddress] = useState('');

  const handleCheckout = () => {
    if (items.length === 0) return;
    setAddressModalVisible(true);
  };

  const handlePhoneInput = (address: string) => {
    setTempAddress(address);
    setPhoneModalVisible(true);
  };

  const placeOrder = async (address: string, phone: string) => {
    setLoading(true);
    try {
      const orderData = {
        items: items.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),
        shipping_address: address,
        phone: phone,
      };

      await ordersService.createOrder(orderData);
      clearCart();
      
      Alert.alert(
        'Success!',
        'Your order has been placed successfully',
        [{ text: 'View Orders', onPress: () => router.push('/(tabs)/orders') }]
      );
    } catch (error) {
      Alert.alert('Error', handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.title}>Shopping Cart</Text>
        </View>
        <EmptyState
          icon="cart-outline"
          title="Your cart is empty"
          message="Add some products to get started"
          actionLabel="Start Shopping"
          onAction={() => router.push('/(tabs)/shop')}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Shopping Cart</Text>
        <Text style={styles.itemCount}>{items.length} items</Text>
      </View>

      <FlatList
        data={items}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item) => item.product.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image
              source={{ uri: item.product.image_url || 'https://via.placeholder.com/80' }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={2}>
                {item.product.name}
              </Text>
              <Text style={styles.productPrice}>
                EGP {item.product.price.toFixed(2)}
              </Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(item.product.id, item.quantity - 1)}
              >
                <Ionicons name="remove" size={20} color={COLORS.primary} />
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
              >
                <Ionicons name="add" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeFromCart(item.product.id)}
            >
              <Ionicons name="trash-outline" size={20} color={COLORS.error} />
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>EGP {totalAmount.toFixed(2)}</Text>
        </View>
        <Button
          title="Proceed to Checkout"
          onPress={handleCheckout}
          loading={loading}
          style={styles.checkoutButton}
        />
      </View>
      
      <InputModal
        visible={addressModalVisible}
        title="Shipping Address"
        message="Enter your shipping address"
        placeholder="Enter your full shipping address"
        onSubmit={handlePhoneInput}
        onCancel={() => setAddressModalVisible(false)}
        submitText="Continue"
      />
      
      <InputModal
        visible={phoneModalVisible}
        title="Phone Number"
        message="Enter your phone number"
        placeholder="Enter your phone number"
        onSubmit={(phone) => placeOrder(tempAddress, phone)}
        onCancel={() => setPhoneModalVisible(false)}
        submitText="Place Order"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary,
  },
  header: {
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.textPrimary,
  },
  itemCount: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  listContainer: {
    padding: SPACING.md,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.gray100,
  },
  productInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  productName: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SPACING.md,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.textPrimary,
    marginHorizontal: SPACING.md,
    minWidth: 30,
    textAlign: 'center',
  },
  removeButton: {
    padding: SPACING.sm,
    marginLeft: SPACING.sm,
  },
  footer: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  totalLabel: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.textPrimary,
  },
  totalAmount: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
  },
  checkoutButton: {
    width: '100%',
  },
});
