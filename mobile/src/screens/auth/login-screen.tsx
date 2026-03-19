import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radius } from '../../theme';
import { AppText, InputField, PrimaryButton, LoadingSpinner, Toast } from '../../components';
import { NarratorBubble } from '../../components/narrator/narrator-bubble';
import { useLogin } from '../../hooks/use-auth';
import type { AuthStackParamList } from '../../app/navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

interface FormErrors {
  username?: string;
  password?: string;
}

const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 5;

export function LoginScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(0);

  const loginMutation = useLogin();

  // Entrance animations
  const narratorOpacity = useSharedValue(0);
  const narratorTranslateY = useSharedValue(20);
  const formOpacity = useSharedValue(0);
  const formTranslateY = useSharedValue(20);
  const actionsOpacity = useSharedValue(0);

  // Error shake
  const formShakeX = useSharedValue(0);

  useEffect(() => {
    narratorOpacity.value = withDelay(200, withTiming(1, { duration: 300 }));
    narratorTranslateY.value = withDelay(200, withSpring(0, { damping: 15 }));
    formOpacity.value = withDelay(400, withTiming(1, { duration: 200 }));
    formTranslateY.value = withDelay(400, withSpring(0, { damping: 15 }));
    actionsOpacity.value = withDelay(600, withTiming(1, { duration: 200 }));
  }, []);

  // Lockout countdown timer
  useEffect(() => {
    if (!lockedUntil) return;

    const tick = () => {
      const remaining = Math.max(0, lockedUntil - Date.now());
      if (remaining <= 0) {
        setLockedUntil(null);
        setAttempts(0);
        setCountdown(0);
      } else {
        setCountdown(Math.ceil(remaining / 1000));
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [lockedUntil]);

  const isLocked = lockedUntil !== null && Date.now() < lockedUntil;

  const narratorStyle = useAnimatedStyle(() => ({
    opacity: narratorOpacity.value,
    transform: [{ translateY: narratorTranslateY.value }],
  }));

  const formStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{ translateY: formTranslateY.value }, { translateX: formShakeX.value }],
  }));

  const actionsStyle = useAnimatedStyle(() => ({
    opacity: actionsOpacity.value,
  }));

  const shakeForm = () => {
    formShakeX.value = withSequence(
      withTiming(10, { duration: 50 }),
      withTiming(-10, { duration: 50 }),
      withTiming(10, { duration: 50 }),
      withTiming(-10, { duration: 50 }),
      withTiming(5, { duration: 50 }),
      withTiming(0, { duration: 50 }),
    );
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!username.trim()) {
      newErrors.username = 'هذا الحقل مطلوب';
    }

    if (!password) {
      newErrors.password = 'هذا الحقل مطلوب';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (isLocked) return;
    if (!validate()) return;

    loginMutation.mutate(
      { username: username.trim(), password },
      {
        onError: () => {
          const newAttempts = attempts + 1;
          setAttempts(newAttempts);

          if (newAttempts >= MAX_ATTEMPTS) {
            setLockedUntil(Date.now() + LOCKOUT_DURATION);
            setToastMessage('محاولات كثيرة، حاول بعد ٥ دقائق');
          } else {
            setToastMessage('اسم المستخدم أو كلمة المرور غير صحيحة');
            setErrors({ username: ' ', password: ' ' });
            shakeForm();
          }

          setToastVisible(true);
        },
      },
    );
  };

  const formatCountdown = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Toast
        message={toastMessage}
        type="error"
        visible={toastVisible}
        onDismiss={() => setToastVisible(false)}
      />

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <AppText variant="h3" color={colors.deepNightBlue}>
            →
          </AppText>
        </Pressable>
        <AppText variant="h3" color={colors.deepNightBlue}>
          تسجيل الدخول
        </AppText>
        <View style={styles.backButton} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Narrator */}
          <Animated.View style={[styles.narratorSection, narratorStyle]}>
            <NarratorBubble text="أهلاً بعودتك!" typewriterSpeed={40} />
            <View style={styles.narratorSilhouette}>
              <AppText variant="h1" style={styles.centered}>
                🧕
              </AppText>
            </View>
          </Animated.View>

          {/* Form */}
          <Animated.View style={[styles.form, formStyle]}>
            <InputField
              label="اسم المستخدم"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              error={errors.username}
            />

            <InputField
              label="كلمة المرور"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              error={errors.password}
            />

            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <AppText variant="caption" color={colors.desertGold}>
                {showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
              </AppText>
            </Pressable>
          </Animated.View>

          {/* Actions */}
          <Animated.View style={[styles.actionsSection, actionsStyle]}>
            {loginMutation.isPending ? (
              <LoadingSpinner size={40} />
            ) : (
              <PrimaryButton
                title={isLocked ? `حاول بعد ${formatCountdown(countdown)}` : 'تسجيل الدخول'}
                onPress={handleLogin}
                disabled={isLocked}
              />
            )}

            <Pressable onPress={() => {}} style={styles.forgotPassword}>
              <AppText variant="caption" color={colors.mutedGray}>
                نسيت كلمة المرور؟
              </AppText>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('SignUp')} style={styles.footerLink}>
              <AppText variant="body" color={colors.mutedGray}>
                ليس لديك حساب؟{' '}
              </AppText>
              <AppText variant="body" color={colors.desertGold}>
                أنشئ حساباً جديداً
              </AppText>
            </Pressable>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.softCream,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  narratorSection: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  narratorSilhouette: {
    marginTop: spacing.md,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    textAlign: 'center',
  },
  form: {
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  actionsSection: {
    gap: spacing.lg,
    alignItems: 'center',
  },
  forgotPassword: {
    alignSelf: 'center',
  },
  footerLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
});
