import { View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import style from './style';
import { useRecord } from '../../contexts/Record';

const round = number => (Math.round(number * 1000) / 1000);

export default function Sensor({ name, sensor, active }) {
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState(null);

  const { isRecording } = useRecord();

  useEffect(() => {
    if (active && isRecording)
      subscribe();
    return () => unsubscribe();
  }, [isRecording])

  const subscribe = () => {
    setSubscription(sensor.addListener(data => { setData(data) }));
  }

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  }

  return (
    <View>
      <Text style={style.title}>{name}</Text>
      <Text style={style.text}> x: {round(x).toFixed(4)} </Text>
      <Text style={style.text}> y: {round(y).toFixed(4)} </Text>
      <Text style={style.text}> z: {round(z).toFixed(4)} </Text>
    </View>
  );
}