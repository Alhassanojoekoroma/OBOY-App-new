import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MessageCircle } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { supabase } from '../../utils/supabase';

export default function MessagesScreen() {
  const router = useRouter();
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setCurrentUser(user);
          // Simplified query to simulate fetch since we don't have exact actual DB schema confirmed
          const { data, error } = await supabase
            .from('chats')
            .select(`
              *,
              products (id, title, image_url),
              sender:users!sender_id (id, full_name, profile_image_url),
              receiver:users!receiver_id (id, full_name, profile_image_url)
            `)
            .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
            .order('timestamp', { ascending: false });

          if (!error && data) {
            setConversations(data);
          }
        }
      } catch (err) {
        console.error('Error fetching conversations', err);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={Colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : conversations.length === 0 ? (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <MessageCircle size={48} color={Colors.outlineVariant} style={{ marginBottom: 16 }} />
            <Text style={{ fontSize: 18, fontFamily: 'PlusJakartaSans_700Bold', color: Colors.onSurface }}>No messages yet</Text>
            <Text style={{ fontSize: 14, fontFamily: 'Inter_500Medium', color: Colors.onSurfaceVariant, textAlign: 'center', marginTop: 8 }}>Your conversations with buyers and sellers will appear here.</Text>
          </View>
        ) : (
          conversations.map((chat) => {
            const otherUser = chat.sender_id === currentUser?.id ? chat.receiver : chat.sender;
            return (
              <TouchableOpacity 
                key={chat.id} 
                style={styles.chatRow} 
                onPress={() => router.push(`/messages/${chat.id}`)}
              >
                <Image source={{ uri: otherUser?.profile_image_url || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop' }} style={styles.avatar} />
                <View style={styles.chatInfo}>
                  <Text style={styles.chatName}>{otherUser?.full_name || 'User'}</Text>
                  <Text style={styles.chatMessage} numberOfLines={1}>{chat.message || 'Started a conversation'}</Text>
                </View>
              </TouchableOpacity>
            )
          })
        )}
      </ScrollView>

      {/* FAB to compose theoretically */}
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
  scrollContent: { padding: 24, paddingBottom: 100 },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 16 },
  chatInfo: { flex: 1 },
  chatName: { fontSize: 16, fontFamily: 'PlusJakartaSans_700Bold', color: Colors.onSurface, marginBottom: 4 },
  chatMessage: { fontSize: 14, fontFamily: 'Inter_500Medium', color: Colors.onSurfaceVariant },
});
