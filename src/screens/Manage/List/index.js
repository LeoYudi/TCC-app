import { StatusBar } from "expo-status-bar";
import { View, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';

import AlertModal from '../../../components/AlertModal';
import Loading from '../../../components/Loading';
import Modal from '../../../components/Modal';
import RecordItem from '../../../components/RecordItem';

import { get, remove } from '../../../services/api';

import { parseDate } from '../../../utils/date';

import style from './style';

export default function List({ navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [apiResponse, setApiResponse] = useState('');
  const [records, setRecords] = useState([]);
  const [recordClicked, setRecordClicked] = useState(null);

  const getRecords = async () => {
    const response = await get('/records');
    setRecords(response);
  }

  useEffect(() => {
    getRecords();

    return () => {
      setLoading(false);
      setShowAlert(false);
      setShowConfirmation(false);
    }
  }, [])

  return (
    <>
      <View style={style.listContainer}>
        <ScrollView style={style.scrollView}>
          {records.map((record, index, array) =>
            <RecordItem
              key={index}
              description={record.description}
              date={parseDate(record.created_at)}
              isLast={true}
              removeHandler={() => {
                setRecordClicked(index);
                setShowConfirmation(true);
              }}
              viewHandler={() => {
                navigation.navigate('manage/list/record', { id: record._id })
              }}
            />
          )}
        </ScrollView>
      </View>
      <Loading show={isLoading} />
      <Modal
        show={showConfirmation}
        question='Tem certeza que quer deletar esta gravação (isto também deletará todos os registros de sensor) ?'
        yesHandler={async () => {
          setShowConfirmation(false);
          setLoading(true);

          const response = await remove(`/records/${records[recordClicked]._id}`);
          if (response.error)
            setApiResponse(response.error);
          else
            setApiResponse(response.msg);

          records.splice(recordClicked, 1);
          setRecords([...records]);

          setLoading(false);
          setShowAlert(true);
        }}
        noHandler={() => { setShowConfirmation(false) }}
      />
      <AlertModal
        show={showAlert}
        text={apiResponse}
        onPress={() => {
          setShowAlert(false)
        }}
      />
      <StatusBar style="auto" />
    </>
  )
}
