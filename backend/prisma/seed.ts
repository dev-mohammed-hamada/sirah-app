import { PrismaClient, QuestionType } from '@prisma/client';

const prisma = new PrismaClient();

interface QuestionOption {
  id: string;
  text: string;
}

interface StageData {
  title: string;
  arabicTitle: string;
  description: string;
  panels: string[];
  inlineQuestions: {
    type: QuestionType;
    questionText: string;
    options: QuestionOption[];
    correctAnswer: string;
    explanation: string;
  }[];
  finalQuizQuestions: {
    type: QuestionType;
    questionText: string;
    options: QuestionOption[];
    correctAnswer: string;
    explanation: string;
  }[];
}

// ─── Stage Content ─────────────────────────────────────────────────

const stages: StageData[] = [
  // ── Stage 1: Year of the Elephant ──
  {
    title: 'Year of the Elephant',
    arabicTitle: 'عام الفيل',
    description: 'قصة أبرهة وجيش الفيل ومحاولة هدم الكعبة',
    panels: [
      'في ذلك العام، جاء أبرهة الحبشي بجيشه العظيم من اليمن يريد هدم الكعبة المشرفة. كان معه فيلة ضخمة لم يرها العرب من قبل.',
      'خرج عبدالمطلب جد النبي ﷺ وطلب من أبرهة إعادة إبله التي أخذها الجيش. فقال أبرهة متعجبًا: تسألني عن إبلك ولا تسألني عن الكعبة؟ فقال عبدالمطلب: أنا رب الإبل، وللبيت رب يحميه.',
      'أرسل الله طيورًا أبابيل ترمي جيش أبرهة بحجارة من سجيل. فهلك الجيش ونجت الكعبة بحماية الله. وفي هذا العام المبارك وُلد النبي محمد ﷺ.',
    ],
    inlineQuestions: [
      {
        type: QuestionType.MCQ,
        questionText: 'من أين جاء أبرهة بجيشه؟',
        options: [
          { id: 'a', text: 'من اليمن' },
          { id: 'b', text: 'من الشام' },
          { id: 'c', text: 'من مصر' },
          { id: 'd', text: 'من العراق' },
        ],
        correctAnswer: 'a',
        explanation: 'جاء أبرهة الحبشي بجيشه من اليمن لهدم الكعبة',
      },
      {
        type: QuestionType.WHO_SAID_IT,
        questionText: 'من قال: "أنا رب الإبل، وللبيت رب يحميه"؟',
        options: [
          { id: 'a', text: 'عبدالمطلب' },
          { id: 'b', text: 'أبو طالب' },
          { id: 'c', text: 'أبرهة' },
          { id: 'd', text: 'هاشم' },
        ],
        correctAnswer: 'a',
        explanation: 'قالها عبدالمطلب جد النبي ﷺ لأبرهة عندما سأله عن الكعبة',
      },
    ],
    finalQuizQuestions: [
      {
        type: QuestionType.TRUE_FALSE,
        questionText: 'أراد أبرهة بناء كعبة جديدة في اليمن',
        options: [
          { id: 'true', text: 'صحيح' },
          { id: 'false', text: 'خطأ' },
        ],
        correctAnswer: 'false',
        explanation: 'أبرهة أراد هدم الكعبة في مكة وليس بناء كعبة في اليمن',
      },
      {
        type: QuestionType.MCQ,
        questionText: 'ماذا أرسل الله لتدمير جيش أبرهة؟',
        options: [
          { id: 'a', text: 'طيور أبابيل' },
          { id: 'b', text: 'ريح شديدة' },
          { id: 'c', text: 'زلزال' },
          { id: 'd', text: 'فيضان' },
        ],
        correctAnswer: 'a',
        explanation: 'أرسل الله طيورًا أبابيل ترميهم بحجارة من سجيل',
      },
      {
        type: QuestionType.FILL_BLANK,
        questionText: 'وُلد النبي محمد ﷺ في عام ___',
        options: [
          { id: 'a', text: 'الفيل' },
          { id: 'b', text: 'الحزن' },
          { id: 'c', text: 'الفتح' },
        ],
        correctAnswer: 'a',
        explanation: 'وُلد النبي ﷺ في عام الفيل',
      },
    ],
  },

  // ── Stage 2: Birth and Early Childhood ──
  {
    title: 'Birth and Early Childhood',
    arabicTitle: 'المولد والطفولة',
    description: 'مولد النبي ﷺ ونشأته في البادية',
    panels: [
      'وُلد محمد ﷺ يتيمًا فقد مات أبوه عبدالله قبل مولده. فرح جده عبدالمطلب فرحًا شديدًا وسماه محمدًا. وكان هذا الاسم غريبًا عند العرب.',
      'أرضعته حليمة السعدية وأخذته إلى البادية. عاش هناك سنوات تعلم فيها الفصاحة والقوة. وكانت البركة تحل أينما كان الطفل محمد ﷺ.',
      'توفيت أمه آمنة وعمره ست سنوات، ثم كفله جده عبدالمطلب. وعندما بلغ الثامنة توفي جده أيضًا فكفله عمه أبو طالب وأحبه حبًا شديدًا.',
    ],
    inlineQuestions: [
      {
        type: QuestionType.MCQ,
        questionText: 'من سمّى النبي ﷺ باسم محمد؟',
        options: [
          { id: 'a', text: 'جده عبدالمطلب' },
          { id: 'b', text: 'أمه آمنة' },
          { id: 'c', text: 'عمه أبو طالب' },
          { id: 'd', text: 'أبوه عبدالله' },
        ],
        correctAnswer: 'a',
        explanation: 'سماه جده عبدالمطلب بهذا الاسم وكان اسمًا غريبًا عند العرب',
      },
      {
        type: QuestionType.TRUE_FALSE,
        questionText: 'عاش النبي ﷺ في البادية مع حليمة السعدية',
        options: [
          { id: 'true', text: 'صحيح' },
          { id: 'false', text: 'خطأ' },
        ],
        correctAnswer: 'true',
        explanation: 'نعم، أرضعته حليمة السعدية وعاش في البادية سنوات',
      },
    ],
    finalQuizQuestions: [
      {
        type: QuestionType.ARRANGE,
        questionText: 'رتب أحداث طفولة النبي ﷺ من الأقدم إلى الأحدث',
        options: [
          { id: '1', text: 'وفاة أبيه عبدالله' },
          { id: '2', text: 'مولده ﷺ' },
          { id: '3', text: 'وفاة أمه آمنة' },
          { id: '4', text: 'كفالة عمه أبو طالب' },
        ],
        correctAnswer: '1,2,3,4',
        explanation:
          'توفي أبوه قبل مولده، ثم وُلد، ثم توفيت أمه وهو في السادسة، ثم كفله عمه بعد وفاة جده',
      },
      {
        type: QuestionType.MCQ,
        questionText: 'كم كان عمر النبي ﷺ عندما توفيت أمه؟',
        options: [
          { id: 'a', text: 'ست سنوات' },
          { id: 'b', text: 'أربع سنوات' },
          { id: 'c', text: 'ثمان سنوات' },
          { id: 'd', text: 'عشر سنوات' },
        ],
        correctAnswer: 'a',
        explanation: 'توفيت أمه آمنة بنت وهب وعمره ست سنوات',
      },
      {
        type: QuestionType.FILL_BLANK,
        questionText: 'كفل النبي ﷺ بعد وفاة جده عمه ___',
        options: [
          { id: 'a', text: 'أبو طالب' },
          { id: 'b', text: 'أبو لهب' },
          { id: 'c', text: 'العباس' },
        ],
        correctAnswer: 'a',
        explanation: 'كفله عمه أبو طالب وأحبه حبًا شديدًا',
      },
      {
        type: QuestionType.WHO_SAID_IT,
        questionText: 'من هي التي أرضعت النبي ﷺ في البادية؟',
        options: [
          { id: 'a', text: 'حليمة السعدية' },
          { id: 'b', text: 'أم أيمن' },
          { id: 'c', text: 'ثويبة' },
          { id: 'd', text: 'فاطمة بنت أسد' },
        ],
        correctAnswer: 'a',
        explanation: 'حليمة السعدية هي مرضعته التي أخذته إلى بادية بني سعد',
      },
    ],
  },

  // ── Stage 3: Youth and Character ──
  {
    title: 'Youth and Character',
    arabicTitle: 'الشباب والأخلاق',
    description: 'شباب النبي ﷺ وأخلاقه الكريمة قبل البعثة',
    panels: [
      'نشأ محمد ﷺ شابًا أمينًا صادقًا حتى لقبه أهل مكة بالصادق الأمين. كان يرعى الغنم في صغره ويساعد عمه في التجارة.',
      'شارك النبي ﷺ وهو شاب في حلف الفضول مع شباب قريش. وكان هذا الحلف لنصرة المظلوم ومساعدة الضعيف. وقال عنه بعد النبوة: لو دُعيت إليه في الإسلام لأجبت.',
      'عُرف بالحكمة رغم صغر سنه. فعندما اختلفت قبائل قريش على من يضع الحجر الأسود، رضوا بحكمه ﷺ فوضعه في ثوب وحملته القبائل معًا.',
    ],
    inlineQuestions: [
      {
        type: QuestionType.FILL_BLANK,
        questionText: 'لقب أهل مكة النبي ﷺ بـ ___',
        options: [
          { id: 'a', text: 'الصادق الأمين' },
          { id: 'b', text: 'سيد قريش' },
          { id: 'c', text: 'حكيم العرب' },
        ],
        correctAnswer: 'a',
        explanation: 'لقبوه بالصادق الأمين لصدقه وأمانته',
      },
      {
        type: QuestionType.MCQ,
        questionText: 'ما هو حلف الفضول؟',
        options: [
          { id: 'a', text: 'حلف لنصرة المظلوم' },
          { id: 'b', text: 'حلف تجاري' },
          { id: 'c', text: 'حلف عسكري' },
          { id: 'd', text: 'حلف للزواج' },
        ],
        correctAnswer: 'a',
        explanation: 'حلف الفضول كان لنصرة المظلوم ومساعدة الضعيف',
      },
    ],
    finalQuizQuestions: [
      {
        type: QuestionType.TRUE_FALSE,
        questionText: 'كان النبي ﷺ يرعى الغنم في صغره',
        options: [
          { id: 'true', text: 'صحيح' },
          { id: 'false', text: 'خطأ' },
        ],
        correctAnswer: 'true',
        explanation: 'نعم، رعى الغنم وهذا عمل كل الأنبياء',
      },
      {
        type: QuestionType.MCQ,
        questionText: 'كيف حل النبي ﷺ مشكلة الحجر الأسود؟',
        options: [
          { id: 'a', text: 'وضعه في ثوب وحملته القبائل معًا' },
          { id: 'b', text: 'اختار قبيلة واحدة لوضعه' },
          { id: 'c', text: 'وضعه بنفسه دون مساعدة' },
          { id: 'd', text: 'ترك الأمر لعبدالمطلب' },
        ],
        correctAnswer: 'a',
        explanation: 'وضع الحجر في ثوب وأمسكت كل قبيلة بطرف فحملوه معًا',
      },
      {
        type: QuestionType.ARRANGE,
        questionText: 'رتب صفات النبي ﷺ التي عُرف بها في شبابه',
        options: [
          { id: '1', text: 'الصدق' },
          { id: '2', text: 'الأمانة' },
          { id: '3', text: 'الحكمة' },
        ],
        correctAnswer: '1,2,3',
        explanation: 'عُرف بالصدق والأمانة حتى لُقب بالصادق الأمين، وبالحكمة في حل المشكلات',
      },
    ],
  },

  // ── Stage 4: Marriage to Khadijah ──
  {
    title: 'Marriage to Khadijah',
    arabicTitle: 'الزواج من خديجة',
    description: 'قصة زواج النبي ﷺ من خديجة رضي الله عنها',
    panels: [
      'سمعت خديجة بنت خويلد بأمانة محمد ﷺ وصدقه فعرضت عليه أن يتاجر بمالها إلى الشام. خرج مع غلامها ميسرة ونجحت التجارة نجاحًا كبيرًا.',
      'أُعجبت خديجة بأخلاق محمد ﷺ وأمانته فأرسلت صديقتها نفيسة تسأله عن رغبته في الزواج. وافق النبي ﷺ وتزوجا وكان عمره خمسًا وعشرين سنة.',
      'كانت خديجة خير زوجة، أحبت النبي ﷺ وساندته في كل أمره. رُزقا بأبنائهما وعاشا في سعادة وحب. وكانت خديجة أول من آمن به بعد البعثة.',
    ],
    inlineQuestions: [
      {
        type: QuestionType.MCQ,
        questionText: 'لماذا عرضت خديجة على النبي ﷺ التجارة بمالها؟',
        options: [
          { id: 'a', text: 'لأمانته وصدقه' },
          { id: 'b', text: 'لغناه' },
          { id: 'c', text: 'لقرابته منها' },
          { id: 'd', text: 'لشهرته' },
        ],
        correctAnswer: 'a',
        explanation: 'سمعت بأمانته وصدقه فأرادت أن يتاجر بمالها',
      },
      {
        type: QuestionType.TRUE_FALSE,
        questionText: 'كان عمر النبي ﷺ ثلاثين سنة عندما تزوج خديجة',
        options: [
          { id: 'true', text: 'صحيح' },
          { id: 'false', text: 'خطأ' },
        ],
        correctAnswer: 'false',
        explanation: 'كان عمره خمسًا وعشرين سنة',
      },
    ],
    finalQuizQuestions: [
      {
        type: QuestionType.MCQ,
        questionText: 'من هو الغلام الذي سافر مع النبي ﷺ في تجارة خديجة؟',
        options: [
          { id: 'a', text: 'ميسرة' },
          { id: 'b', text: 'زيد بن حارثة' },
          { id: 'c', text: 'بلال' },
          { id: 'd', text: 'أنس' },
        ],
        correctAnswer: 'a',
        explanation: 'ميسرة هو غلام خديجة الذي رافق النبي ﷺ إلى الشام',
      },
      {
        type: QuestionType.WHO_SAID_IT,
        questionText: 'من التي أرسلتها خديجة لتسأل النبي ﷺ عن الزواج؟',
        options: [
          { id: 'a', text: 'نفيسة بنت منية' },
          { id: 'b', text: 'أم أيمن' },
          { id: 'c', text: 'فاطمة بنت أسد' },
          { id: 'd', text: 'هالة بنت خويلد' },
        ],
        correctAnswer: 'a',
        explanation: 'أرسلت خديجة صديقتها نفيسة بنت منية لتسأله',
      },
      {
        type: QuestionType.FILL_BLANK,
        questionText: 'كانت خديجة أول من ___ بالنبي ﷺ',
        options: [
          { id: 'a', text: 'آمن' },
          { id: 'b', text: 'هاجر' },
          { id: 'c', text: 'صلى' },
        ],
        correctAnswer: 'a',
        explanation: 'خديجة رضي الله عنها كانت أول من آمن بالنبي ﷺ',
      },
    ],
  },

  // ── Stage 5: The First Revelation ──
  {
    title: 'The First Revelation',
    arabicTitle: 'الوحي الأول',
    description: 'نزول الوحي على النبي ﷺ في غار حراء',
    panels: [
      'كان النبي ﷺ يذهب إلى غار حراء في جبل النور ليتعبد ويتفكر. كان يجلس هناك أيامًا بعيدًا عن صخب مكة يتأمل في خلق الله.',
      'جاءه جبريل عليه السلام وهو في الغار فقال له: اقرأ. فقال النبي ﷺ: ما أنا بقارئ. فضمه جبريل ثلاث مرات ثم قال: اقرأ باسم ربك الذي خلق.',
      'عاد النبي ﷺ إلى خديجة خائفًا يرتجف وقال: زملوني زملوني. فطمأنته خديجة وقالت: والله لا يخزيك الله أبدًا. ثم ذهبا إلى ورقة بن نوفل الذي بشره بالنبوة.',
    ],
    inlineQuestions: [
      {
        type: QuestionType.MCQ,
        questionText: 'أين كان النبي ﷺ يتعبد قبل نزول الوحي؟',
        options: [
          { id: 'a', text: 'غار حراء' },
          { id: 'b', text: 'غار ثور' },
          { id: 'c', text: 'المسجد الحرام' },
          { id: 'd', text: 'جبل أحد' },
        ],
        correctAnswer: 'a',
        explanation: 'كان يتعبد في غار حراء في جبل النور',
      },
      {
        type: QuestionType.WHO_SAID_IT,
        questionText: 'من قال للنبي ﷺ: "اقرأ"؟',
        options: [
          { id: 'a', text: 'جبريل عليه السلام' },
          { id: 'b', text: 'ورقة بن نوفل' },
          { id: 'c', text: 'خديجة' },
          { id: 'd', text: 'أبو بكر' },
        ],
        correctAnswer: 'a',
        explanation: 'جبريل عليه السلام هو الملك الذي نزل بالوحي',
      },
    ],
    finalQuizQuestions: [
      {
        type: QuestionType.ARRANGE,
        questionText: 'رتب أحداث نزول الوحي الأول',
        options: [
          { id: '1', text: 'تعبد النبي ﷺ في غار حراء' },
          { id: '2', text: 'نزول جبريل وقوله: اقرأ' },
          { id: '3', text: 'عودته إلى خديجة خائفًا' },
          { id: '4', text: 'ذهابهما إلى ورقة بن نوفل' },
        ],
        correctAnswer: '1,2,3,4',
        explanation: 'كان يتعبد، ثم نزل جبريل، ثم عاد لخديجة، ثم ذهبا لورقة',
      },
      {
        type: QuestionType.TRUE_FALSE,
        questionText: 'أول ما نزل من القرآن سورة الفاتحة',
        options: [
          { id: 'true', text: 'صحيح' },
          { id: 'false', text: 'خطأ' },
        ],
        correctAnswer: 'false',
        explanation: 'أول ما نزل هو أوائل سورة العلق: اقرأ باسم ربك الذي خلق',
      },
      {
        type: QuestionType.MCQ,
        questionText: 'ماذا قالت خديجة للنبي ﷺ عندما عاد خائفًا؟',
        options: [
          { id: 'a', text: 'والله لا يخزيك الله أبدًا' },
          { id: 'b', text: 'لا تخف سيمر الأمر' },
          { id: 'c', text: 'اذهب إلى الكعبة' },
          { id: 'd', text: 'اسأل عمك أبا طالب' },
        ],
        correctAnswer: 'a',
        explanation: 'طمأنته خديجة بقولها: والله لا يخزيك الله أبدًا، إنك لتصل الرحم وتحمل الكل',
      },
      {
        type: QuestionType.FILL_BLANK,
        questionText: 'ورقة بن نوفل بشر النبي ﷺ بـ ___',
        options: [
          { id: 'a', text: 'النبوة' },
          { id: 'b', text: 'الغنى' },
          { id: 'c', text: 'النصر' },
        ],
        correctAnswer: 'a',
        explanation: 'أخبره ورقة أن هذا هو الناموس الذي نزل على موسى وبشره بأنه نبي',
      },
    ],
  },

  // ── Stage 6: Early Secret Dawah ──
  {
    title: 'Early Secret Dawah',
    arabicTitle: 'الدعوة السرية',
    description: 'بداية الدعوة إلى الإسلام سرًا',
    panels: [
      'بدأ النبي ﷺ يدعو إلى الإسلام سرًا. أسلمت خديجة أولاً ثم أسلم أبو بكر الصديق وعلي بن أبي طالب وزيد بن حارثة. كانوا أول المسلمين.',
      'كان المسلمون يجتمعون في دار الأرقم بن أبي الأرقم سرًا ليتعلموا القرآن ويصلوا بعيدًا عن أعين قريش. واستمرت الدعوة السرية ثلاث سنوات.',
      'أسلم في هذه الفترة عدد من أشراف مكة منهم عثمان بن عفان والزبير بن العوام وسعد بن أبي وقاص. وكان أبو بكر يدعو أصدقاءه بحكمة ولطف.',
    ],
    inlineQuestions: [
      {
        type: QuestionType.TRUE_FALSE,
        questionText: 'أبو بكر الصديق كان أول رجل أسلم',
        options: [
          { id: 'true', text: 'صحيح' },
          { id: 'false', text: 'خطأ' },
        ],
        correctAnswer: 'true',
        explanation: 'أبو بكر الصديق كان أول الرجال إسلامًا من الأحرار',
      },
      {
        type: QuestionType.MCQ,
        questionText: 'أين كان المسلمون يجتمعون سرًا؟',
        options: [
          { id: 'a', text: 'دار الأرقم بن أبي الأرقم' },
          { id: 'b', text: 'بيت النبي ﷺ' },
          { id: 'c', text: 'غار حراء' },
          { id: 'd', text: 'المسجد الحرام' },
        ],
        correctAnswer: 'a',
        explanation: 'كانوا يجتمعون في دار الأرقم بن أبي الأرقم سرًا',
      },
    ],
    finalQuizQuestions: [
      {
        type: QuestionType.MCQ,
        questionText: 'كم استمرت الدعوة السرية؟',
        options: [
          { id: 'a', text: 'ثلاث سنوات' },
          { id: 'b', text: 'سنة واحدة' },
          { id: 'c', text: 'خمس سنوات' },
          { id: 'd', text: 'عشر سنوات' },
        ],
        correctAnswer: 'a',
        explanation: 'استمرت الدعوة السرية ثلاث سنوات',
      },
      {
        type: QuestionType.ARRANGE,
        questionText: 'رتب أوائل المسلمين حسب ترتيب إسلامهم',
        options: [
          { id: '1', text: 'خديجة بنت خويلد' },
          { id: '2', text: 'أبو بكر الصديق' },
          { id: '3', text: 'علي بن أبي طالب' },
        ],
        correctAnswer: '1,2,3',
        explanation: 'خديجة أول من أسلم مطلقًا، ثم أبو بكر من الرجال الأحرار، ثم علي من الصبيان',
      },
      {
        type: QuestionType.FILL_BLANK,
        questionText: 'أول صبي أسلم هو ___ بن أبي طالب',
        options: [
          { id: 'a', text: 'علي' },
          { id: 'b', text: 'جعفر' },
          { id: 'c', text: 'حمزة' },
        ],
        correctAnswer: 'a',
        explanation: 'علي بن أبي طالب كان أول صبي يدخل الإسلام',
      },
      {
        type: QuestionType.TRUE_FALSE,
        questionText: 'عثمان بن عفان أسلم في مرحلة الدعوة السرية',
        options: [
          { id: 'true', text: 'صحيح' },
          { id: 'false', text: 'خطأ' },
        ],
        correctAnswer: 'true',
        explanation: 'نعم، عثمان بن عفان من السابقين إلى الإسلام في الدعوة السرية',
      },
    ],
  },

  // ── Stage 7: Public Dawah and Persecution ──
  {
    title: 'Public Dawah and Persecution',
    arabicTitle: 'الجهر بالدعوة',
    description: 'إعلان الدعوة وإيذاء قريش للمسلمين',
    panels: [
      'بعد ثلاث سنوات أمر الله نبيه ﷺ بالجهر بالدعوة. صعد على جبل الصفا ونادى قبائل قريش وأخبرهم بأنه رسول الله. فرد أبو لهب بغضب: تبًا لك!',
      'بدأت قريش تؤذي المسلمين أذى شديدًا. عُذب بلال بن رباح في الرمال الحارة وهو يقول: أحد أحد. وعُذبت أسرة ياسر حتى استشهدت سمية أم عمار أول شهيدة في الإسلام.',
      'ثبت المسلمون رغم الأذى الشديد. وكان النبي ﷺ يمر على آل ياسر ويقول: صبرًا آل ياسر فإن موعدكم الجنة. واشترى أبو بكر بلالاً وأعتقه.',
    ],
    inlineQuestions: [
      {
        type: QuestionType.MCQ,
        questionText: 'من أي مكان أعلن النبي ﷺ دعوته لقريش؟',
        options: [
          { id: 'a', text: 'جبل الصفا' },
          { id: 'b', text: 'جبل المروة' },
          { id: 'c', text: 'عند الكعبة' },
          { id: 'd', text: 'في السوق' },
        ],
        correctAnswer: 'a',
        explanation: 'صعد النبي ﷺ على جبل الصفا ونادى قريش',
      },
      {
        type: QuestionType.WHO_SAID_IT,
        questionText: 'من كان يقول "أحد أحد" أثناء تعذيبه؟',
        options: [
          { id: 'a', text: 'بلال بن رباح' },
          { id: 'b', text: 'عمار بن ياسر' },
          { id: 'c', text: 'خباب بن الأرت' },
          { id: 'd', text: 'صهيب الرومي' },
        ],
        correctAnswer: 'a',
        explanation: 'بلال رضي الله عنه كان يردد أحد أحد تحت التعذيب',
      },
    ],
    finalQuizQuestions: [
      {
        type: QuestionType.TRUE_FALSE,
        questionText: 'سمية أم عمار هي أول شهيدة في الإسلام',
        options: [
          { id: 'true', text: 'صحيح' },
          { id: 'false', text: 'خطأ' },
        ],
        correctAnswer: 'true',
        explanation: 'نعم، سمية بنت خياط هي أول شهيدة في الإسلام',
      },
      {
        type: QuestionType.MCQ,
        questionText: 'من اشترى بلالاً وأعتقه؟',
        options: [
          { id: 'a', text: 'أبو بكر الصديق' },
          { id: 'b', text: 'عمر بن الخطاب' },
          { id: 'c', text: 'عثمان بن عفان' },
          { id: 'd', text: 'النبي ﷺ' },
        ],
        correctAnswer: 'a',
        explanation: 'أبو بكر الصديق اشترى بلالاً من أمية بن خلف وأعتقه لوجه الله',
      },
      {
        type: QuestionType.FILL_BLANK,
        questionText: 'قال النبي ﷺ: "صبرًا آل ياسر فإن موعدكم ___"',
        options: [
          { id: 'a', text: 'الجنة' },
          { id: 'b', text: 'النصر' },
          { id: 'c', text: 'الفرج' },
        ],
        correctAnswer: 'a',
        explanation: 'بشرهم النبي ﷺ بالجنة تثبيتًا لهم',
      },
    ],
  },

  // ── Stage 8: Migration to Abyssinia ──
  {
    title: 'Migration to Abyssinia',
    arabicTitle: 'الهجرة إلى الحبشة',
    description: 'هجرة المسلمين إلى الحبشة فرارًا من أذى قريش',
    panels: [
      'لما اشتد الأذى على المسلمين أمرهم النبي ﷺ بالهجرة إلى الحبشة. قال لهم: إن بها ملكًا لا يُظلم عنده أحد. فخرج أول فوج من المسلمين سرًا.',
      'أرسلت قريش عمرو بن العاص وعبدالله بن أبي ربيعة إلى النجاشي ملك الحبشة ليعيد المسلمين. لكن النجاشي أراد أن يسمع من المسلمين أولاً.',
      'تكلم جعفر بن أبي طالب أمام النجاشي وقرأ عليه من سورة مريم. فبكى النجاشي وقال: إن هذا والذي جاء به عيسى ليخرج من مشكاة واحدة. ورفض تسليمهم لقريش.',
    ],
    inlineQuestions: [
      {
        type: QuestionType.MCQ,
        questionText: 'لماذا اختار النبي ﷺ الحبشة للهجرة؟',
        options: [
          { id: 'a', text: 'لأن ملكها عادل لا يُظلم عنده أحد' },
          { id: 'b', text: 'لأنها قريبة من مكة' },
          { id: 'c', text: 'لأن فيها مسلمين' },
          { id: 'd', text: 'لأنها غنية' },
        ],
        correctAnswer: 'a',
        explanation: 'قال النبي ﷺ: إن بها ملكًا لا يُظلم عنده أحد',
      },
      {
        type: QuestionType.TRUE_FALSE,
        questionText: 'النجاشي سلم المسلمين لقريش',
        options: [
          { id: 'true', text: 'صحيح' },
          { id: 'false', text: 'خطأ' },
        ],
        correctAnswer: 'false',
        explanation: 'رفض النجاشي تسليمهم وأمّنهم في بلاده',
      },
    ],
    finalQuizQuestions: [
      {
        type: QuestionType.MCQ,
        questionText: 'من تكلم باسم المسلمين أمام النجاشي؟',
        options: [
          { id: 'a', text: 'جعفر بن أبي طالب' },
          { id: 'b', text: 'عثمان بن عفان' },
          { id: 'c', text: 'أبو بكر الصديق' },
          { id: 'd', text: 'عمر بن الخطاب' },
        ],
        correctAnswer: 'a',
        explanation: 'جعفر بن أبي طالب تكلم أمام النجاشي وقرأ عليه القرآن',
      },
      {
        type: QuestionType.FILL_BLANK,
        questionText: 'قرأ جعفر على النجاشي من سورة ___',
        options: [
          { id: 'a', text: 'مريم' },
          { id: 'b', text: 'البقرة' },
          { id: 'c', text: 'الفاتحة' },
        ],
        correctAnswer: 'a',
        explanation: 'قرأ عليه من سورة مريم فبكى النجاشي',
      },
      {
        type: QuestionType.WHO_SAID_IT,
        questionText: 'من قال: "إن هذا والذي جاء به عيسى ليخرج من مشكاة واحدة"؟',
        options: [
          { id: 'a', text: 'النجاشي' },
          { id: 'b', text: 'جعفر بن أبي طالب' },
          { id: 'c', text: 'عمرو بن العاص' },
          { id: 'd', text: 'ورقة بن نوفل' },
        ],
        correctAnswer: 'a',
        explanation: 'النجاشي قال هذا بعد سماعه القرآن من جعفر',
      },
      {
        type: QuestionType.ARRANGE,
        questionText: 'رتب أحداث الهجرة إلى الحبشة',
        options: [
          { id: '1', text: 'اشتداد الأذى على المسلمين' },
          { id: '2', text: 'هجرة المسلمين إلى الحبشة' },
          { id: '3', text: 'إرسال قريش لعمرو بن العاص' },
          { id: '4', text: 'خطبة جعفر أمام النجاشي' },
        ],
        correctAnswer: '1,2,3,4',
        explanation: 'اشتد الأذى فهاجروا، فأرسلت قريش مبعوثيها، فتكلم جعفر وأمّنهم النجاشي',
      },
    ],
  },

  // ── Stage 9: The Night Journey (Isra and Mi'raj) ──
  {
    title: 'The Night Journey',
    arabicTitle: 'الإسراء والمعراج',
    description: 'رحلة الإسراء والمعراج المعجزة',
    panels: [
      'في ليلة مباركة جاء جبريل عليه السلام بالبراق وأسرى بالنبي ﷺ من المسجد الحرام إلى المسجد الأقصى. وهناك صلى النبي ﷺ إمامًا بالأنبياء جميعًا.',
      'ثم عرج به جبريل إلى السماوات السبع. في كل سماء لقي نبيًا من الأنبياء. ورأى الجنة والنار وآيات ربه الكبرى.',
      'فُرضت الصلاة في هذه الليلة. كانت خمسين صلاة فما زال النبي ﷺ يراجع ربه حتى صارت خمس صلوات بأجر خمسين. فالصلاة أعظم هدية من ليلة المعراج.',
    ],
    inlineQuestions: [
      {
        type: QuestionType.FILL_BLANK,
        questionText: 'أسري بالنبي ﷺ من المسجد الحرام إلى المسجد ___',
        options: [
          { id: 'a', text: 'الأقصى' },
          { id: 'b', text: 'النبوي' },
          { id: 'c', text: 'الحرام' },
        ],
        correctAnswer: 'a',
        explanation: 'أسري به من المسجد الحرام في مكة إلى المسجد الأقصى في القدس',
      },
      {
        type: QuestionType.MCQ,
        questionText: 'ما اسم الدابة التي ركبها النبي ﷺ في الإسراء؟',
        options: [
          { id: 'a', text: 'البراق' },
          { id: 'b', text: 'القصواء' },
          { id: 'c', text: 'العضباء' },
          { id: 'd', text: 'الجدعاء' },
        ],
        correctAnswer: 'a',
        explanation: 'البراق هي الدابة التي أسري بالنبي ﷺ عليها',
      },
    ],
    finalQuizQuestions: [
      {
        type: QuestionType.MCQ,
        questionText: 'كم صلاة فُرضت في ليلة المعراج في البداية؟',
        options: [
          { id: 'a', text: 'خمسين صلاة' },
          { id: 'b', text: 'عشر صلوات' },
          { id: 'c', text: 'خمس صلوات' },
          { id: 'd', text: 'ثلاثين صلاة' },
        ],
        correctAnswer: 'a',
        explanation: 'فرضت خمسين ثم خففت إلى خمس بأجر خمسين',
      },
      {
        type: QuestionType.TRUE_FALSE,
        questionText: 'صلى النبي ﷺ إمامًا بالأنبياء في المسجد الأقصى',
        options: [
          { id: 'true', text: 'صحيح' },
          { id: 'false', text: 'خطأ' },
        ],
        correctAnswer: 'true',
        explanation: 'نعم، صلى إمامًا بجميع الأنبياء في المسجد الأقصى',
      },
      {
        type: QuestionType.ARRANGE,
        questionText: 'رتب أحداث ليلة الإسراء والمعراج',
        options: [
          { id: '1', text: 'الإسراء إلى المسجد الأقصى' },
          { id: '2', text: 'الصلاة بالأنبياء' },
          { id: '3', text: 'العروج إلى السماوات' },
          { id: '4', text: 'فرض الصلوات الخمس' },
        ],
        correctAnswer: '1,2,3,4',
        explanation: 'أسري به أولاً ثم صلى بالأنبياء ثم عرج إلى السماوات ثم فرضت الصلاة',
      },
      {
        type: QuestionType.FILL_BLANK,
        questionText: 'الصلوات المفروضة بعد التخفيف هي ___ صلوات',
        options: [
          { id: 'a', text: 'خمس' },
          { id: 'b', text: 'ثلاث' },
          { id: 'c', text: 'سبع' },
        ],
        correctAnswer: 'a',
        explanation: 'خففت من خمسين إلى خمس صلوات بأجر خمسين',
      },
    ],
  },

  // ── Stage 10: The Hijra to Madinah ──
  {
    title: 'The Hijra to Madinah',
    arabicTitle: 'الهجرة إلى المدينة',
    description: 'هجرة النبي ﷺ وأبي بكر إلى المدينة المنورة',
    panels: [
      'تآمرت قريش على قتل النبي ﷺ فأذن الله له بالهجرة إلى المدينة. نام علي بن أبي طالب في فراشه ليلة الهجرة وخرج النبي ﷺ مع أبي بكر سرًا.',
      'اختبأ النبي ﷺ وأبو بكر في غار ثور ثلاثة أيام. وصلت قريش إلى باب الغار لكن الله حماهما. فقال النبي ﷺ لأبي بكر: لا تحزن إن الله معنا.',
      'وصل النبي ﷺ إلى المدينة فاستقبله أهلها بالفرح والأناشيد. بنى المسجد النبوي وآخى بين المهاجرين والأنصار. وبدأ عهد جديد للإسلام في المدينة المنورة.',
    ],
    inlineQuestions: [
      {
        type: QuestionType.MCQ,
        questionText: 'من نام في فراش النبي ﷺ ليلة الهجرة؟',
        options: [
          { id: 'a', text: 'علي بن أبي طالب' },
          { id: 'b', text: 'أبو بكر الصديق' },
          { id: 'c', text: 'عمر بن الخطاب' },
          { id: 'd', text: 'زيد بن حارثة' },
        ],
        correctAnswer: 'a',
        explanation: 'علي بن أبي طالب نام في فراش النبي ﷺ ليلة الهجرة',
      },
      {
        type: QuestionType.TRUE_FALSE,
        questionText: 'اختبأ النبي ﷺ وأبو بكر في غار حراء',
        options: [
          { id: 'true', text: 'صحيح' },
          { id: 'false', text: 'خطأ' },
        ],
        correctAnswer: 'false',
        explanation: 'اختبآ في غار ثور وليس غار حراء',
      },
    ],
    finalQuizQuestions: [
      {
        type: QuestionType.WHO_SAID_IT,
        questionText: 'من قال: "لا تحزن إن الله معنا"؟',
        options: [
          { id: 'a', text: 'النبي ﷺ' },
          { id: 'b', text: 'أبو بكر الصديق' },
          { id: 'c', text: 'علي بن أبي طالب' },
          { id: 'd', text: 'جبريل عليه السلام' },
        ],
        correctAnswer: 'a',
        explanation: 'قالها النبي ﷺ لأبي بكر في غار ثور لما حزن',
      },
      {
        type: QuestionType.MCQ,
        questionText: 'أول شيء بناه النبي ﷺ عند وصوله المدينة؟',
        options: [
          { id: 'a', text: 'المسجد النبوي' },
          { id: 'b', text: 'بيته' },
          { id: 'c', text: 'السوق' },
          { id: 'd', text: 'القلعة' },
        ],
        correctAnswer: 'a',
        explanation: 'أول ما بناه النبي ﷺ هو المسجد النبوي',
      },
      {
        type: QuestionType.ARRANGE,
        questionText: 'رتب أحداث الهجرة إلى المدينة',
        options: [
          { id: '1', text: 'تآمر قريش على قتل النبي ﷺ' },
          { id: '2', text: 'الاختباء في غار ثور' },
          { id: '3', text: 'الوصول إلى المدينة' },
          { id: '4', text: 'بناء المسجد النبوي' },
        ],
        correctAnswer: '1,2,3,4',
        explanation: 'تآمرت قريش فهاجر واختبأ في غار ثور ثم وصل المدينة وبنى المسجد',
      },
      {
        type: QuestionType.FILL_BLANK,
        questionText: 'آخى النبي ﷺ بين المهاجرين و___',
        options: [
          { id: 'a', text: 'الأنصار' },
          { id: 'b', text: 'قريش' },
          { id: 'c', text: 'اليهود' },
        ],
        correctAnswer: 'a',
        explanation: 'آخى بين المهاجرين الذين جاءوا من مكة والأنصار أهل المدينة',
      },
      {
        type: QuestionType.TRUE_FALSE,
        questionText: 'استقبل أهل المدينة النبي ﷺ بالفرح والأناشيد',
        options: [
          { id: 'true', text: 'صحيح' },
          { id: 'false', text: 'خطأ' },
        ],
        correctAnswer: 'true',
        explanation: 'نعم، استقبلوه بفرح عظيم وأنشدوا: طلع البدر علينا',
      },
    ],
  },
];

// ─── Seed Function ─────────────────────────────────────────────────

async function main() {
  console.log('Seeding database...');

  // Clean existing data
  await prisma.quizQuestion.deleteMany();
  await prisma.storyPanel.deleteMany();
  await prisma.stageProgress.deleteMany();
  await prisma.stage.deleteMany();
  await prisma.stageGroup.deleteMany();

  // Create stage group
  const group = await prisma.stageGroup.create({
    data: {
      orderIndex: 0,
      title: 'السيرة النبوية - الجزء الأول',
    },
  });

  console.log(`Created stage group: ${group.title}`);

  for (let i = 0; i < stages.length; i++) {
    const stageData = stages[i];
    const xpPerQuestion = 10;
    const totalQuestions = stageData.inlineQuestions.length + stageData.finalQuizQuestions.length;
    const maxScore = totalQuestions * xpPerQuestion;

    const stage = await prisma.stage.create({
      data: {
        groupId: group.id,
        orderIndex: i,
        title: stageData.title,
        arabicTitle: stageData.arabicTitle,
        description: stageData.description,
        maxScore,
      },
    });

    // Create story panels
    for (let p = 0; p < stageData.panels.length; p++) {
      await prisma.storyPanel.create({
        data: {
          stageId: stage.id,
          orderIndex: p,
          narrationText: stageData.panels[p],
        },
      });
    }

    // Create inline questions (orderIndex 0-1)
    for (let q = 0; q < stageData.inlineQuestions.length; q++) {
      const question = stageData.inlineQuestions[q];
      await prisma.quizQuestion.create({
        data: {
          stageId: stage.id,
          type: question.type,
          questionText: question.questionText,
          options: question.options as any,
          correctAnswer: question.correctAnswer,
          explanation: question.explanation,
          xpValue: xpPerQuestion,
          isInline: true,
          orderIndex: q,
        },
      });
    }

    // Create final quiz questions (orderIndex starts after inline)
    for (let q = 0; q < stageData.finalQuizQuestions.length; q++) {
      const question = stageData.finalQuizQuestions[q];
      await prisma.quizQuestion.create({
        data: {
          stageId: stage.id,
          type: question.type,
          questionText: question.questionText,
          options: question.options as any,
          correctAnswer: question.correctAnswer,
          explanation: question.explanation,
          xpValue: xpPerQuestion,
          isInline: false,
          orderIndex: stageData.inlineQuestions.length + q,
        },
      });
    }

    console.log(
      `  Stage ${i + 1}: ${stageData.arabicTitle} — ${stageData.panels.length} panels, ${stageData.inlineQuestions.length} inline, ${stageData.finalQuizQuestions.length} final quiz`,
    );
  }

  // Summary
  const totalPanels = stages.reduce((s, st) => s + st.panels.length, 0);
  const totalInline = stages.reduce((s, st) => s + st.inlineQuestions.length, 0);
  const totalFinal = stages.reduce((s, st) => s + st.finalQuizQuestions.length, 0);

  console.log('\nSeed complete!');
  console.log(`  Stages: ${stages.length}`);
  console.log(`  Story panels: ${totalPanels}`);
  console.log(`  Inline questions: ${totalInline}`);
  console.log(`  Final quiz questions: ${totalFinal}`);
  console.log(`  Total questions: ${totalInline + totalFinal}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
