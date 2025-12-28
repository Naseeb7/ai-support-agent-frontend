function App() {
  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 border-b">
        <h1 className="text-xl font-bold">AI Support Chat</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-4">
        {/* Empty message list container */}
      </div>
      <div className="p-4 border-t flex">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l"
          placeholder="Type a message..."
        />
        <button
          className="p-2 bg-gray-300 rounded-r"
          disabled
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default App
