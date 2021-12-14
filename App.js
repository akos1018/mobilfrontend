import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator, CreateStackNavigator } from '@react-navigation/stack';
import Sorozat2 from './Sorozat2.js'
import Sorozatsajat from './Sorozatsajat.js'
import Ajanlas from './Ajanlas'
import Header from './header.js'


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default class App extends React.Component{
  constructor(props) {
    super(props);
  }
  createHomeStack = () =>
  <Stack.Navigator screenOptions={{
    headerStyle:{backgroundColor:"#31364b"},
    
    }} >
    <Stack.Screen
    name="Sorozatok"
    component={Sorozat2}
    options={{
    headerTitle:()=><Header/>
  }}
    />
    <Stack.Screen name='Sorozatsajat' component={Sorozatsajat} options={({route}) => ({title: route.params.sorozatnev })}/>
  </Stack.Navigator>


  render(){

    return(
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='Sorozat' >
          <Drawer.Screen name="Sorozat" children={this.createHomeStack} options={{headerShown:false}}  />
          <Drawer.Screen name="Ajánlás" component={Ajanlas}/>
        </Drawer.Navigator>
      </NavigationContainer>

    );
  }
}