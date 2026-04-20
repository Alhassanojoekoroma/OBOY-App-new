# OBOY App - Quick Fix Guide

## Files Requiring Immediate Action

### 1. `app/_layout.tsx` - ROOT LAYOUT
**Issue**: Error thrown in render-phase useEffect (CRITICAL)
```typescript
// ❌ CURRENT - Line 29-31
useEffect(() => {
  if (error) throw error;  // DANGEROUS
}, [error]);

// ✅ FIX
useEffect(() => {
  if (error) {
    console.error('Font loading error:', error);
    // Don't throw - handle gracefully
  }
}, [error]);
```

---

### 2. `app/(tabs)/_layout.tsx` - TAB NAVIGATION
**Issue**: Type casting with `as any` (CRITICAL)
```typescript
// ❌ CURRENT - Line 101
onPress={() => router.push('/post' as any)}

// ✅ FIX
onPress={() => router.push('/post' as const)}
// Or use proper route type
```

---

### 3. `app/(tabs)/index.tsx` - HOME SCREEN
**Issues**: 
- Products typed as `any[]` (CRITICAL)
- 400+ lines - too large (MEDIUM)
- No memoization (HIGH)
- Silently catches errors (HIGH)

**Quick Fixes**:
1. Add Product interface
2. Extract HomeHeader component
3. Extract ProductCard component with React.memo()
4. Add proper error logging

---

### 4. `app/(tabs)/profile.tsx` - PROFILE SCREEN
**Issues**:
- currentUser typed as `any` (CRITICAL)
- Missing error handling in getUser (CRITICAL)
- No loading state (MEDIUM)

**Quick Fix**:
```typescript
interface User {
  id: string;
  full_name?: string;
  university?: string;
  profile_image_url?: string;
}

const [currentUser, setCurrentUser] = React.useState<User | null>(null);

React.useEffect(() => {
  const getUser = async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.error('Auth error:', authError);
        return;
      }
      if (user) {
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
        if (profileError) {
          console.error('Profile error:', profileError);
          return;
        }
        setCurrentUser(profile);
      }
    } catch (err) {
      console.error('Error in getUser:', err);
    }
  };
  getUser();
}, []);
```

---

### 5. `utils/supabase.ts` - SUPABASE CONFIG
**Issue**: Hardcoded dummy credentials (CRITICAL SECURITY)

```typescript
// ❌ CURRENT
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'dummy_anon_key';

// ✅ FIX
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration. Please set environment variables.');
}

if (supabaseUrl.includes('dummy')) {
  throw new Error('Invalid Supabase URL - contains "dummy"');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

---

### 6. `app/auth/login.tsx` - LOGIN SCREEN
**Issue**: No validation + mock fallback hides errors (CRITICAL)

```typescript
// ✅ ADD VALIDATION
const validateLogin = (): string | null => {
  if (!email.trim()) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email';
  if (!password) return 'Password is required';
  return null;
};

// ✅ BETTER ERROR HANDLING
const handleLogin = async () => {
  const error = validateLogin();
  if (error) {
    Alert.alert('Validation Error', error);
    return;
  }

  setLoading(true);
  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        Alert.alert('Login Failed', 'Invalid email or password');
      } else {
        Alert.alert('Error', error.message);
      }
      return;
    }

    router.replace('/');
  } catch (err: any) {
    Alert.alert('Error', 'Unexpected error occurred');
  } finally {
    setLoading(false);
  }
};
```

---

### 7. `app/auth/signup.tsx` - SIGNUP SCREEN
**Issue**: Minimal validation (CRITICAL)

```typescript
// ✅ ADD PROPER VALIDATION
const validateSignup = (): string | null => {
  if (!fullName.trim()) return 'Full name is required';
  if (!email.trim()) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email';
  if (password.length < 8) return 'Password must be 8+ characters';
  if (!/[A-Z]/.test(password)) return 'Password must have uppercase';
  if (!/[0-9]/.test(password)) return 'Password must have number';
  if (!university.trim()) return 'University is required';
  return null;
};

const handleSignup = async () => {
  const error = validateSignup();
  if (error) {
    Alert.alert('Validation Error', error);
    return;
  }
  // ... proceed
};
```

---

### 8. `app/post.tsx` - POST LISTING
**Issues**: No image validation (CRITICAL), any types (CRITICAL)

```typescript
// ✅ ADD IMAGE VALIDATION
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const uploadImage = async (uri: string, userId: string): Promise<string> => {
  try {
    const response = await fetch(uri);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
    
    const blob = await response.blob();

    if (!ALLOWED_TYPES.includes(blob.type)) {
      throw new Error(`Invalid type: ${blob.type}`);
    }

    if (blob.size > MAX_FILE_SIZE) {
      throw new Error(`File too large: ${blob.size} bytes`);
    }

    const fileName = `${userId}-${Date.now()}.jpg`;
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, blob, { contentType: blob.type, upsert: true });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};
```

---

### 9. `app/detail/[id].tsx` - PRODUCT DETAIL
**Issues**: `any` types (CRITICAL), error handling (CRITICAL)

```typescript
// ✅ DEFINE PRODUCT INTERFACE
interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  image_url: string;
  users?: {
    id: string;
    full_name: string;
    university: string;
    profile_image_url: string;
  };
}

// ✅ USE PROPER TYPE
const [product, setProduct] = useState<Product | null>(null);

// ✅ PROPER ERROR HANDLING
React.useEffect(() => {
  if (!id || typeof id !== 'string') {
    console.warn('Invalid product ID');
    return;
  }

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`*,users(id,full_name,university,profile_image_url)`)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Product fetch error:', error);
        setProduct(FALLBACK_PRODUCT);
        return;
      }

      if (!data) {
        console.warn('Product not found');
        setProduct(FALLBACK_PRODUCT);
        return;
      }

      setProduct(data);
    } catch (err) {
      console.error('Unexpected error:', err);
      setProduct(FALLBACK_PRODUCT);
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]);
```

---

### 10. `app/messages/[chatId].tsx` - CHAT SCREEN
**Issues**: Realtime subscriptions not cleaned (CRITICAL), direct filter injection (CRITICAL), any types (HIGH)

```typescript
// ✅ FIX REALTIME SUBSCRIPTION
useEffect(() => {
  if (!currentUser?.id || !chatId || typeof chatId !== 'string') {
    setLoading(false);
    return;
  }

  let mounted = true;

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .eq('id', chatId)  // ✅ Proper parameterization
        .order('created_at', { ascending: true });

      if (!mounted) return;

      if (error) {
        console.error('Failed to load:', error);
        return;
      }

      if (data) setMessages(data);
    } finally {
      if (mounted) setLoading(false);
    }
  };

  loadMessages();

  const channel = supabase
    .channel(`chat-${chatId}`)
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'chats', filter: `id=eq.${chatId}` },
      (payload) => {
        if (mounted) setMessages(prev => [...prev, payload.new]);
      }
    )
    .subscribe();

  return () => {
    mounted = false;
    channel.unsubscribe();
  };
}, [chatId, currentUser?.id]);
```

---

## Quick Win Components to Create

### 1. `components/BackButton.tsx`
```typescript
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import Colors from '../constants/Colors';

export const BackButton = ({ onPress, style }: any) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <ChevronLeft size={24} color={Colors.onSurface} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
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
  }
});
```

### 2. `components/LoadingScreen.tsx`
```typescript
import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import Colors from '../constants/Colors';

export const LoadingScreen = ({ message = 'Loading...' }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color={Colors.primary} />
    <Text style={{ marginTop: 16, color: Colors.onSurfaceVariant }}>
      {message}
    </Text>
  </View>
);
```

### 3. `constants/Validation.ts`
```typescript
export const VALIDATORS = {
  email: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  password: (pwd: string) => pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd),
  phone: (phone: string) => /^\d{10,15}$/.test(phone.replace(/\D/g, '')),
  cardNumber: (card: string) => card.replace(/\s/g, '').length >= 13,
  url: (url: string) => /^https?:\/\/.+/.test(url),
};

export const VALIDATION_MESSAGES = {
  email: 'Invalid email address',
  password: 'Password must be 8+ chars with uppercase and number',
  phone: 'Invalid phone number',
  required: 'This field is required',
};
```

---

## Testing Checklist

- [ ] All TypeScript errors eliminated
- [ ] All `any` types replaced with proper interfaces
- [ ] All async operations have error handling
- [ ] All forms have input validation
- [ ] All API calls have retry logic
- [ ] All subscriptions properly cleaned up
- [ ] All navigation parameters validated
- [ ] All file uploads validated (type + size)
- [ ] All user inputs sanitized
- [ ] Error tracking implemented
- [ ] Loading states consistent
- [ ] Offline mode handled
- [ ] Network timeout handled

---

## Deployment Checklist

- [ ] Fix all CRITICAL issues
- [ ] Fix all HIGH issues
- [ ] Add error tracking (Sentry)
- [ ] Set TypeScript strict: true
- [ ] Add proper logging
- [ ] Set up error boundary
- [ ] Add rate limiting
- [ ] Set up monitoring
- [ ] Create documentation
- [ ] Perform security audit
- [ ] Load testing
- [ ] UAT testing
