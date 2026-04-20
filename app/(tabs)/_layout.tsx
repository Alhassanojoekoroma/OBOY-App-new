import React from 'react';
import { Tabs } from 'expo-router';
import { Home, Compass, ShoppingBasket, User } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import { View, Text, Platform, TouchableOpacity } from 'react-native';

import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';

export default function TabLayout() {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.outlineVariant,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderTopWidth: 0,
          elevation: 0,
          height: 80,
          paddingBottom: 25,
          paddingTop: 10,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          shadowColor: '#2a343a',
          shadowOffset: { width: 0, height: -8 },
          shadowOpacity: 0.06,
          shadowRadius: 40,
          ...Platform.select({
            android: {
              elevation: 8,
            },
          }),
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: 'Inter_600SemiBold',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? { backgroundColor: Colors.surfaceContainerLow, paddingHorizontal: 16, paddingVertical: 4, borderRadius: 20 } : {}}>
              <Home size={24} color={color} fill={focused ? color : 'none'} />
            </View>
          ),
          tabBarLabel: ({ focused, color }) => (
            focused ? <Text style={{ color, fontSize: 11, fontFamily: 'Inter_600SemiBold', marginTop: 2 }}>HOME</Text> : null
          )
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? { backgroundColor: Colors.surfaceContainerLow, paddingHorizontal: 16, paddingVertical: 4, borderRadius: 20 } : {}}>
              <Compass size={24} color={color} fill={focused ? color : 'none'} />
            </View>
          ),
          tabBarLabel: ({ focused, color }) => (
            focused ? <Text style={{ color, fontSize: 11, fontFamily: 'Inter_600SemiBold', marginTop: 2 }}>DISCOVER</Text> : null
          )
        }}
      />
      <Tabs.Screen
        name="basket"
        options={{
          title: 'Basket',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? { backgroundColor: Colors.surfaceContainerLow, paddingHorizontal: 16, paddingVertical: 4, borderRadius: 20 } : {}}>
              <ShoppingBasket size={24} color={color} fill={focused ? color : 'none'} />
            </View>
          ),
          tabBarLabel: ({ focused, color }) => (
            focused ? <Text style={{ color, fontSize: 11, fontFamily: 'Inter_600SemiBold', marginTop: 2 }}>BASKET</Text> : null
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? { backgroundColor: Colors.surfaceContainerLow, paddingHorizontal: 16, paddingVertical: 4, borderRadius: 20 } : {}}>
              <User size={24} color={color} fill={focused ? color : 'none'} />
            </View>
          ),
          tabBarLabel: ({ focused, color }) => (
            focused ? <Text style={{ color, fontSize: 11, fontFamily: 'Inter_600SemiBold', marginTop: 2 }}>PROFILE</Text> : null
          )
        }}
      />
    </Tabs>
    
    {/* Floating Post Item Button */}
    <View style={{
      position: 'absolute',
      bottom: 60,
      alignSelf: 'center',
      zIndex: 10,
    }}>
      <TouchableOpacity 
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: Colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: Colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
          elevation: 6,
        }}
        onPress={() => router.push('/post' as any)}
      >
        <Plus size={32} color={Colors.white} />
      </TouchableOpacity>
    </View>
    </View>
  );
}
