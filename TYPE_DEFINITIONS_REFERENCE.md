# OBOY App - Type Definitions Reference

## Shared Interfaces

### `types/domain.ts`

```typescript
/**
 * Core domain models for OBOY App
 * Use these interfaces throughout the app instead of `any`
 */

// User/Auth Types
export interface User {
  id: string;
  full_name: string;
  university: string;
  profile_image_url?: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    university?: string;
  };
}

// Product Types
export interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  category: string;
  image_url?: string;
  user_id: string;
  created_at?: string;
  updated_at?: string;
  users?: User;
  views?: number;
  inquiries?: number;
}

export interface ProductDetail extends Product {
  users: User;
  ratings?: number;
  reviews?: Review[];
}

// Listing Types
export interface Listing {
  id: string;
  title: string;
  price: number;
  image: string;
  views: number;
  inquiries: number;
  status: 'active' | 'sold' | 'pending';
  createdAt: string;
}

export interface CreateListingData {
  image: string;
  title: string;
  description: string;
  price: string;
  category: string;
  quantity?: string;
  location?: string;
}

// Message/Chat Types
export interface Message {
  id: string;
  sender_id: string;
  receiver_id?: string;
  product_id?: string;
  message: string;
  created_at?: string;
  read_at?: string | null;
}

export interface Conversation {
  id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  created_at?: string;
  timestamp?: string;
  sender?: User;
  receiver?: User;
  products?: Product;
}

export interface ChatMessage extends Message {
  sender?: User;
}

// Invoice Types
export interface Invoice {
  id: string;
  invoice_number: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  created_at?: string;
  due_date?: string;
  user_id: string;
}

// Review/Rating Types
export interface Review {
  id: string;
  product_id: string;
  reviewer_id: string;
  rating: number;
  comment?: string;
  created_at?: string;
}

// Seller Stats
export interface SellerStats {
  activeListings: number;
  inquiries: number;
  successfulHandovers: number;
  totalRevenue: number;
}

// Filter Types
export interface FilterOptions {
  category?: string;
  university?: string;
  sortBy?: 'popular' | 'recent' | 'price';
  priceMin?: number;
  priceMax?: number;
}

// Error Response
export interface ApiError {
  code: string;
  message: string;
  status: number;
  details?: Record<string, any>;
}

// API Response Wrapper
export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  loading?: boolean;
}

// Async State
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}
```

---

## Component Props Types

### `types/props.ts`

```typescript
import { ReactNode } from 'react';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

// Screen Props
export interface ScreenProps {
  onBack?: () => void;
  onNavigate?: (route: string) => void;
}

// Component Props
export interface BackButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

export interface LoadingScreenProps {
  message?: string;
  style?: ViewStyle;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error) => void;
}

export interface ProductCardProps {
  product: Product;
  onPress: () => void;
  style?: ViewStyle;
}

export interface ProductGridProps {
  products: Product[];
  onProductPress: (id: string) => void;
  numColumns?: number;
  loading?: boolean;
}

export interface UserAvatarProps {
  user: User;
  size?: 'small' | 'medium' | 'large';
  onPress?: () => void;
}

export interface ChatBubbleProps {
  message: Message;
  isOwn: boolean;
  style?: ViewStyle;
}

// Form Props
export interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  style?: TextStyle;
}

export interface FormState {
  values: Record<string, string>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
}

// Modal Props
export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  style?: ViewStyle;
}
```

---

## Utility Functions

### `utils/typeGuards.ts`

```typescript
import { User, Product, Message, Invoice } from '../types/domain';

/**
 * Type guards to validate data at runtime
 */

export const isUser = (obj: any): obj is User => {
  return (
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.full_name === 'string' &&
    typeof obj.university === 'string'
  );
};

export const isProduct = (obj: any): obj is Product => {
  return (
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.price === 'number' &&
    typeof obj.category === 'string'
  );
};

export const isMessage = (obj: any): obj is Message => {
  return (
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.sender_id === 'string' &&
    typeof obj.message === 'string'
  );
};

export const isInvoice = (obj: any): obj is Invoice => {
  return (
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.amount === 'number' &&
    ['pending', 'paid', 'overdue', 'cancelled'].includes(obj.status)
  );
};

export const isArray = <T>(arr: any, typeGuard: (obj: any) => obj is T): arr is T[] => {
  return Array.isArray(arr) && arr.every(typeGuard);
};
```

---

## Error Handling Utilities

### `utils/errorHandler.ts`

```typescript
import { ApiError } from '../types/domain';

class AppError extends Error {
  constructor(
    public code: string,
    public message: string,
    public status: number = 500,
    public details?: Record<string, any>
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const createError = (
  code: string,
  message: string,
  status: number = 500,
  details?: Record<string, any>
): ApiError => ({
  code,
  message,
  status,
  details,
});

export const handleSupabaseError = (error: any): AppError => {
  if (error.message.includes('Invalid login credentials')) {
    return new AppError('AUTH_INVALID_CREDENTIALS', 'Invalid email or password', 401);
  }
  
  if (error.message.includes('User already registered')) {
    return new AppError('AUTH_USER_EXISTS', 'This email is already registered', 400);
  }

  if (error.status === 404) {
    return new AppError('NOT_FOUND', 'Resource not found', 404);
  }

  if (error.status === 429) {
    return new AppError('RATE_LIMIT', 'Too many requests. Please try again later.', 429);
  }

  return new AppError(
    error.code || 'UNKNOWN_ERROR',
    error.message || 'An unexpected error occurred',
    error.status || 500
  );
};

export const isNetworkError = (error: any): boolean => {
  return (
    error.message.includes('Network') ||
    error.message.includes('Failed to fetch') ||
    error.message.includes('Timeout')
  );
};

export const shouldRetry = (error: AppError): boolean => {
  const retryableStatuses = [408, 429, 500, 502, 503, 504];
  return retryableStatuses.includes(error.status) || isNetworkError(error);
};
```

---

## Validation Utilities

### `utils/validation.ts`

```typescript
import { Alert } from 'react-native';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validators = {
  email: (email: string): ValidationResult => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
      isValid: regex.test(email),
      error: regex.test(email) ? undefined : 'Invalid email address',
    };
  },

  password: (password: string): ValidationResult => {
    if (password.length < 8) {
      return { isValid: false, error: 'Password must be at least 8 characters' };
    }
    if (!/[A-Z]/.test(password)) {
      return { isValid: false, error: 'Password must contain uppercase letter' };
    }
    if (!/[0-9]/.test(password)) {
      return { isValid: false, error: 'Password must contain number' };
    }
    return { isValid: true };
  },

  name: (name: string): ValidationResult => {
    if (!name.trim()) {
      return { isValid: false, error: 'Name is required' };
    }
    if (name.length < 2) {
      return { isValid: false, error: 'Name must be at least 2 characters' };
    }
    return { isValid: true };
  },

  price: (price: string): ValidationResult => {
    const num = parseFloat(price);
    if (isNaN(num)) {
      return { isValid: false, error: 'Price must be a number' };
    }
    if (num <= 0) {
      return { isValid: false, error: 'Price must be greater than 0' };
    }
    return { isValid: true };
  },

  cardNumber: (cardNumber: string): ValidationResult => {
    const cleaned = cardNumber.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(cleaned)) {
      return { isValid: false, error: 'Invalid card number' };
    }
    // Luhn algorithm
    let sum = 0;
    let isEven = false;
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i], 10);
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }
    return {
      isValid: sum % 10 === 0,
      error: sum % 10 === 0 ? undefined : 'Invalid card number',
    };
  },

  expiry: (expiry: string): ValidationResult => {
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      return { isValid: false, error: 'Expiry must be MM/YY format' };
    }
    const [month, year] = expiry.split('/');
    const monthNum = parseInt(month, 10);
    if (monthNum < 1 || monthNum > 12) {
      return { isValid: false, error: 'Invalid month' };
    }
    return { isValid: true };
  },

  cvv: (cvv: string): ValidationResult => {
    if (!/^\d{3,4}$/.test(cvv)) {
      return { isValid: false, error: 'CVV must be 3-4 digits' };
    }
    return { isValid: true };
  },

  url: (url: string): ValidationResult => {
    try {
      new URL(url);
      return { isValid: true };
    } catch {
      return { isValid: false, error: 'Invalid URL' };
    }
  },
};

export const validateForm = (
  formData: Record<string, string>,
  schema: Record<string, (val: string) => ValidationResult>
): Record<string, string> => {
  const errors: Record<string, string> = {};

  for (const [field, validator] of Object.entries(schema)) {
    const result = validator(formData[field] || '');
    if (!result.isValid && result.error) {
      errors[field] = result.error;
    }
  }

  return errors;
};

export const showValidationAlert = (errors: Record<string, string>) => {
  const errorMessages = Object.values(errors).filter(Boolean);
  if (errorMessages.length > 0) {
    Alert.alert('Validation Error', errorMessages[0]);
    return false;
  }
  return true;
};
```

---

## API Service Pattern

### `services/api.ts`

```typescript
import { supabase } from '../utils/supabase';
import { AppError, handleSupabaseError, shouldRetry } from '../utils/errorHandler';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export class ApiService {
  private static async retryWithBackoff<T>(
    fn: () => Promise<T>,
    retries: number = MAX_RETRIES
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0 && shouldRetry(error)) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return this.retryWithBackoff(fn, retries - 1);
      }
      throw error;
    }
  }

  static async getProducts(filters?: any): Promise<Product[]> {
    try {
      return await this.retryWithBackoff(async () => {
        const { data, error } = await supabase
          .from('products')
          .select('*,users(id,full_name,university,profile_image_url)')
          .order('created_at', { ascending: false });

        if (error) throw handleSupabaseError(error);
        return data || [];
      });
    } catch (error: any) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  }

  static async getProduct(id: string): Promise<Product> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*,users(id,full_name,university,profile_image_url)')
        .eq('id', id)
        .single();

      if (error) throw handleSupabaseError(error);
      return data;
    } catch (error: any) {
      console.error('Failed to fetch product:', error);
      throw error;
    }
  }

  static async createListing(listing: CreateListingData): Promise<Product> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new AppError('AUTH_REQUIRED', 'User not authenticated', 401);

      const { data, error } = await supabase
        .from('products')
        .insert({
          user_id: user.id,
          ...listing,
        })
        .select()
        .single();

      if (error) throw handleSupabaseError(error);
      return data;
    } catch (error: any) {
      console.error('Failed to create listing:', error);
      throw error;
    }
  }
}
```

---

## Constants File

### `constants/Config.ts`

```typescript
export const CONFIG = {
  // Timeouts
  API_TIMEOUT: 30000,
  MESSAGE_BATCH_TIMEOUT: 300,
  IMAGE_UPLOAD_TIMEOUT: 60000,
  CACHE_DURATION: 3600000, // 1 hour

  // Limits
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_RETRIES: 3,
  MESSAGE_BATCH_SIZE: 10,
  PAGE_SIZE: 20,

  // Validation
  MIN_PASSWORD_LENGTH: 8,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 5000,

  // Features
  ENABLE_ANALYTICS: true,
  ENABLE_ERROR_TRACKING: true,
  ENABLE_OFFLINE_MODE: true,

  // API
  API_VERSION: 'v1',
  CACHE_ENABLED: true,
} as const;

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const CATEGORIES = ['Electronics', 'Fashion', 'Books', 'Services', 'Other'];
export const UNIVERSITIES = [
  'Fourah Bay College',
  'Njala University',
  'University of Sierra Leone',
  'Ernest Bai Koroma University',
];
```
