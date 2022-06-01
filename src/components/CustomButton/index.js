import { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';

import style from './style';

export default function Button({ text, onPress, primary = true, fontSize = 20 }) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      style={(() => {
        let buttonStyle = style.button;

        if (isPressed) {
          if (primary)
            buttonStyle = {
              ...buttonStyle,
              ...style.buttonPressed
            }

          else
            buttonStyle = {
              ...buttonStyle,
              ...style.secondaryButtonPressed
            }
        }
        else {
          if (!primary)
            buttonStyle = {
              ...buttonStyle,
              ...style.secondaryButton
            }
        }

        return buttonStyle;
      })()}
      onPress={onPress}
      onPressIn={() => { setIsPressed(true) }}
      onPressOut={() => { setIsPressed(false) }}
      activeOpacity={1}
    >
      <Text style={primary ?
        { ...style.text, fontSize } :
        { ...style.secondaryText, fontSize }}>
        {text}
      </Text>
    </TouchableOpacity >
  );
}