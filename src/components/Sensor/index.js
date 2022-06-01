import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import style from './style';
import { useRecord } from '../../contexts/Record';

const round = number => (Math.round(number * 1000) / 1000);

export default function Sensor({ name, filename, measure, sensor, active }) {
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState(null);

  const { isRecording, addRow } = useRecord();

  useEffect(() => {
    if (active && isRecording)
      subscribe();
    else
      unsubscribe();

    return () => unsubscribe();
  }, [isRecording])

  const subscribe = () => {
    setSubscription(sensor.addListener(
      async data => {
        await addRow(filename, `${data.x},${data.y},${data.z},${(new Date()).getTime()}\n`);
        setData(data);
      }
    ));
  }

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  }

  return (
    <View style={style.container}>
      <Text style={style.title}>{name}</Text>
      <Text style={style.subTitle}>{measure}</Text>
      <Text style={style.text}> x: {round(x).toFixed(4)} </Text>
      <Text style={style.text}> y: {round(y).toFixed(4)} </Text>
      <Text style={style.text}> z: {round(z).toFixed(4)} </Text>
    </View>
  );
}