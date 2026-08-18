import { Link } from "react-router-dom";
import { Search, SquarePen, Users } from "lucide-react";
import { cn } from "../../../lib/utils";
import { getCurrentUser } from "../../../lib/auth";
import Avatar from "./Avatar";

const Sidebar = ({
  contacts,
  activeId,
  onSelect,
  query,
  onQueryChange,
  onNewChat,
  onNewGroup,
}) => {
  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );
  const currentUser = getCurrentUser();

  return (
    <aside className="flex h-full w-full max-w-[320px] flex-col border-r border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-black">Chats</h1>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onNewGroup}
            className="flex size-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-purple-600"
            title="New group"
          >
            <Users className="size-[18px]" />
          </button>
          <button
            type="button"
            onClick={onNewChat}
            className="flex size-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-purple-600"
            title="New chat"
          >
            <SquarePen className="size-5" />
          </button>
          <Link
            to="/profile"
            className={cn(
              "flex size-9 items-center justify-center rounded-full text-xs font-semibold text-white",
              currentUser?.avatarColor || "bg-purple-500"
            )}
            title="Your profile"
          >
            {(currentUser?.name || currentUser?.email || "?")[0]?.toUpperCase()}
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="px-5 pb-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search conversations"
            className="h-11 w-full rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-700 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
          />
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {filtered.length === 0 ? (
          <p className="mt-8 text-center text-sm text-gray-400">No conversations found</p>
        ) : (
          filtered.map((contact) => (
            <button
              key={contact.id}
              onClick={() => onSelect(contact.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors",
                activeId === contact.id ? "bg-purple-50" : "hover:bg-gray-50"
              )}
            >
              {contact.isGroup ? (
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold text-purple-600">
                  {contact.name.slice(0, 2).toUpperCase()}
                </div>
              ) : (
                <Avatar name={contact.name} online={contact.online} />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold text-black">
                    {contact.name}
                  </p>
                  <span className="shrink-0 text-[11px] text-gray-400">
                    {contact.time}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm text-gray-500">
                    {contact.lastMessage}
                  </p>
                  {contact.unread > 0 && (
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-purple-600 text-[11px] font-medium text-white">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
