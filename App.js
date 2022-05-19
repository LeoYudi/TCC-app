import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screens/Home';
import Record from './src/screens/Record';
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
        </Navigator>
      </NavigationContainer>
    </RecordContextProvider>
  );
}
