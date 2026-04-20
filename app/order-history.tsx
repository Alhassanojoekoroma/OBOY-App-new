import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Package, Clock, CheckCircle2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '../constants/Colors';

const MOCK_ORDERS = [
  { id: '1', date: 'Oct 24, 2024', total: '₦4,500', status: 'Delivered', items: 'Chemistry Textbook', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363' },
  { id: '2', date: 'Oct 20, 2024', total: '₦12,000', status: 'In Transit', items: 'Scientific Calculator', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c' },
];

export default function OrderHistoryScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={Colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
        <View style={{ width: 40 }} />
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        {MOCK_ORDERS.map(order => (
          <TouchableOpacity key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View style={styles.dateAndId}>
                <Text style={styles.orderDate}>{order.date}</Text>
                <Text style={styles.orderId}>#ORD-{order.id}9302</Text>
              </View>
              <View style={[styles.statusBadge, order.status === 'Delivered' ? styles.statusDelivered : styles.statusTransit]}>
                {order.status === 'Delivered' ? <CheckCircle2 size={12} color="#00A86B" /> : <Clock size={12} color="#FFB300" />}
                <Text style={[styles.statusText, order.status === 'Delivered' ? {color: '#00A86B'} : {color: '#FFB300'}]}>
                  {order.status}
                </Text>
              </View>
            </View>

            <View style={styles.itemsRow}>
              <Image source={{ uri: order.image }} style={styles.itemThumb} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{order.items}</Text>
                <Text style={styles.itemPrice}>{order.total}</Text>
              </View>
              <TouchableOpacity style={styles.reorderBtn}>
                <Text style={styles.reorderText}>View</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  },
  content: {
    padding: 24,
  },
  orderCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  dateAndId: {
    gap: 4,
  },
  orderDate: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.onSurface,
  },
  orderId: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: Colors.outline,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  statusDelivered: {
    backgroundColor: 'rgba(0, 168, 107, 0.1)',
  },
  statusTransit: {
    backgroundColor: 'rgba(255, 179, 0, 0.1)',
  },
  statusText: {
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
  },
  itemsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemThumb: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerLow,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.onSurface,
  },
  itemPrice: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurfaceVariant,
  },
  reorderBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerLow,
  },
  reorderText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.primary,
  }
});
