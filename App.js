import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Ajanlas from './Ajanlas.js';
import SorozatMain from './SorozatMain.js';
import Komment from './Komment.js';

function Ajanlas_oldal({ navigation }) {
  return (
    <Ajanlas/>
  );
}
function Sorozat_Main({ navigation }) {
  return (
    <SorozatMain/>
  );
}
function Komment_oldal({ navigation }) {
  return (
    <Komment/>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Sorozat">
        <Drawer.Screen name="Sorozat" component={Sorozat_Main}  options={{
          headerStyle: {
            backgroundColor: '#aeaeb6'}}}
           />
        <Drawer.Screen name="Ajánlás" component={Ajanlas_oldal} />
        <Drawer.Screen name="Komment" component={Komment_oldal} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
