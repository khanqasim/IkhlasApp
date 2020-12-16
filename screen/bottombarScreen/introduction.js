import React, { Component } from 'react';
import { Text, View, Image, TextInput, StyleSheet, ScrollView, FlatList, ActivityIndicator, } from 'react-native';
import WebView from 'react-native-webview';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HTML from "react-native-render-html";
import { ThemeContext } from '../AppContext';

export default class IntroDuctionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myTexData: [],
      context: null,
      loading: true,
    }
  }
  
 
  componentDidMount() {

    fetch("http://ikhlas.info/api/introduction", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    })

      .then(response => response.json())
      .then(responseJson => {


        this.setState({
          myTexData: responseJson.data, loading: false,

        })


      })
      .catch(error => {
        console.log(error);
      });

  }
  setContext = (context) => {
    this.state.context = context
    return null
  }

  render() {

    return (

      <ThemeContext.Consumer>
        {(context) =>

          <View style={{ flex: 1, backgroundColor: '#f6f6f6', justifyContent: 'center' }}>
            {this.setContext()}
            {/* <GeneralStatusBarColor  navigation={this.props.navigation} source ={require('../assets/islamic1.jpg')}   screen='home'  backgroundColor='transparent' /> */}
            {this.state.loading ? <ActivityIndicator size="small" color="#0000ff" /> :
              <View style={{ flex: .9, width: '95%', backgroundColor: '#ffff', borderRadius: 12, alignSelf: 'center', shadowOpacity: 0.30, shadowRadius: 3, elevation: 5 }} >
                <View style={{ height: 40, width: '100%', backgroundColor: 'transparant', alignSelf: 'flex-end', flexDirection: 'row', justifyContent: 'center' }}>
                  <Text style={{ alignSelf: 'center', fontSize: context.provider.state.langselect ? 25 : 15, color: '#7c769c', marginLeft: context.provider.state.langselect ? 22 : 2, fontFamily: 'B' }}>{context.provider.state.langselect ? "تعارف" : "Introduction"}  </Text>
                </View>
                <View style={{ width: '90%', flex: 1, backgroundColor: 'transparant', alignSelf: 'center' }}>
                  <FlatList
                    data={this.state.myTexData}
                    renderItem={({ item }) =>
            
                               
                      // {this.state.loading? <View style ={{flex:1,justifyContent:'center'}}> <ActivityIndicator size="small" color="#0000ff"/></View> :
                      <View style={{ flex: 1 }}>

                       
                      
                        <HTML html={context.provider.state.langselect ? item.ur_career.replace(/<\/?[^>]+(>|$)/g, "") : item.en_career} 
                        // tagsStyles={{
                        //   body : {color:'red'},
                        //    p: {fontSize:30},
                        //    a :{color:'red'}

                        // }} 
                        />
                        {/* <Text style={{fontFamily:'B'}}>{html}</Text> */}
                      </View>
                      // }
                    }
                  />


                </View>
              </View>}
          </View >
        }
      </ThemeContext.Consumer>

    )
  }
}
// const styles = StyleSheet.create({
//   lftcontainer:{
//     width:80,
//     height:80,
//     alignSelf:'center',
//     marginTop:10,
//     justifyContent:'center',
//     backgroundColor:'#f9f9f9',
//     shadowColor: "#000",
// shadowOffset: {
// 	width: 0,
// 	height: 2,
// },
// shadowOpacity: 0.25,
// shadowRadius: 3.84,

// elevation: 5,

//   },
// })