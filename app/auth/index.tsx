import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function AuthIndex() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>Oboy</Text>
          <Text style={styles.tagline}>The Student Marketplace</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/auth/signup')}>
            <LinearGradient 
              colors={Colors.soulGradient as [string, string]} 
              style={styles.gradient}
            >
              <Text style={styles.btnTextPrimary}>Create Account</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.push('/auth/login')}>
            <Text style={styles.btnTextSecondary}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flex: 1, justifyContent: 'space-between', padding: 24, paddingVertical: 100 },
  logoContainer: { alignItems: 'center', marginTop: 40 },
  logo: { fontSize: 64, fontFamily: 'PlusJakartaSans_800ExtraBold', color: Colors.primary, letterSpacing: -2 },
  tagline: { fontSize: 18, fontFamily: 'Inter_500Medium', color: Colors.onSurfaceVariant, marginTop: 12 },
  actions: { gap: 16 },
  primaryBtn: { borderRadius: 32, overflow: 'hidden' },
  gradient: { paddingVertical: 20, alignItems: 'center' },
  btnTextPrimary: { fontSize: 16, fontFamily: 'PlusJakartaSans_700Bold', color: Colors.white },
  secondaryBtn: { paddingVertical: 20, alignItems: 'center', borderRadius: 32, backgroundColor: Colors.surfaceContainerLow },
  btnTextSecondary: { fontSize: 16, fontFamily: 'PlusJakartaSans_700Bold', color: Colors.primary },
});
