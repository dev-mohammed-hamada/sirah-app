import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { AppText } from '../ui/app-text';
import { colors, radius, shadows, spacing } from '../../theme';
import { fontFamily } from '../../theme/typography';
import { ar } from '../../i18n/ar';
import { toAr as toArabicNumeral } from '../../utils/arabic-numerals';

// ─── Mock data ────────────────────────────────────────────────────
const MOCK_RESULTS = [
  { id: '1', displayName: 'يوسف أحمد', username: 'youssef_99' },
  { id: '2', displayName: 'عمر خالد', username: 'omar_k' },
] as const;

const SCREEN_HEIGHT = Dimensions.get('window').height;

// ─── Types ────────────────────────────────────────────────────────
export interface LinkSonSheetProps {
  visible: boolean;
  onClose: () => void;
  onRequestSent: () => void;
}

interface MockResult {
  id: string;
  displayName: string;
  username: string;
}

// ─── Result row ───────────────────────────────────────────────────
function ResultRow({
  result,
  onSend,
  isLoading,
  isSent,
}: {
  result: MockResult;
  onSend: () => void;
  isLoading: boolean;
  isSent: boolean;
}) {
  const initials = result.displayName.trim().charAt(0);

  return (
    <View style={rowStyles.container}>
      <View style={rowStyles.avatarCircle}>
        <AppText style={rowStyles.avatarInitials} color={colors.deepNightBlue}>
          {initials}
        </AppText>
      </View>
      <View style={rowStyles.nameColumn}>
        <AppText style={rowStyles.displayName} color={colors.deepNightBlue}>
          {result.displayName}
        </AppText>
        <AppText style={rowStyles.username} color={colors.mutedGray}>
          {'@' + result.username}
        </AppText>
      </View>
      <TouchableOpacity
        style={[rowStyles.sendButton, isSent && rowStyles.sendButtonSent]}
        onPress={onSend}
        disabled={isLoading || isSent}
        activeOpacity={0.8}
      >
        <AppText style={rowStyles.sendButtonText} color={colors.starlightWhite}>
          {isSent ? ar.father.requestSent : isLoading ? '...' : ar.father.sendRequest}
        </AppText>
      </TouchableOpacity>
    </View>
  );
}

const rowStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.desertGoldGlowSubtle,
    borderWidth: 1.5,
    borderColor: colors.desertGold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    lineHeight: 20,
  },
  nameColumn: {
    flex: 1,
    gap: 2,
  },
  displayName: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'right',
  },
  username: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'right',
  },
  sendButton: {
    backgroundColor: colors.desertGold,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.md,
    minWidth: 90,
    alignItems: 'center',
  },
  sendButtonSent: {
    backgroundColor: colors.successGreen,
  },
  sendButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
  },
});

// ─── Link Son Sheet ───────────────────────────────────────────────
export function LinkSonSheet({ visible, onClose, onRequestSent }: LinkSonSheetProps) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [sentIds, setSentIds] = useState<Set<string>>(new Set());
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      backdropOpacity.value = withTiming(1, { duration: 300 });
    } else {
      backdropOpacity.value = withTiming(0, { duration: 300 });
      // Reset state on close
      setQuery('');
      setShowResults(false);
      setSentIds(new Set());
      setLoadingId(null);
    }
  }, [visible, backdropOpacity]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const handleQueryChange = (text: string) => {
    setQuery(text);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    if (text.length >= 3) {
      debounceRef.current = setTimeout(() => {
        setShowResults(true);
      }, 500);
    } else {
      setShowResults(false);
    }
  };

  const handleSend = (id: string) => {
    setLoadingId(id);
    setTimeout(() => {
      setLoadingId(null);
      setSentIds((prev) => new Set([...prev, id]));
      setTimeout(() => {
        onRequestSent();
        onClose();
      }, 1500);
    }, 800);
  };

  const filteredResults = MOCK_RESULTS.filter(
    (r) => r.username.toLowerCase().includes(query.toLowerCase()) || r.displayName.includes(query),
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[StyleSheet.absoluteFill, styles.backdrop, backdropStyle]} />
      </TouchableWithoutFeedback>

      {/* Sheet */}
      {visible && (
        <Animated.View
          entering={SlideInDown.duration(400).springify().damping(18)}
          exiting={SlideOutDown.duration(300)}
          style={styles.sheet}
        >
          {/* Handle bar */}
          <View style={styles.handleBar} />

          {/* Title */}
          <AppText style={styles.title} color={colors.deepNightBlue}>
            {ar.father.linkNewSon}
          </AppText>

          {/* Search input */}
          <TextInput
            style={styles.input}
            placeholder={ar.father.searchUsername}
            placeholderTextColor={colors.mutedGray}
            value={query}
            onChangeText={handleQueryChange}
            autoCapitalize="none"
            autoCorrect={false}
            textAlign="right"
          />

          {/* Results */}
          {showResults && (
            <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(150)}>
              {filteredResults.length > 0 ? (
                <View style={styles.resultsList}>
                  {filteredResults.map((result) => (
                    <ResultRow
                      key={result.id}
                      result={result}
                      onSend={() => handleSend(result.id)}
                      isLoading={loadingId === result.id}
                      isSent={sentIds.has(result.id)}
                    />
                  ))}
                </View>
              ) : (
                <View style={styles.noResults}>
                  <AppText style={styles.noResultsText} color={colors.mutedGray}>
                    {ar.father.noResults}
                  </AppText>
                </View>
              )}
            </Animated.View>
          )}
        </Animated.View>
      )}
    </Modal>
  );
}

const SHEET_HEIGHT = SCREEN_HEIGHT * 0.6;

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: colors.overlayDark,
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    start: 0,
    end: 0,
    height: SHEET_HEIGHT,
    backgroundColor: colors.starlightWhite,
    borderTopStartRadius: radius.xxl,
    borderTopEndRadius: radius.xxl,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
    ...shadows.strong,
  },
  handleBar: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.mutedGray,
    alignSelf: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  input: {
    height: 48,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.mutedGrayLight,
    paddingHorizontal: spacing.md,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colors.deepNightBlue,
    backgroundColor: colors.softCream,
    textAlign: 'right',
  },
  resultsList: {
    marginTop: spacing.md,
    gap: spacing.xs,
  },
  noResults: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  noResultsText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
});
