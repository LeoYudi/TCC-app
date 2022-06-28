import * as FileSystem from 'expo-file-system';

import { allSensors } from '../config/sensors';
import { gpsConfig } from '../config/gps';

const dir = FileSystem.documentDirectory + 'records';

const getFilesName = async () => {
  try {
    return await FileSystem.readDirectoryAsync(dir);
  } catch (error) {
    await FileSystem.makeDirectoryAsync(dir);
    return [];
  }
}

const getFileByName = async (filename) => await FileSystem.readAsStringAsync(`${dir}/${filename}`);

const startFiles = async () => {
  await getFilesName();

  allSensors.forEach(async sensor => {
    await FileSystem.writeAsStringAsync(`${dir}/${sensor.filename}.csv`, 'x;y;z;timestamp\n');
  });

  await FileSystem.writeAsStringAsync(`${dir}/${gpsConfig.filename}.csv`, 'lat;lon;alt;timestamp\n');
};

const deleteFiles = async () => {
  allSensors.forEach(async sensor => {
    await FileSystem.deleteAsync(`${dir}/${sensor.filename}.csv`);
  });
  await FileSystem.deleteAsync(`${dir}/${gpsConfig.filename}.csv`);
};

const appendToFile = async (recordRows) => {
  Object.keys(recordRows).forEach(async filename => {
    const file = await getFileByName(`${filename}.csv`)
    const newResult = file.concat(recordRows[filename].join(''));
    await FileSystem.writeAsStringAsync(`${dir}/${filename}.csv`, newResult);
  })
};

const parseToUpload = async () => {
  const result = {};

  for (const sensor of allSensors) {
    const file = await getFileByName(`${sensor.filename}.csv`);

    const rows = file.split('\n').filter(row => row !== '');
    if (rows.length <= 1)
      continue;

    result[sensor.filename] = file;
  }

  return result;
};

export { getFilesName, getFileByName, startFiles, deleteFiles, appendToFile, parseToUpload };