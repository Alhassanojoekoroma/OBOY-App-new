import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Camera, Sparkles, Upload } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function CreateListingScreen() {
  const router = useRouter();
  const [step, setStep] = React.useState(1);
  const [photoUri, setPhotoUri] = React.useState<string | null>(null);

  // In a real app we'd use expo-image-picker here
  const handleSimulatePhoto = () => {
    // Simulated upload for Phase 3/4 Student Marketplace PRD feature
    setPhotoUri('https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop'); 
    setStep(2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={20} color={Colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Listing</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {step === 1 ? (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>1. Add Photos</Text>
            <Text style={styles.stepDescription}>Take a clear picture of what you want to sell. Don't worry about the background, our AI will clean it up for you!</Text>
            
            <TouchableOpacity style={styles.uploadBox} onPress={handleSimulatePhoto}>
              <View style={styles.uploadIconCircle}>
                <Camera size={32} color={Colors.primary} />
              </View>
              <Text style={styles.uploadText}>Take Photo</Text>
              <Text style={styles.uploadSubtext}>or upload from gallery</Text>
            </TouchableOpacity>

            <View style={styles.tipCard}>
              <Sparkles size={20} color="#FFB300" style={{ marginRight: 12 }} />
              <Text style={styles.tipText}>Pro tip: Make sure the room is well lit and the item is in the center.</Text>
            </View>
          </View>
        ) : (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>2. AI Enhancement & Details</Text>
            <Text style={styles.stepDescription}>We've removed the background and generated suggestions for your item.</Text>
            
            <View style={styles.imagePreviewContainer}>
              {photoUri && <Image source={{ uri: photoUri }} style={styles.imagePreview} />}
              <View style={styles.aiBadge}>
                <Sparkles size={12} color={Colors.white} style={{ marginRight: 4 }} />
                <Text style={styles.aiBadgeText}>AI Enhanced</Text>
              </View>
            </View>

            <View style={styles.formGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Title</Text>
                <TouchableOpacity><Text style={styles.aiGenerateText}>Autofill with AI</Text></TouchableOpacity>
              </View>
              <TextInput 
                style={styles.input} 
                placeholder="e.g. Nike Air Max (Size 42)" 
                defaultValue="Nike Air Max Sneakers (Size 42)" 
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Price (₦)</Text>
              <TextInput style={styles.input} placeholder="e.g. 15000" keyboardType="numeric" />
            </View>

            <View style={styles.formGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Description</Text>
                <TouchableOpacity><Text style={styles.aiGenerateText}>Optimize Description</Text></TouchableOpacity>
              </View>
              <TextInput 
                style={[styles.input, styles.textArea]} 
                placeholder="Describe condition, size, reason for selling..." 
                multiline
                numberOfLines={4}
                defaultValue="Lightly used Nike Air Max sneakers. Perfect for campus walks. Size 42 clean condition. Meet up at student union building."
              />
            </View>

            <TouchableOpacity 
              style={styles.submitBtn}
              onPress={() => {
                alert('Listing published successfully! It is now visible to students on campus.');
                router.replace('/seller');
              }}
            >
              <Text style={styles.submitBtnText}>Publish Listing</Text>
            </TouchableOpacity>
          </View>
        )}
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
    paddingTop: 24,
    paddingBottom: 40,
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 22,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: Colors.onSurface,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: Colors.onSurfaceVariant,
    lineHeight: 22,
    marginBottom: 24,
  },
  uploadBox: {
    height: 200,
    borderWidth: 2,
    borderColor: 'rgba(78, 69, 228, 0.2)',
    borderStyle: 'dashed',
    borderRadius: 24,
    backgroundColor: 'rgba(78, 69, 228, 0.02)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  uploadIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(78, 69, 228, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  uploadText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
    marginBottom: 4,
  },
  uploadSubtext: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: Colors.onSurfaceVariant,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 179, 0, 0.1)',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    color: '#D49500',
    lineHeight: 18,
  },
  imagePreviewContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 20,
    backgroundColor: Colors.surfaceContainerLow,
    marginBottom: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  aiBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  aiBadgeText: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  formGroup: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.onSurface,
  },
  aiGenerateText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.primary,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: Colors.onSurface,
  },
  textArea: {
    height: 120,
    paddingTop: 16,
    textAlignVertical: 'top',
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
});
