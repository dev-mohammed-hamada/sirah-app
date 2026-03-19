import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MAX_HEARTS, HEART_REFILL_MINUTES } from '@sirah/shared';

@Injectable()
export class HeartsService {
  constructor(private prisma: PrismaService) {}

  async getHearts(userId: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { heartsRemaining: true, heartsLastRefill: true },
    });

    const now = new Date();
    const msSinceRefill = now.getTime() - user.heartsLastRefill.getTime();
    const refillIntervals = Math.floor(msSinceRefill / (HEART_REFILL_MINUTES * 60 * 1000));

    const currentHearts = Math.min(MAX_HEARTS, user.heartsRemaining + refillIntervals);

    if (currentHearts !== user.heartsRemaining) {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          heartsRemaining: currentHearts,
          heartsLastRefill: currentHearts >= MAX_HEARTS ? now : user.heartsLastRefill,
        },
      });
    }

    const nextRefillAt =
      currentHearts < MAX_HEARTS
        ? new Date(
            user.heartsLastRefill.getTime() +
              (refillIntervals + 1) * HEART_REFILL_MINUTES * 60 * 1000,
          )
        : undefined;

    return {
      remaining: currentHearts,
      maxHearts: MAX_HEARTS,
      nextRefillAt: nextRefillAt?.toISOString(),
    };
  }

  async useHeart(userId: string) {
    const hearts = await this.getHearts(userId);

    if (hearts.remaining <= 0) {
      return { remaining: 0, maxHearts: MAX_HEARTS, canPlay: false };
    }

    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: {
        heartsRemaining: hearts.remaining - 1,
        heartsLastRefill: hearts.remaining === MAX_HEARTS ? new Date() : undefined,
      },
      select: { heartsRemaining: true },
    });

    return {
      remaining: updated.heartsRemaining,
      maxHearts: MAX_HEARTS,
      canPlay: updated.heartsRemaining > 0,
    };
  }
}
