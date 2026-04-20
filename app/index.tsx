import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import { useRouter } from 'expo-router';
import { ShoppingBag, Users, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Welcome to Oboy',
    description: 'The ultimate marketplace for students. Connect, buy, and sell easily within your campus community.',
    icon: <Users size={100} color={Colors.white} strokeWidth={1.5} />,
    color: Colors.primary,
  },
  {
    id: '2',
    title: 'Discover & Shop',
    description: 'Find textbooks, electronics, and essentials from verified students nearby.',
    icon: <ShoppingBag size={100} color={Colors.white} strokeWidth={1.5} />,
    color: Colors.secondary,
  },
  {
    id: '3',
    title: 'Start Selling Today',
    description: 'Turn your unused items into cash. Quick upload, instant connections with buyers.',
    icon: <Zap size={100} color={Colors.white} strokeWidth={1.5} />,
    color: Colors.tertiary,
  }
];

export default function OnboardingScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      router.replace('/auth');
    }
  };

  const handleSkip = () => {
    router.replace('/auth');
  };

  const renderItem = ({ item }: { item: typeof SLIDES[0] }) => {
    return (
      <View style={[styles.slide, { width }]}>
        <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
          {item.image ? (
            <Image source={item.image} style={styles.uploadedImage} resizeMode="cover" />
          ) : (
            item.icon
          )}
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
      />
      
      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentIndex === index && styles.indicatorActive
              ]}
            />
          ))}
        </View>

        <View style={styles.controls}>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
            <LinearGradient
              colors={Colors.soulGradient as [string, string]}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.nextText}>
                {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    paddingTop: height * 0.1,
  },
  iconContainer: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
    shadowColor: Colors.onSurface,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
    overflow: 'hidden',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 32,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: Colors.onSurface,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 20 : 32,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: Colors.outlineVariant,
    marginHorizontal: 4,
    opacity: 0.5,
  },
  indicatorActive: {
    width: 24,
    backgroundColor: Colors.primary,
    opacity: 1,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.outline,
    padding: 12,
  },
  nextButton: {
    borderRadius: 32,
    overflow: 'hidden',
  },
  gradient: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.white,
  },
});
