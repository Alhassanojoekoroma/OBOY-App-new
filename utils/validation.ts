/**
 * Validation Utilities
 * Input validation and error handling
 */

import { ValidationResult } from '../types';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Strong password: 8+ chars, 1 uppercase, 1 lowercase, 1 number
const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export class Validator {
  /**
   * Validate email format
   */
  static email(email: string): ValidationResult {
    if (!email || !email.trim()) {
      return { isValid: false, error: 'Email is required' };
    }
    if (!EMAIL_REGEX.test(email)) {
      return { isValid: false, error: 'Invalid email format' };
    }
    return { isValid: true };
  }

  /**
   * Validate password strength
   */
  static password(password: string): ValidationResult {
    if (!password) {
      return { isValid: false, error: 'Password is required' };
    }
    if (password.length < 8) {
      return { isValid: false, error: 'Password must be at least 8 characters' };
    }
    if (!/[A-Z]/.test(password)) {
      return { isValid: false, error: 'Password must contain uppercase letter' };
    }
    if (!/[a-z]/.test(password)) {
      return { isValid: false, error: 'Password must contain lowercase letter' };
    }
    if (!/[0-9]/.test(password)) {
      return { isValid: false, error: 'Password must contain number' };
    }
    return { isValid: true };
  }

  /**
   * Validate full name
   */
  static fullName(name: string): ValidationResult {
    if (!name || !name.trim()) {
      return { isValid: false, error: 'Full name is required' };
    }
    if (name.trim().length < 2) {
      return { isValid: false, error: 'Name must be at least 2 characters' };
    }
    return { isValid: true };
  }

  /**
   * Validate university selection
   */
  static university(university: string): ValidationResult {
    if (!university || !university.trim()) {
      return { isValid: false, error: 'University is required' };
    }
    return { isValid: true };
  }

  /**
   * Validate product title
   */
  static productTitle(title: string): ValidationResult {
    if (!title || !title.trim()) {
      return { isValid: false, error: 'Product title is required' };
    }
    if (title.trim().length < 3) {
      return { isValid: false, error: 'Title must be at least 3 characters' };
    }
    if (title.trim().length > 100) {
      return { isValid: false, error: 'Title must be less than 100 characters' };
    }
    return { isValid: true };
  }

  /**
   * Validate product description
   */
  static description(desc: string): ValidationResult {
    if (!desc || !desc.trim()) {
      return { isValid: false, error: 'Description is required' };
    }
    if (desc.trim().length < 10) {
      return { isValid: false, error: 'Description must be at least 10 characters' };
    }
    return { isValid: true };
  }

  /**
   * Validate price
   */
  static price(price: string | number): ValidationResult {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    
    if (isNaN(numPrice) || numPrice < 0) {
      return { isValid: false, error: 'Price must be a valid positive number' };
    }
    if (numPrice > 1000000) {
      return { isValid: false, error: 'Price seems too high. Please check.' };
    }
    return { isValid: true };
  }

  /**
   * Validate category selection
   */
  static category(category: string): ValidationResult {
    if (!category || !category.trim()) {
      return { isValid: false, error: 'Category is required' };
    }
    return { isValid: true };
  }

  /**
   * Validate message content
   */
  static message(msg: string): ValidationResult {
    if (!msg || !msg.trim()) {
      return { isValid: false, error: 'Message cannot be empty' };
    }
    if (msg.trim().length > 5000) {
      return { isValid: false, error: 'Message is too long' };
    }
    return { isValid: true };
  }

  /**
   * Validate login form
   */
  static loginForm(email: string, password: string): ValidationResult {
    const emailCheck = this.email(email);
    if (!emailCheck.isValid) {
      return emailCheck;
    }

    if (!password) {
      return { isValid: false, error: 'Password is required' };
    }

    return { isValid: true };
  }

  /**
   * Validate signup form
   */
  static signupForm(
    fullName: string,
    email: string,
    password: string,
    university: string
  ): ValidationResult {
    const nameCheck = this.fullName(fullName);
    if (!nameCheck.isValid) return nameCheck;

    const emailCheck = this.email(email);
    if (!emailCheck.isValid) return emailCheck;

    const passwordCheck = this.password(password);
    if (!passwordCheck.isValid) return passwordCheck;

    const uniCheck = this.university(university);
    if (!uniCheck.isValid) return uniCheck;

    return { isValid: true };
  }
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/[<>]/g, '')
    .trim();
}

/**
 * Format error message for user display
 */
export function formatErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as any).message);
  }
  return 'An unexpected error occurred';
}

/**
 * Check if error is network-related
 */
export function isNetworkError(error: unknown): boolean {
  if (!error) return false;
  const errorStr = String(error).toLowerCase();
  return (
    errorStr.includes('network') ||
    errorStr.includes('timeout') ||
    errorStr.includes('offline') ||
    errorStr.includes('connection')
  );
}
