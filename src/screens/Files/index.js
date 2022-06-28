import { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';

import { getFilesName } from '../../services/file';

import style from './style';

export default function Files({ navigation }) {
  const [filenames, setFilenames] = useState([]);

  useEffect(() => {
    init();
  }, [])

  const init = async () => {
    const names = await getFilesName();
    setFilenames(names);
  }

  return (
    <View style={style.listContainer}>
      <ScrollView style={style.scrollView}>
        {filenames.map((name, index, array) =>
          <TouchableOpacity
            key={index}
            style={style.item}
            onPress={() => { navigation.navigate('files/showFile', { filename: name }) }}
          >
            <Text style={style.itemText}>{name}</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}
