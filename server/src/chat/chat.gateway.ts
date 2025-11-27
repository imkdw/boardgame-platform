import { WebSocketGateway } from '@nestjs/websockets';
import { CHAT_NAMESPACE } from './chat.const';

@WebSocketGateway({ namespace: CHAT_NAMESPACE, transports: ['websocket'] })
export class ChatGateway {}
