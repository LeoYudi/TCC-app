import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screens/Home';
import Record from './src/screens/Record';
import Manage from './src/screens/Manage';
import List from './src/screens/Manage/List';
import VisRecord from './src/screens/Manage/List/Record';
import Files from './src/screens/Files';
import ShowFile from './src/screens/Files/ShowFile';

import { RecordContextProvider } from './src/contexts/Record';

export default function App() {
  const { Navigator, Screen } = createNativeStackNavigator();

  const headerConfig = {
    headerStyle: { backgroundColor: '#232F34' },
    headerTitleAlign: 'center',
    headerTintColor: 'white',
    headerTitleStyle: { fontWeight: 'bold' }
  }

  return (
    <RecordContextProvider>
      <NavigationContainer>
        <Navigator screenOptions={headerConfig}>
          <Screen name='home' component={Home} options={{ title: 'TCC - Sensores Android' }} />
          <Screen name='record' component={Record} options={{ title: 'Gravar sensores' }} />
          <Screen name='manage' component={Manage} options={{ title: 'Gerenciamento' }} />
          <Screen name='manage/list' component={List} options={{ title: 'Gravações' }} />
          <Screen name='manage/list/record' component={VisRecord} options={{ title: '' }} />
          <Screen name='files' component={Files} options={{ title: 'Arquivos' }} />
          <Screen name='files/showFile' component={ShowFile} options={{ title: '' }} />
        </Navigator>
      </NavigationContainer>
    </RecordContextProvider>
  );
}
