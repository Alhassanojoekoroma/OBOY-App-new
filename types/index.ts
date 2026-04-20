/**
 * Global Type Definitions for OBOY App
 * Strict TypeScript interfaces for all entities
 */

// ==================== USER TYPES ====================
export interface User {
  id: string;
  full_name: string;
  email: string;
  university: string;
  profile_image_url?: string;
  isSeller?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  user_metadata?: Record<string, any>;
}

// ==================== PRODUCT TYPES ====================
export interface Product {
  id: string;
  title: string;
  description?: string;
  category: string;
  price: number;
  image_url: string;
  user_id: string;
  users?: User;
  created_at?: string;
  updated_at?: string;
}

export interface CreateProductInput {
  title: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
}

// ==================== MESSAGE TYPES ====================
export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  product_id?: string;
  chat_id: string;
  created_at?: string;
  timestamp?: string;
}

export interface Conversation {
  id: string;
  sender_id: string;
  receiver_id: string;
  message?: string;
  timestamp?: string;
  products?: Product;
  sender?: User;
  receiver?: User;
}

// ==================== CART/BASKET TYPES ====================
export interface CartItem {
  id: string;
  title: string;
  price: string | number;
  qty: number;
  image: string;
}

export interface Basket {
  items: CartItem[];
  total: number;
}

// ==================== INVOICE TYPES ====================
export interface Invoice {
  id: string;
  invoice_number: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  created_at?: string;
  due_date?: string;
  sender_id: string;
  receiver_id: string;
  description?: string;
}

// ==================== SELLER TYPES ====================
export interface SellerStats {
  activeListings: number;
  inquiries: number;
  successfulHandovers: number;
  totalRevenue: number;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  quantity?: string;
  location?: string;
  image: string;
  seller_id: string;
  created_at?: string;
}

// ==================== FILTER TYPES ====================
export interface FilterOptions {
  selectedSort: 'popular' | 'recent' | 'price-low' | 'price-high';
  selectedCampus: string;
  selectedCategory: string;
  priceRange?: { min: number; max: number };
}

// ==================== ERROR TYPES ====================
export interface AppError {
  code: string;
  message: string;
  details?: unknown;
}

export class APIError extends Error {
  constructor(
    public code: string,
    public statusCode: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// ==================== RESPONSE TYPES ====================
export interface ApiResponse<T> {
  data?: T;
  error?: AppError;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ==================== ROUTE PARAMS ====================
export interface DetailScreenParams {
  id: string;
}

export interface ChatScreenParams {
  chatId: string;
}

export interface InvoiceScreenParams {
  id: string;
}

// ==================== VALIDATION RESULT ====================
export interface ValidationResult {
  isValid: boolean;
  error?: string;
  errors?: Record<string, string>;
}

// ==================== POST FORM TYPES ====================
export interface PostFormData {
  imageUri: string | null;
  title: string;
  description: string;
  price: string;
  category: string;
}

// ==================== AUTH FORM TYPES ====================
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  university: string;
}
