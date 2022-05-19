import { View, Text, Switch } from 'react-native';

import style from './style';

export default function ConfigOption({ text, onValueChange, value }) {
  return (
    <View style={style.configOption}>

      <Text style={style.configText}>{text}</Text>
      <Switch
        trackColor={{ false: '#4A6572', true: '#FFC56E' }}
        thumbColor={value ? '#DE9528' : '#fff'}
        onValueChange={onValueChange}
        value={value}
      />

    </View>
  );
}