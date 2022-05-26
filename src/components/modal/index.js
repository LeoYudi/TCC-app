import { View, Text, TouchableOpacity } from "react-native";

import style from './style';

export default function Modal({ show, question, noHandler, yesHandler }) {
  return (
    <View style={{ ...style.background, display: show ? 'flex' : 'none' }}>
      <View style={style.container}>
        <Text>{question}</Text>
        <View style={style.buttonContainer}>
          <TouchableOpacity
            style={style.yesButton}
            onPress={yesHandler}
            activeOpacity={1}
          >
            <Text style={style.yesText}>Sim</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.noButton}
            onPress={noHandler}
            activeOpacity={1}
          >
            <Text style={style.noText}>Não</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}