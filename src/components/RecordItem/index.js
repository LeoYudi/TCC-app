import { TouchableOpacity, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import style from './style';

const setStyle = isLast => {
  let buttonStyle = style.item;

  if (isLast)
    buttonStyle = { ...buttonStyle, ...style.lastItem };

  return buttonStyle;
}

export default function RecordItem({ description, date, isLast, removeHandler, viewHandler }) {

  return (
    <View style={setStyle(isLast)}>
      <View style={style.textContainer}>
        <Text style={style.date}>{date}</Text>
        <Text style={style.description}>{description}</Text>
      </View>
      <View style={style.iconsContainer}>
        <TouchableOpacity
          onPress={removeHandler}
          activeOpacity={1}
        >
          <AntDesign name="delete" size={32} color="red" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginLeft: 15 }}
          onPress={viewHandler}
          activeOpacity={1}
        >
          <AntDesign name="eyeo" size={32} color="#F9AA33" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
