import React, { ReactElement, useEffect, useState } from "react";
import InputField from "./components/InputField";
import ChatWindow from "./components/ChatWindow";

import axios from "axios";

import { Button, Container, Box } from "@mui/material";
import ReplyButtons from "./components/ReplyButtons";

//Types section
export type Message = {
  text: string;
  userMessage: boolean;
};

export interface Option {
  nextId: number | boolean;
  value: boolean | string | number;
  text: string;
}

export interface Data {
  id: number;
  text: string;
  options: Option[];
  uiType: String;
  name: String;
  valueType: string;
  valueOptions: Option[];
}

const ChatBot = (): ReactElement => {
  //State section
  const [dataStructure, setDataStructure] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageId, setMessageId] = useState<Option["nextId"]>(100);
  const [renderButtons, setRenderButtons] = useState<boolean>(true);
  const [submitCount, setSubmitCount] = useState<number>(0);

  //Message handling - creates new messages and puts them into state
  const handleMessageSend = (messageText: string, isUserMessage: boolean) => {
    const newMessage = { text: messageText, userMessage: isUserMessage };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  //Rendering the answer buttons - !nextId = no buttons :(
  const handleButtonRender = (nextId: number | boolean) => {
    setRenderButtons(nextId !== false ? true : false);
  };

  //Fetch data on inital render
  useEffect(() => {
    axios
      .get("https://raw.githubusercontent.com/mzronek/task/main/flow.json")
      .then((res) => setDataStructure(res.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  //Set the first question on inital render
  useEffect(() => {
    if (!isLoading && dataStructure) {
      const firstMessage = dataStructure.find((e: Data) => e.id === messageId);
      firstMessage
        ? setMessages([{ text: firstMessage.text, userMessage: false }])
        : setMessages([]);
    }
  }, [isLoading, dataStructure]);

  //Sets up the following questions
  useEffect(() => {
    if (submitCount > 0) {
      const nextMessage = dataStructure?.find((e: Data) => e.id === messageId);
      if (nextMessage) {
        setMessages((prev) => [
          ...prev,
          { ...nextMessage, userMessage: false },
        ]);
      }
    } else {
      setSubmitCount((prev) => prev + 1);
    }
  }, [messageId]);

  //If the conversation is terminated, show goodbye message, create PUT request
  useEffect(() => {
    !renderButtons &&
      handleMessageSend("Herzlichen Dank für Ihre Angaben!🎉", false);
      axios.put("https://virtserver.swaggerhub.com/L8475/task/1.0.1/conversation", messages)
      .then(res => console.log("Data posted with success:", res.data))
      .catch(err => console.error("Error:", err))
  }, [renderButtons]);

  return (
    <ChatWindow messages={messages}>
      {isLoading && <p>Loading...</p>}
      {/* If it finished loading, than render the buttons */}
      {!isLoading && renderButtons && (
        <ReplyButtons
          dataStructure={dataStructure}
          messageId={messageId}
          setSubmitCount={setSubmitCount}
          setMessageId={setMessageId}
          handleMessageSend={handleMessageSend}
          handleButtonRender={handleButtonRender}
        ></ReplyButtons>
      )}

      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        padding="8px"
      >
        <InputField handleMessageSend={handleMessageSend}></InputField>
      </Box>
    </ChatWindow>
  );
};

//The main App component
function App() {
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ChatBot />
    </Container>
  );
}

export default App;
