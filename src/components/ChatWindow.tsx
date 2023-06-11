import React, { useRef, useEffect, ReactElement } from "react";
import { ChatWindowProps } from "../Types";
// import * as logo from "../public/zlogo.png"

export default function ChatWindow({
  messages,
  children,
}: ChatWindowProps): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);

  //If a new message appears, then scroll to the bottom of the chat
  useEffect(() => {
    containerRef.current!.scrollTop = containerRef.current!.scrollHeight;
  }, [messages]);

  return (
    //Chat window
    <div
      style={{
        boxShadow: "0px 15px 20px rgba(183, 183, 183, 0.738)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        height: "75%",
        minHeight: "450px",
        aspectRatio: "10/19",
        border: "1px solid white",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {/* Header for chat window */}
      <div
        style={{
          boxShadow: "0px 0px 20px rgba(183, 183, 183, 0.738)",
          paddingLeft: "16px",
          display: "flex",
          //center everything vertically
          alignItems: "center",
        }}
      >
        <img
          style={{ height: "25px" }}
          src={process.env.PUBLIC_URL + "/zlogo.png"}
          alt="Logo"
        />
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
