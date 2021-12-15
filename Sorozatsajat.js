import { NavigationContainer,DrawerActions } from '@react-navigation/native';
import React, { Component } from 'react';
import { Text, TextInput, View, FlatList,Image,TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating'

export default class Sorozatsajat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aktfilm:1,
      komment:''

    };
  }

  componentDidMount(){
    return fetch('http://172.16.0.24:3000/kommentek')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });
      })
      .catch((error) =>{
        console.error(error);
      });
      
  }


  felvitel=async()=>{
    //alert("Megnyomva")
    let bemenet={
      bevitel1:this.state.komment,
      bevitel2:this.props.route.params.sorozatid

    }
    fetch('http://172.16.0.24:3000/kommentfelvitel', {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      } )
      .then((response) => response.text())
      .then(() => {

      })
      .catch((error) =>{
        console.error(error);
      });

      this.setState({komment:""})

      
  }


  render() {
    return (
      <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
        <Text style={{fontSize:30}} >{this.props.route.params.sorozatnev}</Text>
        <Text style={{fontSize:30}} >{this.props.route.params.sorozatid}</Text>
        <Text>{this.props.route.params.sorozatleiras}</Text>
        <TextInput
          style={{height: 100,borderWidth:1,padding:5,width:250,alignSelf:"center",margin:10,color:"white",textAlignVertical:"top",backgroundColor:"lightblue",borderRadius:6,borderColor:"transparent",color:"black"}}
          onChangeText={(komment) => this.setState({komment})}
          value={this.state.komment}
          multiline={true}
        />

        <TouchableOpacity 
        style={{marginTop:8,borderWidth:1,width:150,alignSelf:"center",borderColor:"transparent",backgroundColor:"#C3D7BC",borderRadius:3}}
        onPress={async()=> this.felvitel()}
        >
          <Text style={{textAlign:"center",fontSize:23,color:"white",borderRadius:5}}>Felvitel</Text>
        </TouchableOpacity>
        
          <FlatList
            data={this.state.dataSource}
            keyExtractor={({komment_id}) => komment_id} 
            renderItem={({item}) =>
            <View>
            <Text>{item.komment_szoveg}</Text>
              
            </View>
          }
          />

        
      </View>
    );
  }
}