import React, { ReactElement, useEffect } from "react";
import InputField from "./components/InputField";
import ChatWindow from "./components/ChatWindow";
import { Data } from "./Types";
import { getAIReply, getInitialData } from "./HelperFunctions";
import Spinner from "./components/Spinner";
import { Container, Box } from "@mui/material";
import ReplyButtons from "./components/ReplyButtons";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import {
  messageIdAtom,
  dataStructureAtom,
  isLoadingAtom,
  messagesAtom,
  renderButtonsAtom,
  submitCountAtom,
  userMessageAtom,
} from "./components/Atoms";

const ChatBot = (): ReactElement => {
  //State section
  const userMessage = useRecoilValue(userMessageAtom);
  const [dataStructure, setDataStructure] = useRecoilState(dataStructureAtom);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingAtom);
  const [messages, setMessages] = useRecoilState(messagesAtom);
  const messageId = useRecoilValue(messageIdAtom);
  const [renderButtons, setRenderButtons] = useRecoilState(renderButtonsAtom);
  const [submitCount, setSubmitCount] = useRecoilState(submitCountAtom);

  //Message handling - creates new messages and puts them into state
  const handleMessageSend = (messageText: string, isUserMessage: boolean, isAIMessage: boolean) => {
    const newMessage = { text: messageText, userMessage: isUserMessage, aIMessage: isAIMessage };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  //Rendering the answer buttons - !nextId = no buttons :(
  const handleButtonRender = (nextId: number | boolean) => {
    setRenderButtons(nextId !== false ? true : false);
  };

  //Fetch data on inital render
  useEffect(() => {
   getInitialData(setDataStructure, setIsLoading)
  }, []);

  useEffect((): any => {
    if (userMessage !== "") {
      getAIReply(handleMessageSend, userMessage)
    }
  }, [userMessage]);

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
      handleMessageSend("Herzlichen Dank für Ihre Angaben!🎉", false, false);
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
      {isLoading && <Spinner/>}
      {/* If it finished loading, than render the buttons */}
      {!isLoading && renderButtons && (
        <ReplyButtons
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
