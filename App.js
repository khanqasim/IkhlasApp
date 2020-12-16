import React, { version } from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import {createDrawerNavigator} from 'react-navigation-drawer';
// import Drawer from './screen/drawer/sideDrawer';
import SplashScreen from './screen/splashScreen';
import BayanatScreen from './screen/topmanubar/bayanatDetails';
import HomeScreen from './screen/Home';
import DarjaAwal from './screen/topmanubar/books/darja-awal';
import KotabScreen from './screen/topmanubar/KotabDetails';
import PDFExample from './screen/topmanubar/books/pdpBookRead';
import Player from './screen/playerComponent/Player';
import ThemeProvider  from './screen/AppContext';
import TaleemScreen from './screen/topmanubar/taleemDetails';
import NaatyaKalamScreen from './screen/topmanubar/naat-ya-kalam';
import SawalJawabScreen from './screen/topmanubar/sawalJawab';
import NewComersScreen from './screen/topmanubar/NewComers';
import QA_Details from './screen/topmanubar/QA_Details';
import Audio_QA_Details from './screen/topmanubar/Audio_QA_Detail';
// import Teast from './test';
// import MainScreen from './screen/mainScreen';



const AppNavigator = createStackNavigator({



  Splashscreen: {
    screen: SplashScreen,
    navigationOptions: {
      headerShown: false
    }
  },

  Homescreen: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false
    }
    },
    // mainScreen: {
    //   screen: MainScreen,
    //   navigationOptions: {
    //     headerShown: false
    //   }
    //   },

  DarjaAwal:{
    screen: DarjaAwal,
    navigationOptions: {
      headerShown: false
    } 

  },
  KotabScreen: {
    screen: KotabScreen,
    navigationOptions: {
      headerShown: false
    }
 },

 pdfExample: {
  screen: PDFExample,
  navigationOptions: {
    headerShown: false
  }
},
playerScreen: {
  screen: Player,
  navigationOptions: {
    headerShown:true,
    headerTitle:true
  }
},
bayanatScreen: {
  screen: BayanatScreen,
  navigationOptions: {
    headerShown: false
  }
},
taleemScreen: {
  screen:TaleemScreen,
  navigationOptions: {
    headerShown: false
  }
},
naatyaKalamScreen: {
  screen:NaatyaKalamScreen,
  navigationOptions: {
    headerShown: true,
    headerTitle:false
  }
},
sawalJawabScreen: {
  screen:SawalJawabScreen,
  navigationOptions: {
    headerShown: false
  }
},

newComerScreen: {
  screen:NewComersScreen,
  navigationOptions: {
    headerShown: false
  }
},
darjaAwalScreen: {
  screen:DarjaAwal,
  navigationOptions: {
    headerShown: false
  }
},
qa_Details_Screen: {
  screen:QA_Details,
  navigationOptions: {
    headerShown: false
  }
},
audio_QA_Details: {
  screen:Audio_QA_Details,
  navigationOptions: {
    headerShown:true,
    headerTitle:false

  }
},


});
const AppContainer = createAppContainer(AppNavigator)
  // createStackNavigator({
  //   navigation:{screen:AppNavigation}
  // },
  // {
  //   contentComponent:createStackNavigator,
   
  // }
  // )

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider>
        <AppContainer/>
      </ThemeProvider>    
      );
  }

}