import { useState } from "react";
import { X, Check } from "lucide-react";
import Avatar from "./Avatar";

const NewConversationModal = ({ mode, directory, onClose, onStartChat, onCreateGroup }) => {
  const isGroup = mode === "group";
  const [selectedIds, setSelectedIds] = useState([]);
  const [groupName, setGroupName] = useState("");

  const toggleSelect = (id) => {
    if (isGroup) {
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    } else {
      onStartChat(id);
    }
  };

  const handleCreateGroup = () => {
    if (!groupName.trim() || selectedIds.length < 2) return;
    onCreateGroup(groupName.trim(), selectedIds);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[80vh] w-full max-w-sm flex-col rounded-3xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-black">
            {isGroup ? "New group" : "New chat"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="size-5" />
          </button>
        </div>

        {isGroup && (
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Group name"
            className="mb-4 h-11 w-full rounded-full border border-gray-300 px-4 text-sm text-gray-700 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
          />
        )}

        {isGroup && (
          <p className="mb-2 text-xs text-gray-400">
            Select at least 2 people ({selectedIds.length} selected)
          </p>
        )}

        <div className="flex-1 space-y-1 overflow-y-auto">
          {directory.map((person) => {
            const selected = selectedIds.includes(person.id);
            return (
              <button
                key={person.id}
                onClick={() => toggleSelect(person.id)}
                className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left hover:bg-gray-50"
              >
                <Avatar name={person.name} online={person.online} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-black">{person.name}</p>
                  <p className="truncate text-xs text-gray-400">
                    {person.online ? "Online" : "Offline"}
                  </p>
                </div>
                {isGroup && (
                  <span
                    className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
                      selected
                        ? "border-purple-600 bg-purple-600 text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {selected && <Check className="size-3.5" />}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {isGroup && (
          <button
            onClick={handleCreateGroup}
            disabled={!groupName.trim() || selectedIds.length < 2}
            className="mt-4 h-11 w-full rounded-full bg-purple-600 text-sm font-medium text-white transition-all hover:bg-purple-700 disabled:opacity-40"
          >
            Create group
          </button>
        )}
      </div>
    </div>
  );
};

export default NewConversationModal;
