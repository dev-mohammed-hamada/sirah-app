import React, { useRef, useCallback, useEffect } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing } from '../../theme';
import { JourneyStatusBar } from '../../components/journey/status-bar';
import { DailyBanner } from '../../components/journey/daily-banner';
import { StageNode, StageStatus } from '../../components/journey/stage-node';
import { StageDetailSheet, StageDetailData } from '../../components/journey/stage-detail-sheet';
import { StageFlowScreen } from './stage-flow-screen';
import { DailyChallengeScreen } from './daily-challenge-screen';
import { LinkRequestModal } from '../../components/link-request';

// ─── Mock Data (will come from API later) ────────────────────────
interface StageData {
  id: string;
  icon: string;
  label: string;
  description: string;
  status: StageStatus;
  starsEarned: number;
  bestScore: number;
  maxScore: number;
  attempts: number;
}

const MOCK_STAGES: StageData[] = [
  {
    id: '1',
    icon: '🐘',
    label: 'عام الفيل',
    description: 'اكتشف قصة عام الفيل وما حدث قبل ميلاد النبي ﷺ',
    status: 'completed',
    starsEarned: 3,
    bestScore: 95,
    maxScore: 100,
    attempts: 2,
  },
  {
    id: '2',
    icon: '✨',
    label: 'المولد والطفولة',
    description: 'تعرّف على ميلاد النبي ﷺ وطفولته المباركة',
    status: 'completed',
    starsEarned: 2,
    bestScore: 78,
    maxScore: 100,
    attempts: 1,
  },
  {
    id: '3',
    icon: '⛰️',
    label: 'الشباب والأخلاق',
    description: 'كيف نشأ النبي ﷺ وعُرف بالصادق الأمين',
    status: 'completed',
    starsEarned: 3,
    bestScore: 90,
    maxScore: 100,
    attempts: 3,
  },
  {
    id: '4',
    icon: '💍',
    label: 'الزواج من خديجة',
    description: 'قصة زواج النبي ﷺ من أم المؤمنين خديجة رضي الله عنها',
    status: 'completed',
    starsEarned: 2,
    bestScore: 72,
    maxScore: 100,
    attempts: 1,
  },
  {
    id: '5',
    icon: '📖',
    label: 'الوحي الأول',
    description: 'نزول الوحي في غار حراء وبداية الرسالة',
    status: 'current',
    starsEarned: 0,
    bestScore: 0,
    maxScore: 100,
    attempts: 0,
  },
  {
    id: '6',
    icon: '🤫',
    label: 'الدعوة السرية',
    description: 'بداية الدعوة سرًّا وأوائل المسلمين',
    status: 'locked',
    starsEarned: 0,
    bestScore: 0,
    maxScore: 100,
    attempts: 0,
  },
  {
    id: '7',
    icon: '📢',
    label: 'الجهر بالدعوة',
    description: 'الجهر بالدعوة ومواجهة قريش',
    status: 'locked',
    starsEarned: 0,
    bestScore: 0,
    maxScore: 100,
    attempts: 0,
  },
  {
    id: '8',
    icon: '🚢',
    label: 'الهجرة إلى الحبشة',
    description: 'هجرة المسلمين الأولى إلى الحبشة',
    status: 'locked',
    starsEarned: 0,
    bestScore: 0,
    maxScore: 100,
    attempts: 0,
  },
  {
    id: '9',
    icon: '🌙',
    label: 'الإسراء والمعراج',
    description: 'رحلة الإسراء والمعراج المباركة',
    status: 'locked',
    starsEarned: 0,
    bestScore: 0,
    maxScore: 100,
    attempts: 0,
  },
  {
    id: '10',
    icon: '🕌',
    label: 'الهجرة إلى المدينة',
    description: 'الهجرة النبوية إلى المدينة المنورة',
    status: 'locked',
    starsEarned: 0,
    bestScore: 0,
    maxScore: 100,
    attempts: 0,
  },
];

const MOCK_USER = {
  displayName: 'محمد',
  hearts: 5,
  streak: 7,
  xp: 340,
};

const MOCK_FATHER_NAME = 'أحمد محمد';

const SCREEN_WIDTH = Dimensions.get('window').width;

// ─── Stars (twinkling background dots) ───────────────────────────
const STARS = [
  { top: '3%', start: '15%', size: 3, delay: 0 },
  { top: '5%', start: '70%', size: 2, delay: 800 },
  { top: '8%', start: '45%', size: 2, delay: 1200 },
  { top: '12%', start: '85%', size: 3, delay: 400 },
  { top: '15%', start: '25%', size: 2, delay: 600 },
  { top: '18%', start: '60%', size: 3, delay: 200 },
  { top: '22%', start: '10%', size: 2, delay: 1000 },
  { top: '25%', start: '80%', size: 3, delay: 1400 },
] as const;

function StarDot({ size }: { size: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: colors.starlightWhite,
        opacity: 0.5,
      }}
    />
  );
}

// ─── Path connector between nodes ────────────────────────────────
function PathSegment({ completed }: { completed: boolean }) {
  return (
    <View style={styles.pathSegmentContainer}>
      <View style={[styles.pathSegment, completed && styles.pathSegmentCompleted]} />
    </View>
  );
}

export function JourneyMapScreen() {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [showDailyBanner, setShowDailyBanner] = React.useState(true);
  const [selectedStage, setSelectedStage] = React.useState<StageDetailData | null>(null);
  const [activeStageId, setActiveStageId] = React.useState<string | null>(null);
  const [showDailyChallenge, setShowDailyChallenge] = React.useState(false);
  // TODO: check pending requests via GET /users/link-requests on mount
  const [showLinkRequest, setShowLinkRequest] = React.useState(true);

  // Reverse stages for bottom-to-top display (earliest at bottom)
  const stagesBottomUp = [...MOCK_STAGES].reverse();

  // Find index of current stage in reversed array
  const currentStageIndex = stagesBottomUp.findIndex((s) => s.status === 'current');

  // Auto-scroll to current stage on mount
  useEffect(() => {
    if (currentStageIndex >= 0) {
      const scrollTarget = currentStageIndex * 110; // approximate row height
      setTimeout(() => {
        scrollRef.current?.scrollTo({ y: scrollTarget, animated: true });
      }, 800);
    }
  }, [currentStageIndex]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API refresh
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const handleStagePress = useCallback((stage: StageData) => {
    if (stage.status === 'locked') {
      // Locked stages don't open the sheet
      return;
    }
    setSelectedStage({
      id: stage.id,
      icon: stage.icon,
      label: stage.label,
      description: stage.description,
      status: stage.status,
      starsEarned: stage.starsEarned,
      maxStars: 3,
      bestScore: stage.bestScore,
      maxScore: stage.maxScore,
      attempts: stage.attempts,
    });
  }, []);

  const handleDismissSheet = useCallback(() => {
    setSelectedStage(null);
  }, []);

  const handleStartStage = useCallback((stageId: string) => {
    setSelectedStage(null);
    setActiveStageId(stageId);
  }, []);

  const handleDailyPress = useCallback(() => {
    setShowDailyChallenge(true);
  }, []);

  if (activeStageId) {
    return <StageFlowScreen stageId={activeStageId} onComplete={() => setActiveStageId(null)} />;
  }

  if (showDailyChallenge) {
    return <DailyChallengeScreen onBack={() => setShowDailyChallenge(false)} />;
  }

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[
          colors.deepNightBlue,
          colors.deepNightBlueMid,
          colors.royalPurple,
          colors.deepPurple,
          colors.warmBrown,
          colors.desertGold,
          colors.warmSand,
        ]}
        locations={[0, 0.25, 0.45, 0.55, 0.75, 0.9, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Twinkling stars in the top portion */}
      <View style={styles.starsContainer} pointerEvents="none">
        {STARS.map((star, i) => (
          <View
            key={i}
            style={{
              position: 'absolute',
              top: star.top,
              start: star.start,
            }}
          >
            <StarDot size={star.size} />
          </View>
        ))}
      </View>

      {/* Fixed status bar */}
      <View style={[styles.statusBarWrapper, { paddingTop: insets.top + spacing.sm }]}>
        <JourneyStatusBar
          displayName={MOCK_USER.displayName}
          hearts={MOCK_USER.hearts}
          streak={MOCK_USER.streak}
          xp={MOCK_USER.xp}
        />
      </View>

      {/* Scrollable journey path */}
      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 100, paddingBottom: insets.bottom + 80 },
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.desertGold}
            colors={[colors.desertGold]}
          />
        }
      >
        {/* Daily challenge banner */}
        {showDailyBanner && (
          <View style={styles.bannerWrapper}>
            <DailyBanner onPress={handleDailyPress} />
          </View>
        )}

        {/* Stage nodes in S-shape pattern */}
        {stagesBottomUp.map((stage, index) => {
          const isOddRow = index % 2 === 0;
          // Determine if the path segment below is completed
          const nextStage = stagesBottomUp[index + 1];
          const showPath = index < stagesBottomUp.length - 1;
          const pathCompleted = stage.status === 'completed' && nextStage?.status === 'completed';

          return (
            <View key={stage.id}>
              <View style={[styles.nodeRow, isOddRow ? styles.nodeRowEnd : styles.nodeRowStart]}>
                <StageNode
                  status={stage.status}
                  icon={stage.icon}
                  label={stage.label}
                  starsEarned={stage.starsEarned}
                  onPress={() => handleStagePress(stage)}
                />
              </View>
              {showPath && <PathSegment completed={pathCompleted} />}
            </View>
          );
        })}
      </ScrollView>

      {/* Stage Detail Bottom Sheet */}
      <StageDetailSheet
        stage={selectedStage}
        hearts={MOCK_USER.hearts}
        onDismiss={handleDismissSheet}
        onStartStage={handleStartStage}
      />

      <LinkRequestModal
        visible={showLinkRequest}
        fatherName={MOCK_FATHER_NAME}
        onAccept={() => setShowLinkRequest(false)}
        onDecline={() => setShowLinkRequest(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  starsContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  statusBarWrapper: {
    position: 'absolute',
    top: 0,
    start: 0,
    end: 0,
    zIndex: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 120,
  },
  bannerWrapper: {
    marginBottom: spacing.xxl,
  },
  nodeRow: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  nodeRowEnd: {
    justifyContent: 'flex-end',
    paddingEnd: SCREEN_WIDTH * 0.15,
  },
  nodeRowStart: {
    justifyContent: 'flex-start',
    paddingStart: SCREEN_WIDTH * 0.15,
  },
  pathSegmentContainer: {
    alignItems: 'center',
    height: 30,
  },
  pathSegment: {
    width: 3,
    height: 30,
    backgroundColor: colors.desertGoldGlow,
    borderRadius: 1.5,
  },
  pathSegmentCompleted: {
    backgroundColor: colors.desertGoldGlow70,
  },
});
