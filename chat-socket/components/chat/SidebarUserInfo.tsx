import { Avatar } from "@components";
import { SidebarUserInfoProps } from "@interfaces/components";
import ChatSidebarAction from "./ChatSidebarActions";

const SidebarUserInfo: React.FC<SidebarUserInfoProps> = ({
  user,
  country,
  email,
  markHasClosed,
}) => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col w-full items-center gap-4 mt-6">
        <Avatar name={user.name} image={user.avatarUri} />
        <span className="text-2xl font-bold text-primary line-clamp-2">
          {user.name}
        </span>
      </div>

      <div className="mt-16 flex flex-col justify-between h-52">
        <p className="flex flex-col items-center gap-2 text-black font-bold">
          Número Telefónico
          <span className="text-xs text-custom-gray">{user.phoneNumber}</span>
        </p>

        <p className="flex flex-col items-center gap-2 text-black font-bold">
          País
          <span className="text-xs text-custom-gray">{country}</span>
        </p>

        <p className="flex flex-col items-center gap-2 text-black font-bold">
          Correo
          <span className="text-xs text-custom-gray">{email}</span>
        </p>
      </div>

      <ChatSidebarAction modifyStatus={markHasClosed} />
    </div>
  );
};

export default SidebarUserInfo;
