import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { AppText } from './app-text';
import { ToggleSwitch } from './toggle-switch';

interface SettingRowBaseProps {
  icon?: React.ReactNode;
  label: string;
}

interface SettingRowChevronProps extends SettingRowBaseProps {
  type?: 'chevron';
  onPress: () => void;
}

interface SettingRowToggleProps extends SettingRowBaseProps {
  type: 'toggle';
  value: boolean;
  onValueChange: (value: boolean) => void;
}

type SettingRowProps = SettingRowChevronProps | SettingRowToggleProps;

export function SettingRow(props: SettingRowProps) {
  const { icon, label } = props;

  const content = (
    <View style={styles.container}>
      <View style={styles.end}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <AppText variant="bodyLarge" color={colors.deepNightBlue}>
          {label}
        </AppText>
      </View>
      <View style={styles.start}>
        {props.type === 'toggle' ? (
          <ToggleSwitch value={props.value} onValueChange={props.onValueChange} />
        ) : (
          <AppText variant="bodyLarge" color={colors.mutedGray}>
            ‹
          </AppText>
        )}
      </View>
    </View>
  );

  if (props.type === 'toggle') {
    return <View style={styles.wrapper}>{content}</View>;
  }

  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: colors.overlayLight,
  },
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  end: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  start: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    backgroundColor: colors.overlayFaint,
  },
});
