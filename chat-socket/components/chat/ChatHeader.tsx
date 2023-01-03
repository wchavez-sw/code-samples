import cn from "classnames";

import Avatar from "@components/Avatar";

import { mappers } from "@utils";
import { ChatItemUserInfo, SupportStatus } from "@interfaces/components";

interface Props {
  className?: string;
  user: ChatItemUserInfo;
  supportStatus: SupportStatus;
}

const ChatHeader: React.FC<Props> = ({ user, supportStatus }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-slate-200">
      <div className="flex items-center gap-4">
        <Avatar name={user.name} image={user.avatarUri} />
        <div className="flex flex-col">
          <p className="font-bold text-primary truncate">{user.name}</p>
          <p className="text-xs text-custom-gray font-semibold truncate">
            {user.walletId}
          </p>
          <p className="text-xs text-custom-gray truncate">
            {user.phoneNumber}
          </p>
        </div>
      </div>

      <div>
        <div
          className={cn("text-sm text-white rounded-2xl px-3 py-1", {
            "bg-primary bg-opacity-50": supportStatus === "closed",
            "bg-primary": supportStatus === "open",
          })}
        >
          {mappers.mapSupportStatus(supportStatus)}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
