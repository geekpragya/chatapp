import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, LogOut, Mail, User as UserIcon } from "lucide-react";
import { getCurrentUser, updateUser, logoutUser } from "../../lib/auth";

const COLORS = [
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-sky-500",
];

const Profile = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatarColor, setAvatarColor] = useState(user?.avatarColor || COLORS[0]);
  const [saved, setSaved] = useState(false);

  if (!user) {
    navigate("/auth");
    return null;
  }

  const initials = (name || user.email)
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleSave = () => {
    updateUser({ name, bio, avatarColor });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-xl">
        <button
          onClick={() => navigate("/chat")}
          className="mb-6 flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-purple-600"
        >
          <ArrowLeft className="size-4" />
          Back to chats
        </button>

        <div className="rounded-3xl bg-white p-8 shadow-[0_25px_60px_rgba(0,0,0,0.08)]">
          <h1 className="mb-6 text-2xl font-bold text-black">Profile</h1>

          {/* Avatar */}
          <div className="mb-8 flex flex-col items-center gap-4">
            <div className="relative">
              <div
                className={`flex size-24 items-center justify-center rounded-full text-2xl font-semibold text-white ${avatarColor}`}
              >
                {initials}
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full bg-purple-600 text-white hover:bg-purple-700"
                title="Avatar color"
              >
                <Camera className="size-4" />
              </button>
            </div>

            <div className="flex gap-2">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setAvatarColor(color)}
                  className={`size-6 rounded-full ${color} ${
                    avatarColor === color ? "ring-2 ring-offset-2 ring-purple-500" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-5">
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-600">
                <UserIcon className="size-4" /> Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="h-12 w-full rounded-full border border-gray-300 px-5 text-gray-700 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-600">
                <Mail className="size-4" /> Email
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="h-12 w-full rounded-full border border-gray-200 bg-gray-50 px-5 text-gray-400"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell people a bit about yourself"
                rows={3}
                className="w-full resize-none rounded-2xl border border-gray-300 px-5 py-3 text-gray-700 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
            </div>

            <button
              onClick={handleSave}
              className="mt-2 h-12 w-full rounded-full bg-purple-600 font-medium text-white transition-all hover:bg-purple-700"
            >
              {saved ? "Saved ✓" : "Save changes"}
            </button>

            <button
              onClick={handleLogout}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-red-200 font-medium text-red-500 transition-all hover:bg-red-50"
            >
              <LogOut className="size-4" />
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
