import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import type { ChatMessage } from '../chatTypes';

interface MessageListProps {
  messages: ChatMessage[];
  isSending: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isSending }) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  // Create a temporary typing message when isSending is true
  const displayMessages = isSending
    ? [...messages, { id: 'typing', sender: 'ai', text: 'Agent is typing...', status: undefined }]
    : messages;

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      <div className="h-[calc(100vh-160px)] overflow-y-auto mb-4">
        {displayMessages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;