import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radius } from '../../theme';
import { AppText, PrimaryButton, SecondaryButton } from '../../components';
import { NarratorSilhouette } from '../../components/narrator/narrator-silhouette';
import type { AuthStackParamList } from '../../app/navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Landing'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/** Individual twinkling star dot */
function StarDot({
  top,
  start,
  size,
  delay,
}: {
  top: number;
  start: number;
  size: number;
  delay: number;
}) {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }), -1, true),
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          top,
          start,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.white,
        },
        style,
      ]}
    />
  );
}

/** Campfire flame element */
function Campfire() {
  const flameScale = useSharedValue(1);

  useEffect(() => {
    flameScale.value = withRepeat(
      withTiming(1.05, { duration: 500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, []);

  const flameStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: flameScale.value }, { scaleX: 2 - flameScale.value }],
  }));

  return (
    <View style={styles.campfire}>
      {/* Glow */}
      <View style={styles.flameGlow} />
      {/* Flame */}
      <Animated.View style={[styles.flame, flameStyle]} />
      {/* Inner flame */}
      <View style={styles.flameInner} />
      {/* Logs */}
      <View style={styles.logs}>
        <View style={[styles.log, { transform: [{ rotate: '-15deg' }] }]} />
        <View style={styles.log} />
        <View style={[styles.log, { transform: [{ rotate: '15deg' }] }]} />
      </View>
    </View>
  );
}

/** Desert dunes SVG */
function Dunes() {
  return (
    <View style={styles.dunesContainer}>
      <Svg width={SCREEN_WIDTH * 1.2} height={40} viewBox="0 0 400 40">
        <Path d="M0,40 C80,15 160,30 240,20 C320,10 380,25 400,40 Z" fill="rgba(212,168,67,0.15)" />
      </Svg>
    </View>
  );
}

// Star positions for the night sky
const STARS = [
  { top: 20, start: 30, size: 2, delay: 0 },
  { top: 40, start: 120, size: 3, delay: 800 },
  { top: 15, start: 200, size: 2, delay: 400 },
  { top: 55, start: 260, size: 3, delay: 1200 },
  { top: 30, start: 320, size: 2, delay: 600 },
  { top: 70, start: 60, size: 2, delay: 1000 },
  { top: 10, start: 150, size: 3, delay: 200 },
  { top: 50, start: 180, size: 2, delay: 1400 },
];

export function LandingScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  // Entrance animations
  const cardTranslateY = useSharedValue(40);
  const cardOpacity = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.8);
  const welcomeOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);
  const buttonsOpacity = useSharedValue(0);
  const buttonsTranslateY = useSharedValue(20);
  const termsOpacity = useSharedValue(0);

  useEffect(() => {
    // Logo entrance
    logoOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));
    logoScale.value = withDelay(300, withSpring(1, { damping: 15 }));
    // Card slide up
    cardTranslateY.value = withDelay(200, withTiming(0, { duration: 400 }));
    cardOpacity.value = withDelay(200, withTiming(1, { duration: 400 }));
    // Card content stagger
    welcomeOpacity.value = withDelay(500, withTiming(1, { duration: 300 }));
    subtitleOpacity.value = withDelay(600, withTiming(1, { duration: 300 }));
    buttonsOpacity.value = withDelay(700, withTiming(1, { duration: 300 }));
    buttonsTranslateY.value = withDelay(700, withSpring(0, { damping: 15 }));
    termsOpacity.value = withDelay(900, withTiming(1, { duration: 300 }));
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));
  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: cardTranslateY.value }],
    opacity: cardOpacity.value,
  }));
  const welcomeStyle = useAnimatedStyle(() => ({ opacity: welcomeOpacity.value }));
  const subtitleStyle = useAnimatedStyle(() => ({ opacity: subtitleOpacity.value }));
  const buttonsStyle = useAnimatedStyle(() => ({
    opacity: buttonsOpacity.value,
    transform: [{ translateY: buttonsTranslateY.value }],
  }));
  const termsStyle = useAnimatedStyle(() => ({ opacity: termsOpacity.value }));

  return (
    <View style={styles.container}>
      {/* Top: Night sky section (40%) */}
      <LinearGradient
        colors={[colors.deepNightBlue, colors.royalPurple]}
        style={[styles.topSection, { paddingTop: insets.top + spacing.lg }]}
      >
        {/* Stars */}
        {STARS.map((star, i) => (
          <StarDot key={i} {...star} />
        ))}

        {/* Logo */}
        <Animated.View style={[styles.logoContainer, logoStyle]}>
          <AppText variant="h2" color={colors.starlightWhite}>
            سيرة النبي ﷺ
          </AppText>
        </Animated.View>

        {/* Campfire */}
        <Campfire />

        {/* Narrator silhouette */}
        <View style={styles.narratorContainer}>
          <NarratorSilhouette scale={0.6} color={colors.whiteGhost} />
        </View>

        {/* Dunes */}
        <Dunes />
      </LinearGradient>

      {/* Bottom: Cream card (60%) */}
      <Animated.View style={[styles.card, cardStyle]}>
        <Animated.View style={welcomeStyle}>
          <AppText variant="h2" color={colors.deepNightBlue} style={styles.centered}>
            أهلاً بك يا بطلي
          </AppText>
        </Animated.View>

        <Animated.View style={[subtitleStyle, { marginBottom: spacing.xxxl }]}>
          <AppText variant="bodyLarge" color={colors.mutedGray} style={styles.centered}>
            سجّل حسابك وابدأ الرحلة
          </AppText>
        </Animated.View>

        <Animated.View style={[styles.buttonsContainer, buttonsStyle]}>
          <PrimaryButton
            title="إنشاء حساب جديد"
            onPress={() => navigation.navigate('SignUp')}
            style={styles.button}
          />
          <SecondaryButton
            title="تسجيل الدخول"
            onPress={() => navigation.navigate('Login')}
            style={styles.button}
          />
        </Animated.View>

        <Animated.View style={[termsStyle, styles.termsContainer]}>
          <AppText variant="caption" color={colors.mutedGray} style={styles.termsText}>
            بالمتابعة، أنت توافق على{' '}
            <AppText variant="caption" color={colors.desertGold}>
              شروط الاستخدام
            </AppText>{' '}
            و{' '}
            <AppText variant="caption" color={colors.desertGold}>
              سياسة الخصوصية
            </AppText>
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
    position: 'relative',
    overflow: 'hidden',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    zIndex: 2,
  },
  campfire: {
    width: 60,
    height: 80,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    zIndex: 2,
  },
  flame: {
    width: 30,
    height: 50,
    backgroundColor: colors.flameOrange,
    borderRadius: 15,
    position: 'absolute',
    bottom: 20,
    opacity: 0.9,
  },
  flameInner: {
    width: 16,
    height: 30,
    backgroundColor: colors.flameYellow,
    borderRadius: 8,
    position: 'absolute',
    bottom: 22,
    opacity: 0.8,
  },
  flameGlow: {
    position: 'absolute',
    bottom: -10,
    width: 120,
    height: 60,
    backgroundColor: colors.flameOrangeGlow,
    borderRadius: 60,
  },
  logs: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'flex-end',
  },
  log: {
    width: 28,
    height: 8,
    backgroundColor: colors.logBrown,
    borderRadius: 4,
  },
  narratorContainer: {
    marginTop: -16,
    marginEnd: 40,
    zIndex: 2,
  },
  dunesContainer: {
    position: 'absolute',
    bottom: 20,
    start: 0,
    end: 0,
    alignItems: 'center',
    zIndex: 1,
  },
  card: {
    flex: 0.6,
    backgroundColor: colors.softCream,
    borderTopStartRadius: radius.xxl,
    borderTopEndRadius: radius.xxl,
    marginTop: -24,
    paddingHorizontal: spacing.xxxl,
    paddingTop: spacing.xxxl,
    zIndex: 3,
    shadowColor: colors.overlaySoft,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 10,
  },
  centered: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  buttonsContainer: {
    gap: spacing.lg,
    alignItems: 'center',
  },
  button: {
    width: 280,
    alignSelf: 'center',
  },
  termsContainer: {
    marginTop: spacing.xxl,
  },
  termsText: {
    textAlign: 'center',
    lineHeight: 22,
  },
});
