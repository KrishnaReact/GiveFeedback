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
    FlatList,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from "./components/Header";
import AdjustFontSize from "./components/AdjustFontSize";
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';

export default function VideosList() {

    //const ref = useRef();
    const [videos, setVideos] = useState(
        [
            {
                Videourl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1',
                paused: true,
                id: 1,
                progress: 0,
                videoRef: useRef(),
            },
            {
                Videourl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1',
                paused: true,
                id: 2,
                progress: 0,
                videoRef: useRef(),
            },
            {
                Videourl: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1',
                paused: true,
                id: 3,
                progress: 0,
                videoRef: useRef(),
            },
        ]);



    const format = seconds => {
        let mins = parseInt(seconds / 60).toString().padStart(2, '0');
        let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const playpausVideo = (item, index) => {
        const data = [...videos];
        data.map((itm, indx) => {
            if (itm.id == item.id) {
                data[index].paused = !item.paused
            } else {
                data[indx].paused = true
            }
        })
        setVideos(data)
        // console.log('>>>>>>>',data)
    }
    const setprogress = (x, item, index) => {
        const data = [...videos];
        data.map((itm, indx) => {
            if (itm.id == item.id) {
                data[index].progress = x
            } else {
                data[indx].progress = 0
            }
        })
        setVideos(data)
        // console.log('progress>>>>>>>', data)
    }

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header backgroundColor={'#fff'} />
            <View style={{ flex: 1, }}>
                <FlatList
                    data={videos}
                    renderItem={({ item, index }) =>
                        <View style={{ width: '100%', height: 200, marginTop: 50 }}>
                            <Video source={{ uri: item.Videourl }}
                                paused={item.paused}
                                ref={item.videoRef}
                                onProgress={x => {
                                    //console.log(x);
                                    setprogress(x, item, index);
                                }}
                                //controls={true}
                                //onBuffer={this.onBuffer}
                                //onError={this.videoError}
                                resizeMode="cover"
                                style={{ width: '100%', height: 200, marginTop: 0 }}
                            />
                            <View style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                backgroundColor: 'rgba(0,0,0,.5)',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            item.videoRef.current.seek(parseInt(item.progress.currentTime) - 10);
                                        }}>
                                        <Image
                                            source={require('./assets/backward.png')}
                                            style={{ width: 30, height: 30, tintColor: 'white' }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            playpausVideo(item, index);
                                            // setPaused(!puased);
                                        }}>
                                        <Image
                                            source={
                                                item.paused
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
                                            item.videoRef.current.seek(parseInt(item.progress.currentTime) + 10);
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

                                {item.progress == 0 ?
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
                                            {format(item.progress.currentTime)}
                                        </Text>
                                        <Slider
                                            style={{ width: '80%', height: 40 }}
                                            minimumValue={0}
                                            maximumValue={item.progress.seekableDuration}
                                            minimumTrackTintColor="#FFFFFF"
                                            maximumTrackTintColor="#fff"
                                            value={item.progress.currentTime}
                                            onValueChange={async (x) => {
                                                await item.videoRef.current.seek(x);
                                            }}
                                        />
                                        <Text style={{ color: 'white' }}>
                                            {format(item.progress.seekableDuration)}
                                        </Text>
                                    </View>
                                }
                            </View>
                        </View>
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>
        </SafeAreaProvider>
    )
}