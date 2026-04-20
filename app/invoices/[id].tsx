import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { ChevronLeft, Copy, CheckCircle2 } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Colors from '../../constants/Colors';
import * as Clipboard from 'expo-clipboard';

export default function InvoiceDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [copiedInvoice, setCopiedInvoice] = React.useState(false);
  const [copiedAccount, setCopiedAccount] = React.useState(false);

  const copyInvoiceId = async () => {
    await Clipboard.setStringAsync(id as string || '146999');
    setCopiedInvoice(true);
    setTimeout(() => setCopiedInvoice(false), 2000);
  };

  const copyAccountNumber = async () => {
    await Clipboard.setStringAsync('2345678987');
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={Colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>View Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Details Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Product Details</Text>
          <Text style={styles.productDesc}>One Nike Air Zoom - Two Zara Polo Round Neck</Text>
          
          <View style={styles.divider} />
          
          <View style={styles.row}>
            <Text style={styles.label}>Invoice ID</Text>
            <TouchableOpacity style={styles.valueRow} onPress={copyInvoiceId}>
              <Text style={styles.valueBold}>{id || '146999'}</Text>
              {copiedInvoice ? <CheckCircle2 size={14} color={Colors.primary} /> : <Copy size={14} color={Colors.primary} />}
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.valueBold}>Pending</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Amount:</Text>
            <Text style={styles.valueBold}>₦9,700.00</Text>
          </View>
        </View>

        {/* Transaction Details Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Transaction Details</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>Bank Name</Text>
            <Text style={styles.valueBold}>Wema Bank</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Account Name:</Text>
            <Text style={styles.valueBold}>Paystack New-Gen</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Account Number:</Text>
            <Text style={styles.valueBold}>2345678987</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Amount:</Text>
            <Text style={styles.valueBold}>₦9,700.00</Text>
          </View>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.copyButton} onPress={copyAccountNumber}>
            {copiedAccount ? <CheckCircle2 size={16} color={Colors.primary} /> : <Copy size={16} color={Colors.onSurface} />}
            <Text style={styles.copyText}>{copiedAccount ? 'Copied' : 'Copy'}</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
      
      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/(tabs)')}>
          <Text style={styles.primaryButtonText}>I've sent the money</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
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
    backgroundColor: Colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.onSurface,
    marginBottom: 12,
  },
  productDesc: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#6c757d', // Muted text
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#6c757d',
  },
  valueBold: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.onSurface,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.outlineVariant,
    opacity: 0.5,
    marginVertical: 4,
    marginBottom: 16,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  copyText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.onSurface,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
    backgroundColor: '#FFFFFF',
  },
  primaryButton: {
    backgroundColor: '#000080', // Navy blue
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.white,
  },
});
