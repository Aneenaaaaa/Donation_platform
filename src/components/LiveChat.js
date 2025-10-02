// LiveChat.js
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./LiveChat.css";

const socket = io("http://localhost:5000");

function LiveChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const chatBoxRef = useRef(null);

  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("authUser"));

    if (authUser) {
      setUsername(authUser.username || authUser.name || "Anonymous");
      setRole(authUser.type || "user");
      socket.emit("join", { id: authUser.id, username: authUser.username || authUser.name, type: authUser.type || "user" });
    } else {
      setUsername("Guest");
      setRole("guest");
      socket.emit("join", { id: null, username: "Guest", type: "guest" });
    }

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    // Auto scroll to bottom
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    socket.emit("sendMessage", message);
    setMessage("");
  };

  return (
    <div className="chat-container">
      <h2>💬 Live Chat ({role})</h2>
      <div className="chat-box" ref={chatBoxRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.user === username ? "own" : ""}`}>
            <strong>{msg.user} ({msg.type}): </strong> {msg.text}
          </div>
        ))}
      </div>
      <form className="chat-form" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default LiveChat;
