import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Accelerometer, Gyroscope, Magnetometer } from 'expo-sensors';

import Button from "../../components/CustomButton";
import ConfigOption from "../../components/ConfigOption";
import Sensor from "../../components/Sensor";

import { useRecord } from "../../contexts/Record";

import { startFiles } from "../../services/file";

import style from './style';

export default function Record() {
  const [fast, setFast] = useState(false);
  const [sensors, setSensors] = useState([]);

  const { isRecording, startRecording, stopRecording } = useRecord();

  useEffect(() => {
    setAllSensors();

    return () => { stopRecording() };
  }, [])

  const setAllSensors = () => {
    const allSensors = [{
      name: 'Acelerômetro',
      filename: 'acelerometro.csv',
      measure: 'Gs (~9.81 m/s^2)',
      sensor: Accelerometer,
      active: false,
    }, {
      name: 'Giroscópio',
      filename: 'giroscopio.csv',
      measure: 'rad/s',
      sensor: Gyroscope,
      active: false,
    }, {
      name: 'Magnetômetro',
      filename: 'magnetometro.csv',
      measure: 'μT',
      sensor: Magnetometer,
      active: false,
    }];

    setSensors(allSensors);
    startFiles(allSensors);
  }

  const setUpdateInterval = bool => {
    sensors.forEach(item => {
      item.sensor.setUpdateInterval(bool ? 30 : 100);
    });
    setFast(bool);
  }

  return (
    <View style={style.container}>
      <View>
        <View style={{ display: isRecording ? 'flex' : 'none', ...style.sensorContainer }}>
          {sensors.map((item, index, array) => (
            <Sensor key={index} name={item.name} filename={item.filename} measure={item.measure} sensor={item.sensor} active={item.active} />
          ))}
        </View>

        <View style={{ ...style.configContainer, display: isRecording ? 'none' : 'flex' }}>
          <Text style={style.h1}>Configurações</Text>

          {sensors.map((item, index, array) => (
            <ConfigOption
              key={index}
              text={`${item.name} (${item.measure})`}
              onValueChange={() => {
                const newSensors = [...sensors];
                newSensors[index].active = !newSensors[index].active;
                setSensors(newSensors);
              }}
              value={item.active}
            />
          ))}

          <ConfigOption
            text={'Intervalo de atualização do sensor de 30ms ubioubuihbu'}
            onValueChange={() => { setUpdateInterval(!fast) }}
            value={fast}
          />
        </View>

      </View>
      <View style={{ alignSelf: 'flex-end', width: '100%' }}>
        <Button
          text={`${isRecording ? 'Parar de' : 'Começar a'} gravar`}
          onPress={() => {
            if (isRecording)
              stopRecording();
            else
              startRecording();
          }}
        />
      </View>
    </View>
  );
}