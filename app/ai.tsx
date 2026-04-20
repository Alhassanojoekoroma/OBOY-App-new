import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Upload, Sparkles, Share2, Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface AIState {
  step: 'image' | 'style' | 'materials' | 'enhance' | 'preview' | 'complete';
  selectedImage: string | null;
  selectedStyle: string | null;
  selectedMaterials: string[];
}

const STYLE_OPTIONS = [
  { id: 'post', label: 'Marketing Post', emoji: '📱' },
  { id: 'mockup', label: 'Product Mockup', emoji: '🎨' },
  { id: 'lifestyle', label: 'Lifestyle Shot', emoji: '✨' },
  { id: 'minimalist', label: 'Minimalist', emoji: '⚪' },
  { id: 'bold', label: 'Bold & Vibrant', emoji: '🔥' },
  { id: 'cinematic', label: 'Cinematic', emoji: '🎬' },
];

const MATERIAL_OPTIONS = [
  { id: 'post', label: 'Image Post', emoji: '🖼️' },
  { id: 'reel', label: 'Video Reel', emoji: '🎥' },
  { id: 'banner', label: 'Banner', emoji: '🎯' },
  { id: 'flyer', label: 'Flyer', emoji: '📄' },
  { id: 'story', label: 'Story Format', emoji: '📖' },
  { id: 'card', label: 'Product Card', emoji: '🏷️' },
];

export default function AIBrandingScreen() {
  const router = useRouter();
  const [state, setState] = useState<AIState>({
    step: 'image',
    selectedImage: null,
    selectedStyle: null,
    selectedMaterials: [],
  });
  const [loading, setLoading] = useState(false);

  const pickImage = async (useCamera: boolean) => {
    try {
      const result = useCamera
        ? await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
          })
        : await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
          });

      if (!result.canceled) {
        setState((prev) => ({
          ...prev,
          selectedImage: result.assets[0].uri,
          step: 'style',
        }));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleStyleSelect = (styleId: string) => {
    setState((prev) => ({
      ...prev,
      selectedStyle: styleId,
      step: 'materials',
    }));
  };

  const handleMaterialToggle = (materialId: string) => {
    setState((prev) => ({
      ...prev,
      selectedMaterials: prev.selectedMaterials.includes(materialId)
        ? prev.selectedMaterials.filter((m) => m !== materialId)
        : [...prev.selectedMaterials, materialId],
    }));
  };

  const handleEnhanceImage = async () => {
    if (state.selectedMaterials.length === 0) {
      Alert.alert('Selection Required', 'Please select at least one material type');
      return;
    }

    setLoading(true);
    // Simulate API call for image enhancement
    setTimeout(() => {
      setLoading(false);
      setState((prev) => ({
        ...prev,
        step: 'preview',
      }));
    }, 2000);
  };

  const handlePostToApp = () => {
    setState((prev) => ({
      ...prev,
      step: 'complete',
    }));
    Alert.alert('Success', 'Content will be posted to your listings');
    router.replace('/(tabs)');
  };

  const handleShare = () => {
    Alert.alert('Share', 'Opening share options for social media');
    // TODO: Implement sharing to social platforms
  };

  const handleReset = () => {
    setState({
      step: 'image',
      selectedImage: null,
      selectedStyle: null,
      selectedMaterials: [],
    });
  };

  // STEP 1: IMAGE SELECTION
  if (state.step === 'image') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={24} color={Colors.onSurface} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>AI Branding</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <LinearGradient
            colors={['rgba(123, 47, 255, 0.1)', 'rgba(123, 47, 255, 0.05)']}
            style={styles.card}
          >
            <Sparkles size={48} color={Colors.primary} style={{ marginBottom: 16 }} />
            <Text style={styles.cardTitle}>Transform Your Product Photos</Text>
            <Text style={styles.cardDescription}>
              Upload an image and let AI enhance it with professional styling, backgrounds, and
              marketing materials
            </Text>
          </LinearGradient>

          <View style={styles.section}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => pickImage(true)}
              activeOpacity={0.8}
            >
              <Upload size={20} color="#fff" />
              <Text style={styles.primaryButtonText}>Take a Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => pickImage(false)}
              activeOpacity={0.8}
            >
              <Plus size={20} color={Colors.primary} />
              <Text style={styles.secondaryButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>💡 Tips for Best Results</Text>
            <Text style={styles.tipItem}>• Good lighting makes a huge difference</Text>
            <Text style={styles.tipItem}>• Centered composition works best</Text>
            <Text style={styles.tipItem}>• Clear, clean background preferred</Text>
            <Text style={styles.tipItem}>• High resolution (1080px+) recommended</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // STEP 2: STYLE SELECTION
  if (state.step === 'style') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleReset}>
            <ChevronLeft size={24} color={Colors.onSurface} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Choose Style</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {state.selectedImage && (
            <Image source={{ uri: state.selectedImage }} style={styles.previewImage} />
          )}

          <Text style={styles.sectionTitle}>What style would you like?</Text>

          <View style={styles.optionsGrid}>
            {STYLE_OPTIONS.map((style) => (
              <TouchableOpacity
                key={style.id}
                style={[
                  styles.optionCard,
                  state.selectedStyle === style.id && styles.optionCardActive,
                ]}
                onPress={() => handleStyleSelect(style.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.optionEmoji}>{style.emoji}</Text>
                <Text style={styles.optionLabel}>{style.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // STEP 3: MATERIAL SELECTION
  if (state.step === 'materials') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() =>
              setState((prev) => ({
                ...prev,
                step: 'style',
              }))
            }
          >
            <ChevronLeft size={24} color={Colors.onSurface} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Marketing Materials</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {state.selectedImage && (
            <Image source={{ uri: state.selectedImage }} style={styles.previewImage} />
          )}

          <Text style={styles.sectionTitle}>What would you like to generate?</Text>

          <View style={styles.optionsGrid}>
            {MATERIAL_OPTIONS.map((material) => (
              <TouchableOpacity
                key={material.id}
                style={[
                  styles.optionCard,
                  state.selectedMaterials.includes(material.id) && styles.optionCardActive,
                ]}
                onPress={() => handleMaterialToggle(material.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.optionEmoji}>{material.emoji}</Text>
                <Text style={styles.optionLabel}>{material.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleEnhanceImage}
            disabled={loading}
          >
            <Sparkles size={20} color="#fff" />
            <Text style={styles.primaryButtonText}>
              {loading ? 'Enhancing...' : 'Enhance & Generate'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // STEP 4: ENHANCING
  if (state.step === 'enhance') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.centerContent}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Enhancing your image...</Text>
            <Text style={styles.loadingSubtext}>This may take a moment</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // STEP 5: PREVIEW
  if (state.step === 'preview') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setState((prev) => ({ ...prev, step: 'materials' }))}>
            <ChevronLeft size={24} color={Colors.onSurface} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Preview</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {state.selectedImage && (
            <Image source={{ uri: state.selectedImage }} style={styles.largePreview} />
          )}

          <Text style={styles.sectionTitle}>Ready to share?</Text>
          <Text style={styles.previewDescription}>
            Your content has been enhanced and is ready to post. Choose how to proceed below.
          </Text>

          <TouchableOpacity style={styles.primaryButton} onPress={handlePostToApp}>
            <Plus size={20} color="#fff" />
            <Text style={styles.primaryButtonText}>Post to App</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleShare}>
            <Share2 size={20} color={Colors.primary} />
            <Text style={styles.secondaryButtonText}>Share to Social</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return null;
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
    borderBottomColor: Colors.surfaceContainerLow,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
  },
  content: {
    padding: 24,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    marginBottom: 32,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    marginBottom: 12,
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  tipsSection: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  tipsTitle: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: Colors.onSurface,
    marginBottom: 4,
  },
  tipItem: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: Colors.onSurfaceVariant,
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
    marginBottom: 16,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  optionCard: {
    width: (width - 60) / 2,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.outline,
    gap: 8,
  },
  optionCardActive: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(123, 47, 255, 0.05)',
  },
  optionEmoji: {
    fontSize: 32,
  },
  optionLabel: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.onSurface,
    textAlign: 'center',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 24,
  },
  largePreview: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 24,
  },
  previewDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: Colors.onSurfaceVariant,
    marginBottom: 24,
    lineHeight: 20,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: Colors.onSurface,
    marginTop: 16,
  },
  loadingSubtext: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: Colors.onSurfaceVariant,
    marginTop: 8,
  },
});
