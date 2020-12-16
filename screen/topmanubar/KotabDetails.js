import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, ScrollView, flexDirection, FlatList,
ActivityIndicator } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';
import { ThemeContext } from '../AppContext';
import Entypo from 'react-native-vector-icons/Entypo';

// import DarjaAwal from './books/darja-awal';


export default class KotabScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: 0,
      context: null,
      kotabDataArray: [],
      kotabSubArray: [],
      booksArray: [],
      navigation: this.props.navigation,
      loading:true,

    }
  }



  componentDidMount() {
    this.kotabCategory()
    this.getBooksData()

  }

  getRelatedData = (id) => {
    fetch("http://ikhlas.info/api/bookcategory/" + id, {
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
          kotabSubArray: responseJson.data, loading: false,

        },
          () => {
            this.getBooksData(this.state.kotabSubArray)
          }
        )
        // console.log('My Array', this.state.bayanatData)


      })
      .catch(function (error) {
        console.log(error);
      });


  }

  kotabCategory = () => {
    fetch("http://ikhlas.info/api/bookcategory", {
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
          kotabDataArray: responseJson.data,

        },
          () => {
            this.getRelatedData(this.state.kotabDataArray[0].id)
          }
        )
        // console.log('My Array', this.state.bayanatData)


      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getBooksData = (id) => {
    fetch("http://ikhlas.info/api/book/" + id, {
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
          booksArray: responseJson.data,

        },
          // () => {
          //   this.getRelatedData(this.state.kotabDataArray[0].id)
          // }
        )
        // console.log('My Array', this.state.bayanatData)


      })
      .catch(function (error) {
        console.log(error);
      });
  }


  renderTab = () => {

    return (
      <View style={{ flex: 1,justifyContent:'center' }}>

{this.state.loading? <ActivityIndicator size="small" color="#0000ff" style={{alignSelf:'center'}}/>:
        <FlatList
          data={this.state.kotabSubArray}
          renderItem={({ item, index }) =>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('darjaAwalScreen',
                {
                  bookid: item.id
                },

              )}
            >
              <View style={styles.flatelistStyle}>



                {this.state.context.provider.state.langselect ?
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    {/* <AntDesign name="download" size={20} color={'red'}
                        //  onPress={()=>this.downloadFile(item.url)}
                        /> */}
                    <Text style={[styles.textStyle, { fontFamily: 'B', marginRight: 8 }]}>{item.ur_name}</Text>
                    <Entypo name="book" size={25} style={{ alignSelf: 'center', color: '#A9A9A9', marginRight: 8 }} />
                  </View>
                  : <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <Entypo name="book" size={25} style={{ alignSelf: 'center', color: '#A9A9A9', marginLeft: 8 }} />
                    <Text style={[styles.textStyle, { fontFamily: 'B', alignSelf: 'center', marginLeft: 8 }]}>{item.en_name}</Text>
                  </View>
                }


              </View>
            </TouchableOpacity>
          }
        />}

      </View >
    )



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
            {this.setContext(context)}
            {/* <GeneralStatusBarColor  navigation={this.props.navigation} source ={require('../assets/islamic1.jpg')}   screen='home'  backgroundColor='transparent' /> */}

            {context.provider.state.langselect ?
              <View style={{ flex: 1, backgroundColor: '#f6f6f6', flexDirection: 'row' }} >
                <View style={{ flex: 1, backgroundColor: 'transparant', flexDirection }} >
                  <View style={{ height: 40, width: 100, backgroundColor: 'transparant', alignSelf: 'center', marginTop: 5, flexDirection: 'row', justifyContent: 'center' }}>

                    <Text style={{ alignSelf: 'center', color: '#7c769c', fontFamily: 'B', fontSize: context.provider.state.langselect ? 25 : 18 }}>کتب </Text>


                    {/* <AntDesign name="arrowleft" size={20} style={{ alignSelf: 'center', color: '#7c769c' }} /> */}
                  </View>

                  <View style={{ flex: 1, backgroundColor: '#ffff', shadowOpacity: 0.20, shadowRadius: 3, elevation: 3 }}>
                    {
                      this.renderTab()
                    }
                  </View>

                </View>


                <View style={{ width: 80, backgroundColor: 'transparant', justifyContent: 'center', marginTop: 40 }}>

                  <ScrollView>
                    {
                      this.state.kotabDataArray.map((item, index) => (
                        <View key={item, index} style={styles.lftcontainer}>
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({ index: index }, () => {
                                this.getRelatedData(item.id)
                              })
                            }}
                            style={{ backgroundColor: this.state.index === index ? '#ffffff' : '#f6f6f6', height: 80, justifyContent: 'center' }}

                          >


                            <Text style={{ textAlign: 'center', color: '#737373', fontFamily: 'B' }}>{item.ur_name}</Text>


                          </TouchableOpacity>
                        </View>

                      ))
                    }
                  </ScrollView>




                </View>
              </View>

              : <View style={{ flex: 1, backgroundColor: '#f6f6f6', flexDirection: 'row' }} >
                <View style={{ width: 80, backgroundColor: 'transparant', justifyContent: 'center', marginTop: 40 }}>

                  <ScrollView>
                    {
                      this.state.kotabDataArray.map((item, index) => (
                        <View key={item, index} style={styles.lftcontainer}>
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({ index: index }, () => {
                                this.getRelatedData(item.id)
                              })
                            }}
                            style={{ backgroundColor: this.state.index === index ? '#ffffff' : '#f6f6f6', height: 80, justifyContent: 'center' }}

                          >


                            <Text style={{ textAlign: 'center', color: '#737373', fontFamily: 'B' }}>{item.en_name}</Text>


                          </TouchableOpacity>
                        </View>

                      ))
                    }
                  </ScrollView>




                </View>
                <View style={{ flex: 1, backgroundColor: 'transparant', flexDirection }} >
                  <View style={{ height: 40, width: 100, backgroundColor: 'transparant', alignSelf: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ alignSelf: 'center', marginRight: 10, color: '#7c769c', fontFamily: 'B', fontSize: context.provider.state.langselect ? 25 : 18 }}> Books </Text>
                    {/* <AntDesign name="arrowleft" size={20} style={{ alignSelf: 'center', color: '#7c769c' }} /> */}
                  </View>

                  <View style={{ flex: 1, backgroundColor: '#ffff', shadowOpacity: 0.20, shadowRadius: 3, elevation: 3 }}>
                    {
                      this.renderTab()
                    }
                  </View>

                </View>

              </View>


            }

          </View >}
      </ThemeContext.Consumer>
    )
  }
}


KotabScreen.propTypes = {
  navigation: PropTypes.func.isRequired,
}
const styles = StyleSheet.create({
  lftcontainer: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
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
    height: 50,
    alignSelf: 'center',
    backgroundColor: '#ffff',
    // justifyContent:'center',
    flexDirection: 'row',
    marginTop: 8,
    // borderRadius: 30,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    bottom: 5,
    marginTop: 10
  },
  textStyle: {
    fontSize: 18,


  }

})