import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {globalStyles, height, width} from '../utils/Style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {setSendData} from '../../redux/features/GlobalSlice';

export default function CameraComponent({
  onPhotoCapture,
  photoArray,
  deletePhoto,
  fields,
  mediaType,
}) {
  const [cameraToggle, setCameraToggle] = useState(true);
  const [mediaArray, setMediaArray] = useState([]);
  const [showCapturedPhotos, setShowCapturedPhotos] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [rotate, setRotate] = useState(0);
  const [string,setString] = useState("");
  const [string1,setString1] = useState("");
  const api_send_data = useSelector(state => state.global.send_data);

  const dispatch = useDispatch();
  // console.log("form =>",fields)
  const handleImagePicker = () => {
    if (cameraToggle) {
      openCamera();
    } else {
      openImagePicker();
    }
  };

  const openCamera = async () => {
    try {
      let options = {
        width: (4 / 3) * 3264,
        height: (4 / 3) * 2448,
        compressImageQuality: 0.7,
        mediaType: mediaType,
        // multiple: true,
        includeBase64: true,
      };

      const result = await ImagePicker.openCamera(options);
      setString(result.data);
      if (result && result.path) {
        setMediaArray(prev => [...prev, result]);
        setShowCapturedPhotos(true);
          const obj = {...api_send_data};
          if (obj[fields.name]) {
            let arr = [...obj.photo];
            arr.push(result.data);
            obj[fields.name] = arr;
          } else {
            let arr = [result.data];
            obj[fields.name] = arr;
          }
          dispatch(setSendData(obj));
      } else {
        console.log('User canceled image selection or video recording.');
      }
    } catch (error) {
      console.log('error ->', error);
    }
  };
  // console.log('fields =>', fields);
  const openImagePicker = async () => {
    try {
      let options = {
        width: (4 / 3) * 3264,
        height: (4 / 3) * 2448,
        compressImageQuality: 0.7,
        mediaType: mediaType,
        // multiple: true,
        includeBase64: true,
      };

      const result = await ImagePicker.openPicker(options);

      
      // console.log("ImagePicker Result:", result);
      
        // setString1(result.data);
      if (result && result.path) {
        setMediaArray(prev => [...prev, result]);
        setShowCapturedPhotos(true);
          const obj = {...api_send_data};
          if (obj[fields.name]) {
            let arr = [...obj.photo];
            arr.push(result.data);
            obj[fields.name] = arr;
          } else {
            let arr = [result.data];
            obj[fields.name] = arr;
          }
          dispatch(setSendData(obj));
      } else {
        console.log('User canceled image selection or video recording.');
      }
    } catch (error) {
      console.log('error ->', error);
    }
  };
  
  // console.log("data =>",api_send_data.photo != undefined ? api_send_data.photo.length:null);
  // console.log("string coparision =>",string == string1)
  // if(string.length > 0 && string1.length > 0){
  //     if(string1 === string)  console.log('true');
  //     else console.log('false');
  // }
  const convertImageToBase64 = async filePath => {
    try {
      const base64 = await RNFS.readFile(filePath, 'base64');
      // console.log('Image Base64:', base64);
      return base64;
    } catch (error) {
      console.log(error);
      return '';
    }
  };

  const convertVideoToBase64 = async filePath => {
    try {
      const base64 = await RNFS.readFile(filePath, 'base64');
      // console.log('Video Base64:', base64);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMediaClick = index => {
    // console.log("photo click => ",photo);
    if (mediaArray.length > 0) {
      setSelectedImage(mediaArray[index]);
    } else {
      console.log('fields value => ', fields.value[index]);
      setSelectedImage(fields.value[index]);
    }
  };
  // console.log("image  => ",api_send_data.billphoto != undefined && api_send_data.photo != undefined ? api_send_data.billphoto[0] == api_send_data.photo[0]:null)
  // console.log("image =>",api_send_data.job_id) 
  return (
    <View
      style={[
        {backgroundColor: 'transparent', width: '100%'},
        globalStyles.flexBox,
      ]}>
      <View
        style={[
          {backgroundColor: 'transparent', width: '90%', padding: 5},
          globalStyles.rowContainer,
        ]}>
        <TouchableOpacity
          style={[
            {
              borderWidth: cameraToggle ? 3 : 1,
              backgroundColor: cameraToggle ? 'grey' : 'white',
              borderColor: cameraToggle ? 'green' : 'grey',
              padding: 5,
              margin: 5,
            },
          ]}
          onPress={() => setCameraToggle(true)}>
          <MaterialCommunityIcons name={'camera'} size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              borderWidth: !cameraToggle ? 3 : 1,
              backgroundColor: !cameraToggle ? 'grey' : 'white',
              borderColor: !cameraToggle ? 'green' : 'grey',
              padding: 5,
              margin: 5,
            },
          ]}
          onPress={() => setCameraToggle(false)}>
          <MaterialCommunityIcons
            name={'image-multiple'}
            size={40}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[
          styles.openCameraButton,
          globalStyles.rowContainer,
          globalStyles.flexBoxAlign,
        ]}
        onPress={() => handleImagePicker()}>
        <Text style={styles.openCameraButtonText}>
          {cameraToggle ? 'Click' : 'Choose'} {fields.placeholder}
        </Text>
        <MaterialCommunityIcons
          name={cameraToggle ? 'camera' : 'image-multiple'}
          color="white"
          size={25}
        />
      </TouchableOpacity>
      {((mediaArray.length > 0 && showCapturedPhotos) ||
        (fields.value.length > 0 && !showCapturedPhotos)) && (
        <View style={{marginTop: 10, width: '90%'}}>
          <FlatList
            data={
              showCapturedPhotos
                ? mediaArray
                : fields.value.length > 0
                ? fields.value
                : []
            }
            horizontal
            renderItem={({item, index}) => (
              <TouchableOpacity onPress={() => handleMediaClick(index)}>
                {/* {item.mime != undefined && item.mime.startsWith('image') ? ( */}
                <View>
                  {showCapturedPhotos ? (
                    item.mime != undefined && item.mime.startsWith('image') ? (
                      <Image
                        source={{
                          uri: `file://${item.path}`,
                        }}
                        style={{width: 100, height: 100, marginHorizontal: 2}}
                        key={index}
                      />
                    ) : (
                      <Video
                        source={{
                          uri: `file://${item.path}`,
                        }}
                        style={{width: 100, height: 100, marginHorizontal: 2}}
                        resizeMode="cover"
                        repeat
                      />
                    )
                  ) : item.endsWith('mp4') ? (
                    <Video
                      source={{
                        uri: item,
                      }}
                      style={{width: 100, height: 100, marginHorizontal: 2}}
                      resizeMode="cover"
                    />
                  ) : (
                    <Image
                      source={{
                        uri: item,
                      }}
                      style={{width: 100, height: 100, marginHorizontal: 2}}
                      key={index}
                    />
                  )}
                  <TouchableOpacity
                    onPress={async () => {
                      let base64 = await convertImageToBase64(item.path);

                      if (mediaArray.length > 0) {
                        const obj = {...api_send_data};
                        obj.photo = api_send_data.photo.filter(
                          element => element !== base64,
                        );
                        dispatch(setSendData(obj));
                        let arr = mediaArray.filter((_, ind) => ind !== index);
                        setMediaArray(arr);
                        if (mediaArray.length == 1) {
                          setSelectedImage(null);
                        }
                      }
                    }}
                    style={{
                      position: 'absolute',
                      right: 5,
                      top: 5,
                      backgroundColor: 'white',
                    }}>
                    <MaterialCommunityIcons
                      name={'trash-can'}
                      size={20}
                      color="red"
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      {selectedImage && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={selectedImage != null}>
          <FlatList
            data={
              showCapturedPhotos
                ? mediaArray
                : fields.value.length > 0
                ? fields.value
                : []
            }
            horizontal
            pagingEnabled
            renderItem={({item, index}) => (
              <View style={styles.modalContainer}>
                {/* {console.log("asdfghjkl =",item.path)} */}
                <View
                  style={{
                    // backgroundColor: 'red',
                    width: width,
                    height: height,
                    transform: [{rotate: rotate + 'deg'}],
                  }}>
                  {showCapturedPhotos ? (
                    item.mime != undefined && item.mime.startsWith('image') ? (
                      <Image
                        source={{
                          uri: `file://${item.path}`,
                        }}
                        style={{
                          width: width,
                          height: height,
                          marginHorizontal: 2,
                        }}
                        resizeMode="contain"
                        key={index}
                      />
                    ) : (
                      <Video
                        source={{
                          uri: `file://${item.path}`,
                        }}
                        style={{
                          width: width,
                          height: height,
                          marginHorizontal: 2,
                        }}
                        resizeMode="contain"
                        repeat
                      />
                    )
                  ) : item.endsWith('mp4') ? (
                    <Video
                      source={{
                        uri: item,
                      }}
                      style={{
                        width: width,
                        height: height,
                        marginHorizontal: 2,
                      }}
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      source={{
                        uri: item,
                      }}
                      style={{
                        width: width,
                        height: height,
                        marginHorizontal: 2,
                      }}
                      key={index}
                      resizeMode="contain"
                    />
                  )}
                </View>

                <TouchableOpacity
                  style={styles.closeCameraButton}
                  onPress={() => setSelectedImage(null)}>
                  <MaterialCommunityIcons
                    size={45}
                    color={'black'}
                    name={'close-box'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.rotateImageButton}
                  onPress={() => setRotate(prev => prev + 90)}>
                  <MaterialCommunityIcons
                    size={45}
                    color={'black'}
                    name={'crop-rotate'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteImageButton}
                  onPress={async () => {
                    let base64 = await convertImageToBase64(item.path);
                    if (mediaArray.length > 0) {
                      const obj = {...api_send_data};
                      obj.photo = api_send_data.photo.filter(
                        element => element !== base64,
                      );
                      dispatch(setSendData(obj));
                      let arr = mediaArray.filter((_, ind) => ind !== index);
                      setMediaArray(arr);
                      if (mediaArray.length == 1) {
                        setSelectedImage(null);
                      }
                    }
                  }}>
                  <MaterialCommunityIcons
                    size={45}
                    color={'black'}
                    name={'trash-can'}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 3,
  },
  openCameraButton: {
    width: '90%',
    justifyContent: 'space-between',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  openCameraButtonText: {
    color: 'white',
  },
  modalContainer: {
    flex: 1,
  },
  camera: {
    ...StyleSheet.absoluteFill,
    // width:width,
  },
  captureButton: {
    // position: 'absolute',
    // bottom: 20,
    alignSelf: 'center',
    // backgroundColor: 'white',
    padding: 3,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'white',
    width: 80,
    height: 80,
  },
  captureButtonText: {
    color: 'white',
  },
  closeCameraButton: {
    position: 'absolute',
    top: 70,
    right: 0,
    // backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  deleteImageButton: {
    position: 'absolute',
    top: 70,
    left: 0,
    padding: 10,
    borderRadius: 5,
  },
  rotateImageButton: {
    position: 'absolute',
    top: 70,
    left: 70,
    padding: 10,
    borderRadius: 5,
  },
  closeCameraButtonText: {
    color: 'white',
  },
  capturedPhotosContainer: {
    width: '33%',
    flexDirection: 'row',
    // marginTop: 20,
  },
  capturedPhoto: {
    width: 50,
    height: 50,
    // marginHorizontal: 5,
  },
});
