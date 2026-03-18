import { AccountType, LinkStatus } from '../enums';

export interface User {
  id: string;
  displayName: string;
  username: string;
  accountType: AccountType;
  age?: number;
  xp: number;
  streak: number;
  lastActiveDate?: string;
  heartsRemaining: number;
  heartsLastRefill: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  displayName: string;
  username: string;
  accountType: AccountType;
  age?: number;
  xp: number;
  streak: number;
  heartsRemaining: number;
  nextHeartRefill?: string;
  linkedAccounts: LinkedAccount[];
}

export interface LinkedAccount {
  id: string;
  userId: string;
  displayName: string;
  username: string;
  accountType: AccountType;
  linkStatus: LinkStatus;
}

export interface CreateUserDto {
  displayName: string;
  username: string;
  password: string;
  accountType: AccountType;
  age?: number;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: UserProfile;
}

export interface CheckUsernameResponse {
  available: boolean;
}
