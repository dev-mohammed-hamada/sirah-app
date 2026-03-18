import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ProgressService } from './progress.service';
import { HeartsService } from './hearts.service';

@Controller('progress')
@UseGuards(JwtAuthGuard)
export class ProgressController {
  constructor(
    private progressService: ProgressService,
    private heartsService: HeartsService,
  ) {}

  @Post('submit-answer')
  submitAnswer(
    @CurrentUser() user: { id: string },
    @Body() body: { stageId: string; questionId: string; selectedAnswer: string; timeMs: number },
  ) {
    return this.progressService.submitAnswer(user.id, body);
  }

  @Post('complete-stage')
  completeStage(
    @CurrentUser() user: { id: string },
    @Body()
    body: {
      stageId: string;
      answers: { questionId: string; selectedAnswer: string; timeMs: number }[];
    },
  ) {
    return this.progressService.completeStage(user.id, body);
  }

  @Get('me')
  getSummary(@CurrentUser() user: { id: string }) {
    return this.progressService.getProgressSummary(user.id);
  }

  @Get('hearts')
  getHearts(@CurrentUser() user: { id: string }) {
    return this.heartsService.getHearts(user.id);
  }
}
