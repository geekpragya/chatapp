import { Phone, Video, Info } from "lucide-react";
import Avatar from "./Avatar";

const ChatHeader = ({ contact, memberCount, onOpenInfo }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-3.5">
      <button
        onClick={onOpenInfo}
        className="flex items-center gap-3 rounded-xl px-1.5 py-1 -mx-1.5 text-left hover:bg-gray-50"
      >
        {contact.isGroup ? (
          <div className="flex size-11 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold text-purple-600">
            {contact.name.slice(0, 2).toUpperCase()}
          </div>
        ) : (
          <Avatar name={contact.name} online={contact.online} />
        )}
        <div>
          <p className="text-sm font-semibold text-black">{contact.name}</p>
          <p className="text-xs text-gray-400">
            {contact.isGroup
              ? `${memberCount} members`
              : contact.online
              ? "Online"
              : "Offline"}
          </p>
        </div>
      </button>

      <div className="flex items-center gap-1">
        <button className="flex size-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-purple-600">
          <Phone className="size-[18px]" />
        </button>
        <button className="flex size-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-purple-600">
          <Video className="size-[18px]" />
        </button>
        <button
          onClick={onOpenInfo}
          className="flex size-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-purple-600"
        >
          <Info className="size-[18px]" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
