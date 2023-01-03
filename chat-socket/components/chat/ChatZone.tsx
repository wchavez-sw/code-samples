import { useQuery } from "@tanstack/react-query";

import { Spinner } from "@components";
import { ChatHeader, ChatMessages, ChatTypeZone } from "@components/chat";
import { useChatContext } from "@contexts/chat";

import { chatServices } from "@services";

const ChatZone = () => {
  const { currentChatId } = useChatContext();

  const { data: conversation, isLoading: isLoadingConversation } = useQuery(
    ["GET_CONVERSATION", currentChatId],
    () => chatServices.getConversation({ id: currentChatId! }),
    {
      enabled: !!currentChatId,
    }
  );

  const { data: messages, isLoading: isLoadingMessages } = useQuery(
    ["GET_MESSAGES", currentChatId],
    () => chatServices.getConversationMessages({ id: currentChatId! }),
    {
      enabled: !!currentChatId,
      refetchOnWindowFocus: false,
    }
  );

  const isLoading = isLoadingConversation || isLoadingMessages;

  if (!currentChatId) {
    return (
      <div className="hidden lg:flex h-full items-center justify-center bg-slate-100">
        <p className="text-gray-400 text-lg">Selecciona una conversación</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="hidden lg:flex h-full items-center justify-center bg-slate-100">
        <div className="flex flex-col gap-2 items-center">
          <Spinner />
          <p className="text-gray-400 text-lg">Cargando mensajes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden lg:block h-full">
      <ChatHeader
        user={{
          name: conversation!.creator.fullname,
          walletId: "0x1234567890",
          phoneNumber: conversation!.creator.phoneNumber,
        }}
        supportStatus={conversation?.status}
      />

      <ChatMessages messages={messages || []} />

      <ChatTypeZone />
    </div>
  );
};

export default ChatZone;
