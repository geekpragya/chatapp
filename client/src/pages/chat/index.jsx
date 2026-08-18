import { useState } from "react";
import { mockContacts, mockMessages } from "./mockData";
import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";
import EmptyState from "./components/EmptyState";

const Chat = () => {
  const [contacts] = useState(mockContacts);
  const [messagesByContact, setMessagesByContact] = useState(mockMessages);
  const [activeId, setActiveId] = useState(null);
  const [query, setQuery] = useState("");

  const activeContact = contacts.find((c) => c.id === activeId) || null;
  const activeMessages = activeId ? messagesByContact[activeId] || [] : [];

  const handleSend = (text) => {
    if (!activeId) return;
    const newMessage = {
      id: `m${Date.now()}`,
      from: "me",
      text,
      time: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    };
    setMessagesByContact((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] || []), newMessage],
    }));
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <Sidebar
        contacts={contacts}
        activeId={activeId}
        onSelect={setActiveId}
        query={query}
        onQueryChange={setQuery}
      />

      {activeContact ? (
        <div className="flex flex-1 flex-col overflow-hidden">
          <ChatHeader contact={activeContact} />
          <MessageList messages={activeMessages} isGroup={activeContact.isGroup} />
          <MessageInput onSend={handleSend} />
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default Chat;
