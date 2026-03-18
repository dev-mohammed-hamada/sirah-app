import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';

@Controller('goals')
@UseGuards(JwtAuthGuard)
export class GoalsController {
  constructor(private goalsService: GoalsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('FATHER')
  create(@CurrentUser() user: { id: string }, @Body() dto: CreateGoalDto) {
    return this.goalsService.create(user.id, dto);
  }

  @Get('father')
  @UseGuards(RolesGuard)
  @Roles('FATHER')
  getFatherGoals(@CurrentUser() user: { id: string }) {
    return this.goalsService.getFatherGoals(user.id);
  }

  @Get('son')
  getSonGoals(@CurrentUser() user: { id: string }) {
    return this.goalsService.getSonGoals(user.id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') goalId: string,
    @CurrentUser() user: { id: string },
    @Body('status') status: 'COMPLETED' | 'EXPIRED',
  ) {
    return this.goalsService.updateStatus(goalId, user.id, status);
  }
}
