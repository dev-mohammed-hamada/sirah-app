import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions, DimensionValue } from 'react-native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../../theme';
import { AppText } from '../../components';
import { NarratorSilhouette } from '../../components/narrator/narrator-silhouette';
import type { AuthStackParamList } from '../../app/navigation/types';
import { ar } from '../../i18n/ar';

type Props = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ONBOARDING_COMPLETE_KEY = 'onboarding_complete';
const AUTO_TRANSITION_MS = 2500;

// ─── StarDot ────────────────────────────────────────────────
function StarDot({
  top,
  start,
  size,
  delay,
}: {
  top: DimensionValue;
  start: DimensionValue;
  size: number;
  delay: number;
}) {
  const opacity = useSharedValue(0.3);
  const scale = useSharedValue(1);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }), -1, true),
    );
    scale.value = withDelay(
      delay,
      withRepeat(withTiming(1.5, { duration: 1500, easing: Easing.inOut(Easing.ease) }), -1, true),
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={{ position: 'absolute', top, start }}>
      <Animated.View
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: '#FFFFFF',
          },
          animStyle,
        ]}
      />
    </View>
  );
}

// 12 stars matching mockup positions
const STARS: { top: DimensionValue; start: DimensionValue; size: number; delay: number }[] = [
  { top: '8%', start: '15%', size: 3, delay: 0 },
  { top: '12%', start: '45%', size: 4, delay: 500 },
  { top: '5%', start: '70%', size: 3, delay: 1000 },
  { top: '18%', start: '85%', size: 2, delay: 300 },
  { top: '25%', start: '25%', size: 4, delay: 700 },
  { top: '15%', start: '55%', size: 3, delay: 1200 },
  { top: '8%', start: '35%', size: 2, delay: 400 },
  { top: '22%', start: '65%', size: 3, delay: 900 },
  { top: '30%', start: '10%', size: 2, delay: 200 },
  { top: '10%', start: '90%', size: 3, delay: 1500 },
  { top: '35%', start: '50%', size: 2, delay: 600 },
  { top: '20%', start: '78%', size: 3, delay: 800 },
];

// ─── Campfire ───────────────────────────────────────────────
function Campfire() {
  const flameScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.6);

  useEffect(() => {
    flameScale.value = withRepeat(
      withTiming(1.05, { duration: 500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
    glowOpacity.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, []);

  const flameStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: flameScale.value }, { scaleX: 2 - flameScale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: 0.95 + glowOpacity.value * 0.1 }],
  }));

  return (
    <View style={styles.campfire}>
      <Animated.View style={[styles.flameGlow, glowStyle]} />
      <Animated.View style={[styles.flame, flameStyle]} />
      <View style={styles.flameInner} />
      <View style={styles.logs}>
        <View style={styles.log} />
        <View style={[styles.log, { transform: [{ rotate: '-15deg' }, { translateY: -4 }] }]} />
        <View style={[styles.log, { transform: [{ rotate: '15deg' }, { translateY: -4 }] }]} />
      </View>
    </View>
  );
}

// ─── Dunes (3 layers matching mockup) ───────────────────────
function Dunes() {
  return (
    <View style={styles.dunesContainer}>
      <Svg width={SCREEN_WIDTH * 1.2} height={180} viewBox="0 0 500 180" preserveAspectRatio="none">
        <Path
          d="M0,180 Q60,100 130,130 Q200,160 280,110 Q360,60 440,120 Q500,150 540,100 L540,180 Z"
          fill="rgba(212,168,67,0.15)"
        />
        <Path
          d="M0,180 Q80,120 160,150 Q240,170 320,130 Q400,90 480,140 L540,180 Z"
          fill="rgba(212,168,67,0.25)"
        />
        <Path
          d="M0,180 Q100,140 200,160 Q300,180 400,150 Q480,130 540,160 L540,180 Z"
          fill="rgba(245,230,200,0.2)"
        />
      </Svg>
    </View>
  );
}

// ─── Main Screen ────────────────────────────────────────────
export function SplashScreen({ navigation }: Props) {
  const screenOpacity = useSharedValue(0);
  const narratorOpacity = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.8);
  const taglineOpacity = useSharedValue(0);

  const navigateAway = async () => {
    try {
      const onboardingDone = await AsyncStorage.getItem(ONBOARDING_COMPLETE_KEY);
      if (onboardingDone === 'true') {
        navigation.replace('Landing');
      } else {
        navigation.replace('Onboarding');
      }
    } catch {
      navigation.replace('Onboarding');
    }
  };

  useEffect(() => {
    // 1. Screen fade in (600ms)
    screenOpacity.value = withTiming(1, { duration: 600 });
    // 2. Narrator fade in (400ms at 200ms)
    narratorOpacity.value = withDelay(200, withTiming(1, { duration: 400 }));
    // 3. Logo scale bounce (500ms spring at 600ms)
    logoOpacity.value = withDelay(600, withTiming(1, { duration: 500 }));
    logoScale.value = withDelay(600, withSpring(1, { damping: 12, stiffness: 100 }));
    // 4. Tagline fade (300ms at 900ms)
    taglineOpacity.value = withDelay(900, withTiming(1, { duration: 300 }));

    // 5. Auto-transition at 2.5s
    const timeout = setTimeout(() => {
      navigateAway();
    }, AUTO_TRANSITION_MS);

    return () => clearTimeout(timeout);
  }, []);

  const screenStyle = useAnimatedStyle(() => ({ opacity: screenOpacity.value }));
  const narratorStyle = useAnimatedStyle(() => ({ opacity: narratorOpacity.value }));
  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));
  const taglineStyle = useAnimatedStyle(() => ({ opacity: taglineOpacity.value }));

  return (
    <Animated.View style={[styles.container, screenStyle]}>
      <LinearGradient
        colors={['#1A2744', '#2A3A5C', '#4A2D6B']}
        locations={[0, 0.4, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Stars */}
      {STARS.map((star, i) => (
        <StarDot key={i} {...star} />
      ))}

      {/* Logo */}
      <Animated.View style={[styles.logoContainer, logoStyle]}>
        <AppText style={styles.logoText}>{ar.appName}</AppText>
      </Animated.View>

      {/* Tagline */}
      <Animated.View style={taglineStyle}>
        <AppText style={styles.taglineText}>{ar.appTagline}</AppText>
      </Animated.View>

      {/* Campfire */}
      <View style={styles.campfireArea}>
        <Campfire />
      </View>

      {/* Narrator silhouette */}
      <Animated.View style={[styles.narratorContainer, narratorStyle]}>
        <NarratorSilhouette scale={1} color="#1A1A2E" />
      </Animated.View>

      {/* Dunes */}
      <Dunes />
    </Animated.View>
  );
}

// ─── Styles ─────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  logoContainer: {
    zIndex: 3,
    alignItems: 'center',
    marginBottom: 8,
  },
  logoText: {
    fontSize: 36,
    fontWeight: '900',
    color: colors.starlightWhite,
    textAlign: 'center',
    textShadowColor: 'rgba(212, 168, 67, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 20,
  },
  taglineText: {
    fontSize: 16,
    color: colors.starlightWhite,
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 40,
    zIndex: 3,
  },
  campfireArea: {
    zIndex: 2,
    marginTop: 60,
    alignItems: 'center',
  },
  campfire: {
    width: 60,
    height: 80,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  flame: {
    width: 30,
    height: 50,
    backgroundColor: '#FF9900',
    borderRadius: 15,
    position: 'absolute',
    bottom: 20,
    opacity: 0.9,
  },
  flameInner: {
    width: 20,
    height: 35,
    backgroundColor: '#FFCC00',
    borderRadius: 10,
    position: 'absolute',
    bottom: 22,
    opacity: 0.8,
  },
  flameGlow: {
    position: 'absolute',
    bottom: -20,
    width: 200,
    height: 100,
    backgroundColor: 'rgba(255, 153, 0, 0.3)',
    borderRadius: 100,
  },
  logs: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'flex-end',
  },
  log: {
    width: 28,
    height: 8,
    backgroundColor: '#654321',
    borderRadius: 4,
  },
  narratorContainer: {
    zIndex: 2,
    marginTop: -20,
    marginEnd: 40,
  },
  dunesContainer: {
    position: 'absolute',
    bottom: 0,
    start: 0,
    end: 0,
    height: 180,
    zIndex: 1,
    alignItems: 'center',
  },
});
