import React, { Component } from 'react';
import { Text, TextInput, View, FlatList,Image,TouchableOpacity,SafeAreaView,ScrollView,LogBox } from 'react-native';
import StarRating from 'react-native-star-rating'
import { Ionicons } from '@expo/vector-icons';



export default class Sorozatsajat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      komment:'',
      nev:'',
      starCount:0

    };
  }

  componentDidMount(){
    let bemenet1 = {
      bevitel3:this.props.route.params.sorozatid
    }
    fetch('http://172.16.0.16:3000/kommentek', {
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

      fetch('http://172.16.0.16:3000/sorozatkep', {
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

      fetch('http://172.16.0.16:3000/atlagertek', {
      method: "POST",
      body: JSON.stringify(bemenet1),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      } )
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource3: responseJson,
        }, function(){

        });
      })
      .catch((error) =>{
        console.error(error);
      });

      LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }


  felvitel=async()=>{
    let bemenet={
      bevitel1:this.state.nev,
      bevitel2:this.state.komment,
      bevitel3:this.props.route.params.sorozatid

    }
    fetch('http://172.16.0.16:3000/kommentfelvitel', {
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
        bevitel3:this.props.route.params.sorozatid
      }
      fetch('http://172.16.0.16:3000/kommentek', {
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

  onStarRatingPress = async(ertek) => {
    this.setState({starCount: ertek})
    let bemenet = {
      bevitel1:ertek,
      bevitel2:this.props.route.params.sorozatid

    }
    fetch('http://172.16.0.16:3000/ertekeles', {
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

      let bemenet1 = {
        bevitel3:this.props.route.params.sorozatid
      }
      fetch('http://172.16.0.16:3000/atlagertek', {
      method: "POST",
      body: JSON.stringify(bemenet1),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      } )
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource3: responseJson,
        }, function(){

        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }
  


  render() {

    const {sorozatnev,sorozatid,sorozatleiras,sorozatev,sorozatido,sorozatevad,sorozatepizod,sorozatmufaj} = this.props.route.params

    return (
      <SafeAreaView style={{backgroundColor:"#262626",flex:1}}>
        <ScrollView nestedScrollEnabled={true}>
        <View style={{marginTop:10,marginLeft:145, flexDirection:"row"}}>
          <Ionicons name='star' size={30} color={'gold'}></Ionicons>
          <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={this.state.dataSource3}
          keyExtractor={({ertekeles_id}) => ertekeles_id} 
          renderItem={({item}) =>
          <View>
            <Text style={{fontSize:28,color:"white"}}>{item.atlag}</Text>
          </View>
          }
          />

        </View>
          <View style={{alignItems:"center",marginTop:10}}>
          <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          data={this.state.dataSource2}
          keyExtractor={({sorozat_id}) => sorozat_id} 
          renderItem={({item}) =>
          <Image 
          source={{uri:'http://172.16.0.16:3000/'+item.sorozat_kep}}
          style={{width:200,height:300,borderRadius:5}}
          />
          }
          />
        </View>
          
        <View>
            <Text style={{color:"white",fontSize:25,fontWeight:"bold",textAlign:"center"}}>{sorozatnev}</Text>
        </View>

        <View style={{borderWidth:1,borderColor:"white",marginTop:8,marginBottom:8}}>
            <Text style={{fontSize:20,color:"white",textAlign:"center",paddingTop:6}}>Értékeld a sorozatot!</Text>
            <StarRating
            disabled={false}
            containerStyle={{paddingBottom:10,paddingTop:3}}
            emptyStar={'star-border'}
            emptyStarColor='white'
            fullStar={'star'}
            iconSet={'MaterialIcons'}
            maxStars={10}
            starSize={36}
            rating={this.state.starCount}
            selectedStar={(ertek) => this.onStarRatingPress(ertek)}
            fullStarColor='white'
            />
          </View>

        <View style={{padding:10}}>
          <Text style={{fontSize:22,color:"#2596be",fontWeight:"bold"}}>Leírás:</Text>
          <Text style={{fontSize:15,color:"white",padding:2}}>{sorozatleiras}</Text>
          <Text style={{fontSize:22,color:"#2596be",fontWeight:"bold",marginTop:2}}>További infók:</Text>
          <Text>
            <Text style={{fontSize:16,color:"white",fontWeight:"bold"}}>Műfaj: </Text>
            <Text style={{fontSize:16,color:"white"}}>{sorozatmufaj}</Text>
          </Text>
          <Text>
            <Text style={{fontSize:16,color:"white",fontWeight:"bold"}}>Eredeti sugárzás: </Text>
            <Text style={{fontSize:16,color:"white"}}>{sorozatev}</Text>
          </Text>
          <Text>
            <Text style={{fontSize:16,color:"white",fontWeight:"bold"}}>Évadok száma: </Text>
            <Text style={{fontSize:16,color:"white"}}>{sorozatevad}</Text>
          </Text>
          <Text>
            <Text style={{fontSize:16,color:"white",fontWeight:"bold"}}>Epizódok száma: </Text>
            <Text style={{fontSize:16,color:"white"}}>{sorozatepizod}</Text>
          </Text>
          <Text>
            <Text style={{fontSize:16,color:"white",fontWeight:"bold"}}>Részenkénti idő: </Text>
            <Text style={{fontSize:16,color:"white"}}>{sorozatido} perc</Text>
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
          style={{borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderRadius:15,borderColor:"transparent",color:"black",width:300,height:50,marginLeft:30}}
          onChangeText={(komment) => this.setState({komment})}
          value={this.state.komment}
          multiline={true}
          placeholder='Hozzászólás irása'
        />

        <TouchableOpacity 
        style={{borderWidth:1,width:100,alignSelf:"center",borderColor:"transparent",borderRadius:6,padding:2,backgroundColor:"grey",marginBottom:10}}
        onPress={async()=> this.felvitel()}
        >
          <Text style={{textAlign:"center",fontSize:19,color:"white"}}>Mehet</Text>
        </TouchableOpacity>
        
          <FlatList
            data={this.state.dataSource}
            keyExtractor={({komment_id}) => komment_id} 
            renderItem={({item}) =>
            <View style={{borderWidth:1,width:150,borderColor:"transparent",borderRadius:10,padding:8,backgroundColor:"lightgrey",margin:7,marginLeft:15}}>
            <Text style={{color:"black",fontWeight:"bold",fontSize:15}}>{item.komment_nev}</Text>
            <Text style={{fontSize:17}}>{item.komment_szoveg}</Text>
              
            </View>
          }
          />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}