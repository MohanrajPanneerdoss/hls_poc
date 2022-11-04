import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Button,
  View,
  Pressable,
  Alert,
} from 'react-native';
import {NodeCameraView} from 'react-native-nodemediaclient';
import Orientation from 'react-native-orientation-locker';
import Toast from 'react-native-simple-toast';

const Recorder = () => {
  const vb = React.createRef();
  const [isPublish, setPublish] = React.useState(false);

  useEffect(() => {
    Orientation.lockToLandscape();
    vb.current.switchCamera();
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  return (
    <View>
      <NodeCameraView
        style={{height: '100%', width: '100%'}}
        outputUrl={'rtmp://34.215.155.158:1935/test1/live1'}
        ref={vb}
        camera={{cameraId: 1, cameraFrontMirror: false}}
        audio={{bitrate: 32000, profile: 1, samplerate: 44100}}
        video={{
          preset: 4,
          bitrate: 32000000,
          profile: 1,
          fps: 30,
          videoFrontMirror: true,
        }}
        autopreview={true}
        onStatus={(code, message) => {
          console.log(code, message);
          if (code === 2000) {
            Toast.showWithGravity('Connecting ...', Toast.LONG, Toast.TOP);
          } else if (code === 2001) {
            Toast.showWithGravity('Started', Toast.LONG, Toast.TOP);
            setPublish(true);
          } else if (code === 2002) {
            Toast.showWithGravity('Connection failed', Toast.LONG, Toast.TOP);
          } else if (code === 2004) {
            setPublish(false);
          }
        }}
      />
      <View
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          backgroundColor: 'black',
          height: '100%',
          width: 60,
          opacity: 0.5,
        }}></View>
      <Pressable
        onPress={() => {
          console.log('Publish');
          if (isPublish) {
            Alert.alert('Stop Publishing', 'Are you sure to stop publishing?', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => vb.current.stop(),
              },
            ]);
          } else {
            Alert.alert(
              'Start Publishing',
              'Are you sure to start publishing?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => vb.current.start()},
              ],
            );
          }
        }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 40,
          backgroundColor: isPublish ? 'red' : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: isPublish ? 'red' : 'white',
          borderWidth: 2,
          position: 'absolute',
          right: 10,
          bottom: '50%',
        }}>
        {isPublish && (
          <View
            style={{
              width: 15,
              height: 15,
              borderRadius: 2,
              backgroundColor: 'white',
            }}
          />
        )}
      </Pressable>
      {/* 
      <Button
        style={{position: 'absolute', left: 0}}
        onPress={() => {
          if (isPublish.isPublish) {
            setPublish({publishBtnTitle: 'Start Publish', isPublish: false});
            vb.current.stop();
          } else {
            setPublish({publishBtnTitle: 'Stop Publish', isPublish: true});
            vb.current.switchCamera();
            vb.current.start();
          }
        }}
        title={isPublish.publishBtnTitle}
        color="#841584"
      /> */}
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <VideoPlayer
           onError={(data: any) => console.log('onError', data)}
           onLoad={data => console.log(data)}
           onLoadStart={data => console.log('onLoadStartdata', data)}
           onProgress={(data: any) => {
             console.log('onProgress', data);
             //livePlayableDuration = data.playableDuration;
             //setCurrentTime(data.currentTime);
           }}
           onSeek={data => {
             console.log('onSeek', data);
           }}
           paused={false}
           ref={ref => (videoPlayer.current = ref)}
           resizeMode={'cover'}
           source={{
             uri: ' https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8',
           }}
           style={[styles.videoBackground, { height: 270 }]}
           seekColor={'red'}
           disableTimer={true}
           disableSeekbar={false}
           controls={false}
         />
        <Video
           style={[styles.videoBackground, { height: 270 }]}
           onError={(data: any) => console.log('onError', data)}
           onLoad={data => console.log(data)}
           onProgress={(data: any) => {
             console.log('onProgress', data);
             //livePlayableDuration = data.playableDuration;
             //setCurrentTime(data.currentTime);
           }}
           source={{
             uri: 'https://d1fn3d8tw2ahlq.cloudfront.net/out/v1/d6f16aaf66c84534b2855d578491e306/index.m3u8',
           }} />
         <TouchableOpacity style={{ marginHorizontal: 20 }} onPress={() => {
           console.log(livePlayableDuration);
           videoPlayer.current.seek(livePlayableDuration);
         }}>
           <Text>Go Live</Text>
         </TouchableOpacity>

        <Button
          onPress={() => {
            if (isPublish.isPublish) {
              setPublish({publishBtnTitle: 'Start Publish', isPublish: false});
              vb.current.stop();
            } else {
              setPublish({publishBtnTitle: 'Stop Publish', isPublish: true});
              vb.current.switchCamera();
              vb.current.start();
            }
          }}
          title={isPublish.publishBtnTitle}
          color="#841584"
        />
      </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  videoBackground: {
    width: '100%',
  },
});

export default Recorder;
