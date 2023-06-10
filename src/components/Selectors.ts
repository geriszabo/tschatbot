import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import {
  aIMessageAtom,
  dataStructureAtom,
  messageIdAtom,
  messagesAtom,
  userMessageAtom,
} from "./Atoms";
import { Configuration, OpenAIApi } from "openai";

export const getButtonValues = selector({
  key: "getButtonValues",
  get: ({ get }) => {
    const questionId = get(messageIdAtom);
    const dataStructure = get(dataStructureAtom);

    let result = dataStructure
      ?.find((e) => e.id === questionId)
      ?.valueOptions.map((e) => e.text);

    return result;
  },
});
