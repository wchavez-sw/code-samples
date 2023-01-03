import { ChatItem } from "@components/chat";
import { useChatContext } from "@contexts/chat";
import { chatServices } from "@services";
import { useQuery } from "@tanstack/react-query";
import { converters } from "@utils";

const ChatList = () => {
  const { data = [] } = useQuery(
    ["GET_CONVERSATIONS"],
    chatServices.getConversations
  );

  const { setCurrentChat } = useChatContext();

  return (
    <div className="col-span-full lg:col-span-1 divide-y h-full overflow-y-auto styled-scrollbar">
      {data.map((conversation) => (
        <ChatItem
          key={conversation.id}
          chatId={conversation.id}
          user={{
            name: conversation.creator.fullname,
            walletId: conversation.creator.wyreId!,
            phoneNumber: conversation.creator.phoneNumber!,
          }}
          lastMessageTime={converters.formatDate(
            conversation?.lastMessageSent?.createdAt,
            "DD/MM - hh:mm a"
          )}
          supportStatus={conversation?.status}
          onSelect={() => setCurrentChat(conversation.id)}
        />
      ))}
    </div>
  );
};

export default ChatList;
