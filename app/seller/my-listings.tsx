import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Eye, MessageCircle, Trash2, Edit3 } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

interface Listing {
  id: string;
  title: string;
  price: number;
  image: string;
  views: number;
  inquiries: number;
  status: 'active' | 'sold' | 'pending';
  createdAt: string;
}

const DEMO_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'iPhone 13 Case - Premium Quality',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400',
    views: 142,
    inquiries: 8,
    status: 'active',
    createdAt: '2 days ago',
  },
  {
    id: '2',
    title: 'Chemistry Textbook - Like New',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400',
    views: 89,
    inquiries: 3,
    status: 'active',
    createdAt: '5 days ago',
  },
  {
    id: '3',
    title: 'Mechanical Keyboard - RGB Backlit',
    price: 55.00,
    image: 'https://images.unsplash.com/photo-1587829191301-4251d675fc14?q=80&w=400',
    views: 234,
    inquiries: 15,
    status: 'active',
    createdAt: '1 week ago',
  },
  {
    id: '4',
    title: 'Laptop Stand - Adjustable',
    price: 20.00,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=400',
    views: 56,
    inquiries: 2,
    status: 'sold',
    createdAt: '2 weeks ago',
  },
];

export default function MyListingsScreen() {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>(DEMO_LISTINGS);
  const [filter, setFilter] = useState<'all' | 'active' | 'sold' | 'pending'>('all');

  useFocusEffect(
    useCallback(() => {
      // TODO: Load listings from Supabase
      // const loadListings = async () => {
      //   const { data, error } = await supabase
      //     .from('student_listings')
      //     .select('*')
      //     .eq('sellerId', currentUserId);
      //   if (data) setListings(data);
      // };
      // loadListings();
    }, [])
  );

  const handleEditListing = (listingId: string) => {
    router.push(`/seller/create-listing?id=${listingId}&edit=true`);
  };

  const handleMessageSeller = (listingId: string, listingTitle: string) => {
    router.push({
      pathname: '/messages',
      params: {
        listingId,
        listingTitle,
      },
    });
  };

  const handleDeleteListing = (listingId: string, listingTitle: string) => {
    Alert.alert(
      'Delete Listing',
      `Are you sure you want to delete "${listingTitle}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Remove from local state
            setListings(listings.filter((l) => l.id !== listingId));
            Alert.alert('Success', 'Listing deleted successfully');
            // TODO: Also delete from Supabase
            // const { error } = await supabase
            //   .from('student_listings')
            //   .delete()
            //   .eq('id', listingId);
          },
        },
      ]
    );
  };

  const filteredListings = listings.filter(
    (listing) => filter === 'all' || listing.status === filter
  );

  const statusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#06D6A0';
      case 'sold':
        return '#FF6B35';
      case 'pending':
        return '#FFB703';
      default:
        return Colors.outlineVariant;
    }
  };

  const ListingCard = ({ item }: { item: Listing }) => (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={[styles.statusBadge, { backgroundColor: statusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>₵{item.price.toFixed(2)}</Text>
        <Text style={styles.date}>{item.createdAt}</Text>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Eye size={16} color={Colors.outlineVariant} />
            <Text style={styles.statText}>{item.views} views</Text>
          </View>
          <View style={styles.stat}>
            <MessageCircle size={16} color={Colors.outlineVariant} />
            <Text style={styles.statText}>{item.inquiries} inquiries</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleEditListing(item.id)}
          >
            <Edit3 size={16} color={Colors.primary} />
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleMessageSeller(item.id, item.title)}
          >
            <MessageCircle size={16} color={Colors.primary} />
            <Text style={styles.actionText}>Messages</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDeleteListing(item.id, item.title)}
          >
            <Trash2 size={16} color={Colors.error} />
            <Text style={[styles.actionText, { color: Colors.error }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color={Colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Listings</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {(['all', 'active', 'sold', 'pending'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.filterTab, filter === tab && styles.filterTabActive]}
            onPress={() => setFilter(tab)}
          >
            <Text style={[styles.filterText, filter === tab && styles.filterTextActive]}>
              {tab === 'all'
                ? 'All'
                : tab === 'active'
                  ? 'Active'
                  : tab === 'sold'
                    ? 'Sold'
                    : 'Pending'}
            </Text>
            {tab === 'active' && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {listings.filter((l) => l.status === 'active').length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Listings List */}
      <FlatList
        data={filteredListings}
        renderItem={ListingCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No listings yet</Text>
            <Text style={styles.emptyText}>Start by creating your first listing</Text>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => router.push('/seller/create-listing')}
            >
              <Text style={styles.createButtonText}>Create Listing</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceContainerLow,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceContainerLow,
  },
  filterTab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.outline,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterTabActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.onSurface,
  },
  filterTextActive: {
    color: '#fff',
  },
  badge: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.primary,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  imageWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  statusBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
  },
  cardContent: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.primary,
    marginBottom: 2,
  },
  date: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: Colors.outlineVariant,
    marginBottom: 8,
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
    color: Colors.outlineVariant,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.primary,
    gap: 4,
  },
  deleteButton: {
    borderColor: Colors.error,
  },
  actionText: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.primary,
  },
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: Colors.outlineVariant,
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
});
