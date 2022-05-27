import * as FileSystem from 'expo-file-system';

const dir = FileSystem.documentDirectory;

const startFiles = async (sensors) => {
  sensors.forEach(async sensor => {
    await FileSystem.writeAsStringAsync(`${dir}${sensor.filename}.csv`, 'x, y, z, timestamp,\n');
  });
};

const appendToFile = async (recordRows) => {
  Object.keys(recordRows).forEach(async filename => {
    const file = await FileSystem.readAsStringAsync(`${dir}${filename}.csv`);
    const newResult = file.concat(recordRows[filename]);
    await FileSystem.writeAsStringAsync(`${dir}${filename}.csv`, newResult);
  })
}

export { startFiles, appendToFile };