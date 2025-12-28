import { useState, useEffect, useRef } from 'react';
import { sendChatMessage } from './lib/api';
import type { ChatMessage } from './chatTypes';

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(() => {
    return localStorage.getItem('chatSessionId');
  });
  const [isSending, setIsSending] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isSending) return;

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsSending(true);

    try {
      const response = await sendChatMessage(inputValue, sessionId);

      // Update sessionId if provided in response
      if (response.sessionId) {
        setSessionId(response.sessionId);
        localStorage.setItem('chatSessionId', response.sessionId);
      }

      // Add AI response
      const aiMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: "ai",
        text: response.reply,
        status: "success"
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      // Add error message
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: "ai",
        text: "Something went wrong. Please try again.",
        status: "error"
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 border-b">
        <h1 className="text-xl font-bold">AI Support Chat</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t flex">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isSending}
        />
        <button
          className={`p-2 rounded-r ${isSending ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
          onClick={handleSend}
          disabled={isSending || !inputValue.trim()}
        >
          {isSending ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  )
}

export default App
