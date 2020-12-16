
import React, { useRef, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Dimensions,
  Animated,
  StyleSheet,
  PermissionsAndroid,
  requestToPermissions,props
} from "react-native";
import TrackPlayer, { capabilities, Capability, Event } from 'react-native-track-player';
// import songs from "./data.json";
import Controller from "./Controller";
import SliderComp from "./SliderComp";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MainScreen from '../mainScreen';
import { Form } from "native-base";
import RNFetchBlob from 'rn-fetch-blob';
import { TouchableOpacity } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("window");


export const Player = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;


  const slider = useRef(null);
  // const [songIndex, setSongIndex] = useState(0);
  const [array,setArray] = useState(navigation.state.params.fullObject)
  const isPlayerReady = useRef(false)
  const [loading, setLoading] = useState(true)
  // for tranlating the album art
  const position = useRef(Animated.divide(scrollX, width)).current;


  useEffect(() => {

    // alert(JSON.stringify(array[0].url))
    // console.log(array[0].url)

    scrollX.addListener(({ value }) => {
      const val = Math.round(value / width);


    });
    // TrackPlayer.addEventListener(Event.PlaybackTrackChanged, (e)=>{
    //     console.log(e);
    // })

    TrackPlayer.setupPlayer().then(async () => {
      console.log('Player Ready');
      // alert(JSON.stringify(array))
      await TrackPlayer.reset()
      TrackPlayer.add({
        id: array.id,
        url: array.url,
        created_at: array.created_at,
      })
      isPlayerReady.current = true;
      TrackPlayer.pause();

      await TrackPlayer.updateOptions({
        stopWithApp: false,
        alwaysPauseOnInterruption: true,
        capabilities: [
          Capability.Pause,
          Capability.Play,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          // TrackPlayer.CAPABILITY_PLAY,
          // TrackPlayer.CAPABILITY_PAUSE,
          // TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          // TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS
        ],
      })

    })
    return () => {
      scrollX.removeAllListeners();
    };

    setLoading(false)

  }, [loading]);
  useEffect(() => {
    if (isPlayerReady.current) {
      TrackPlayer.skip(array.id)
    }

  }, [array]);

  const goNext = () => {
    slider.current.scrollToOffset({
      offset: (array + 1) * width,
    });
  };
  const goPrv = () => {
    slider.current.scrollToOffset({
      offset: (array - 1) * width,
    });
  };

   const actualDownload = (url) => {
      const { dirs } = RNFetchBlob.fs;
      RNFetchBlob.config({
        fileCache: true,
        appendExt: 'mp3',
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          mediaScannable: true,
          title: `name`,
          path: `${dirs.DownloadDir}/name`,
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
  
  const  downloadFile = async (url) => {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          actualDownload(url);
        } else {
          Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
        }
      } catch (err) {
        console.warn(err);
        alert('error')
      }
    }




  const renderItem = ({ index, item }) => {
    return (
      <Animated.View
        style={{
          alignItems: "center",
          width: width,
          transform: [
            {
              translateX: Animated.multiply(
                Animated.add(position, -index),
                -100
              ),
            },
          ],
        }}
      >
        {/* <Animated.Image
          source={{uri:item.artwork}}
          style={{ width: 320, height: 320, borderRadius: 5 }}
        /> */}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={{ height: 320 }}>
        <Animated.FlatList
          ref={slider}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          // scrollEventThrottle={16}
          data={array}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
        />
        <TouchableOpacity
        onPress={() => downloadFile(array.url)}>
        <AntDesign name="download" size={40} style={{ color: 'red', alignSelf: 'center', marginBottom: 50, }}/>
        </TouchableOpacity>
      </SafeAreaView>
      <View >
        {/* {alert(JSON.stringify(array))} */}

        <Text style={styles.title}>{array.created_at}</Text>
        {/* <Text style={styles.artist}>{MainScreen[songIndex].artist}</Text> */}
      </View>
      <SliderComp />
      <Controller onNext={goNext} onPrv={goPrv} />
    </SafeAreaView>
  );
}
export default Player;

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    textAlign: "center",
    textTransform: "capitalize",
  },
  artist: {
    fontSize: 18,
    textAlign: "center",
    textTransform: "capitalize",
  },
  container: {
    justifyContent: "center",
    alignItems: 'center',
    height: height,
    maxHeight: 300,
    // backgroundColor:'green'
  },
});