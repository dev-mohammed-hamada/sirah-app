import React, { useEffect } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { colors } from '../../theme';
import { AppText } from '../ui/app-text';
import { NarratorSilhouette } from '../narrator/narrator-silhouette';

export type StageStatus = 'completed' | 'current' | 'locked';

interface StageNodeProps {
  status: StageStatus;
  icon: string;
  label: string;
  starsEarned?: number;
  maxStars?: number;
  onPress?: () => void;
}

export function StageNode({
  status,
  icon,
  label,
  starsEarned = 0,
  maxStars = 3,
  onPress,
}: StageNodeProps) {
  const glowOpacity = useSharedValue(0.3);
  const bounceY = useSharedValue(0);

  useEffect(() => {
    if (status === 'current') {
      glowOpacity.value = withRepeat(
        withTiming(0.7, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true,
      );
      bounceY.value = withRepeat(
        withSequence(
          withTiming(-4, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        ),
        -1,
        false,
      );
    }
  }, [status]);

  const glowStyle = useAnimatedStyle(() => ({
    shadowOpacity: glowOpacity.value,
  }));

  const bounceStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounceY.value }],
  }));

  const nodeSize = status === 'current' ? 72 : 64;

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={status === 'current' ? bounceStyle : undefined}>
        <View style={styles.wrapper}>
          {/* Node circle */}
          <Animated.View
            style={[
              styles.node,
              { width: nodeSize, height: nodeSize, borderRadius: nodeSize / 2 },
              status === 'completed' && styles.nodeCompleted,
              status === 'current' && [styles.nodeCurrent, glowStyle],
              status === 'locked' && styles.nodeLocked,
            ]}
          >
            <AppText style={styles.nodeIcon}>{status === 'locked' ? '🔒' : icon}</AppText>
          </Animated.View>

          {/* Mini narrator next to current */}
          {status === 'current' && (
            <View style={styles.miniNarrator}>
              <NarratorSilhouette scale={0.35} color={colors.whiteStrong} />
            </View>
          )}

          {/* Label */}
          <AppText style={[styles.nodeLabel, status === 'current' && styles.nodeLabelCurrent]}>
            {label}
          </AppText>

          {/* Stars for completed */}
          {status === 'completed' && (
            <View style={styles.starsRow}>
              {Array.from({ length: maxStars }).map((_, i) => (
                <AppText key={i} style={[styles.star, i >= starsEarned && styles.starEmpty]}>
                  {i < starsEarned ? '⭐' : '☆'}
                </AppText>
              ))}
            </View>
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  node: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeCompleted: {
    backgroundColor: colors.desertGold,
    shadowColor: colors.desertGold,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  nodeCurrent: {
    backgroundColor: colors.desertGold,
    shadowColor: colors.desertGold,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
  nodeLocked: {
    backgroundColor: colors.mutedGrayMedium,
    borderWidth: 2,
    borderColor: colors.mutedGrayStrong,
  },
  nodeIcon: {
    fontSize: 22,
    textAlign: 'center',
  },
  miniNarrator: {
    position: 'absolute',
    end: -30,
    top: -5,
  },
  nodeLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.starlightWhite,
    textAlign: 'center',
    marginTop: 6,
    textShadowColor: colors.overlayMedium,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  nodeLabelCurrent: {
    color: colors.desertGold,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
    marginTop: 4,
  },
  star: {
    fontSize: 10,
  },
  starEmpty: {
    opacity: 0.3,
  },
});
