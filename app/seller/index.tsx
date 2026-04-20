import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus, MessageCircle, Package, TrendingUp, HelpCircle, GraduationCap } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function SellerHubScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={20} color={Colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Seller Hub</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome back, Student Seller!</Text>
          <Text style={styles.welcomeSubtitle}>Track your sales and manage your campus listings here.</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statLabel}>Active Listings</Text>
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(78, 69, 228, 0.1)' }]}>
                <Package size={16} color={Colors.primary} />
              </View>
            </View>
            <Text style={styles.statValue}>12</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statLabel}>New Inquiries</Text>
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(0, 168, 107, 0.1)' }]}>
                <MessageCircle size={16} color="#00A86B" />
              </View>
            </View>
            <Text style={styles.statValue}>4</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statLabel}>Handovers</Text>
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(255, 179, 0, 0.1)' }]}>
                <GraduationCap size={16} color="#FFB300" />
              </View>
            </View>
            <Text style={styles.statValue}>38</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statLabel}>Total Earned</Text>
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(255, 82, 82, 0.1)' }]}>
                <TrendingUp size={16} color="#FF5252" />
              </View>
            </View>
            <Text style={styles.statValue}>₦45K</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Main Actions</Text>
          
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: Colors.primary }]}
            onPress={() => router.push('/seller/create-listing')}
          >
            <View style={styles.actionIconContainer}>
              <Plus size={24} color={Colors.white} />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={[styles.actionTitle, { color: Colors.white }]}>Create New Listing</Text>
              <Text style={[styles.actionSubtitle, { color: 'rgba(255,255,255,0.8)' }]}>Use AI to brand and market your items instantly.</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => router.push('/seller/my-listings')}
          >
            <View style={[styles.actionIconContainer, { backgroundColor: Colors.surfaceContainerLow }]}>
              <Package size={24} color={Colors.primary} />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Manage Listings</Text>
              <Text style={styles.actionSubtitle}>View, edit or remove your current active items.</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIconContainer, { backgroundColor: Colors.surfaceContainerLow }]}>
              <MessageCircle size={24} color={Colors.primary} />
            </View>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Buyer Messages</Text>
              <Text style={styles.actionSubtitle}>Coordinate offline handovers around your campus.</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Tips */}
        <View style={styles.tipsSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Selling Tips</Text>
            <HelpCircle size={18} color={Colors.outlineVariant} />
          </View>
          
          <View style={styles.tipCard}>
            <View style={styles.tipIconBox}>
              <Text style={styles.tipIconEmoji}>📸</Text>
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Take Clear Photos</Text>
              <Text style={styles.tipDescription}>Good lighting makes a difference. Our AI can remove the background for you, but capturing sharp details helps sell faster.</Text>
            </View>
          </View>
          
          <View style={styles.tipCard}>
            <View style={styles.tipIconBox}>
              <Text style={styles.tipIconEmoji}>💬</Text>
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Respond Quickly</Text>
              <Text style={styles.tipDescription}>Buyers on campus usually look for an immediate pickup. Reply fast to secure the sale.</Text>
            </View>
          </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  welcomeSection: {
    marginTop: 24,
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 24,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: Colors.onSurface,
    marginBottom: 6,
  },
  welcomeSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: Colors.onSurfaceVariant,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    width: '48%',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurfaceVariant,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontSize: 22,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
  },
  actionsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
    marginBottom: 16,
  },
  actionCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: Colors.onSurfaceVariant,
    lineHeight: 18,
  },
  tipsSection: {},
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLow,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  tipIconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  tipIconEmoji: {
    fontSize: 20,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: Colors.onSurfaceVariant,
    lineHeight: 18,
  },
});
