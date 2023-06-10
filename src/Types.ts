//Types section
export type Message = {
  text: string;
  userMessage: boolean;
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
  handleButtonRender: (nextId: Option["nextId"]) => void;
};

export type ChatWindowProps = {
  messages: Message[];
  children: React.ReactNode;
};

export type InputFieldProps = {
  handleMessageSend: HandleMessageSendType;
};

export type HandleMessageSendType = (messageText: string, isUserMessage: boolean, isAIMessage: boolean) => void;

