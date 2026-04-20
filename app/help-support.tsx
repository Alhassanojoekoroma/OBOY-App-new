import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MessageSquare, Mail, Phone, ExternalLink } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '../constants/Colors';

export default function HelpSupportScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={Colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 40 }} />
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>How can we help you?</Text>
          <Text style={styles.heroSubtitle}>Search our help center or contact our student support team.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>CONTACT US</Text>
          <TouchableOpacity style={styles.contactCard}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(78, 69, 228, 0.1)' }]}>
              <MessageSquare size={24} color={Colors.primary} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Live Chat</Text>
              <Text style={styles.contactSubtitle}>Best for urgent campus issues</Text>
            </View>
            <ExternalLink size={20} color={Colors.outlineVariant} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(0, 168, 107, 0.1)' }]}>
              <Mail size={24} color="#00A86B" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Email Support</Text>
              <Text style={styles.contactSubtitle}>support@oboy.sl</Text>
            </View>
            <ExternalLink size={20} color={Colors.outlineVariant} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>POPULAR TOPICS</Text>
          {['How to post an item?', 'Payment security', 'Negotiating with sellers', 'Campus delivery'].map((topic, i) => (
            <TouchableOpacity key={i} style={styles.topicItem}>
              <Text style={styles.topicText}>{topic}</Text>
              <ChevronLeft size={20} color={Colors.outlineVariant} style={{ transform: [{ rotate: '180deg'}] }} />
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
  },
  content: {
    padding: 24,
  },
  heroSection: {
    marginBottom: 32,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 24,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: Colors.onSurface,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionLabel: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    color: Colors.onSurfaceVariant,
    letterSpacing: 1,
    marginBottom: 16,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 16,
  },
  contactTitle: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.onSurface,
  },
  contactSubtitle: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  topicItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 18,
    borderRadius: 16,
    marginBottom: 8,
  },
  topicText: {
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurface,
  }
});
