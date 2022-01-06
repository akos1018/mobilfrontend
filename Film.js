import React from 'react';
import { FlatList, ActivityIndicator, Text, View,Image,Button,TouchableOpacity,Modal,Pressable,StyleSheet,TextInput  } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";


export default class Sorozat extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      cim:'',
      aktmufaj:1
      
    }
  }

  
  componentDidMount(){
     fetch('http://172.16.0.19:3000/film')
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

      fetch('http://172.16.0.19:3000/filmmufaj')
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
      
      
  }

  kereses=async () =>{
    let bemenet ={
      bevitel1:this.state.cim,


    }
    fetch('http://172.16.0.19:3000/filmkereses', {
     method: "POST",
     body: JSON.stringify(bemenet),
     headers: {"Content-type": "application/json; charset=UTF-8"}
   }
   )
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

   kivalaszt = async(szam)=>{
    //alert(szam)
    this.setState({aktmufaj:szam})
    let bemenet={
      bevitel2:szam
    }
    return fetch('http://172.16.0.11:3000/filmszures', {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      } )
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

  osszes= async() =>
  {
    fetch('http://172.16.0.19:3000/film')
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
      <View style={{flex:1,paddingTop:20,backgroundColor:"#262626",justifyContent:"center",alignItems:"center",paddingBottom:10,overflow:'hidden'}}>
        <View style={{flexDirection:'row'}}>
        <TextInput
        placeholderTextColor="black"
        style={{height: 45,backgroundColor:"#DCDCDC", borderRadius:10, padding:10, width:240,margin:20,marginRight:10, textAlign:"center", }}
        placeholder="Keresés"
        onChangeText={(cim) => this.setState({cim})}
        value={this.state.cim}
        />

        <TouchableOpacity 
          onPress={async ()=>this.kereses()}>
          <View style={{width:45,height:50,backgroundColor:"#2596be", borderRadius:10,padding:5,marginTop:20, height:45,marginRight:20}}>
        
            <MaterialIcons name='search' size={35}/>
          </View>
        </TouchableOpacity>
        </View>
        
        <View style={{height:50, marginBottom:10,flexDirection:'row', }}>

  <TouchableOpacity
      style={{borderWidth:1,borderRadius:10,width:80,height:30,margin:5,width:100, backgroundColor:"#2596be",marginLeft:16}}
      onPress={async ()=>this.osszes()}
      >
    <Text style={{textAlign:"center",fontSize:15,color:"white", paddingTop:3,}}>Összes</Text>
    </TouchableOpacity>

  <FlatList
    data={this.state.dataSource2}
    horizontal
    showsHorizontalScrollIndicator={false}
    style={{marginRight:17, marginLeft:10}}
    renderItem={({item}) => 
    <View style={{alignItems:"center",marginTop:10,flexDirection:'row',marginBottom:19 }}>
    
      <TouchableOpacity
      style={{borderWidth:1,borderRadius:10,width:100,height:27,margin:5,backgroundColor:"#262626", borderColor:"white", }}
      onPress={async ()=>this.kivalaszt(item.mufaj_id)}
      >
      
    
    <Text style={{textAlign:"center",fontSize:15,color:"white", marginTop:1}}>{item.mufaj_nev} </Text>
    </TouchableOpacity>
    </View>

  }
    keyExtractor={({mufaj_id}, index) => mufaj_id}
  />


  </View>      

        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={this.state.dataSource}
          keyExtractor={({film_id}) => film_id} 
          renderItem={({item}) =>
          <View>
            <TouchableOpacity onPress={async()=>this.props.navigation.navigate('Filmsajat',{filmnev:item.film_cim,
            filmhossz:item.film_hossz,
            filmid:item.film_id,
            filmleiras:item.film_leiras,
            filmev:item.film_ev,
            filmido:item.film_hossz,
            })}>
            <Image 
            source={{uri:'http://172.16.0.19:3000/'+item.film_kep}}
            style={{width:150,height:230,marginRight:10,marginTop:10,marginLeft:10,borderRadius:15}}
            />
            <Text style={{color:"white",marginLeft:15,marginTop:5,fontSize:16,fontWeight:"bold",width:155}}>{item.film_cim}</Text>
            <Text style={{color:"white",marginLeft:15,marginTop:5,fontSize:12,width:50,borderWidth:1,borderRadius:5,borderColor:"white",textAlign:"center"}}>{item.mufaj_nev}</Text>
            </TouchableOpacity>
            
          </View>
        }
        />

      </View>

    );
  }
}