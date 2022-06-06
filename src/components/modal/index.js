import { View, Text } from "react-native";

import Button from '../CustomButton/index';

import style from './style';

export default function Modal({ show, question, noHandler, yesHandler }) {
  return (
    <View style={{ ...style.background, display: show ? 'flex' : 'none' }}>
      <View style={style.container}>
        <Text>{question}</Text>
        <View style={style.buttonContainer}>

          <View>
            <Button
              text={'Sim'}
              onPress={yesHandler}
              primary={true}
              fontSize={15}
            />
          </View>
          <View>
            <Button
              text={'Não'}
              onPress={noHandler}
              primary={false}
              fontSize={15}
            />
          </View>

        </View>
      </View>
    </View>
  );
}