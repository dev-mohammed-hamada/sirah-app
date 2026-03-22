import React, { useState } from 'react';
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { AppText } from '../../components/ui/app-text';
import { PrimaryButton } from '../../components/ui/primary-button';
import { SonCard, LinkSonSheet } from '../../components/father';
import { colors, radius, shadows, spacing } from '../../theme';
import { fontFamily } from '../../theme/typography';
import { ar } from '../../i18n/ar';
import { SonProgressScreen } from './son-progress-screen';

// ─── Arabic numeral helper ────────────────────────────────────────
function toArabicNumeral(n: number): string {
  return String(n).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
}

// ─── Mock Data ────────────────────────────────────────────────────
const MOCK_FATHER = {
  displayName: 'أحمد محمد',
  username: 'ahmed_father',
} as const;

const MOCK_SONS = [
  {
    id: '1',
    displayName: 'محمد أحمد',
    username: 'mohammed_123',
    streak: 7,
    stars: 18,
    xp: 340,
    stagesCompleted: 4,
    totalStages: 10,
    isActiveToday: true,
  },
  {
    id: '2',
    displayName: 'عبدالله أحمد',
    username: 'abdullah_456',
    streak: 3,
    stars: 8,
    xp: 120,
    stagesCompleted: 2,
    totalStages: 10,
    isActiveToday: false,
    lastActiveText: ar.father.yesterday,
  },
] as const;

// ─── Father Avatar ────────────────────────────────────────────────
function FatherAvatar({ displayName }: { displayName: string }) {
  const initials = displayName.trim().charAt(0);
  return (
    <View style={avatarStyles.circle}>
      <AppText style={avatarStyles.initials} color={colors.deepNightBlue}>
        {initials}
      </AppText>
    </View>
  );
}

const avatarStyles = StyleSheet.create({
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.desertGoldGlowSubtle,
    borderWidth: 2,
    borderColor: colors.desertGold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    lineHeight: 20,
  },
});

// ─── Empty State ──────────────────────────────────────────────────
function EmptyState({ onLinkSon }: { onLinkSon: () => void }) {
  return (
    <Animated.View entering={FadeIn.duration(400)} style={emptyStyles.container}>
      {/* Narrator silhouette — faceless geometric shape */}
      <View style={emptyStyles.silhouetteWrapper}>
        <View style={emptyStyles.silhouetteHead} />
        <View style={emptyStyles.silhouetteBody} />
      </View>

      <AppText variant="h3" color={colors.deepNightBlue} style={emptyStyles.title}>
        {ar.father.addSon}
      </AppText>
      <AppText variant="body" color={colors.mutedGray} style={emptyStyles.desc}>
        {ar.father.addSonDesc}
      </AppText>
      <PrimaryButton title={ar.father.linkSon} onPress={onLinkSon} style={emptyStyles.button} />
    </Animated.View>
  );
}

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxxl,
    gap: spacing.lg,
  },
  silhouetteWrapper: {
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  silhouetteHead: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.deepNightBlueSubtle,
  },
  silhouetteBody: {
    width: 64,
    height: 80,
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    backgroundColor: colors.deepNightBlueSubtle,
    marginTop: 4,
  },
  title: {
    textAlign: 'center',
  },
  desc: {
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    marginTop: spacing.sm,
  },
});

// ─── FAB ──────────────────────────────────────────────────────────
function FloatingActionButton({
  onPress,
  bottomOffset,
}: {
  onPress: () => void;
  bottomOffset: number;
}) {
  const scale = useSharedValue(0);

  React.useEffect(() => {
    scale.value = withDelay(
      300,
      withSequence(
        withSpring(1.1, { damping: 10, stiffness: 200 }),
        withSpring(1, { damping: 12, stiffness: 180 }),
      ),
    );
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[fabStyles.container, { bottom: bottomOffset + spacing.lg }, animatedStyle]}
    >
      <TouchableOpacity style={fabStyles.button} onPress={onPress} activeOpacity={0.85}>
        <AppText style={fabStyles.icon} color={colors.starlightWhite}>
          +
        </AppText>
      </TouchableOpacity>
    </Animated.View>
  );
}

const fabStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    end: spacing.lg,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.desertGold,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.medium,
  },
  icon: {
    fontFamily: fontFamily.bold,
    fontSize: 28,
    lineHeight: 34,
    textAlign: 'center',
    marginTop: -2,
  },
});

// ─── Father Home Screen ───────────────────────────────────────────
export function FatherHomeScreen() {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [linkSheetVisible, setLinkSheetVisible] = useState(false);
  const [selectedSonId, setSelectedSonId] = useState<string | null>(null);

  const hasSons = MOCK_SONS.length > 0;

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  const handleSonPress = (sonId: string) => {
    setSelectedSonId(sonId);
  };

  const handleRequestSent = () => {
    // TODO: Show toast or refresh list
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <FatherAvatar displayName={MOCK_FATHER.displayName} />
        <AppText variant="h2" color={colors.deepNightBlue} style={styles.headerTitle}>
          {ar.father.mySons}
        </AppText>
        {/* Spacer to balance avatar */}
        <View style={styles.headerSpacer} />
      </View>

      {hasSons ? (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom + 90 }]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={colors.desertGold}
              colors={[colors.desertGold]}
            />
          }
        >
          {MOCK_SONS.map((son, index) => (
            <SonCard
              key={son.id}
              displayName={son.displayName}
              username={son.username}
              streak={son.streak}
              stars={son.stars}
              xp={son.xp}
              stagesCompleted={son.stagesCompleted}
              totalStages={son.totalStages}
              isActiveToday={son.isActiveToday}
              lastActiveText={'lastActiveText' in son ? son.lastActiveText : undefined}
              onPress={() => handleSonPress(son.id)}
              enterDelay={index * 100}
            />
          ))}
        </ScrollView>
      ) : (
        <EmptyState onLinkSon={() => setLinkSheetVisible(true)} />
      )}

      {/* FAB: always visible when sons exist */}
      {hasSons && (
        <FloatingActionButton
          onPress={() => setLinkSheetVisible(true)}
          bottomOffset={insets.bottom}
        />
      )}

      {/* Link Son Sheet */}
      <LinkSonSheet
        visible={linkSheetVisible}
        onClose={() => setLinkSheetVisible(false)}
        onRequestSent={handleRequestSent}
      />

      {/* Son Progress Detail — shown when a son card is tapped */}
      {selectedSonId !== null && (
        <View style={StyleSheet.absoluteFillObject}>
          <SonProgressScreen
            sonId={selectedSonId}
            onBack={() => setSelectedSonId(null)}
            onCreateGoal={() => {
              Alert.alert(ar.father.createNewGoal, 'قريباً');
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.softCream,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.mutedGrayLight,
  },
  headerTitle: {
    textAlign: 'center',
    flex: 1,
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.md,
  },
});
