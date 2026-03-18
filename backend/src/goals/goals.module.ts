import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { GoalsController } from './goals.controller';
import { GoalsService } from './goals.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [GoalsController],
  providers: [GoalsService],
  exports: [GoalsService],
})
export class GoalsModule {}
