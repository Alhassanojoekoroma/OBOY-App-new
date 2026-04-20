import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Trash2, MessageCircle, ShoppingBag, AlertCircle, Eye } from 'lucide-react-native';
import Colors from '../constants/Colors';
import { useRouter } from 'expo-router';

interface Notification {
  id: string;
  type: 'message' | 'order' | 'listing' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon: React.ReactNode;
  color: string;
}

const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'message',
    title: 'New Message from Amara',
    message: 'Is this iPhone still available? I\'m interested in purchasing it.',
    timestamp: '2 min ago',
    read: false,
    icon: <MessageCircle size={20} color={Colors.primary} />,
    color: 'rgba(78, 69, 228, 0.1)',
  },
  {
    id: '2',
    type: 'order',
    title: 'Order Confirmed',
    message: 'Your order #2024-001 has been confirmed and is being prepared.',
    timestamp: '1 hour ago',
    read: false,
    icon: <ShoppingBag size={20} color="#00A86B" />,
    color: 'rgba(0, 168, 107, 0.1)',
  },
  {
    id: '3',
    type: 'listing',
    title: 'Listing Views',
    message: 'Your iPhone 13 Case listing has 15 new views!',
    timestamp: '3 hours ago',
    read: true,
    icon: <Eye size={20} color="#FFB300" />,
    color: 'rgba(255, 179, 0, 0.1)',
  },
  {
    id: '4',
    type: 'system',
    title: 'Welcome to Oboy!',
    message: 'Start selling your items on campus. Read our safety guidelines first.',
    timestamp: '1 day ago',
    read: true,
    icon: <AlertCircle size={20} color={Colors.error} />,
    color: 'rgba(255, 82, 82, 0.1)',
  },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>(DEMO_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = notifications.filter(
    (notif) => filter === 'all' || !notif.read
  );

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const NotificationCard = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[styles.notificationCard, !item.read && styles.notificationCardUnread]}
      onPress={() => handleMarkAsRead(item.id)}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
        {item.icon}
      </View>

      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage} numberOfLines={2}>
          {item.message}
        </Text>
        <Text style={styles.notificationTime}>{item.timestamp}</Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteNotification(item.id)}
      >
        <Trash2 size={18} color={Colors.outlineVariant} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color={Colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={handleClearAll}>
          <Text style={styles.clearAllText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {(['all', 'unread'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.filterTab, filter === tab && styles.filterTabActive]}
            onPress={() => setFilter(tab)}
          >
            <Text style={[styles.filterText, filter === tab && styles.filterTextActive]}>
              {tab === 'all' ? 'All Notifications' : 'Unread'}
            </Text>
            {tab === 'unread' && notifications.some((n) => !n.read) && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {notifications.filter((n) => !n.read).length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <View style={styles.emptyState}>
          <AlertCircle size={48} color={Colors.outlineVariant} />
          <Text style={styles.emptyTitle}>No notifications</Text>
          <Text style={styles.emptyMessage}>
            {filter === 'unread'
              ? 'You\'re all caught up!'
              : 'You don\'t have any notifications yet'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredNotifications}
          renderItem={NotificationCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          scrollEnabled={true}
        />
      )}
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
    borderBottomColor: Colors.surfaceContainerLow,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
  },
  clearAllText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.primary,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceContainerLow,
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.outline,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterTabActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.onSurface,
  },
  filterTextActive: {
    color: '#fff',
  },
  badge: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.primary,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.surfaceContainerLow,
  },
  notificationCardUnread: {
    backgroundColor: Colors.surfaceContainerLow,
    borderColor: Colors.primary,
    borderWidth: 1.5,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: Colors.onSurface,
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: Colors.onSurfaceVariant,
    marginBottom: 6,
  },
  notificationTime: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: Colors.outlineVariant,
  },
  deleteButton: {
    paddingLeft: 12,
    justifyContent: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
    marginTop: 16,
  },
  emptyMessage: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 8,
  },
});
