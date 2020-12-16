import React, { version } from 'react';
import { Text, View, Image, TextInput, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import BayanatScreen from './topmanubar/bayanatDetails';
import TaleemScreen from './topmanubar/taleemDetails';
import KotabScreen from './topmanubar/KotabDetails';
import NaatyaKalamScreen from './topmanubar/naat-ya-kalam';
import { Fab } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ThemeProvider } from 'react-native-paper';
import { ThemeContext } from './AppContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';







export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      context: null,
      bayanatData: [],
      loading: true,
      naatData: [],
      naatlodaing: true,
      qaData: [],
      qaloading: true,
      taleemData: [],
      taleemlodaing: true,
      newComerData: [],
      newComerloading: true,

    }

  }

  componentDidMount() {


    this.getBayanatData()
    this.getNaatData()
    this.getQAData()
    this.getTaleemData()
    this.getNewComer()

  }

  getBayanatData = () => {

    fetch("http://ikhlas.info/api/lecture", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    })

      .then(response => response.json())
      .then(responseJson => {


        this.setState({
          bayanatData: responseJson.data, loading: false

        }, () => {
          this.getBayanatArray(this.state.bayanatData)
        })
        // console.log('My Array', this.state.bayanatData)


      })
      .catch(function (error) {
        console.log(error);
      });

  }

  getNaatData = () => {
    fetch("http://ikhlas.info//api/naat", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    })

      .then(response => response.json())
      .then(responseJson => {


        this.setState({
          naatData: responseJson.data, naatlodaing: false

        },
          () => {
            this.getNaatArray(this.state.naatData)
          }
        )
        // console.log('My Array', this.state.naatData)


      })
      .catch(function (error) {
        console.log(error);
      });

  }

  getQAData = () => {

    fetch("http://ikhlas.info/api/questionaudio", {
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
          qaData: responseJson.data, qaloading: false

        },
          () => {
            this.getQAArray(this.state.qaData)
          }
        )
        console.log('My question Answer Data', this.state.qaData)


      })
      .catch(function (error) {
        console.log(error);
      });

  }
  getTaleemData = () => {

    fetch("http://ikhlas.info/api/taleem", {
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
          taleemData: responseJson.data, taleemlodaing: false

        },
          () => {
            this.getTaleemArray(this.state.taleemData)
          }
        )
        console.log('My question Answer Data', this.state.taleemData)


      })
      .catch(function (error) {
        console.log(error);
      });

  }

  getNewComer = () => {

    fetch("http://ikhlas.info/api/new-comer-lecture", {
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
          newComerData: responseJson.data, newComerloading: false

        },
          () => {
            this.getNewComerArray(this.state.newComerData)
          }
        )
        console.log('My question Answer Data', this.state.newComerData)


      })
      .catch(function (error) {
        console.log(error);
      });

  }
  getBayanatArray = (bayanatData) => {
    let mArray = []
    let url1 = "https://drive.google.com/uc?id="
    let url2 = "&export=media"
    for (let i = 0; i < bayanatData.length; i++) {
      mArray.push({
        id: bayanatData[i].id,
        en_title: bayanatData[i].en_title,
        ur_title: bayanatData[i].ur_title,
        url: url1 + bayanatData[i].url + url2,
        // url: "https://drive.google.com/uc?id=1r4KY1Lds6bFhqouTdD51--435qhKhxYl&export=media",
        created_at: bayanatData[i].created_at,


      })

    }
    this.setState({ bayanatData: mArray })

  }


  getNaatArray = (naatData) => {
    let mArray = []
    let url1 = "https://drive.google.com/uc?id="
    let url2 = "&export=media"
    for (let i = 0; i < naatData.length; i++) {
      mArray.push({
        id: naatData[i].id,
        en_name: naatData[i].en_name,
        ur_name: naatData[i].ur_name,
        url: url1 + naatData[i].url + url2,
        // url: "https://drive.google.com/uc?id=1_g64SZMshUN83L9uW834ZC9Kt-McOcEp&export=media",
        created_at: naatData[i].created_at,


      })

    }
    this.setState({ naatData: mArray })

  }


  getQAArray = (qaData) => {
    let mArray = []
    let url1 = "https://drive.google.com/uc?id="
    let url2 = "&export=media"
    for (let i = 0; i < qaData.length; i++) {
      mArray.push({
        id: qaData[i].id,
        en_title: qaData[i].en_title,
        ur_title: qaData[i].ur_title,
        url: url1 + qaData[i].basename + url2,
        // url: "https://drive.google.com/uc?id=1_g64SZMshUN83L9uW834ZC9Kt-McOcEp&export=media",
        created_at: qaData[i].created_at,


      })

    }
    this.setState({ qaData: mArray })

  }



  getTaleemArray = (taleemData) => {
    let mArray = []
    let url1 = "https://drive.google.com/uc?id="
    let url2 = "&export=media"
    for (let i = 0; i < taleemData.length; i++) {
      mArray.push({
        id: taleemData[i].id,
        en_name: taleemData[i].en_name,
        ur_name: taleemData[i].ur_name,
        url: url1 + taleemData[i].url + url2,
        // url: "https://drive.google.com/uc?id=1jIoN6gPGutdrQrfgjHs6JzNw4rW4dY_5&export=media",
        created_at: taleemData[i].created_at,


      })

    }
    this.setState({ taleemData: mArray })

  }


  getNewComerArray = (newComerData) => {
    let mArray = []
    let url1 = "https://drive.google.com/uc?id="
    let url2 = "&export=media"
    for (let i = 0; i < newComerData.length; i++) {
      mArray.push({
        id: newComerData[i].id,
        en_title: newComerData[i].en_title,
        ur_title: newComerData[i].ur_title,
        url: url1 + newComerData[i].basename + url2,
        // url: "https://samplesongs.netlify.app/Death%20Bed.mp3",
        created_at: newComerData[i].created_at,
      })

    }
    this.setState({ newComerData: mArray })

  }





  setContext = (context) => {
    this.state.context = context
    return null
  }

  render() {

    return (
      <ThemeContext.Consumer>
        {(context) =>

          <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
            {/* { alert('aaaaa'+ this.state.name)} */}
            {/* <GeneralStatusBarColor  navigation={this.props.navigation} source ={require('../assets/islamic1.jpg')}   screen='home'  backgroundColor='transparent' /> */}

            {this.setContext(context)}
            {this.state.loading ? <ActivityIndicator size="small" color="#0000ff" /> :
              <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
                <View style={{ width: '100%', height: 50, backgroundColor: '#f6f6f6', marginTop: 10, flexDirection: 'row', }}>
                  <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: 'transparant', flexDirection: 'row', marginLeft: 10 }}>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: 'transparant', flexDirection: 'row' }}
                      onPress={() =>
                        context.provider.state.langselect ?
                          context.provider.setState({ langselect: false }) :
                          context.provider.setState({ langselect: true })
                      }
                    >

                      <View style={{ width: 20, height: 20, borderRadius: 20, borderColor: '#000', borderWidth: 1, justifyContent: 'center', alignSelf: 'center', }}>
                        <View style={{ width: 12, height: 12, borderRadius: 12, alignSelf: 'center', backgroundColor: context.provider.state.langselect ? '#fff' : '#5ab2ff' }} />
                      </View>
                      <Text style={{ fontFamily: 'B', fontSize: 12, alignSelf: 'center', marginLeft: 10 }}>English</Text>

                    </TouchableOpacity>
                  </View>
                  {/* <View style={{ flex: 1, backgroundColor: 'transparant', justifyContent: 'center' }}>
                   
                  </View> */}
                  <View style={{ flex: 1, backgroundColor: 'transparant', justifyContent: 'flex-end', marginRight: 10, flexDirection: 'row' }}>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: 'transparant', flexDirection: 'row' }}
                      onPress={() =>
                        context.provider.setState({ langselect: true })
                      }
                    >
                      <Text style={{ fontFamily: 'B', fontSize: 18, alignSelf: 'center', marginRight: 10 }}>اردو</Text>
                      <View style={{ width: 20, height: 20, borderRadius: 20, borderColor: '#000', borderWidth: 1, justifyContent: 'center', alignSelf: 'center', }}>
                        <View style={{ width: 12, height: 12, borderRadius: 12, alignSelf: 'center', backgroundColor: context.provider.state.langselect ? '#5ab2ff' : '#fff' }} />
                      </View>

                    </TouchableOpacity>
                  </View>
                </View>
                {/* <View style={{ }}> */}


                {context.provider.state.langselect ?
                  <View style={{ flex: 1, backgroundColor: '#f9f9f9', justifyContent: 'center', flexDirection: 'row' }}>



                    <View style={{ flex: 1, backgroundColor: 'transparant' }}>
                      <ScrollView>
                       

                        <View style={styles.container}>
                        <View style={{height:60,backgroundColor:'transparant',justifyContent:'center',alignSelf:'center'}}>
                          <Text style={{ fontSize: 20, fontFamily: 'B', alignSelf: 'center' }}>تازہ ترین</Text>
                          </View>
                          <View style={styles.container1} >
                            <TouchableOpacity
                              onPress={() => this.props.navigation.navigate('playerScreen',
                                {
                                  fullObject:this.state.bayanatData[0]
                                }
                              )
                              }
                            >
                              <View style={styles.container3}>
                                <View style={{ width: 90, height: 80, marginBottom: 65, backgroundColor: "transparant" }}>
                                  <FontAwesome5 name="play" size={30} style={{ alignSelf: 'center', marginTop: 8, color: '#A9A9A9' }} />
                                  <Text style={{ fontFamily: 'B', textAlign: 'center' }}>بیانات</Text>
                                  <View style={{ width: 90, height: 1, backgroundColor: '#000', alignSelf: 'center', marginTop: 10 }}>
                                  </View>


                                  <Text style={styles.urduTextStyle}>{context.provider.state.langselect ? this.state.loading ?
                                    'loading' : this.state.bayanatData[0].ur_title : this.state.loading ? ' ' : this.state.bayanatData[0].en_title} </Text>
                                </View>
                              </View>
                            </TouchableOpacity>


                            <TouchableOpacity
                              onPress={() => this.props.navigation.navigate('playerScreen',
                                {
                                  fullObject: this.state.taleemData[0]
                                }
                              )
                              }
                            >
                              <View style={styles.container3}>
                                <View style={{ width: 90, height: 80, marginBottom: 65, backgroundColor: "transparant" }}>
                                  <FontAwesome5 name="play" size={30} style={{ alignSelf: 'center', marginTop: 8, color: '#A9A9A9' }} />
                                  <Text style={{ fontFamily: 'B', textAlign: 'center' }}> تعلیم</Text>
                                  <View style={{ width: 90, height: 1, backgroundColor: '#000', alignSelf: 'center', marginTop: 10 }}>
                                  </View>
                                  <Text style={styles.urduTextStyle}>{context.provider.state.langselect ? this.state.taleemlodaing ?
                                    'loading' : this.state.taleemData[0].ur_name.slice(0,40) + "....." : this.state.taleemlodaing ? ' ' : this.state.taleemData[0].en_name} </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>




                          <View style={styles.container1} >
                            <TouchableOpacity
                              onPress={() => this.props.navigation.navigate('playerScreen',
                                {
                                  fullObject: this.state.naatData[0]
                                }
                              )
                              }
                            >
                              <View style={styles.container3}>
                                <View style={{ width: 90, height: 80, marginBottom: 65, backgroundColor: "transparant" }}>
                                  <FontAwesome5 name="play" size={30} style={{ alignSelf: 'center', marginTop: 8, color: '#A9A9A9' }} />
                                  <Text style={{ fontFamily: 'B', textAlign: 'center' }}>نعتیہ کلام</Text>
                                  <View style={{ width: 90, height: 1, backgroundColor: '#000', alignSelf: 'center', marginTop: 8 }}>
                                  </View>
                                  <Text style={styles.urduTextStyle}>{context.provider.state.langselect ? this.state.naatlodaing ?
                                    'loading' : this.state.naatData[0].ur_name.slice(0,40) + "....." : this.state.naatlodaing ? ' ' : this.state.naatData[0].en_name} </Text>
                                </View>
                              </View>
                            </TouchableOpacity>


                            <TouchableOpacity
                              onPress={() => this.props.navigation.navigate('playerScreen',
                                {
                                  fullObject: this.state.qaData[0]
                                }
                              )
                              }
                            >
                              <View style={styles.container3}>
                                <View style={{ width: 90, height: 80, marginBottom: 65, backgroundColor: "transparant" }}>
                                  <FontAwesome5 name="play" size={30} style={{ alignSelf: 'center', marginTop: 8, color: '#A9A9A9' }} />
                                  <Text style={{ fontFamily: 'B', textAlign: 'center' }}> سوال و جواب</Text>
                                  <View style={{ width: 90, height: 1, backgroundColor: '#000', alignSelf: 'center', marginTop: 8 }}>
                                  </View>
                                  <Text style={styles.urduTextStyle}>{context.provider.state.langselect ? this.state.qaloading ?
                                    'loading' : this.state.qaData[0].ur_title.slice(0, 44) + "....." : this.state.qaloading ? ' ' : this.state.qaData[0].en_title} </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>


{/* 
                          <View style={styles.container1} >
                            <TouchableOpacity
                              onPress={() => this.props.navigation.navigate('playerScreen',
                                {
                                  fullObject: this.state.newComerData
                                }
                              )
                              }
                            >
                              <View style={styles.container3}>
                                <View style={{ width: 90, height: 80, marginBottom: 65, backgroundColor: "transparant" }}>
                                  <FontAwesome5 name="play" size={30} style={{ alignSelf: 'center', marginTop: 8, color: '#A9A9A9' }} />
                                  <Text style={{ fontFamily: 'B', textAlign: 'center' }}>{context.provider.state.langselect ? "نئے ساتھی" : "New Comer"}</Text>
                                  <View style={{ width: 90, height: 1, backgroundColor: '#000', alignSelf: 'center', marginTop: 10 }}>
                                  </View>
                                  <Text style={styles.urduTextStyle}>{context.provider.state.langselect ? this.state.newComerloading ?
                                    'loading' : this.state.newComerData[0].ur_title.slice(0, 44) + "....." : this.state.newComerloading ? ' ' : this.state.newComerData[0].en_title} </Text>
                                </View>
                              </View>
                            </TouchableOpacity>

                          </View> */}


                        </View>

                      </ScrollView>



                    </View>






                    <View style={{ width: 80, backgroundColor: 'transparant' }}>
                      <ScrollView>
                        <TouchableOpacity
                          onPress={() => this.props.navigation.navigate('bayanatScreen')}>
                          <View style={styles.lftcontainer}>
                            <Text style={{ textAlign: 'center', color: '#737373', fontSize: 15, fontFamily: 'B' }}>{context.provider.state.langselect ? "بیانات" : "Lectures"}</Text>

                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => this.props.navigation.navigate('taleemScreen')}
                        >
                          <View style={styles.lftcontainer}>
                            <Text style={{ textAlign: 'center', alignSelf: 'center', color: '#737373', fontSize: 15, fontFamily: 'B' }}>{context.provider.state.langselect ? 'تعلیم' : 'Taleem'}</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => this.props.navigation.navigate('KotabScreen')}
                        >
                          <View style={styles.lftcontainer}>
                            <Text style={{ textAlign: 'center', color: '#737373', fontFamily: 'B', fontSize: context.provider.state.langselect ? 15 : 15 }}>{context.provider.state.langselect ? 'کتب' : 'Books'}</Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                       onPress={() => this.props.navigation.navigate('newComerScreen')}
                        >
                          <View style={styles.lftcontainer}>
                            <Text style={{ textAlign: 'center', color: '#737373', fontFamily: 'B', fontSize: context.provider.state.langselect ? 15 : 15 }}>{context.provider.state.langselect ? 'نئے ساتھی' : 'New Comers'} </Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => this.props.navigation.navigate('sawalJawabScreen')}
                        >
                          <View style={styles.lftcontainer}>
                            <Text style={{ textAlign: 'center', color: '#737373', fontFamily: 'B', fontSize: context.provider.state.langselect ? 15 : 15 }}>{context.provider.state.langselect ? 'سوال و جواب' : 'Q & A'} </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => this.props.navigation.navigate('naatyaKalamScreen')}
                        >
                          <View style={styles.lftcontainer}>
                            <Text style={{ textAlign: 'center', color: '#737373', fontFamily: 'B', fontSize: context.provider.state.langselect ? 15 : 15 }}>{context.provider.state.langselect ? 'نعتیہ کلام' : 'Naat'} </Text>
                          </View>
                        </TouchableOpacity>

                      </ScrollView>

                    </View>




                  </View> :
                  <View style={{ flex: 1, backgroundColor: '#f9f9f9', justifyContent: 'center', flexDirection: 'row' }}>

                    <View style={{ width: 80, backgroundColor: 'transparant', marginTop: 20 }}>

                      <ScrollView>
                        <TouchableOpacity
                          onPress={() => this.props.navigation.navigate('bayanatScreen')}>
                          <View style={styles.lftcontainer}>
                            <Text style={{ textAlign: 'center', color: '#737373', fontSize: 15, fontFamily: 'B' }}>{context.provider.state.langselect ? "بیانات" : "Lectures"
                            }</Text>

                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => this.props.navigation.navigate('taleemScreen')}
                        >
                          <View style={styles.lftcontainer}>
                            <Text style={{ textAlign: 'center', alignSelf: 'center', color: '#737373', fontSize: 15, fontFamily: 'B' }}>{context.provider.state.langselect ? 'تعلیم' : 'Taleem'}</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => this.props.navigation.navigate('KotabScreen')}
                        >
                          <View style={styles.lftcontainer}>
                            <Text style={{ textAlign: 'center', color: '#737373', fontFamily: 'B', fontSize: context.provider.state.langselect ? 15 : 15 }}>{context.provider.state.langselect ? 'کتب' : 'Books'}</Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('newComerScreen')}
                        >
                          <View style={styles.lftcontainer}>
                            <Text style={{ textAlign: 'center', color: '#737373', fontFamily: 'B', fontSize: context.provider.state.langselect ? 15 : 15 }}>{context.provider.state.langselect ? 'نئے  ساتھیں' : 'New Comers'} </Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => this.props.navigation.navigate('sawalJawabScreen')}
                        >
                          <View style={styles.lftcontainer}>
                            <Text style={{ textAlign: 'center', color: '#737373', fontFamily: 'B', fontSize: context.provider.state.langselect ? 15 : 15 }}>{context.provider.state.langselect ? 'سوال و جواب' : 'Q & A'} </Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => this.props.navigation.navigate('naatyaKalamScreen')}
                        >
                          <View style={styles.lftcontainer}>
                            <Text style={{ textAlign: 'center', color: '#737373', fontFamily: 'B', fontSize: context.provider.state.langselect ? 15 : 15 }}>{context.provider.state.langselect ? 'نعتیہ کلام' : 'Naat'} </Text>
                          </View>
                        </TouchableOpacity>

                      </ScrollView>

                    </View>







                    <View style={{ flex: 1, backgroundColor: 'transparnt' }}>
                      <ScrollView>
                        <View style={styles.container}>
                          <View style={{height:60,backgroundColor:'transparant',justifyContent:'center',alignSelf:'center'}}>
                          <Text style={{ fontSize: 20, fontFamily: 'B', alignSelf: 'center' }}> Latest</Text>
                          </View>
                          <View style={styles.container1} >
                            <TouchableOpacity
                              onPress={() => this.props.navigation.navigate('playerScreen',
                                {
                                  fullObject: this.state.bayanatData
                                }
                              )
                              }
                            >
                              <View style={styles.container3}>
                                <View style={{ width: 90, height: 80, marginBottom: 65, backgroundColor: "transparant" }}>
                                  <FontAwesome5 name="play" size={30} style={{ alignSelf: 'center', marginTop: 8, color: '#A9A9A9' }} />
                                  <Text style={{ fontFamily: 'B', textAlign: 'center' }}>{context.provider.state.langselect ? "بیانات" : "Lectures"}</Text>
                                  <View style={{ width: 90, height: 1, backgroundColor: '#000', alignSelf: 'center', marginTop: 8 }}>
                                  </View>


                                  <Text style={styles.urduTextStyle}>{context.provider.state.langselect ? this.state.loading ?
                                    'loading' : this.state.bayanatData[0].ur_title.slice(0,15)+'...' : this.state.loading ? ' ' : this.state.bayanatData[0].en_title.slice(0,30)+'...'} </Text>
                                </View>
                              </View>
                            </TouchableOpacity>


                            <TouchableOpacity
                              onPress={() => this.props.navigation.navigate('playerScreen',
                                {
                                  fullObject: this.state.taleemData
                                }
                              )
                              }
                            >
                              <View style={styles.container3}>
                                <View style={{ width: 90, height: 80, marginBottom: 65, backgroundColor: "transparant" }}>
                                  <FontAwesome5 name="play" size={30} style={{ alignSelf: 'center', marginTop: 8, color: '#A9A9A9' }} />
                                  <Text style={{ fontFamily: 'B', textAlign: 'center' }}>{context.provider.state.langselect ? "تعلیم" : "Taleem"}</Text>
                                  <View style={{ width: 90, height: 1, backgroundColor: '#000', alignSelf: 'center', marginTop: 8 }}>
                                  </View>
                                  <Text style={styles.urduTextStyle}>{context.provider.state.langselect ? this.state.taleemlodaing ?
                                    'loading' : this.state.taleemData[0].ur_name.slice(0,15)+'...' : this.state.taleemlodaing ? ' ' : this.state.taleemData[0].en_name.slice(0,30)+'...'} </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>




                          <View style={styles.container1} >
                            <TouchableOpacity
                              onPress={() => this.props.navigation.navigate('playerScreen',
                                {
                                  fullObject: this.state.naatData
                                }
                              )
                              }
                            >
                              <View style={styles.container3}>
                                <View style={{ width: 90, height: 80, marginBottom: 65, backgroundColor: "transparant" }}>
                                  <FontAwesome5 name="play" size={30} style={{ alignSelf: 'center', marginTop: 8, color: '#A9A9A9' }} />
                                  <Text style={{ fontFamily: 'B', textAlign: 'center' }}>{context.provider.state.langselect ? "نعتیہ کلام" : "Naat"}</Text>
                                  <View style={{ width: 90, height: 1, backgroundColor: '#000', alignSelf: 'center', marginTop:8 }}>
                                  </View>
                                  <Text style={styles.urduTextStyle}>{context.provider.state.langselect ? this.state.naatlodaing ?
                                    'loading' : this.state.naatData[0].ur_name.slice(0,15)+'...' : this.state.naatlodaing ? ' ' : this.state.naatData[0].en_name.slice(0,30)+'....'} </Text>
                                </View>
                              </View>
                            </TouchableOpacity>


                            <TouchableOpacity
                              onPress={() => this.props.navigation.navigate('playerScreen',
                                {
                                  fullObject: this.state.qaData
                                }
                              )
                              }
                            >
                              <View style={styles.container3}>
                                <View style={{ width: 90, height: 80, marginBottom: 65, backgroundColor: "transparant" }}>
                                  <FontAwesome5 name="play" size={30} style={{ alignSelf: 'center', marginTop: 8, color: '#A9A9A9' }} />
                                  <Text style={{ fontFamily: 'B', textAlign: 'center' }}>{context.provider.state.langselect ? "سوال و جواب" : "Q & A"}</Text>
                                  <View style={{ width: 90, height: 1, backgroundColor: '#000', alignSelf: 'center', marginTop: 8 }}>
                                  </View>
                                  <Text style={styles.urduTextStyle}>{context.provider.state.langselect ? this.state.qaloading ?
                                    'loading' : this.state.qaData[0].ur_title : this.state.qaloading ? ' ' : this.state.qaData[0].en_title.slice(0, 40) + "....."} </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>



                          {/* <View style={styles.container1} >
                            <TouchableOpacity
                              onPress={() => this.props.navigation.navigate('playerScreen',
                                {
                                  fullObject: this.state.newComerData
                                }
                              )
                              }
                            >
                              <View style={styles.container3}>
                                <View style={{ width: 90, height: 80, marginBottom: 65, backgroundColor: "transparant" }}>
                                  <FontAwesome5 name="play" size={30} style={{ alignSelf: 'center', marginTop: 8, color: '#A9A9A9' }} />
                                  <Text style={{ fontFamily: 'B', textAlign: 'center' }}>{context.provider.state.langselect ? "نئے  ساتھیں" : "New Comer"}</Text>
                                  <View style={{ width: 90, height: 1, backgroundColor: '#000', alignSelf: 'center', marginTop: 8 }}>
                                  </View>
                                  <Text style={styles.urduTextStyle}>{context.provider.state.langselect ? this.state.newComerloading ?
                                    'loading' : this.state.newComerData[0].ur_title : this.state.newComerloading ? ' ' : this.state.newComerData[0].en_title.slice(0, 40) + "....."} </Text>
                                </View>
                              </View>
                            </TouchableOpacity>

                          </View>
 */}

                        </View>
                      </ScrollView>



                    </View>

                  </View>}




                {/* </View> */}



              </View>

            }




          </View >
        }
      </ThemeContext.Consumer>

    )
  }
}



const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
      justifyContent: 'center',
      justifyContent: 'space-evenly',

    },
    container1: {
      height: 170,
      width: '100%',
      backgroundColor: '#f9f9f9',
      flexDirection: 'row',
      marginVertical: 5,
      justifyContent: 'center',
      // justifyContent: 'space-evenly',

    },
    // container2: {

    //   width: 90,
    //   height: 90,
    //   borderRadius: 20,
    //   backgroundColor: 'green',
    //   justifyContent: 'center',
    //   shadowOffset: {
    //     width: 0,
    //     height: 2,
    //   },
    //   shadowOpacity: 0.25,
    //   shadowRadius: 3.84,
    //   elevation: 5,
    //   // marginHorizontal:10

    // },
    container3: {
      width: 110,
      // height: 150,
      marginTop: 20,
      justifyContent: 'center',
      backgroundColor: '#ffff',
      // borderRadius: 20,
      marginHorizontal: 10,
      shadowOpacity: 3,
      shadowRadius: 4,
      elevation: 4,
      bottom: 5,
      // top:5,
      alignItems: 'center',
      alignContent: 'center'
    },
    urduTextStyle: {
      alignSelf: 'flex-end',

      fontSize: 12,
      color: '#7c769c',
      fontFamily: 'B'
    },
    engTextStyle: {
      alignSelf: 'flex-end',
      marginRight: 30,
      fontSize: 12,
      color: '#7c769c',
      fontFamily: 'B'
    },

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


  }


)