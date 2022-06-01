import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, Keyboard } from "react-native";
import { useState } from 'react';

import Button from "../../components/CustomButton";

import { parseToUpload } from "../../services/file";
import { postRequest } from "../../services/api";

import style from './style';

export default function Manage({ navigation }) {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [recordName, setRecordName] = useState('');
  const [isFocus, setFocus] = useState(false);

  return (
    <>
      <View style={style.container}>
        <Text style={style.h1}>Ações</Text>
        <View style={style.buttonsContainer}>
          <View style={style.button}>
            <Button text='Listar gravações' onPress={() => { navigation.navigate('listRecordings') }} />
          </View>
          <View style={style.button}>
            <Button text='Upload da gravação local' onPress={() => { setShowRegisterModal(true) }} />
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
      <View
        style={{
          ...style.background,
          display: showRegisterModal ? 'flex' : 'none'
        }}
      >
        <View style={style.modalContainer}>

          <Text style={style.modalText}>Informe a descrição da gravação:</Text>

          <TextInput
            style={
              isFocus ?
                { ...style.modalInput, ...style.modalInputFocus } :
                style.modalInput}
            onChangeText={text => { setRecordName(text) }}
            value={recordName}
            onFocus={() => { setFocus(true) }}
            placeholder='Descrição'
          />

          <View style={style.modalButtonsContainer}>
            <View style={{ marginRight: 10 }}>
              <Button
                text={'Cancelar'}
                onPress={() => {
                  Keyboard.dismiss();
                  setFocus(false);
                  setShowRegisterModal(false);
                }}
                primary={false}
                fontSize={15}
              />
            </View>

            <View>
              <Button
                text={'Cadastrar'}
                onPress={async () => {
                  try {
                    const sensors = await parseToUpload();
                    const response = await postRequest('/insert-file', { recordName, sensors });
                    console.log(response);
                  } catch (error) {
                    console.log(error);
                  }
                }}
                primary={true}
                fontSize={15}
              />
            </View>
          </View>

        </View>
      </View>
    </>
  );
}