import { View, Text } from 'react-native';

import Button from '../CustomButton';

import style from './style';

export default function AlertModal({ text, show, onPress }) {

  return (
    <View style={{ ...style.background, display: show ? 'flex' : 'none' }}>
      <View style={style.container}>

        <Text style={style.text}>{text}</Text>

        <View style={style.buttonContainer}>

          <View>
            <Button
              text={'Ok'}
              onPress={onPress}
              primary={true}
              fontSize={15}
            />
          </View>

        </View>
      </View>
    </View>
  );
}