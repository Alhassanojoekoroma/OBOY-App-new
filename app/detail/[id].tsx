import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ShoppingBasket, Heart, Star, Minus, Plus, ShoppingBag, MessageCircle } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '../../utils/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMessaging, setIsMessaging] = useState(false);

  React.useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          users (
            id,
            full_name,
            university,
            profile_image_url
          )
        `)
        .eq('id', id)
        .single();

      if (!error && data) {
        setProduct(data);
      } else {
        // Fallback for UI if DB empty
        setProduct({
          id,
          title: 'Grey Casual shoe',
          price: 120,
          category: 'MEN FOOTWEAR',
          description: "Experience unparalleled comfort with our signature Grey Casual shoe by Velora Store.",
          image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop',
          user_id: 'dummy-seller',
          users: { full_name: 'Velora Store', university: 'Official Partner', profile_image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop'}
        });
      }
      setLoading(false);
    };

    if (id) fetchProduct();
  }, [id]);

  const handleContactSeller = async () => {
    if (!product) return;
    setIsMessaging(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const currentUserId = user?.id || 'dummy-buyer';
      
      const { data: existingChat } = await supabase
        .from('chats')
        .select('id')
        .eq('product_id', product.id)
        .or(`sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`)
        .limit(1)
        .single();

      if (existingChat) {
        router.push(`/messages/${existingChat.id}`);
      } else {
        const { data: newMessage, error } = await supabase
          .from('chats')
          .insert({
            sender_id: currentUserId,
            receiver_id: product.user_id,
            product_id: product.id,
            message: `Hi! I'm interested in your listing: "${product.title}"`,
          })
          .select()
          .single();

        if (error) throw error;
        router.push(`/messages?product_id=${product.id}&seller_id=${product.user_id}`);
      }
    } catch (error: any) {
      // If error occurs (like no db schema yet), just route directly for fallback
      router.push(`/messages?product_id=${product.id}&seller_id=${product.user_id}`);
    } finally {
      setIsMessaging(false);
    }
  };

  const basePrice = product?.price || 120;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={Colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/basket')}>
          <ShoppingBasket size={22} color={Colors.onSurface} />
          <View style={styles.badge} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: product?.image_url || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop' }} 
            style={styles.productImage}
          />
          <TouchableOpacity style={styles.favoriteBtn} onPress={() => alert('Saved to Wishlist')}>
            <Heart size={20} color={Colors.error} fill={Colors.error} />
          </TouchableOpacity>
        </View>

        {/* Title & Rating */}
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.categoryLabel}>{product?.category || 'FOOTWEAR'}</Text>
            <Text style={styles.title}>{product?.title || 'Casual shoe'}</Text>
          </View>
          <View style={styles.ratingBadge}>
            <Star size={16} color={Colors.tertiary} fill={Colors.tertiary} />
            <Text style={styles.ratingText}>4.8</Text>
          </View>
        </View>

        {/* Seller Card */}
        <View style={styles.sellerCard}>
          <View style={styles.sellerInfo}>
            <View style={styles.sellerAvatarContainer}>
               <Image source={{ uri: product?.users?.profile_image_url || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop' }} style={styles.sellerAvatar} />
            </View>
            <View>
              <Text style={styles.sellerName}>{product?.users?.full_name || 'Velora Store'}</Text>
              <Text style={styles.sellerStatus}>{product?.users?.university || 'Official Partner'}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.followBtn} onPress={handleContactSeller} disabled={isMessaging}>
            {isMessaging ? <Text style={styles.followBtnText}>...</Text> : <Text style={styles.followBtnText}>Message</Text>}
          </TouchableOpacity>
        </View>

        {/* Size Selection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Select Size</Text>
            <TouchableOpacity><Text style={styles.sizeChartText}>Size Chart</Text></TouchableOpacity>
          </View>
          <View style={styles.sizeRow}>
            {['S', 'M', 'L', 'XL'].map(size => (
              <TouchableOpacity 
                key={size} 
                onPress={() => setSelectedSize(size)}
                style={[
                  styles.sizeBtn, 
                  selectedSize === size && styles.sizeBtnActive
                ]}
              >
                <Text style={[styles.sizeBtnText, selectedSize === size && styles.sizeBtnTextActive]}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quantity */}
        <View style={styles.qtyRow}>
          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.qtyContainer}>
            <TouchableOpacity style={styles.qtyActionBtn} onPress={() => setQty(Math.max(1, qty - 1))}>
              <Minus size={18} color={Colors.onSurface} />
            </TouchableOpacity>
            <Text style={styles.qtyVal}>{qty}</Text>
            <TouchableOpacity style={[styles.qtyActionBtn, { backgroundColor: Colors.primary }]} onPress={() => setQty(qty + 1)}>
              <Plus size={18} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            {product?.description || "Experience unparalleled comfort with our signature Grey Casual shoe."}
          </Text>
        </View>
      </ScrollView>

      {/* Footer / Buy Bar */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.priceLabel}>TOTAL PRICE</Text>
          <Text style={styles.totalPrice}>${(basePrice * qty).toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.buyBtn} onPress={async () => {
          try {
            const currentCart = await AsyncStorage.getItem('OBOY_CART');
            const cartItems = currentCart ? JSON.parse(currentCart) : [];
            const newItem = {
               id: product?.id || 'temp-' + Date.now(),
               title: product?.title || 'Casual shoe',
               price: basePrice,
               qty: qty,
               image: product?.image_url || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop'
            };
            // Check if exists
            const existing = cartItems.findIndex((i: any) => i.id === newItem.id);
            if (existing >= 0) {
              cartItems[existing].qty += qty;
            } else {
              cartItems.push(newItem);
            }
            await AsyncStorage.setItem('OBOY_CART', JSON.stringify(cartItems));
            router.push('/basket');
          } catch (e) {
            console.error("Cart save error", e);
            router.push('/basket');
          }
        }}>
          <LinearGradient 
            colors={Colors.soulGradient} 
            style={styles.buyGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <ShoppingBag size={20} color={Colors.white} />
            <Text style={styles.buyText}>Add to Cart</Text>
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
    fontSize: 18,
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
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: Colors.surfaceContainerHigh,
    marginTop: 24,
    marginBottom: 28,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  categoryLabel: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.outline,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: Colors.onSurface,
    lineHeight: 30,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 109, 74, 0.05)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.tertiary,
  },
  sellerCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sellerAvatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surfaceContainerHighest,
    overflow: 'hidden',
  },
  sellerAvatar: {
    width: '100%',
    height: '100%',
  },
  sellerName: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
  },
  sellerStatus: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: Colors.outline,
  },
  followBtn: {
    backgroundColor: Colors.surfaceContainerHigh,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followBtnText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.primary,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
  },
  sizeChartText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.primary,
  },
  sizeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  sizeBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: 'rgba(169, 179, 187, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeBtnActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  sizeBtnText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
  },
  sizeBtnTextActive: {
    color: Colors.white,
  },
  qtyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 24,
    padding: 4,
  },
  qtyActionBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  qtyVal: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
    paddingHorizontal: 16,
  },
  descriptionSection: {
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurfaceVariant,
    lineHeight: 22,
    marginTop: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.6)',
    gap: 20,
  },
  priceLabel: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.outline,
    letterSpacing: 1.5,
  },
  totalPrice: {
    fontSize: 24,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: Colors.onSurface,
  },
  buyBtn: {
    flex: 1,
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
  buyGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 12,
  },
  buyText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.white,
  },
});
