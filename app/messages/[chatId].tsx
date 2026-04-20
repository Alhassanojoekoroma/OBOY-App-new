import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Send } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { supabase } from '../../utils/supabase';

export default function ChatScreen() {
  const { chatId, product_id, seller_id } = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setCurrentUser(user);
      } else {
        // Mock user for UI if auth not properly setup
        setCurrentUser({ id: 'dummy-buyer' });
      }
    });
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    if (chatId) {
      // Fetch messages for existing chat
      supabase
        .from('chats')
        .select('*')
        // In real setup, you'd fetch messages linked to chatId. 
        // We'll just fetch based on chatId as the message thread id
        .eq('id', chatId) // simplified fetch assuming chatId is conversation root
        .order('created_at', { ascending: true })
        .then(({ data, error }) => {
          if (data) setMessages(data);
          setLoading(false);
        });
        
      // Supabase realtime implementation
      const channel = supabase
        .channel('chats-room')
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'chats',
          filter: `id=eq.${chatId}`, // or conversation_id
        }, (payload) => {
          setMessages(prev => [...prev, payload.new]);
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } else {
      setLoading(false);
    }
  }, [chatId, currentUser]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    try {
      const msgText = input.trim();
      setInput('');
      
      const { data, error } = await supabase
        .from('chats')
        .insert({
          // if chatId exists, use it as thread id, otherwise this creates generic new message
          sender_id: currentUser?.id,
          receiver_id: seller_id as string || 'default',
          product_id: product_id as string || null,
          message: msgText,
        })
        .select()
        .single();
        
      if (error) throw error;
      
      // If we didn't have realtime or it's optimistic update
      if (!chatId) {
        setMessages(prev => [...prev, data]);
      }
    } catch (err) {
      console.error(err);
      // Fallback update
      setMessages(prev => [...prev, { id: Date.now(), message: input, sender_id: currentUser?.id }]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={Colors.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {loading ? (
            <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 40 }} />
          ) : messages.length === 0 ? (
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <Text style={{ fontSize: 16, fontFamily: 'Inter_500Medium', color: Colors.outlineVariant }}>Send a message to start chat</Text>
            </View>
          ) : (
            messages.map((msg, index) => {
              const isMe = msg.sender_id === currentUser?.id;
              return (
                <View key={msg.id || index} style={[styles.bubble, isMe ? styles.myBubble : styles.theirBubble]}>
                  <Text style={[styles.msgText, isMe ? styles.myMsgText : styles.theirMsgText]}>{msg.message}</Text>
                </View>
              );
            })
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor={Colors.outlineVariant}
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Send size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  scrollContent: { padding: 24, flexGrow: 1, justifyContent: 'flex-end' },
  bubble: { maxWidth: '80%', padding: 14, borderRadius: 20, marginBottom: 12 },
  myBubble: { backgroundColor: Colors.primary, alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  theirBubble: { backgroundColor: Colors.white, alignSelf: 'flex-start', borderBottomLeftRadius: 4, shadowColor: Colors.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 1 },
  msgText: { fontSize: 15, fontFamily: 'Inter_500Medium' },
  myMsgText: { color: Colors.white },
  theirMsgText: { color: Colors.onSurface },
  inputContainer: {
    flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: Colors.white,
    borderTopWidth: 1, borderTopColor: 'rgba(255, 255, 255, 0.6)',
  },
  input: { flex: 1, backgroundColor: Colors.surfaceContainerLow, borderRadius: 24, paddingHorizontal: 20, paddingVertical: 12, fontSize: 15, fontFamily: 'Inter_500Medium', color: Colors.onSurface },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', marginLeft: 12 },
});
