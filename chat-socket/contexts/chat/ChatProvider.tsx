import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { ChatContext, ServerToClientEvents, ClientToServerEvents } from "./";

import { useAuthContext } from "@contexts/auth";
import { useSocket } from "@hooks";
import { ui } from "@utils";

interface Props {
  children: React.ReactNode;
}

export const ChatProvider: React.FC<Props> = ({ children }) => {
  const queryClient = useQueryClient();
  const [currentChatId, setCurrentChatId] = useState<string | undefined>(
    undefined
  );
  const { isLoggedIn } = useAuthContext();
  const { socket, online, connectSocket, disconnectSocket } = useSocket<
    ServerToClientEvents,
    ClientToServerEvents
  >(process.env.NEXT_PUBLIC_CHAT_SOCKET_URL as string);

  const setCurrentChat = (id: string) => setCurrentChatId(id);

  useEffect(() => {
    if (isLoggedIn) {
      connectSocket();
    }
  }, [isLoggedIn, connectSocket]);

  useEffect(() => {
    if (!isLoggedIn) {
      disconnectSocket();
    }
  }, [isLoggedIn, disconnectSocket]);

  useEffect(() => {
    socket?.on("onMessage", async (value) => {
      // Sync the cache with the new message
      await queryClient.setQueryData(
        ["GET_MESSAGES", currentChatId],
        (oldData) => {
          console.log(oldData);
          if (oldData && Array.isArray(oldData)) {
            return [...oldData, value.message];
          }
        }
      );

      // Scroll to the bottom of the chat
      ui.scrollToBottomAnimated("chat-messages");
    });
  }, [socket, queryClient, currentChatId]);

  return (
    <ChatContext.Provider
      value={{
        socket,
        online,
        currentChatId,
        setCurrentChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
