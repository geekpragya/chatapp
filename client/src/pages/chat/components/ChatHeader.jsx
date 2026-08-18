import { Phone, Video, Info } from "lucide-react";
import Avatar from "./Avatar";

const ChatHeader = ({ contact }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-3.5">
      <div className="flex items-center gap-3">
        <Avatar name={contact.name} online={contact.online} />
        <div>
          <p className="text-sm font-semibold text-black">{contact.name}</p>
          <p className="text-xs text-gray-400">
            {contact.isGroup ? "5 members" : contact.online ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button className="flex size-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-purple-600">
          <Phone className="size-[18px]" />
        </button>
        <button className="flex size-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-purple-600">
          <Video className="size-[18px]" />
        </button>
        <button className="flex size-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-purple-600">
          <Info className="size-[18px]" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
