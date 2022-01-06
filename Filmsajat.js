import React, { Component } from 'react';
import { Text, TextInput, View, FlatList,Image,TouchableOpacity,SafeAreaView,ScrollView,LogBox } from 'react-native';


export default class Filmsajat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      komment:'',
      nev:''

    };
  }

  componentDidMount(){
    let bemenet1 = {
      bevitel3:this.props.route.params.filmid
    }

    fetch('http://172.16.0.19:3000/filmkommentek', {
      method: "POST",
      body: JSON.stringify(bemenet1),
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
    
      fetch('http://172.16.0.19:3000/filmkep', {
      method: "POST",
      body: JSON.stringify(bemenet1),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      } )
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

      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }

  felvitel=async()=>{
    //alert("Megnyomva")
    let bemenet={
      bevitel1:this.state.nev,
      bevitel2:this.state.komment,
      bevitel3:this.props.route.params.filmid

    }
    fetch('http://172.16.0.19:3000/filmkommentfelvitel', {
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
      this.setState({nev:""})

      let bemenet1 = {
        bevitel3:this.props.route.params.filmid
      }
      fetch('http://172.16.0.19:3000/filmkommentek', {
      method: "POST",
      body: JSON.stringify(bemenet1),
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
  


  
  render() {

    const {filmnev,filmid,filmleiras,filmev,filmhossz} = this.props.route.params

    return (
      <SafeAreaView style={{backgroundColor:"#262626",flex:1}}>
        <ScrollView nestedScrollEnabled={true}>
          <View style={{alignItems:"center",marginTop:10}}>
          <FlatList
          scrollEnabled={false}
          style={{height:300}}
          showsVerticalScrollIndicator={false}
          data={this.state.dataSource2}
          keyExtractor={({film_id}) => film_id} 
          renderItem={({item}) =>
          <Image 
          source={{uri:'http://172.16.0.19:3000/'+item.film_kep}}
          style={{width:200,height:300,borderRadius:5}}
          />
          }
          />
        </View>
        <View>
            <Text style={{color:"white",fontSize:25,fontWeight:"bold",textAlign:"center"}}>{filmnev}</Text>
        </View>

        <View style={{padding:10}}>
          <Text style={{fontSize:22,color:"#2596be",fontWeight:"bold"}}>Leírás:</Text>
          <Text style={{fontSize:15,color:"white",padding:2}}>{filmleiras}</Text>
          <Text style={{fontSize:22,color:"#2596be",fontWeight:"bold",marginTop:2}}>További infók:</Text>
          <Text>
            <Text style={{fontSize:16,color:"white",fontWeight:"bold"}}>Megjelenés dátuma: </Text>
            <Text style={{fontSize:16,color:"white"}}>{filmev}</Text>
          </Text>
          <Text>
            <Text style={{fontSize:16,color:"white",fontWeight:"bold"}}>Hossz: </Text>
            <Text style={{fontSize:16,color:"white"}}>{filmhossz} perc</Text>
          </Text>
          <Text style={{fontSize:22,color:"#2596be",fontWeight:"bold",marginTop:2}}>Kommentek:</Text>
        </View>
        <View>

        <TextInput
          style={{borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderRadius:15,borderColor:"transparent",color:"black",width:100,marginLeft:30}}
          onChangeText={(nev) => this.setState({nev})}
          value={this.state.nev}
          multiline={true}
          placeholder='Név'
        />

        <TextInput
          style={{borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderRadius:15,borderColor:"transparent",color:"black",width:300,marginLeft:30}}
          onChangeText={(komment) => this.setState({komment})}
          value={this.state.komment}
          multiline={true}
          placeholder='Hozzászólás irása'
        />

        <TouchableOpacity 
        style={{borderWidth:1,width:100,alignSelf:"center",borderColor:"transparent",borderRadius:6,padding:2,backgroundColor:"grey",marginBottom:10}}
        onPress={async()=> this.felvitel()}
        >
          <Text style={{textAlign:"center",fontSize:18,color:"white"}}>Mehet</Text>
        </TouchableOpacity>
        
          <FlatList
            data={this.state.dataSource}
            keyExtractor={({film_komment_id}) => film_komment_id} 
            renderItem={({item}) =>
            <View style={{borderWidth:1,width:150,borderColor:"transparent",borderRadius:10,padding:8,backgroundColor:"lightgrey",margin:7,marginLeft:15}}>
            <Text style={{color:"black",fontWeight:"bold",fontSize:17}}>{item.film_komment_nev}</Text>
            <Text>{item.film_komment_szoveg}</Text>
              
            </View>
          }
          />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}