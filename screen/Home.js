import React, { version } from 'react';
import { Text, View, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native';
import GeneralStatusBarColor from './statusbar';
import {navigationOptions} from 'react-navigation';
import CardScreen from './cardView';

// import * as firebase from 'firebase';
// import {firebaseConfig} from './config';
// firebase.initializeApp(firebaseConfig);





export default class HomeScreen extends React.Component {

  render() {
    return (
      
      <View style={{ flex: 1}}>
        {/* <GeneralStatusBarColor  navigation={this.props.navigation} source ={require('../assets/islamic1.jpg')}   screen='home'  backgroundColor='transparent' /> */}
        <View style ={styles.container} >
           
           <CardScreen navigation={this.props.navigation}/>
          

         </View>
         </View >
         
    )
  }

}
const styles = StyleSheet.create({
  container: {
    flex:1,
   backgroundColor: '#F5F5DC',
    justifyContent: 'center',
  },
  textfeildContainer: {
    width: 300,
    height: 220,
    backgroundColor: '#DB7093',
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: '#D47F7F',
    marginTop: 30,
    },
});









