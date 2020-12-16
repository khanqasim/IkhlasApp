import React, { version } from 'react';
import { Text, View, Image, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import BayanatScreen from './topmanubar/bayanatDetails';
import TaleemScreen from './topmanubar/taleemDetails';
import KotabScreen from './topmanubar/KotabDetails';
// import NaatyaKalamScreen from './topmanubar/naat-ya-kalam';
import NewComersScreen from './topmanubar/NewComers';
import SawalJawabScreen from './topmanubar/sawalJawab';
import WelfarTrustScreen from './bottombarScreen/welfarTrust';
import ImportantLinksScreen from './bottombarScreen/importantLinks';
import ContactUsScreen from './bottombarScreen/contactUs';
import IntroductionScreen from './bottombarScreen/introduction';
import MainScreen from './mainScreen';
import PropTypes from 'prop-types';
import { ThemeContext } from './AppContext';


export default class CardScreen extends React.Component {


  constructor(props) {

    super(props)
    // this.child = React.createRef();
    this.state = {
      context:null,
      
      myUrduData: [
        {
          id: 1,
          text: 'سوال و جواب ',
        },
        {
          id: 2,
          text: 'نئے ساتھی',
        },
        
        {
          id: 3,
          text: 'کتب',
        },
        {
          id: 4, text: ' تعلیم ',
        },
        {
          id: 5, text: 'بیانات',
        },

      ],
      myEngData: [
        {
          id: 1,
          text: 'Q & A',
        },
        {
          id: 2,
          text: 'New Comers ',
        },
        {
          id: 3,
          text: 'Books',
        },
        {
          id: 4, text: 'Taleem',
        },
        {
          id: 5, text: 'Lectures',
        },

      ],
      index: 0

    }
  }
  setContext=(context)=>{
   this.state.context=context
   return null
  }

  renderTab = () => {
    switch (this.state.index) {
      case 9:
        return <IntroductionScreen navigation={this.props.navigation}></IntroductionScreen>
      case 8:
        return <ContactUsScreen navigation={this.props.navigation}></ContactUsScreen>
      case 7:
        return <ImportantLinksScreen navigation={this.props.navigation}></ImportantLinksScreen>
      case 6:
        return <WelfarTrustScreen navigation={this.props.navigation}></WelfarTrustScreen>
      case 5:
        return <BayanatScreen navigation={this.props.navigation}></BayanatScreen>
      case 4:
        return <TaleemScreen navigation={this.props.navigation}></TaleemScreen>
      case 3:
        return <KotabScreen navigation={this.props.navigation}></KotabScreen>
      case 2:
        return <NewComersScreen navigation={this.props.navigation}></NewComersScreen>
      case 1:
        return <SawalJawabScreen navigation={this.props.navigation}></SawalJawabScreen>

      default:
        return <MainScreen navigation={this.props.navigation} screenName={"MainIndex"} ref={this.child}  ></MainScreen>

    }


  }
  render() {
    return (
      <ThemeContext.Consumer>
        {(context)=>

      <View style={{ flex: 1, backgroundColor: '#7c769c', justifyContent: 'center' }}>

      {this.setContext(context)}
        <View style={{ flex: .1, backgroundColor: '#7c769c', alignSelf: 'center' }}>
         {context.provider.state.langselect?
           <FlatList
           horizontal
           data={this.state.myUrduData}
           renderItem={({ item, index }) =>

             <View style={{ flex: .1, justifyContent: 'center', backgroundColor: '#ffff' }}>
               <TouchableOpacity style={{ justifyContent: 'center' }}

                 onPress={() => { this.setState({ index: index + 1 }) }}
               >

                 <View style={{ width: 80, height: 60,marginHorizontal:1, backgroundColor: '#7c769c',justifyContent:'center' }}
                 >
                   <Text style={{ textAlign: 'center', color: '#ffff', fontFamily: 'B',fontSize:18, }}>{item.text}</Text>
                 </View>
               </TouchableOpacity>
             </View>

           }
         />:
         <FlatList
         horizontal
         data={this.state.myEngData}
         renderItem={({ item, index }) =>

           <View style={{ flex: .1, justifyContent: 'center', backgroundColor: '#ffff' }}>
             <TouchableOpacity style={{ justifyContent: 'center', justifyContent: 'space-evenly' }}

               onPress={() => { this.setState({ index: index + 1 }) }}
             >

               <View style={{ width: 80, height: 60, justifyContent: 'center',marginHorizontal:1, backgroundColor: '#7c769c' }}
               >
                 <Text style={{ textAlign: 'center', color: '#ffff', fontFamily: 'B',fontSize:15 }}>{item.text}</Text>
               </View>
             </TouchableOpacity>
           </View>

         }
       />

         }
        </View>
        <View style={{ flex: 1 }}>

          {this.renderTab()}


        </View>

        <View style={{ width: '100%', height: 60, backgroundColor: 'red' }}>
          <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#f6f6f7', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', }}>


            <TouchableOpacity style={[styles.bottomIcon, {backgroundColor: this.state.index === 6 ? '#7c769c' : '#f6f6f7'}] }
              onPress={() => this.setState({ index: 6 })}
            >
              <Entypo name="home" size={20} style={{ alignSelf: 'center' }} color={this.state.index === 6 ? "#fff" : '#000'} />
              <Text style={{ textAlign: 'center', fontFamily: 'B', color: this.state.index === 6 ? '#fff' : '#000',fontSize:context.provider.state.langselect?13:9 }}>{context.provider.state.langselect?'ویلفیئر سوسائٹی':'Welfare Society'} </Text>
            </TouchableOpacity>



            <TouchableOpacity style={[styles.bottomIcon ,{ backgroundColor: this.state.index === 7 ? '#7c769c' : '#f6f6f7'} ]}
              onPress={() => this.setState({ index: 7 })} >

              <Entypo name="link" size={20} style={{ alignSelf: 'center' }} color={this.state.index === 7 ? "#fff" : '#000'} />
              <Text style={{ alignSelf: 'center', fontFamily: 'B', color: this.state.index === 7 ? '#fff' : '#000',fontSize:context.provider.state.langselect?13:9 }}> {context.provider.state.langselect?'اہم لنکس':'Important Links'}</Text>
            </TouchableOpacity>


            <TouchableOpacity style={[styles.bottomIcon,{backgroundColor: this.state.index === 8 ? '#7c769c' : '#f6f6f7'}]}
              onPress={() => this.setState({ index: 8 })}
            >
              <FontAwesome name="phone" size={20} style={{ alignSelf: 'center' }} color={this.state.index === 8 ? "#fff" : '#000'} />
              <Text style={{ alignSelf: 'center', fontFamily: 'B', color: this.state.index === 8 ? '#fff' : '#000',fontSize:context.provider.state.langselect?13:9 }}>{context.provider.state.langselect?'براے رابطہ':'Contact Us'} </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.bottomIcon,{backgroundColor: this.state.index === 9 ? '#7c769c' : '#f6f6f7'}]}
              onPress={() => this.setState({ index: 9 })}
            >
              <FontAwesome5 name="users" size={15} style={{ alignSelf: 'center' }} color={this.state.index === 9 ? "#fff" : '#000'} />
              <Text style={{ alignSelf: 'center', textAlign: 'center', fontFamily: 'B', color: this.state.index === 9 ? '#fff' : '#000',fontSize:context.provider.state.langselect?13:9 }}>{context.provider.state.langselect?'تعارف':'About Us'}</Text>
            </TouchableOpacity >

            <TouchableOpacity style={[styles.bottomIcon,{ backgroundColor: this.state.index === 0 ? '#7c769c' : '#f6f6f7'}]}
              onPress={() => this.setState({ index: 0 })}
            >
              <FontAwesome5 name="home" size={15} style={{ alignSelf: 'center' }} color={this.state.index === 0 ? "#fff" : '#000'} />
              <Text style={{ alignSelf: 'center', textAlign: 'center', fontFamily: 'B', color: this.state.index === 0 ? '#fff' : '#000',fontSize:context.provider.state.langselect?13:10 }}>{context.provider.state.langselect?'سرورق':'Home'}</Text>
            </TouchableOpacity >

          </View>



        </View>

      </View>

            }
      </ThemeContext.Consumer>

    )
  }
}



CardScreen.propTypes = {
  navigation: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: 5,
    marginHorizontal: 10

  },
  item: {

    width: '10%',

  },
  cardView: {
    // flex: Platform.OS=='android' ?.6:.5 ,
    width: '30%',
    height: '50%',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    marginVertical: 12
  },
  bottomIcon: {
    width: 80,
    height: 50,
    justifyContent: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
     elevation: 5,
      borderRadius: 30,
  },
})
