import { useState, useEffect } from 'react';
import { ScrollView, Text } from 'react-native';

import Loading from '../../../components/Loading';

import { getFileByName } from '../../../services/file';

import style from './style';

export default function ShowFile({ navigation, route }) {
  const [isLoading, setLoading] = useState(false);
  const [fileContent, setFileContent] = useState('');

  const init = async (filename) => {
    setLoading(true);
    setFileContent(await getFileByName(filename));
    setLoading(false);
  }

  useEffect(() => {
    const { filename } = route.params;
    navigation.setOptions({ title: filename });

    init(filename);

    return () => { setLoading(false); }
  }, []);

  return (
    <>
      <ScrollView style={style.container}>
        <Text style={style.fileContent}>{fileContent}</Text>
      </ScrollView>
      <Loading show={isLoading} />
    </>
  );
}