import { Injectable } from '@nestjs/common';
import { XP_BONUS } from '@sirah/shared';

interface AnswerData {
  correct: boolean;
  xpValue: number;
  timeMs: number;
  isFirstTry: boolean;
}

@Injectable()
export class XpService {
  calculateXp(answers: AnswerData[], isPerfect: boolean): number {
    let totalXp = 0;

    for (const answer of answers) {
      if (answer.correct) {
        totalXp += answer.xpValue;

        if (answer.timeMs < 5000) {
          totalXp += XP_BONUS.SPEED;
        }

        if (answer.isFirstTry) {
          totalXp += XP_BONUS.FIRST_TRY;
        }
      }
    }

    if (isPerfect) {
      totalXp += XP_BONUS.PERFECT_RUN;
    }

    return totalXp;
  }

  calculateStars(scorePercent: number): number {
    if (scorePercent >= 81) return 3;
    if (scorePercent >= 51) return 2;
    if (scorePercent >= 1) return 1;
    return 0;
  }
}
