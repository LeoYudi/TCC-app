import { createContext, useContext, useEffect, useState } from "react";

export const RecordContext = createContext({});

export function RecordContextProvider({ children }) {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <RecordContext.Provider
      value={{ isRecording, setIsRecording }}
    >
      {children}
    </RecordContext.Provider>
  );
}

export function useRecord() {
  return useContext(RecordContext);
}