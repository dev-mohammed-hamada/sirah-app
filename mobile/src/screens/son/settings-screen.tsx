import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { AppText } from '../../components/ui/app-text';
import { SectionHeader, SettingRow, LogoutModal } from '../../components/settings';
import { colors, radius, shadows, spacing } from '../../theme';
import { fontFamily } from '../../theme/typography';
import { ar } from '../../i18n/ar';

// ─── Mock Data ────────────────────────────────────────────────────
const MOCK_USER = {
  displayName: 'محمد أحمد',
  username: 'mohammed_123',
  avatar: null,
} as const;

// ─── Avatar Placeholder ───────────────────────────────────────────
function AvatarPlaceholder() {
  // Faceless silhouette using initials inside a circle
  const initials = MOCK_USER.displayName.trim().charAt(0);

  return (
    <View style={avatarStyles.container}>
      <View style={avatarStyles.circle}>
        <AppText style={avatarStyles.initials} color={colors.deepNightBlue}>
          {initials}
        </AppText>
      </View>
      {/* Edit icon overlay */}
      <View style={avatarStyles.editBadge}>
        <AppText style={avatarStyles.editIcon}>✏️</AppText>
      </View>
    </View>
  );
}

const avatarStyles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    position: 'relative',
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.desertGoldGlowSubtle,
    borderWidth: 2,
    borderColor: colors.desertGold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    lineHeight: 34,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    end: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.desertGold,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.warmSand,
  },
  editIcon: {
    fontSize: 10,
    lineHeight: 14,
  },
});

// ─── Settings Screen ──────────────────────────────────────────────
export function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleLogoutConfirm = () => {
    setLogoutModalVisible(false);
    // TODO: Clear auth session when backend is integrated
    Alert.alert('تسجيل الخروج', 'تم تسجيل الخروج بنجاح');
  };

  const handlePlaceholderNav = (screen: string) => {
    Alert.alert(screen, 'هذه الشاشة قيد التطوير');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <AppText variant="h2" color={colors.deepNightBlue} style={styles.header}>
          {ar.settings.title}
        </AppText>

        {/* Profile Card */}
        <Animated.View entering={FadeInDown.duration(300).delay(0)} style={styles.profileCard}>
          <AvatarPlaceholder />
          <View style={styles.profileInfo}>
            <AppText style={styles.profileName} color={colors.deepNightBlue}>
              {MOCK_USER.displayName}
            </AppText>
            <AppText style={styles.profileUsername} color={colors.mutedGray}>
              {'@' + MOCK_USER.username}
            </AppText>
            <TouchableOpacity
              onPress={() => handlePlaceholderNav(ar.settings.editProfile)}
              activeOpacity={0.7}
            >
              <AppText style={styles.editLink} color={colors.desertGold}>
                {ar.settings.editProfile}
              </AppText>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Account Section */}
        <Animated.View entering={FadeInDown.duration(300).delay(100)}>
          <SectionHeader title={ar.settings.account} />
          <View style={styles.cardContainer}>
            <SettingRow
              icon="🔒"
              label={ar.settings.changePassword}
              type="navigate"
              onPress={() => handlePlaceholderNav(ar.settings.changePassword)}
            />
            <SettingRow
              icon="🔗"
              label={ar.settings.linkedAccounts}
              type="navigate"
              onPress={() => handlePlaceholderNav(ar.settings.linkedAccounts)}
              isLast
            />
          </View>
        </Animated.View>

        {/* Notifications Section */}
        <Animated.View entering={FadeInDown.duration(300).delay(200)}>
          <SectionHeader title={ar.settings.notifications} />
          <View style={styles.cardContainer}>
            <SettingRow
              icon="🔔"
              label={ar.settings.enableNotifications}
              type="toggle"
              toggleValue={notificationsEnabled}
              onToggleChange={setNotificationsEnabled}
            />
            <SettingRow
              icon="⏰"
              label={ar.settings.dailyReminderTime}
              type="value"
              value="٦:٠٠ م"
              onPress={() => handlePlaceholderNav(ar.settings.dailyReminderTime)}
              isLast
            />
          </View>
        </Animated.View>

        {/* App Section */}
        <Animated.View entering={FadeInDown.duration(300).delay(300)}>
          <SectionHeader title={ar.settings.app} />
          <View style={styles.cardContainer}>
            <SettingRow
              icon="ℹ️"
              label={ar.settings.about}
              type="navigate"
              onPress={() => handlePlaceholderNav(ar.settings.about)}
            />
            <SettingRow
              icon="📄"
              label={ar.settings.terms}
              type="navigate"
              onPress={() => handlePlaceholderNav(ar.settings.terms)}
            />
            <SettingRow
              icon="🛡️"
              label={ar.settings.privacy}
              type="navigate"
              onPress={() => handlePlaceholderNav(ar.settings.privacy)}
              isLast
            />
          </View>
        </Animated.View>

        {/* Logout Button */}
        <Animated.View entering={FadeInDown.duration(300).delay(400)}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => setLogoutModalVisible(true)}
            activeOpacity={0.85}
          >
            <AppText style={styles.logoutText} color={colors.errorRed}>
              {ar.settings.logout}
            </AppText>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      <LogoutModal
        visible={logoutModalVisible}
        onConfirm={handleLogoutConfirm}
        onCancel={() => setLogoutModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.softCream,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: spacing.xxxl,
  },
  header: {
    textAlign: 'center',
    paddingVertical: spacing.lg,
  },
  profileCard: {
    backgroundColor: colors.warmSand,
    borderRadius: radius.md,
    ...shadows.soft,
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  profileInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  profileName: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 27,
  },
  profileUsername: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 21,
  },
  editLink: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 2,
  },
  cardContainer: {
    backgroundColor: colors.starlightWhite,
    borderRadius: radius.sm,
    ...shadows.soft,
    overflow: 'hidden',
    marginHorizontal: spacing.lg,
  },
  logoutButton: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.xxl,
    height: 48,
    borderRadius: radius.sm,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
  },
});
