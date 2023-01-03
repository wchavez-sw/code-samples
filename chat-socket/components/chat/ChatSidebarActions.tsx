// import { Conversation } from "@interfaces/responses"
import { MouseEventHandler } from "react";

interface Props {
  modifyStatus: () => void;
}

const ChatSidebarAction: React.FC<Props> = ({ modifyStatus }) => {
  return (
    <div className="flex flex-col justify-center items-center h-52 gap-8">
      <button
        className="w-2/3 bg-primary text-white py-2 rounded-3xl hover:bg-primary-600 hover:text-gray-100 hover:border-primary-600"
        onClick={modifyStatus as MouseEventHandler<HTMLButtonElement>}
      >
        Cerrar Chat
      </button>

      <button className="w-2/3 border border-solid border-red-600 text-red-600 py-2 rounded-3xl hover:bg-red-400 hover:text-white hover:border-none">
        Eliminar Chat
      </button>
    </div>
  );
};

export default ChatSidebarAction;
