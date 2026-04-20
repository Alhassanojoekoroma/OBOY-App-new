import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Zap, CheckCircle2, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

/**
 * Seller Onboarding Screen
 * Guides sellers through key features including AI branding
 * Shows benefits of using the AI feature to enhance listings
 */
export default function SellerOnboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Create Your First Listing',
      description: 'Share products or services with the student community',
      icon: '📦',
      action: 'Start Selling',
      color: '#7B2FFF',
    },
    {
      title: '✨ Use AI to Stand Out',
      description: 'Enhance your product photos with professional styling and marketing materials',
      icon: '🤖',
      action: 'Learn More',
      color: '#6366F1',
    },
    {
      title: 'Grow Your Sales',
      description: 'Better photos = More interest = More sales. It\'s that simple',
      icon: '📈',
      action: 'Get Started',
      color: '#EC4899',
    },
  ];

  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Go to create listing with AI feature
      router.replace('/seller/create-listing');
    }
  };

  const handleSkip = () => {
    router.replace('/seller/my-listings');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Step Indicator */}
        <View style={styles.stepIndicator}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.stepDot,
                index === currentStep && { backgroundColor: Colors.primary, width: 24 },
                index < currentStep && { backgroundColor: Colors.primary },
              ]}
            />
          ))}
        </View>

        {/* Animated Background */}
        <LinearGradient
          colors={[`${currentStepData.color}20`, `${currentStepData.color}05`]}
          style={styles.backgroundGradient}
        >
          {/* Icon */}
          <Text style={styles.stepIcon}>{currentStepData.icon}</Text>

          {/* Title & Description */}
          <Text style={styles.stepTitle}>{currentStepData.title}</Text>
          <Text style={styles.stepDescription}>{currentStepData.description}</Text>

          {/* Feature List for AI Step */}
          {currentStep === 1 && (
            <View style={styles.featureList}>
              <FeatureItem icon="🎨" text="Professional styling presets" />
              <FeatureItem icon="📸" text="Background removal & replacement" />
              <FeatureItem icon="✍️" text="AI-generated marketing copy" />
              <FeatureItem icon="📱" text="Multiple format generation" />
            </View>
          )}

          {/* Benefits for Growth Step */}
          {currentStep === 2 && (
            <View style={styles.benefitsList}>
              <BenefitItem number="3x" text="More engagement with better visuals" />
              <BenefitItem number="2x" text="Faster sales with professional content" />
              <BenefitItem number="∞" text="Unlimited generations, forever free" />
            </View>
          )}
        </LinearGradient>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>{currentStepData.action}</Text>
            <ArrowRight size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const FeatureItem: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const BenefitItem: React.FC<{ number: string; text: string }> = ({ number, text }) => (
  <View style={styles.benefitItem}>
    <Text style={styles.benefitNumber}>{number}</Text>
    <Text style={styles.benefitText}>{text}</Text>
  </View>
);

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
  },
  skipText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: Colors.primary,
  },
  content: {
    padding: 24,
    paddingTop: 16,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.outline,
    transition: 'all 0.3s ease',
  },
  backgroundGradient: {
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginBottom: 32,
    minHeight: 380,
    justifyContent: 'center',
  },
  stepIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  stepTitle: {
    fontSize: 24,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
    marginBottom: 12,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  featureList: {
    width: '100%',
    gap: 12,
    marginTop: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 12,
    borderRadius: 12,
  },
  featureIcon: {
    fontSize: 20,
  },
  featureText: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurface,
  },
  benefitsList: {
    width: '100%',
    gap: 16,
    marginTop: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 12,
    borderRadius: 12,
  },
  benefitNumber: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.primary,
    minWidth: 40,
  },
  benefitText: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurface,
  },
  buttonContainer: {
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
});
