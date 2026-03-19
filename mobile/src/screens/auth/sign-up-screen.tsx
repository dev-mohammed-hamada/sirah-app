import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radius, shadows } from '../../theme';
import { AppText, InputField, PrimaryButton, LoadingSpinner, Toast } from '../../components';
import { useRegister, useCheckUsername } from '../../hooks/use-auth';
import { useDebounce } from '../../hooks/use-debounce';
import type { AuthStackParamList } from '../../app/navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;

type Role = 'SON' | 'FATHER';

interface FormErrors {
  displayName?: string;
  age?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function RoleCard({
  role,
  label,
  description,
  selected,
  onPress,
}: {
  role: Role;
  label: string;
  description: string;
  selected: boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(1, { damping: 15 });
    onPress();
  };

  const handlePressIn = () => {
    scale.value = withSpring(1.03, { damping: 15 });
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      style={[styles.roleCard, selected && styles.roleCardSelected, animatedStyle]}
    >
      {selected && (
        <View style={styles.checkmark}>
          <AppText variant="caption" color={colors.starlightWhite}>
            ✓
          </AppText>
        </View>
      )}
      <AppText
        variant="h3"
        color={selected ? colors.desertGold : colors.deepNightBlue}
        style={styles.centered}
      >
        {role === 'SON' ? '🌙' : '⭐'}
      </AppText>
      <AppText
        variant="bodyLarge"
        color={selected ? colors.desertGold : colors.deepNightBlue}
        style={[styles.centered, styles.roleLabel]}
      >
        {label}
      </AppText>
      <AppText variant="caption" color={colors.mutedGray} style={styles.centered}>
        {description}
      </AppText>
    </AnimatedPressable>
  );
}

export function SignUpScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [role, setRole] = useState<Role>('SON');
  const [displayName, setDisplayName] = useState('');
  const [age, setAge] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const debouncedUsername = useDebounce(username, 500);
  const { data: usernameAvailable, isLoading: checkingUsername } =
    useCheckUsername(debouncedUsername);
  const registerMutation = useRegister();

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!displayName.trim() || displayName.trim().length < 2) {
      newErrors.displayName = 'الاسم مطلوب (حرفان على الأقل)';
    }

    if (role === 'SON') {
      const ageNum = parseInt(age, 10);
      if (!age || isNaN(ageNum) || ageNum < 6 || ageNum > 14) {
        newErrors.age = 'العمر يجب أن يكون بين ٦ و ١٤';
      }
    }

    if (!username.trim() || username.trim().length < 3) {
      newErrors.username = 'اسم المستخدم مطلوب (٣ أحرف على الأقل)';
    } else if (usernameAvailable === false) {
      newErrors.username = 'اسم المستخدم مستخدم بالفعل';
    }

    if (!password || password.length < 8) {
      newErrors.password = 'كلمة المرور يجب أن تكون ٨ أحرف على الأقل';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'كلمتا المرور غير متطابقتين';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (!validate()) return;

    registerMutation.mutate(
      {
        displayName: displayName.trim(),
        username: username.trim(),
        password,
        accountType: role,
        age: role === 'SON' ? parseInt(age, 10) : undefined,
      },
      {
        onError: () => {
          setToastMessage('حدث خطأ، حاول مرة أخرى');
          setToastVisible(true);
        },
      },
    );
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
          إنشاء حساب
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
          {/* Role Selection */}
          <View style={styles.roleContainer}>
            <RoleCard
              role="SON"
              label="ابن"
              description="أتعلم السيرة النبوية بطريقة ممتعة"
              selected={role === 'SON'}
              onPress={() => setRole('SON')}
            />
            <RoleCard
              role="FATHER"
              label="أب"
              description="أتابع تقدم أبنائي في التعلم"
              selected={role === 'FATHER'}
              onPress={() => setRole('FATHER')}
            />
          </View>

          {/* Form */}
          <View style={styles.form}>
            <InputField
              label="الاسم"
              value={displayName}
              onChangeText={setDisplayName}
              error={errors.displayName}
            />

            {role === 'SON' && (
              <InputField
                label="العمر"
                value={age}
                onChangeText={setAge}
                keyboardType="number-pad"
                error={errors.age}
              />
            )}

            <View>
              <InputField
                label="اسم المستخدم"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                error={errors.username}
              />
              {debouncedUsername.length >= 3 && !errors.username && (
                <View style={styles.usernameStatus}>
                  {checkingUsername ? (
                    <LoadingSpinner size={16} />
                  ) : usernameAvailable ? (
                    <AppText variant="caption" color={colors.successGreen}>
                      ✓ متاح
                    </AppText>
                  ) : usernameAvailable === false ? (
                    <AppText variant="caption" color={colors.errorRed}>
                      ✗ مستخدم
                    </AppText>
                  ) : null}
                </View>
              )}
            </View>

            <InputField
              label="كلمة المرور"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              error={errors.password}
            />

            <InputField
              label="تأكيد كلمة المرور"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showPassword}
              error={errors.confirmPassword}
            />

            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <AppText variant="caption" color={colors.desertGold}>
                {showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
              </AppText>
            </Pressable>
          </View>

          {/* Submit */}
          <View style={styles.submitSection}>
            {registerMutation.isPending ? (
              <LoadingSpinner size={40} />
            ) : (
              <PrimaryButton title="إنشاء الحساب" onPress={handleSignUp} />
            )}

            <Pressable onPress={() => navigation.navigate('Login')} style={styles.footerLink}>
              <AppText variant="body" color={colors.mutedGray}>
                لديك حساب بالفعل؟{' '}
              </AppText>
              <AppText variant="body" color={colors.desertGold}>
                سجّل دخولك
              </AppText>
            </Pressable>
          </View>
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
  roleContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  roleCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: '#E0D5C5',
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
    ...shadows.soft,
  },
  roleCardSelected: {
    borderWidth: 3,
    borderColor: colors.desertGold,
    shadowColor: colors.desertGold,
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  checkmark: {
    position: 'absolute',
    top: spacing.sm,
    start: spacing.sm,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.desertGold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleLabel: {
    fontWeight: '700',
  },
  centered: {
    textAlign: 'center',
  },
  form: {
    gap: spacing.xs,
  },
  usernameStatus: {
    position: 'absolute',
    start: spacing.sm,
    top: spacing.lg,
  },
  submitSection: {
    marginTop: spacing.xxl,
    gap: spacing.lg,
    alignItems: 'center',
  },
  footerLink: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
