import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import * as GPS from 'expo-location';

import { useRecord } from '../../contexts/Record';

import { gpsConfig } from '../../config/gps';

import style from './style';

const round = number => number ? (Math.round(number * 100000) / 100000).toFixed(5) : 0;

export default function Gps({ active }) {
  const [subscription, setSubscription] = useState(null);
  const [{ coords }, setLocation] = useState({});

  const { isRecording, addRow } = useRecord();

  const subscribe = async () => {
    setSubscription(
      await GPS.watchPositionAsync({
        accuracy: GPS.Accuracy.Highest,
        distanceInterval: 1,  // distancia mínima em metros para atualização
        timeInterval: 30  // tempo mínimo em milisegundos para atualização
      },
        async location => {
          setLocation(location);
          await addRow(
            gpsConfig.filename,
            `${location.coords.latitude};${location.coords.longitude};${location.coords.altitude};${round(location.timestamp)}\n`
          );
        }
      )
    );
  }

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  }

  useEffect(() => {
    (async () => {
      const { status } = await GPS.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log(status);
        return;
      }

      if (active && isRecording)
        await subscribe();
      else
        unsubscribe();

    })();

    return () => unsubscribe();

  }, [isRecording]);

  return (
    <View style={style.container}>
      <Text style={style.title}>GPS</Text>
      <Text style={style.text}>lat: {coords?.latitude || 0}</Text>
      <Text style={style.text}>lon: {coords?.longitude || 0}</Text>
      <Text style={style.text}>alt: {round(coords?.altitude) || 0}</Text>
    </View>
  );
}