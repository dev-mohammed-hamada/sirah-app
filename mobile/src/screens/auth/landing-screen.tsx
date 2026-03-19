import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radius, shadows } from '../../theme';
import { AppText, PrimaryButton, SecondaryButton } from '../../components';
import type { AuthStackParamList } from '../../app/navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Landing'>;

export function LandingScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  const cardTranslateY = useSharedValue(300);
  const welcomeOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);
  const primaryOpacity = useSharedValue(0);
  const primaryTranslateY = useSharedValue(20);
  const secondaryOpacity = useSharedValue(0);
  const secondaryTranslateY = useSharedValue(20);
  const termsOpacity = useSharedValue(0);

  useEffect(() => {
    cardTranslateY.value = withTiming(0, { duration: 400 });
    welcomeOpacity.value = withDelay(200, withTiming(1, { duration: 200 }));
    subtitleOpacity.value = withDelay(300, withTiming(1, { duration: 200 }));
    primaryOpacity.value = withDelay(400, withTiming(1, { duration: 200 }));
    primaryTranslateY.value = withDelay(400, withSpring(0, { damping: 15 }));
    secondaryOpacity.value = withDelay(500, withTiming(1, { duration: 200 }));
    secondaryTranslateY.value = withDelay(500, withSpring(0, { damping: 15 }));
    termsOpacity.value = withDelay(600, withTiming(1, { duration: 200 }));
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: cardTranslateY.value }],
  }));
  const welcomeStyle = useAnimatedStyle(() => ({ opacity: welcomeOpacity.value }));
  const subtitleStyle = useAnimatedStyle(() => ({ opacity: subtitleOpacity.value }));
  const primaryStyle = useAnimatedStyle(() => ({
    opacity: primaryOpacity.value,
    transform: [{ translateY: primaryTranslateY.value }],
  }));
  const secondaryStyle = useAnimatedStyle(() => ({
    opacity: secondaryOpacity.value,
    transform: [{ translateY: secondaryTranslateY.value }],
  }));
  const termsStyle = useAnimatedStyle(() => ({ opacity: termsOpacity.value }));

  return (
    <View style={styles.container}>
      {/* Top: Night sky with logo */}
      <LinearGradient colors={['#1A2744', '#4A2D6B']} style={styles.topSection}>
        <View style={[styles.logoContainer, { paddingTop: insets.top + spacing.xl }]}>
          <AppText variant="h2" color={colors.starlightWhite}>
            سيرة النبي ﷺ
          </AppText>
        </View>
      </LinearGradient>

      {/* Bottom: Cream card */}
      <Animated.View style={[styles.card, cardStyle]}>
        <Animated.View style={welcomeStyle}>
          <AppText variant="h2" color={colors.deepNightBlue} style={styles.centered}>
            أهلاً بك يا بطلي
          </AppText>
        </Animated.View>

        <Animated.View style={subtitleStyle}>
          <AppText variant="bodyLarge" color={colors.mutedGray} style={styles.centered}>
            سجّل حسابك وابدأ الرحلة
          </AppText>
        </Animated.View>

        <View style={styles.buttonsContainer}>
          <Animated.View style={primaryStyle}>
            <PrimaryButton title="إنشاء حساب جديد" onPress={() => navigation.navigate('SignUp')} />
          </Animated.View>

          <Animated.View style={secondaryStyle}>
            <SecondaryButton title="تسجيل الدخول" onPress={() => navigation.navigate('Login')} />
          </Animated.View>
        </View>

        <Animated.View style={[termsStyle, styles.termsContainer]}>
          <AppText variant="caption" color={colors.mutedGray} style={styles.centered}>
            بالمتابعة، أنت توافق على شروط الاستخدام وسياسة الخصوصية
          </AppText>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.deepNightBlue,
  },
  topSection: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  card: {
    flex: 0.6,
    backgroundColor: colors.softCream,
    borderTopStartRadius: radius.lg,
    borderTopEndRadius: radius.lg,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxl,
    ...shadows.medium,
  },
  centered: {
    textAlign: 'center',
  },
  buttonsContainer: {
    marginTop: spacing.xxxl,
    gap: spacing.lg,
  },
  termsContainer: {
    marginTop: spacing.xxl,
  },
});
