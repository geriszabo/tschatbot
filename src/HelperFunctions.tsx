import axios from "axios";
import React, { SetStateAction } from "react";
import { Data, HandleMessageSendType, Message, Option } from "./Types";
import { Configuration, OpenAIApi } from "openai";

//Loads initial data
export function getInitialData(
  setDataStructure: React.Dispatch<SetStateAction<Data[]>>,
  setIsLoading: React.Dispatch<SetStateAction<boolean>>
): void {
  axios
    .get("https://raw.githubusercontent.com/mzronek/task/main/flow.json")
    .then((res) => setDataStructure(res.data))
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false));
}

//Makes put request
export function makePutRequest(messages: Message[]) {
  axios
    .put(
      "https://virtserver.swaggerhub.com/L8475/task/1.0.1/conversation",
      messages
    )
    .then((res) => console.log("Data posted with success:", res.data))
    .catch((err) => console.error("Error:", err));
}

const openai = new OpenAIApi(
  new Configuration({
    apiKey: "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",
  })
);

//AI chatbot to help customer anser questions
export async function getAIReply(
  handleMessageSend: HandleMessageSendType,
  userMessage: string,
  buttonsAreRendered: boolean
) {

    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: !buttonsAreRendered
            ? `du bist ein Chatbot von einer 
              Versicherungsagentur, du sollst dem Kunden
              in ein Paar Worten auf den folgenden Text
              antworten: ${userMessage}. Wenn jemand keine Hilfe möchte
              dann verabschiede dich.
              Du sollst die Webseite deiner Versicherungsagentur
              empfehlen. Die Webseite ist: www.zurich.at. Du sollst dich nicht vorstellen!
              Du kannst ruhig witzig sein. Du schreibst nur kurze Sätze!`
            : `du bist jetzt ein chatbot von einer 
              Versicherungsagentur,  und du sollst den Kunden in ein Paar Worten
              erinnern dass er noch nicht alle Fragen beantwortet hat. Stell dich nicht vor. Du schreibst kurze Sätze! Du bist witzig!`,
        },
      ],
      max_tokens: 60,
      temperature: 0.3,
    });

    const messageContent = res.data.choices[0]?.message?.content;
    if (messageContent) {
      handleMessageSend(messageContent, false, true);
      return messageContent;
    } else {
      throw new Error("No message content available.");
    }
}

//Checks for unanswered questions, if there are any: reminds customer to answer them, if no: promotes website
export function checkIfQuestionsAnswered(
  dataStructure: Data[],
  messageId: Option["nextId"],
  messages: Message[],
  handleMessageSend: HandleMessageSendType
) {
  const repeatedMessage = dataStructure.find((e: Data) => e.id === messageId);

  messages.length > 0 &&
    messages[messages.length - 1].aiMessage &&
    repeatedMessage &&
    setTimeout(() => {
      handleMessageSend(repeatedMessage.text, false, false);
    }, 1500);
}
