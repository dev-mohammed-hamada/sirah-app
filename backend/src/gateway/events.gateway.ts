import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: '/father-dashboard',
  cors: { origin: '*' },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(EventsGateway.name);

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      client.join(`father:${userId}`);
      this.logger.log(`Father ${userId} connected`);
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  notifyFather(fatherId: string, event: string, data: unknown) {
    this.server.to(`father:${fatherId}`).emit(event, data);
  }

  emitStageCompleted(fatherId: string, data: { sonId: string; stageId: string; stars: number }) {
    this.notifyFather(fatherId, 'stage-completed', data);
  }

  emitGoalCompleted(fatherId: string, data: { goalId: string; sonId: string }) {
    this.notifyFather(fatherId, 'goal-completed', data);
  }
}
