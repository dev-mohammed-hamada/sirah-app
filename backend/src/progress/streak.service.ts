import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StreakService {
  constructor(private prisma: PrismaService) {}

  async checkAndUpdateStreak(userId: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { streak: true, lastActiveDate: true },
    });

    const today = this.getDateOnly(new Date());
    const lastActive = user.lastActiveDate ? this.getDateOnly(user.lastActiveDate) : null;

    if (lastActive && lastActive.getTime() === today.getTime()) {
      return { streak: user.streak, updated: false };
    }

    let newStreak: number;

    if (lastActive) {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastActive.getTime() === yesterday.getTime()) {
        newStreak = user.streak + 1;
      } else {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { streak: newStreak, lastActiveDate: new Date() },
    });

    return { streak: newStreak, updated: true };
  }

  async getStreak(userId: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { streak: true, lastActiveDate: true },
    });

    const today = this.getDateOnly(new Date());
    const lastActive = user.lastActiveDate ? this.getDateOnly(user.lastActiveDate) : null;
    const isActiveToday = lastActive?.getTime() === today.getTime();

    return {
      current: user.streak,
      lastActiveDate: user.lastActiveDate?.toISOString(),
      isActiveToday,
    };
  }

  private getDateOnly(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
}
