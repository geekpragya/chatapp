import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: "john",
    receiver: "pragya",
    type: "text",
    text: "Hey! How are you?",
    time: "10:28 AM",
  },
  {
    id: 2,
    sender: "pragya",
    receiver: "john",
    type: "text",
    text: "I'm good! What about you?",
    time: "10:29 AM",
  },
  {
    id: 3,
    sender: "john",
    receiver: "pragya",
    type: "text",
    text: "I'm doing great 😊",
    time: "10:30 AM",
  },
  {
    id: 4,
    sender: "john",
    receiver: "pragya",
    type: "text",
    text: "Are you working on the chat app?",
    time: "10:30 AM",
  },
  {
    id: 5,
    sender: "pragya",
    receiver: "john",
    type: "text",
    text: "Yes! I'm building the frontend right now.",
    time: "10:31 AM",
  },
];

const USERS = {
  pragya: {
    name: "Pragya",
    avatar: "P",
    status: "Online",
  },

  john: {
    name: "John Doe",
    avatar: "JD",
    status: "Online",
  },
};

const EMOJIS = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "😂",
  "🤣",
  "😊",
  "😇",
  "🙂",
  "🙃",
  "😉",
  "😌",
  "😍",
  "🥰",
  "😘",
  "😎",
  "🤔",
  "😭",
  "😡",
  "❤️",
  "💔",
  "👍",
  "👎",
  "👏",
  "🔥",
  "🎉",
  "✨",
  "🙏",
];

const Chat = () => {
  const [searchParams] = useSearchParams();

  // ================= CURRENT USER =================

  const currentUser = searchParams.get("user") || "pragya";

  const otherUser =
    currentUser === "pragya" ? "john" : "pragya";

  // ================= STATES =================

  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [messages, setMessages] = useState(() => {
    const savedMessages =
      localStorage.getItem("chatMessages");

    if (savedMessages) {
      return JSON.parse(savedMessages);
    }

    localStorage.setItem(
      "chatMessages",
      JSON.stringify(INITIAL_MESSAGES)
    );

    return INITIAL_MESSAGES;
  });

  // ================= REFS =================

  const messagesEndRef = useRef(null);
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  // ================= USER DATA =================

  const currentUserData = USERS[currentUser];
  const otherUserData = USERS[otherUser];

  // ================= CONVERSATION =================

  const conversation = messages.filter(
    (msg) =>
      (msg.sender === currentUser &&
        msg.receiver === otherUser) ||
      (msg.sender === otherUser &&
        msg.receiver === currentUser)
  );

  // ================= SEARCH =================

  const filteredUser = otherUserData.name
    .toLowerCase()
    .includes(search.toLowerCase());

  // ================= AUTO SCROLL =================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [conversation]);

  // ================= OTHER TAB LISTENER =================

  useEffect(() => {
    const handleStorage = (event) => {
      if (
        event.key === "chatMessages" &&
        event.newValue
      ) {
        setMessages(JSON.parse(event.newValue));
      }
    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  // ================= SAVE MESSAGE =================

  const saveMessage = (newMessage) => {
    const updatedMessages = [
      ...messages,
      newMessage,
    ];

    setMessages(updatedMessages);

    localStorage.setItem(
      "chatMessages",
      JSON.stringify(updatedMessages)
    );
  };

  // ================= SEND TEXT =================

  const sendMessage = () => {
    if (!message.trim()) return;

    saveMessage({
      id: Date.now(),
      sender: currentUser,
      receiver: otherUser,
      type: "text",
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });

    setMessage("");
  };

  // ================= ENTER KEY =================

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // ================= EMOJI =================

  const addEmoji = (emoji) => {
    setMessage((prev) => prev + emoji);
  };

  // ================= LINK DETECTION =================

  const renderTextWithLinks = (text) => {
    const urlRegex =
      /(https?:\/\/[^\s]+)/g;

    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="underline break-all"
          >
            {part}
          </a>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };

  // ================= IMAGE UPLOAD =================

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    // Limit frontend demo images to 2 MB
    if (file.size > 2 * 1024 * 1024) {
      alert("Please select an image smaller than 2 MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      saveMessage({
        id: Date.now(),
        sender: currentUser,
        receiver: otherUser,
        type: "image",
        fileName: file.name,
        fileData: reader.result,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    };

    reader.readAsDataURL(file);

    e.target.value = "";
  };

  // ================= FILE UPLOAD =================

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Limit frontend demo files to 2 MB
    if (file.size > 2 * 1024 * 1024) {
      alert("Please select a file smaller than 2 MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      saveMessage({
        id: Date.now(),
        sender: currentUser,
        receiver: otherUser,
        type: "file",
        fileName: file.name,
        fileSize: file.size,
        fileData: reader.result,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    };

    reader.readAsDataURL(file);

    e.target.value = "";
  };

  // ================= FORMAT FILE SIZE =================

  const formatFileSize = (bytes) => {
    if (!bytes) return "";

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // ================= CLEAR CHAT =================

  const clearChat = () => {
    localStorage.removeItem("chatMessages");

    setMessages(INITIAL_MESSAGES);

    localStorage.setItem(
      "chatMessages",
      JSON.stringify(INITIAL_MESSAGES)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="w-full max-w-6xl h-[700px] bg-white rounded-[30px] shadow-xl overflow-hidden flex">

        {/* ================================================= */}
        {/* SIDEBAR */}
        {/* ================================================= */}

        <div className="w-[370px] border-r border-gray-200 flex flex-col">

          {/* ================= CURRENT USER ================= */}

          <div className="p-6 border-b border-gray-200 flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-full bg-purple-600 text-white flex items-center justify-center text-xl font-semibold">
                {currentUserData.avatar}
              </div>

              <div>

                <h2 className="text-xl font-semibold">
                  {currentUserData.name}
                </h2>

                <p className="text-gray-500">
                  {currentUserData.status}
                </p>

              </div>

            </div>

            <button
              onClick={clearChat}
              className="text-2xl text-gray-500 hover:text-red-500"
              title="Clear chat"
            >
              ⋮
            </button>

          </div>

          {/* ================= SEARCH ================= */}

          <div className="p-5">

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search conversations..."
              className="w-full bg-gray-100 rounded-2xl px-5 py-4 outline-none text-gray-700"
            />

          </div>

          {/* ================= OTHER USER ================= */}

          <div className="flex-1 px-3">

            {filteredUser ? (

              <div className="w-full flex items-center gap-4 p-4 rounded-2xl bg-purple-50">

                <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-semibold">
                  {otherUserData.avatar}
                </div>

                <div className="flex-1">

                  <div className="flex justify-between">

                    <h3 className="font-semibold text-gray-900">
                      {otherUserData.name}
                    </h3>

                    <span className="text-xs text-gray-400">
                      Online
                    </span>

                  </div>

                  <p className="text-gray-500 truncate mt-1">
                    {conversation.length > 0
                      ? conversation[
                          conversation.length - 1
                        ].type === "text"
                        ? conversation[
                            conversation.length - 1
                          ].text
                        : conversation[
                            conversation.length - 1
                          ].type === "image"
                        ? "📷 Photo"
                        : "📎 File"
                      : "No messages yet"}
                  </p>

                </div>

              </div>

            ) : (

              <p className="text-center text-gray-400 mt-5">
                No conversations found
              </p>

            )}

          </div>

        </div>

        {/* ================================================= */}
        {/* CHAT AREA */}
        {/* ================================================= */}

        <div className="flex-1 flex flex-col">

          {/* ================= CHAT HEADER ================= */}

          <div className="h-[100px] border-b border-gray-200 flex items-center px-8">

            <div className="w-14 h-14 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold text-lg">
              {otherUserData.avatar}
            </div>

            <div className="ml-4">

              <h2 className="text-xl font-semibold">
                {otherUserData.name}
              </h2>

              <p className="text-green-500">
                {otherUserData.status}
              </p>

            </div>

          </div>

          {/* ================= MESSAGES ================= */}

          <div className="flex-1 overflow-y-auto bg-gray-50 p-8">

            <div className="space-y-5">

              {conversation.map((msg) => {

                const isMyMessage =
                  msg.sender === currentUser;

                return (
                  <div
                    key={msg.id}
                    className={`flex ${
                      isMyMessage
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >

                    <div
                      className={`max-w-[65%] px-5 py-4 rounded-2xl ${
                        isMyMessage
                          ? "bg-purple-600 text-white rounded-br-md"
                          : "bg-white text-gray-800 shadow-sm rounded-bl-md"
                      }`}
                    >

                      {/* ================= TEXT ================= */}

                      {msg.type === "text" && (
                        <p className="text-lg whitespace-pre-wrap break-words">
                          {renderTextWithLinks(msg.text)}
                        </p>
                      )}

                      {/* ================= IMAGE ================= */}

                      {msg.type === "image" && (
                        <div>

                          <img
                            src={msg.fileData}
                            alt={msg.fileName}
                            className="max-w-[300px] max-h-[300px] rounded-xl object-cover"
                          />

                          <p className="text-sm mt-2 break-all">
                            {msg.fileName}
                          </p>

                        </div>
                      )}

                      {/* ================= FILE ================= */}

                      {msg.type === "file" && (
                        <a
                          href={msg.fileData}
                          download={msg.fileName}
                          className={`flex items-center gap-3 min-w-[220px] ${
                            isMyMessage
                              ? "text-white"
                              : "text-gray-800"
                          }`}
                        >

                          <div className="text-3xl">
                            📎
                          </div>

                          <div className="min-w-0">

                            <p className="font-medium truncate">
                              {msg.fileName}
                            </p>

                            <p
                              className={`text-xs ${
                                isMyMessage
                                  ? "text-purple-200"
                                  : "text-gray-400"
                              }`}
                            >
                              {formatFileSize(
                                msg.fileSize
                              )}
                            </p>

                          </div>

                        </a>
                      )}

                      {/* ================= TIME ================= */}

                      <p
                        className={`text-xs mt-2 ${
                          isMyMessage
                            ? "text-purple-200"
                            : "text-gray-400"
                        }`}
                      >
                        {msg.time}
                      </p>

                    </div>

                  </div>
                );
              })}

              <div ref={messagesEndRef} />

            </div>

          </div>

          {/* ================= EMOJI PICKER ================= */}

          {showEmojiPicker && (

            <div className="absolute bottom-[105px] right-[90px] w-[320px] bg-white rounded-2xl shadow-xl border border-gray-200 p-4 z-20">

              <div className="grid grid-cols-8 gap-2">

                {EMOJIS.map((emoji) => (

                  <button
                    key={emoji}
                    type="button"
                    onClick={() => addEmoji(emoji)}
                    className="text-2xl hover:bg-gray-100 rounded-lg p-1 transition"
                  >
                    {emoji}
                  </button>

                ))}

              </div>

            </div>

          )}

          {/* ================= MESSAGE INPUT ================= */}

          <div className="p-5 border-t border-gray-200 bg-white">

            <div className="flex items-center gap-3">

              {/* Emoji */}

              <button
                type="button"
                onClick={() =>
                  setShowEmojiPicker(
                    (prev) => !prev
                  )
                }
                className="w-12 h-12 rounded-full hover:bg-gray-100 flex items-center justify-center text-2xl transition"
                title="Emoji"
              >
                😊
              </button>

              {/* File */}

              <button
                type="button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="w-12 h-12 rounded-full hover:bg-gray-100 flex items-center justify-center text-xl transition"
                title="Attach file"
              >
                📎
              </button>

              {/* Photo */}

              <button
                type="button"
                onClick={() =>
                  imageInputRef.current?.click()
                }
                className="w-12 h-12 rounded-full hover:bg-gray-100 flex items-center justify-center text-xl transition"
                title="Send photo"
              >
                📷
              </button>

              {/* Hidden photo input */}

              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {/* Hidden file input */}

              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                className="hidden"
              />

              {/* Message input */}

              <input
                type="text"
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 bg-gray-100 rounded-full px-6 py-4 outline-none text-gray-800"
              />

              {/* Send */}

              <button
                onClick={sendMessage}
                className="w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center text-xl transition"
              >
                ➤
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Chat;