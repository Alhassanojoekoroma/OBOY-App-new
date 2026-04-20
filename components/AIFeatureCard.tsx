import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Sparkles, ArrowRight } from 'lucide-react-native';
import Colors from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

interface AIFeatureCardProps {
  onPress?: () => void;
  compact?: boolean;
}

/**
 * AI Feature Card Component
 * Prominently displays the AI branding feature to users
 * Can be placed on home screen, seller dashboard, or listing creation flow
 */
export const AIFeatureCard: React.FC<AIFeatureCardProps> = ({ onPress, compact = false }) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push('/ai');
    }
  };

  if (compact) {
    return (
      <TouchableOpacity
        style={styles.compactCard}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View style={styles.compactContent}>
          <View style={styles.compactLeft}>
            <Sparkles size={20} color={Colors.primary} />
            <View>
              <Text style={styles.compactTitle}>AI Branding</Text>
              <Text style={styles.compactSubtitle}>Enhance your photos</Text>
            </View>
          </View>
          <ArrowRight size={20} color={Colors.primary} />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
      <LinearGradient
        colors={['rgba(123, 47, 255, 0.15)', 'rgba(123, 47, 255, 0.05)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Sparkles size={24} color={Colors.primary} />
          </View>
          <Text style={styles.badge}>NEW</Text>
        </View>

        <Text style={styles.title}>AI Branding</Text>
        <Text style={styles.subtitle}>
          Transform your product photos into professional marketing materials with AI
        </Text>

        <View style={styles.features}>
          <Feature icon="🎨" text="Professional styling" />
          <Feature icon="✨" text="Background enhancement" />
          <Feature icon="📱" text="Multiple formats" />
        </View>

        <View style={styles.footer}>
          <Text style={styles.cta}>Try it now →</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const Feature: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <View style={styles.featureRow}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

/**
 * AI Feature Inline Button
 * Minimal button for secondary placement (seller dashboard, settings, etc.)
 */
export const AIFeatureButton: React.FC<{ onPress?: () => void }> = ({ onPress }) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push('/ai');
    }
  };

  return (
    <TouchableOpacity
      style={styles.inlineButton}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Sparkles size={18} color="#fff" />
      <Text style={styles.inlineButtonText}>AI Branding</Text>
    </TouchableOpacity>
  );
};

/**
 * AI Feature Banner
 * Eye-catching banner for top placement (home screen hero section)
 */
export const AIFeatureBanner: React.FC<{ onPress?: () => void }> = ({ onPress }) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push('/ai');
    }
  };

  return (
    <TouchableOpacity
      style={styles.banner}
      onPress={handlePress}
      activeOpacity={0.85}
    >
      <LinearGradient
        colors={[Colors.primary, '#6366F1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bannerGradient}
      >
        <View style={styles.bannerContent}>
          <View>
            <Text style={styles.bannerTitle}>✨ New Feature</Text>
            <Text style={styles.bannerText}>AI-Powered Product Photography</Text>
            <Text style={styles.bannerDescription}>
              Make your listings stand out with professional AI styling
            </Text>
          </View>
          <View style={styles.bannerIcon}>
            <Sparkles size={32} color="#fff" />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Card Styles
  card: {
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(123, 47, 255, 0.2)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(123, 47, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: Colors.primary,
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 10,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  title: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    color: Colors.onSurfaceVariant,
    lineHeight: 18,
    marginBottom: 16,
  },
  features: {
    gap: 8,
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureIcon: {
    fontSize: 16,
  },
  featureText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurface,
  },
  footer: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(123, 47, 255, 0.1)',
  },
  cta: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: Colors.primary,
  },

  // Compact Card Styles
  compactCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: Colors.outline,
  },
  compactContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  compactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  compactTitle: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: Colors.onSurface,
  },
  compactSubtitle: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: Colors.onSurfaceVariant,
  },

  // Inline Button Styles
  inlineButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  inlineButtonText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },

  // Banner Styles
  banner: {
    marginVertical: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  bannerGradient: {
    padding: 20,
  },
  bannerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  bannerText: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#fff',
    marginBottom: 4,
  },
  bannerDescription: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 0,
  },
  bannerIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
