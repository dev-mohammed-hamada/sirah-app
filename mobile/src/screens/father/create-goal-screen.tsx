import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppText } from '../../components/ui/app-text';
import { PrimaryButton } from '../../components/ui/primary-button';
import { colors, radius, shadows, spacing } from '../../theme';
import { fontFamily } from '../../theme/typography';
import { ar } from '../../i18n/ar';
import type { FatherGoalsStackParamList } from '../../app/navigation/types';

// ─── Arabic numeral helper ─────────────────────────────────────────
function toAr(n: number): string {
  return String(n).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[+d]);
}

// ─── Format date in Arabic ─────────────────────────────────────────
const ARABIC_MONTHS = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
];

function formatDateAr(date: Date): string {
  const day = toAr(date.getDate());
  const month = ARABIC_MONTHS[date.getMonth()];
  const year = toAr(date.getFullYear());
  return `${day} ${month} ${year}`;
}

function daysFromNow(date: Date): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

// ─── Mock sons ─────────────────────────────────────────────────────
interface SonChip {
  id: string;
  displayName: string;
  initials: string;
}

const MOCK_SONS: SonChip[] = [
  { id: '1', displayName: 'محمد', initials: 'م' },
  { id: '2', displayName: 'عبدالله', initials: 'ع' },
];

// ─── Progress Bar Preview ──────────────────────────────────────────
function PreviewProgressBar() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(0, { duration: 0 });
  }, [progress]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={previewBarStyles.track}>
      <Animated.View style={[previewBarStyles.fill, fillStyle]} />
    </View>
  );
}

const previewBarStyles = StyleSheet.create({
  track: {
    height: 6,
    backgroundColor: colors.mutedGrayLight,
    borderRadius: radius.full,
    overflow: 'hidden',
    marginTop: spacing.sm,
  },
  fill: {
    height: '100%',
    backgroundColor: colors.desertGold,
    borderRadius: radius.full,
  },
});

// ─── Son Chip ──────────────────────────────────────────────────────
interface SonChipItemProps {
  son: SonChip;
  selected: boolean;
  onPress: () => void;
  index: number;
}

function SonChipItem({ son, selected, onPress, index }: SonChipItemProps) {
  const borderWidth = useSharedValue(selected ? 3 : 1);
  const checkScale = useSharedValue(selected ? 1 : 0);

  useEffect(() => {
    borderWidth.value = withTiming(selected ? 3 : 1, { duration: 150 });
    checkScale.value = withSpring(selected ? 1 : 0, { damping: 12, stiffness: 200 });
  }, [selected, borderWidth, checkScale]);

  const avatarStyle = useAnimatedStyle(() => ({
    borderWidth: borderWidth.value,
    borderColor: selected ? colors.desertGold : colors.mutedGrayLight,
    backgroundColor: selected ? colors.desertGoldGlowSubtle : colors.mutedGraySubtle,
  }));

  const checkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
    opacity: checkScale.value,
  }));

  return (
    <Animated.View entering={FadeInRight.delay(index * 150).duration(300)}>
      <TouchableOpacity onPress={onPress} style={chipStyles.chip} activeOpacity={0.75}>
        <View>
          <Animated.View style={[chipStyles.avatar, avatarStyle]}>
            <AppText style={chipStyles.initials} color={colors.deepNightBlue}>
              {son.initials}
            </AppText>
          </Animated.View>
          <Animated.View style={[chipStyles.checkBadge, checkStyle]}>
            <AppText style={chipStyles.checkText} color={colors.starlightWhite}>
              ✓
            </AppText>
          </Animated.View>
        </View>
        <AppText style={chipStyles.name} color={colors.deepNightBlue}>
          {son.displayName}
        </AppText>
      </TouchableOpacity>
    </Animated.View>
  );
}

const chipStyles = StyleSheet.create({
  chip: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
  },
  checkBadge: {
    position: 'absolute',
    top: -2,
    end: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.desertGold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    fontFamily: fontFamily.bold,
    fontSize: 10,
    lineHeight: 14,
    textAlign: 'center',
  },
  name: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
});

// ─── Discard Modal ─────────────────────────────────────────────────
interface DiscardModalProps {
  visible: boolean;
  onDiscard: () => void;
  onContinue: () => void;
}

function DiscardModal({ visible, onDiscard, onContinue }: DiscardModalProps) {
  return (
    <Modal transparent visible={visible} animationType="slide" statusBarTranslucent>
      <View style={discardStyles.overlay}>
        <TouchableOpacity style={discardStyles.backdrop} onPress={onContinue} activeOpacity={1} />
        <View style={discardStyles.sheet}>
          <View style={discardStyles.handle} />
          <AppText style={discardStyles.title} color={colors.deepNightBlue}>
            {ar.father.discardTitle}
          </AppText>
          <AppText style={discardStyles.subtitle} color={colors.mutedGray}>
            {ar.father.discardSubtitle}
          </AppText>
          <View style={discardStyles.actions}>
            <TouchableOpacity onPress={onDiscard} style={discardStyles.discardBtn}>
              <AppText style={discardStyles.discardText} color={colors.errorRed}>
                {ar.father.discardConfirm}
              </AppText>
            </TouchableOpacity>
            <PrimaryButton
              title={ar.father.continueEditing}
              onPress={onContinue}
              style={discardStyles.continueBtn}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const discardStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlayMedium,
  },
  sheet: {
    backgroundColor: colors.starlightWhite,
    borderTopStartRadius: radius.md,
    borderTopEndRadius: radius.md,
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxxl,
    gap: spacing.md,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.mutedGrayLight,
    alignSelf: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
  actions: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  discardBtn: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discardText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  continueBtn: {},
});

// ─── Simple Date Picker Modal ──────────────────────────────────────
interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (date: Date) => void;
  minDate: Date;
  currentDate: Date | null;
}

function DatePickerModal({ visible, onClose, onConfirm, minDate }: DatePickerModalProps) {
  const today = new Date();
  const [selectedOffset, setSelectedOffset] = useState(1); // days from today

  const OFFSETS = [1, 3, 7, 14, 30, 60, 90];

  return (
    <Modal transparent visible={visible} animationType="slide" statusBarTranslucent>
      <View style={dpStyles.overlay}>
        <TouchableOpacity style={dpStyles.backdrop} onPress={onClose} activeOpacity={1} />
        <View style={dpStyles.sheet}>
          <View style={dpStyles.handle} />
          <AppText style={dpStyles.title} color={colors.deepNightBlue}>
            {ar.father.deadlineLabel}
          </AppText>
          <View style={dpStyles.optionsGrid}>
            {OFFSETS.map((offset) => {
              const date = new Date(today);
              date.setDate(today.getDate() + offset);
              const isMin = date < minDate;
              const isSelected = selectedOffset === offset;
              return (
                <TouchableOpacity
                  key={offset}
                  style={[
                    dpStyles.option,
                    isSelected && dpStyles.optionSelected,
                    isMin && dpStyles.optionDisabled,
                  ]}
                  onPress={() => !isMin && setSelectedOffset(offset)}
                  activeOpacity={0.75}
                >
                  <AppText
                    style={dpStyles.optionLabel}
                    color={isSelected ? colors.deepNightBlue : colors.mutedGray}
                  >
                    {`${ar.father.daysFromNow.replace('{days}', toAr(offset))}`}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
          <PrimaryButton
            title={ar.confirm}
            onPress={() => {
              const date = new Date(today);
              date.setDate(today.getDate() + selectedOffset);
              onConfirm(date);
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const dpStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlayMedium,
  },
  sheet: {
    backgroundColor: colors.starlightWhite,
    borderTopStartRadius: radius.md,
    borderTopEndRadius: radius.md,
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxxl,
    gap: spacing.md,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.mutedGrayLight,
    alignSelf: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'center',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  option: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.mutedGrayLight,
  },
  optionSelected: {
    backgroundColor: colors.desertGold,
    borderColor: colors.desertGold,
  },
  optionDisabled: {
    opacity: 0.4,
  },
  optionLabel: {
    fontFamily: fontFamily.medium,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
});

// ─── Form field wrapper ────────────────────────────────────────────
interface FieldWrapperProps {
  label: string;
  children: React.ReactNode;
}

function FieldWrapper({ label, children }: FieldWrapperProps) {
  return (
    <View style={fieldStyles.wrapper}>
      <AppText style={fieldStyles.label} color={colors.mutedGray}>
        {label}
      </AppText>
      {children}
    </View>
  );
}

const fieldStyles = StyleSheet.create({
  wrapper: {
    gap: spacing.xs,
  },
  label: {
    fontFamily: fontFamily.bold,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'right',
    paddingHorizontal: spacing.lg,
  },
});

// ─── Props ─────────────────────────────────────────────────────────
type CreateGoalScreenProps = NativeStackScreenProps<FatherGoalsStackParamList, 'CreateGoal'>;

// ─── Create Goal Screen ────────────────────────────────────────────
export function CreateGoalScreen({ navigation, route }: CreateGoalScreenProps) {
  const insets = useSafeAreaInsets();
  const initialSonId = route.params?.sonId ?? null;

  const [selectedSonId, setSelectedSonId] = useState<string | null>(initialSonId);
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [reward, setReward] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  const isDirty =
    description.length > 0 || deadline !== null || reward.length > 0 || selectedSonId !== null;
  const isFormValid =
    selectedSonId !== null &&
    description.trim().length > 0 &&
    deadline !== null &&
    reward.trim().length > 0;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const handleBack = () => {
    if (isDirty) {
      setShowDiscardModal(true);
    } else {
      navigation.goBack();
    }
  };

  const handleDiscard = () => {
    setShowDiscardModal(false);
    navigation.goBack();
  };

  const handleSubmit = () => {
    // TODO: wire to POST /goals when API is ready
    navigation.goBack();
  };

  const deadlineLabel = deadline ? formatDateAr(deadline) : ar.father.deadlinePlaceholder;
  const daysAway = deadline ? daysFromNow(deadline) : null;
  const descCounterColor = description.length > 180 ? colors.sunsetOrange : colors.mutedGray;
  const rewardCounterColor = reward.length > 90 ? colors.sunsetOrange : colors.mutedGray;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        {/* Submit text button (start side in RTL = visual left) */}
        <TouchableOpacity
          onPress={isFormValid ? handleSubmit : undefined}
          style={styles.headerSubmitBtn}
          activeOpacity={0.75}
        >
          <AppText
            style={[styles.submitText, !isFormValid && styles.submitTextDisabled]}
            color={isFormValid ? colors.desertGold : colors.mutedGray}
          >
            {ar.father.createGoalSubmit}
          </AppText>
        </TouchableOpacity>

        <AppText style={styles.headerTitle} color={colors.deepNightBlue}>
          {ar.father.newGoalTitle}
        </AppText>

        {/* Back arrow (end side = visual right in RTL, points right → ) */}
        <TouchableOpacity onPress={handleBack} style={styles.backBtn} activeOpacity={0.75}>
          <AppText style={styles.backArrow} color={colors.mutedGray}>
            {'›'}
          </AppText>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 80 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* 1. Select Son */}
          <FieldWrapper label={ar.father.selectSon}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipsRow}
              style={styles.chipsScroll}
            >
              {MOCK_SONS.map((son, index) => (
                <SonChipItem
                  key={son.id}
                  son={son}
                  selected={selectedSonId === son.id}
                  onPress={() => setSelectedSonId(son.id)}
                  index={index}
                />
              ))}
            </ScrollView>
          </FieldWrapper>

          {/* 2. Goal Description */}
          <FieldWrapper label={ar.father.goalDescLabel}>
            <View style={styles.textareaWrapper}>
              <TextInput
                style={styles.textarea}
                placeholder={ar.father.goalDescPlaceholder}
                placeholderTextColor={colors.mutedGray}
                value={description}
                onChangeText={(t) => setDescription(t.slice(0, 200))}
                multiline
                numberOfLines={4}
                maxLength={200}
                textAlign="right"
                textAlignVertical="top"
              />
              <AppText style={[styles.counter, { color: descCounterColor }]}>
                {`${toAr(description.length)}/٢٠٠`}
              </AppText>
            </View>
          </FieldWrapper>

          {/* 3. Stage Group (non-interactive, pre-selected) */}
          <FieldWrapper label={ar.father.stageGroupLabel}>
            <View style={styles.stageGroupCard}>
              <AppText style={styles.stageGroupName} color={colors.deepNightBlue}>
                {ar.father.stageGroupNameV1}
              </AppText>
              <AppText style={styles.stageGroupMeta} color={colors.mutedGray}>
                {ar.father.stageGroupStagesCount}
              </AppText>
              <AppText style={styles.stageGroupPreview} color={colors.mutedGray}>
                {ar.father.stageGroupPreviewV1}
              </AppText>
            </View>
          </FieldWrapper>

          {/* 4. Deadline */}
          <FieldWrapper label={ar.father.deadlineLabel}>
            <TouchableOpacity
              style={styles.inputRow}
              onPress={() => setShowDatePicker(true)}
              activeOpacity={0.75}
            >
              <AppText
                style={[styles.inputText, !deadline && styles.placeholderText]}
                color={deadline ? colors.deepNightBlue : colors.mutedGray}
              >
                {deadlineLabel}
              </AppText>
              <AppText style={styles.inputPrefix}>{'📅'}</AppText>
            </TouchableOpacity>
            {daysAway !== null && daysAway > 0 && (
              <AppText style={styles.daysFromNow} color={colors.desertGold}>
                {ar.father.daysFromNow.replace('{days}', toAr(daysAway))}
              </AppText>
            )}
          </FieldWrapper>

          {/* 5. Reward */}
          <FieldWrapper label={ar.father.rewardLabel}>
            <View style={styles.rewardInputWrapper}>
              <TextInput
                style={styles.rewardInput}
                placeholder={ar.father.rewardPlaceholder}
                placeholderTextColor={colors.mutedGray}
                value={reward}
                onChangeText={(t) => setReward(t.slice(0, 100))}
                maxLength={100}
                textAlign="right"
              />
              <AppText style={styles.rewardSuffix}>{'🏆'}</AppText>
            </View>
            <AppText
              style={[styles.counter, { color: rewardCounterColor, paddingHorizontal: spacing.lg }]}
            >
              {`${toAr(reward.length)}/١٠٠`}
            </AppText>
          </FieldWrapper>

          {/* Live Preview Card */}
          <View style={styles.previewSection}>
            <AppText style={styles.previewLabel} color={colors.mutedGray}>
              {ar.father.previewLabel}
            </AppText>
            <View style={styles.previewCard}>
              <AppText
                style={[styles.previewDescription, !description && styles.previewPlaceholder]}
                color={description ? colors.deepNightBlue : colors.mutedGray}
              >
                {description || ar.father.previewDescPlaceholder}
              </AppText>
              <PreviewProgressBar />
              <View style={styles.previewMeta}>
                {deadline && (
                  <AppText style={styles.previewMetaText} color={colors.deepNightBlue}>
                    {`⏰ ${formatDateAr(deadline)}`}
                  </AppText>
                )}
                {reward.length > 0 && (
                  <AppText style={styles.previewMetaText} color={colors.desertGold}>
                    {`🏆 ${reward}`}
                  </AppText>
                )}
              </View>
              <AppText style={styles.previewFrom} color={colors.mutedGray}>
                {ar.father.previewFrom}
              </AppText>
            </View>
          </View>

          {/* Submit Button */}
          <View style={styles.submitWrapper}>
            <PrimaryButton
              title={ar.father.submitGoal}
              onPress={handleSubmit}
              disabled={!isFormValid}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Date Picker Modal */}
      <DatePickerModal
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onConfirm={(date) => {
          setDeadline(date);
          setShowDatePicker(false);
        }}
        minDate={tomorrow}
        currentDate={deadline}
      />

      {/* Discard Confirmation Modal */}
      <DiscardModal
        visible={showDiscardModal}
        onDiscard={handleDiscard}
        onContinue={() => setShowDiscardModal(false)}
      />
    </SafeAreaView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.softCream,
  },
  flex: {
    flex: 1,
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
    fontFamily: fontFamily.bold,
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'center',
    flex: 1,
  },
  headerSubmitBtn: {
    width: 48,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
  },
  submitTextDisabled: {
    opacity: 0.4,
  },
  backBtn: {
    width: 48,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    lineHeight: 28,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: spacing.lg,
    gap: spacing.xl,
  },
  chipsScroll: {
    flexGrow: 0,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  textareaWrapper: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.starlightWhite,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.mutedGrayLight,
    padding: spacing.md,
    gap: spacing.xs,
    ...shadows.soft,
  },
  textarea: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colors.deepNightBlue,
    minHeight: 100,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  counter: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'right',
  },
  stageGroupCard: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.starlightWhite,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.desertGold,
    padding: spacing.md,
    gap: spacing.xs,
    ...shadows.soft,
  },
  stageGroupName: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'right',
  },
  stageGroupMeta: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'right',
  },
  stageGroupPreview: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'right',
  },
  inputRow: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.starlightWhite,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.mutedGrayLight,
    paddingHorizontal: spacing.md,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.soft,
  },
  inputText: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 21,
    flex: 1,
    textAlign: 'right',
  },
  placeholderText: {
    color: colors.mutedGray,
  },
  inputPrefix: {
    fontSize: 16,
    lineHeight: 20,
    marginStart: spacing.sm,
  },
  daysFromNow: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'right',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xs,
  },
  rewardInputWrapper: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.starlightWhite,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.mutedGrayLight,
    paddingHorizontal: spacing.md,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.soft,
  },
  rewardInput: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colors.deepNightBlue,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  rewardSuffix: {
    fontSize: 16,
    lineHeight: 20,
    marginEnd: spacing.xs,
  },
  previewSection: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  previewLabel: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'right',
    paddingHorizontal: spacing.lg,
  },
  previewCard: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.warmSand,
    borderRadius: radius.md,
    padding: spacing.lg,
    borderEndWidth: 3,
    borderEndColor: colors.desertGold,
    ...shadows.soft,
    gap: spacing.xs,
  },
  previewDescription: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'right',
  },
  previewPlaceholder: {
    fontFamily: fontFamily.regular,
    opacity: 0.5,
  },
  previewMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  previewMetaText: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 20,
  },
  previewFrom: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'right',
    marginTop: spacing.xs,
  },
  submitWrapper: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.sm,
  },
});
