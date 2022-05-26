import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useState } from 'react';

import Button from '../../components/CustomButton';
import Modal from '../../components/modal';

import style from './style.js';

export default function Home({ navigation }) {
  const [showRecordModal, setShowRecordModal] = useState(false);

  return (
    <>
      <View style={style.container}>
        <Text style={style.h1}>Ações</Text>
        <View style={style.buttonsContainer}>
          <Button text='Gravar sensores' onPress={() => { setShowRecordModal(true) }} />
        </View>
        <StatusBar style="auto" />
      </View>
      <Modal
        show={showRecordModal}
        question={'Isso irá apagar a gravação anterior salva no localmente. Deseja continuar ?'}
        noHandler={() => { setShowRecordModal(false) }}
        yesHandler={() => {
          setShowRecordModal(false);
          navigation.navigate('record');
        }}
      />
    </>
  );
}
