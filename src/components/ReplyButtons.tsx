import { ReactElement } from "react";
import { Data, Option } from "../App";
import { Button } from "@mui/material";

type ReplyButtonsProps = {
  dataStructure: Data[];
  messageId: Option["nextId"];
  setSubmitCount: Function;
  setMessageId: Function;
  handleMessageSend: (messageText: string, isUserMessage: boolean) => void;
  handleButtonRender: (nextId: Option["nextId"]) => void;
};

export default function ReplyButtons({
  dataStructure,
  messageId,
  setMessageId,
  setSubmitCount,
  handleMessageSend,
  handleButtonRender,
}: ReplyButtonsProps): ReactElement {
  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
      {/* Mapping the available buttons for the question */}
      {dataStructure
        ?.find((e) => e.id === messageId)
        ?.valueOptions.map((option, index) => {
          return (
            <Button
              onSubmit={() => setSubmitCount((prev: number) => prev + 1)}
              key={index}
              value={option.text}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => (
                //Handling der ID, sending the message, checking if the next buttons should be rendered
                option.nextId && setMessageId(option.nextId),
                handleMessageSend((e.target as HTMLButtonElement).value, true),
                handleButtonRender(option.nextId)
              )}
              color="primary"
            >
              {option.text}
            </Button>
          );
        })}
    </div>
  );
}
