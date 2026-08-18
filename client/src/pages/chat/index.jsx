import { useState } from "react";
import { mockContacts, mockMessages, directory, getUserById } from "./mockData";
import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";
import EmptyState from "./components/EmptyState";
import NewConversationModal from "./components/NewConversationModal";
import ContactProfileModal from "./components/ContactProfileModal";
import GroupInfoModal from "./components/GroupInfoModal";

const Chat = () => {
  const [contacts, setContacts] = useState(mockContacts);
  const [messagesByContact, setMessagesByContact] = useState(mockMessages);
  const [activeId, setActiveId] = useState(null);
  const [query, setQuery] = useState("");

  // "chat" | "group" | null
  const [newConvoMode, setNewConvoMode] = useState(null);
  const [profileUser, setProfileUser] = useState(null);
  const [groupInfoOpen, setGroupInfoOpen] = useState(false);

  const activeContact = contacts.find((c) => c.id === activeId) || null;
  const activeMessages = activeId ? messagesByContact[activeId] || [] : [];

  const getAuthor = (userId) => getUserById(userId);

  const handleSend = (text) => {
    if (!activeId) return;
    const msgId = `m${Date.now()}`;
    const newMessage = {
      id: msgId,
      from: "me",
      text,
      date: "Today",
      status: "sent",
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

    // simulate delivery -> read, like a real chat app would via sockets
    const updateStatus = (status) => {
      setMessagesByContact((prev) => ({
        ...prev,
        [activeId]: (prev[activeId] || []).map((m) =>
          m.id === msgId ? { ...m, status } : m
        ),
      }));
    };
    setTimeout(() => updateStatus("delivered"), 700);
    setTimeout(() => updateStatus("read"), 1800);
  };

  const handleStartChat = (userId) => {
    const existing = contacts.find(
      (c) => !c.isGroup && c.memberIds?.[0] === userId
    );
    if (existing) {
      setActiveId(existing.id);
      setNewConvoMode(null);
      return;
    }

    const user = getUserById(userId);
    if (!user) return;

    const newId = `c${Date.now()}`;
    const newContact = {
      id: newId,
      name: user.name,
      memberIds: [userId],
      lastMessage: "",
      time: "Now",
      unread: 0,
      online: user.online,
    };

    setContacts((prev) => [newContact, ...prev]);
    setMessagesByContact((prev) => ({ ...prev, [newId]: [] }));
    setActiveId(newId);
    setNewConvoMode(null);
  };

  const handleCreateGroup = (name, memberIds) => {
    const newId = `g${Date.now()}`;
    const newGroup = {
      id: newId,
      name,
      isGroup: true,
      memberIds,
      lastMessage: "Group created",
      time: "Now",
      unread: 0,
    };

    setContacts((prev) => [newGroup, ...prev]);
    setMessagesByContact((prev) => ({ ...prev, [newId]: [] }));
    setActiveId(newId);
    setNewConvoMode(null);
  };

  const handleOpenInfo = () => {
    if (!activeContact) return;
    if (activeContact.isGroup) {
      setGroupInfoOpen(true);
    } else {
      const user = getUserById(activeContact.memberIds?.[0]);
      setProfileUser(user || { name: activeContact.name, online: activeContact.online });
    }
  };

  const handleSelectMember = (member) => {
    setGroupInfoOpen(false);
    setProfileUser(member);
  };

  const groupMembers = activeContact?.isGroup
    ? (activeContact.memberIds || []).map(getUserById).filter(Boolean)
    : [];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <Sidebar
        contacts={contacts}
        activeId={activeId}
        onSelect={setActiveId}
        query={query}
        onQueryChange={setQuery}
        onNewChat={() => setNewConvoMode("chat")}
        onNewGroup={() => setNewConvoMode("group")}
      />

      {activeContact ? (
        <div className="flex flex-1 flex-col overflow-hidden">
          <ChatHeader
            contact={activeContact}
            memberCount={groupMembers.length}
            onOpenInfo={handleOpenInfo}
          />
          <MessageList
            messages={activeMessages}
            isGroup={activeContact.isGroup}
            getAuthor={getAuthor}
            onSelectSender={setProfileUser}
          />
          <MessageInput onSend={handleSend} />
        </div>
      ) : (
        <EmptyState />
      )}

      {newConvoMode && (
        <NewConversationModal
          mode={newConvoMode}
          directory={directory}
          onClose={() => setNewConvoMode(null)}
          onStartChat={handleStartChat}
          onCreateGroup={handleCreateGroup}
        />
      )}

      {profileUser && (
        <ContactProfileModal user={profileUser} onClose={() => setProfileUser(null)} />
      )}

      {groupInfoOpen && activeContact?.isGroup && (
        <GroupInfoModal
          group={activeContact}
          members={groupMembers}
          onClose={() => setGroupInfoOpen(false)}
          onSelectMember={handleSelectMember}
        />
      )}
    </div>
  );
};

export default Chat;
