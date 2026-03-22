import React, { useEffect, useState } from 'react';
import { DimensionValue, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  FadeIn,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius, shadows } from '../../theme';
import { AppText } from '../../components/ui/app-text';
import { PrimaryButton } from '../../components/ui/primary-button';
import { NarratorSilhouette } from '../../components/narrator/narrator-silhouette';
import { ar } from '../../i18n/ar';

// ─── Mock welcome texts per stage (will come from API) ───────────
const STAGE_WELCOME_TEXTS: Record<string, string> = {
  '1': 'هل تعلم أن جيشاً كاملاً بالفيلة أراد هدم الكعبة؟ تعال أحكي لك ماذا حدث!',
  '2': 'في ليلة مباركة وُلد خير البشر ﷺ. هيا نتعرف على طفولته!',
  '3': 'كيف كان شباب النبي ﷺ؟ ولماذا سماه الناس الصادق الأمين؟',
  '4': 'قصة جميلة عن زواج النبي ﷺ من سيدتنا خديجة رضي الله عنها',
  '5': 'في غار حراء بدأت رسالة الإسلام. تعال نعرف كيف!',
};

const STAGE_LABELS: Record<string, string> = {
  '1': 'عام الفيل',
  '2': 'المولد والطفولة',
  '3': 'الشباب والأخلاق',
  '4': 'الزواج من خديجة',
  '5': 'الوحي الأول',
};

interface NarratorWelcomeScreenProps {
  stageId: string;
  stageNumber: number;
  onContinue: () => void;
}

// ─── Typewriter Hook ─────────────────────────────────────────────
function useTypewriter(text: string, msPerWord = 40) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    const words = text.split(' ');
    let index = 0;
    setDisplayed('');

    const interval = setInterval(() => {
      index++;
      setDisplayed(words.slice(0, index).join(' '));
      if (index >= words.length) {
        clearInterval(interval);
      }
    }, msPerWord);

    return () => clearInterval(interval);
  }, [text, msPerWord]);

  return displayed;
}

// ─── Campfire Component ──────────────────────────────────────────
function Campfire() {
  const flickerScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.6);

  useEffect(() => {
    flickerScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 250, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.98, { duration: 250, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.6, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
  }, []);

  const flameStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: flickerScale.value }, { scaleX: 2 - flickerScale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <View style={campfireStyles.container}>
      <Animated.View style={[campfireStyles.glow, glowStyle]} />
      <Animated.View style={[campfireStyles.flame, flameStyle]} />
      <View style={campfireStyles.innerFlame} />
      {/* Logs */}
      <View style={[campfireStyles.log, campfireStyles.logStart]} />
      <View style={[campfireStyles.log, campfireStyles.logEnd]} />
    </View>
  );
}

const campfireStyles = StyleSheet.create({
  container: {
    width: 60,
    height: 80,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  flame: {
    width: 24,
    height: 36,
    backgroundColor: colors.flameOrange,
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
    marginBottom: -4,
    zIndex: 2,
  },
  innerFlame: {
    position: 'absolute',
    bottom: 8,
    width: 12,
    height: 20,
    backgroundColor: colors.flameYellow,
    borderTopStartRadius: 6,
    borderTopEndRadius: 6,
    borderBottomStartRadius: 4,
    borderBottomEndRadius: 4,
    zIndex: 3,
  },
  glow: {
    position: 'absolute',
    bottom: -20,
    width: 140,
    height: 60,
    borderRadius: 70,
    backgroundColor: colors.flameOrangeGlow,
    zIndex: 0,
  },
  log: {
    position: 'absolute',
    bottom: 0,
    width: 28,
    height: 6,
    backgroundColor: colors.narratorDarkBrown,
    borderRadius: 3,
    zIndex: 1,
  },
  logStart: {
    start: 4,
    transform: [{ rotate: '-25deg' }],
  },
  logEnd: {
    end: 4,
    transform: [{ rotate: '25deg' }],
  },
});

// ─── Stars ───────────────────────────────────────────────────────
const STARS: { top: DimensionValue; start: DimensionValue; size: number }[] = [
  { top: '5%', start: '20%', size: 3 },
  { top: '10%', start: '50%', size: 4 },
  { top: '3%', start: '75%', size: 3 },
  { top: '15%', start: '35%', size: 2 },
];

// ─── Main Component ─────────────────────────────────────────────
export function NarratorWelcomeScreen({
  stageId,
  stageNumber,
  onContinue,
}: NarratorWelcomeScreenProps) {
  const insets = useSafeAreaInsets();
  const welcomeText = STAGE_WELCOME_TEXTS[stageId] ?? ar.narrator.welcome;
  const stageLabel = STAGE_LABELS[stageId] ?? '';
  const displayedText = useTypewriter(welcomeText, 40);

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[colors.deepNightBlue, colors.royalPurple]}
        style={StyleSheet.absoluteFill}
      />

      {/* Stars */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {STARS.map((star, i) => (
          <View
            key={i}
            style={{
              position: 'absolute',
              top: star.top,
              start: star.start,
              width: star.size,
              height: star.size,
              borderRadius: star.size / 2,
              backgroundColor: colors.starlightWhite,
              opacity: 0.5,
            }}
          />
        ))}
      </View>

      {/* Stage title */}
      <Animated.View
        entering={FadeIn.delay(200)}
        style={[styles.stageTitle, { marginTop: insets.top + 16 }]}
      >
        <AppText style={styles.stageTitleText}>
          {ar.stageFlow.stageLabel} {stageNumber}: {stageLabel}
        </AppText>
      </Animated.View>

      {/* Speech bubble */}
      <Animated.View entering={FadeIn.delay(400)} style={styles.bubble}>
        <AppText style={styles.bubbleText}>{displayedText}</AppText>
        <View style={styles.bubbleTail} />
      </Animated.View>

      {/* Scene: narrator + campfire */}
      <View style={styles.scene}>
        <Animated.View entering={FadeIn.delay(600)} style={styles.narratorWrapper}>
          <NarratorSilhouette scale={0.8} color={colors.overlayDarker} />
        </Animated.View>
        <Campfire />
      </View>

      {/* Sand dune hint */}
      <View style={styles.sandDune} />

      {/* Continue button */}
      <View style={[styles.buttonArea, { paddingBottom: insets.bottom + 20 }]}>
        <PrimaryButton title={`${ar.stageFlow.letsGo} →`} onPress={onContinue} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  stageTitle: {
    alignItems: 'center',
  },
  stageTitleText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.desertGold,
    textAlign: 'center',
  },
  bubble: {
    backgroundColor: colors.starlightWhite,
    borderWidth: 1,
    borderColor: colors.desertGold,
    borderRadius: radius.lg,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xxl,
    marginHorizontal: spacing.xxl,
    marginTop: spacing.xxl,
    ...shadows.medium,
    position: 'relative',
  },
  bubbleText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.deepNightBlue,
    lineHeight: 34,
    textAlign: 'center',
  },
  bubbleTail: {
    position: 'absolute',
    bottom: -10,
    alignSelf: 'center',
    width: 0,
    height: 0,
    borderStartWidth: 10,
    borderEndWidth: 10,
    borderTopWidth: 10,
    borderStartColor: 'transparent',
    borderEndColor: 'transparent',
    borderTopColor: colors.starlightWhite,
  },
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    gap: spacing.sm,
  },
  narratorWrapper: {
    marginEnd: 30,
    marginBottom: spacing.lg,
  },
  sandDune: {
    position: 'absolute',
    bottom: 80,
    start: 0,
    end: 0,
    height: 40,
    backgroundColor: colors.warmSandFaint,
    borderTopStartRadius: 200,
    borderTopEndRadius: 200,
  },
  buttonArea: {
    paddingHorizontal: spacing.xl,
  },
});
