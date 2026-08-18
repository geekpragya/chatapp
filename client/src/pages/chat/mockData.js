// Temporary mock data so the Chat UI can be built and previewed
// before it's wired up to the real backend/socket layer.

// The signed-in user (mirrors what lib/auth.js stores after login/signup)
export const mockMe = {
  id: "me",
  name: "You",
};

// A broader directory of people you can start chats/groups with.
// Conversations in mockContacts reference these by id.
export const directory = [
  { id: "1", name: "Ananya Rao", bio: "Product designer. Coffee > tea.", online: true },
  { id: "3", name: "Kabir Mehta", bio: "Backend engineer, loves clean PRs.", online: true },
  { id: "4", name: "Priya Sharma", bio: "Marketing lead.", online: false },
  { id: "5", name: "Vikram Singh", bio: "Founder, always in a meeting.", online: false },
  { id: "6", name: "Meera Nair", bio: "iOS developer.", online: true },
  { id: "7", name: "Rohan Gupta", bio: "Data analyst.", online: false },
  { id: "8", name: "Simran Kaur", bio: "QA & release manager.", online: true },
];

export const mockContacts = [
  {
    id: "1",
    name: "Ananya Rao",
    memberIds: ["1"],
    lastMessage: "Sounds good, see you then!",
    time: "09:42",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Design Team",
    isGroup: true,
    memberIds: ["1", "6", "8"],
    lastMessage: "Rahul: pushed the new mockups",
    time: "09:10",
    unread: 0,
    online: false,
  },
  {
    id: "3",
    name: "Kabir Mehta",
    memberIds: ["3"],
    lastMessage: "Can you review the PR?",
    time: "Yesterday",
    unread: 0,
    online: true,
  },
  {
    id: "4",
    name: "Priya Sharma",
    memberIds: ["4"],
    lastMessage: "Thanks a lot 🙌",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: "5",
    name: "Vikram Singh",
    memberIds: ["5"],
    lastMessage: "Let's catch up tomorrow",
    time: "Mon",
    unread: 0,
    online: false,
  },
];

export const mockMessages = {
  1: [
    { id: "m1", from: "them", text: "Hey! Are we still on for the call?", time: "09:30", date: "Today" },
    { id: "m2", from: "me", text: "Yep, 3pm works for me.", time: "09:32", date: "Today", status: "read" },
    { id: "m3", from: "them", text: "Perfect, I'll send the invite.", time: "09:33", date: "Today" },
    { id: "m4", from: "me", text: "Great, talk soon!", time: "09:35", date: "Today", status: "read" },
    { id: "m5", from: "them", text: "Sounds good, see you then!", time: "09:42", date: "Today" },
  ],
  2: [
    { id: "m1", from: "them", authorId: "1", text: "Pushed the new mockups to Figma", time: "08:55", date: "Today" },
    { id: "m2", from: "me", text: "Nice, taking a look now", time: "09:02", date: "Today", status: "read" },
    { id: "m3", from: "them", authorId: "1", text: "Let me know what you think of the sidebar", time: "09:05", date: "Today" },
    { id: "m4", from: "them", authorId: "8", text: "Tested it, looks solid on mobile too", time: "09:10", date: "Today" },
  ],
  3: [
    { id: "m1", from: "them", text: "Can you review the PR?", time: "18:20", date: "Yesterday" },
  ],
  4: [
    { id: "m1", from: "me", text: "Sent the files over", time: "17:00", date: "Yesterday", status: "read" },
    { id: "m2", from: "them", text: "Thanks a lot 🙌", time: "17:05", date: "Yesterday" },
  ],
  5: [
    { id: "m1", from: "them", text: "Let's catch up tomorrow", time: "09:15", date: "Monday" },
  ],
};

export const getUserById = (id) => directory.find((u) => u.id === id);
