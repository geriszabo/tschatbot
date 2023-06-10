import React, { ReactElement, useEffect, useState } from "react";
import InputField from "./components/InputField";
import ChatWindow from "./components/ChatWindow";
import { Message, Option, Data  } from "./Types";

import axios from "axios";

import { Button, Container, Box } from "@mui/material";
import ReplyButtons from "./components/ReplyButtons";

import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { messageIdAtom, dataStructureAtom, isLoadingAtom, messagesAtom, renderButtonsAtom, submitCountAtom } from "./components/Atoms";


const ChatBot = (): ReactElement => {
  //State section
  const [dataStructure, setDataStructure] = useRecoilState(dataStructureAtom);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingAtom);
  const [messages, setMessages] = useRecoilState(messagesAtom);
  const [messageId, setMessageId] = useRecoilState(messageIdAtom);
  const [renderButtons, setRenderButtons] = useRecoilState(renderButtonsAtom);
  const [submitCount, setSubmitCount] = useRecoilState(submitCountAtom);

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
    // axios
    //   .put(
    //     "https://virtserver.swaggerhub.com/L8475/task/1.0.1/conversation",
    //     messages
    //   )
    //   .then((res) => console.log("Data posted with success:", res.data))
    //   .catch((err) => console.error("Error:", err));
  }, [renderButtons]);

  return (
    <ChatWindow messages={messages}>
      {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {/* If it finished loading, than render the buttons */}
      {!isLoading && renderButtons && (
        <ReplyButtons handleMessageSend={handleMessageSend} handleButtonRender={handleButtonRender}></ReplyButtons>
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
    <RecoilRoot>
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
    </RecoilRoot>
  );
}

export default App;
