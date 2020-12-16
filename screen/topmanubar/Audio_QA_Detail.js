import React, { version } from 'react';
import { Text, View, Image, TextInput, StyleSheet, FlatList, style, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ThemeContext } from '../AppContext';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class Audio_QA_Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      context: null,
      audio_QA_Array: [],
    }
  }

  componentDidMount() {
    this.audio_QA_Function()

  }
  audio_QA_Function = () => {

    fetch("http://ikhlas.info/api/question-audio-catgory/" + this.props.navigation.state.params.Audio_QA, {
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
          audio_QA_Array: responseJson.data,

        },
          () => {
            this.getAudio_QA(this.state.audio_QA_Array)
          }
        )
        // console.log('My Array', this.state.bayanatData)


      })
      .catch(function (error) {
        console.log(error);
      });

  }

  getAudio_QA = (audio_QA_Array) => {
    let mArray = []
    let url1 = "https://drive.google.com/uc?id="
    let url2 = "&export=media"
    for (let i = 0; i < audio_QA_Array.length; i++) {
      mArray.push({
        id: audio_QA_Array[i].id,
        en_title: audio_QA_Array[i].en_title,
        ur_title: audio_QA_Array[i].ur_title,
        url: url1 + audio_QA_Array[i].basename + url2,
        // url: "https://drive.google.com/uc?id=1jIoN6gPGutdrQrfgjHs6JzNw4rW4dY_5&export=media",
        created_at: audio_QA_Array[i].created_at,
      })

    }
    this.setState({ audio_QA_Array: mArray })

  }


  setContext = (context) => {
    this.state.context = context
    return null
  }


  render() {
    return (
      <ThemeContext.Consumer>
        {(context) =>

          <View style={{ flex: 1, backgroundColor: '#ffff' }}>
            {/* <GeneralStatusBarColor  navigation={this.props.navigation} source ={require('../assets/islamic1.jpg')}   screen='home'  backgroundColor='transparent' /> */}
            {this.setContext(context)}
            <View style={{ flex: 1, backgroundColor: '#f6f6f6', justifyContent: 'center' }}>
              <FlatList
                data={this.state.audio_QA_Array}
                renderItem={({ item, index }) =>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('playerScreen',
                      {
                        fullObject: item
                      }
                    )}>
                    {/* {console.log("this is url"+item.url)} */}
                    {context.provider.state.langselect ?
                      <View style={[styles.flatelistStyle, { justifyContent: 'flex-end' }]}>




                        <Text style={[styles.textStyle, { fontFamily: 'B', marginRight: 8 }]}>{item.ur_title.slice(0, 55) + '...'}</Text>
                        <AntDesign name="caretleft" size={20} style={{ alignSelf: 'center', color: '#A9A9A9', marginRight: 8 }} />


                      </View> :
                      <View style={styles.flatelistStyle}>


                        <FontAwesome5 name="play" size={20} style={{ alignSelf: 'center', color: '#A9A9A9', marginLeft: 14 }} />

                        <Text style={[styles.textStyle, { fontFamily: 'B' }]}>{item.en_title.slice(0, 40) + '...'}</Text>



                      </View>
                    }

                  </TouchableOpacity>
                }
              />

            </View>

          </View>

        }
      </ThemeContext.Consumer>
    )
  }
}

const styles = StyleSheet.create({
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
  //   imageStyle: {
  //     width: 20,
  //     height: 20,
  //     borderRadius: 20,
  //     borderWidth: 2,
  //     // borderColor:'#d35647',
  //     resizeMode: 'contain',
  //     margin: 5,
  //     alignContent: 'flex-start'
  //   },
  textStyle: {
    fontSize: 15,
    alignSelf: 'center',
    // color:'#ffff',
    marginLeft: 12
  }
})