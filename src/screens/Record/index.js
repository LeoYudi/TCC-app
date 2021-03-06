import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import { allSensors } from '../../config/sensors';

import Button from '../../components/CustomButton';
import ConfigOption from '../../components/ConfigOption';
import Sensor from '../../components/Sensor';
import Gps from '../../components/Gps';

import { useRecord } from '../../contexts/Record';

import { startFiles } from '../../services/file';

import style from './style';

export default function Record() {
  const [fast, setFast] = useState(false);
  const [useGps, setUseGps] = useState(false);
  const [sensors, setSensors] = useState([]);

  const { isRecording, startRecording, stopRecording } = useRecord();

  useEffect(() => {
    setAllSensors();

    return () => { stopRecording() };
  }, [])

  const setAllSensors = () => {
    setSensors(allSensors);
    startFiles();
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

          <Gps active={useGps} />
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
            text={'GPS'}
            onValueChange={() => { setUseGps(!useGps) }}
            value={useGps}
          />

          <ConfigOption
            text={'Intervalo de atualização do sensor de 30ms'}
            onValueChange={() => { setUpdateInterval(!fast) }}
            value={fast}
          />
        </View>

      </View>
      <View style={{ alignSelf: 'flex-end', width: '100%' }}>
        <Button
          text={`${isRecording ? 'Parar de' : 'Começar a'} gravar`}
          onPress={async () => {
            if (isRecording)
              await stopRecording();
            else
              startRecording();
          }}
        />
      </View>
    </View>
  );
}