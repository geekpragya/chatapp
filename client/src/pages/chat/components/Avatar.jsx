import { cn } from "../../../lib/utils";

const COLORS = [
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-sky-500",
];

const colorFor = (name = "") => {
  const idx = name.charCodeAt(0) % COLORS.length;
  return COLORS[idx] || COLORS[0];
};

const initialsFor = (name = "") =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const Avatar = ({ name, online, size = "md", className }) => {
  const sizes = {
    sm: "size-8 text-xs",
    md: "size-11 text-sm",
    lg: "size-16 text-lg",
  };

  return (
    <div className={cn("relative shrink-0", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-full font-semibold text-white",
          colorFor(name),
          sizes[size]
        )}
      >
        {initialsFor(name)}
      </div>
      {online && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full bg-emerald-500 ring-2 ring-white",
            size === "lg" ? "size-3.5" : "size-2.5"
          )}
        />
      )}
    </div>
  );
};

export default Avatar;
