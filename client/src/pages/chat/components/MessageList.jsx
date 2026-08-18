import { useEffect, useRef } from "react";
import { cn } from "../../../lib/utils";

const MessageList = ({ messages, isGroup }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 px-6 py-5">
      {messages.map((msg) => {
        const isMe = msg.from === "me";
        return (
          <div key={msg.id} className={cn("flex", isMe ? "justify-end" : "justify-start")}>
            <div className={cn("flex max-w-[70%] flex-col", isMe ? "items-end" : "items-start")}>
              {isGroup && !isMe && msg.author && (
                <span className="mb-1 ml-1 text-[11px] font-medium text-purple-500">
                  {msg.author}
                </span>
              )}
              <div
                className={cn(
                  "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                  isMe
                    ? "rounded-br-sm bg-purple-600 text-white"
                    : "rounded-bl-sm border border-gray-200 bg-white text-gray-800"
                )}
              >
                {msg.text}
              </div>
              <span className="mt-1 px-1 text-[11px] text-gray-400">{msg.time}</span>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
