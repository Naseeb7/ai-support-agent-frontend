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
    <div className="p-4 border-t border-slate-200 bg-white">
      <div className="flex rounded-md border border-slate-300 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
        <input
          type="text"
          className="flex-1 p-3 bg-white focus:outline-none"
          placeholder="Type a message..."
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          disabled={disabled}
        />
        <button
          className={`px-4 py-3 ${disabled ? 'bg-slate-100 text-slate-400' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
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