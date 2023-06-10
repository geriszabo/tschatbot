import { ReactElement } from "react";
import { ReplyButtonsProps } from "../Types";
import { Data, Option } from "../Types";
import { Button } from "@mui/material";
import { buttonValuesAtom, dataStructureAtom, messageIdAtom, submitCountAtom } from "./Atoms";
import { getButtonValues } from "./Selectors";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useResetRecoilState,
  useRecoilValue,
} from "recoil";

export default function ReplyButtons({
  handleMessageSend,
  handleButtonRender,
}: ReplyButtonsProps): ReactElement {
  const dataStructure = useRecoilValue(dataStructureAtom);
  const buttonValue = useRecoilValue(getButtonValues)
  const [submitCount, setSubmitCount] = useRecoilState(submitCountAtom)
  const [messageId, setMessageId] = useRecoilState(messageIdAtom);
  const [buttonValues, setButtonValues] = useRecoilValue(buttonValuesAtom);

  // console.log(buttonValue)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Mapping the available buttons for the question */}
      {dataStructure
        ?.find((e) => e.id === messageId)
        ?.valueOptions.map((option, index) => {
          return (
            <Button
              onSubmit={() => (
                setSubmitCount((prev: number) => prev + 1)
              )}
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
