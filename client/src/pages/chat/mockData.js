// Temporary mock data so the Chat UI can be built and previewed
// before it's wired up to the real backend/socket layer.

export const mockContacts = [
  {
    id: "1",
    name: "Ananya Rao",
    lastMessage: "Sounds good, see you then!",
    time: "09:42",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Design Team",
    isGroup: true,
    lastMessage: "Rahul: pushed the new mockups",
    time: "09:10",
    unread: 0,
    online: false,
  },
  {
    id: "3",
    name: "Kabir Mehta",
    lastMessage: "Can you review the PR?",
    time: "Yesterday",
    unread: 0,
    online: true,
  },
  {
    id: "4",
    name: "Priya Sharma",
    lastMessage: "Thanks a lot 🙌",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: "5",
    name: "Vikram Singh",
    lastMessage: "Let's catch up tomorrow",
    time: "Mon",
    unread: 0,
    online: false,
  },
];

export const mockMessages = {
  1: [
    { id: "m1", from: "them", text: "Hey! Are we still on for the call?", time: "09:30" },
    { id: "m2", from: "me", text: "Yep, 3pm works for me.", time: "09:32" },
    { id: "m3", from: "them", text: "Perfect, I'll send the invite.", time: "09:33" },
    { id: "m4", from: "me", text: "Great, talk soon!", time: "09:35" },
    { id: "m5", from: "them", text: "Sounds good, see you then!", time: "09:42" },
  ],
  2: [
    { id: "m1", from: "them", author: "Rahul", text: "Pushed the new mockups to Figma", time: "08:55" },
    { id: "m2", from: "me", text: "Nice, taking a look now", time: "09:02" },
    { id: "m3", from: "them", author: "Rahul", text: "Let me know what you think of the sidebar", time: "09:10" },
  ],
  3: [
    { id: "m1", from: "them", text: "Can you review the PR?", time: "18:20" },
  ],
  4: [
    { id: "m1", from: "me", text: "Sent the files over", time: "17:00" },
    { id: "m2", from: "them", text: "Thanks a lot 🙌", time: "17:05" },
  ],
  5: [
    { id: "m1", from: "them", text: "Let's catch up tomorrow", time: "Mon" },
  ],
};
