import React from 'react';
import { FlatList, ActivityIndicator, Text, View,Image,Button,TouchableOpacity,Modal,Pressable,StyleSheet  } from 'react-native';


export default class Sorozat2 extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      
    }
  }

  
  componentDidMount(){
    return fetch('http://172.16.0.24:3000/sorozat')
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
  render(){
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return(
      <View style={{flex:1, paddingTop:20,backgroundColor:"#31364b",justifyContent:"center",alignItems:"center"}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={this.state.dataSource}
          keyExtractor={({sorozat_id}) => sorozat_id} 
          renderItem={({item}) =>
          <View>
            <TouchableOpacity onPress={async()=>this.props.navigation.navigate('Sorozatsajat',
            {sorozatnev:item.sorozat_cim,
            sorozathossz:item.sorozat_hossz,
            sorozatid:item.sorozat_id})}>
            <Image 
            source={{uri:'http://172.16.0.24:3000/'+item.sorozat_kep}}
            style={{width:150,height:230,marginRight:10,marginTop:10,marginLeft:10,borderRadius:15}}
            />
            <Text style={{color:"white",marginLeft:15,marginTop:5,fontSize:16,fontWeight:"bold",width:155}}>{item.sorozat_cim}</Text>
            <Text style={{color:"white",marginLeft:15,marginTop:5,fontSize:12,width:50,borderWidth:1,borderRadius:5,borderColor:"white",textAlign:"center"}}>{item.mufaj_nev}</Text>
            </TouchableOpacity>
            
          </View>
        }
        />

      </View>
    );
  }
}
