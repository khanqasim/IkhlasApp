import React, { version } from 'react';
import {
  Text, View, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity, FlatList, PermissionsAndroid,
  ActivityIndicator
} from 'react-native';
import { ThemeContext } from '../AppContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HTML from 'react-native-render-html';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RNFetchBlob from 'rn-fetch-blob';
import Entypo from 'react-native-vector-icons/Entypo';


export default class NewComersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      context: null,
      bookDataArray: [],
      myTexData: [],
      bayanatDataArray: [],
      index: 0,
      bookLoading: false,
      loading: true,
    }

  }

  componentDidMount() {
    this.getBooksData()
    this.getTextData()
    this.getBayanatData()
  }
  getBooksData = () => {
    // this.setState({ bookLoading: true })
    fetch("http://ikhlas.info/api/new-comer-book", {
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
          bookDataArray: responseJson.data, loading: false,
          bookLoading: false

        },
          () => {
            this.getBooksDataArray(this.state.bookDataArray)
          }
        )
        // console.log('My Array', this.state.bayanatData)


      })
      .catch(function (error) {
        console.log(error);
      });


  }

  getBooksDataArray = (bookDataArray) => {
    let mArray = []
    let url1 = "https://drive.google.com/uc?id="
    let url2 = "&export=media"
    for (let i = 0; i < bookDataArray.length; i++) {
      mArray.push({
        id: bookDataArray[i].id,
        en_title: bookDataArray[i].en_title,
        ur_title: bookDataArray[i].ur_title,
        url: url1 + bookDataArray[i].basename + url2,
        image: bookDataArray[i].image,
        // url: "https://drive.google.com/file/d/16bP6oh1Jk_XMxohC9xomN5x-_b5zL2Uw/view",
        created_at: bookDataArray[i].created_at,


      })

    }
    this.setState({ bookDataArray: mArray })

  }

  getTextData = () => {
    fetch("http://ikhlas.info/api/new-comer-instruction", {
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
          myTexData: responseJson.data,

        },
          // () => {
          //   this.getBooksDataArray(this.state.bookDataArray)
          // }
        )
        // console.log('My Array', this.state.bayanatData)


      })
      .catch(function (error) {
        console.log(error);
      });


  }
  getBayanatData = () => {
    this.setState({ bookLoading: true })
    fetch("http://ikhlas.info/api/comer-lecture", {
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
          bookLoading: false

        },
          () => {
            this.getBayanatDataArray(this.state.bayanatDataArray)
          }
        )
        // console.log('My Array', this.state.bayanatData)


      })
      .catch(function (error) {
        console.log(error);
      });


  }

  getBayanatDataArray = (bayanatDataArray) => {
    let mArray = []
    let url1 = "https://drive.google.com/uc?id="
    let url2 = "&export=media"
    for (let i = 0; i < bayanatDataArray.length; i++) {
      mArray.push({
        id: bayanatDataArray[i].id,
        en_title: bayanatDataArray[i].en_title,
        ur_title: bayanatDataArray[i].ur_title,
        url: url1 + bayanatDataArray[i].basename + url2,

        // url: "https://drive.google.com/file/d/16bP6oh1Jk_XMxohC9xomN5x-_b5zL2Uw/view",
        created_at: bayanatDataArray[i].created_at,


      })

    }
    this.setState({ bayanatDataArray: mArray })

  }

  actualDownload = (url) => {
    const { dirs } = RNFetchBlob.fs;
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `test.pdf`,
        path: `${dirs.DownloadDir}/test.pdf`,
      },
    })
      .fetch('GET', url, {})
      .then((res) => {
        console.log('The file saved to ', res.path());
      })
      .catch((e) => {
        console.log(e)
      });
  }

  downloadFile = async (url) => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.actualDownload(url);
      } else {
        Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
      }
    } catch (err) {
      console.warn(err);
    }
  }


  renderTab = () => {
    if (this.state.index === 0) {
      return (
        < View style={{ flex: 1, backgroundColor: '#ffff' }}>
          <FlatList
            data={this.state.myTexData}
            renderItem={({ item }) =>
              <View style={{
                flex: 1, justifyContent: 'center', marginRight: this.state.context.provider.state.langselect ? 8 : 0,
                marginLeft: this.state.context.provider.state.langselect ? 0 : 8
              }}>
                <HTML html={this.state.context.provider.state.langselect ? item.ur_description.replace(/<\/?[^>]+(>|$)/g, "") : item.en_description.replace(/<\/?[^>]+(>|$)/g, "")}></HTML>

                {/* {this.state.context.provider.state.langselect ?
                  <View style={{ justifyContent: 'center' }}>
                    <View style={{ backgroundColor: '#ffff', shadowOpacity: 0.30, shadowRadius: 3, elevation: 5, bottom: 1, top: 1 }}>
                      <HTML html={item.ur_question}></HTML>
                    </View>

                    <HTML html={item.ur_answer} style={{ marginTop: 12 }}></HTML>
                  </View> :
                  <View style={{ justifyContent: 'center' }}>
                    <View style={{ backgroundColor: '#ffff', shadowOpacity: 0.30, shadowRadius: 3, elevation: 5, bottom: 1, top: 1 }}>
                      <HTML html={item.ur_description}></HTML>
                    </View>
                    <HTML html={item.en_description}></HTML>
                  </View>

                } */}



              </View>
            }
          />

        </View >
      )

    } else if (this.state.index === 1) {
      return (
        <View style={{ flex: 1, }}>
          {/* {this.state.bookLoading === true ? 
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Book Loading</Text>
          </View> : */}
          <FlatList
            data={this.state.bookDataArray}
            key={2}
            renderItem={({ item }) =>

              <View style={{ flex: 1, }}>

                <View style={styles.flatelistStyle2}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('pdfExample',
                      {
                        BookPath: item.url
                      })}
                  >
                    <Image style={{ width: 120, height: 160, alignSelf: 'center' }} source={{ uri: "http://ikhlas.info/uploads/" + item.image }} />
                  </TouchableOpacity>
                  <Text style={{ marginRight: 5, fontFamily: 'B' }}>{this.state.context.provider.state.langselect ? item.ur_title : item.en_title}</Text>
                  <TouchableOpacity
                    onPress={() => this.downloadFile(item.url)}>
                    {this.state.context.provider.state.langselect ?
                      <AntDesign name="download" size={20} color={'red'}
                        style={{ marginBottom: 7 }}
                      /> : <AntDesign name="download" size={20} color={'red'}
                        style={{ alignSelf: 'flex-end', marginBottom: 7 }}
                      />}

                  </TouchableOpacity>
                </View>

              </View>

            }
            numColumns={2}

          />

        </View>)
    } else {
      return (
        <View style={{ flex: 1 }} >
          <FlatList
            data={this.state.bayanatDataArray}
            renderItem={({ item, index }) =>


              <View style={styles.flatelistStyle}>
                {/* <TouchableOpacity
                  onPress={() => this.downloadFile(item.url)}>
                  <AntDesign name="download" size={30} style={{ color: 'red', alignSelf: 'center' }}

                  />
                </TouchableOpacity> */}

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('playerScreen',
                    {
                      fullObject: item
                    }
                  )}>
                  <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', }}>
                    {this.state.context.provider.state.langselect ?
                      <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'flex-end', alignSelf: 'center', backgroundColor: 'transparant' }}>

                        <Text style={[styles.textStyle, { fontFamily: 'B', marginRight: 8 }]}>{item.ur_title.slice(0, 60) + '...'}</Text>
                        <AntDesign name="caretleft" size={20} style={{ alignSelf: 'center', color: '#A9A9A9', }} />
                      </View>
                      : <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: 'transparant', alignSelf: 'center' }}>
                        <FontAwesome5 name="play" size={20} style={{ alignSelf: 'center', color: '#A9A9A9', alignItems: 'center' }} />
                        <Text style={[styles.textStyle, { fontFamily: 'B', textAlign: 'center', marginLeft: 3 }]}>{item.en_title.slice(0, 50) + '...'}</Text>
                      </View>
                    }


                  </View>
                </TouchableOpacity>

              </View>

            }
          />

        </View>
      )
    }


  }

  actualDownload = (url) => {
    const { dirs } = RNFetchBlob.fs;
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `test.pdf`,
        path: `${dirs.DownloadDir}/test.pdf`,
      },
    })
      .fetch('GET', url, {})
      .then((res) => {
        console.log('The file saved to ', res.path());
      })
      .catch((e) => {
        console.log(e)
      });
  }

  downloadFile = async (url) => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.actualDownload(url);
      } else {
        Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
      }
    } catch (err) {
      console.warn(err);
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


                    <View style={{ flex: 1, backgroundColor: '#ffff', }}>
                      <View style={{ height: 55, width: '100%', backgroundColor: '#f6f6f6', alignSelf: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ alignSelf: 'center', color: '#7c769c', fontFamily: 'B', fontSize: 22 }}> نئے ساتھی </Text>
                        {/* <AntDesign name="arrowleft" size={20} style={{ alignSelf: 'center', color: '#7c769c' }} /> */}
                      </View>
                      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#ffff', shadowOpacity: 0.30, shadowRadius: 2, elevation: 3 }}>
                        {this.renderTab()}

                      </View>

                    </View>
                    <View style={{ width: 80, backgroundColor: 'transparant', justifyContent: 'center', marginTop: 50 }}>

                      <ScrollView>


                        <View style={styles.lftcontainer}>
                          <TouchableOpacity
                            onPress={() => this.setState({ index: 0 })
                            }
                            style={{ backgroundColor: this.state.index === 0 ? '#ffffff' : '#f6f6f6', height: 80, justifyContent: 'center' }}
                          >
                            <Text style={{ textAlign: 'center', color: '#737373', fontFamily: 'B' }}>ہدایات </Text>


                          </TouchableOpacity>
                        </View>
                        <View style={styles.lftcontainer}>
                          <TouchableOpacity
                            onPress={() =>
                              this.setState({ index: 1 }
                                //   ()=>{
                                //   this.getBooksData()
                                // }
                              )
                            }
                            style={{ backgroundColor: this.state.index === 1 ? '#ffffff' : '#f6f6f6', height: 80, justifyContent: 'center' }}
                          >
                            <Text style={{ textAlign: 'center', color: '#737373', fontFamily: 'B' }}>کتابیں </Text>


                          </TouchableOpacity>
                        </View>
                        <View style={styles.lftcontainer}>
                          <TouchableOpacity
                            onPress={() =>
                              this.setState({ index: 2 })
                            }
                            style={{ backgroundColor: this.state.index === 2 ? '#ffffff' : '#f6f6f6', height: 80, justifyContent: 'center' }}
                          >
                            <Text style={{ textAlign: 'center', color: '#737373', fontFamily: 'B' }}>بیانات </Text>


                          </TouchableOpacity>
                        </View>



                      </ScrollView>

                    </View>

              </View> :
                  <View style={{ flex: 1, backgroundColor: '#f6f6f6', flexDirection: 'row' }}>
                    {/* {context.provider.state.langselect ?} */}


                    <View style={{ width: 80, backgroundColor: 'transparant', justifyContent: 'center', marginTop: 50 }}>

                      <ScrollView>


                        <View style={styles.lftcontainer}>
                          <TouchableOpacity
                            onPress={() =>
                              this.setState({ index: 0 })
                            }
                            style={{ backgroundColor: this.state.index === 0 ? '#ffffff' : '#f6f6f6', height: 80, justifyContent: 'center' }}
                          >
                            <Text style={{ textAlign: 'center', color: '#737373', fontFamily: 'B' }}>Instructions</Text>


                          </TouchableOpacity>
                        </View>
                        <View style={styles.lftcontainer}>
                          <TouchableOpacity
                            onPress={() =>
                              this.setState({ index: 1 })
                            }
                            style={{ backgroundColor: this.state.index === 1 ? '#ffffff' : '#f6f6f6', height: 80, justifyContent: 'center' }}
                          >
                            <Text style={{ textAlign: 'center', color: '#737373', fontFamily: 'B' }}>Books </Text>


                          </TouchableOpacity>
                        </View>
                        <View style={styles.lftcontainer}>
                          <TouchableOpacity
                            onPress={() =>
                              this.setState({ index: 2 })
                            }
                            style={{ backgroundColor: this.state.index === 2 ? '#ffffff' : '#f6f6f6', height: 80, justifyContent: 'center' }}
                          >
                            <Text style={{ textAlign: 'center', color: '#737373', fontFamily: 'B' }}>Lectures</Text>


                          </TouchableOpacity>
                        </View>



                      </ScrollView>

                    </View>

                    <View style={{ flex: 1, backgroundColor: '#ffff', }}>
                      <View style={{ height: 55, width: '100%', backgroundColor: '#f6f6f6', alignSelf: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ alignSelf: 'center', color: '#7c769c', fontFamily: 'B', fontSize: 22 }}> New Comers</Text>
                        {/* <AntDesign name="arrowleft" size={20} style={{ alignSelf: 'center', color: '#7c769c' }} /> */}
                      </View>
                      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#ffff', shadowOpacity: 0.30, shadowRadius: 2, elevation: 3 }}>
                        {this.renderTab()}

                      </View>

                    </View>


                  </View>


                }


              </View>}


          </View>
        }
      </ThemeContext.Consumer>
    )
  }
}

// FlateListScreen.propTypes = {
//   // screen: PropTypes.func.isRequired,
//   // context: PropTypes.func.isRequired,
//   Array: PropTypes.array.isRequired,
//   // isSelect: PropTypes.func.isRequired
// }

const styles = StyleSheet.create({
  lftcontainer: {
    width: 77,
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
  //     shadowOpacity: 0.25,
  //     shadowRadius: 3.84,
  //     elevation: 5,
  //     bottom: 5,
  //   },
  flatelistStyle: {
    width: '95%',
    height: 60,
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
  flatelistStyle2: {
    width: 120,
    // height: 170,
    backgroundColor: '#ffff',
    marginTop: 8,
    alignSelf:'center',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // flexDirection:'column',
    // borderRadius:,
    marginHorizontal: 10,
    marginVertical: 30,
    marginTop: 10,
  },

  //   imageStyle: {
  //     width: 20,
  //     height: 20,
  //     borderRadius: 20,
  //     borderWidth: 2,
  //     alignSelf: 'center',
  //     // resizeMode: 'contain',
  //     margin: 5,
  //     alignContent: 'flex-start'
  //   },
  textStyle: {
    fontSize: 12,
    // marginTop: 7,
    // color:'#ffff',

    // marginLeft: 12
  }

})