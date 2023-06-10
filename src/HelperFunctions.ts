import axios from "axios";
import React, { SetStateAction } from "react";
import { Data, HandleMessageSendType, Message } from "./Types";
import { Configuration, OpenAIApi } from "openai";


export function getInitialData(setDataStructure:React.Dispatch<SetStateAction<Data[]>>, setIsLoading:React.Dispatch<SetStateAction<boolean>>): void {
    axios
    .get("https://raw.githubusercontent.com/mzronek/task/main/flow.json")
    .then((res) => setDataStructure(res.data))
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false));
}

export function getAIReply(handleMessageSend: HandleMessageSendType, userMessage: string) {
    const openai = new OpenAIApi(
        new Configuration({
          apiKey: "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",
        })
      );

      const askAI = async (userText: String) => {
        const res = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `du bist jetzt ein chatbot von einer 
              Versicherungsagentur,  und du sollst dem Kunden
              kurz und schnell auf den folgenden Text
              antworten: ${userText}`,
            },
          ],
          max_tokens: 40,
          temperature: 0.2,
        });

        const messageContent = res.data.choices[0]?.message?.content;
        if (messageContent) {
          console.log(messageContent);
          handleMessageSend(messageContent, false, true);
          return messageContent;
        } else {
          throw new Error("No message content available.");
        }
      };

      askAI(userMessage)
}