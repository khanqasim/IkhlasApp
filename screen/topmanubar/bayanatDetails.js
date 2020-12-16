import React, { version } from 'react';
import { Text, View, Image, TextInput, StyleSheet, ScrollView, flexDirection, PermissionsAndroid } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import FlateListScreen from './flatlist';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'rn-fetch-blob';
import { Fab } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../AppContext';
import { ActivityIndicator } from 'react-native-paper';
export default class BayanatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      context: null,
      bayanatSubArray: [],

      bayanatDataArray: [],
      loading: true,



      index: 0,
    }

  }
  componentDidMount() {

    this.lectureCategory()
  }


  getRelatedData = (id) => {
    fetch("http://ikhlas.info/api/lecturecategory/" + id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    })

      .then(response => response.json())
      .then(responseJson => {

        // alert(JSON.stringify(responseJson))
        this.setState({
          bayanatSubArray: responseJson.data, loading: false,

        },
          () => {
            this.getBayanatDataArray(this.state.bayanatSubArray)
          }
        )
        // console.log('My Array', this.state.bayanatData)


      })
      .catch(function (error) {
        console.log(error);
      });


  }

  lectureCategory = () => {
    fetch("http://ikhlas.info/api/lecturecategory", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    })

      .then(response => response.json())
      .then(responseJson => {

        // alert(JSON.stringify(responseJson))
        this.setState({
          bayanatDataArray: responseJson.data,

        },
          () => {
            this.getRelatedData(this.state.bayanatDataArray[0].id)
          }
        )
        // console.log('My Array', this.state.bayanatData)


      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getBayanatDataArray = (bayanatSubArray) => {
    let mArray = []
    let url1 = "https://drive.google.com/uc?id="
    let url2 = "&export=media"
    for (let i = 0; i < bayanatSubArray.length; i++) {
      mArray.push({
        id: bayanatSubArray[i].id,
        en_title: bayanatSubArray[i].en_title,
        ur_title: bayanatSubArray[i].ur_title,
        url: url1 + bayanatSubArray[i].url + url2,
        // url: "https://drive.google.com/uc?id=1jIoN6gPGutdrQrfgjHs6JzNw4rW4dY_5&export=media",
        created_at: bayanatSubArray[i].created_at,


      })

    }
    this.setState({ bayanatSubArray: mArray })
  }


  renderTab = () => {


    return  <View style={{ flex: 1, }}>
      <FlatList
        data={this.state.bayanatSubArray}
        renderItem={({ item, index }) =>

        <TouchableOpacity
        onPress={() => this.props.navigation.navigate('playerScreen',
          {
            fullObject:item
          }
        )}>
          <View style={styles.flatelistStyle}>
   

           
              <View style={{ width: 270, justifyContent: 'center', flexDirection: 'row', backgroundColor: 'transparant' }}>
                {this.state.context.provider.state.langselect ?
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

                    <Text style={[styles.textStyle, { fontFamily: 'B', marginRight: 8 }]}>{item.ur_title}</Text>
                    <AntDesign name="caretleft" size={20} style={{ alignSelf: 'center', color: '#A9A9A9', marginRight: 8 }} />
                  </View>
                  : <View style={{flex:1,flexDirection: 'row', justifyContent: 'flex-start',backgroundColor:'transparant'  }}>
                    <FontAwesome5 name="play" size={20} style={{ alignSelf: 'center', color: '#A9A9A9' }} />
                    <Text style={[styles.textStyle, { fontFamily: 'B', alignSelf: 'center' }]}>{item.en_title.slice(0,35)+'...'}</Text>
                  </View>
                }


              </View>
           

          </View>
          </TouchableOpacity>

        }
      />

    </View>


  }
  setContext = (context) => {
    this.state.context = context
    return null
  }


  render() {
    return (
      <ThemeContext.Consumer>
        {(context) =>


          <View style={{ flex: 1, backgroundColor: '#f6f6f6', flexDirection: 'row' }}>
            {this.state.loading ? <View style={{flex:1,justifyContent:'center'}}><ActivityIndicator size="small" color="#0000ff"/></View> :
            <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
            {this.setContext(context)}
            
            {context.provider.state.langselect ?

            
              <View style={{ flex: 1, backgroundColor: '#f6f6f6', flexDirection: 'row' }}>
                {/* <GeneralStatusBarColor  navigation={this.props.navigation} source ={require('../assets/islamic1.jpg')}   screen='home'  backgroundColor='transparent' /> */}
                <View style={{ flex: 1, backgroundColor: 'transparant', }} >
                  <View style={{ height: 50, width: 100, backgroundColor: 'transparant', alignSelf: 'center', marginRight: 20, marginTop: 5, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ alignSelf: 'center', marginRight: 10, color: '#7c769c', fontFamily: 'B', fontSize: context.provider.state.langselect ? 22 : 18 }}>{context.provider.state.langselect ? 'بیانات' : 'Bayanat'}</Text>
                    {/* <AntDesign name="arrowleft" size={20} style={{ alignSelf: 'center', color: '#7c769c' }} /> */}
                  </View>
                  <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff', shadowOpacity: 0.20, shadowRadius: 3, elevation: 3 }}>
                    {this.renderTab()}
                  </View>


                </View>
                <View style={{ width: 80, backgroundColor: 'transparant', justifyContent: 'center', marginTop: 50 }}>



                  <ScrollView>

                    {
                      this.state.bayanatDataArray.map((item, index) => (
                        <View key={item, index} style={styles.lftcontainer}>
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({ index: index }, () => {
                                this.getRelatedData(item.id)
                              })
                            }}
                            style={{ backgroundColor: this.state.index === index ? '#ffffff' : '#f6f6f6', height: 80, justifyContent: 'center' }}

                          >


                            <Text style={{ textAlign: 'center', color: '#737373', fontFamily: 'B' }}>{context.provider.state.langselect ? item.ur_name : item.en_name.slice(0, 7)}</Text>


                          </TouchableOpacity>
                        </View>

                      ))
                    }
                  </ScrollView>




                </View>
              </View> :
              <View style={{ flex: 1, backgroundColor: '#f6f6f6', flexDirection: 'row' }}>



                <View style={{ width: 80, backgroundColor: 'transparant', justifyContent: 'center', marginTop: 50 }}>



                  <ScrollView>

                    {
                      this.state.bayanatDataArray.map((item, index) => (
                        <View key={item, index} style={styles.lftcontainer}>
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({ index: index }, () => {
                                this.getRelatedData(item.id)
                              })
                            }}
                            style={{ backgroundColor: this.state.index === index ? '#ffffff' : '#f6f6f6', height: 80, justifyContent: 'center' }}

                          >


                            <Text style={{ textAlign: 'center', color: '#737373', fontFamily: 'B' }}>{context.provider.state.langselect ? item.ur_name.slice(0, 7) : item.en_name}</Text>


                          </TouchableOpacity>
                        </View>

                      ))
                    }
                  </ScrollView>




                </View>

                <View style={{ flex: 1, backgroundColor: 'transparant', }} >
                  <View style={{ height: 50, width: 100, backgroundColor: 'transparant', alignSelf: 'center', marginRight: 20, marginTop: 5, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ alignSelf: 'center', marginRight: 10, color: '#7c769c', fontFamily: 'B', fontSize: context.provider.state.langselect ? 22 : 18 }}>Lectures</Text>
                    {/* <AntDesign name="arrowleft" size={20} style={{ alignSelf: 'center', color: '#7c769c' }} /> */}
                  </View>
                  <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff', shadowOpacity: 0.20, shadowRadius: 3, elevation: 3 }}>
                    {this.renderTab()}
                  </View>


                </View>


              </View>

            }
            </View>}

          </View >
        }
      </ThemeContext.Consumer>

    )
  }
}

FlateListScreen.propTypes = {
  // screen: PropTypes.func.isRequired,
  // context: PropTypes.func.isRequired,
  Array: PropTypes.array.isRequired,
  // isSelect: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  lftcontainer: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: 'center',
    backgroundColor: '#ffff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    bottom: 5,
  },
  flatelistStyle: {
    width: '95%',
    // height: 40,
    alignSelf: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 8,
    borderRadius: 30,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    bottom: 5,
    marginTop: 10
  },
  imageStyle: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 2,
    alignSelf: 'center',
    // resizeMode: 'contain',
    margin: 5,
    alignContent: 'flex-start'
  },
  textStyle: {
    fontSize: 15,
    marginTop: 7,
    // color:'#ffff',
    marginLeft: 12
  }

})