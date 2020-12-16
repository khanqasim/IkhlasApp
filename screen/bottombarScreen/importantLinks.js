import React, { version } from 'react';
import { Text, View, Image, TextInput, StyleSheet, ScrollView,Linking } from 'react-native';
import { Fab } from 'native-base';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

export default class ImportantLinksScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      myData :[
        {
          id: 1,
          text: 'https://www.tazkia.org ',
          },
        {
          id: 2,
          text: 'https://www.khanqah.org',
        },
        {
          id:3,
          text: 'http://www.darwaish.org/',
        },
        { id: 4, text: 'https://muftitaqiusmani.com/', 
         },
       
      ],
    }
  }

    render() {
      return (
        
        <View style={{flex: 1,backgroundColor:'#f6f6f6',justifyContent:'center' }}>
          {/* <GeneralStatusBarColor  navigation={this.props.navigation} source ={require('../assets/islamic1.jpg')}   screen='home'  backgroundColor='transparent' /> */}
          <View style={{ flex:.9, width: '98%', backgroundColor: '#ffff', borderRadius: 12, alignSelf: 'center',shadowOpacity:0.30,shadowRadius:3,elevation:3 }} >
            <Text style={{alignSelf:'center',marginTop:8,fontSize:20,color:'#827ca0',fontFamily:'B'}}>اہم لنکس </Text>
            <FlatList
            data={this.state.myData}
            renderItem={({item,index }) =>
            <View style={{width:'95%',height:50, marginTop: 10, borderRadius: 10, alignSelf: 'center', backgroundColor:'#ffff', flexDirection: 'row',justifyContent:'center',shadowOpacity:0.20,shadowRadius:2,elevation:3,bottom:5 }}>
              {/* <View style={{width: 10,height:10, backgroundColor:'#7b759a',borderRadius:100, justifyContent: 'center', flexDirection: 'row',alignSelf:'flex-start',marginRight:8}}>
                
                </View> */}
              <TouchableOpacity
              onPress={ ()=> Linking.openURL(item.text) }
              >
              <Text style={{alignSelf:'center',fontFamily:'B'}}>{item.text}</Text>
              </TouchableOpacity>
              {/* <Text style={{alignSelf:'center',fontFamily:'B'}}>{item.text}</Text> */}
              
            </View>

            }
          />
          </View>
          </View >
           
      )
    }
}