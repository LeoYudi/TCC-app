import * as FileSystem from 'expo-file-system';

const dir = FileSystem.documentDirectory;

const startFiles = async (sensors) => {
  sensors.forEach(async sensor => {
    await FileSystem.writeAsStringAsync(`${dir}${sensor.filename}`, 'x, y, z, timestamp,\n');
  });
};

const appendToFile = async (filename, rows) => {
  const file = await FileSystem.readAsStringAsync(`${dir}${filename}`);
  const newResult = file.concat(rows);
  await FileSystem.writeAsStringAsync(`${dir}${filename}`, newResult);
}

export { startFiles, appendToFile };