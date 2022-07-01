import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';

import Loading from '../../../../components/Loading';

import { allSensors } from '../../../../config/sensors';

import { get } from '../../../../services/api';

import { parseDateWithHours } from '../../../../utils/date';

import style from './style';

export default function Record({ route, navigation }) {
  const [record, setRecord] = useState({ sensors: {} });
  const [isLoading, setLoading] = useState(false);

  const getRecordByid = async id => {
    setLoading(true);
    const response = await get(`/records/${route.params.id}`);
    setRecord(response);
    setLoading(false);
  }

  useEffect(() => {
    getRecordByid();
  }, []);

  return (
    <>
      {record ?
        <View style={style.container}>
          <Text style={style.info}>Descrição: {record.description}</Text>
          <Text style={style.info}>Criação: {parseDateWithHours(record.created_at)}</Text>

          {allSensors.map(sensor =>
            <Text key={sensor.filename} style={style.info}>Dados do {sensor.name}: {record.sensors[sensor.filename] ? record.sensors[sensor.filename].length : 0}</Text>
          )}

          <Text style={style.info}>Dados do GPS: {record.locations ? record.locations.length : 0}</Text>
        </View>
        : <></>}
      <Loading show={isLoading} />
    </>
  );
}