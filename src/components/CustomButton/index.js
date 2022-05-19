import { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';

import style from './style';

export default function Button({ text, onPress }) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      style={isPressed ? style.buttonPressed : style.button}
      onPress={onPress}
      onPressIn={() => { setIsPressed(true) }}
      onPressOut={() => { setIsPressed(false) }}
      activeOpacity={1}
    >
      <Text style={style.text}>{text}</Text>
    </TouchableOpacity>
  );
}