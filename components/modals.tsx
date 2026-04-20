import React, { ReactNode } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  GestureResponderEvent,
} from 'react-native';
import { X, CheckCircle2, AlertCircle, Lock } from 'lucide-react-native';
import Colors from '../constants/Colors';

const { height } = Dimensions.get('window');

interface SimpleAlertProps {
  visible: boolean;
  title: string;
  message: string;
  icon?: ReactNode;
  buttonText?: string;
  onPress: () => void;
  onDismiss: () => void;
}

/**
 * Simple Alert Modal
 * Single action button, icon, title, and message
 * Use for: low storage, session expired, error messages, info alerts
 */
export const SimpleAlert: React.FC<SimpleAlertProps> = ({
  visible,
  title,
  message,
  icon,
  buttonText = 'Got it',
  onPress,
  onDismiss,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeButton} onPress={onDismiss}>
            <X size={24} color={Colors.onSurface} />
          </TouchableOpacity>

          <View style={styles.content}>
            {icon && <View style={styles.iconContainer}>{icon}</View>}

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>

            <TouchableOpacity
              style={styles.fullWidthButton}
              onPress={onPress}
              activeOpacity={0.7}
            >
              <Text style={styles.fullWidthButtonText}>{buttonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

interface MultiActionAlertProps {
  visible: boolean;
  title: string;
  message: string;
  icon?: ReactNode;
  buttons: {
    label: string;
    onPress: () => void;
    type?: 'neutral' | 'danger' | 'success';
  }[];
  onDismiss: () => void;
}

/**
 * Multi-Action Alert Modal
 * Multiple action buttons with different styles
 * Use for: permissions, confirmations with choices, complex decisions
 */
export const MultiActionAlert: React.FC<MultiActionAlertProps> = ({
  visible,
  title,
  message,
  icon,
  buttons,
  onDismiss,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeButton} onPress={onDismiss}>
            <X size={24} color={Colors.onSurface} />
          </TouchableOpacity>

          <View style={styles.content}>
            {icon && <View style={styles.iconContainer}>{icon}</View>}

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>

            <View style={styles.buttonGroup}>
              {buttons.map((button, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.actionButton,
                    button.type === 'danger' && styles.dangerButton,
                    button.type === 'success' && styles.successButton,
                  ]}
                  onPress={button.onPress}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.actionButtonText,
                      button.type === 'danger' && styles.dangerButtonText,
                      button.type === 'success' && styles.successButtonText,
                    ]}
                  >
                    {button.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

interface PermissionModalProps {
  visible: boolean;
  title: string;
  message: string;
  icon?: ReactNode;
  onAllow: () => void;
  onDeny: () => void;
  onDismiss: () => void;
}

/**
 * Permission Request Modal
 * Centered design with Allow/Don't Allow buttons
 * Use for: camera, notifications, location, microphone permissions
 */
export const PermissionModal: React.FC<PermissionModalProps> = ({
  visible,
  title,
  message,
  icon,
  onAllow,
  onDeny,
  onDismiss,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.centeredContent}>
            {icon && <View style={styles.largeIconContainer}>{icon}</View>}

            <Text style={styles.centeredTitle}>{title}</Text>
            <Text style={styles.centeredMessage}>{message}</Text>

            <View style={styles.permissionButtonGroup}>
              <TouchableOpacity
                style={styles.outlinedButton}
                onPress={onDeny}
                activeOpacity={0.7}
              >
                <Text style={styles.outlinedButtonText}>Don't Allow</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.filledButton}
                onPress={onAllow}
                activeOpacity={0.7}
              >
                <Text style={styles.filledButtonText}>Allow</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

interface DestructiveConfirmProps {
  visible: boolean;
  title: string;
  message: string;
  icon?: ReactNode;
  itemName?: string;
  destructiveText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  onDismiss: () => void;
}

/**
 * Destructive Confirmation Modal
 * Warning confirmation for irreversible actions
 * Use for: delete item, remove listing, cancel order, dangerous operations
 */
export const DestructiveConfirm: React.FC<DestructiveConfirmProps> = ({
  visible,
  title,
  message,
  icon,
  onConfirm,
  onCancel,
  onDismiss,
  destructiveText = 'Delete',
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.centeredContent}>
            {icon && (
              <View
                style={[
                  styles.largeIconContainer,
                  { backgroundColor: 'rgba(255, 82, 82, 0.1)' },
                ]}
              >
                {icon}
              </View>
            )}

            <Text style={styles.centeredTitle}>{title}</Text>
            <Text style={styles.centeredMessage}>{message}</Text>

            <View style={styles.destructiveButtonGroup}>
              <TouchableOpacity
                style={styles.outlinedButton}
                onPress={onCancel}
                activeOpacity={0.7}
              >
                <Text style={styles.outlinedButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.filledButton, styles.dangerFilledButton]}
                onPress={onConfirm}
                activeOpacity={0.7}
              >
                <Text style={styles.dangerFilledButtonText}>{destructiveText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    width: '85%',
    maxHeight: height * 0.8,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  content: {
    padding: 24,
    paddingTop: 40,
  },
  centeredContent: {
    padding: 24,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 16,
  },
  largeIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(123, 47, 255, 0.1)',
  },
  title: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
    marginBottom: 12,
  },
  centeredTitle: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: Colors.onSurface,
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: Colors.onSurfaceVariant,
    lineHeight: 20,
    marginBottom: 24,
  },
  centeredMessage: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: Colors.onSurfaceVariant,
    lineHeight: 20,
    marginBottom: 24,
    textAlign: 'center',
  },
  fullWidthButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  fullWidthButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: Colors.surfaceContainerLow,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.outline,
  },
  actionButtonText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: Colors.onSurface,
  },
  dangerButton: {
    backgroundColor: 'rgba(255, 82, 82, 0.1)',
    borderColor: Colors.error,
  },
  dangerButtonText: {
    color: Colors.error,
  },
  successButton: {
    backgroundColor: 'rgba(6, 214, 160, 0.1)',
    borderColor: '#06D6A0',
  },
  successButtonText: {
    color: '#06D6A0',
  },
  permissionButtonGroup: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  destructiveButtonGroup: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  outlinedButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.outline,
    alignItems: 'center',
  },
  outlinedButtonText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: Colors.onSurface,
  },
  filledButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  filledButtonText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: '#fff',
  },
  dangerFilledButton: {
    backgroundColor: Colors.error,
  },
  dangerFilledButtonText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: '#fff',
  },
});

export default {
  SimpleAlert,
  MultiActionAlert,
  PermissionModal,
  DestructiveConfirm,
};
