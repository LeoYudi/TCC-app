import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Accelerometer } from 'expo-sensors';

import Button from "../../components/CustomButton";
import ConfigOption from "../../components/ConfigOption";
import style from './style';
import Sensor from "../../components/Sensor";
import { useRecord } from "../../contexts/Record";

export default function Record() {
  const [fast, setFast] = useState(false);
  const [sensors, setSensors] = useState([]);

  const { isRecording, setIsRecording } = useRecord();

  useEffect(() => {
    setAllSensors();

    return () => { setIsRecording(false) };
  }, [])

  const setAllSensors = () => {
    setSensors([{
      name: 'Acelerômetro',
      sensor: Accelerometer,
      active: false,
    }])
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

        <View style={{ display: isRecording ? 'flex' : 'none' }}>
          {sensors.map((item, index, array) => (
            <Sensor key={index} name={item.name} sensor={item.sensor} active={item.active} />
          ))}
        </View>

        <View style={{ ...style.configContainer, display: isRecording ? 'none' : 'flex' }}>
          <Text style={style.h1}>Configurações</Text>

          {sensors.map((item, index, array) => (
            <ConfigOption
              key={index}
              text={item.name}
              onValueChange={() => {
                const newSensors = [...sensors];
                newSensors.splice(index, 1);
                newSensors.splice(index, 0, { ...item, active: !item.active });
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
          onPress={() => { setIsRecording(!isRecording) }}
        />
      </View>
    </View>
  );
}