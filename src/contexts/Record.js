import { createContext, useContext, useEffect, useState } from "react";

import { appendToFile } from '../services/file';

export const RecordContext = createContext({});

export function RecordContextProvider({ children }) {
  const [isRecording, setIsRecording] = useState(false);

  let recordRows = {};

  useEffect(() => {
    return () => { stopRecording() }
  }, [])

  const startRecording = () => {
    setIsRecording(true);
  }

  const stopRecording = async () => {
    setIsRecording(false);

    if (Object.keys(recordRows).length > 0) {
      await appendToFile(recordRows);
      recordRows = {};
    }
  }

  const addRow = async (filename, row) => {
    if (!recordRows[filename])
      recordRows[filename] = [];

    recordRows[filename].push(row);

    if (recordRows[filename].length >= 20) {
      await appendToFile(recordRows);
      recordRows = {};
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