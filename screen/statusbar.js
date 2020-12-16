import React from 'react';
import { View, StatusBar,StyleSheet,ImageBackground,TouchableOpacity,Text,styles,Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const GeneralStatusBarColor = ({ navigation,source,backgroundColor,screen,Hellow, ...props }) => (
   
    <View style={ { backgroundColor:'#FF5733',flex:.2 }}>
       {/* <Image source={require('../assets/islamic1.jpg')} 
      style={{flex:1}}  
      /> */}
      <StatusBar translucent backgroundColor={backgroundColor} screen  {...props} barStyle = 'light-content'  />
        <ImageBackground style={{flex:1}} {...props} source={source}>
        <View style={{height:40,width:'90%',marginTop:40,justifyContent:'flex-start',alignItems:'center',flexDirection:'row'}}>
                <TouchableOpacity
                 
                onPress = {()=>navigation.toggleDrawer()}>
                    {/* {screen === 'home' ? null:<Ionicons name ='ios-arrow-round-back'  size={40}  style={{marginLeft:20}} color='#7FFFD4'/> } */}
                    
                    <Ionicons name = "menu-outline" size = {40} style={{color:'#ffff'}}/>
                

                </TouchableOpacity>
        
    </View>
            

        </ImageBackground>
        
        
        
        
    {/* <View style ={{flex:1,backgroundColor:'#FF7F50'}}></View>  */}
    </View>
    );
    export default GeneralStatusBarColor;