import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MapPin, BedDouble, Bath, Wifi } from 'lucide-react-native';
import Colors from '../constants/Colors';
import { useRouter } from 'expo-router';

const HOUSINGS = [
  { id: '1', title: 'University Hall', type: 'Dormitory', price: '$800/mo', available: true, image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop' },
  { id: '2', title: 'The Vertex', type: 'Shared Apartment', price: '$650/mo', available: true, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop' },
  { id: '3', title: 'Campus Village', type: 'Studio', price: '$1200/mo', available: false, image: 'https://images.unsplash.com/photo-1502672260266-1c1de2d96674?q=80&w=1980&auto=format&fit=crop' },
];

export default function HousingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={Colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Housing</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Find your perfect student home.</Text>
          <Text style={styles.bannerSub}>Book directly through the portal.</Text>
        </View>

        <View style={styles.list}>
          {HOUSINGS.map(house => (
            <TouchableOpacity key={house.id} style={styles.card}>
              <Image source={{ uri: house.image }} style={styles.image} />
              <View style={styles.cardContent}>
                <View style={styles.row}>
                  <Text style={styles.title}>{house.title}</Text>
                  <Text style={styles.price}>{house.price}</Text>
                </View>
                <View style={styles.locationRow}>
                  <MapPin size={14} color={Colors.onSurfaceVariant} />
                  <Text style={styles.type}>{house.type} • Near North Campus</Text>
                </View>

                <View style={styles.amenities}>
                  <View style={styles.amenity}><BedDouble size={14} color={Colors.primary} /><Text style={styles.amenityText}>1 Bed</Text></View>
                  <View style={styles.amenity}><Bath size={14} color={Colors.primary} /><Text style={styles.amenityText}>1 Bath</Text></View>
                  <View style={styles.amenity}><Wifi size={14} color={Colors.primary} /><Text style={styles.amenityText}>Free WiFi</Text></View>
                </View>

                <TouchableOpacity 
                  style={[styles.bookBtn, !house.available && styles.bookBtnDisabled]}
                  disabled={!house.available}
                >
                  <Text style={[styles.bookBtnText, !house.available && styles.bookBtnTextDisabled]}>
                    {house.available ? 'Book Now' : 'Waitlist Full'}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 24, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.6)',
  },
  headerTitle: { fontSize: 20, fontFamily: 'PlusJakartaSans_700Bold', color: Colors.onSurface },
  backButton: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.white,
    alignItems: 'center', justifyContent: 'center', shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2,
  },
  scrollContent: { padding: 24, paddingBottom: 60 },
  banner: { marginBottom: 24 },
  bannerTitle: { fontSize: 28, fontFamily: 'PlusJakartaSans_800ExtraBold', color: Colors.onSurface, marginBottom: 8 },
  bannerSub: { fontSize: 16, fontFamily: 'Inter_500Medium', color: Colors.onSurfaceVariant },
  list: { gap: 20 },
  card: { backgroundColor: Colors.white, borderRadius: 24, overflow: 'hidden', shadowColor: Colors.black, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 20, elevation: 3 },
  image: { width: '100%', height: 200, resizeMode: 'cover' },
  cardContent: { padding: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 18, fontFamily: 'PlusJakartaSans_700Bold', color: Colors.onSurface },
  price: { fontSize: 16, fontFamily: 'PlusJakartaSans_800ExtraBold', color: Colors.primary },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 },
  type: { fontSize: 13, fontFamily: 'Inter_500Medium', color: Colors.onSurfaceVariant },
  amenities: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  amenity: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.surfaceContainerLow, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
  amenityText: { fontSize: 12, fontFamily: 'Inter_600SemiBold', color: Colors.onSurface },
  bookBtn: { backgroundColor: Colors.primary, paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
  bookBtnDisabled: { backgroundColor: Colors.surfaceContainerHigh },
  bookBtnText: { color: Colors.white, fontSize: 14, fontFamily: 'PlusJakartaSans_700Bold' },
  bookBtnTextDisabled: { color: Colors.onSurfaceVariant },
});
