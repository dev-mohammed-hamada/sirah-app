import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MAX_FATHERS_PER_SON } from '@sirah/shared';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        linkedTo: {
          where: { status: 'ACCEPTED' },
          include: { to: true },
        },
        linkedFrom: {
          where: { status: 'ACCEPTED' },
          include: { from: true },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('المستخدم غير موجود');
    }

    const linkedAccounts = [
      ...user.linkedTo.map((link) => ({
        id: link.id,
        userId: link.to.id,
        displayName: link.to.displayName,
        username: link.to.username,
        accountType: link.to.accountType,
        linkStatus: link.status,
      })),
      ...user.linkedFrom.map((link) => ({
        id: link.id,
        userId: link.from.id,
        displayName: link.from.displayName,
        username: link.from.username,
        accountType: link.from.accountType,
        linkStatus: link.status,
      })),
    ];

    return {
      id: user.id,
      displayName: user.displayName,
      username: user.username,
      accountType: user.accountType,
      age: user.age,
      xp: user.xp,
      streak: user.streak,
      heartsRemaining: user.heartsRemaining,
      linkedAccounts,
    };
  }

  async updateProfile(userId: string, data: { displayName?: string; fcmToken?: string }) {
    return this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  async searchByUsername(username: string) {
    const users = await this.prisma.user.findMany({
      where: {
        username: { contains: username, mode: 'insensitive' },
      },
      select: {
        id: true,
        displayName: true,
        username: true,
        accountType: true,
      },
      take: 10,
    });
    return users;
  }

  async sendLinkRequest(fromId: string, toUsername: string) {
    const fromUser = await this.prisma.user.findUnique({ where: { id: fromId } });
    if (!fromUser || fromUser.accountType !== 'FATHER') {
      throw new BadRequestException('فقط الأب يمكنه إرسال طلب ربط');
    }

    const toUser = await this.prisma.user.findUnique({ where: { username: toUsername } });
    if (!toUser || toUser.accountType !== 'SON') {
      throw new BadRequestException('المستخدم غير موجود أو ليس ابناً');
    }

    const existingFathers = await this.prisma.userLink.count({
      where: { toId: toUser.id, status: 'ACCEPTED' },
    });

    if (existingFathers >= MAX_FATHERS_PER_SON) {
      throw new BadRequestException('الابن مرتبط بالحد الأقصى من الآباء');
    }

    const existingLink = await this.prisma.userLink.findUnique({
      where: { fromId_toId: { fromId, toId: toUser.id } },
    });

    if (existingLink) {
      throw new BadRequestException('طلب الربط موجود بالفعل');
    }

    return this.prisma.userLink.create({
      data: { fromId, toId: toUser.id },
    });
  }

  async respondToLinkRequest(linkId: string, userId: string, accept: boolean) {
    const link = await this.prisma.userLink.findUnique({ where: { id: linkId } });

    if (!link || link.toId !== userId) {
      throw new NotFoundException('طلب الربط غير موجود');
    }

    if (link.status !== 'PENDING') {
      throw new BadRequestException('تم الرد على طلب الربط مسبقاً');
    }

    if (accept) {
      const existingFathers = await this.prisma.userLink.count({
        where: { toId: userId, status: 'ACCEPTED' },
      });

      if (existingFathers >= MAX_FATHERS_PER_SON) {
        throw new BadRequestException('لقد وصلت للحد الأقصى من الآباء المرتبطين');
      }
    }

    return this.prisma.userLink.update({
      where: { id: linkId },
      data: { status: accept ? 'ACCEPTED' : 'DECLINED' },
    });
  }

  async getLinkedAccounts(userId: string) {
    const links = await this.prisma.userLink.findMany({
      where: {
        OR: [{ fromId: userId }, { toId: userId }],
        status: 'ACCEPTED',
      },
      include: { from: true, to: true },
    });

    return links.map((link) => {
      const other = link.fromId === userId ? link.to : link.from;
      return {
        linkId: link.id,
        userId: other.id,
        displayName: other.displayName,
        username: other.username,
        accountType: other.accountType,
      };
    });
  }

  async getPendingLinkRequests(userId: string) {
    return this.prisma.userLink.findMany({
      where: { toId: userId, status: 'PENDING' },
      include: {
        from: {
          select: { id: true, displayName: true, username: true, accountType: true },
        },
      },
    });
  }

  async unlink(linkId: string, userId: string) {
    const link = await this.prisma.userLink.findUnique({ where: { id: linkId } });

    if (!link || (link.fromId !== userId && link.toId !== userId)) {
      throw new NotFoundException('الربط غير موجود');
    }

    return this.prisma.userLink.delete({ where: { id: linkId } });
  }
}
