import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Keyboard } from 'react-native';
import { useState, useEffect } from 'react';

import Button from '../../components/CustomButton';
import Loading from '../../components/Loading';
import AlertModal from '../../components/AlertModal';

import { parseToUpload } from '../../services/file';
import { post } from '../../services/api';

import style from './style';

export default function Manage({ navigation }) {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [apiResponse, setApiResponse] = useState('');
  const [recordDescription, setRecordDescription] = useState('');
  const [isFocus, setFocus] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      Keyboard.dismiss();
      setFocus(false);
      setShowRegisterModal(false);
      setLoading(false);
      setShowResponseModal(false);
    }
  }, [])

  return (
    <>
      <View style={style.container}>
        <Text style={style.h1}>Ações</Text>
        <View style={style.buttonsContainer}>
          <View style={style.button}>
            <Button text='Listar gravações' onPress={() => { navigation.navigate('manage/list') }} />
          </View>
          <View style={style.button}>
            <Button text='Upload da gravação local' onPress={() => { setShowRegisterModal(true) }} />
          </View>
        </View>
        <StatusBar style='auto' />
      </View>

      {/* modals */}
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
            onChangeText={text => { setRecordDescription(text) }}
            value={recordDescription}
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
                  setShowRegisterModal(false);
                  setLoading(true);
                  setFocus(false);
                  Keyboard.dismiss();

                  try {
                    const sensors = await parseToUpload();
                    const response = await post('/insert-file', { description: recordDescription, sensors });

                    if (response.error)
                      setApiResponse(response.error);
                    else
                      setApiResponse(response.msg);

                    setLoading(false);
                    setShowResponseModal(true);
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

      <Loading show={isLoading} />
      <AlertModal
        show={showResponseModal}
        text={apiResponse}
        onPress={() => { setShowResponseModal(false) }}
      />
    </>
  );
}