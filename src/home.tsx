import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Button,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {measureConnectionSpeed} from 'react-native-network-bandwith-speed';
import networkSpeed from 'react-native-network-speed';

const Home = props => {
  const getNetworkBandwidth = async (): Promise<void> => {
    try {
      const networkSpeed = await measureConnectionSpeed();
      console.log('networkSpeed', networkSpeed); // Network bandwidth speed
    } catch (err) {
      console.log('err', err);
    }
  };

  useEffect(() => {
    getNetworkBandwidth();
    networkSpeed.startListenNetworkSpeed(
      ({
        downLoadSpeed,
        downLoadSpeedCurrent,
        upLoadSpeed,
        upLoadSpeedCurrent,
      }) => {
        console.log('downLoadSpeed', downLoadSpeed + 'kb/s'); // download speed for the entire device 整个设备的下载速度
        console.log('downLoadSpeedCurrent', downLoadSpeedCurrent + 'kb/s'); // download speed for the current app 当前app的下载速度(currently can only be used on Android)
        console.log('upLoadSpeed', upLoadSpeed + 'kb/s'); // upload speed for the entire device 整个设备的上传速度
        console.log('upLoadSpeedCurrent', upLoadSpeedCurrent + 'kb/s'); // upload speed for the current app 当前app的上传速度(currently can only be used on Android)
      },
    );
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ],
        {
          title: 'Cool Photo App Camera And Microphone Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log(granted);
      if (
        granted['android.permission.CAMERA'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('You can use the camera');
        props.navigation.navigate('Recorder');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <View>
        <Button
          title="Record Live"
          onPress={() => {
            if (Platform.OS === 'ios') {
              props.navigation.navigate('Recorder');
            } else {
              requestCameraPermission();
            }
          }}
        />
      </View>
    </SafeAreaView>
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

export default Home;
