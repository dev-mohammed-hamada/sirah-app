import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGoalDto } from './dto/create-goal.dto';

@Injectable()
export class GoalsService {
  constructor(private prisma: PrismaService) {}

  async create(fatherId: string, dto: CreateGoalDto) {
    const link = await this.prisma.userLink.findFirst({
      where: {
        fromId: fatherId,
        toId: dto.sonId,
        status: 'ACCEPTED',
      },
    });

    if (!link) {
      throw new BadRequestException('الابن غير مرتبط بك');
    }

    return this.prisma.goal.create({
      data: {
        fatherId,
        sonId: dto.sonId,
        description: dto.description,
        stageGroupId: dto.stageGroupId,
        deadline: new Date(dto.deadline),
        rewardDescription: dto.rewardDescription,
      },
      include: {
        son: { select: { displayName: true, username: true } },
        stageGroup: { select: { title: true } },
      },
    });
  }

  async getFatherGoals(fatherId: string) {
    return this.prisma.goal.findMany({
      where: { fatherId },
      orderBy: { createdAt: 'desc' },
      include: {
        son: { select: { id: true, displayName: true, username: true } },
        stageGroup: { select: { title: true } },
      },
    });
  }

  async getSonGoals(sonId: string) {
    return this.prisma.goal.findMany({
      where: { sonId },
      orderBy: { createdAt: 'desc' },
      include: {
        father: { select: { id: true, displayName: true } },
        stageGroup: { select: { title: true } },
      },
    });
  }

  async updateStatus(goalId: string, userId: string, status: 'COMPLETED' | 'EXPIRED') {
    const goal = await this.prisma.goal.findUnique({ where: { id: goalId } });

    if (!goal || (goal.fatherId !== userId && goal.sonId !== userId)) {
      throw new NotFoundException('الهدف غير موجود');
    }

    return this.prisma.goal.update({
      where: { id: goalId },
      data: { status },
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async expireGoals() {
    await this.prisma.goal.updateMany({
      where: {
        status: 'ACTIVE',
        deadline: { lt: new Date() },
      },
      data: { status: 'EXPIRED' },
    });
  }
}
