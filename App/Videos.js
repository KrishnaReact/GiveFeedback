import {
    StyleSheet,
    View,
    StatusBar,
    SafeAreaView,
    // TextInput,
    Text,
    Image,
    ScrollView,
    Platform,
    TouchableOpacity,
    KeyboardAvoidingView,
    Dimensions,
    Alert,
    LogBox,
    PixelRatio,
    PermissionsAndroid,
    BackHandler,
    ImageBackground,
    Modal,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from "./components/Header";
import AdjustFontSize from "./components/AdjustFontSize";
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';

export default function Videos({ navigation }) {

    const [clicked, setClicked] = useState(false);
    const [puased, setPaused] = useState(true);
    const [progress, setProgress] = useState(null);
    const [clicked1, setClicked1] = useState(false);
    const [puased1, setPaused1] = useState(true);
    const [progress1, setProgress1] = useState(null);
    const [visible, setVisible] = useState(true);
    const [visible1, setVisible1] = useState(true);

    const ref = useRef();
    const ref1 = useRef();

    const format = seconds => {
        let mins = parseInt(seconds / 60).toString().padStart(2, '0');
        let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const playpausVideo = () => {
        if (puased == false) {
            setPaused(!puased)
            setPaused1(true)
        } else {
            setPaused(!puased)
            setPaused1(true)
        }
    }

    const playpausVideo1 = () => {
        if (puased1 == false) {
            setPaused1(!puased1)
            setPaused(true)
        } else {
            setPaused1(!puased1)
            setPaused(true)
        }
    }

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header backgroundColor={'#fff'} />
            <View style={{ width: '100%', height: AdjustFontSize(40), justifyContent: 'center' }}>
                <Text onPress={() => navigation.navigate('VideosList')} style={{ fontSize: AdjustFontSize(15), fontWeight: 'bold', color: '#000', alignSelf: 'flex-end', marginRight: 20 }}>{'Next'}</Text>
            </View>
            <View style={{ flex: 1 }}>

                <View
                    style={{ width: '100%', height: 200, }}
                // onPress={() => {
                //     setClicked(true);
                // }}
                >
                    <Video
                        paused={puased}
                        source={{
                            uri: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1',
                        }}
                        ref={ref}
                        onProgress={x => {
                            //console.log(x);
                            setProgress(x);
                        }}
                        //muted
                        style={{ width: '100%', height: 200 }}
                        resizeMode="cover"
                    />
                    <TouchableOpacity onPress={() => setVisible(!visible)}
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            backgroundColor: visible == false ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,.5)',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        {visible == true ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            ref.current.seek(parseInt(progress.currentTime) - 10);
                                        }}>
                                        <Image
                                            source={require('./assets/backward.png')}
                                            style={{ width: 30, height: 30, tintColor: 'white' }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            playpausVideo();
                                            // setPaused(!puased);
                                        }}>
                                        <Image
                                            source={
                                                puased
                                                    ? require('./assets/play-button.png')
                                                    : require('./assets/pause.png')
                                            }
                                            style={{
                                                width: 30,
                                                height: 30,
                                                tintColor: 'white',
                                                marginLeft: 50,
                                            }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            ref.current.seek(parseInt(progress.currentTime) + 10);
                                        }}>
                                        <Image
                                            source={require('./assets/forward.png')}
                                            style={{
                                                width: 30,
                                                height: 30,
                                                tintColor: 'white',
                                                marginLeft: 50,
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>

                                {progress == null ?
                                    null
                                    :
                                    <View
                                        style={{
                                            width: '100%',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            position: 'absolute',
                                            bottom: 0,
                                            paddingLeft: 20,
                                            paddingRight: 20,
                                            alignItems: 'center'
                                        }}>
                                        <Text style={{ color: 'white' }}>
                                            {format(progress.currentTime)}
                                        </Text>
                                        <Slider
                                            style={{ width: '80%', height: 40 }}
                                            minimumValue={0}
                                            maximumValue={progress.seekableDuration}
                                            minimumTrackTintColor="#FFFFFF"
                                            maximumTrackTintColor="#fff"
                                            value={progress.currentTime}
                                            onValueChange={(x) => {
                                                ref.current.seek(x);
                                            }}
                                        />
                                        <Text style={{ color: 'white' }}>
                                            {format(progress.seekableDuration)}
                                        </Text>
                                    </View>
                                }

                            </View>
                            : null}
                    </TouchableOpacity>

                </View>


                <View style={{ width: '100%', height: 200, marginTop: 40 }}>
                    <Video
                        paused={puased1}
                        source={{
                            uri: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1',
                        }}
                        ref={ref1}
                        onProgress={x => {
                            //console.log(x);
                            setProgress1(x);
                        }}
                        //muted
                        style={{ width: '100%', height: 200 }}
                        resizeMode="cover"
                    />
                    <TouchableOpacity
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            backgroundColor: visible1 == false ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,.5)',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }} onPress={() => setVisible1(!visible1)}>
                        {visible1 == true ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            ref1.current.seek(parseInt(progress1.currentTime) - 10);
                                        }}>
                                        <Image
                                            source={require('./assets/backward.png')}
                                            style={{ width: 30, height: 30, tintColor: 'white' }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            playpausVideo1();
                                            // setPaused1(!puased1);
                                        }}>
                                        <Image
                                            source={
                                                puased1
                                                    ? require('./assets/play-button.png')
                                                    : require('./assets/pause.png')
                                            }
                                            style={{
                                                width: 30,
                                                height: 30,
                                                tintColor: 'white',
                                                marginLeft: 50,
                                            }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            ref1.current.seek(parseInt(progress1.currentTime) + 10);
                                        }}>
                                        <Image
                                            source={require('./assets/forward.png')}
                                            style={{
                                                width: 30,
                                                height: 30,
                                                tintColor: 'white',
                                                marginLeft: 50,
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                                {progress1 == null ? null :
                                    <View
                                        style={{
                                            width: '100%',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            position: 'absolute',
                                            bottom: 0,
                                            paddingLeft: 20,
                                            paddingRight: 20,
                                            alignItems: 'center'
                                        }}>
                                        <Text style={{ color: 'white' }}>
                                            {format(progress1.currentTime)}
                                        </Text>
                                        <Slider
                                            style={{ width: '80%', height: 40 }}
                                            minimumValue={0}
                                            maximumValue={progress1.seekableDuration}
                                            minimumTrackTintColor="#FFFFFF"
                                            maximumTrackTintColor="#fff"
                                            value={progress1.currentTime}
                                            onValueChange={(x) => {
                                                ref1.current.seek(x);
                                            }}
                                        />
                                        <Text style={{ color: 'white' }}>
                                            {format(progress1.seekableDuration)}
                                        </Text>
                                    </View>
                                }
                            </View>
                            : null}
                    </TouchableOpacity>
                </View>

                {/* <View style={{ width: '100%', height: 200, marginTop: 40 }}>
                    <Video
                        paused={true}
                        source={{
                            uri: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1',
                        }}
                        //ref={ref1}
                        onProgress={x => {
                            //console.log(x);
                            //setProgress1(x);
                        }}
                        controls={true}
                        //muted
                        style={{ width: '100%', height: 200 }}
                        resizeMode="cover"
                    />
                </View> */}

            </View>
        </SafeAreaProvider>
    )
}