import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme';
import { AppText } from '../../components/ui/app-text';
import { PrimaryButton } from '../../components/ui/primary-button';
import { ar } from '../../i18n/ar';
import { NarratorWelcomeScreen } from './narrator-welcome-screen';
import { StoryPanelScreen } from './story-panel-screen';

// ─── Mock Stage Content (will come from API) ─────────────────────
interface StageContent {
  id: string;
  number: number;
  icon: string;
  label: string;
  panels: string[];
}

const MOCK_STAGES: Record<string, StageContent> = {
  '1': {
    id: '1',
    number: 1,
    icon: '🐘',
    label: 'عام الفيل',
    panels: [
      'في ذلك العام، جاء أبرهة الحبشي بجيشه العظيم من اليمن يريد هدم الكعبة المشرفة. كان معه فيلة ضخمة لم يرها العرب من قبل.',
      'خرج عبدالمطلب جد النبي ﷺ وطلب من أبرهة إعادة إبله التي أخذها الجيش. فقال أبرهة متعجبًا: تسألني عن إبلك ولا تسألني عن الكعبة؟ فقال عبدالمطلب: أنا رب الإبل، وللبيت رب يحميه.',
      'أرسل الله طيورًا أبابيل ترمي جيش أبرهة بحجارة من سجيل. فهلك الجيش ونجت الكعبة بحماية الله. وفي هذا العام المبارك وُلد النبي محمد ﷺ.',
    ],
  },
  '2': {
    id: '2',
    number: 2,
    icon: '✨',
    label: 'المولد والطفولة',
    panels: [
      'وُلد النبي محمد ﷺ في مكة المكرمة يوم الاثنين من ربيع الأول. فرح جده عبدالمطلب فرحًا شديدًا وسماه محمدًا.',
      'أرضعته حليمة السعدية في بادية بني سعد. وكان النبي ﷺ ينمو بسرعة ويتميز عن أقرانه بالأخلاق الحميدة.',
      'توفيت أمه آمنة وهو في السادسة من عمره، ثم كفله جده عبدالمطلب، وبعد وفاته تولى عمه أبو طالب رعايته.',
    ],
  },
  '3': {
    id: '3',
    number: 3,
    icon: '⛰️',
    label: 'الشباب والأخلاق',
    panels: [
      'نشأ النبي ﷺ في رعاية عمه أبي طالب. عمل في رعي الغنم ليتعلم الصبر والمسؤولية منذ صغره.',
      'عُرف بين قومه بالصادق الأمين. كان الناس يثقون به ويودعون عنده أماناتهم لصدقه وأمانته.',
      'شارك في حلف الفضول الذي تعاهد فيه شباب قريش على نصرة المظلوم. وكان ﷺ يفخر بمشاركته فيه حتى بعد البعثة.',
    ],
  },
  '4': {
    id: '4',
    number: 4,
    icon: '💍',
    label: 'الزواج من خديجة',
    panels: [
      'عملت السيدة خديجة رضي الله عنها في التجارة وكانت من أشرف نساء قريش. سمعت بأمانة محمد ﷺ فعرضت عليه أن يتاجر بمالها.',
      'سافر النبي ﷺ بتجارة خديجة إلى الشام ورجع بأرباح عظيمة. أُعجبت خديجة بأخلاقه وأمانته فعرضت عليه الزواج.',
      'تزوج النبي ﷺ من خديجة وكان عمره خمسًا وعشرين سنة. كانت خديجة أول من آمن به وأعظم سند له في حياته.',
    ],
  },
  '5': {
    id: '5',
    number: 5,
    icon: '📖',
    label: 'الوحي الأول',
    panels: [
      'كان النبي ﷺ يحب الخلوة والتفكر. فكان يذهب إلى غار حراء في جبل النور ليتعبد الله ويتأمل في خلقه.',
      'في ليلة من ليالي رمضان نزل جبريل عليه السلام على النبي ﷺ في غار حراء وقال له: اقرأ. فقال: ما أنا بقارئ. فضمه ثلاثًا ثم قال: اقرأ باسم ربك الذي خلق.',
      'رجع النبي ﷺ إلى خديجة خائفًا يرتجف وقال: زملوني زملوني. فطمأنته خديجة وقالت: والله لا يخزيك الله أبدًا. ثم ذهبت به إلى ورقة بن نوفل الذي بشره بأنه نبي هذه الأمة.',
    ],
  },
};

// ─── Flow Step Types ─────────────────────────────────────────────
type FlowStep =
  | { type: 'narrator' }
  | { type: 'panel'; panelIndex: number }
  | { type: 'question'; questionIndex: number }
  | { type: 'finalQuiz' };

function buildFlowSteps(panelCount: number, inlineQuestionCount: number): FlowStep[] {
  const steps: FlowStep[] = [{ type: 'narrator' }];

  for (let i = 0; i < panelCount; i++) {
    steps.push({ type: 'panel', panelIndex: i });
    // Add inline question after panels (except the last one)
    if (i < inlineQuestionCount) {
      steps.push({ type: 'question', questionIndex: i });
    }
  }

  steps.push({ type: 'finalQuiz' });
  return steps;
}

// ─── Props ───────────────────────────────────────────────────────
interface StageFlowScreenProps {
  stageId: string;
  onComplete: () => void;
}

export function StageFlowScreen({ stageId, onComplete }: StageFlowScreenProps) {
  const stage = MOCK_STAGES[stageId];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [hearts, setHearts] = useState(5);

  if (!stage) return null;

  // Build the flow: narrator → panel1 → q1 → panel2 → q2 → panel3 → finalQuiz
  // For now, 2 inline questions (after panel 1 and 2)
  const flowSteps = buildFlowSteps(stage.panels.length, 2);
  const currentStep = flowSteps[currentStepIndex];
  const totalSteps = flowSteps.length;

  const handleNext = useCallback(() => {
    if (currentStepIndex < flowSteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  }, [currentStepIndex, flowSteps.length, onComplete]);

  // ─── Render current step ─────────────────────────────────────
  if (currentStep.type === 'narrator') {
    return (
      <NarratorWelcomeScreen
        stageId={stage.id}
        stageNumber={stage.number}
        onContinue={handleNext}
      />
    );
  }

  if (currentStep.type === 'panel') {
    return (
      <StoryPanelScreen
        stageLabel={stage.label}
        stageIcon={stage.icon}
        panelText={stage.panels[currentStep.panelIndex]}
        panelIndex={currentStep.panelIndex}
        totalSteps={totalSteps}
        currentStep={currentStepIndex}
        hearts={hearts}
        maxHearts={5}
        onNext={handleNext}
      />
    );
  }

  if (currentStep.type === 'question') {
    // Placeholder for inline questions (Task 07)
    return (
      <View style={placeholderStyles.root}>
        <View style={placeholderStyles.center}>
          <AppText style={placeholderStyles.text}>سؤال {currentStep.questionIndex + 1}</AppText>
          <AppText style={placeholderStyles.subtext}>(سيتم بناؤه في المهمة ٧)</AppText>
          <View style={placeholderStyles.button}>
            <PrimaryButton title={ar.next} onPress={handleNext} />
          </View>
        </View>
      </View>
    );
  }

  if (currentStep.type === 'finalQuiz') {
    // Placeholder for final quiz (Task 08)
    return (
      <View style={placeholderStyles.root}>
        <View style={placeholderStyles.center}>
          <AppText style={placeholderStyles.text}>الاختبار النهائي</AppText>
          <AppText style={placeholderStyles.subtext}>(سيتم بناؤه في المهمة ٨)</AppText>
          <View style={placeholderStyles.button}>
            <PrimaryButton title={ar.done} onPress={onComplete} />
          </View>
        </View>
      </View>
    );
  }

  return null;
}

const placeholderStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.softCream,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    gap: 12,
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.deepNightBlue,
    textAlign: 'center',
  },
  subtext: {
    fontSize: 14,
    color: colors.mutedGray,
    textAlign: 'center',
  },
  button: {
    width: 200,
    marginTop: 20,
  },
});
