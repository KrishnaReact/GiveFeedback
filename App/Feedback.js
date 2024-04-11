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
import { Dropdown } from 'react-native-element-dropdown';
import { TextInput } from 'react-native-paper';
import { requestMultiple, PERMISSIONS } from 'react-native-permissions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RBSheet from 'react-native-raw-bottom-sheet';


export default function Feedback({ navigation }) {

    const refRBSheet = useRef();
    const [purpose, setPurpose] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [imagePath, setImagePath] = useState('');
    const [imageType, setImageType] = useState('');
    const [imageName, setImageName] = useState('');
    const [backModal, setBackModal] = useState(false);
    const data = [
        { label: 'Report a bug', value: '1' },
        { label: 'Idea or Suggestion', value: '2' },
        { label: 'Testimonial', value: '3' },
        { label: 'Media and PR', value: '4' },
        { label: 'Collaborations/Business Proposals', value: '5' },
    ];

    useEffect(() => {
        requestAllPermissions();
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);

    const requestAllPermissions = () => {
        if (Platform.OS == 'android') {
            PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            ]).then(result => {
                if (
                    result['android.permission.CAMERA'] &&
                    result['android.permission.READ_EXTERNAL_STORAGE'] &&
                    result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
                ) {
                    //   Alert.alert(
                    //     'All permissions granted!',
                    //     'Now you can download anything!',
                    //   );
                } else {
                    //Alert.alert('Permissions denied!', 'You need to give permissions');
                }
            });
        }
        //  if (Platform.OS == 'ios') {
        //     requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY, PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,]).then((statuses) => {
        //     });
        // }
    }

    const handleBackButtonClick = async () => {
        setBackModal(true);
        return true;
    }

    const Back_Modal = () => {
        return (
            <Modal
                animationType='slide'
                transparent={true}
                visible={backModal}
                onRequestClose={() => {
                    //console.log(" modal",visible);
                }}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                    <View style={{ width: '75%', minHeight: AdjustFontSize(150), backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 }}>
                        <TouchableOpacity onPress={() => setBackModal(false)} style={{ width: AdjustFontSize(27), height: AdjustFontSize(27), justifyContent: 'center', backgroundColor: '#fff', borderRadius: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5, position: 'absolute', right: 0, marginRight: -15, marginTop: -10 }}>
                            <Image style={{ width: AdjustFontSize(12), height: AdjustFontSize(12), alignSelf: 'center', tintColor: 'rgba(0,0,0,0.4)', }} source={require('./assets/close.png')} />
                        </TouchableOpacity>
                        <View style={{ width: '80%', alignSelf: 'center', marginVertical: AdjustFontSize(20) }}>
                            <Text style={{ fontSize: AdjustFontSize(15), fontWeight: '500', color: 'rgba(0,0,0,0.7)', marginTop: 15, alignSelf: 'center', textAlign: 'center' }}>{'Are you sure want to leave?'}</Text>
                            <Text style={{ fontSize: AdjustFontSize(12), fontWeight: '400', color: 'rgba(0,0,0,0.7)', marginTop: 5, alignSelf: 'center', textAlign: 'center' }}>{'If you discard, you will lose your changes'}</Text>
                            <TouchableOpacity onPress={() => setBackModal(false)} style={{ width: '100%', height: AdjustFontSize(35), backgroundColor: '#4062A3', borderRadius: 5, marginTop: AdjustFontSize(10), alignSelf: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: AdjustFontSize(12), fontWeight: '600', color: '#fff', alignSelf: 'center' }}>{'CONTINUE EDITING'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => BackHandler.exitApp()} style={{ width: '100%', height: AdjustFontSize(35), backgroundColor: '#fff', borderRadius: 5, borderWidth: 1, borderColor: '#4062A3', marginTop: AdjustFontSize(5), alignSelf: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: AdjustFontSize(12), fontWeight: '700', color: '#4062A3', alignSelf: 'center' }}>{'DISCARD'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    const selectFromGallary = () => {

        let options = {

            storageOptions: {

                skipBackup: true,

                path: 'images',

            },

        };

        launchImageLibrary(options, res => {

            //console.log('Response = ', res);

            if (res.didCancel) {

                console.log('User cancelled image picker');

            } else if (res.error) {

                console.log('ImagePicker Error: ', res.error);

            } else if (res.customButton) {

                console.log('User tapped custom button: ', res.customButton);

                //alert(res.customButton);

            } else {

                let source = res;
                console.log('111111', source);
                setImagePath(source.assets[0].uri);
                setImageName(source.assets[0].fileName);
                setImageType(source.assets[0].type);
                this.RBSheet.close();
            }

        });

    }


    const selectFromCamera = () => {

        let options = {

            storageOptions: {

                skipBackup: true,

                path: 'images',

            },

        };

        launchCamera(options, res => {
            console.log('Response = ', res);

            //  const result = launchCamera(options);
            if (res.didCancel) {

                console.log('User cancelled image picker');

            } else if (res.error) {

                console.log('ImagePicker Error: ', res.error);

            } else if (res.customButton) {

                console.log('User tapped custom button: ', res.customButton);

                // alert(res.customButton);

            } else {
                // const source = { uri: res.uri };
                console.log('response......', res);
                if (Platform.OS == 'android') {
                    setImagePath(res.assets[0].uri);
                    setImageName(res.assets[0].fileName);
                    setImageType(res.assets[0].type);
                    this.RBSheet.close();
                } else {
                    if (res.errorCode) {
                        this.RBSheet.close();
                        console.log('00000')
                    } else {
                        setImagePath(res.assets[0].uri);
                        setImageName(res.assets[0].fileName);
                        setImageType(res.assets[0].type);
                        this.RBSheet.close();
                    }

                }

            }
        })
    }

    const sendDataToServer = async () => {
        var form = new FormData();
        form.append('userId', 1);
        form.append('title', purpose);
        form.append('body', subject);
        form.append('message', message);
        form.append('image', {
            uri: imagePath,
            name: imageName,
            type: imageType
        });

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts',
                {
                    method: 'POST',
                    body: form,
                    headers: { 'Content-Type': 'multipart/form-data', 'Accept': '*/*', },
                }
            );
            const res = await response.json();
            console.log('res>>>>', res);
        } catch (error) {
            console.log('error..', error)
        }
    }


    const renderLabel = () => {
        if (purpose || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: '#4062A3' }]}>{'Purpose*'}</Text>
            );
        }
        return null;
    };

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""} style={{ flex: 1 }}>
                <Header backgroundColor={'#fff'} />
                <View style={{ width: '100%', height: AdjustFontSize(40), justifyContent: 'center' }}>
                    <Text onPress={() => setBackModal(true)} style={{ fontSize: AdjustFontSize(15), fontWeight: 'bold', color: '#000', alignSelf: 'center' }}>{'Give Feedback'}</Text>
                </View>
                <ScrollView>
                    <View style={{ flex: 1, marginHorizontal: AdjustFontSize(15), marginVertical: AdjustFontSize(20) }}>
                        <View style={styles.container}>{Back_Modal()}
                            {renderLabel()}
                            <Dropdown
                                style={[styles.dropdown, isFocus && { borderColor: '#4062A3' }]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                iconStyle={styles.iconStyle}
                                data={data}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocus ? 'Purpose *' : ' '}
                                value={purpose}
                                onFocus={() => setIsFocus(true)}
                                onBlur={() => setIsFocus(false)}
                                onChange={item => {
                                    setPurpose(item.value);
                                    setIsFocus(false);
                                }}
                            />
                        </View>
                        <View style={{ marginTop: AdjustFontSize(15), width: '100%', }}>
                            <TextInput style={{ fontSize: AdjustFontSize(12), backgroundColor: '#fff', minHeight: AdjustFontSize(80) }}
                                mode="outlined"
                                label={'Subject*'}
                                outlineColor="gray"
                                activeOutlineColor="#4062A3"
                                multiline={true}
                                maxLength={100}
                                placeholder="Subject*"
                                value={subject}
                                onChangeText={text => setSubject(text)}
                            />
                        </View>
                        <View style={{ width: '100%', marginTop: AdjustFontSize(5) }}>
                            <Text style={{ fontSize: AdjustFontSize(12), fontWeight: '600', color: 'gray', position: 'absolute', right: 0, marginRight: 5 }}>{`${subject.length}/100`}</Text>
                        </View>
                        <View style={{ marginTop: AdjustFontSize(25), width: '100%', }}>
                            <TextInput style={{ fontSize: AdjustFontSize(12), backgroundColor: '#fff', minHeight: AdjustFontSize(120) }}
                                mode="outlined"
                                label={'Your message'}
                                outlineColor="gray"
                                activeOutlineColor="#4062A3"
                                multiline={true}
                                maxLength={750}
                                placeholder="Your message"
                                value={message}
                                onChangeText={text => setMessage(text)}
                            />
                        </View>
                        <View style={{ width: '100%', marginTop: AdjustFontSize(5) }}>
                            <Text style={{ fontSize: AdjustFontSize(12), fontWeight: '600', color: 'gray', position: 'absolute', right: 0, marginRight: 5 }}>{`${message.length}/750`}</Text>
                        </View>
                        <View style={{ width: '100%', marginTop: AdjustFontSize(25), flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.RBSheet.open()} style={{ width: AdjustFontSize(80), height: AdjustFontSize(75), borderWidth: .9, borderColor: 'gray', borderRadius: 5, justifyContent: 'center' }}>
                                <Image style={{ width: AdjustFontSize(20), height: AdjustFontSize(20), alignSelf: 'center', tintColor: '#4062A3' }} source={require('./assets/camera.png')} />
                                <Text style={{ fontSize: AdjustFontSize(12), fontWeight: '600', alignSelf: 'center', color: '#4062A3', marginTop: 5 }}>{'Add media'}</Text>
                            </TouchableOpacity>
                            <RBSheet
                                ref={ref => {
                                    this.RBSheet = ref;
                                }}
                                height={AdjustFontSize(140)}
                                customStyles={{
                                    container: {
                                        borderTopLeftRadius: 5,
                                        borderTopRightRadius: 5
                                    }
                                }}
                            >
                                <View style={{ flex: 1, marginTop: 5 }}>
                                    <View style={{ width: '95%', alignSelf: 'center', marginVertical: AdjustFontSize(15) }}>
                                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontSize: AdjustFontSize(15), fontWeight: 'bold', color: 'rgba(0,0,0,0.6)', marginLeft: 10 }}>{'Upload Media'}</Text>
                                            <TouchableOpacity onPress={() => this.RBSheet.close()} style={{ position: 'absolute', right: 0, marginRight: AdjustFontSize(10) }}><Image style={{ width: AdjustFontSize(15), height: AdjustFontSize(15), alignSelf: 'center', tintColor: 'rgba(0,0,0,0.6)', }} source={require('./assets/close.png')} /></TouchableOpacity>
                                        </View>
                                        <TouchableOpacity onPress={() => selectFromCamera()} style={{ width: '100%', marginTop: AdjustFontSize(15), flexDirection: 'row', alignItems: 'center' }}>
                                            <Image style={{ width: AdjustFontSize(20), height: AdjustFontSize(20), alignSelf: 'center', marginLeft: 10 }} source={require('./assets/camera_color.png')} />
                                            <Text style={{ fontSize: AdjustFontSize(13), fontWeight: '500', color: 'rgba(0,0,0,0.6)', marginLeft: 10 }}>{'Camera'}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => selectFromGallary()} style={{ width: '100%', marginTop: AdjustFontSize(15), flexDirection: 'row', alignItems: 'center' }}>
                                            <Image style={{ width: AdjustFontSize(20), height: AdjustFontSize(20), alignSelf: 'center', marginLeft: 10 }} source={require('./assets/gallery.png')} />
                                            <Text style={{ fontSize: AdjustFontSize(13), fontWeight: '500', color: 'rgba(0,0,0,0.6)', marginLeft: 10 }}>{'Photo Library'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </RBSheet>
                            {imagePath == '' ? null :
                                <View style={{ width: AdjustFontSize(80), height: AdjustFontSize(75), borderColor: 'gray', borderRadius: 5, justifyContent: 'center', marginHorizontal: AdjustFontSize(15) }}>
                                    <ImageBackground imageStyle={{ borderRadius: 5 }} style={{ flex: 1, }} source={{ uri: imagePath }}>
                                        <TouchableOpacity onPress={() => setImagePath('')} style={{ position: 'absolute', right: 0, marginRight: -10 }}><Image style={{ width: AdjustFontSize(18), height: AdjustFontSize(18), backgroundColor: '#fff', borderRadius: 180, }} source={require('./assets/cancel.png')} /></TouchableOpacity>
                                    </ImageBackground>
                                </View>}
                        </View>
                        <View style={{ width: '100%', marginTop: AdjustFontSize(15), justifyContent: 'center' }}>
                            <Text style={{ fontSize: AdjustFontSize(13), fontWeight: '500', color: 'rgba(0,0,0,0.6)', }}>{'By sending your feedback, you are allowing us to contact you for more details.'}</Text>
                        </View>
                        {purpose == '' || subject == '' ?
                            <View style={{ width: '100%', height: AdjustFontSize(35), marginVertical: AdjustFontSize(20), backgroundColor: '#4062A3', justifyContent: 'center', borderRadius: 5, opacity: 0.5 }}>
                                <Text style={{ fontSize: AdjustFontSize(16), fontWeight: 'bold', color: '#fff', alignSelf: 'center' }}>{'SEND'}</Text>
                            </View>
                            :
                            <TouchableOpacity onPress={() => sendDataToServer()} style={{ width: '100%', height: AdjustFontSize(35), marginVertical: AdjustFontSize(20), backgroundColor: '#4062A3', justifyContent: 'center', borderRadius: 5, }}>
                                <Text style={{ fontSize: AdjustFontSize(16), fontWeight: 'bold', color: '#fff', alignSelf: 'center' }}>{'SEND'}</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingVertical: 16,
    },
    dropdown: {
        height: AdjustFontSize(40),
        borderColor: 'gray',
        borderWidth: 0.9,
        borderRadius: 5,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 13,
    },
    placeholderStyle: {
        fontSize: AdjustFontSize(12),

    },
    selectedTextStyle: {
        fontSize: AdjustFontSize(12),
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
});
