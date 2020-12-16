import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TrackPlayer, { useProgress } from 'react-native-track-player';
// import useProgress from '@react-native-community/progress-bar-android'
import Slider from '@react-native-community/slider';

const formatTime = (secs) => {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.ceil(secs - minutes * 60);
    
    if (seconds < 10) seconds = 0 +seconds ;
    return minutes + ":" + seconds ;
}




export default function SliderComp() {
    const { position, duration } = useProgress();

    const handleChange = (val) => {
        TrackPlayer.seekTo(val)

    }
    return (
        <View>
            <Slider
                style={{ width: 350, height: 40 }}
                minimumValue={0}
                maximumValue={duration}
                value={position}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onSlidingComplete={handleChange}
            />
            <View style={styles.timerConatiner}>
                <Text>{formatTime(position)}</Text>
                <Text>{formatTime(duration)}</Text>
            </View>
        </View>

    )

}
const styles = StyleSheet.create({
    timerConatiner: {

        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    // timer:{
    //     color:'#fff',
    //     fontSize:15,
    // }
})