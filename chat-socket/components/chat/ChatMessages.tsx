import { useAuthContext } from "@contexts";
import { useChatContext } from "@contexts/chat";
import { Message } from "@interfaces/responses";
import { ui } from "@utils";
import cn from "classnames";
import dayjs from "dayjs";
import { useEffect } from "react";

interface Props {
  messages: Message[];
}

const ChatMessages: React.FC<Props> = ({ messages }) => {
  const { user } = useAuthContext();
  const { currentChatId } = useChatContext();

  useEffect(() => {
    ui.scrollToBottom("chat-messages");
  }, [currentChatId]);

  return (
    <div
      style={{
        height: "calc(100vh - 356px)",
      }}
      id="chat-messages"
      className="bg-slate-100 p-4 gap-4 flex flex-col overflow-y-auto styled-scrollbar"
    >
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex flex-col items-end rounded-lg py-2 px-4 gap-2 max-w-1/2",
            {
              "self-end bg-success-100": user?.id === message.author.id,
              "self-start bg-white": user?.id !== message.author.id,
            }
          )}
        >
          <p>{message.content}</p>
          <span className="text-xs">
            {dayjs(message.createdAt).format("DD/MM - hh:mm a")}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
