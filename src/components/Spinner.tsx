import React from "react";

export default function Spinner () {
  return (
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >{"Loading "}
    <div
      style={{
        display: "inline-block",
        width: "15px",
        height: "15px",
        border: "3px solid #ccc",
        borderTopColor: "#999",
        borderRadius: "50%",
        animation: "spin 1s infinite linear",
      }}
    ></div>

    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
  );
};
