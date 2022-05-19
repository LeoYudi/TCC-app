import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Button from '../../components/CustomButton';

import style from './style.js';

export default function Home({ navigation }) {
  return (
    <View style={style.container}>
      <Text style={style.h1}>Ações</Text>
      <View style={style.buttonsContainer}>
        <Button text='Gravar sensores' onPress={() => { navigation.navigate('record') }} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
