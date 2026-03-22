import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withSequence,
  withRepeat,
  Easing,
  cancelAnimation,
  runOnJS,
} from 'react-native-reanimated';
import { colors } from '../../theme';
import { AppText } from '../ui/app-text';
import { toAr as toArabicNumeral } from '../../utils/arabic-numerals';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const RING_SIZE = 80;
const STROKE_WIDTH = 4;
const RADIUS = (RING_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface CountdownRingProps {
  duration: number;
  onExpire: () => void;
  running: boolean;
}

export function CountdownRing({ duration, onExpire, running }: CountdownRingProps) {
  const durationSeconds = Math.round(duration / 1000);
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);
  const [expired, setExpired] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Animated stroke offset (drives the ring depletion)
  const strokeOffset = useSharedValue(0);

  // Pulse scale for critical state (<3s)
  const pulseScale = useSharedValue(1);

  // Ring color (gold when normal, orange when low)
  const isCritical = secondsLeft <= 3 && !expired;
  const isLow = secondsLeft <= 10 && !expired;

  const ringColor = expired
    ? colors.errorRed
    : isCritical
      ? colors.errorRed
      : isLow
        ? colors.sunsetOrange
        : colors.desertGold;

  // Animated props for the ring stroke
  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: strokeOffset.value,
  }));

  // Handle running state changes
  useEffect(() => {
    if (running && !expired) {
      startTimeRef.current = Date.now();

      // Animate stroke from 0 to CIRCUMFERENCE over the full duration
      strokeOffset.value = withTiming(CIRCUMFERENCE, {
        duration,
        easing: Easing.linear,
      });

      // Tick down seconds
      intervalRef.current = setInterval(() => {
        if (startTimeRef.current === null) return;
        const elapsed = Date.now() - startTimeRef.current;
        const remaining = Math.max(0, durationSeconds - Math.floor(elapsed / 1000));
        setSecondsLeft(remaining);

        if (remaining <= 0) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setExpired(true);
          runOnJS(onExpire)();
        }
      }, 200);
    } else if (!running) {
      cancelAnimation(strokeOffset);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  // Critical pulse animation (<3s)
  useEffect(() => {
    if (isCritical && running) {
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.15, { duration: 250, easing: Easing.out(Easing.ease) }),
          withTiming(1.0, { duration: 250, easing: Easing.in(Easing.ease) }),
        ),
        -1,
        false,
      );
    } else {
      cancelAnimation(pulseScale);
      pulseScale.value = withTiming(1, { duration: 150 });
    }
  }, [isCritical, running, pulseScale]);

  const pulseStyle = {
    transform: [{ scale: pulseScale }],
  };

  const displaySeconds = expired ? 0 : secondsLeft;

  return (
    <Animated.View style={[styles.container, pulseStyle]}>
      <Svg width={RING_SIZE} height={RING_SIZE}>
        {/* Track circle */}
        <Circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RADIUS}
          stroke={colors.starlightWhite}
          strokeOpacity={0.15}
          strokeWidth={STROKE_WIDTH}
          fill="none"
        />
        {/* Depleting ring */}
        <AnimatedCircle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RADIUS}
          stroke={ringColor}
          strokeWidth={STROKE_WIDTH}
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          animatedProps={animatedCircleProps}
          strokeLinecap="round"
          // Start from top (12 o'clock position)
          transform={`rotate(-90, ${RING_SIZE / 2}, ${RING_SIZE / 2})`}
        />
      </Svg>
      {/* Seconds label in center */}
      <View style={styles.centerLabel} pointerEvents="none">
        <AppText
          style={[
            styles.secondsText,
            {
              color: isCritical ? colors.errorRed : colors.starlightWhite,
            },
          ]}
        >
          {toArabicNumeral(displaySeconds)}
        </AppText>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerLabel: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondsText: {
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 30,
  },
});
