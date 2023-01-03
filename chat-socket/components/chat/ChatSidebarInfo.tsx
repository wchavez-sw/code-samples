import { useQuery } from "@tanstack/react-query";
import { chatServices } from "@services";
import { useChatContext } from "@contexts/chat";
import SidebarUserInfo from "./SidebarUserInfo";
import Spinner from "@components/Spinner";
import { markHasClosed } from "@services/chat";

const ChatSidebarInfo = () => {
  const { currentChatId } = useChatContext();

  const { data: conversation, isLoading: isLoadingConversation } = useQuery(
    ["GET_CONVERSATION", currentChatId],
    () => chatServices.getConversation({ id: currentChatId! }),
    {
      enabled: !!currentChatId,
    }
  );

  const isLoading = isLoadingConversation;

  if (!currentChatId) {
    return (
      <div className="hidden lg:flex h-full items-center justify-center bg-slate-100">
        <p className="text-gray-400 text-lg">Más Detalles</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="hidden lg:flex h-full items-center justify-center bg-slate-100">
        <div className="flex flex-col gap-2 items-center">
          <Spinner />
          <p className="text-gray-400 text-lg">Cargando Detalles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <SidebarUserInfo
        user={{
          name: conversation?.creator.fullname,
          phoneNumber: conversation?.creator.phoneNumber,
          walletId: "thisisWalletId",
        }}
        country={conversation?.creator.country}
        email={conversation?.creator.email}
        markHasClosed={() => markHasClosed(currentChatId)}
      />
    </div>
  );
};

export default ChatSidebarInfo;
