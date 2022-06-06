import { View, ActivityIndicator } from 'react-native';

import style from './style';

export default function Loading({ show }) {
  return (
    <View style={show ? style.background : { display: 'none' }}>
      <View style={style.container}>
        <ActivityIndicator size={50} color='#F9AA33' />
      </View>
    </View>
  );
}