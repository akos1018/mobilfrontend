import * as React from 'react';
import {View} from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons,MaterialCommunityIcons,MaterialIcons } from "@expo/vector-icons";
import Sorozat from './Sorozat.js'
import Sorozatsajat from './Sorozatsajat.js'
import Ajanlas from './Ajanlas'
import SorozatHeader from './SorozatHeader.js'
import FilmHeader from './FilmHeader.js'
import HomeHeader from './HomeHeader.js'
import AjanlasHeader from './AjanlasHeader.js'
import Film from './Film.js'
import Filmsajat from './Filmsajat.js'

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
    name="Sorozatok"
    component={Sorozat}
    options={{
    headerTitle:()=><SorozatHeader/>
  }
}
    />
    <Stack.Screen name='Sorozatsajat' component={Sorozatsajat} options={({ route }) => ({ title: route.params.sorozatnev })}/>
  </Stack.Navigator>

  createFilmekStack = () =>
  <Stack.Navigator screenOptions={{
    headerStyle:{backgroundColor:"#2596be"}
    }} >
    <Stack.Screen
    name="Filmek"
    component={Film}
    options={{
      headerTitle:()=><FilmHeader/>
    }
  } 
    />
    <Stack.Screen name='Filmsajat' component={Filmsajat} options={({ route }) => ({ title: route.params.filmnev })}/>
  </Stack.Navigator>

  createAjanlasStack = () =>
  <Stack.Navigator screenOptions={{
    headerStyle:{backgroundColor:"#2596be"}
    }} >
    <Stack.Screen
    name="Ajanlas"
    component={Ajanlas}
    options={{
      headerTitle:()=><AjanlasHeader/>
    }
  }
    />
  </Stack.Navigator>

  render(){

    return(
      <NavigationContainer>
        <BottomTab.Navigator barStyle={{backgroundColor:"white"}}>
        <BottomTab.Screen name="Home" component={this.createAjanlasStack} options={{
            tabBarIcon: ({focused}) => 
            (<View>
              <Ionicons name={focused ? 'home-sharp': 'home-outline'} size={25} ></Ionicons>
            </View>)
          }}/>
          <BottomTab.Screen name="Sorozat" component={this.createSorozatStack} options={{
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
          <BottomTab.Screen name="Ajanlo" component={this.createAjanlasStack} options={{
            tabBarIcon: () => 
            (<View>
              <MaterialIcons name={'recommend'} size={25} ></MaterialIcons>
            </View>)
          }}/>
        </BottomTab.Navigator>
      </NavigationContainer>

    );
  }
}