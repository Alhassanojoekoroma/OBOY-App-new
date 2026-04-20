import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

interface OnboardingScreen {
  id: number;
  title: string;
  titleBold: string;
  subtitle: string;
  image: string;
  gradient: [string, string];
}

const ONBOARDING_SCREENS: OnboardingScreen[] = [
  {
    id: 1,
    title: 'Empower Yourself With ',
    titleBold: 'Quick Knowledge',
    subtitle: 'Access premium educational content tailored to your learning journey.',
    image: 'https://images.unsplash.com/photo-1516534775068-bb57a52d4d33?q=80&w=2070&auto=format&fit=crop',
    gradient: ['#f5e6ff', '#ffffff'],
  },
  {
    id: 2,
    title: 'Elevate Your Experience With ',
    titleBold: 'Quick Insights',
    subtitle: 'Discover exclusive opportunities, events, and resources on your campus.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
    gradient: ['#f0f4ff', '#ffffff'],
  },
  {
    id: 3,
    title: 'Stay Motivated And ',
    titleBold: 'Achieve Goals 📚',
    subtitle: 'Connect with peers, earn money by selling items, and transform your campus experience.',
    image: 'https://images.unsplash.com/photo-1494287298512-9e36ce57b216?q=80&w=2070&auto=format&fit=crop',
    gradient: ['#ffe6f0', '#ffffff'],
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [animated] = useState(new Animated.Value(0));

  const handleNext = async () => {
    if (currentScreen < ONBOARDING_SCREENS.length - 1) {
      setCurrentScreen(currentScreen + 1);
      // Animate
      Animated.timing(animated, {
        toValue: currentScreen + 1,
        duration: 400,
        useNativeDriver: false,
      }).start();
    } else {
      // Complete onboarding
      try {
        await AsyncStorage.setItem('ONBOARDING_COMPLETE', 'true');
        router.replace('/(tabs)');
      } catch (error) {
        console.error('Error saving onboarding status:', error);
        router.replace('/(tabs)');
      }
    }
  };

  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem('ONBOARDING_COMPLETE', 'true');
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
      router.replace('/(tabs)');
    }
  };

  const screen = ONBOARDING_SCREENS[currentScreen];

  // Calculate dot opacity for smooth transitions
  const dotOpacity = (index: number) => {
    return animated.interpolate({
      inputRange: [Math.max(0, index - 1), index, Math.min(2, index + 1)],
      outputRange: [0.4, 1, 0.4],
      extrapolate: 'clamp',
    });
  };

  return (
    <LinearGradient
      colors={screen.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Skip Button */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          <View style={{ width: 40 }} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Image/Illustration */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: screen.image }}
              style={styles.image}
              resizeMode="cover"
            />
            {/* Overlay gradient for text readability */}
            <LinearGradient
              colors={['transparent', 'rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 1)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
          </View>

          {/* Title with bold word */}
          <View style={styles.textContainer}>
            <View style={styles.titleWrapper}>
              <Text style={styles.titleRegular}>{screen.title}</Text>
              <Text style={styles.titleBold}>{screen.titleBold}</Text>
            </View>

            {/* Subtitle */}
            <Text style={styles.subtitle}>{screen.subtitle}</Text>
          </View>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          {/* Dot Indicators */}
          <View style={styles.dotsContainer}>
            {ONBOARDING_SCREENS.map((_, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    opacity: dotOpacity(index),
                    backgroundColor:
                      index === currentScreen ? Colors.primary : Colors.outline,
                  },
                ]}
              />
            ))}
          </View>

          {/* Next Button */}
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <View style={styles.nextButtonInner}>
              <ChevronRight size={24} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  skipText: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurface,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  imageContainer: {
    width: '100%',
    height: height * 0.35,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 32,
    backgroundColor: Colors.surfaceContainerLow,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    width: '100%',
  },
  titleWrapper: {
    marginBottom: 16,
  },
  titleRegular: {
    fontSize: 32,
    fontFamily: 'PlusJakartaSans_500Medium',
    color: Colors.onSurface,
    lineHeight: 40,
  },
  titleBold: {
    fontSize: 32,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.primary,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: Colors.onSurfaceVariant,
    lineHeight: 24,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  nextButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  nextButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
