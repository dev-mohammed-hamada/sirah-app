import React, { useState, useCallback } from 'react';
import { NarratorWelcomeScreen } from './narrator-welcome-screen';
import { StoryPanelScreen } from './story-panel-screen';
import { InlineQuestionScreen } from './inline-question-screen';
import { FinalQuizScreen } from './final-quiz-screen';
import { CelebrationResultsScreen } from './celebration-results-screen';
import type { QuizResult } from './final-quiz-screen';
import type { Question } from '../../components/question/question-types';

// ─── Mock Stage Content (will come from API) ─────────────────────
interface StageContent {
  id: string;
  number: number;
  icon: string;
  label: string;
  panels: string[];
  inlineQuestions: Question[];
  quizQuestions: Question[];
  nextStageTeaser?: string;
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
    inlineQuestions: [
      {
        id: 'q1-1',
        type: 'mcq',
        text: 'من أين جاء أبرهة بجيشه؟',
        options: ['من الشام', 'من اليمن', 'من مصر', 'من العراق'],
        correctIndex: 1,
        explanation: 'جاء أبرهة الحبشي بجيشه من اليمن لهدم الكعبة.',
      },
      {
        id: 'q1-2',
        type: 'true_false',
        text: 'قال عبدالمطلب: أنا رب الإبل وللبيت رب يحميه',
        correctAnswer: true,
        explanation: 'نعم، هذه المقولة الشهيرة لعبدالمطلب جد النبي ﷺ عندما طالب بإبله من أبرهة.',
      },
    ],
    quizQuestions: [
      {
        id: 'fq1-1',
        type: 'mcq',
        text: 'ماذا أرسل الله لتدمير جيش أبرهة؟',
        options: ['رياحًا شديدة', 'طيورًا أبابيل', 'زلزالًا', 'فيضانًا'],
        correctIndex: 1,
        explanation: 'أرسل الله طيورًا أبابيل ترمي الجيش بحجارة من سجيل.',
      },
      {
        id: 'fq1-2',
        type: 'arrange',
        text: 'رتّب أحداث قصة عام الفيل:',
        items: ['جاء أبرهة بجيشه', 'طالب عبدالمطلب بإبله', 'أرسل الله الطير الأبابيل'],
        correctOrder: [0, 1, 2],
        explanation: 'جاء أبرهة أولاً، ثم طالب عبدالمطلب بإبله، ثم أرسل الله الطير.',
      },
      {
        id: 'fq1-3',
        type: 'fill_blank',
        text: 'أكمل:',
        sentence: 'في عام الفيل وُلد النبي ___ ﷺ',
        options: ['إبراهيم', 'محمد', 'عيسى'],
        correctIndex: 1,
        explanation: 'وُلد النبي محمد ﷺ في عام الفيل.',
      },
    ],
    nextStageTeaser: 'في المرحلة القادمة ستعرف كيف نشأ النبي ﷺ ومن أرضعه في البادية...',
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
    inlineQuestions: [
      {
        id: 'q2-1',
        type: 'fill_blank',
        text: 'أكمل الجملة التالية:',
        sentence: 'أرضعت ___ النبي ﷺ في بادية بني سعد',
        options: ['آمنة', 'حليمة السعدية', 'خديجة'],
        correctIndex: 1,
        explanation: 'حليمة السعدية هي مرضعة النبي ﷺ في بادية بني سعد.',
      },
      {
        id: 'q2-2',
        type: 'who_said',
        text: 'من الذي سمّى النبي ﷺ محمدًا؟',
        quote: 'سميته محمدًا',
        characters: ['أبو طالب', 'عبدالمطلب', 'عبدالله', 'آمنة'],
        correctIndex: 1,
        explanation: 'جده عبدالمطلب هو الذي سماه محمدًا ﷺ.',
      },
    ],
    quizQuestions: [
      {
        id: 'fq2-1',
        type: 'mcq',
        text: 'في أي يوم وُلد النبي ﷺ؟',
        options: ['يوم الجمعة', 'يوم الاثنين', 'يوم الخميس', 'يوم الأحد'],
        correctIndex: 1,
        explanation: 'وُلد النبي ﷺ يوم الاثنين من ربيع الأول.',
      },
      {
        id: 'fq2-2',
        type: 'true_false',
        text: 'توفيت أم النبي ﷺ وهو في العاشرة من عمره',
        correctAnswer: false,
        explanation: 'توفيت أمه آمنة وهو في السادسة من عمره.',
      },
      {
        id: 'fq2-3',
        type: 'who_said',
        text: 'من تولى كفالة النبي ﷺ بعد وفاة جده؟',
        quote: 'سأرعاك يا محمد كما أرعى أبنائي',
        characters: ['حمزة', 'أبو طالب', 'العباس', 'أبو لهب'],
        correctIndex: 1,
        explanation: 'تولى عمه أبو طالب رعايته بعد وفاة جده عبدالمطلب.',
      },
    ],
    nextStageTeaser: 'في المرحلة القادمة ستعرف لماذا لقّبه الناس بالصادق الأمين...',
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
    inlineQuestions: [
      {
        id: 'q3-1',
        type: 'mcq',
        text: 'بماذا لُقّب النبي ﷺ بين قومه؟',
        options: ['الحكيم', 'الصادق الأمين', 'الشجاع', 'الكريم'],
        correctIndex: 1,
        explanation: 'لُقّب النبي ﷺ بالصادق الأمين لصدقه وأمانته بين الناس.',
      },
      {
        id: 'q3-2',
        type: 'arrange',
        text: 'رتّب أحداث حياة النبي ﷺ في شبابه:',
        items: ['رعي الغنم', 'الشهرة بالصدق والأمانة', 'المشاركة في حلف الفضول'],
        correctOrder: [0, 1, 2],
        explanation: 'عمل في رعي الغنم أولاً، ثم اشتهر بالصدق والأمانة، ثم شارك في حلف الفضول.',
      },
    ],
    quizQuestions: [
      {
        id: 'fq3-1',
        type: 'mcq',
        text: 'ما هو حلف الفضول؟',
        options: ['حلف تجاري', 'تعاهد على نصرة المظلوم', 'اتفاق حربي', 'معاهدة سلام'],
        correctIndex: 1,
        explanation: 'حلف الفضول تعاهد فيه شباب قريش على نصرة المظلوم.',
      },
      {
        id: 'fq3-2',
        type: 'fill_blank',
        text: 'أكمل:',
        sentence: 'عمل النبي ﷺ في ___ ليتعلم الصبر والمسؤولية',
        options: ['التجارة', 'رعي الغنم', 'الزراعة'],
        correctIndex: 1,
        explanation: 'عمل النبي ﷺ في رعي الغنم منذ صغره.',
      },
      {
        id: 'fq3-3',
        type: 'true_false',
        text: 'نشأ النبي ﷺ في رعاية عمه أبي طالب',
        correctAnswer: true,
        explanation: 'نعم، نشأ النبي ﷺ في رعاية عمه أبي طالب.',
      },
    ],
    nextStageTeaser: 'في المرحلة القادمة ستعرف كيف التقى النبي ﷺ بالسيدة خديجة...',
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
    inlineQuestions: [
      {
        id: 'q4-1',
        type: 'true_false',
        text: 'كان عمر النبي ﷺ عند زواجه من خديجة ثلاثين سنة',
        correctAnswer: false,
        explanation: 'كان عمر النبي ﷺ خمسًا وعشرين سنة عند زواجه من خديجة رضي الله عنها.',
      },
      {
        id: 'q4-2',
        type: 'fill_blank',
        text: 'أكمل الجملة:',
        sentence: 'سافر النبي ﷺ بتجارة خديجة إلى ___',
        options: ['اليمن', 'الشام', 'مصر'],
        correctIndex: 1,
        explanation: 'سافر النبي ﷺ بتجارة خديجة إلى الشام ورجع بأرباح عظيمة.',
      },
    ],
    quizQuestions: [
      {
        id: 'fq4-1',
        type: 'mcq',
        text: 'لماذا عرضت خديجة على النبي ﷺ التجارة بمالها؟',
        options: ['لأنه غني', 'لأمانته وصدقه', 'لأنه من قريش', 'لأنه قوي'],
        correctIndex: 1,
        explanation: 'سمعت خديجة بأمانة محمد ﷺ فعرضت عليه التجارة بمالها.',
      },
      {
        id: 'fq4-2',
        type: 'arrange',
        text: 'رتّب أحداث قصة زواج النبي ﷺ من خديجة:',
        items: ['التجارة بمال خديجة', 'السفر إلى الشام', 'الزواج من خديجة'],
        correctOrder: [0, 1, 2],
        explanation: 'عمل بتجارتها أولاً، ثم سافر للشام، ثم تزوجها.',
      },
      {
        id: 'fq4-3',
        type: 'who_said',
        text: 'من كانت أول من آمن بالنبي ﷺ؟',
        quote: 'أشهد أنك رسول الله',
        characters: ['عائشة', 'خديجة', 'فاطمة', 'أم سلمة'],
        correctIndex: 1,
        explanation: 'كانت خديجة رضي الله عنها أول من آمن بالنبي ﷺ.',
      },
    ],
    nextStageTeaser: 'في المرحلة القادمة ستعرف كيف نزل الوحي لأول مرة...',
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
    inlineQuestions: [
      {
        id: 'q5-1',
        type: 'mcq',
        text: 'أين كان النبي ﷺ عندما نزل عليه الوحي أول مرة؟',
        options: ['في المسجد الحرام', 'في غار حراء', 'في بيته', 'في السوق'],
        correctIndex: 1,
        explanation: 'نزل الوحي على النبي ﷺ لأول مرة في غار حراء بجبل النور.',
      },
      {
        id: 'q5-2',
        type: 'who_said',
        text: 'من قال هذه العبارة للنبي ﷺ؟',
        quote: 'والله لا يخزيك الله أبدًا',
        characters: ['أبو بكر', 'خديجة', 'ورقة بن نوفل', 'أبو طالب'],
        correctIndex: 1,
        explanation: 'قالتها السيدة خديجة رضي الله عنها لتطمئن النبي ﷺ بعد نزول الوحي.',
      },
    ],
    quizQuestions: [
      {
        id: 'fq5-1',
        type: 'mcq',
        text: 'ما أول كلمة نزلت من القرآن الكريم؟',
        options: ['قل', 'اقرأ', 'بسم', 'الحمد'],
        correctIndex: 1,
        explanation: 'أول ما نزل من القرآن: اقرأ باسم ربك الذي خلق.',
      },
      {
        id: 'fq5-2',
        type: 'fill_blank',
        text: 'أكمل:',
        sentence: 'نزل الوحي على النبي ﷺ في غار ___ بجبل النور',
        options: ['ثور', 'حراء', 'أحد'],
        correctIndex: 1,
        explanation: 'نزل الوحي في غار حراء بجبل النور.',
      },
      {
        id: 'fq5-3',
        type: 'true_false',
        text: 'ورقة بن نوفل بشّر النبي ﷺ بأنه نبي هذه الأمة',
        correctAnswer: true,
        explanation: 'نعم، ورقة بن نوفل أخبره بأن ما نزل عليه هو الناموس الذي نزل على موسى.',
      },
      {
        id: 'fq5-4',
        type: 'arrange',
        text: 'رتّب أحداث نزول الوحي:',
        items: ['التعبد في غار حراء', 'نزول جبريل', 'العودة إلى خديجة', 'زيارة ورقة بن نوفل'],
        correctOrder: [0, 1, 2, 3],
        explanation: 'كان يتعبد في الغار، ثم نزل جبريل، ثم عاد لخديجة، ثم زارا ورقة.',
      },
    ],
    nextStageTeaser: 'في المرحلة القادمة ستعرف كيف بدأ النبي ﷺ بالدعوة سراً...',
  },
};

// ─── Flow Step Types ─────────────────────────────────────────────
type FlowStep =
  | { type: 'narrator' }
  | { type: 'panel'; panelIndex: number }
  | { type: 'question'; questionIndex: number }
  | { type: 'finalQuiz' }
  | { type: 'celebration' };

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
  steps.push({ type: 'celebration' });
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
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

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
    const question = stage.inlineQuestions[currentStep.questionIndex];
    if (!question) return null;

    return (
      <InlineQuestionScreen
        key={question.id}
        question={question}
        stageLabel={stage.label}
        totalSteps={totalSteps}
        currentStep={currentStepIndex}
        hearts={hearts}
        maxHearts={5}
        onAnswer={(correct) => {
          if (!correct) {
            setHearts((prev) => Math.max(0, prev - 1));
          }
        }}
        onNext={handleNext}
      />
    );
  }

  if (currentStep.type === 'finalQuiz') {
    return (
      <FinalQuizScreen
        questions={stage.quizQuestions}
        hearts={hearts}
        maxHearts={5}
        isFirstAttempt={true}
        onAnswer={(correct) => {
          if (!correct) {
            setHearts((prev) => Math.max(0, prev - 1));
          }
        }}
        onComplete={(result) => {
          setQuizResult(result);
          handleNext();
        }}
        onHeartsEmpty={onComplete}
        onBackToMap={onComplete}
      />
    );
  }

  if (currentStep.type === 'celebration' && quizResult) {
    return (
      <CelebrationResultsScreen
        result={quizResult}
        stageId={stage.id}
        streakDays={3}
        nextStageTeaser={stage.nextStageTeaser}
        onNextStage={() => {
          // Navigate to next stage (for now, just complete)
          onComplete();
        }}
        onRetry={() => {
          // Reset flow to narrator welcome
          setCurrentStepIndex(0);
          setHearts(5);
          setQuizResult(null);
        }}
        onBackToMap={onComplete}
      />
    );
  }

  return null;
}
