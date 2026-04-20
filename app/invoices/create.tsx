import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { ChevronLeft, HelpCircle, Copy, CheckCircle2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import * as Clipboard from 'expo-clipboard';

export default function CreateInvoiceScreen() {
  const router = useRouter();
  const [copied, setCopied] = React.useState(false);
  const [invoiceData, setInvoiceData] = React.useState({
    products: '',
    totalPrice: '',
    customerName: '',
    customerEmail: '',
  });

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync('2345678987');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendToMessage = () => {
    if (!invoiceData.totalPrice) {
      alert('Please enter a total price before sending');
      return;
    }
    
    const invoiceMessage = `Invoice Details:\n\nProducts: ${invoiceData.products || 'Not specified'}\nTotal Amount: ₦${invoiceData.totalPrice}\nCustomer: ${invoiceData.customerName || 'Guest'}\n\nBank Details:\nBank: Wema Bank\nAccount: Paystack New-Gen\nNumber: 2345678987`;
    
    router.push({
      pathname: '/messages',
      params: {
        prefilledMessage: invoiceMessage,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={Colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Invoice</Text>
        <TouchableOpacity style={styles.helpButton}>
          <HelpCircle size={22} color={Colors.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Products */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Products</Text>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            placeholder="One Nike Air Zoom&#10;Two Zara Polo Round Neck"
            placeholderTextColor={Colors.outline}
            textAlignVertical="top"
            value={invoiceData.products}
            onChangeText={(text) => setInvoiceData({ ...invoiceData, products: text })}
          />
        </View>

        {/* Enter Total Price */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Enter Total Price</Text>
          <TextInput
            style={styles.input}
            placeholder="₦2,000"
            placeholderTextColor={Colors.outline}
            keyboardType="numeric"
            value={invoiceData.totalPrice}
            onChangeText={(text) => setInvoiceData({ ...invoiceData, totalPrice: text })}
          />
        </View>

        {/* Customer Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Customer Name (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Search by username"
            placeholderTextColor={Colors.outline}
            value={invoiceData.customerName}
            onChangeText={(text) => setInvoiceData({ ...invoiceData, customerName: text })}
          />
        </View>

        {/* Customer Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Customer Email (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Search by email"
            placeholderTextColor={Colors.outline}
            keyboardType="email-address"
            value={invoiceData.customerEmail}
            onChangeText={(text) => setInvoiceData({ ...invoiceData, customerEmail: text })}
          />
        </View>

        <Text style={styles.expiryText}>
          Account Number expires in <Text style={styles.expiryBold}>30mins</Text>
        </Text>

        {/* Account Details Card */}
        <View style={styles.accountCard}>
          <View style={styles.accountRow}>
            <Text style={styles.accountLabel}>Bank Name</Text>
            <Text style={styles.accountValueBold}>Wema Bank</Text>
          </View>
          <View style={styles.accountRow}>
            <Text style={styles.accountLabel}>Account Name:</Text>
            <Text style={styles.accountValueBold}>Paystack New-Gen</Text>
          </View>
          <View style={styles.accountRow}>
            <Text style={styles.accountLabel}>Account Number:</Text>
            <Text style={styles.accountValueBold}>2345678987</Text>
          </View>
          <View style={styles.accountRow}>
            <Text style={styles.accountLabel}>Amount:</Text>
            <Text style={styles.accountValueBold}>₦9,700.00</Text>
          </View>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
            {copied ? <CheckCircle2 size={16} color={Colors.primary} /> : <Copy size={16} color={Colors.onSurface} />}
            <Text style={styles.copyText}>{copied ? 'Copied' : 'Copy'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.noteText}>
          Note: Kindly user transfer exact amount to account details above.
        </Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.outlineButton}
            onPress={handleSendToMessage}
          >
            <Text style={styles.outlineButtonText}>Send to Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/(tabs)')}>
            <Text style={styles.primaryButtonText}>Go back home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  helpButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 40,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.onSurface,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: Colors.onSurface,
  },
  textArea: {
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: Colors.onSurface,
    minHeight: 100,
  },
  expiryText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurface,
    marginTop: 8,
    marginBottom: 16,
  },
  expiryBold: {
    fontFamily: 'Inter_600SemiBold',
    color: '#000080', // Navy blue
  },
  accountCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  accountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  accountLabel: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurfaceVariant,
  },
  accountValueBold: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.onSurface,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.outlineVariant,
    opacity: 0.5,
    marginVertical: 12,
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
  noteText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: Colors.onSurfaceVariant,
    marginBottom: 32,
    lineHeight: 18,
  },
  buttonContainer: {
    gap: 12,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  outlineButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.onSurface,
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
