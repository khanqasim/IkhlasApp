import React, { version } from 'react';
import { Text, View, Image, TextInput, StyleSheet, ScrollView, flexDirection, FlatList,ActivityIndicator } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../AppContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


export default class TaleemScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      context: null,

      taleemDataArray: [],
      taleemSubArray: [],
      loading:true,

      index: 0,
    }

  }

  componentDidMount() {
    this.taleemCategory()
  }

  getRelatedData = (id) => {
    fetch("http://ikhlas.info/api/taleemcategory/" + id, {
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
          taleemSubArray: responseJson.data, loading:false

        },
          () => {
            this.getTaleemDataArray(this.state.taleemSubArray)
          }
        )
        // console.log('My Array', this.state.bayanatData)


      })
      .catch(function (error) {
        console.log(error);
      });


  }

  taleemCategory = () => {
    fetch("http://ikhlas.info/api/taleemcategory", {
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
          taleemDataArray: responseJson.data,

        },
          () => {
            this.getRelatedData(this.state.taleemDataArray[0].id)
          }
        )
        // console.log('My Array', this.state.bayanatData)


      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getTaleemDataArray = (taleemSubArray) => {
    let mArray = []
    let url1 = "https://drive.google.com/uc?id="
    let url2 = "&export=media"
    for (let i = 0; i < taleemSubArray.length; i++) {
      mArray.push({
        id: taleemSubArray[i].id,
        en_name: taleemSubArray[i].en_name,
        ur_name: taleemSubArray[i].ur_name,
        url: url1 + taleemSubArray[i].url + url2,
        // url: "https://drive.google.com/uc?id=1jIoN6gPGutdrQrfgjHs6JzNw4rW4dY_5&export=media",
        created_at: taleemSubArray[i].created_at,


      })

    }
    this.setState({ taleemSubArray: mArray })
  }


  renderTab = () => {
    // if (this.state.index == 0) {

    return <View style={{ flex: 1 }}>
      <FlatList
        data={this.state.taleemSubArray}
        renderItem={({ item, index }) =>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('playerScreen',
                {
                  fullObject: item
                }
              )
            }
          >
            <View style={styles.flatelistStyle}>


              {/* <FontAwesome5 name="play" size={20} style={{ alignSelf: 'center', color: '#A9A9A9',marginLeft: 14}} /> */}

              {
                this.state.context.provider.state.langselect ?
                  <View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={[styles.textStyle, { fontFamily: 'B', marginRight: 8 }]}>{item.ur_name.slice(0,35)+'...'}</Text>
                    <AntDesign name="caretleft" size={20} style={{ alignSelf: 'center', color: '#A9A9A9', marginRight: 8 }} />
                  </View>
                  : <View style={{ flex:1,flexDirection: 'row', justifyContent: 'flex-start',backgroundColor:'transparant' }}>
                    <FontAwesome5 name="play" size={20} style={{ alignSelf: 'center', color: '#A9A9A9', marginLeft: 8 }} />
                    <Text style={[styles.textStyle, { fontFamily: 'B', alignSelf: 'center' }]}>{item.en_name.slice(0,35)+'...'}</Text>
                  </View>
              }

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
            <View style={{flex:1,justifyContent:'center'}} >
               {this.setContext(context)}
            {/* <GeneralStatusBarColor  navigation={this.props.navigation} source ={require('../assets/islamic1.jpg')}   screen='home'  backgroundColor='transparent' /> */}
            {context.provider.state.langselect ?
              <View style={{ flex: 1, backgroundColor: '#f6f6f6', flexDirection: 'row' }}>


                
                <View style={{ flex: 1, backgroundColor: 'transparant', flexDirection }} >
                  <View style={{ height: 50, width: 100, backgroundColor: 'transparant', alignSelf: 'center', marginTop: 5, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ alignSelf: 'center', marginRight: 10, color: '#7c769c', fontFamily: 'B', fontSize: context.provider.state.langselect ? 25 : 15 }}>{context.provider.state.langselect ? 'تعلیم' : 'Taleem'} </Text>
                    {/* <AntDesign name="arrowleft" size={20} style={{ alignSelf: 'center', color: '#7c769c' }} /> */}

                  </View>
                  <View style={{ flex: 1, backgroundColor: '#ffff', shadowOpacity: 0.20, shadowRadius: 3, elevation: 3 }}>
                    {this.renderTab()}
                  </View>


                </View>
                <View style={{ width: 80, backgroundColor: 'transparant', justifyContent: 'center', marginTop: 50 }}>

                  <ScrollView>
                    {
                      this.state.taleemDataArray.map((item, index) => (
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
                      this.state.taleemDataArray.map((item, index) => (
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

                <View style={{ flex: 1, backgroundColor: 'transparant', flexDirection }} >
                  <View style={{ height: 50, width: 100, backgroundColor: 'transparant', alignSelf: 'center', marginTop: 5, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ alignSelf: 'center', marginRight: 10, color: '#7c769c', fontFamily: 'B', fontSize: context.provider.state.langselect ? 25 : 15 }}>{context.provider.state.langselect ? 'تعلیم' : 'Taleem'} </Text>
                    {/* <AntDesign name="arrowleft" size={20} style={{ alignSelf: 'center', color: '#7c769c' }} /> */}

                  </View>
                  <View style={{ flex: 1, backgroundColor: '#ffff', shadowOpacity: 0.20, shadowRadius: 3, elevation: 3 }}>
                    {this.renderTab()}
                  </View>


                </View>







              </View>
            }
              </View>}
           

          </View >}
      </ThemeContext.Consumer>
    )
  }
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
    // height: 0,
    alignSelf: 'center',
    backgroundColor: '#ffff',
    // justifyContent:'center',
    flexDirection: 'row',
    marginTop: 8,
    borderRadius: 30,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    bottom: 5,
    marginTop: 12,
    marginRight: 8,
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
    alignSelf: 'center',
    // color:'#ffff',
    marginLeft: 12
  }
})