import { createContext, useContext, useEffect, useState } from "react";

import { appendToFile } from '../services/file';

export const RecordContext = createContext({});

export function RecordContextProvider({ children }) {
  const [isRecording, setIsRecording] = useState(false);

  let recordRows = [];

  useEffect(() => {
    return () => { stopRecording() }
  }, [])

  const startRecording = () => {
    setIsRecording(true);
  }

  const stopRecording = () => {
    setIsRecording(false);

    if (recordRows.length > 0) {
      recordRows = [];
    }
  }

  const addRow = async (filename, row) => {
    recordRows.push(row);

    if (recordRows.length >= 40) {
      await appendToFile(filename, recordRows);
      recordRows = [];
    }
  }

  return (
    <RecordContext.Provider
      value={{ isRecording, startRecording, stopRecording, addRow }}
    >
      {children}
    </RecordContext.Provider>
  );
}

export function useRecord() {
  return useContext(RecordContext);
}