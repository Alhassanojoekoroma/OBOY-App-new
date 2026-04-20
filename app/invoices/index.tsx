import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Plus, Receipt } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '../../constants/Colors';

export default function InvoicesListScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={Colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Invoices</Text>
        <TouchableOpacity onPress={() => router.push('/invoices/create')} style={styles.addButton}>
          <Plus size={24} color={Colors.onSurface} />
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.emptyState}>
          <Receipt size={64} color={Colors.outlineVariant} style={{ marginBottom: 16 }} />
          <Text style={styles.emptyTitle}>No Invoices Yet</Text>
          <Text style={styles.emptySubtitle}>You haven't created any invoices. Create your first one to request payments.</Text>
          <TouchableOpacity style={styles.createButton} onPress={() => router.push('/invoices/create')}>
            <Text style={styles.createButtonText}>Create New Invoice</Text>
          </TouchableOpacity>
        </View>

        {/* Demo trigger to open a specific invoice */}
        <TouchableOpacity style={styles.demoCard} onPress={() => router.push('/invoices/146999')}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 16 }}>INV-146999</Text>
            <Text style={{ fontFamily: 'Inter_600SemiBold', color: '#00A86B' }}>Pending</Text>
          </View>
          <Text style={{ fontFamily: 'Inter_500Medium', color: Colors.onSurfaceVariant }}>Amount: ₦9,700.00</Text>
          <Text style={{ fontFamily: 'Inter_400Regular', color: Colors.outline, marginTop: 4, fontSize: 12 }}>Tap to view details</Text>
        </TouchableOpacity>
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
  addButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
    backgroundColor: Colors.white,
    borderRadius: 24,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  createButton: {
    backgroundColor: '#000080',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  createButtonText: {
    color: Colors.white,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },
  demoCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.surfaceContainer,
  }
});
