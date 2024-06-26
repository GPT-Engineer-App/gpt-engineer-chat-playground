"use client";

import { useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [input, setInput] = useState("Type your message here...");
  const [messages, setMessages] = useState([
    { sender: "system", text: "Welcome to FRONTIER Playground! Ask me anything." },
  ]);
  const [selectedModel, setSelectedModel] = useState("model1");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "user", text: input }]);
      setInput("");
      // Simulate a response from the system
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "system", text: `Response from ${selectedModel}` },
        ]);
      }, 1000);
    }
  };

  return (
    <main className={`${styles.main} ${inter.className}`}>
      <div className={styles.header}>
        <Image src="/frontier-logo.png" alt="FRONTIER Logo" width={150} height={50} />
        <h1>FRONTIER Playground</h1>
      </div>
      <div className={styles.modelSelector}>
        <label htmlFor="model">Select Model:</label>
        <select
          id="model"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          <option value="model1">Model 1</option>
          <option value="model2">Model 2</option>
          <option value="model3">Model 3</option>
        </select>
      </div>
      <div className={styles.chatContainer}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              message.sender === "user" ? styles.userMessage : styles.systemMessage
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className={styles.input}
        />
        <button onClick={handleSend} className={styles.sendButton}>
          Send
        </button>
      </div>
    </main>
  );
}