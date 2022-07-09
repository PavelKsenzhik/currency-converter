import { createContext } from 'react';

export const abbrPickerContext = createContext(false);

export const AbbrPickerProvider = abbrPickerContext.Provider;
export const AbbrPickerConsumer = abbrPickerContext.Consumer;