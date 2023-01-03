import { createContext, useContext } from "react";
import { SocketMessage } from "@interfaces/responses";
import { Socket } from "socket.io-client";

export interface ServerToClientEvents {
  onMessage: (message: SocketMessage) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
}

interface ContextProps {
  currentChatId?: string;
  setCurrentChat: (id: string) => void;
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  online: boolean;
}

export const ChatContext = createContext({} as ContextProps);

export const useChatContext = () => useContext(ChatContext);
