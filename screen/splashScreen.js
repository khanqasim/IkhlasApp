import React, { Component } from 'react';
import { View, StyleSheet,Text,ImageBackground} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

var backgroundimage = require('../assets/imag1.jpeg')

export default class SplashScreen extends React.Component {
    constructor(props){
        super(props),
        setTimeout(()=>{
            this.props.navigation.navigate("Homescreen");
        },4000)
    }
    render(){
        return(
            <ImageBackground style={styles.imagebackgroid} source={backgroundimage}>
                
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Homescreen')}>
                <Text style ={{alignSelf:'center',color:'#ffff',fontSize:20,padding:20,marginTop:300}}>
                    Skip...
                </Text>
                </TouchableOpacity>
                

            </ImageBackground>
        )
    }

}
const styles = StyleSheet.create({
    imagebackgroid:{
        flex:1,
        justifyContent:'center'
    }
}
)