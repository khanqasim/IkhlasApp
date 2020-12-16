import React, { version } from 'react';
import { Text, View, Image, TextInput, StyleSheet, FlatList, style, TouchableOpacity, StatusBar } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ThemeContext } from '../AppContext';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class NaatyaKalamScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       context: null,
      naat_ya_Kalam_Array: [],
    }
  }

  componentDidMount() {

    this.naat_ya_Kalam_Function()

  }
  naat_ya_Kalam_Function = () => {

    fetch("http://ikhlas.info/api/all-naat", {
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
          naat_ya_Kalam_Array: responseJson.data,

        },
          () => {
            this.getNaat_ye_kalam(this.state.naat_ya_Kalam_Array)
          }
        )
        // console.log('My Array', this.state.bayanatData)


      })
      .catch(function (error) {
        console.log(error);
      });

  }

  getNaat_ye_kalam = (naat_ya_Kalam_Array) => {
    let mArray = []
    let url1 = "https://drive.google.com/uc?id="
    let url2 = "&export=media"
    for (let i = 0; i < naat_ya_Kalam_Array.length; i++) {
      mArray.push({
        id: naat_ya_Kalam_Array[i].id,
        en_name: naat_ya_Kalam_Array[i].en_name,
        ur_name: naat_ya_Kalam_Array[i].ur_name,
        url: url1 + naat_ya_Kalam_Array[i].url + url2,
        // url: "https://drive.google.com/uc?id=1jIoN6gPGutdrQrfgjHs6JzNw4rW4dY_5&export=media",
        created_at: naat_ya_Kalam_Array[i].created_at,
      })

    }
    this.setState({ naat_ya_Kalam_Array: mArray })

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
                data={this.state.naat_ya_Kalam_Array}
                renderItem={({ item, index }) =>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('playerScreen',
                      {
                        fullObject:item
                      }
                    )}>
                      {context.provider.state.langselect?
                      <View style={[styles.flatelistStyle,{justifyContent:'flex-end'}]}>


                      

                      <Text style={[styles.textStyle, { fontFamily: 'B',marginRight:8 }]}>{item.ur_name }</Text>
                      <AntDesign name="caretleft" size={20} style={{alignSelf:'center', color: '#A9A9A9',marginRight:8 }} />


                    </View>:
                    <View style={styles.flatelistStyle}>


                    <FontAwesome5 name="play" size={20} style={{ alignSelf: 'center', color: '#A9A9A9', marginLeft: 14 }} />

                    <Text style={[styles.textStyle, { fontFamily: 'B' }]}>{item.en_name}</Text>



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