import React, { version } from 'react';
import { Text, View, Image, TextInput, StyleSheet, ScrollView, flexDirection } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo';
import Zocial from 'react-native-vector-icons/Zocial'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemeContext } from '../AppContext';

export default class BayanatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      context: null,
      name: '',
      cell_No: '',
      email: '',
      message: '',

    }
  }


  addContact = () => {
    // alert(""+this.state.context.provider.state.email+",,"+this.state.context.provider.state.Phone_no+",,"+this.state.context.provider.state.fullName);
    // alert()
    fetch("https://ikhlas.info/api/email", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        message: this.state.message,

      })
    })

      .then(response => response.json())
      .then(responseJson => {
        alert(JSON.stringify(responseJson));
        // console.log("hello",responseJson)
        // alert(responseJson.product_data.products_image);
      })
      .catch(error => {
        console.error(error);
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

            {/* <GeneralStatusBarColor  navigation={this.props.navigation} source ={require('../assets/islamic1.jpg')}   screen='home'  backgroundColor='transparent' /> */}
            {this.setContext(context)}
            <View style={{ flex: .9, width: '95%', backgroundColor: '#ffff', borderRadius: 12, alignSelf: 'center', shadowOpacity: 0.10, shadowRadius: 2, elevation: 3 }} >

              {context.provider.state.langselect ?
                <View style={{ width: '90%', height: '15%', marginTop: 10, borderRadius: 10, alignSelf: 'center', backgroundColor: '#f9f9f9', flexDirection: 'row', shadowOpacity: 0.30, shadowRadius: 3, elevation: 5, justifyContent: 'flex-start' }}>
                  <TextInput style={{ alignSelf: 'center', width: '80%', fontFamily: 'B', fontSize: 15 }}
                    placeholder=" نام"
                    onChangeText={(name) => this.setState({name})}>

                  </TextInput>

                  <View style={{ width: '20%', backgroundColor: 'transparant', justifyContent: 'center', flexDirection: 'row' }}>
                    {/* <Text style={{ alignSelf: 'center', marginRight: 15, fontSize: 15, color: '#dbd9da', fontFamily: 'B' }} >
                      نام
              </Text> */}
                    <FontAwesome name="user" size={20} style={{ alignSelf: 'center', color: '#dbd9da', }} />

                  </View>

                </View> : <View style={{ width: '90%', height: '15%', marginTop: 10, borderRadius: 10, alignSelf: 'center', backgroundColor: '#f9f9f9', flexDirection: 'row', shadowOpacity: 0.30, shadowRadius: 3, elevation: 5, justifyContent: 'flex-start' }}>
                  <View style={{ width: '20%', backgroundColor: 'transparant', justifyContent: 'center', flexDirection: 'row' }}>
                    <FontAwesome name="user" size={20} style={{ alignSelf: 'center', color: '#dbd9da', }} />
                    {/* <Text style={{ alignSelf: 'center', marginLeft: 10, fontSize: 15, color: '#dbd9da', fontFamily: 'B' }} >
                      Name
              </Text> */}


                  </View>
                  <TextInput style={{ alignSelf: 'center', width: '80%', fontFamily: 'B' }}

                    placeholder="Name"
                    onChangeText={(name) => this.setState({name})} >

                  </TextInput>



                </View>}

              {context.provider.state.langselect ?
                <View style={{ width: '90%', height: '15%', marginTop: 10, borderRadius: 10, alignSelf: 'center', backgroundColor: '#f9f9f9', flexDirection: 'row', shadowOpacity: 0.30, shadowRadius: 3, elevation: 5 }}>
                  <TextInput style={{ alignSelf: 'center', width: '80%', fontFamily: 'B', fontSize: 15 }}
                    keyboardType='phone-pad'
                    placeholder="نمبر"
                    onChangeText={(phone) => this.setState({phone})}>

                  </TextInput>
                  <View style={{ width: '20%', backgroundColor: 'transparant', justifyContent: 'center', flexDirection: 'row' }}>
                    {/* <Text style={{ alignSelf: 'center', marginRight: 15, fontSize: 15, color: '#dbd9da', fontFamily: 'B' }} >
                      
                </Text> */}
                    <Entypo name="phone" size={20} style={{ alignSelf: 'center', color: '#dbd9da', }} />

                  </View>
                </View> :
                <View style={{ width: '90%', height: '15%', marginTop: 10, borderRadius: 10, alignSelf: 'center', backgroundColor: '#f9f9f9', flexDirection: 'row', shadowOpacity: 0.30, shadowRadius: 3, elevation: 5 }}>
                  <View style={{ width: '20%', backgroundColor: 'transparant', justifyContent: 'center', flexDirection: 'row', marginLeft: 4 }}>
                    <Entypo name="phone" size={20} style={{ alignSelf: 'center', color: '#dbd9da', }} />
                    {/* <Text style={{ alignSelf: 'center', marginLeft: 5, fontSize: 15, color: '#dbd9da', fontFamily: 'B' }} >
                      
              </Text> */}


                  </View>
                  <TextInput style={{ alignSelf: 'center', width: '80%', fontFamily: 'B' }}
                    keyboardType= 'phone-pad'
                    placeholder="Cell No"
                    onChangeText={(phone) => this.setState({phone})}>

                  </TextInput>

                </View>
              }

              {context.provider.state.langselect ?
                <View style={{ width: '90%', height: '15%', marginTop: 10, borderRadius: 10, alignSelf: 'center', backgroundColor: '#f9f9f9', flexDirection: 'row', shadowOpacity: 0.30, shadowRadius: 3, elevation: 5 }}>
                  <TextInput style={{ alignSelf: 'center', width: '78%', fontFamily: 'B', fontSize: 15 }}

                    placeholder="ایمیل"
                    onChangeText={(email) => this.setState({email})}>

                  </TextInput>
                  <View style={{ width: '20%', backgroundColor: 'transparant', justifyContent: 'center', flexDirection: 'row' }}>
                    {/* <Text style={{ alignSelf: 'center', marginRight: 15, fontSize: 15, color: '#dbd9da', fontFamily: 'B' }} >
                      
             </Text> */}
                    <Zocial name="email" size={20} style={{ alignSelf: 'center', color: '#dbd9da' }} />

                  </View>
                </View> :
                <View style={{ width: '90%', height: '15%', marginTop: 10, borderRadius: 10, alignSelf: 'center', backgroundColor: '#f9f9f9', flexDirection: 'row', shadowOpacity: 0.30, shadowRadius: 3, elevation: 5 }}>
                  <View style={{ width: '20%', backgroundColor: 'transparant', justifyContent: 'center', flexDirection: 'row' }}>
                    <Zocial name="email" size={20} style={{ alignSelf: 'center', color: '#dbd9da' }} />
                    {/* <Text style={{ alignSelf: 'center', fontSize: 15,marginLeft:7, color: '#dbd9da', fontFamily: 'B' }} >
                      
            </Text> */}


                  </View>
                  <TextInput style={{ alignSelf: 'center', width: '78%', fontFamily: 'B' }}

                    placeholder="Email"
                    onChangeText={(email) => this.setState({email})}>

                  </TextInput>

                </View>
              }

              <View style={{ width: '90%', height: '35%', backgroundColor: '#f9f9f9', justifyContent: 'flex-start', alignSelf: 'center', borderRadius: 10, marginTop: 10, shadowOpacity: 0.30, shadowRadius: 3, elevation: 5 }} >
                <TextInput style={{ alignSelf: 'center', width: '80%', height: '100%', alignSelf: 'center' }}
                  multiline={true}
                  placeholder="message"
                  onChangeText={(message) => this.setState({message})}>
                </TextInput>
              </View>
              <TouchableOpacity
                onPress={() => this.addContact()}>
                <View style={{ width: 70, height: 40, backgroundColor: '#7c769c', justifyContent: 'center', alignSelf: 'center', borderRadius: 10, marginTop: 7 }} >
                  <Text style={{ alignSelf: 'center', color: '#ffff', fontFamily: 'B' }}>{context.provider.state.langselect ? 'جمع کرایں' : 'Add'} </Text>
                </View>
              </TouchableOpacity>



            </View>
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