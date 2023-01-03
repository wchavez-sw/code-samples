import cn from "classnames";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";

interface Props {
  className?: string;
}

const IconWithCounter: React.FC<Props> = ({ className }) => {
  const counter = 1;

  return (
    <div className={cn("relative", className)}>
      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-error  text-[8px] flex items-center justify-center text-white">
        {counter}
      </span>
      <ChatBubbleBottomCenterIcon className="h-6 w-6" />
    </div>
  );
};

export default IconWithCounter;
