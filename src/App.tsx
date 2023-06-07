import React, { ReactElement, useEffect, useState } from "react";
import InputField from "./components/InputField";
import ChatWindow from "./components/ChatWindow";

import "./App.css";
import axios from "axios";

import { Button, Container, Box } from "@mui/material";

export type Message = {
  text: string;
  userMessage: boolean;
};

interface Option {
  nextId: number | boolean;
  value: boolean | string | number;
  text: string;
}

interface Data {
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
  const [dataStructure, setDataStructure] = useState<Data[]>();
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
      const firstMessage = dataStructure.find((e) => e.id === messageId);
      firstMessage
        ? setMessages([{ text: firstMessage.text, userMessage: false }])
        : setMessages([]);
    }
  }, [isLoading, dataStructure]);

  //Sets up the following questions
  useEffect(() => {
    if (submitCount > 0) {
      const nextMessage = dataStructure?.find((e) => e.id === messageId);
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

  //If the conversation is terminated, show goodbye message
  useEffect(() => {
    !renderButtons &&
      handleMessageSend("Herzlichen Dank für Ihre Angaben!", false);
  }, [renderButtons]);

  return (
    <ChatWindow messages={messages}>
      {isLoading && <p>Loading...</p>}
      {!isLoading &&
        renderButtons &&
        dataStructure
          ?.find((e) => e.id === messageId)
          ?.valueOptions.map((option, index) => {
            return (
              <Button
                onSubmit={() => setSubmitCount((prev) => prev + 1)}
                key={index}
                value={option.text}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => (
                  option.nextId && setMessageId(option.nextId),
                  handleMessageSend(
                    (e.target as HTMLButtonElement).value,
                    true
                  ),
                  handleButtonRender(option.nextId)
                )}
                color="primary"
              >
                {option.text}
              </Button>
            );
          })}
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
