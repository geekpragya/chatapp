import { X, MessageCircle } from "lucide-react";
import Avatar from "./Avatar";

const ContactProfileModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xs rounded-3xl bg-white p-6 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-2 flex justify-end">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="size-5" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-3">
          <Avatar name={user.name} online={user.online} size="lg" />
          <div>
            <p className="text-lg font-semibold text-black">{user.name}</p>
            <p className="text-xs text-gray-400">
              {user.online ? "Online" : "Offline"}
            </p>
          </div>
          {user.bio && (
            <p className="mt-1 text-sm text-gray-500">{user.bio}</p>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-purple-600 text-sm font-medium text-white hover:bg-purple-700"
        >
          <MessageCircle className="size-4" />
          Message
        </button>
      </div>
    </div>
  );
};

export default ContactProfileModal;
