// import React, { version } from 'react';
// import { Text, View, Image, TextInput, StyleSheet, ScrollView,flexDirection, ImageBackground } from 'react-native';

// import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
// import PropTypes  from 'prop-types';
// import { Fab } from 'native-base';
// export default class FlateListScreen extends React.Component {
    
//     constructor(props){
        
//         super(props);
//         this.state={
//           Array:this.props.Array
              
//         }
//       }

//       changeData = (Array) =>{
//         //   let Array = this.props.Array
        
//         this.setState({
//               Array: Array
//           })
//       }
//          render(){
//              return(
//                  <View style={{flex:1}}>
//                      <FlatList
//                        data={this.state.Array}
                       
//                        renderItem={({item,index})=>
//                        <View style={{width:'100%',height:'100%',backgroundColor:'green',justifyContent:'center',flexDirection:'row'}}>
                           
//                        {/* <Image style={styles.imageStyle} source = {item.logo}>
                                   
//                                </Image> */}
                          
//                             <Text style={{fontSize:15,color:'#ffff'}}>{item.name}</Text>
//                        </View>
//                     }
//                      />
//                  </View>
//              )
//          }    
// }

// FlateListScreen.propTypes = {
//     // screen: PropTypes.func.isRequired,
//     // context: PropTypes.func.isRequired,
//     Array: PropTypes.array.isRequired,
//     // isSelect: PropTypes.func.isRequired
//   }

// const styles = StyleSheet.create({
//     imageStyle:{  
//         width:100,
//         height:100,
//         borderWidth:2,
//         borderColor:'#d35647',
//         resizeMode:'contain',
//         margin:8

//     }
// })