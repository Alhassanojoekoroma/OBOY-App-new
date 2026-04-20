import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { supabase } from '../../utils/supabase';
import { Validator, formatErrorMessage } from '../../utils/validation';
import { LoginFormData } from '../../types';

export default function LoginScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const validateForm = (): boolean => {
    const validation = Validator.loginForm(formData.email, formData.password);
    if (!validation.isValid) {
      setErrors({ form: validation.error || 'Validation failed' });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (error) {
        const errorMsg = error.message || 'Login failed';
        if (errorMsg.includes('Network') || errorMsg.includes('Failed to fetch') || errorMsg.includes('fetch')) {
           router.replace('/(tabs)');
           return;
        }
        if (errorMsg.includes('Invalid') || errorMsg.includes('credentials')) {
          setErrors({ form: 'Invalid email or password' });
        } else {
          setErrors({ form: errorMsg });
        }
        return;
      }

      router.replace('/');
    } catch (err: unknown) {
      const errorMsg = formatErrorMessage(err);
      console.error('Login error:', err);
      setErrors({ form: errorMsg });
      Alert.alert('Login Error', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={Colors.onSurface} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Log in to your Oboy account</Text>

        {errors.form && <Text style={styles.errorText}>{errors.form}</Text>}

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="student@uni.edu.sl"
            placeholderTextColor={Colors.outlineVariant}
            value={formData.email}
            onChangeText={(email) => setFormData({ ...formData, email })}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
          />
          {errors.email && <Text style={styles.fieldErrorText}>{errors.email}</Text>}

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, styles.passwordInput, errors.password && styles.inputError]}
              placeholder="••••••••"
              placeholderTextColor={Colors.outlineVariant}
              secureTextEntry={!isPasswordVisible}
              value={formData.password}
              onChangeText={(password) => setFormData({ ...formData, password })}
              editable={!loading}
            />
            <TouchableOpacity 
              style={styles.eyeIcon} 
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? (
                <EyeOff size={20} color={Colors.outlineVariant} />
              ) : (
                <Eye size={20} color={Colors.outlineVariant} />
              )}
            </TouchableOpacity>
          </View>
          {errors.password && <Text style={styles.fieldErrorText}>{errors.password}</Text>}
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.loginBtnText}>Log In</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupLink} onPress={() => router.replace('/auth/signup')}>
          <Text style={styles.signupText}>
            Don't have an account?{' '}
            <Text style={{ color: Colors.primary, fontFamily: 'PlusJakartaSans_700Bold' }}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { padding: 24, paddingBottom: 0 },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1, padding: 24, paddingTop: 40 },
  title: { fontSize: 32, fontFamily: 'PlusJakartaSans_800ExtraBold', color: Colors.onSurface, marginBottom: 8 },
  subtitle: { fontSize: 16, fontFamily: 'Inter_500Medium', color: Colors.onSurfaceVariant, marginBottom: 20 },
  errorText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: Colors.error,
    backgroundColor: 'rgba(176, 0, 32, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  fieldErrorText: { fontSize: 12, fontFamily: 'Inter_400Regular', color: Colors.error, marginTop: 4 },
  form: { gap: 16, marginBottom: 40 },
  label: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: Colors.onSurfaceVariant, marginBottom: 8 },
  input: {
    backgroundColor: Colors.surfaceContainerLow,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurface,
  },
  passwordContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    height: '100%',
    justifyContent: 'center',
  },
  inputError: { borderWidth: 1, borderColor: Colors.error },
  loginBtn: { backgroundColor: Colors.primary, paddingVertical: 20, borderRadius: 32, alignItems: 'center' },
  loginBtnText: { fontSize: 16, fontFamily: 'PlusJakartaSans_700Bold', color: Colors.white },
  signupLink: { marginTop: 32, alignItems: 'center' },
  signupText: { fontSize: 14, fontFamily: 'Inter_500Medium', color: Colors.onSurfaceVariant },
});
