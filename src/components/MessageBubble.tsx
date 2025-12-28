import React from 'react';
import type { ChatMessage } from '../chatTypes';

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <div
      className={`mb-3 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[70%] px-4 py-2 rounded-lg text-sm leading-relaxed ${
          message.sender === "user"
            ? "bg-slate-200 text-slate-800"
            : message.status === "error"
              ? "bg-red-50 text-red-700 border border-red-200"
              : "bg-white text-slate-800 border border-slate-200"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;