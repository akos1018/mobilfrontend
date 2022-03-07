import React, { Component } from 'react';
import { Text, TextInput, View,StyleSheet,TouchableOpacity, Touchable } from 'react-native';

const ipcim = '172.16.0.12:3000'
export default class Bevitel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      szoveg: ''
    };
  }

  felvitel=async()=>{
    //alert("Megnyomva")
    let bemenet={
      bevitel1:this.state.szoveg,

    }
    fetch('http://'+ipcim+'/ajanlas', {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      } )
      .then((response) => response.text())
      .then((text) => {

      })
      .catch((error) =>{
        console.error(error);
      });

      this.setState({szoveg:""})
  }

  render() {
    return (
      <View style={{backgroundColor:"#262626",flex:1,alignItems:"center",paddingTop:40}}>
        <Text style={{padding: 5,textAlign:"center",color:"white",fontSize:21,fontWeight:"bold",marginBottom:10}}>
          Ha van egy film amit szeretnél látni de nem szerepel az alkalmazásban itt lehetőséged van nekünk ajánlani
          </Text>
        <TextInput
          style={{borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderRadius:15,borderColor:"transparent",color:"black",width:300,height:100,fontSize:25}}
          onChangeText={(szoveg) => this.setState({szoveg})}
          value={this.state.szoveg}
          multiline={true}
        />

        <TouchableOpacity 
        style={{marginTop:8,borderWidth:1,width:150,height:40,alignSelf:"center",borderColor:"transparent",backgroundColor:"#2596be",borderRadius:3,paddingTop:3}}
        onPress={async()=> this.felvitel()}
        >
          <Text style={{textAlign:"center",fontSize:23,color:"white",borderRadius:5}}>Mehet</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
