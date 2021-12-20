import * as React from 'react';
import {View,Icon,Text} from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons,MaterialCommunityIcons } from "@expo/vector-icons";
import Sorozat from './Sorozat.js'
import Sorozatsajat from './Sorozatsajat.js'
import Ajanlas from './Ajanlas'
import Header from './header.js'
import Komment from './Komment.js'



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const BottomTab = createMaterialBottomTabNavigator();

export default class App extends React.Component{
  constructor(props) {
    super(props);
  }
  createSorozatStack = () =>
  <Stack.Navigator screenOptions={{
    headerStyle:{backgroundColor:"#2596be"}
    }} >
    <Stack.Screen
    name="Sorozat"
    component={Sorozat}
    options={{
    headerTitle:()=><Header/>
  }
}
    />
    <Stack.Screen name='Sorozatsajat' component={Sorozatsajat} options={{headerTitle:""}}/>
  </Stack.Navigator>

  createFilmekStack = () =>
  <Stack.Navigator screenOptions={{
    headerStyle:{backgroundColor:"#2596be"}
    }} >
    <Stack.Screen
    name="Filmek"
    component={Komment}
    />
  </Stack.Navigator>

  createAjanlasStack = () =>
  <Stack.Navigator screenOptions={{
    headerStyle:{backgroundColor:"#2596be"}
    }} >
    <Stack.Screen
    name="Ajanlas"
    component={Ajanlas}
    />
  </Stack.Navigator>

  render(){

    return(
      <NavigationContainer>
        <BottomTab.Navigator barStyle={{backgroundColor:"gray"}}>
          <BottomTab.Screen name="Sorozatok" component={this.createSorozatStack} options={{
            tabBarIcon: ({focused}) => 
            (<View>
              <Ionicons name={focused ? 'tv-sharp': 'tv-outline'} size={25} ></Ionicons>
            </View>)
          }}/>
          <BottomTab.Screen name="Film" component={this.createFilmekStack} options={{
            tabBarIcon: ({focused}) => 
            (<View>
              <MaterialCommunityIcons name={focused ? 'movie-open': 'movie-open-outline'} size={25} ></MaterialCommunityIcons>
            </View>)
          }}/>
          <BottomTab.Screen name="Ajanlo" component={this.createAjanlasStack}/>
        </BottomTab.Navigator>
      </NavigationContainer>

    );
  }
}