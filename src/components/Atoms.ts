import { atom } from 'recoil';
import { Option, Data, Message } from '../Types';

export const buttonValuesAtom = atom<string[]>({
  key: 'buttonValuesAtom',
  default: [],
});

export const messageIdAtom = atom<Option["nextId"]>({
  key: 'messageIdAtom',
  default: 100,
});

export const dataStructureAtom = atom<Data[]>({
    key: 'dataStructureAtom',
    default: [],
  });

export const isLoadingAtom = atom<boolean>({
    key: 'isLoadingAtom',
    default: true,
})

export const messagesAtom = atom<Message[]>({
    key: 'messagesAtom',
    default: [],
});

export const renderButtonsAtom = atom<boolean>({
    key: 'renderButtonsAtom',
    default: true,
})

export const submitCountAtom = atom<number>({
    key: 'submitCountAtom',
    default: 0
})