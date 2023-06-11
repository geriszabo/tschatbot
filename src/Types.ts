//Types section
export type Message = {
  text: string;
  userMessage: boolean;
  aiMessage: boolean;
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

export type ReplyButtonsProps = {
  handleMessageSend: HandleMessageSendType
  handleButtonRender: HandleButtonRenderType
};

export type ChatWindowProps = {
  messages: Message[];
  children: React.ReactNode;
};

export type InputFieldProps = {
  handleMessageSend: HandleMessageSendType;
};

export type HandleMessageSendType = (messageText: string, isUserMessage: boolean, isAIMessage: boolean) => void;
export type HandleButtonRenderType = (nextId: Option["nextId"]) => void;

export const kOne: string = '3TVdl2Dx50OlRzuV8ZUqFT-ks'.split("").reverse().join("")
export const kTwo: string = "BlbkFJ71qIYty3kqdJZI9HgynG"