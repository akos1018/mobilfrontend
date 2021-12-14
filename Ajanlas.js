import React, { Component } from 'react';
import { Text, TextInput, View,StyleSheet,TouchableOpacity, Touchable } from 'react-native';

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
    fetch('http://192.168.1.128:3000/ajanlas', {
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
      <View style={{padding: 10,margin:15,borderWidth:1,borderRadius:10,height:300,backgroundColor:"#1E5162",borderColor:"transparent",width:300,marginLeft:"auto",marginRight:"auto"}}>
        <Text style={{padding: 5,textAlign:"center",color:"white",fontSize:21}}>
          Ajánlj nekünk filmeket
          </Text>
        <TextInput
          style={{height: 100,borderWidth:1,padding:5,width:250,alignSelf:"center",margin:10,color:"white",textAlignVertical:"top",backgroundColor:"lightblue",borderRadius:6,borderColor:"transparent",color:"black"}}
          onChangeText={(szoveg) => this.setState({szoveg})}
          value={this.state.szoveg}
          multiline={true}
        />

        <TouchableOpacity 
        style={{marginTop:8,borderWidth:1,width:150,alignSelf:"center",borderColor:"transparent",backgroundColor:"#C3D7BC",borderRadius:3}}
        onPress={async()=> this.felvitel()}
        >
          <Text style={{textAlign:"center",fontSize:23,color:"white",borderRadius:5}}>Felvitel</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
