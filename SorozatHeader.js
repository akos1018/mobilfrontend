import React from 'react';
import {StyleSheet, Text, View} from 'react-native';


export default class Header extends React.Component{
    constructor(props) {
        super(props);
      }

    render(){
        return(
            <View style={{justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
                <View>
                    <Text style={{fontWeight:"bold",color:"white",letterSpacing:1,fontSize:25}}>Sorozat</Text>
                </View>
            </View>
        );
    }
}