import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { 
  useFonts, 
  PlusJakartaSans_400Regular, 
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold, 
  PlusJakartaSans_800ExtraBold
} from '@expo-google-fonts/plus-jakarta-sans';
import { 
  Inter_400Regular, 
  Inter_500Medium, 
  Inter_600SemiBold 
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });
  
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(null);

  useEffect(() => {
    if (error) {
      console.error('Font loading error:', error);
    }
  }, [error]);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const hasCompleted = await AsyncStorage.getItem('ONBOARDING_COMPLETE');
        setOnboardingComplete(hasCompleted === 'true');
      } catch (err) {
        console.error('Error checking onboarding:', err);
        setOnboardingComplete(false); // Default to showing onboarding
      }
    };
    checkOnboarding();
  }, []);

  useEffect(() => {
    if (loaded && onboardingComplete !== null) {
      SplashScreen.hideAsync();
    }
  }, [loaded, onboardingComplete]);

  if (!loaded || onboardingComplete === null) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        {!onboardingComplete ? (
          <Stack.Screen name="onboarding" />
        ) : (
          <>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="notifications" options={{ presentation: 'modal' }} />
            <Stack.Screen name="detail/[id]" options={{ presentation: 'modal' }} />
            <Stack.Screen name="onboarding" options={{ presentation: 'fullScreenModal' }} />
          </>
        )}
      </Stack>
    </GestureHandlerRootView>
  );
}
