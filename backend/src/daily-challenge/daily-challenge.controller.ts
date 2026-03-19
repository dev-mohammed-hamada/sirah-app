import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { DailyChallengeService } from './daily-challenge.service';

@Controller('daily-challenge')
@UseGuards(JwtAuthGuard)
export class DailyChallengeController {
  constructor(private dailyChallengeService: DailyChallengeService) {}

  @Get()
  getChallenge(@CurrentUser() user: { id: string }) {
    return this.dailyChallengeService.getDailyChallenge(user.id);
  }

  @Post('submit')
  submit(
    @CurrentUser() user: { id: string },
    @Body() body: { questionId: string; selectedAnswer: string },
  ) {
    return this.dailyChallengeService.submitChallenge(
      user.id,
      body.questionId,
      body.selectedAnswer,
    );
  }
}
