import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private prisma: PrismaService) {}

  async sendToUser(userId: string, title: string, body: string, data?: Record<string, string>) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { fcmToken: true },
    });

    if (!user?.fcmToken) {
      this.logger.warn(`No FCM token for user ${userId}`);
      return;
    }

    // TODO: Initialize Firebase Admin and send notification
    // const message = { notification: { title, body }, data, token: user.fcmToken };
    // await admin.messaging().send(message);
    this.logger.log(`Notification sent to ${userId}: ${title}`);
  }

  async sendStageCompleteNotification(fatherId: string, sonName: string, stageName: string) {
    await this.sendToUser(fatherId, 'إنجاز جديد! 🌟', `${sonName} أكمل مرحلة ${stageName}`);
  }

  async sendGoalCreatedNotification(sonId: string, goalDescription: string) {
    await this.sendToUser(sonId, 'هدف جديد! 🎯', goalDescription);
  }

  async sendStreakReminder(userId: string, currentStreak: number) {
    await this.sendToUser(
      userId,
      'لا تفقد سلسلتك! 🔥',
      `سلسلتك الحالية ${currentStreak} أيام. أكمل مرحلة اليوم!`,
    );
  }

  async sendLinkRequestNotification(sonId: string, fatherName: string) {
    await this.sendToUser(sonId, 'طلب ربط جديد', `${fatherName} يريد متابعة تقدمك`);
  }
}
