import { useState } from "react";
import { Paperclip, Send, Smile } from "lucide-react";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t border-gray-200 bg-white px-4 py-3"
    >
      <button
        type="button"
        className="flex size-10 shrink-0 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-purple-600"
      >
        <Paperclip className="size-5" />
      </button>

      <div className="relative flex-1">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="h-11 w-full rounded-full border border-gray-200 bg-gray-50 pl-4 pr-11 text-sm text-gray-700 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600"
        >
          <Smile className="size-5" />
        </button>
      </div>

      <button
        type="submit"
        disabled={!text.trim()}
        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-purple-600 text-white transition-all hover:bg-purple-700 disabled:opacity-40"
      >
        <Send className="size-[18px]" />
      </button>
    </form>
  );
};

export default MessageInput;
