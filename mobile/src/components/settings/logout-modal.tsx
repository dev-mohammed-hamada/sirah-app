import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { AppText } from '../ui/app-text';
import { colors, radius, spacing } from '../../theme';
import { fontFamily } from '../../theme/typography';
import { ar } from '../../i18n/ar';

interface LogoutModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.4;

export function LogoutModal({ visible, onConfirm, onCancel }: LogoutModalProps) {
  const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          damping: 18,
          stiffness: 180,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: SHEET_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, backdropOpacity, translateY]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onCancel}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={onCancel}>
          <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]} />
        </TouchableWithoutFeedback>

        <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
          <View style={styles.handle} />

          <AppText style={styles.title} color={colors.deepNightBlue}>
            {ar.settings.logout}
          </AppText>

          <AppText style={styles.subtitle} color={colors.mutedGray}>
            {ar.settings.logoutConfirm}
          </AppText>

          <TouchableOpacity style={styles.logoutButton} onPress={onConfirm} activeOpacity={0.85}>
            <AppText style={styles.logoutButtonText} color={colors.starlightWhite}>
              {ar.settings.logout}
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onCancel} activeOpacity={0.85}>
            <AppText style={styles.cancelButtonText} color={colors.deepNightBlue}>
              {ar.settings.cancel}
            </AppText>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlayDark,
  },
  sheet: {
    height: SHEET_HEIGHT,
    backgroundColor: colors.starlightWhite,
    borderTopStartRadius: radius.lg,
    borderTopEndRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl,
    gap: spacing.md,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.mutedGrayLight,
    alignSelf: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  logoutButton: {
    height: 48,
    borderRadius: radius.sm,
    backgroundColor: colors.errorRed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
  },
  cancelButton: {
    height: 48,
    borderRadius: radius.sm,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.mutedGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
  },
});
