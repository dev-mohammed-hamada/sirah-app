export interface NotificationPayload {
  title: string;
  body: string;
  data?: Record<string, string>;
}

export enum NotificationType {
  STAGE_COMPLETED = 'STAGE_COMPLETED',
  GOAL_CREATED = 'GOAL_CREATED',
  GOAL_COMPLETED = 'GOAL_COMPLETED',
  GOAL_EXPIRED = 'GOAL_EXPIRED',
  STREAK_REMINDER = 'STREAK_REMINDER',
  LINK_REQUEST = 'LINK_REQUEST',
  LINK_ACCEPTED = 'LINK_ACCEPTED',
}
