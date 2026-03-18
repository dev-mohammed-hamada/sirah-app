import { Module } from '@nestjs/common';
import { ProgressModule } from '../progress/progress.module';
import { DailyChallengeController } from './daily-challenge.controller';
import { DailyChallengeService } from './daily-challenge.service';

@Module({
  imports: [ProgressModule],
  controllers: [DailyChallengeController],
  providers: [DailyChallengeService],
})
export class DailyChallengeModule {}
