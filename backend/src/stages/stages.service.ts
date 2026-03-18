import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StagesService {
  constructor(private prisma: PrismaService) {}

  async getAllStages(userId: string) {
    const groups = await this.prisma.stageGroup.findMany({
      orderBy: { orderIndex: 'asc' },
      include: {
        stages: {
          orderBy: { orderIndex: 'asc' },
          include: {
            stageProgress: {
              where: { userId },
              select: { bestScore: true, starsEarned: true },
            },
          },
        },
      },
    });

    return groups.map((group) => ({
      id: group.id,
      orderIndex: group.orderIndex,
      title: group.title,
      stages: group.stages.map((stage) => {
        const progress = stage.stageProgress[0];
        return {
          id: stage.id,
          orderIndex: stage.orderIndex,
          title: stage.title,
          arabicTitle: stage.arabicTitle,
          maxScore: stage.maxScore,
          starsEarned: progress?.starsEarned ?? 0,
          isCompleted: !!progress,
        };
      }),
    }));
  }

  async getStageDetail(stageId: string) {
    const stage = await this.prisma.stage.findUnique({
      where: { id: stageId },
      include: {
        storyPanels: { orderBy: { orderIndex: 'asc' } },
      },
    });

    if (!stage) {
      throw new NotFoundException('المرحلة غير موجودة');
    }

    return {
      id: stage.id,
      groupId: stage.groupId,
      orderIndex: stage.orderIndex,
      title: stage.title,
      arabicTitle: stage.arabicTitle,
      description: stage.description,
      maxScore: stage.maxScore,
      storyPanels: stage.storyPanels.map((panel) => ({
        id: panel.id,
        orderIndex: panel.orderIndex,
        narrationText: panel.narrationText,
        imageUrl: panel.imageUrl,
      })),
    };
  }

  async getStageQuestions(stageId: string) {
    const stage = await this.prisma.stage.findUnique({ where: { id: stageId } });
    if (!stage) {
      throw new NotFoundException('المرحلة غير موجودة');
    }

    const questions = await this.prisma.quizQuestion.findMany({
      where: { stageId },
      orderBy: { orderIndex: 'asc' },
    });

    // Exclude correctAnswer from response — validation is server-side only
    return questions.map((q) => ({
      id: q.id,
      type: q.type,
      questionText: q.questionText,
      options: q.options,
      xpValue: q.xpValue,
      isInline: q.isInline,
      orderIndex: q.orderIndex,
    }));
  }
}
