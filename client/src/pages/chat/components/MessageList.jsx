import { useEffect, useRef } from "react";
import { Check, CheckCheck } from "lucide-react";
import { cn } from "../../../lib/utils";

const DateDivider = ({ label }) => (
  <div className="my-4 flex items-center justify-center">
    <span className="rounded-full bg-white px-3 py-1 text-[11px] font-medium text-gray-400 shadow-sm">
      {label}
    </span>
  </div>
);

const MessageList = ({ messages, isGroup, getAuthor, onSelectSender }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 space-y-0.5 overflow-y-auto bg-gray-50 px-6 py-5">
      {messages.map((msg, i) => {
        const isMe = msg.from === "me";
        const prev = messages[i - 1];
        const next = messages[i + 1];

        const showDateDivider = !prev || prev.date !== msg.date;
        const isSameBurstAsPrev = prev && prev.from === msg.from && prev.authorId === msg.authorId;
        const isSameBurstAsNext = next && next.from === msg.from && next.authorId === msg.authorId;

        const author = isGroup && !isMe ? getAuthor?.(msg.authorId) : null;

        return (
          <div key={msg.id}>
            {showDateDivider && <DateDivider label={msg.date || "Today"} />}
            <div
              className={cn(
                "flex",
                isMe ? "justify-end" : "justify-start",
                isSameBurstAsPrev ? "mt-0.5" : "mt-3"
              )}
            >
              <div className={cn("flex max-w-[70%] items-end gap-2", isMe && "flex-row-reverse")}>
                {isGroup && !isMe && (
                  <button
                    onClick={() => author && onSelectSender?.(author)}
                    className={cn("mb-0.5 shrink-0", !isSameBurstAsNext ? "visible" : "invisible")}
                  >
                    <div className="flex size-6 items-center justify-center rounded-full bg-purple-100 text-[10px] font-semibold text-purple-600">
                      {(author?.name || "?").slice(0, 2).toUpperCase()}
                    </div>
                  </button>
                )}

                <div className={cn("flex flex-col", isMe ? "items-end" : "items-start")}>
                  {isGroup && !isMe && !isSameBurstAsPrev && author && (
                    <button
                      onClick={() => onSelectSender?.(author)}
                      className="mb-0.5 ml-1 text-[11px] font-medium text-purple-500 hover:underline"
                    >
                      {author.name}
                    </button>
                  )}

                  <div
                    className={cn(
                      "px-4 py-2.5 text-sm leading-relaxed",
                      isMe
                        ? "bg-purple-600 text-white"
                        : "border border-gray-200 bg-white text-gray-800",
                      // rounded corners: tighter on the "joined" side of a burst
                      isMe
                        ? cn(
                            "rounded-2xl",
                            isSameBurstAsPrev ? "rounded-tr-md" : "",
                            isSameBurstAsNext ? "rounded-br-md" : ""
                          )
                        : cn(
                            "rounded-2xl",
                            isSameBurstAsPrev ? "rounded-tl-md" : "",
                            isSameBurstAsNext ? "rounded-bl-md" : ""
                          )
                    )}
                  >
                    {msg.text}
                  </div>

                  {!isSameBurstAsNext && (
                    <span className="mt-1 flex items-center gap-1 px-1 text-[11px] text-gray-400">
                      {msg.time}
                      {isMe && <ReadReceiptInline status={msg.status} />}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};

// Small inline variant with dark-enough colors to read on the light background
const ReadReceiptInline = ({ status }) => {
  if (status === "read") return <CheckCheck className="size-3.5 text-purple-500" />;
  if (status === "delivered") return <CheckCheck className="size-3.5 text-gray-400" />;
  return <Check className="size-3.5 text-gray-400" />;
};

export default MessageList;
