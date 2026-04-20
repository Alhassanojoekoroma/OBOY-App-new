import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, SlidersHorizontal, BookOpen, Calendar, Building2, Headphones, Plus, Heart, MessageCircle, Bell } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import FilterSheet from '../../components/FilterSheet';
import { supabase } from '../../utils/supabase';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 48 - 16) / 2;

const CATEGORY_ITEMS = [
  { id: 'all', name: 'All', icon: BookOpen },
  { id: '1', name: 'Academics', icon: BookOpen },
  { id: '2', name: 'Events', icon: Calendar },
  { id: '3', name: 'Housing', icon: Building2 },
  { id: '4', name: 'Services', icon: Headphones },
  { id: '5', name: 'Elective', icon: BookOpen },
  { id: '6', name: 'Premium', icon: BookOpen } // Added for fallback matching
];

const UNIVERSITIES = [
  'All Universities',
  'University of Sierra Leone',
  'Njala University',
  'Ernest Bai Koroma University',
  'Fourah Bay College',
  'IPAM',
];

const FALLBACK_FEATURED = [
  { id: '1', title: 'Architecture 101', category: 'Elective', price: 0, image_url: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop' },
  { id: '2', title: 'Data Science', category: 'Premium', price: 249, image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop' },
  { id: '3', title: 'Visual Arts', category: 'Elective', price: 0, image_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop' },
  { id: '4', title: 'Fullstack Dev', category: 'Premium', price: 199, image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [filterVisible, setFilterVisible] = React.useState(false);
  const [products, setProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [selectedUniversity, setSelectedUniversity] = React.useState('All Universities');

  React.useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
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
          .order('created_at', { ascending: false });

        if (error || !data || data.length === 0) {
          // Keep fallback data if backend isn't populated or fails due to env vars
          setProducts(FALLBACK_FEATURED);
        } else {
          setProducts(data);
        }
      } catch (err) {
        console.error(err);
        setProducts(FALLBACK_FEATURED);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const finalFilteredProducts = products.filter(p => {
    const categoryMatch = selectedCategory === 'All' || 
      p.category?.toLowerCase() === selectedCategory.toLowerCase();
    
    const uniMatch = selectedUniversity === 'All Universities' || 
      p.users?.university === selectedUniversity;
      
    return categoryMatch && uniMatch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/a/ACg8ocL_FmR_b9K1oP7o3-XpCg=' }} // placeholder
              style={styles.profilePic}
            />
          </TouchableOpacity>
          <Text style={styles.logo}>Oboy</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={() => router.push('/notifications')}
            >
              <Bell size={22} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/messages')}>
              <MessageCircle size={22} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Search size={20} color={Colors.outline} style={styles.searchIcon} />
            <TouchableOpacity 
              activeOpacity={1}
              style={styles.searchInputArea}
              onPress={() => setFilterVisible(true)}
            >
              <Text style={styles.searchPlaceholderText}>What are you looking for?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.filterButton} onPress={() => setFilterVisible(true)}>
            <SlidersHorizontal size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop' }}
            style={[StyleSheet.absoluteFill, { borderRadius: 16 }]}
          />
          <LinearGradient
            colors={['rgba(123, 47, 255, 0.6)', 'rgba(123, 47, 255, 0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerSubtitle}>WELCOME BACK</Text>
            <Text style={styles.bannerTitle}>Explore 15% off Student Housing</Text>
            <TouchableOpacity style={styles.bannerButton} onPress={() => router.push('/housing')}>
              <Text style={styles.bannerButtonText}>Discover Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {CATEGORY_ITEMS.map(cat => (
            <TouchableOpacity 
              key={cat.id} 
              style={[styles.categoryCard, selectedCategory === cat.name && styles.categoryCardActive]} 
              onPress={() => setSelectedCategory(cat.name)}
            >
              <View style={[styles.categoryIconCircle, selectedCategory === cat.name && styles.categoryIconCircleActive]}>
                <cat.icon size={24} color={selectedCategory === cat.name ? Colors.white : Colors.primary} />
              </View>
              <Text style={[styles.categoryName, selectedCategory === cat.name && styles.categoryNameActive]}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Universities */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {UNIVERSITIES.map(uni => (
            <TouchableOpacity 
              key={uni} 
              style={[styles.uniChip, selectedUniversity === uni && styles.uniChipActive]} 
              onPress={() => setSelectedUniversity(uni)}
            >
              <Text style={[styles.uniChipText, selectedUniversity === uni && styles.uniChipTextActive]}>{uni}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Start Selling CTA */}
        <TouchableOpacity 
          style={styles.sellerCtaCard}
          onPress={() => router.push('/seller')}
        >
          <LinearGradient
            colors={['#4E45E4', '#742FE5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.sellerCtaGradient}
          >
            <View style={styles.sellerCtaContent}>
              <Text style={styles.sellerCtaTitle}>Got items to sell?</Text>
              <Text style={styles.sellerCtaSubtitle}>Join the Student Market and turn your unused items into cash today.</Text>
            </View>
            <View style={styles.sellerCtaButton}>
              <Text style={styles.sellerCtaButtonText}>Start Selling</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Student Market (Horizontal) */}
        <View style={[styles.sectionHeader, { marginTop: 32 }]}>
          <Text style={styles.sectionTitle}>Student Market</Text>
          <TouchableOpacity onPress={() => router.push('/discover')}><Text style={styles.seeAll}>See local</Text></TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.studentMarketScroll}>
          {FALLBACK_FEATURED.slice(0, 3).map((item, idx) => (
             <TouchableOpacity key={`student-item-${idx}`} style={styles.studentItemCard} onPress={() => router.push(`/detail/${item.id}`)}>
               <Image source={{ uri: item.image_url }} style={styles.studentItemImage} />
               <View style={styles.studentItemBadge}>
                 <Text style={styles.studentItemBadgeText}>Student</Text>
               </View>
               <View style={styles.studentItemInfo}>
                 <Text style={styles.studentItemTitle} numberOfLines={1}>{item.title}</Text>
                 <Text style={styles.studentItemPrice}>{item.price === 0 ? 'FREE' : `$${item.price}`}</Text>
               </View>
             </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured */}
        <View style={[styles.sectionHeader, { marginTop: 32 }]}>
          <Text style={styles.sectionTitle}>Marketplace</Text>
          <TouchableOpacity onPress={() => router.push('/discover')}><Text style={styles.seeAll}>View More</Text></TouchableOpacity>
        </View>

        {loading ? (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : finalFilteredProducts.length === 0 ? (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontFamily: 'PlusJakartaSans_700Bold', color: Colors.onSurface }}>No listings yet</Text>
            <Text style={{ fontSize: 14, fontFamily: 'Inter_500Medium', color: Colors.onSurfaceVariant, textAlign: 'center', marginTop: 8 }}>Be the first to post on your campus in this category!</Text>
          </View>
        ) : (
        
        <View style={styles.masonryGrid}>
          {/* Left Column */}
          <View style={styles.column}>
            {finalFilteredProducts.filter((_, i) => i % 2 === 0).map(item => (
              <TouchableOpacity key={item.id} style={styles.itemCard} onPress={() => router.push(`/detail/${item.id}`)}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item.image_url }} style={styles.itemImage} />
                  <TouchableOpacity style={styles.favoriteBtn} onPress={() => alert('Saved to favorites!')}>
                    <Heart size={16} color={Colors.error} fill={Colors.error} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.addBtn} onPress={() => alert('Added to basket!')}>
                    <Plus size={18} color={Colors.white} />
                  </TouchableOpacity>
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemCategory}>{item.price === 0 ? 'FREE' : `$${item.price}`} • {item.category}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          {/* Right Column */}
          <View style={[styles.column, { marginTop: 24 }]}>
            {finalFilteredProducts.filter((_, i) => i % 2 !== 0).map(item => (
              <TouchableOpacity key={item.id} style={styles.itemCard} onPress={() => router.push(`/detail/${item.id}`)}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item.image_url }} style={styles.itemImage} />
                  <TouchableOpacity style={styles.favoriteBtn} onPress={() => alert('Saved to favorites!')}>
                    <Heart size={16} color={Colors.outlineVariant} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.addBtn} onPress={() => alert('Added to basket!')}>
                    <Plus size={18} color={Colors.white} />
                  </TouchableOpacity>
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemCategory}>{item.price === 0 ? 'FREE' : `$${item.price}`} • {item.category}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        )}
        <FilterSheet isVisible={filterVisible} onClose={() => setFilterVisible(false)} />
      </ScrollView>

      {/* Post FAB */}
      <TouchableOpacity 
        style={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: Colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: Colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 5,
        }} 
        onPress={() => router.push('/post')}
      >
        <Plus size={24} color={Colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    zIndex: 10,
  },
  logo: {
    fontSize: 24,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: Colors.primary,
    letterSpacing: -1,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(78, 69, 228, 0.1)',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
    gap: 12,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInputArea: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  searchPlaceholderText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: Colors.outlineVariant,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    height: 192,
    borderRadius: 32,
    padding: 24,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 40,
  },
  bannerContent: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 10,
  },
  bannerSubtitle: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  bannerTitle: {
    fontSize: 22,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: Colors.white,
    lineHeight: 28,
    marginBottom: 16,
  },
  bannerButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.primary,
  },
  bannerImageContainer: {
    position: 'absolute',
    right: -20,
    bottom: -20,
    width: 176,
    height: 176,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 88,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
  },
  seeAll: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.primary,
  },
  categoriesScroll: {
    flexDirection: 'row',
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 24,
    gap: 8,
  },
  categoryCardActive: {},
  categoryIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: 'rgba(78, 69, 228, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIconCircleActive: {
    backgroundColor: Colors.primary,
  },
  categoryName: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    textTransform: 'uppercase',
    color: Colors.onSurfaceVariant,
    letterSpacing: -0.5,
  },
  categoryNameActive: {
    color: Colors.primary,
  },
  uniChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 20,
    marginRight: 12,
  },
  uniChipActive: {
    backgroundColor: Colors.primary,
  },
  uniChipText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.onSurfaceVariant,
  },
  uniChipTextActive: {
    color: Colors.white,
  },
  sellerCtaCard: {
    marginTop: 32,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  sellerCtaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  sellerCtaContent: {
    flex: 1,
    paddingRight: 16,
  },
  sellerCtaTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: Colors.white,
    marginBottom: 4,
  },
  sellerCtaSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 18,
  },
  sellerCtaButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  sellerCtaButtonText: {
    color: Colors.primary,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
  },
  studentMarketScroll: {
    flexDirection: 'row',
    overflow: 'visible',
  },
  studentItemCard: {
    width: 140,
    marginRight: 16,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  studentItemImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerLow,
  },
  studentItemBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  studentItemBadgeText: {
    color: Colors.white,
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
  },
  studentItemInfo: {
    marginTop: 8,
    paddingHorizontal: 4,
  },
  studentItemTitle: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.onSurface,
  },
  studentItemPrice: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.primary,
    marginTop: 2,
  },
  masonryGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  column: {
    flex: 1,
    gap: 20,
  },
  itemCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 0.8,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.surfaceContainerLow,
    position: 'relative',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  itemInfo: {
    paddingHorizontal: 4,
    marginTop: 10,
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
  },
  itemCategory: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
});
