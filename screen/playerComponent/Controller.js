import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import Icons from "react-native-vector-icons/MaterialIcons";
import TrackPlayer,{usePlaybackState} from 'react-native-track-player';


export default function Controller({ onNext, onPrv }) {
  const playbackState = usePlaybackState();
  const [isPlaying,setIsPlaying ] = useState('Playing')

  useEffect(() => { 
    if (playbackState === "paused" || playbackState === 2) {
      setIsPlaying('paused');
      // alert(playbackState)
    }
    else if (playbackState === "playing " || playbackState === 3) {
      setIsPlaying('playing');
    }
    else{
      setIsPlaying('loading');
    }
  }, [playbackState]);

  const renderPlayPauseBtn = () => {
    switch (isPlaying) {
      case "playing":
        return <Icons name="pause" size={45} color='#F08080' />;
  
        case "paused":
          return <Icons name="play-arrow" size={45} color='#F08080' />;
  
        default:
          return <ActivityIndicator size={45} color='#F08080' />;
    }

  };
  const onPlayPause = () => {
    console.log(playbackState);
    if (playbackState === "playing" || playbackState === 3) {
      TrackPlayer.pause()
    }
    else if (playbackState === "paused" || playbackState === 2) {
      TrackPlayer.play()
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrv}>
        <Icons name="skip-previous" size={45} color='#F08080'/>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPlayPause}>
      {renderPlayPauseBtn()}
      </TouchableOpacity>
      <TouchableOpacity onPress={onNext}>
        <Icons name="skip-next" size={45} color='#F08080'/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    width:250,

  },
});