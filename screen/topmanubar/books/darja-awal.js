import React, { version } from 'react';
import { Text, View, Image, TextInput, StyleSheet, FlatList, style, ImageBackground,PermissionsAndroid } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BottomNavigation } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ThemeContext } from '../../AppContext';
// import PDFExample from '../books/pdpBookRead';
// import PropTypes from 'prop-types';
import RNFetchBlob from 'rn-fetch-blob';


export default class DarjaAwal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // navigation: this.props.navigation,
      booksDataArray: [],
      context: null,

    }
  }
  componentDidMount() {
    this.getBooksData()
  }




  getBooksData = () => {
    fetch("http://ikhlas.info/api/book/" + this.props.navigation.state.params.bookid, {
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
          booksDataArray: responseJson.data,

        },
          () => {
            this.getBooksDataArray(this.state.booksDataArray)
          }
        )
        // console.log('My Array', this.state.bayanatData)


      })
      .catch(function (error) {
        console.log(error);
      });


  }


  getBooksDataArray = (booksDataArray) => {
    let mArray = []
    let url1 = "https://drive.google.com/uc?id="
    let url2 = "&export=media"
    for (let i = 0; i < booksDataArray.length; i++) {
      mArray.push({
        id: booksDataArray[i].id,
        en_name: booksDataArray[i].en_name,
        ur_name: booksDataArray[i].ur_name,
        url: url1 + booksDataArray[i].basename + url2,
        image: booksDataArray[i].image,
        // url: "https://drive.google.com/file/d/16bP6oh1Jk_XMxohC9xomN5x-_b5zL2Uw/view",
        created_at: booksDataArray[i].created_at,


      })

    }
    this.setState({ booksDataArray: mArray })

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
      .fetch('GET',url, {})
      .then((res) => {
        console.log('The file saved to ', res.path());
      })
      .catch((e) => {
        console.log(e)
      });
  }

  downloadFile = async(url) => {
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

          <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
            {/* <ImageBackground style={{flex:1, resizeMode: "cover",justifyContent: "center"}} source={require('../../../assets/islamic1.jpg')}> */}
            {/* <GeneralStatusBarColor  navigation={this.props.navigation} source ={require('../assets/islamic1.jpg')}   screen='home'  backgroundColor='transparent' /> */}
            {this.setContext(context)}
            <View style={{ flex: 1, backgroundColor: 'transparant', justifyContent: 'center', marginTop: 20 }}>

              <FlatList
                data={this.state.booksDataArray}
                numColumns={2}
                renderItem={({ item }) =>

                  <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>

                    <View style={styles.flatelistStyle2}>
                      <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('pdfExample',
                          {
                            BookPath: item.url
                          })}
                      >
                        <Image style={{ width: 120, height: 160, alignSelf: 'center' }} source={{ uri: "http://ikhlas.info/uploads/" + item.image }} />
                      </TouchableOpacity>
                      <Text style={{ marginRight: 5, fontFamily: 'B' }}>{context.provider.state.langselect ? item.ur_name : item.en_name}</Text>
                      <TouchableOpacity
                       onPress={()=>this.downloadFile(item.url)}>
                         {context.provider.state.langselect?
                        <AntDesign name="download" size={20} color={'red'}
                        style={{marginBottom:8}}/>:<AntDesign name="download" size={20} color={'red'}
                         style={{alignSelf:'flex-end',marginBottom:8}}/>
                      }
                      </TouchableOpacity>
                    </View>

                    {/* <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('pdfExample')}
                > */}

                    {/* <View style={styles.flatelistStyle2}> */}
                    {/* <Image style={{ width: 100, height: 100, alignSelf: 'center' }} source={item.logo}>
                    </Image> */}
                    {/* <Text style={{ marginLeft: 5, }}>{item.ur_name}</Text>
                  </View> */}
                    {/* </TouchableOpacity> */}


                  </View>

                }
              />


            </View>
            {/* </ImageBackground> */}

          </View>
        }
      </ThemeContext.Consumer>

    )
  }
}

// DarjaAwal.propTypes = {
//     navigation: PropTypes.func.isRequired,
//   }
const styles = StyleSheet.create({
  flatelistStyle: {
    width: '85%',
    height: 60,
    // justifyContent:'center',
    alignSelf: 'center',
    backgroundColor: '#ffff',
    // justifyContent:'center',
    flexDirection: 'row',
    marginTop: 12,
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
    borderRadius: 25,
    bottom: 5
  },
  imageStyle: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 2,
    // borderColor:'#d35647',
    resizeMode: 'contain',
    margin: 5,
    alignContent: 'flex-start'
  },
  textStyle: {
    fontSize: 15,
    marginTop: 7,
    // color:'#ffff',
    marginLeft: 12
  },
  flatelistStyle2: {
    width: 120,
    // height: 170,
    backgroundColor: '#ffff',
    marginTop: 8,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf:'center',
    // flexDirection:'column',
    // borderRadius:,
    marginHorizontal: 30,
    marginVertical: 30,
    marginTop: 10,
  },



 
})