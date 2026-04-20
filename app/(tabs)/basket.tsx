import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Trash2, ArrowRight, Lock, Minus, Plus, MoreVertical } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Alert } from 'react-native';

const DEMO_BASKET_ITEMS = [
  { id: '1', title: 'Tuva', price: '45.00', qty: 2, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1974&auto=format&fit=crop' },
  { id: '2', title: 'Design Theory', price: '32.00', qty: 1, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop' },
];

export default function BasketScreen() {
  const router = useRouter();
  const [basketItems, setBasketItems] = React.useState<any[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const loadCart = async () => {
        try {
          const cartData = await AsyncStorage.getItem('OBOY_CART');
          if (cartData) {
            setBasketItems(JSON.parse(cartData));
          } else {
            setBasketItems(DEMO_BASKET_ITEMS); // fallback to demo data if empty initially for showcase
          }
        } catch (e) {
          console.error(e);
        }
      };
      loadCart();
    }, [])
  );

  const clearBasket = async () => {
    await AsyncStorage.removeItem('OBOY_CART');
    setBasketItems([]);
    alert('Basket cleared!');
  };

  const updateQty = async (id: string, delta: number) => {
    const newItems = basketItems.map(item => {
      if (item.id === id) {
        return { ...item, qty: Math.max(1, item.qty + delta) };
      }
      return item;
    });
    setBasketItems(newItems);
    await AsyncStorage.setItem('OBOY_CART', JSON.stringify(newItems));
  };

  const handleLongPress = (item: any) => {
    Alert.alert(
      'Item Options',
      `What would you like to do with ${item.title}?`,
      [
        { text: 'View Details', onPress: () => router.push(`/detail/${item.id}`) },
        { text: 'Move to Wishlist', onPress: () => {
          // Mock wishlist
          updateQty(item.id, -item.qty); // remove from cart
          Alert.alert('Success', 'Moved to wishlist!');
        }},
        { text: 'Remove from Basket', style: 'destructive', onPress: () => updateQty(item.id, -item.qty) },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const total = basketItems.reduce((sum, item) => sum + (parseFloat(item.price) * item.qty), 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={Colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Basket</Text>
        <TouchableOpacity style={styles.iconButton} onPress={clearBasket}>
          <Trash2 size={22} color={Colors.error} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Item Grid */}
        <View style={styles.grid}>
          {basketItems.map(item => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.gridItem} 
              onLongPress={() => handleLongPress(item)}
              delayLongPress={300}
            >
              <View style={styles.itemImageContainer}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <TouchableOpacity style={styles.moreButton} onPress={() => handleLongPress(item)}>
                  <MoreVertical size={16} color={Colors.onSurface} />
                </TouchableOpacity>
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.itemPrice}>{item.price} USD</Text>
                <View style={styles.qtyContainer}>
                  <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(item.id, -1)}>
                    <Minus size={14} color={Colors.onSurfaceVariant} />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.qty < 10 ? `0${item.qty}` : item.qty}</Text>
                  <TouchableOpacity style={[styles.qtyBtn, { backgroundColor: Colors.primary }]} onPress={() => updateQty(item.id, 1)}>
                    <Plus size={14} color={Colors.white} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Continue Shopping */}
        <TouchableOpacity style={styles.continueBtn} onPress={() => router.push('/')}>
          <Text style={styles.continueText}>Continue Shopping</Text>
          <ArrowRight size={20} color={Colors.primary} />
        </TouchableOpacity>

        {/* Coupon */}
        <View style={styles.couponContainer}>
          <TextInput 
            placeholder="Discount Coupon" 
            placeholderTextColor={Colors.outlineVariant}
            style={styles.couponInput}
          />
          <TouchableOpacity onPress={() => alert('Coupon Applied!')}>
            <LinearGradient colors={Colors.soulGradient as [string, string]} style={styles.applyBtn}>
              <Text style={styles.applyText}>Apply</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Pricing Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Discount</Text>
            <Text style={styles.summaryValueDiscount}>-12.00 USD</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{total.toFixed(2)} USD</Text>
          </View>
        </View>
      </ScrollView>

      {/* Payment Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.checkoutBtn} onPress={() => router.push('/checkout')}>
          <LinearGradient 
            colors={Colors.soulGradient as [string, string]} 
            style={styles.checkoutGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Lock size={20} color={Colors.white} />
            <Text style={styles.checkoutText}>SECURE PAYMENT</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.6)',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 220,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  gridItem: {
    width: '47.5%', // close to 50% with gap
    backgroundColor: Colors.white,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 3,
  },
  itemImageContainer: {
    height: 160,
    backgroundColor: Colors.surfaceContainerHighest,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  moreButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemInfo: {
    padding: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
  },
  itemPrice: {
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurfaceVariant,
    marginBottom: 8,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 20,
    padding: 2,
    alignSelf: 'flex-start',
  },
  qtyBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  qtyText: {
    fontSize: 11,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
    paddingHorizontal: 8,
  },
  continueBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 18,
    marginTop: 24,
    marginBottom: 20,
  },
  continueText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
  },
  couponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 3,
    marginBottom: 24,
  },
  couponInput: {
    flex: 1,
    paddingHorizontal: 16,
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: Colors.onSurface,
  },
  applyBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  applyText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.white,
  },
  summaryContainer: {
    backgroundColor: 'rgba(238, 244, 250, 0.6)',
    borderRadius: 24,
    padding: 24,
    gap: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurfaceVariant,
  },
  summaryValueDiscount: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.tertiary,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(169, 179, 187, 0.1)',
    marginVertical: 4,
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: Colors.onSurface,
  },
  totalValue: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: Colors.onSurface,
    letterSpacing: -0.5,
  },
  footer: {
    position: 'absolute',
    bottom: 80, // Above tab bar
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: 'transparent',
  },
  checkoutBtn: {
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
  checkoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 12,
  },
  checkoutText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: Colors.white,
    letterSpacing: 1,
  },
});
