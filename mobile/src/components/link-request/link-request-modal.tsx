import React, { useEffect, useRef } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withTiming,
  withSpring,
  withDelay,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import Svg, { Ellipse, Path, Line } from 'react-native-svg';
import { AppText } from '../ui/app-text';
import { PrimaryButton } from '../ui/primary-button';
import { colors, spacing, radius, shadows } from '../../theme';
import { fontFamily } from '../../theme/typography';
import { ar } from '../../i18n/ar';

// ─── Animated SVG line ────────────────────────────────────────────
const AnimatedLine = Animated.createAnimatedComponent(Line);

// ─── Particle dot for burst animation ────────────────────────────
interface ParticleProps {
  delay: number;
  angle: number;
  distance: number;
}

function GoldParticle({ delay, angle, distance }: ParticleProps) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) }),
    );
  }, [delay, distance, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const dx = Math.cos(angle) * distance * progress.value;
    const dy = Math.sin(angle) * distance * progress.value;
    return {
      transform: [{ translateX: dx }, { translateY: dy }],
      opacity: progress.value < 0.8 ? progress.value * 1.25 : (1 - progress.value) * 5,
    };
  });

  return <Animated.View style={[styles.particle, animatedStyle]} />;
}

// ─── Faceless silhouette illustration ────────────────────────────
interface IllustrationProps {
  isConnected: boolean;
}

function LinkIllustration({ isConnected }: IllustrationProps) {
  const dashOffset = useSharedValue(0);
  const lineOpacity = useSharedValue(1);
  const solidLineOpacity = useSharedValue(0);
  const [showParticles, setShowParticles] = React.useState(false);

  // Marching ants loop
  useEffect(() => {
    if (!isConnected) {
      dashOffset.value = withRepeat(
        withTiming(-20, { duration: 2000, easing: Easing.linear }),
        -1,
        false,
      );
    }
  }, [isConnected, dashOffset]);

  // On connect: animate line becoming solid
  useEffect(() => {
    if (isConnected) {
      lineOpacity.value = withTiming(0, { duration: 300 });
      solidLineOpacity.value = withDelay(200, withTiming(1, { duration: 300 }));
      setTimeout(() => setShowParticles(true), 100);
    }
  }, [isConnected, lineOpacity, solidLineOpacity]);

  const dashedLineAnimatedProps = useAnimatedProps(() => ({
    strokeDashoffset: dashOffset.value,
    opacity: lineOpacity.value,
  }));

  const solidLineAnimatedStyle = useAnimatedStyle(() => ({
    opacity: solidLineOpacity.value,
  }));

  // Particle positions along the line (SVG viewBox 280x120, line from ~190 to ~90 on x, ~50 on y)
  const PARTICLES = [
    { delay: 0, angle: -Math.PI / 2, distance: 18 },
    { delay: 60, angle: Math.PI / 2, distance: 14 },
    { delay: 120, angle: -Math.PI / 4, distance: 20 },
    { delay: 180, angle: (Math.PI * 3) / 4, distance: 16 },
    { delay: 240, angle: Math.PI / 4, distance: 22 },
    { delay: 300, angle: (-Math.PI * 3) / 4, distance: 12 },
    { delay: 360, angle: 0, distance: 18 },
    { delay: 420, angle: Math.PI, distance: 15 },
  ] as const;

  return (
    <View style={styles.illustrationContainer}>
      <Svg width="280" height="120" viewBox="0 0 280 120">
        {/* Father silhouette (end side in RTL = visually left) */}
        {/* Head — oval, no face */}
        <Ellipse cx="195" cy="25" rx="16" ry="18" fill={colors.deepNightBlue} />
        {/* Body — rounded rectangle shape */}
        <Path
          d="M179 46 Q179 44 181 43 L209 43 Q211 44 211 46 L213 95 Q213 97 211 97 L179 97 Q177 97 177 95 Z"
          fill={colors.deepNightBlue}
        />
        {/* Shoulders */}
        <Path d="M174 55 Q174 43 179 43 L181 43 L179 60 Z" fill={colors.deepNightBlue} />
        <Path d="M216 55 Q216 43 211 43 L209 43 L211 60 Z" fill={colors.deepNightBlue} />

        {/* Son silhouette (start side in RTL = visually right) */}
        {/* Head — oval, no face */}
        <Ellipse cx="85" cy="33" rx="13" ry="15" fill={colors.royalPurple} />
        {/* Body */}
        <Path
          d="M73 52 Q73 50 75 49 L96 49 Q98 50 98 52 L99 95 Q99 97 97 97 L73 97 Q71 97 71 95 Z"
          fill={colors.royalPurple}
        />
        {/* Shoulders */}
        <Path d="M68 60 Q68 49 73 49 L75 49 L73 65 Z" fill={colors.royalPurple} />
        <Path d="M102 60 Q102 49 97 49 L95 49 L97 65 Z" fill={colors.royalPurple} />

        {/* Dashed connection line (pending state) */}
        <AnimatedLine
          animatedProps={dashedLineAnimatedProps}
          x1="178"
          y1="50"
          x2="100"
          y2="50"
          stroke={colors.desertGold}
          strokeWidth="2"
          strokeDasharray="6,4"
        />
      </Svg>

      {/* Solid line overlay (success state) */}
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.solidLineWrapper, solidLineAnimatedStyle]}
      >
        <Svg width="280" height="120" viewBox="0 0 280 120" style={StyleSheet.absoluteFill}>
          <Line x1="178" y1="50" x2="100" y2="50" stroke={colors.desertGold} strokeWidth="2.5" />
        </Svg>
      </Animated.View>

      {/* Gold particle burst (centered on the connection line midpoint) */}
      {showParticles && (
        <View style={styles.particlesAnchor}>
          {PARTICLES.map((p, i) => (
            <GoldParticle key={i} delay={p.delay} angle={p.angle} distance={p.distance} />
          ))}
        </View>
      )}

      {/* Labels row */}
      <View style={styles.labelsRow}>
        <AppText variant="small" color={colors.mutedGray} style={styles.labelEnd}>
          {ar.linking.fatherLabel}
        </AppText>
        <AppText variant="small" color={colors.mutedGray} style={styles.labelStart}>
          {ar.linking.sonLabel}
        </AppText>
      </View>
    </View>
  );
}

// ─── Main modal ───────────────────────────────────────────────────
export interface LinkRequestModalProps {
  visible: boolean;
  fatherName: string;
  onAccept: () => void;
  onDecline: () => void;
}

type ModalPhase = 'idle' | 'accepting' | 'success' | 'declining' | 'dismissed';

export function LinkRequestModal({
  visible,
  fatherName,
  onAccept,
  onDecline,
}: LinkRequestModalProps) {
  const [phase, setPhase] = React.useState<ModalPhase>('idle');
  const [internalVisible, setInternalVisible] = React.useState(false);

  // Backdrop opacity
  const backdropOpacity = useSharedValue(0);
  // Card transform
  const cardTranslateY = useSharedValue(80);
  const cardScale = useSharedValue(0.9);
  const cardOpacity = useSharedValue(0);
  // Content cross-fade
  const normalContentOpacity = useSharedValue(1);
  const successContentOpacity = useSharedValue(0);
  // Checkmark scale
  const checkmarkScale = useSharedValue(0);

  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Entrance when visible becomes true
  useEffect(() => {
    if (visible) {
      setInternalVisible(true);
      setPhase('idle');
      // Reset values
      backdropOpacity.value = 0;
      cardTranslateY.value = 80;
      cardScale.value = 0.9;
      cardOpacity.value = 0;
      normalContentOpacity.value = 1;
      successContentOpacity.value = 0;
      checkmarkScale.value = 0;

      // Animate in
      backdropOpacity.value = withTiming(1, { duration: 300 });
      cardOpacity.value = withTiming(1, { duration: 300 });
      cardTranslateY.value = withSpring(0, { damping: 15, stiffness: 120 });
      cardScale.value = withSpring(1, { damping: 15, stiffness: 120 });
    }
  }, [
    visible,
    backdropOpacity,
    cardTranslateY,
    cardScale,
    cardOpacity,
    normalContentOpacity,
    successContentOpacity,
    checkmarkScale,
  ]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (dismissTimerRef.current) {
        clearTimeout(dismissTimerRef.current);
      }
    };
  }, []);

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: cardTranslateY.value }, { scale: cardScale.value }],
    opacity: cardOpacity.value,
  }));

  const normalContentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: normalContentOpacity.value,
  }));

  const successContentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: successContentOpacity.value,
  }));

  const checkmarkAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkmarkScale.value }],
  }));

  const handleAccept = () => {
    if (phase !== 'idle') return;
    setPhase('accepting');

    // Step 1: cross-fade to success state (300ms)
    normalContentOpacity.value = withTiming(0, { duration: 300 });
    successContentOpacity.value = withDelay(200, withTiming(1, { duration: 300 }));

    // Step 2: animate checkmark after content fades in
    checkmarkScale.value = withDelay(
      400,
      withSequence(
        withSpring(1.2, { damping: 8, stiffness: 200 }),
        withSpring(1.0, { damping: 12, stiffness: 150 }),
      ),
    );

    // After entering success phase, set phase
    setTimeout(() => setPhase('success'), 500);

    // Step 3: auto-dismiss after 2s
    dismissTimerRef.current = setTimeout(() => {
      // Slide down + fade out
      cardTranslateY.value = withTiming(120, { duration: 400, easing: Easing.in(Easing.cubic) });
      cardOpacity.value = withTiming(0, { duration: 400 });
      backdropOpacity.value = withDelay(350, withTiming(0, { duration: 200 }));

      setTimeout(() => {
        setInternalVisible(false);
        setPhase('dismissed');
        onAccept();
      }, 650);
    }, 2500);
  };

  const handleDecline = () => {
    if (phase !== 'idle') return;
    setPhase('declining');

    // Slide down + fade card
    cardTranslateY.value = withTiming(120, { duration: 300, easing: Easing.in(Easing.cubic) });
    cardOpacity.value = withTiming(0, { duration: 300 });
    backdropOpacity.value = withDelay(250, withTiming(0, { duration: 200 }));

    setTimeout(() => {
      setInternalVisible(false);
      setPhase('dismissed');
      onDecline();
    }, 520);
  };

  if (!internalVisible) {
    return null;
  }

  const isConnected = phase === 'success' || phase === 'accepting';

  return (
    <Modal visible={internalVisible} transparent animationType="none" statusBarTranslucent>
      {/* Backdrop — not dismissable */}
      <Animated.View style={[styles.backdrop, backdropAnimatedStyle]} pointerEvents="none" />

      {/* Centering container */}
      <View style={styles.centeredContainer}>
        <Animated.View style={[styles.card, cardAnimatedStyle]}>
          {/* Normal content (pending state) */}
          <Animated.View
            style={[styles.contentLayer, normalContentAnimatedStyle]}
            pointerEvents={phase === 'idle' ? 'auto' : 'none'}
          >
            <LinkIllustration isConnected={false} />

            <AppText variant="h3" color={colors.deepNightBlue} style={styles.title}>
              {ar.linking.linkRequestTitle}
            </AppText>

            <AppText variant="bodyLarge" color={colors.deepNightBlue} style={styles.description}>
              <AppText
                variant="bodyLarge"
                color={colors.deepNightBlue}
                style={styles.fatherNameBold}
              >
                {fatherName}
              </AppText>{' '}
              {ar.linking.wantsToLink}
            </AppText>

            <AppText variant="caption" color={colors.mutedGray} style={styles.infoNote}>
              {ar.linking.infoNote}
            </AppText>

            <View style={styles.buttonsContainer}>
              <PrimaryButton title={ar.linking.accept} onPress={handleAccept} />
              <View style={styles.buttonGap} />
              <View style={styles.declineButtonWrapper}>
                <DeclineButton title={ar.linking.decline} onPress={handleDecline} />
              </View>
            </View>
          </Animated.View>

          {/* Success content (after accepting) */}
          <Animated.View
            style={[styles.contentLayer, styles.successLayer, successContentAnimatedStyle]}
            pointerEvents="none"
          >
            <LinkIllustration isConnected={isConnected} />

            <Animated.View style={checkmarkAnimatedStyle}>
              <AppText style={styles.checkmark}>{'✓'}</AppText>
            </Animated.View>

            <AppText variant="h3" color={colors.successGreen} style={styles.title}>
              {ar.linking.successTitle}
            </AppText>

            <AppText variant="body" color={colors.mutedGray} style={styles.successSubtitle}>
              {ar.linking.successSubtitle}
            </AppText>
          </Animated.View>
        </Animated.View>
      </View>
    </Modal>
  );
}

// ─── Inline decline button (gray border variant) ──────────────────
interface DeclineButtonProps {
  title: string;
  onPress: () => void;
}

function DeclineButton({ title, onPress }: DeclineButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.declineBtn, animatedStyle]}>
      <AppText
        variant="bodyLarge"
        color={colors.deepNightBlue}
        style={styles.declineBtnText}
        onPress={onPress}
        suppressHighlighting
      >
        {title}
      </AppText>
    </Animated.View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────
const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  card: {
    backgroundColor: colors.starlightWhite,
    borderRadius: radius.lg,
    ...shadows.strong,
    width: '100%',
    maxWidth: 320,
    padding: spacing.xxl,
    overflow: 'hidden',
  },
  contentLayer: {
    alignItems: 'center',
  },
  successLayer: {
    position: 'absolute',
    top: spacing.xxl,
    start: spacing.xxl,
    end: spacing.xxl,
  },
  illustrationContainer: {
    width: '100%',
    height: 120,
    alignItems: 'center',
  },
  solidLineWrapper: {
    pointerEvents: 'none',
  },
  particlesAnchor: {
    position: 'absolute',
    top: 50,
    start: '50%',
    width: 0,
    height: 0,
  },
  particle: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.desertGold,
  },
  labelsRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xxxl,
    marginTop: spacing.xs,
  },
  labelEnd: {
    textAlign: 'right',
  },
  labelStart: {
    textAlign: 'right',
  },
  title: {
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  description: {
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  fatherNameBold: {
    fontFamily: fontFamily.bold,
  },
  infoNote: {
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  buttonsContainer: {
    width: '100%',
    marginTop: spacing.xxl,
  },
  buttonGap: {
    height: spacing.md,
  },
  declineButtonWrapper: {
    width: '100%',
  },
  declineBtn: {
    height: 48,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    borderColor: colors.mutedGray,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  declineBtnText: {
    fontFamily: fontFamily.bold,
  },
  checkmark: {
    fontSize: 48,
    lineHeight: 60,
    color: colors.successGreen,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  successSubtitle: {
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
