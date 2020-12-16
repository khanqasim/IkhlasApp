import React, { version } from 'react';
import { Text, View, Image, TextInput, StyleSheet, ScrollView, flexDirection } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../AppContext';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class BayanatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      context: null,
      index: 0,
    }

  }

  renderTab = () => {
    if (this.state.index == 0) {
      return (
        <View style={styles.inBoxStyle} >
          {this.state.context.provider.state.langselect ?
            <View style={{ flex: 1, alignSelf: 'center' }}>

              <Text style={{ fontFamily: 'B', alignSelf: 'center', marginRight: 8, fontSize: 18 }}>

                صحت
          </Text>
              <Text style={{ fontFamily: 'B', alignSelf: 'center', marginRight: 8 }}>
                ہمارے چیریٹی فنڈنگ نیٹ ورک دنیا بھر میں ہے. خیرات بہتر زندگی دیتا ہے.

        </Text>
            </View> :
            <View style={{ flex: 1, alignSelf: 'center' }} >
              <Text style={{ fontFamily: 'B', alignSelf: 'center', marginRight: 8, fontSize: 18 }}>

                Health
              </Text>
              <Text style={{ fontFamily: 'B', alignSelf: 'center', marginLeft: 8, }}>

                Health
                Our charity funding network is worldwide. The charity makes a better life.

               </Text>

            </View>
          }




        </View>
      )

    } else if (this.state.index == 1) {
      return (
        <View style={styles.inBoxStyle}>
          {this.state.context.provider.state.langselect ?
            <View style={{ flex: 1, alignSelf: 'center' }}  >
              <Text style={{ fontFamily: 'B', alignSelf: 'center', marginRight: 8, fontSize: 18 }}>


                تعلیم
                </Text>
              <Text style={{ fontFamily: 'B', alignSelf: 'center', marginRight: 8 }}>
                ہمارے چیریٹی فنڈنگ نیٹ ورک دنیا بھر میں ہے. خیرات بہتر زندگی دیتا ہے.

                  </Text>

            </View> :
            <View style={{ flex: 1, alignSelf: 'center' }}  >
              <Text style={{ fontFamily: 'B', alignSelf: 'center', marginRight: 8, fontSize: 18 }}>


                Education
                  </Text>
              <Text style={{ fontFamily: 'B', alignSelf: 'center', marginRight: 8 }}>
                Our charity funding network is worldwide. The charity makes a better life.

            </Text>

            </View>}



        </View>
      )
    }
    else if (this.state.index == 2) {
      return (
        <View style={styles.inBoxStyle}>
          {this.state.context.provider.state.langselect ?
            <View style={{ flex: 1, alignSelf: 'center' }}>
              <Text style={{ fontFamily: 'B', alignSelf: 'center', marginRight: 8, fontSize: 18 }}>
                فلاحی سرگرمیاں

              </Text>
              <Text style={{ fontFamily: 'B', alignSelf: 'center', marginRight: 8 }}>
                ہمارے چیریٹی فنڈنگ نیٹ ورک دنیا بھر میں ہے. خیرات بہتر زندگی دیتا ہے.

         </Text>

            </View> : <View style={{ flex: 1, alignSelf: 'center' }}>
              <Text style={{ fontFamily: 'B', alignSelf: 'center', marginRight: 8, fontSize: 18 }}>
                Social Welfare

              </Text>
              <Text style={{ fontFamily: 'B', alignSelf: 'center', marginRight: 8 }}>
                Our charity funding network is worldwide. The charity makes a better life.

         </Text>

            </View>}


        </View>
      )
    }
    else if (this.state.index == 3) {
      return (
        <View style={styles.inBoxStyle}>
          {this.state.context.provider.state.langselect ?
            <View style={{ flex: 1, alignSelf: 'center' }}>
              <Text style={{ fontFamily: 'B', alignSelf: 'center', marginRight: 8, fontSize: 18 }}>

                رضا کار بنیے

           </Text>
              <Text style={{ fontFamily: 'B', alignSelf: 'center', marginRight: 8 }}>
                ہمارے چیریٹی فنڈنگ نیٹ ورک دنیا بھر میں ہے. خیرات بہتر زندگی دیتا ہے.

              </Text>

            </View> : <View style={{ flex: 1, alignSelf: 'center' }}>
              <Text style={{ fontFamily: 'B', alignSelf: 'center', marginRight: 8, fontSize: 18 }}>


                Become Volunteer

               </Text>
              <Text style={{ fontFamily: 'B', alignSelf: 'center', marginRight: 8 }}>
                Our charity funding network is worldwide. The charity makes a better life.

                  </Text>
            </View>}



        </View>
      )
    }
    else if (this.state.index == 4) {
      return (
        <View style={styles.inBoxStyle}>
          {this.state.context.provider.state.langselect ?
            <View style={{ flex: 1, alignSelf: 'center' }}>
              <Text style={{ fontFamily: 'B', alignSelf: 'center', marginRight: 8, fontSize: 18 }}>
                یتیم

               </Text>
              <Text style={{ fontFamily: 'B', alignSelf: 'center', marginRight: 8 }}>
                ہمارے چیریٹی فنڈنگ نیٹ ورک دنیا بھر میں ہے. خیرات بہتر زندگی دیتا ہے.

          </Text>

            </View> : <View style={{ flex: 1, alignSelf: 'center' }}>
            <Text style={{ fontFamily: 'B', alignSelf: 'center', marginRight: 8, fontSize: 18 }}>
            Orphan

               </Text>
          <Text style={{ fontFamily: 'B', alignSelf: 'center', marginRight: 8 }}>
          Our charity funding network is worldwide. The charity makes a better life.

          </Text>
            </View>}



        </View>
      )
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

          <View style={{ flex: 1, backgroundColor: '#f6f6f6', }}>

            {/* <GeneralStatusBarColor  navigation={this.props.navigation} source ={require('../assets/islamic1.jpg')}   screen='home'  backgroundColor='transparent' /> */}
            {this.setContext(context)}
            {context.provider.state.langselect ?
              <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
                <View style={{ flex: 1, backgroundColor: 'transparant', flexDirection, }} >
                  <View style={{ height: 50, width: 100, backgroundColor: 'transparant', alignSelf: 'center', marginTop: 5, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ alignSelf: 'center', fontSize: 18, color: '#7c769c', fontFamily: 'B' }}> ویلفیئر سوسائٹی</Text>
                    {/* <AntDesign name="arrowleft" size={20} style={{alignSelf:'center',color:'#7c769c'}} /> */}
                  </View>
                  <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff', shadowOpacity: 0.30, shadowRadius: 2, elevation: 3 }}>
                    {this.renderTab()}

                  </View>


                </View>
                <View style={{ width: 80, backgroundColor: 'transparant', justifyContent: 'center', marginTop: 50 }}>

                  <ScrollView>
                    <TouchableOpacity
                      onPress={() => this.setState({ index: 0 })}>
                      <View style={styles.lftcontainer}>
                        {/* <Ionicons name="moon" size={25} style={{ alignSelf: 'center', color: '#7a7778' }} /> */}
                        <Text style={{ textAlign: 'center', color: '#737373', fontSize: 15, fontFamily: 'B' }}>صحت</Text>

                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.setState({ index: 1 })}>
                      <View style={styles.lftcontainer}>
                        {/* <FontAwesome5 name="pen-nib" size={25} style={{ alignSelf: 'center', color: '#7a7778' }} /> */}

                        <Text style={{ textAlign: 'center', color: '#737373', fontSize: 15, fontFamily: 'B' }}> تعلیم </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.setState({ index: 2 })}>
                      <View style={styles.lftcontainer}>
                        <MaterialCommunityIcons name="human-male-child" size={25} style={{ alignSelf: 'center', color: '#7a7778' }} />
                        <Text style={{ textAlign: 'center', color: '#737373', fontSize: 15, fontFamily: 'B' }}>  فلاحی سرگرمیاں
                            </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.setState({ index: 3 })}>
                      <View style={styles.lftcontainer}>
                        <Text style={{ textAlign: 'center', color: '#737373', fontSize: 15, fontFamily: 'B' }}> رضا کار بنیے</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.setState({ index: 4 })}>
                      <View style={styles.lftcontainer}>
                        <Text style={{ textAlign: 'center', color: '#737373', fontSize: 15, fontFamily: 'B' }}>  کفالت یتیم </Text>
                      </View>
                    </TouchableOpacity>


                  </ScrollView>




                </View>
              </View> :

              <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
                <View style={{ width: 80, backgroundColor: 'transparant', justifyContent: 'center', marginTop: 50 }}>

                  <ScrollView>
                    <TouchableOpacity
                      onPress={() => { this.setState({ index: 0 }) }}>
                      <View style={styles.lftcontainer}>
                        {/* <Ionicons name="moon" size={25} style={{ alignSelf: 'center', color: '#7a7778' }} /> */}
                        <Text style={{ textAlign: 'center', color: '#737373', fontSize: 15, fontFamily: 'B' }}>Health</Text>

                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => { this.setState({ index: 1 }) }}>
                      <View style={styles.lftcontainer}>
                        {/* <FontAwesome5 name="pen-nib" size={25} style={{ alignSelf: 'center', color: '#7a7778' }} /> */}

                        <Text style={{ textAlign: 'center', color: '#737373', fontSize: 15, fontFamily: 'B' }}> Education </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => { this.setState({ index: 2 }) }}>
                      <View style={styles.lftcontainer}>
                        {/* <MaterialCommunityIcons name="human-male-child" size={25} style={{ alignSelf: 'center', color: '#7a7778' }} /> */}
                        <Text style={{ textAlign: 'center', color: '#737373', fontSize: 15, fontFamily: 'B' }}>Social Welfare</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => { this.setState({ index: 3 }) }}>
                      <View style={styles.lftcontainer}>
                        <Text style={{ textAlign: 'center', color: '#737373', fontSize: 15, fontFamily: 'B' }}> Become Volunteer</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => { this.setState({ index: 4 }) }}>
                      <View style={styles.lftcontainer}>
                        <Text style={{ textAlign: 'center', color: '#737373', fontSize: 15, fontFamily: 'B' }}>  Orphan </Text>
                      </View>
                    </TouchableOpacity>

                  </ScrollView>
                </View>
                <View style={{ flex: 1, backgroundColor: 'transparant', flexDirection, }} >
                  <View style={{ height: 50, backgroundColor: 'transparant', alignSelf: 'center', marginTop: 5, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ alignSelf: 'center', fontSize: 15, color: '#7c769c', fontFamily: 'B' }}>Welfare Society</Text>
                    {/* <AntDesign name="arrowleft" size={20} style={{alignSelf:'center',color:'#7c769c'}} /> */}
                  </View>
                  <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff', shadowOpacity: 0.30, shadowRadius: 2, elevation: 3 }}>
                    {this.renderTab()}

                  </View>


                </View>




              </View>}


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
    elevation: 4,
    bottom: 5

  },
  inBoxStyle: {
    width: '90%',
    height: '50%',
    alignSelf: 'center',
    // backgroundColor:'red'
    backgroundColor: '#ffff',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    bottom: 5
  }
})