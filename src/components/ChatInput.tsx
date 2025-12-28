import React from 'react';

interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  value, 
  onChange, 
  onSend, 
  onKeyPress, 
  disabled 
}) => {
  return (
    <div className="p-4 border-t bg-white">
      <div className="flex">
        <input
          type="text"
          className="flex-1 p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          disabled={disabled}
        />
        <button
          className={`p-3 rounded-r-lg ${disabled ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          onClick={onSend}
          disabled={disabled || !value.trim()}
        >
          {disabled ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;