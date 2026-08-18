import { X } from "lucide-react";
import Avatar from "./Avatar";

const GroupInfoModal = ({ group, members, onClose, onSelectMember }) => {
  if (!group) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-black">Group info</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="size-5" />
          </button>
        </div>

        <div className="mb-5 flex flex-col items-center gap-2">
          <div className="flex size-16 items-center justify-center rounded-full bg-purple-100 text-xl font-semibold text-purple-600">
            {group.name.slice(0, 2).toUpperCase()}
          </div>
          <p className="font-semibold text-black">{group.name}</p>
          <p className="text-xs text-gray-400">{members.length} members</p>
        </div>

        <div className="max-h-64 space-y-1 overflow-y-auto">
          {members.map((member) => (
            <button
              key={member.id}
              onClick={() => onSelectMember(member)}
              className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left hover:bg-gray-50"
            >
              <Avatar name={member.name} online={member.online} size="sm" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-black">{member.name}</p>
                <p className="truncate text-xs text-gray-400">
                  {member.online ? "Online" : "Offline"}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupInfoModal;
