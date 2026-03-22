import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Pressable,
  I18nManager,
  ViewToken,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  Easing,
  useAnimatedProps,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, gradients, spacing, radius, typography } from '../../theme';
import { AppText, PrimaryButton } from '../../components';
import type { AuthStackParamList } from '../../app/navigation/types';
import { ar } from '../../i18n/ar';

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const ONBOARDING_COMPLETE_KEY = 'onboarding_complete';

const AnimatedPath = Animated.createAnimatedComponent(Path);

// ─── StarDot ────────────────────────────────────────────────
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
          backgroundColor: colors.starlightWhite,
        },
        style,
      ]}
    />
  );
}

const PAGE_STARS: { top: number; start: number; size: number; delay: number }[][] = [
  [
    { top: 40, start: 50, size: 3, delay: 0 },
    { top: 65, start: 180, size: 4, delay: 500 },
    { top: 30, start: 270, size: 3, delay: 1000 },
    { top: 90, start: 120, size: 3, delay: 300 },
  ],
  [
    { top: 40, start: 40, size: 3, delay: 200 },
    { top: 70, start: 200, size: 3, delay: 800 },
    { top: 25, start: 290, size: 2, delay: 500 },
  ],
  [
    { top: 40, start: 60, size: 3, delay: 300 },
    { top: 65, start: 190, size: 4, delay: 700 },
    { top: 30, start: 280, size: 3, delay: 1100 },
  ],
];

// ─── Illustration 1: Golden Path ────────────────────────────
function PathIllustration() {
  const pathDraw = useSharedValue(800);
  const markerOpacity = useSharedValue(0);

  useEffect(() => {
    pathDraw.value = withTiming(0, { duration: 2000, easing: Easing.out(Easing.ease) });
    markerOpacity.value = withDelay(1500, withTiming(1, { duration: 500 }));
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: pathDraw.value,
  }));

  const markerStyle = useAnimatedStyle(() => ({
    opacity: markerOpacity.value,
  }));

  const markers = [
    { top: 250, start: 180 },
    { top: 200, start: 50 },
    { top: 150, start: 160 },
    { top: 100, start: 30 },
    { top: 60, start: 140 },
  ];

  return (
    <View style={styles.pathContainer}>
      {/* City silhouette at top */}
      <View style={styles.cityGlow}>
        <View style={styles.citySilhouette}>
          <View style={[styles.building, { width: 8, height: 20 }]} />
          <View
            style={[
              styles.building,
              { width: 6, height: 30, borderTopStartRadius: 3, borderTopEndRadius: 3 },
            ]}
          />
          <View style={[styles.building, { width: 10, height: 25 }]} />
          <View style={[styles.building, { width: 4, height: 35 }]} />
          <View style={[styles.building, { width: 8, height: 22 }]} />
        </View>
        <View style={styles.cityGlowEffect} />
      </View>

      {/* Golden path SVG */}
      <Svg width={240} height={300} viewBox="0 0 280 360" style={styles.pathSvg}>
        <AnimatedPath
          d="M240,340 C240,300 40,280 40,240 C40,200 240,180 240,140 C240,100 120,80 140,60"
          stroke={colors.desertGold}
          strokeWidth={3}
          fill="none"
          strokeDasharray={800}
          animatedProps={animatedProps}
        />
      </Svg>

      {/* Stage markers */}
      {markers.map((m, i) => (
        <Animated.View
          key={i}
          style={[styles.pathMarker, { top: m.top, start: m.start }, markerStyle]}
        />
      ))}

      {/* Mini dunes at bottom */}
      <View style={styles.miniDunesContainer}>
        <Svg width={280} height={50} viewBox="0 0 320 60" preserveAspectRatio="none">
          <Path
            d="M0,60 Q40,30 80,45 Q120,55 180,35 Q240,15 300,40 Q320,50 340,30 L340,60 Z"
            fill="rgba(245,230,200,0.15)"
          />
        </Svg>
      </View>
    </View>
  );
}

// ─── Illustration 2: Quiz Elements Orbit ────────────────────
function QuizIllustration() {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 20000, easing: Easing.linear }),
      -1,
      false,
    );
  }, []);

  const orbitItems = [
    { radius: 90, delay: 0, dur: 10, content: 'icon', icon: '⭐' },
    { radius: 110, delay: -3, dur: 12, content: 'icon', icon: '❤️' },
    { radius: 130, delay: -5, dur: 9, content: 'card', text: 'أ. عبدالمطلب' },
    { radius: 100, delay: -7, dur: 11, content: 'xp', text: '+10 XP' },
    { radius: 120, delay: -2, dur: 13, content: 'icon', icon: '🌟' },
    { radius: 80, delay: -4, dur: 8, content: 'card', text: 'ب. أبو طالب' },
  ];

  return (
    <View style={styles.quizContainer}>
      {/* Center glow */}
      <View style={styles.centerGlow} />

      {/* Child silhouette */}
      <View style={styles.childFigure}>
        <View style={styles.childHead} />
        <View style={styles.childBody} />
      </View>

      {/* Orbiting items */}
      {orbitItems.map((item, i) => (
        <OrbitItem key={i} {...item} />
      ))}
    </View>
  );
}

function OrbitItem({
  radius: orbitRadius,
  delay,
  dur,
  content,
  icon,
  text,
}: {
  radius: number;
  delay: number;
  dur: number;
  content: string;
  icon?: string;
  text?: string;
}) {
  const angle = useSharedValue(delay * (360 / dur));

  useEffect(() => {
    const startAngle = delay * (360 / dur);
    angle.value = startAngle;
    angle.value = withRepeat(
      withTiming(startAngle + 360, { duration: dur * 1000, easing: Easing.linear }),
      -1,
      false,
    );
  }, []);

  const style = useAnimatedStyle(() => {
    const rad = (angle.value * Math.PI) / 180;
    const x = Math.cos(rad) * orbitRadius;
    const y = Math.sin(rad) * orbitRadius;
    return {
      transform: [{ translateX: x }, { translateY: y }],
    };
  });

  return (
    <Animated.View style={[styles.orbitItem, style]}>
      {content === 'icon' && <AppText style={styles.floatIcon}>{icon}</AppText>}
      {content === 'card' && (
        <View style={styles.quizCardMini}>
          <AppText style={styles.quizCardText}>{text}</AppText>
        </View>
      )}
      {content === 'xp' && (
        <View style={[styles.quizCardMini, styles.xpCard]}>
          <AppText style={[styles.quizCardText, { color: colors.desertGold }]}>{text}</AppText>
        </View>
      )}
    </Animated.View>
  );
}

// ─── Illustration 3: Father-Son Link ────────────────────────
function LinkIllustration() {
  const lineOpacity = useSharedValue(0.7);

  useEffect(() => {
    lineOpacity.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, []);

  const lineStyle = useAnimatedStyle(() => ({
    opacity: lineOpacity.value,
  }));

  return (
    <View style={styles.linkContainer}>
      {/* Father card */}
      <View style={styles.personCard}>
        <View style={[styles.personAvatar, styles.fatherAvatar]}>
          <View style={styles.avatarHead} />
          <View style={styles.avatarBody} />
        </View>
        <AppText style={styles.personLabel}>{ar.onboarding.fatherLabel}</AppText>
        <View style={styles.personDevice}>
          <AppText style={styles.deviceTitle}>Dashboard</AppText>
          <View style={styles.miniBar}>
            <View
              style={[styles.miniBarFill, { width: '70%', backgroundColor: colors.desertGold }]}
            />
          </View>
          <View style={styles.miniBar}>
            <View
              style={[styles.miniBarFill, { width: '45%', backgroundColor: colors.successGreen }]}
            />
          </View>
          <View style={styles.miniBar}>
            <View
              style={[styles.miniBarFill, { width: '90%', backgroundColor: colors.desertGold }]}
            />
          </View>
          <AppText style={styles.deviceStars}>⭐⭐⭐</AppText>
        </View>
      </View>

      {/* Connection line */}
      <Animated.View style={[styles.connectionLine, lineStyle]}>
        <View style={[styles.connectionDot, { start: -5 }]} />
        <View style={[styles.connectionDot, { end: -5 }]} />
      </Animated.View>

      {/* Son card */}
      <View style={styles.personCard}>
        <View style={[styles.personAvatar, styles.sonAvatar]}>
          <View style={[styles.avatarHead, { width: 20, height: 20 }]} />
          <View style={[styles.avatarBody, { width: 28, height: 30, borderRadius: 14 }]} />
        </View>
        <AppText style={styles.personLabel}>{ar.onboarding.sonLabel}</AppText>
        <View style={[styles.personDevice, { borderColor: colors.successGreenGlowMedium }]}>
          <AppText style={styles.deviceTitle}>Playing</AppText>
          <AppText style={styles.deviceStar}>⭐</AppText>
          <AppText style={styles.deviceXp}>+10 XP</AppText>
          <AppText style={styles.deviceHearts}>❤️❤️❤️</AppText>
        </View>
      </View>
    </View>
  );
}

// ─── Page Dots ──────────────────────────────────────────────
function PageDots({ current, total }: { current: number; total: number }) {
  return (
    <View style={styles.dotsRow}>
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} style={[styles.dot, i === current && styles.dotActive]} />
      ))}
    </View>
  );
}

// ─── Main Screen ────────────────────────────────────────────
export function OnboardingScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const pages = [
    {
      title: ar.onboarding.slide1Title,
      desc: ar.onboarding.slide1Desc,
      illustration: <PathIllustration />,
    },
    {
      title: ar.onboarding.slide2Title,
      desc: ar.onboarding.slide2Desc,
      illustration: <QuizIllustration />,
    },
    {
      title: ar.onboarding.slide3Title,
      desc: ar.onboarding.slide3Desc,
      illustration: <LinkIllustration />,
    },
  ];

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentPage(viewableItems[0].index);
      }
    },
    [],
  );

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const goToNext = async () => {
    if (currentPage < 2) {
      flatListRef.current?.scrollToIndex({ index: currentPage + 1, animated: true });
    } else {
      await completeOnboarding();
    }
  };

  const skipToLanding = async () => {
    await completeOnboarding();
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');
    } catch {}
    navigation.replace('Landing');
  };

  const isLastPage = currentPage === 2;

  const renderPage = ({ item, index }: { item: (typeof pages)[0]; index: number }) => (
    <View style={[styles.page, { width: SCREEN_WIDTH }]}>
      <LinearGradient
        colors={[colors.deepNightBlue, colors.royalPurple]}
        style={StyleSheet.absoluteFill}
      />

      {/* Stars */}
      {PAGE_STARS[index].map((star, i) => (
        <StarDot key={i} {...star} />
      ))}

      {/* Skip button — hidden on last page */}
      {!isLastPage && index === currentPage && (
        <Pressable
          style={[styles.skipButton, { top: insets.top + 12 }]}
          onPress={skipToLanding}
          hitSlop={12}
        >
          <AppText style={styles.skipText}>{ar.skip}</AppText>
        </Pressable>
      )}

      {/* Illustration area */}
      <View style={[styles.illustrationArea, { paddingTop: insets.top + 60 }]}>
        {item.illustration}
      </View>

      {/* Text */}
      <View style={styles.textArea}>
        <AppText variant="h2" color={colors.starlightWhite} style={styles.titleText}>
          {item.title}
        </AppText>
        <AppText variant="bodyLarge" color={colors.starlightWhite} style={styles.descText}>
          {item.desc}
        </AppText>
      </View>

      {/* Bottom: dots + button */}
      <View style={[styles.bottomArea, { paddingBottom: insets.bottom + 32 }]}>
        <PageDots current={currentPage} total={3} />
        <PrimaryButton
          title={isLastPage ? ar.onboarding.getStarted : ar.next}
          onPress={goToNext}
          style={[styles.actionButton, isLastPage && styles.glowButton]}
        />
      </View>
    </View>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={pages}
      renderItem={renderPage}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, i) => String(i)}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      inverted={I18nManager.isRTL}
      bounces={false}
      getItemLayout={(_, index) => ({
        length: SCREEN_WIDTH,
        offset: SCREEN_WIDTH * index,
        index,
      })}
    />
  );
}

// Check if onboarding is complete
export async function isOnboardingComplete(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_COMPLETE_KEY);
    return value === 'true';
  } catch {
    return false;
  }
}

// ─── Styles ─────────────────────────────────────────────────
const styles = StyleSheet.create({
  page: {
    flex: 1,
    position: 'relative',
  },
  skipButton: {
    position: 'absolute',
    end: 24,
    zIndex: 5,
  },
  skipText: {
    color: colors.whiteStrong,
    fontSize: 14,
    fontWeight: '500',
  },
  illustrationArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  textArea: {
    paddingHorizontal: 32,
    paddingVertical: 24,
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'center',
    marginBottom: 12,
  },
  descText: {
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 26,
  },
  bottomArea: {
    paddingHorizontal: 32,
    paddingTop: 16,
    alignItems: 'center',
    gap: 20,
  },
  actionButton: {
    width: 280,
  },
  glowButton: {
    shadowColor: colors.desertGold,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },

  // Page dots
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.whiteSoft,
  },
  dotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.desertGold,
  },

  // ─── Illustration 1: Path ───
  pathContainer: {
    width: 240,
    height: 320,
    position: 'relative',
    alignItems: 'center',
  },
  cityGlow: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  citySilhouette: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'flex-end',
    opacity: 0.6,
  },
  building: {
    backgroundColor: colors.desertGold,
    opacity: 0.7,
    borderTopStartRadius: 2,
    borderTopEndRadius: 2,
  },
  cityGlowEffect: {
    width: 100,
    height: 40,
    backgroundColor: colors.desertGoldGlow,
    borderRadius: 50,
    marginTop: -15,
  },
  pathSvg: {
    position: 'absolute',
    top: 0,
  },
  pathMarker: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.desertGold,
    shadowColor: colors.desertGold,
    shadowOpacity: 0.6,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  miniDunesContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },

  // ─── Illustration 2: Quiz ───
  quizContainer: {
    width: 280,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  centerGlow: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: colors.desertGoldGlowSubtle,
    borderRadius: 100,
  },
  childFigure: {
    alignItems: 'center',
    zIndex: 2,
  },
  childHead: {
    width: 24,
    height: 24,
    backgroundColor: colors.whiteSubtle,
    borderRadius: 12,
    marginBottom: -8,
  },
  childBody: {
    width: 40,
    height: 45,
    backgroundColor: colors.whiteSubtle,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  orbitItem: {
    position: 'absolute',
  },
  floatIcon: {
    fontSize: 24,
    textAlign: 'center',
  },
  quizCardMini: {
    backgroundColor: colors.whiteMist,
    borderWidth: 1,
    borderColor: colors.whiteLight,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  xpCard: {
    backgroundColor: colors.desertGoldGlow20,
    borderColor: colors.desertGold,
  },
  quizCardText: {
    fontSize: 11,
    color: colors.starlightWhite,
  },

  // ─── Illustration 3: Link ───
  linkContainer: {
    width: 280,
    height: 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    position: 'relative',
  },
  personCard: {
    alignItems: 'center',
    gap: 12,
    zIndex: 2,
  },
  personAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fatherAvatar: {
    backgroundColor: colors.desertGoldGlow20,
    borderWidth: 2,
    borderColor: colors.desertGold,
  },
  sonAvatar: {
    backgroundColor: colors.successGreenGlow,
    borderWidth: 2,
    borderColor: colors.successGreen,
  },
  avatarHead: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.whiteSoft,
    marginBottom: -6,
  },
  avatarBody: {
    width: 32,
    height: 35,
    borderRadius: 16,
    backgroundColor: colors.whiteSoft,
  },
  personLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.starlightWhite,
    opacity: 0.8,
  },
  personDevice: {
    width: 56,
    height: 90,
    backgroundColor: colors.whiteGhost,
    borderWidth: 1,
    borderColor: colors.whiteSubtle,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 4,
    gap: 4,
    alignItems: 'center',
  },
  deviceTitle: {
    fontSize: 8,
    color: colors.whiteMedium,
    marginBottom: 4,
  },
  miniBar: {
    width: '80%',
    height: 4,
    backgroundColor: colors.whiteFaint,
    borderRadius: 2,
    overflow: 'hidden',
  },
  miniBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  deviceStars: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  deviceStar: {
    fontSize: 16,
    textAlign: 'center',
  },
  deviceXp: {
    fontSize: 10,
    color: colors.desertGold,
    textAlign: 'center',
  },
  deviceHearts: {
    fontSize: 10,
    textAlign: 'center',
  },
  connectionLine: {
    position: 'absolute',
    top: '50%',
    start: '25%',
    end: '25%',
    height: 3,
    backgroundColor: colors.desertGold,
    borderRadius: 2,
    shadowColor: colors.desertGold,
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  connectionDot: {
    position: 'absolute',
    top: -3.5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.desertGold,
    shadowColor: colors.desertGold,
    shadowOpacity: 0.6,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
  },
});
