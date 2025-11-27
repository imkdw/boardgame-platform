import { randomUUID } from 'crypto';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CHAT_NAMESPACE, CHAT_ROOMS } from './chat.const';
import { SendMessageDto } from './dto/send-message.dto';
import { MessageDto, UserEventDto } from './dto/message.dto';

@WebSocketGateway({ namespace: CHAT_NAMESPACE, transports: ['websocket'] })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connections = new Map<string, string>();

  handleConnection(client: Socket): void {
    const nickname = randomUUID().slice(0, 8);
    this.connections.set(client.id, nickname);

    const event: UserEventDto = { nickname };
    this.server.emit(CHAT_ROOMS.USER_JOINED, event);
  }

  handleDisconnect(client: Socket): void {
    const nickname = this.connections.get(client.id);
    this.connections.delete(client.id);

    if (nickname) {
      const event: UserEventDto = { nickname };
      this.server.emit(CHAT_ROOMS.USER_LEFT, event);
    }
  }

  @SubscribeMessage(CHAT_ROOMS.SEND_MESSAGE)
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: SendMessageDto,
  ): void {
    const nickname = this.connections.get(client.id);

    const message: MessageDto = {
      id: randomUUID(),
      nickname: nickname ?? 'unknown',
      content: payload.content,
      timestamp: new Date().toISOString(),
    };

    this.server.emit(CHAT_ROOMS.NEW_MESSAGE, message);
  }
}
