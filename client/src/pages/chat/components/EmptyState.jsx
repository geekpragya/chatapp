import { MessageSquare } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-gray-50 text-gray-400">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-purple-50">
        <MessageSquare className="size-8 text-purple-400" />
      </div>
      <p className="font-medium text-gray-500">Select a conversation to start chatting</p>
    </div>
  );
};

export default EmptyState;
