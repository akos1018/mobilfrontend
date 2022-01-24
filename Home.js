import React from 'react';
import { FlatList, ActivityIndicator, Text, View,Image, TouchableOpacity,Dimensions,ScrollView  } from 'react-native';




var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

const ipcim = "172.16.0.16:3000"

 

export default class Kezdooldal extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      dataSource:[],
      dataSource2:[],
      dataSource3:[],
      kepek:[]
    }
    
    setInterval(()=>{
      
      fetch('http://'+ipcim+'/legjobbfilmek')
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

      fetch('http://'+ipcim+'/legjobbsorozatok')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource2: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      })

     
    }
    ,2000)
  }
  

  componentDidMount(){

  fetch('http://'+ipcim+'/legjobbfilmek')
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

      fetch('http://'+ipcim+'/legjobbsorozatok')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource2: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });

      fetch('http://'+ipcim+'/legujabbsorozat')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource3: responseJson,
          kepek: responseJson
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
      <ScrollView style={{flex:1,backgroundColor:"#262626"}}>
      <View style={{height:height*0.4}}>
        <Text style={{color:'white', fontSize:20, textAlign:'center', fontWeight:'bold',}}>Legjobb sorozatok</Text>
          <FlatList 
            showsHorizontalScrollIndicator={false}
            data={this.state.dataSource2}
            horizontal
            //numColumns={2}
            keyExtractor={({sorozat_id}, index) => sorozat_id}
            renderItem={({item}) =>
              <TouchableOpacity onPress={async()=>this.props.navigation.navigate('Sorozatsajat',{sorozatnev:item.sorozat_cim,
              sorozathossz:item.sorozat_hossz,
              sorozatid:item.sorozat_id,
              sorozatleiras:item.sorozat_leiras,
              sorozatev:item.sorozat_ev,
              sorozatido:item.sorozat_hossz,
              sorozatevad:item.sorozat_evadszam,
              sorozatepizod:item.sorozat_epizodszam
              })}>
              <Image 
              source={{uri:'http://'+ipcim+'/'+item.sorozat_kep}}
              style={{width:120,height:170,margin:5,borderRadius:15}}
              />
              <Text style={{color:"white",fontSize:13,fontWeight:"bold",textAlign:"center", width:135}}>{item.sorozat_cim}</Text>
              </TouchableOpacity>

    
          }
          />
          </View>

        <View style={{height:height*0.35}}>
      <Text style={{color:'white', fontSize:20, textAlign:'center', fontWeight:'bold',paddingBottom:5,}}>Legjobb filmek</Text>

        <FlatList 
          showsHorizontalScrollIndicator={false}
          data={this.state.dataSource}
          horizontal
          keyExtractor={({film_id}, index) => film_id}
          renderItem={({item}) =>
            <TouchableOpacity onPress={async()=>this.props.navigation.navigate('Filmsajat',
            {
            filmid:item.film_id,
            filmnev:item.film_cim,
            filmev:item.film_ev,
            filmhossz:item.film_hossz,
            filmleiras:item.film_leiras
            })}>
            <Image 
            source={{uri:'http://'+ipcim+'/'+item.film_kep}}
            style={{width:120,height:170,margin:5,borderRadius:15}}
            />        
            <Text style={{color:"white",fontSize:13,fontWeight:"bold",textAlign:"center", width:125, alignItems:'center' }}>{item.film_cim}</Text>
            </TouchableOpacity>
  
        }
        />
        </View>
      </ScrollView>
    );
  }
}