import React, { useRef, useEffect, ReactElement } from "react";
import { Message } from "../App";


// type Message = {
//   text: string;
//   userMessage: boolean;
// };

type ChatWindowProps = {
  messages: Message[];
  children: React.ReactNode;
};

export default function ChatWindow({
  messages,
  children,
}: ChatWindowProps): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);

  //if a new message appears, then scroll to the bottom of the chat
  useEffect(() => {
    containerRef.current!.scrollTop = containerRef.current!.scrollHeight;
  }, [messages]);

  return (
    <div
      style={{
        boxShadow: "0px 15px 20px rgba(183, 183, 183, 0.738)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        height: "70%",
        minHeight: "450px",
        aspectRatio: "10/19",
        border: "1px solid white",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          boxShadow: "0px 0px 20px rgba(183, 183, 183, 0.738)",
          paddingLeft: "16px",
        }}
      >
        <h3>Zurich Versicherung</h3>
      </div>

      {/* The text message area */}
      <div
        ref={containerRef}
        style={{
          height: "100%",
          overflowX: "auto",
          padding: "16px",
        }}
      >
        {/* All the messages */}
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: message.userMessage ? "flex-end" : "flex-start",
              marginBottom: "8px",
            }}
          >
            {/* Style of incoming and outgoing messages */}
            <div
              style={{
                background: message.userMessage ? "#3f51b5" : "#eee",
                color: message.userMessage ? "#fff" : "#000",
                padding: "8px",
                borderRadius: "16px",
                wordWrap: "break-word",
                maxWidth: "70%",
              }}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
}
