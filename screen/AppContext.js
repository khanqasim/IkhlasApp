import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

export const ThemeContext = React.createContext({});


export default class ThemeProvider extends Component {
    
    state={
      language:'',
      languagIndex: 0,
      langselect:true,
     
     
        }
    // setLanguages(){
                                   
    // }
        render() {
            return (
              <ThemeContext.Provider
                value={{ provider: this }}>
                {this.props.children}
                {/* <LanguageSelection/> */}
              </ThemeContext.Provider>
            );
          }
        }   