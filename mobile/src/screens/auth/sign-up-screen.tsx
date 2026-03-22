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
import { colors, spacing, radius } from '../../theme';
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

/** Decorative mini bars inside role card */
function RoleMini({ variant }: { variant: 'son' | 'father' }) {
  const barColor = variant === 'son' ? colors.desertGoldGlow : colors.deepNightBlueBg;
  const bg = variant === 'son' ? colors.desertGoldGlowFaint : colors.deepNightBlueFaint;

  return (
    <View style={[styles.roleMini, { backgroundColor: bg }]}>
      <View style={[styles.miniBar, { backgroundColor: barColor, width: 20 }]} />
      <View style={[styles.miniBar, { backgroundColor: barColor, width: 14 }]} />
      <View style={[styles.miniBar, { backgroundColor: barColor, width: 18 }]} />
    </View>
  );
}

function RoleCard({
  role,
  label,
  selected,
  onPress,
}: {
  role: Role;
  label: string;
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
    scale.value = withSpring(0.97, { damping: 15 });
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 15 });
      }}
      style={[styles.roleCard, selected && styles.roleCardSelected, animatedStyle]}
    >
      {/* Checkmark badge (top-right in RTL = top-start) */}
      {selected && (
        <Animated.View style={styles.checkmark}>
          <AppText
            variant="caption"
            color={colors.white}
            style={{ fontSize: 12, fontWeight: '700' }}
          >
            ✓
          </AppText>
        </Animated.View>
      )}

      {/* Icon area — faceless silhouette placeholder */}
      <View style={styles.roleIconArea}>
        <View
          style={[
            styles.roleIconCircle,
            {
              backgroundColor:
                role === 'FATHER' ? colors.deepNightBlueSubtle : colors.desertGoldGlowLight,
            },
          ]}
        >
          <View style={styles.roleIconHead} />
          <View style={styles.roleIconBody} />
        </View>
      </View>

      {/* Decorative mini bars */}
      <RoleMini variant={role === 'SON' ? 'son' : 'father'} />

      {/* Label */}
      <AppText variant="bodyLarge" color={colors.deepNightBlue} style={styles.roleLabelText}>
        {label}
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

  const usernameValid =
    debouncedUsername.length >= 3 && !errors.username && usernameAvailable === true;

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
              selected={role === 'SON'}
              onPress={() => setRole('SON')}
            />
            <RoleCard
              role="FATHER"
              label="أب"
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
                valid={usernameValid}
                icon={
                  debouncedUsername.length >= 3 ? (
                    checkingUsername ? (
                      <LoadingSpinner size={16} />
                    ) : usernameAvailable ? (
                      <AppText variant="body" color={colors.successGreen}>
                        ✓
                      </AppText>
                    ) : usernameAvailable === false ? (
                      <AppText variant="body" color={colors.errorRed}>
                        ✗
                      </AppText>
                    ) : null
                  ) : undefined
                }
              />
            </View>

            <InputField
              label="كلمة المرور"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              error={errors.password}
              icon={
                <AppText variant="body" color={colors.mutedGray}>
                  👁️
                </AppText>
              }
              onIconPress={() => setShowPassword(!showPassword)}
            />

            <InputField
              label="تأكيد كلمة المرور"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showPassword}
              error={errors.confirmPassword}
              icon={
                <AppText variant="body" color={colors.mutedGray}>
                  👁️
                </AppText>
              }
              onIconPress={() => setShowPassword(!showPassword)}
            />
          </View>

          {/* Submit */}
          <View style={styles.submitSection}>
            {registerMutation.isPending ? (
              <LoadingSpinner size={40} />
            ) : (
              <PrimaryButton title="إنشاء الحساب" onPress={handleSignUp} />
            )}

            <View style={styles.footerLink}>
              <AppText variant="body" color={colors.mutedGray}>
                لديك حساب بالفعل؟{' '}
              </AppText>
              <Pressable onPress={() => navigation.navigate('Login')}>
                <AppText variant="body" color={colors.desertGold} style={{ fontWeight: '600' }}>
                  سجّل دخولك
                </AppText>
              </Pressable>
            </View>
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
    paddingVertical: spacing.sm,
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
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.borderGray,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    position: 'relative',
  },
  roleCardSelected: {
    borderWidth: 3,
    borderColor: colors.desertGold,
    shadowColor: colors.desertGold,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    end: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.desertGold,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  roleIconArea: {
    marginBottom: spacing.sm,
  },
  roleIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleIconHead: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.deepNightBlue,
    opacity: 0.3,
    marginBottom: -4,
    zIndex: 1,
  },
  roleIconBody: {
    width: 24,
    height: 20,
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    borderBottomStartRadius: 6,
    borderBottomEndRadius: 6,
    backgroundColor: colors.deepNightBlue,
    opacity: 0.3,
  },
  roleMini: {
    width: 60,
    height: 30,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
    marginVertical: spacing.sm,
  },
  miniBar: {
    height: 3,
    borderRadius: 1.5,
  },
  roleLabelText: {
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  form: {
    gap: 0,
  },
  submitSection: {
    marginTop: spacing.xxl,
    gap: spacing.lg,
    alignItems: 'center',
  },
  footerLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
  },
});
