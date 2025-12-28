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
  }, [messages, isSending]);

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

  // Create a temporary typing message when isSending is true
  const displayMessages = isSending
    ? [...messages, { id: 'typing', sender: 'ai', text: 'Agent is typing...', status: undefined }]
    : messages;

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      <header className="p-4 border-b">
        <h1 className="text-xl font-bold">AI Support Chat</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="h-[calc(100vh-160px)] overflow-y-auto mb-4">
          {displayMessages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 border-t bg-white">
        <div className="flex">
          <input
            type="text"
            className="flex-1 p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isSending}
          />
          <button
            className={`p-3 rounded-r-lg ${isSending ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            onClick={handleSend}
            disabled={isSending || !inputValue.trim()}
          >
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
