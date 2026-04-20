import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Receipt, Settings, History, LifeBuoy, LogOut, ChevronRight, Users, Package, LineChart, Clock } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { supabase } from '../../utils/supabase';
import { User } from '../../types';
import { formatErrorMessage } from '../../utils/validation';

const MENU_ITEMS = [
  { id: '1', title: 'Invoices', icon: Receipt, color: 'rgba(78, 69, 228, 0.1)', iconColor: Colors.primary, route: '/invoices' },
  { id: '2', title: 'Order History', icon: History, color: 'rgba(116, 47, 229, 0.05)', iconColor: Colors.secondary, route: '/order-history' },
  { id: '3', title: 'Help & Support', icon: LifeBuoy, color: 'rgba(168, 54, 75, 0.05)', iconColor: Colors.error, route: '/help-support' },
  { id: '4', title: 'Sign Out', icon: LogOut, color: Colors.surfaceContainerHigh, iconColor: Colors.onSurfaceVariant, route: '/' },
];

export default function ProfileScreen() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
        
        if (authError) {
          console.error('Auth error:', authError);
          setError('Unable to fetch user information');
          return;
        }

        if (authUser) {
          const { data: profile, error: profileError } = await supabase
            .from('users')
            .select('*')
            .eq('id', authUser.id)
            .single();
          
          if (profileError) {
            console.error('Profile error:', profileError);
            setCurrentUser({
              id: authUser.id,
              email: authUser.email || '',
              full_name: authUser.user_metadata?.full_name || 'User',
              university: authUser.user_metadata?.university || 'Not set',
            });
          } else if (profile) {
            setCurrentUser(profile);
          }
        }
      } catch (err: unknown) {
        const errorMsg = formatErrorMessage(err);
        console.error('Error fetching user:', err);
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase.auth.signOut();
              if (error) {
                Alert.alert('Error', 'Failed to sign out: ' + error.message);
                return;
              }
              router.replace('/auth');
            } catch (err: unknown) {
              const errorMsg = formatErrorMessage(err);
              Alert.alert('Error', errorMsg);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ width: 40 }} />
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => router.push('/settings')}
        >
          <Settings size={22} color={Colors.onSurface} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarBorder}>
            <Image 
              source={{ uri: currentUser?.profile_image_url || 'https://lh3.googleusercontent.com/a/ACg8ocL_FmR_b9K1oP7o3-XpCg=' }} 
              style={styles.avatar}
            />
          </View>
          <Text style={styles.userName}>{currentUser?.full_name || 'Alex Johnson'}</Text>
          <Text style={styles.userRole}>{currentUser?.university || 'Computer Science • Year 3'}</Text>
          <View style={styles.idBadge}>
            <Text style={styles.idText}>Student ID: {currentUser ? currentUser.id.substring(0,8) : '2024-CS-089'}</Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCardGrid}>
            <View style={styles.statHeader}>
              <Text style={styles.statCardLabel}>Total Earnings</Text>
              <View style={[styles.statIconWrapper, { backgroundColor: 'rgba(78, 69, 228, 0.1)' }]}>
                <Users size={16} color={Colors.primary} />
              </View>
            </View>
            <Text style={styles.statCardValue}>₦10,000</Text>
          </View>

          <View style={styles.statCardGrid}>
            <View style={styles.statHeader}>
              <Text style={styles.statCardLabel}>Total Product</Text>
              <View style={[styles.statIconWrapper, { backgroundColor: 'rgba(255, 179, 0, 0.1)' }]}>
                <Package size={16} color="#FFB300" />
              </View>
            </View>
            <Text style={styles.statCardValue}>44</Text>
          </View>

          <View style={styles.statCardGrid}>
            <View style={styles.statHeader}>
              <Text style={styles.statCardLabel}>Total Invoice</Text>
              <View style={[styles.statIconWrapper, { backgroundColor: 'rgba(0, 168, 107, 0.1)' }]}>
                <LineChart size={16} color="#00A86B" />
              </View>
            </View>
            <Text style={styles.statCardValue}>20</Text>
          </View>

          <View style={styles.statCardGrid}>
            <View style={styles.statHeader}>
              <Text style={styles.statCardLabel}>Pending Payment</Text>
              <View style={[styles.statIconWrapper, { backgroundColor: 'rgba(255, 82, 82, 0.1)' }]}>
                <Clock size={16} color="#FF5252" />
              </View>
            </View>
            <Text style={styles.statCardValue}>2040</Text>
          </View>
        </View>

        {/* Seller Section */}
        <View style={styles.sellerSection}>
          <View style={styles.sellerInfo}>
            <Text style={styles.sellerTitle}>Student Seller Hub</Text>
            <Text style={styles.sellerDescription}>List items, manage products, and connect with buyers on campus.</Text>
          </View>
          <TouchableOpacity style={styles.sellerButton} onPress={() => router.push('/seller')}>
            <Text style={styles.sellerButtonText}>{currentUser?.isSeller ? 'Go to Hub' : 'Start Selling'}</Text>
            <ChevronRight size={16} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuList}>
          {MENU_ITEMS.map(item => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem} 
              onPress={() => {
                if (item.id === '4') {
                  handleSignOut();
                } else {
                  router.push(item.route as any);
                }
              }}
            >
              <View style={[styles.menuIconCircle, { backgroundColor: item.color }]}>
                <item.icon size={20} color={item.iconColor} />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <ChevronRight size={20} color={Colors.outlineVariant} />
            </TouchableOpacity>
          ))}
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
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 100,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarBorder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: 'rgba(78, 69, 228, 0.1)',
    padding: 2,
    marginBottom: 16,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 48,
    backgroundColor: Colors.surfaceContainerHigh,
  },
  userName: {
    fontSize: 24,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: Colors.onSurface,
  },
  userRole: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurfaceVariant,
    marginTop: 4,
  },
  idBadge: {
    backgroundColor: 'rgba(78, 69, 228, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 16,
  },
  idText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.primary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '4%',
    rowGap: 16,
    marginBottom: 32,
  },
  statCardGrid: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.surfaceContainer,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statCardLabel: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurfaceVariant,
  },
  statCardValue: {
    fontSize: 22,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: Colors.onSurface,
  },
  sellerSection: {
    backgroundColor: 'rgba(78, 69, 228, 0.05)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(78, 69, 228, 0.1)',
  },
  sellerInfo: {
    marginBottom: 16,
  },
  sellerTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  sellerDescription: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurfaceVariant,
    lineHeight: 20,
  },
  sellerButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  sellerButtonText: {
    color: Colors.white,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },
  menuList: {
    gap: 8,
  },
  menuItem: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  menuIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuTitle: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.onSurface,
  },
});
