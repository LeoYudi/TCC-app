import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useState } from 'react';

import Button from '../../components/CustomButton';
import Modal from '../../components/Modal';

import style from './style.js';

export default function Home({ navigation }) {
  const [showRecordModal, setShowRecordModal] = useState(false);

  return (
    <>
      <View style={style.container}>
        <Text style={style.h1}>Ações</Text>
        <View style={style.buttonsContainer}>
          <View style={style.button}>
            <Button text='Gravar sensores' onPress={() => { setShowRecordModal(true) }} />
          </View>
          <View style={style.button}>
            <Button text='Gerenciar gravações' onPress={() => { navigation.navigate('manage') }} />
          </View>
          <View style={style.button}>
            <Button text='Arquivos' onPress={() => { navigation.navigate('files') }} />
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
      <Modal
        show={showRecordModal}
        question={'Isso irá apagar a gravação anterior salva localmente. Deseja continuar ?'}
        noHandler={() => { setShowRecordModal(false) }}
        yesHandler={() => {
          setShowRecordModal(false);
          navigation.navigate('record');
        }}
      />
    </>
  );
}
