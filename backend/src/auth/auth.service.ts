import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });

    if (existing) {
      throw new ConflictException('اسم المستخدم مستخدم بالفعل');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        displayName: dto.displayName,
        username: dto.username,
        passwordHash,
        accountType: dto.accountType,
        age: dto.age,
      },
    });

    const token = this.generateToken(user);

    return {
      accessToken: token,
      user: this.sanitizeUser(user),
    };
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('بيانات الدخول غير صحيحة');
    }

    const token = this.generateToken(user);

    return {
      accessToken: token,
      user: this.sanitizeUser(user),
    };
  }

  async validateUser(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async checkUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    return { available: !user };
  }

  private generateToken(user: { id: string; username: string; accountType: string }) {
    const payload = {
      sub: user.id,
      username: user.username,
      accountType: user.accountType,
    };
    return this.jwtService.sign(payload);
  }

  private sanitizeUser(user: {
    id: string;
    displayName: string;
    username: string;
    accountType: string;
    age: number | null;
    xp: number;
    streak: number;
    heartsRemaining: number;
  }) {
    return {
      id: user.id,
      displayName: user.displayName,
      username: user.username,
      accountType: user.accountType,
      age: user.age,
      xp: user.xp,
      streak: user.streak,
      heartsRemaining: user.heartsRemaining,
    };
  }
}
