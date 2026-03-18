import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { StagesService } from './stages.service';

@Controller('stages')
@UseGuards(JwtAuthGuard)
export class StagesController {
  constructor(private stagesService: StagesService) {}

  @Get()
  getAll(@CurrentUser() user: { id: string }) {
    return this.stagesService.getAllStages(user.id);
  }

  @Get(':id')
  getDetail(@Param('id') id: string) {
    return this.stagesService.getStageDetail(id);
  }

  @Get(':id/questions')
  getQuestions(@Param('id') id: string) {
    return this.stagesService.getStageQuestions(id);
  }
}
