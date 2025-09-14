"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socket;

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // connect to socket server
    socket = io("http://localhost:3000", {
      path: "/api/socket/io",
    });

    socket.on("connect", () => {
      console.log("✅ Connected to server");
    });

    // listen for messages
    socket.on("message", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-2">Chat App</h1>
      <div className="border p-2 h-48 overflow-y-auto">
        {chat.map((c, i) => (
          <div key={i}>{c}</div>
        ))}
      </div>
      <div className="mt-2 flex">
        <input
          className="border p-1 flex-1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
        />
        <button
          className="ml-2 px-3 py-1 bg-blue-500 text-white rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
