import React, { version } from 'react';
import { Text, View, Image, TextInput, StyleSheet, ScrollView, flexDirection, FlatList,
ActivityIndicator } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemeContext } from '../AppContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';




export default class SawalJawabScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
      writtenQuestion: [],
      audioQuestionArray: [],
      loading:true,

    }
  }

  componentDidMount() {
    this.audio_QA_function()
    this.written_QA_function()

  }
  audio_QA_function = () => {

    fetch("http://ikhlas.info/api/question-audio-catgory", {
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
          audioQuestionArray: responseJson.data, loading: false,

        },
          // () => {
          //   this.get_QA(this.state.audioQuestionArray)
          // }
        )
        // console.log('My Array', this.state.bayanatData)


      })
      .catch(function (error) {
        console.log(error);
      });


  }


  // get_QA = (audioQuestionArray) => {
  //   let mArray = []
  //   let url1 = "https://drive.google.com/uc?id="
  //   let url2 = "&export=media"
  //   for (let i = 0; i < audioQuestionArray.length; i++) {
  //     mArray.push({
  //       id: audioQuestionArray[i].id,
  //       en_title: audioQuestionArray[i].en_title,
  //       ur_title: audioQuestionArray[i].ur_title,
  //       url: url1 + audioQuestionArray[i].basename + url2,
  //       // url: "http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/fx/engine-1.ogg",
  //       created_at: audioQuestionArray[i].created_at,
  //     })

  //   }
  //   this.setState({ audioQuestionArray: mArray })

  // }


  written_QA_function = () => {

    fetch("http://ikhlas.info/api/question-category", {
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
          writtenQuestion: responseJson.data,

        },
          // () => {
          //   this.get_QA(this.state.audioQuestionArray)
          // }
        )
        // console.log('My Array', this.state.bayanatData)


      })
      .catch(function (error) {
        console.log(error);
      });


  }


  renderTab = () => {
    if (this.state.questionIndex === 0) {
      return (
        < View style={{ flex: 1 }}>
          <FlatList
            data={this.state.writtenQuestion}
            renderItem={({ item, index }) =>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('qa_Details_Screen',
                  {
                    questionid: item.id
                  },

                )
                }
              >
                <View style={[styles.flatelistStyle]}>




                  {this.state.context.provider.state.langselect ?
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                      {/* <AntDesign name="download" size={20} color={'red'}
                        //  onPress={()=>this.downloadFile(item.url)}
                        /> */}
                      <Text style={[styles.textStyle, { fontFamily: 'B', marginRight: 8 }]}>{item.ur_name}</Text>
                      <MaterialIcons name="question-answer" size={25} style={{ alignSelf: 'center', color: '#A9A9A9', marginRight: 8 }} />
                    </View>
                    : <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                      <MaterialIcons name="question-answer" size={25} style={{ alignSelf: 'center', color: '#A9A9A9', marginLeft: 8 }} />
                      <Text style={[styles.textStyle, { fontFamily: 'B', alignSelf: 'center', marginLeft: 8 }]}>{item.en_name}</Text>
                    </View>
                  }


                </View>
              </TouchableOpacity>
            }
          />
        </View >
      )

    } else if (this.state.questionIndex === 1) {
      return (
        <View style={{ flex: 1, }}>

          <FlatList
            data={this.state.audioQuestionArray}
            renderItem={({ item, index }) =>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('audio_QA_Details',
                  {
                    Audio_QA: item.id
                  }
                )}
                >
                <View style={styles.flatelistStyle}>

                  {this.state.context.provider.state.langselect ?
                    <View style={{ width: '100%', borderRadius: 15, flexDirection: 'row', justifyContent: 'flex-end' }}>
                      <Text style={[styles.textStyle, { fontFamily: 'B', marginRight: 8 }]}>{item.ur_name}</Text>
                      <AntDesign name="caretleft" size={20} style={{ alignSelf: 'center', color: '#A9A9A9', marginRight: 8 }} />
                    </View>
                    : <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                      <FontAwesome5 name="play" size={20} style={{ alignSelf: 'center', color: '#A9A9A9', marginLeft: 8 }} />
                      <Text style={[styles.textStyle, { fontFamily: 'B', alignSelf: 'center' }]}>{item.en_name.slice(0, 33) + '...'}</Text>
                    </View>
                  }
                  {/* <FontAwesome5 name="play" size={20} style={{ alignSelf: 'center', color: '#A9A9A9', marginLeft: 14 }} />

                  {this.state.context.provider.state.langselect ?
                    <Text style={[styles.textStyle, { fontFamily: 'B' }]}>{item.ur_title}</Text> :
                    <Text style={[styles.textStyle, { fontFamily: 'B' }]}>{item.en_title}</Text>
                  } */}



                </View>
              </TouchableOpacity>
            }
          />

        </View>)
    }


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
            {this.state.loading ? <View style={{ flex: 1, justifyContent: 'center' }}>
              <ActivityIndicator size="small" color="#0000ff" style={{ alignSelf: 'center' }} />
            </View> :
              <View style={{ flex: 1, justifyContent: 'center' }} >
                {this.setContext(context)}
                {context.provider.state.langselect ?

                  <View style={{ flex: 1, backgroundColor: '#f6f6f6', flexDirection: 'row' }}>
                    <View style={{ flex: 1, backgroundColor: 'transparant', }} >
                      <View style={{ height: 50, backgroundColor: 'transparant', alignSelf: 'center', marginRight: 20, marginTop: 5, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 17, marginRight: 10, color: '#7c769c', fontFamily: 'B' }}> سوال و جواب  </Text>
                        {/* <AntDesign name="arrowleft" size={20} style={{ alignSelf: 'center', color: '#7c769c' }} /> */}
                      </View>
                      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff', shadowOpacity: 0.30, shadowRadius: 2, elevation: 3 }}>
                        {this.renderTab()}

                      </View>
                    </View>
                    <View style={{ width: 80, backgroundColor: 'transparant', justifyContent: 'center', marginTop: 50 }}>

                      <ScrollView>
                        <TouchableOpacity
                          onPress={() => this.setState({ questionIndex: 0 })}
                        >
                          <View style={styles.lftcontainer}>
                            <Text style={{ textAlign: 'center', color: '#737373', fontSize: 15, fontFamily: 'B' }}>تحریری</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => this.setState({ questionIndex: 1 })}
                        >
                          <View style={[styles.lftcontainer, { backgroundColor: this.state.questionIndex === 1 ? '#ffff' : '#f6f6f6f6' }]} >
                            <Text style={{ textAlign: 'center', color: '#737373', fontSize: 15, fontFamily: 'B' }}>آڈیو </Text>
                          </View>
                        </TouchableOpacity>


                      </ScrollView>




                    </View>



                  </View>
                  : <View style={{ flex: 1, backgroundColor: '#f6f6f6', flexDirection: 'row' }}>

                    <View style={{ width: 80, backgroundColor: 'transparant', justifyContent: 'center', marginTop: 50 }}>

                      <ScrollView>
                        <TouchableOpacity
                          onPress={() => this.setState({ questionIndex: 0 })}
                        >
                          <View style={styles.lftcontainer}>
                            <Text style={{ textAlign: 'center', color: '#737373', fontSize: 15, fontFamily: 'B' }}>Written</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => this.setState({ questionIndex: 1 })}
                        >
                          <View style={[styles.lftcontainer, { backgroundColor: this.state.questionIndex === 1 ? '#ffff' : '#f6f6f6f6' }]} >
                            <Text style={{ textAlign: 'center', color: '#737373', fontSize: 15, fontFamily: 'B' }}>Audio </Text>
                          </View>
                        </TouchableOpacity>

                        {/* <TouchableOpacity
                                    onPress={() => this.setState({ questionIndex: 2 })}
                                  >
                                    <View style={styles.lftcontainer}>
                                      <Text style={{ textAlign: 'center', color: '#737373', fontSize: 15, fontFamily: 'B' }}>ویڈیو</Text>
                                    </View>
                                  </TouchableOpacity> */}
                      </ScrollView>




                    </View>
                    <View style={{ flex: 1, backgroundColor: 'transparant', }} >
                      <View style={{ height: 50, backgroundColor: 'transparant', alignSelf: 'center', marginRight: 20, marginTop: 5, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 17, marginRight: 10, color: '#7c769c', fontFamily: 'B' }}> Question Answer  </Text>
                        {/* <AntDesign name="arrowleft" size={20} style={{ alignSelf: 'center', color: '#7c769c' }} /> */}
                      </View>
                      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff', shadowOpacity: 0.30, shadowRadius: 2, elevation: 3 }}>
                        {this.renderTab()}

                      </View>
                    </View>



                  </View>
                }

              </View>}


            {/* <GeneralStatusBarColor  navigation={this.props.navigation} source ={require('../assets/islamic1.jpg')}   screen='home'  backgroundColor='transparent' /> */}

          </View >
        }
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
    backgroundColor: '#f9f9f9',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    bottom: 5
  },
  flatelistStyle: {
    width: '90%',
    height: 50,
    // justifyContent:'center',
    alignSelf: 'center',
    backgroundColor: '#ffff',
    // justifyContent:'center',
    flexDirection: 'row',
    marginTop: 8,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 15,
    margin: 8,
    marginTop: 10
  },
  // flatelistStyleVedio: {
  //   width: 70,
  //   height: 70,
  //   alignSelf: 'center',
  //   backgroundColor: '#ffff',
  //   marginTop: 8,
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  //   elevation: 5,
  //   borderRadius: 20,
  //   marginHorizontal: 30,
  //   marginVertical: 30,
  //   marginTop: 10,

  // },
  textStyle: {
    fontSize: 15,
    alignSelf: 'center',
    // color:'#ffff',
    marginLeft: 12,
    width: '90%'
  }
})