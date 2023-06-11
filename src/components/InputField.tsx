import React, { ReactElement, useRef } from "react";
import { InputFieldProps } from "../Types";
import { TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { userMessageAtom } from "./Atoms";
import { useRecoilState } from "recoil";

export default function InputField({ handleMessageSend }: InputFieldProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [inputValue, setInputValue] = useState<string>("")
    const [userMessage, setUserMessage] = useRecoilState(userMessageAtom)

   return (
    <>
    <TextField
     variant="outlined"
     fullWidth
     placeholder="Ihre Nachricht..."
     size="small"
     ref={inputRef}
     value={inputValue}
     onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
     onKeyDown={(e: React.KeyboardEvent) => {
        if(e.key === "Enter") {
            //Dont send any empty strings
            if(inputValue.trim() === "") {
                inputRef.current!.value = ""
                return
            }
            //Send the message and clear the input field
            setUserMessage(inputValue)
            handleMessageSend(inputValue, true, false)
            setInputValue("")
            inputRef.current!.value = ""
        }
     }}
    />
    <Button
     variant="contained"
     color="primary"
     style={{ marginLeft: "16px" }}
     onClick={() => {
        //Dont send any empty strings
        if(inputValue === "" || inputValue.trim() === "") {
            setInputValue("")
            return
        }
        //Send the message and clear the input field
        handleMessageSend(inputValue, true, false)
        setInputValue("")
        inputRef.current!.value = ""
     }}
    >
        <SendIcon/>
    </Button>
    
    </>
   )

}