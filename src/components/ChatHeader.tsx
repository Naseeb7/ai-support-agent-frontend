import React from 'react';

interface ChatHeaderProps {
  onNewChat: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onNewChat }) => {
  return (
    <header className="p-4 border-b border-slate-200 bg-white flex justify-between items-center">
      <h1 className="text-lg font-semibold text-slate-800">AI Support Chat</h1>
      <button
        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-medium transition-colors"
        onClick={onNewChat}
      >
        New Chat
      </button>
    </header>
  );
};

export default ChatHeader;