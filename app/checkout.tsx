import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, CreditCard, Apple, CheckCircle2 } from 'lucide-react-native';
import Colors from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function CheckoutScreen() {
  const router = useRouter();
  const [success, setSuccess] = React.useState(false);

  if (success) {
    return (
      <SafeAreaView style={[styles.container, styles.successContainer]}>
        <CheckCircle2 size={80} color={Colors.primary} />
        <Text style={styles.successTitle}>Payment Successful!</Text>
        <Text style={styles.successSub}>Your order has been placed and is being processed.</Text>
        <TouchableOpacity style={styles.returnBtn} onPress={() => router.push('/')}>
          <Text style={styles.returnBtnText}>Back to Home</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={Colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        
        <TouchableOpacity style={[styles.paymentCard, styles.selectedPaymentCard]}>
          <CreditCard size={24} color={Colors.primary} />
          <Text style={styles.paymentText}>Credit / Debit Card</Text>
          <View style={styles.radioSelected}><View style={styles.radioInner} /></View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.paymentCard}>
          <Apple size={24} color={Colors.onSurface} />
          <Text style={styles.paymentText}>Apple Pay</Text>
          <View style={styles.radioUnselected} />
        </TouchableOpacity>

        <View style={styles.cardForm}>
          <Text style={styles.label}>Cardholder Name</Text>
          <TextInput style={styles.input} placeholder="John Doe" placeholderTextColor={Colors.outlineVariant} />
          
          <Text style={styles.label}>Card Number</Text>
          <TextInput style={styles.input} placeholder="**** **** **** 1234" keyboardType="numeric" placeholderTextColor={Colors.outlineVariant} />
          
          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.label}>Expiry Date</Text>
              <TextInput style={styles.input} placeholder="MM/YY" placeholderTextColor={Colors.outlineVariant} />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.label}>CVV</Text>
              <TextInput style={styles.input} placeholder="123" keyboardType="numeric" secureTextEntry placeholderTextColor={Colors.outlineVariant} />
            </View>
          </View>
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>122.00 USD</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Discount</Text>
            <Text style={styles.summaryValueDiscount}>-12.00 USD</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>110.00 USD</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.payBtn} onPress={() => setSuccess(true)}>
          <LinearGradient 
            colors={Colors.soulGradient} 
            style={styles.checkoutGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.checkoutText}>PAY 110.00 USD</Text>
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 120,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
    marginBottom: 16,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedPaymentCard: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(78, 69, 228, 0.02)',
  },
  paymentText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.onSurface,
  },
  radioSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  radioUnselected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.outlineVariant,
  },
  cardForm: {
    marginTop: 24,
    backgroundColor: Colors.white,
    padding: 24,
    borderRadius: 20,
  },
  label: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.onSurfaceVariant,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurface,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryContainer: {
    marginTop: 32,
    backgroundColor: 'rgba(238, 244, 250, 0.6)',
    borderRadius: 24,
    padding: 24,
    gap: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurfaceVariant,
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
  },
  summaryValueDiscount: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.tertiary,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(169, 179, 187, 0.1)',
    marginVertical: 4,
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: Colors.onSurface,
  },
  totalValue: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: Colors.onSurface,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
    backgroundColor: Colors.background,
  },
  payBtn: {
    borderRadius: 32,
    overflow: 'hidden',
  },
  checkoutGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  checkoutText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: Colors.white,
    letterSpacing: 1,
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  successTitle: {
    fontSize: 24,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: Colors.onSurface,
    marginTop: 24,
    marginBottom: 8,
  },
  successSub: {
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: 40,
  },
  returnBtn: {
    backgroundColor: Colors.surfaceContainerLow,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
  },
  returnBtnText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.primary,
  },
});
