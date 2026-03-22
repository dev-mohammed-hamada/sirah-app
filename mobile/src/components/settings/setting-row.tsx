import React, { useRef } from 'react';
import { Animated, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { AppText } from '../ui/app-text';
import { colors, spacing } from '../../theme';
import { fontFamily } from '../../theme/typography';

interface SettingRowProps {
  icon: string;
  label: string;
  onPress?: () => void;
  type: 'navigate' | 'toggle' | 'value';
  value?: string;
  toggleValue?: boolean;
  onToggleChange?: (val: boolean) => void;
  isLast?: boolean;
}

export function SettingRow({
  icon,
  label,
  onPress,
  type,
  value,
  toggleValue = false,
  onToggleChange,
  isLast = false,
}: SettingRowProps) {
  const bgAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.timing(bgAnim, {
      toValue: 1,
      duration: 60,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(bgAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const bgColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', colors.desertGoldGlowSubtle],
  });

  const rowContent = (
    <Animated.View style={[styles.row, !isLast && styles.rowBorder, { backgroundColor: bgColor }]}>
      {/* Label and icon on end side (RTL: rendered start → end) */}
      <View style={styles.rowInner}>
        {/* Icon on end (RTL: this is the logical end = visually right in LTR, visually left in RTL) */}
        <AppText style={styles.icon}>{icon}</AppText>
        <AppText style={styles.label} color={colors.deepNightBlue}>
          {label}
        </AppText>
      </View>

      {/* Action on start side (RTL: visually right) */}
      {type === 'navigate' && (
        <AppText style={styles.chevron} color={colors.mutedGray}>
          {'‹'}
        </AppText>
      )}
      {type === 'toggle' && (
        <Switch
          value={toggleValue}
          onValueChange={onToggleChange}
          trackColor={{
            false: colors.mutedGrayLight,
            true: colors.desertGold,
          }}
          thumbColor={colors.starlightWhite}
        />
      )}
      {type === 'value' && (
        <AppText style={styles.valueText} color={colors.mutedGray}>
          {value}
        </AppText>
      )}
    </Animated.View>
  );

  if (type === 'navigate' || (type === 'value' && onPress)) {
    return (
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {rowContent}
      </TouchableOpacity>
    );
  }

  return <View>{rowContent}</View>;
}

const styles = StyleSheet.create({
  row: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.mutedGrayLight,
  },
  rowInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  icon: {
    fontSize: 18,
    lineHeight: 24,
  },
  label: {
    fontFamily: fontFamily.regular,
    fontSize: 15,
    lineHeight: 22,
  },
  chevron: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 21,
  },
  valueText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 21,
  },
});
