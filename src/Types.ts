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

  handleMessageSend: (messageText: string, isUserMessage: boolean) => void;
  handleButtonRender: (nextId: Option["nextId"]) => void;
};

export type ChatWindowProps = {
  messages: Message[];
  children: React.ReactNode;
};

export type InputFieldProps = {
  handleMessageSend: (messageText: string, isUserMessage: boolean) => void;
};
