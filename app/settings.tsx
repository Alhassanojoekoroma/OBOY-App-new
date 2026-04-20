import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Bell, Lock, User, Eye, Globe } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '../constants/Colors';

export default function SettingsScreen() {
  const router = useRouter();
  const [pushEnabled, setPushEnabled] = React.useState(true);
  const [emailEnabled, setEmailEnabled] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={Colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ACCOUNT</Text>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingMain}>
              <View style={[styles.iconBox, { backgroundColor: 'rgba(78, 69, 228, 0.1)' }]}>
                <User size={20} color={Colors.primary} />
              </View>
              <Text style={styles.settingText}>Edit Profile</Text>
            </View>
            <Text style={styles.valueText}>Alex Johnson</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>NOTIFICATIONS</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingMain}>
              <View style={[styles.iconBox, { backgroundColor: 'rgba(255, 179, 0, 0.1)' }]}>
                <Bell size={20} color="#FFB300" />
              </View>
              <Text style={styles.settingText}>Push Notifications</Text>
            </View>
            <Switch 
              value={pushEnabled} 
              onValueChange={setPushEnabled}
              trackColor={{ false: Colors.outlineVariant, true: Colors.primary }}
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingMain}>
              <View style={[styles.iconBox, { backgroundColor: 'rgba(0, 168, 107, 0.1)' }]}>
                <Globe size={20} color="#00A86B" />
              </View>
              <Text style={styles.settingText}>Email Alerts</Text>
            </View>
            <Switch 
              value={emailEnabled} 
              onValueChange={setEmailEnabled}
              trackColor={{ false: Colors.outlineVariant, true: Colors.primary }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SECURITY & PRIVACY</Text>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingMain}>
              <View style={[styles.iconBox, { backgroundColor: 'rgba(255, 82, 82, 0.1)' }]}>
                <Lock size={20} color="#FF5252" />
              </View>
              <Text style={styles.settingText}>Change Password</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingMain}>
              <View style={[styles.iconBox, { backgroundColor: 'rgba(78, 69, 228, 0.1)' }]}>
                <Eye size={20} color={Colors.primary} />
              </View>
              <Text style={styles.settingText}>Privacy Settings</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.6)',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionLabel: {
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
    color: Colors.onSurfaceVariant,
    letterSpacing: 1,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  settingMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingText: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.onSurface,
  },
  valueText: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurfaceVariant,
  }
});
