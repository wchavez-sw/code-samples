import cn from "classnames";

import Avatar from "@components/Avatar";

import { mappers } from "@utils";
import { ChatItemProps } from "@interfaces/components";
import { useChatContext } from "@contexts/chat";

const ChatItem: React.FC<ChatItemProps> = ({
  chatId,
  user,
  supportStatus,
  lastMessageTime,
  onSelect,
}) => {
  const { currentChatId } = useChatContext();

  return (
    <div
      className={cn(
        "flex gap-2 justify-between items-stretch py-3 px-6 cursor-pointer hover:bg-gray-50",
        {
          "bg-gray-50": currentChatId === chatId,
        }
      )}
      role="button"
      onClick={onSelect}
    >
      <div className="flex items-center gap-4">
        <Avatar name={user.name} image={user.avatarUri} />

        <div className="flex flex-col">
          <p className="font-bold text-primary line-clamp-2">{user.name}</p>
          <p className="text-xs text-custom-gray font-semibold truncate">
            {user.walletId}
          </p>
          <p className="text-xs text-custom-gray truncate">
            {user.phoneNumber}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <div
          className={cn("text-xs text-white rounded-xl px-2 py-1", {
            "bg-primary bg-opacity-50": supportStatus === "closed",
            "bg-primary": supportStatus === "open",
          })}
        >
          {mappers.mapSupportStatus(supportStatus)}
        </div>

        <div className="flex-1"></div>

        <p className="text-xs text-custom-gray">{lastMessageTime}</p>
      </div>
    </div>
  );
};

export default ChatItem;
