import { Module } from '@nestjs/common';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';
import { HeartsService } from './hearts.service';
import { StreakService } from './streak.service';
import { XpService } from './xp.service';

@Module({
  controllers: [ProgressController],
  providers: [ProgressService, HeartsService, StreakService, XpService],
  exports: [ProgressService, HeartsService, StreakService],
})
export class ProgressModule {}
