import { Accelerometer, Gyroscope, Magnetometer } from 'expo-sensors';

const allSensors = [{
  name: 'Acelerômetro',
  filename: 'acelerometro',
  measure: 'Gs (~9.81 m/s^2)',
  sensor: Accelerometer,
  active: false,
}, {
  name: 'Giroscópio',
  filename: 'giroscopio',
  measure: 'rad/s',
  sensor: Gyroscope,
  active: false,
}, {
  name: 'Magnetômetro',
  filename: 'magnetometro',
  measure: 'μT',
  sensor: Magnetometer,
  active: false,
}];

export { allSensors };