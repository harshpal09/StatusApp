import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  FlatList,
  Platform
} from 'react-native';
import {
  Camera,
  useCameraPermission,
  useCameraDevice,
} from 'react-native-vision-camera';
import {THEME_COLOR, globalStyles, height, width} from '../utils/Style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PERMISSIONS, check, request, RESULTS } from 'react-native-permissions';

const CameraComponent = ({onHandleAccordion,onPhotoCapture, photoArray, deletePhoto,fields}) => {
  const {hasPermission, requestPermission} = useCameraPermission();

  const cameraRef = useRef(null);

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [Photos, setPhotos] = useState([]);
  const [showCapturedPhotos, setShowCapturedPhotos] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isRareCamera, setIsRareCamera] = useState(true);


  const requestCameraPermission = async () => {
    const cameraPermission = Platform.select({
      ios: PERMISSIONS.IOS.CAMERA,
      android: PERMISSIONS.ANDROID.CAMERA,
    });
  
    try {
      // Request camera permission
      const cameraPermissionStatus = await check(cameraPermission);
      if (cameraPermissionStatus !== RESULTS.GRANTED) {
        const cameraResult = await request(cameraPermission);
        if (cameraResult !== RESULTS.GRANTED) {
          console.log('Camera permission denied');
          // Handle denial as needed
          return;
        }
        else{
          // onHandleAccordion(true);
        }
      }
  
      console.log('Camera permission granted');
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(()=>{
    if(fields.value.length > 0){
      photoArray("",fields)
    }
    requestCameraPermission()
  },[])

  const device = useCameraDevice(isRareCamera ? 'back' : 'front');

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Camera permission is required</Text>
        <TouchableOpacity style={[{backgroundColor:THEME_COLOR,color:'white' ,width:'100%',borderRadius:10,padding:10},globalStyles.flexBox]} onPress={requestCameraPermission}>
          <Text style={{color:'white'}}>Request Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }
  // console.log("photo clicked => ",capturedPhotos[0]);
  if (!device) {
    return (
      <View style={styles.container}>
        <Text>No camera device available</Text>
      </View>
    );
  }

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
  };

  const handleCloseCamera = () => {
    // setCapturedPhotos([]);
    setIsCameraOpen(false);
    setSelectedImage(null); // Reset selected image when closing the camera
  };

 
  

  const handleCapturePhoto = async () => {
    // console.log("aa raha ahai");
    try {
      const photo = await cameraRef.current.takePhoto();
      setCapturedPhotos(prevPhotos => [...prevPhotos, photo]);
      // console.log("aa raha ahai 2");
      setShowCapturedPhotos(true);
      let base64 = await imageToBase64(photo.path);
    
      photoArray(base64,fields);
      onPhotoCapture && onPhotoCapture(photo);
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };
  // console.log("===========================================")

  // console.log("capture photos => ",capturedPhotos,"fields key =>",fields.placeholder ," value fields => ",fields.value);
  // console.log("===========================================")

  const handleImageClick = index => {
    // console.log("photo click => ",photo);
    if(capturedPhotos.length > 0){
      setSelectedImage(capturedPhotos[index]);
    }
    else{
      console.log("fields value => ",fields.value[index])
      setSelectedImage(fields.value[index]);
    }

  };

  // Function to convert image to Base64
  const imageToBase64 = async imagePath => {
    try {
      // Fetch the image file using the 'file://' URI scheme
      const response = await fetch(`file://${imagePath}`);
      const blob = await response.blob();

      // Convert the blob to Base64
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(blob);
      });

      // Log or use the Base64 string as needed
      // console.log('Base64:', base64);

      return base64;
    } catch (error) {
      console.error('Error converting image to Base64:', error);
      throw error;
    }
  };

  // Example usage

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        style={[
          styles.openCameraButton,
          globalStyles.rowContainer,
          globalStyles.flexBoxAlign,
        ]}
        onPress={handleOpenCamera}>
        <Text style={styles.openCameraButtonText}>Click {fields.placeholder}</Text>
        <MaterialCommunityIcons
          name={'image-multiple'}
          color="white"
          size={25}
        />
      </TouchableOpacity>
      {((capturedPhotos.length > 0 && showCapturedPhotos) ||
        (fields.value.length > 0 && !showCapturedPhotos)) && (
        <View style={{ marginTop: 10, width: '90%' }}>
          <FlatList
            data={
              showCapturedPhotos
                ? capturedPhotos
                : fields.value.length > 0
                ? fields.value
                : []
            }
            horizontal
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => handleImageClick(index)}>
                <Image
                  source={{
                    uri: showCapturedPhotos
                      ? `file://${item.path}`
                      : item,
                  }}
                  style={{ width: 100, height: 100, marginHorizontal: 2 }}
                  key={index}
                />
                <TouchableOpacity
                  onPress={async() => {
                    let base64 = await imageToBase64(item.path);
                    deletePhoto(base64,fields);
                    let arr = capturedPhotos.filter((_, ind) => ind !== index);
                    setCapturedPhotos(arr);
                    if (capturedPhotos.length == 1) {
                      setSelectedImage(null);
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
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={false}
        visible={isCameraOpen}>
        <View style={styles.modalContainer}>
          <Camera
            style={styles.camera}
            device={device}
            isActive={true}
            ref={cameraRef}
            photo={true}
            onInitialized={() => {
              // Initialization logic
            }}
            onError={error => {
              console.error('Camera error:', error);
            }}
          />
          <TouchableOpacity
            style={styles.closeCameraButton}
            onPress={handleCloseCamera}>
            <MaterialCommunityIcons
              name={'file-excel-box-outline'}
              size={40}
              color={'white'}
            />
          </TouchableOpacity>

          <View
            style={[
              {
                width: '100%',
                height: 120,
                backgroundColor: 'black',
                position: 'absolute',
                bottom: 0,
                justifyContent: 'space-around',
              },
              globalStyles.rowContainer,
              globalStyles.flexBoxAlign,
            ]}>
            <View style={[{width: '33%'}, globalStyles.flexBox]}>
              <View style={styles.capturedPhotosContainer}>
                {/* {capturedPhotos.map((photo, index) => ( */}
                {capturedPhotos.length > 0 ? (
                  <TouchableOpacity
                    // key={index}
                    onPress={() => {setIsCameraOpen(false), handleImageClick(capturedPhotos.length - 1)}}>
                    <Image
                      source={{
                        uri: `file://${
                          capturedPhotos[capturedPhotos.length - 1].path
                        }`,
                      }}
                      style={styles.capturedPhoto}
                    />
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
                {/* ))} */}
              </View>
            </View>

            <View style={[{width: '33%'}, globalStyles.flexBox]}>
              <View style={[styles.captureButton, globalStyles.flexBox]}>
                <TouchableOpacity
                  style={[
                    {
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'white',
                      borderRadius: 40,
                    },
                  ]}
                  onPress={handleCapturePhoto}></TouchableOpacity>
              </View>
            </View>
            <View style={[{width: '33%'}, globalStyles.flexBox]}>
              <TouchableOpacity onPress={() => setIsRareCamera(!isRareCamera)}>
                <MaterialCommunityIcons
                  name={'camera-flip'}
                  size={40}
                  color={'white'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {selectedImage && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={selectedImage != null}>
          <FlatList
            data={showCapturedPhotos
              ? capturedPhotos
              : fields.value.length > 0
              ? fields.value
              : []}
            horizontal
            pagingEnabled
            renderItem={({item, index}) => (
              <View style={styles.modalContainer}>
                {/* {console.log("asdfghjkl =",item.path)} */}
                <Image
                  source={{uri: showCapturedPhotos
                    ? `file://${item.path}`
                    : item,}}
                  style={{width: width, height: height}}
                  resizeMode="contain"
                />
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
                  style={styles.deleteImageButton}
                  onPress={async() => {
                    let base64 = await imageToBase64(item.path);
                    deletePhoto(base64,fields);
                    let arr = capturedPhotos.filter((_, ind) => ind !== index);
                    setCapturedPhotos(arr);
                    if (capturedPhotos.length == 1) {
                      setSelectedImage(null);
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
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginVertical:3
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

export default CameraComponent;
