import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

export default function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("chatMessage", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => socket.off("chatMessage");
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("chatMessage", message);
      // setMessage("");
    }
  };

  return (
    <div>
      <h2>Chat App</h2>
      <div className="bg-purple-600 h-[70vh] flex flex-col">
        {chat.map((c, i) => (
          <div key={i}
          className={` bg-gray-500 p-3 ${c === message ? 'self-end' : 'self-start'}`}
          >
            {c}
          </div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
        className="bg-red-50"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
