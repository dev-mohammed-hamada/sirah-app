import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StreakService } from '../progress/streak.service';

@Injectable()
export class DailyChallengeService {
  constructor(
    private prisma: PrismaService,
    private streakService: StreakService,
  ) {}

  async getDailyChallenge(userId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingLog = await this.prisma.dailyChallengeLog.findFirst({
      where: {
        userId,
        completedAt: { gte: today },
      },
    });

    if (existingLog) {
      return { completed: true, correct: existingLog.correct };
    }

    const completedStages = await this.prisma.stageProgress.findMany({
      where: { userId },
      select: { stageId: true },
    });

    if (completedStages.length === 0) {
      return null;
    }

    const stageIds = completedStages.map((s: { stageId: string }) => s.stageId);

    const questionCount = await this.prisma.quizQuestion.count({
      where: { stageId: { in: stageIds } },
    });

    if (questionCount === 0) {
      return null;
    }

    const randomSkip = Math.floor(Math.random() * questionCount);
    const [question] = await this.prisma.quizQuestion.findMany({
      where: { stageId: { in: stageIds } },
      skip: randomSkip,
      take: 1,
    });

    return {
      completed: false,
      question: {
        id: question.id,
        type: question.type,
        questionText: question.questionText,
        options: question.options,
        xpValue: question.xpValue,
      },
    };
  }

  async submitChallenge(userId: string, questionId: string, selectedAnswer: string) {
    const question = await this.prisma.quizQuestion.findUnique({
      where: { id: questionId },
    });

    if (!question) {
      throw new NotFoundException('السؤال غير موجود');
    }

    const correct = question.correctAnswer === selectedAnswer;
    const xpEarned = correct ? question.xpValue : 0;

    await this.prisma.dailyChallengeLog.create({
      data: { userId, questionId, correct, xpEarned },
    });

    if (xpEarned > 0) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { xp: { increment: xpEarned } },
      });
    }

    await this.streakService.checkAndUpdateStreak(userId);

    return {
      correct,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      xpEarned,
    };
  }
}
