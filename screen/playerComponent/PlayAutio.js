import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
// import { styles } from './Feed/style';

import Player from './player';
import IcIcon from 'react-native-vector-icons/MaterialIcons';
export const PlaySong = ({ navigation }) => {
    return (
        <View style={styles.container}>
             <Player/>
        </View>
    )
}
export default PlaySong;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 36,
        marginBottom: 16,
        color: '#000'
    },
})
