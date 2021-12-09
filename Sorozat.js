import React from 'react';
import { FlatList, ActivityIndicator, Text, View,Image,Button,TouchableOpacity  } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default class Sorozat extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('http://192.168.1.128:3000/sorozat')
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

  megnyomva=async()=>{
    alert("Megnyomtad")
  }




  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return(
      <View style={{flex: 1, paddingTop:20,backgroundColor:"#31364b"}}>
        <FlatList
          horizontal={true}
          data={this.state.dataSource}
          keyExtractor={({sorozat_id}, index) => sorozat_id}
          renderItem={({item}) =>
          <View>
            <TouchableOpacity onPress={async()=> this.megnyomva()}>
            <Image 
            source={{uri:'http://192.168.1.128:3000/'+item.sorozat_kep}}
            style={{width:150,height:230,marginRight:10,marginTop:10,marginLeft:10,borderRadius:15}}
            />
            <Text style={{color:"white",marginLeft:15,marginTop:5,fontSize:16,fontWeight:"bold",width:155}}>{item.sorozat_cim}</Text>
            </TouchableOpacity>
          </View>
        }
        />

        
      </View>
    );
  }
}