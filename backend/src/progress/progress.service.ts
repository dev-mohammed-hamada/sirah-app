import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HeartsService } from './hearts.service';
import { StreakService } from './streak.service';
import { XpService } from './xp.service';

interface SubmitAnswerInput {
  stageId: string;
  questionId: string;
  selectedAnswer: string;
  timeMs: number;
}

interface CompleteStageInput {
  stageId: string;
  answers: { questionId: string; selectedAnswer: string; timeMs: number }[];
}

@Injectable()
export class ProgressService {
  constructor(
    private prisma: PrismaService,
    private heartsService: HeartsService,
    private streakService: StreakService,
    private xpService: XpService,
  ) {}

  async submitAnswer(userId: string, input: SubmitAnswerInput) {
    const question = await this.prisma.quizQuestion.findUniqueOrThrow({
      where: { id: input.questionId },
    });

    const correct = question.correctAnswer === input.selectedAnswer;

    if (!correct) {
      await this.heartsService.useHeart(userId);
    }

    return {
      questionId: input.questionId,
      correct,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      xpEarned: correct ? question.xpValue : 0,
    };
  }

  async completeStage(userId: string, input: CompleteStageInput) {
    const stage = await this.prisma.stage.findUniqueOrThrow({
      where: { id: input.stageId },
      include: { quizQuestions: { where: { isInline: false } } },
    });

    const questions = await this.prisma.quizQuestion.findMany({
      where: { id: { in: input.answers.map((a) => a.questionId) } },
    });

    const questionMap = new Map(questions.map((q) => [q.id, q]));

    let correctCount = 0;
    const answerResults = input.answers.map((answer) => {
      const question = questionMap.get(answer.questionId);
      if (!question) {
        throw new BadRequestException(`السؤال ${answer.questionId} غير موجود`);
      }
      const correct = question.correctAnswer === answer.selectedAnswer;
      if (correct) correctCount++;
      return {
        correct,
        xpValue: question.xpValue,
        timeMs: answer.timeMs,
        isFirstTry: true,
      };
    });

    const totalQuestions = input.answers.length;
    const scorePercent = Math.round((correctCount / totalQuestions) * 100);
    const isPerfect = correctCount === totalQuestions;
    const starsEarned = this.xpService.calculateStars(scorePercent);
    const xpEarned = this.xpService.calculateXp(answerResults, isPerfect);

    const existingProgress = await this.prisma.stageProgress.findUnique({
      where: { userId_stageId: { userId, stageId: input.stageId } },
    });

    const isNewBest = !existingProgress || scorePercent > existingProgress.bestScore;

    if (isNewBest) {
      await this.prisma.stageProgress.upsert({
        where: { userId_stageId: { userId, stageId: input.stageId } },
        create: {
          userId,
          stageId: input.stageId,
          bestScore: scorePercent,
          starsEarned,
        },
        update: {
          bestScore: scorePercent,
          starsEarned: Math.max(starsEarned, existingProgress?.starsEarned ?? 0),
          attempts: { increment: 1 },
        },
      });
    } else if (existingProgress) {
      await this.prisma.stageProgress.update({
        where: { id: existingProgress.id },
        data: { attempts: { increment: 1 } },
      });
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { xp: { increment: xpEarned } },
    });

    const streakResult = await this.streakService.checkAndUpdateStreak(userId);

    return {
      score: correctCount,
      maxScore: totalQuestions,
      scorePercent,
      starsEarned,
      isNewBest,
      xpEarned,
      totalXp: updatedUser.xp,
      streakUpdated: streakResult.updated,
      currentStreak: streakResult.streak,
    };
  }

  async getProgressSummary(userId: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { xp: true, streak: true, lastActiveDate: true },
    });

    const stageProgress = await this.prisma.stageProgress.findMany({
      where: { userId },
    });

    const totalStages = await this.prisma.stage.count();
    const totalStars = stageProgress.reduce((sum, p) => sum + p.starsEarned, 0);
    const hearts = await this.heartsService.getHearts(userId);

    return {
      totalXp: user.xp,
      currentStreak: user.streak,
      totalStars,
      stagesCompleted: stageProgress.length,
      totalStages,
      hearts,
    };
  }
}
