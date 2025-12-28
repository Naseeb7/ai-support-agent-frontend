import React from 'react';

interface ChatHeaderProps {
  onNewChat: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onNewChat }) => {
  return (
    <header className="p-4 border-b flex justify-between items-center">
      <h1 className="text-xl font-bold">AI Support Chat</h1>
      <button
        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-gray-800"
        onClick={onNewChat}
      >
        New Chat
      </button>
    </header>
  );
};

export default ChatHeader;