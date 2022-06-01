import * as FileSystem from 'expo-file-system';

import { allSensors } from '../config/sensors';

const dir = FileSystem.documentDirectory;

const startFiles = async () => {
  allSensors.forEach(async sensor => {
    await FileSystem.writeAsStringAsync(`${dir}${sensor.filename}.csv`, 'x,y,z,timestamp\n');
  });
};

const appendToFile = async (recordRows) => {
  Object.keys(recordRows).forEach(async filename => {
    const file = await FileSystem.readAsStringAsync(`${dir}${filename}.csv`);
    const newResult = file.concat(recordRows[filename].join(''));
    await FileSystem.writeAsStringAsync(`${dir}${filename}.csv`, newResult);
  })
};

const parseToUpload = async () => {
  const result = {};

  for (const sensor of allSensors) {
    const file = await FileSystem.readAsStringAsync(`${dir}${sensor.filename}.csv`);

    const rows = file.split('\n').filter(row => row !== '');
    if (rows.length <= 1)
      continue;

    result[sensor.filename] = file;
  }

  return result;
};

export { startFiles, appendToFile, parseToUpload };