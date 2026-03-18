import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StagesModule } from './stages/stages.module';
import { ProgressModule } from './progress/progress.module';
import { GoalsModule } from './goals/goals.module';
import { DailyChallengeModule } from './daily-challenge/daily-challenge.module';
import { NotificationsModule } from './notifications/notifications.module';
import { EventsModule } from './gateway/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    StagesModule,
    ProgressModule,
    GoalsModule,
    DailyChallengeModule,
    NotificationsModule,
    EventsModule,
  ],
})
export class AppModule {}
