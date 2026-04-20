import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Construction } from 'lucide-react-native';
import Colors from '../constants/Colors';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function GenericFeatureScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const title = params.title || 'Feature';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={Colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Construction size={48} color={Colors.primary} />
        </View>
        <Text style={styles.title}>Under Construction</Text>
        <Text style={styles.subtext}>
          The {title} feature is currently being built by our engineering team. Check back soon!
        </Text>
        <TouchableOpacity style={styles.returnBtn} onPress={() => router.back()}>
          <Text style={styles.returnBtnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 24, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.6)',
  },
  headerTitle: { fontSize: 20, fontFamily: 'PlusJakartaSans_700Bold', color: Colors.onSurface },
  backButton: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.white,
    alignItems: 'center', justifyContent: 'center', shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2,
  },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  iconCircle: { width: 96, height: 96, borderRadius: 48, backgroundColor: 'rgba(78, 69, 228, 0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  title: { fontSize: 28, fontFamily: 'PlusJakartaSans_800ExtraBold', color: Colors.onSurface, marginBottom: 12 },
  subtext: { fontSize: 16, fontFamily: 'Inter_500Medium', color: Colors.onSurfaceVariant, textAlign: 'center', lineHeight: 24, marginBottom: 32 },
  returnBtn: { backgroundColor: Colors.surfaceContainerLow, paddingHorizontal: 32, paddingVertical: 16, borderRadius: 24 },
  returnBtnText: { fontSize: 16, fontFamily: 'PlusJakartaSans_700Bold', color: Colors.primary },
});
