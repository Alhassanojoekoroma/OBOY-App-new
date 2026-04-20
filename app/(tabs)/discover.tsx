import React from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Bell, ChevronLeft, ChevronRight } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const TRENDING = [
  { id: '1', title: 'Architecture 101', price: 'FREE', image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop' },
  { id: '2', title: 'Data Science', price: '$249', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop' },
  { id: '3', title: 'Fullstack Dev', price: '$199', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop' },
];

const EVENTS = [
  { id: '1', day: '28', month: 'MAR', title: 'Campus Career Fair', sub: 'Main Hall • 10:00 AM', gradient: Colors.soulGradient },
  { id: '2', day: '02', month: 'APR', title: 'Design Hackathon', sub: 'Innovation Lab • 9:00 AM', color: '#eaddff', text: '#742fe5' },
  { id: '3', day: '10', month: 'APR', title: 'Alumni Networking', sub: 'Auditorium • 2:00 PM', color: 'rgba(105, 246, 184, 0.3)', text: '#006d4a' },
];

export default function DiscoverScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={Colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Discover</Text>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => router.push('/notifications')}
        >
          <Bell size={22} color={Colors.onSurface} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Search */}
        <View style={styles.searchWrapper}>
          <Search size={20} color={Colors.outline} style={styles.searchIcon} />
          <TextInput 
            placeholder="Search courses, events..." 
            placeholderTextColor={Colors.outlineVariant}
            style={styles.searchInput}
          />
        </View>

        {/* Trending */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.trendingScroll}>
          {TRENDING.map(item => (
            <TouchableOpacity key={item.id} style={styles.trendingCard} onPress={() => router.push(`/detail/${item.id}`)}>
              <View style={styles.trendingImageContainer}>
                <Image source={{ uri: item.image }} style={styles.trendingImage} />
              </View>
              <View style={styles.trendingInfo}>
                <Text style={styles.trendingTitle}>{item.title}</Text>
                <Text style={styles.trendingPrice}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Upcoming Events */}
        <View style={[styles.sectionHeader, { marginTop: 32 }]}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
        </View>
        <View style={styles.eventsList}>
          {EVENTS.map(event => (
            <TouchableOpacity key={event.id} style={styles.eventCard}>
              {event.gradient ? (
                <LinearGradient colors={event.gradient as [string, string]} style={styles.dateBadge}>
                  <Text style={styles.dateDay}>{event.day}</Text>
                  <Text style={styles.dateMonth}>{event.month}</Text>
                </LinearGradient>
              ) : (
                <View style={[styles.dateBadge, { backgroundColor: event.color }]}>
                  <Text style={[styles.dateDay, { color: event.text }]}>{event.day}</Text>
                  <Text style={[styles.dateMonth, { color: event.text }]}>{event.month}</Text>
                </View>
              )}
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventSub}>{event.sub}</Text>
              </View>
              <ChevronRight size={20} color={Colors.outlineVariant} />
            </TouchableOpacity>
          ))}
        </View>
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
    paddingBottom: 100,
    paddingTop: 20,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 3,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: Colors.onSurface,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
  },
  trendingScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  trendingCard: {
    width: 160,
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginRight: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    overflow: 'hidden',
  },
  trendingImageContainer: {
    height: 112,
    backgroundColor: Colors.surfaceContainerHigh,
  },
  trendingImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  trendingInfo: {
    padding: 12,
  },
  trendingTitle: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
  },
  trendingPrice: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  eventsList: {
    gap: 12,
  },
  eventCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    gap: 16,
  },
  dateBadge: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateDay: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: Colors.white,
    lineHeight: 22,
  },
  dateMonth: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
  },
  eventSub: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
});
