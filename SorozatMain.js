import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Sorozat from './Sorozat.js'



function Sorozatfooldal({ navigation }) {
  return (
    <Sorozat
    />
  );
}

function DetailsScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Sorozatfooldal')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (

      <Stack.Navigator initialRouteName="Details">
        <Stack.Screen name="Details" component={DetailsScreen}  />
        <Stack.Screen name="Sorozatfooldal" component={Sorozatfooldal} options={{headerShown:false}} />
      </Stack.Navigator>
  );
}

export default App;
