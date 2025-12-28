import React from 'react';
import type { ChatMessage } from '../chatTypes';

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <div
      className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] p-4 rounded-2xl ${
          message.sender === "user"
            ? "bg-blue-600 text-white rounded-br-none"
            : message.status === "error"
              ? "bg-red-100 text-red-800 rounded-bl-none border border-red-200"
              : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;