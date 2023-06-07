import React, { ReactElement, useRef } from "react";
import { TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

export type InputFieldProps = {
    handleMessageSend: (messageText: string, isUserMessage: boolean) => void;
}

export default function InputField({ handleMessageSend }: InputFieldProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [inputValue, setInputValue] = useState<string>("")

   return (
    <>
    <TextField
     variant="outlined"
     fullWidth
     placeholder="Ihre Nachricht.."
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
            handleMessageSend(inputValue, true)
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
        handleMessageSend(inputValue, true)
        setInputValue("")
        inputRef.current!.value = ""
     }}
    >
        <SendIcon/>
    </Button>
    
    </>
   )

}