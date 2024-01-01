import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  Alert,
} from 'react-native';
import {
  LIGHT_BLUE,
  ORANGE_COLOR,
  THEME_COLOR,
  globalStyles,
  width,
} from '../utils/Style';
import {
  CustomDropdown,
  CustomTextInput,
  DatePicker,
  MultiSelectDropdown,
} from '../../export';
import {
  Container,
  DarkTextLarge,
  DarkTextMedium,
  FadeTextMedium,
  FadeTextSmall,
  ItemContainer,
} from './StyledComponent';
import {
  Camera,
  useCameraPermission,
  useCameraDevice,
} from 'react-native-vision-camera';
import CameraComponent from './CameraComponent';
import {documentsForm, getAllotedInventory, getRemarkHistory, submitForm} from '../services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {getStateFromPath, useNavigation} from '@react-navigation/native';
import {
  setMaterial,
  setSendData,
  setWizardCurrentStep,
} from '../../redux/features/GlobalSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { ParentContext } from '../wizardscreens/Step_1';
import VideoComponent from './VideoComponent';
import Material from './Material';
import CustomDropdownAqua from './CustomDropdownAqua';
import { ParentContext } from '../wizardscreens/Step_1';

const AccordionView = ({
  isSubChild,
  title,
  fields,
  expanded,
  handleAccordion,
  fieldIndex,
  mainIndex,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedText, setSelectedText] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [send_data, setSendData] = useState({});
  const [toggle, setToggle] = useState(false);
  const [field_data, setFieldData] = useState(fields);
  const [clickedPhoto, setClickedPhotos] = useState([]);
  const [send_data_obj, setSendDataObj] = useState({});

  const [error, setError] = useState({
    error: '',
    success: '',
  });
  const [item, setItem] = useState([
    // {
    //   name: 'Description',
    //   icon: 'file',
    // },
    {
      name: 'Material',
      icon: 'car-lifted-pickup',
    },
    {
      name: 'Payment',
      icon: 'car-seat-cooler',
    },
  ]);
  const [material, setMaterial] = useState([]);
  const [history, setHistory] = useState([]);

  const [material_data, setMaterialData] = useState(['']);
  const dispatch = useDispatch();
  const wizobj = useSelector(state => state.global.wizardObj);

  const user_data = useSelector(s => s.global.userDetails);
  var val = typeof user_data === 'object' ? user_data : JSON.parse(user_data);

  // const dispatch = useDispatch();
  // const [containerHeight, setContainerHeight] = useState(0);
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [refreshing, setRefreshing] = useState(false);
  // const openPhoneDialer = number => {
  //   Linking.openURL(`tel:${number}`);
  // };
  const navigation = useNavigation();

  const parentFunction = useContext(ParentContext);


  useEffect(() => {
    getData();
    getPreviousHistory();
  }, []);
  const onSetPaymentDetails = text => {
    let newobj = {...api_send_data};
    newobj.payment_type = text;
    dispatch(setSendData(newobj));
  };

  const api_send_data = useSelector(state => state.global.send_data);
  // console.log("api send data =>",api_send_data);
  const onHandleSendData = newMaterial => {
    setError(prev => ({...prev, error: ''}));
    setSendDataObj(newMaterial);
  };
  // console.log('send data => => ', api_send_data);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAllotedInventory({id: val.id});

      if (response.data.data.code != undefined && response.data.data.code) {
        // console.log("data =>", response.data.data.data);
        // dispatch(setMaterialType(response.data.data.data))
        setMaterial(response.data.data.data);
      } else {
      }
    } catch (error) {
      console.log('error ', error);
    } finally {
      setLoading(false);
      // setRefreshing(false);
    }
  };
  const getPreviousHistory = async () => {
    try {
      setLoading(true);
      const response = await getRemarkHistory({id:api_send_data.id,type:api_send_data.type});

      if (response.data.data.code != undefined && response.data.data.code) {
        // console.log("data =>", response.data.data.data);
        // dispatch(setMaterialType(response.data.data.data))
        setHistory(response.data.data.data);
      } else {
      }
    } catch (error) {
      console.log('error ', error);
    } finally {
      setLoading(false);
      // setRefreshing(false);
    }
  };

  // console.log("matreial =>",hstory)
  const handleClickPhotoDelete = photo => {
    // setSendData((prevData) => {
    //   // Create a copy of the object
    const newObj = {...api_send_data};
    // If the key exists in the object, push the photo to the array
    const photoarray = [...newObj.photo];
    const newArray = photoarray.filter(element => element !== photo);

    // if (newObj[field.name]) {
    //   newObj[field.name].push(photo);
    // } else {
    // If the key does not exist, create a new array with the photo
    newObj.photo = [...newArray];
    dispatch(setSendData(newObj));
    // }
    // Return the updated object
    // return newObj;
    // });
  };
  const handleTextInputChange = (event, key) => {
    // console.log('evernt  => ', event, ' test =>', key);
    let newobj = {...api_send_data};
    newobj[key] = event;
    dispatch(setSendData(newobj));
  };
  // console.log('photo array length =>', api_send_data.photo.length);
  const handleClickPhotoChange = photo => {
    let newobj = {...api_send_data};
    let arr = [...newobj.photo];
    arr.push(photo);
    newobj.photo = [...arr];

    // newobj.photo.push(photo);
    dispatch(setSendData(newobj));
  };
  const onHandleDelete = id => {
    const updatedMaterial = api_send_data.material.filter(
      item => item.id !== id,
    );

    // Create a new object with the updated material array
    const newobj = {...api_send_data, material: updatedMaterial};

    let total = 0;
    newobj.material.map((data, ind) => {
      total += parseInt(data.total);
    });

    newobj.total_amount = total;

    // Dispatch the updated state
    dispatch(setSendData(newobj));
  };
  const onHandleAdd = () => {
    let arr = [...material_data];
    // arr.push({
    //   "placeholder": "Material name",
    //   "name": "electrical_interior_no_power_window_status",
    //   "type": "material",
    //   "elements": [],
    //   "value": ""
    // });
    // dispatch(setMaterial(arr));
  };
  const renderField = field => {
    switch (field.type) {
      case 'text':
        return (
          <CustomTextInput
            onInputChange={handleTextInputChange}
            fields={{
              placeholder: 'Please Enter Recieved amount',
              name: 'description',
              type: 'due',
              elements: [],
              value: api_send_data.due,
            }}
          />
        );
      case 'dropdown':
        return (
          <CustomDropdown
            onInputChange={handleTextInputChange}
            fields={field}
          />
        );
      case 'date':
        return (
          <DatePicker onInputChange={handleTextInputChange} fields={field} />
        );
      case 'multipleselect':
        return (
          <MultiSelectDropdown
            onInputChange={handleTextInputChange}
            fields={field}
          />
        );
      case 'file':
        return (
          <CameraComponent
            deletePhoto={handleClickPhotoDelete}
            fields={field}
            photoArray={handleClickPhotoChange}
            onHandleAccordion={onHandleAccordion}
          />
        );
      case 'video':
        return (
          <VideoComponent fields={field} videoArray={handleClickPhotoChange} />
        );
      case 'textarea':
        return (
          <CustomTextInput
            onInputChange={handleTextInputChange}
            fields={{
              placeholder: 'Please describe the problem',
              name: 'description',
              type: 'remark',
              elements: [],
              value: api_send_data.remark,
            }}
            isTextArea={true}
          />
        );

      case 'material':
        return (
          <View style={{backgroundColor: 'transparent', width: '100%'}}>
            {
              loading ? (
                <ActivityIndicator size={'small'} color={THEME_COLOR} />
              ) : (
                <Material fields={material} onInputChange={onHandleSendData} />
              )

              // <Text>agya</Text>
            }
            {/* <View
              style={[
                {
                  width: '100%',
                  backgroundColor: 'transparent',
                  justifyContent: 'space-between',
                },
                globalStyles.rowContainer,
              ]}>
              <View
                style={{
                  height: 40,
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                }}>
                <TouchableOpacity onPress={onHandleDelete}>
                  <MaterialCommunityIcons
                    name={'minus-circle'}
                    color={'red'}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 40,
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                }}>
                <TouchableOpacity onPress={onHandleAdd}>
                  <MaterialCommunityIcons
                    name={'plus-circle'}
                    color={THEME_COLOR}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
            </View> */}
          </View>
        );
      case 'payment':
        return (
          <View style={{width: '100%'}}>
            <View
              style={[
                {width: '100%', padding: 5},
                globalStyles.rowContainer,
                globalStyles.flexBox,
              ]}>
              <View
                style={[
                  {width: '100%'},
                  globalStyles.rowContainer,
                  globalStyles.flexBox,
                ]}>
                <DarkTextLarge style={{width: '50%', padding: 5}}>
                  Total Amount:
                </DarkTextLarge>
                <DarkTextMedium style={{width: '50%', padding: 5}}>
                  {'₹ ' + api_send_data.total_amount}
                </DarkTextMedium>
              </View>
            </View>
            <View
              style={[
                {width: '100%', padding: 5},
                globalStyles.rowContainer,
                globalStyles.flexBox,
              ]}>
              <View
                style={[
                  {width: '100%'},
                  globalStyles.rowContainer,
                  globalStyles.flexBox,
                ]}>
                <DarkTextLarge style={{width: '50%', padding: 5}}>
                  Payment Status:
                </DarkTextLarge>
                <CustomDropdownAqua
                  fields={{
                    elements: ['pending', 'online', 'cash'],
                    placeholder: 'Payment Status',
                    value: api_send_data.payment_type,
                  }}
                  onInputChange={onSetPaymentDetails}
                />
              </View>
            </View>

            {api_send_data.payment_type == 'pending' && (
              <CustomTextInput
                onInputChange={handleTextInputChange}
                fields={{
                  placeholder: ' Recieved amount',
                  name: 'description',
                  type: 'due',
                  elements: [],
                  value: api_send_data.due,
                }}
              />
            )}
          </View>
        );
      // Add more cases for other types
      default:
        return null;
    }
  };
  const showAlert = message => {
    Alert.alert('Submitted Successfully !', message, [
      {
        text: 'OK',
        onPress: () => {parentFunction()},
      },
    ]);
  };

  const onSubmit = async () => {
    setToggle(true);
    try {
      const res = await submitForm({data: api_send_data});
      if (res != null && res.data.data.code == 200) {
        showAlert(res.data.data.message);
        setError(prev => ({
          ...prev,
          success: res.data.data.message,
          error: '',
        }));
        
        if(wizobj.currentStep == 'material'){
          let obj = {...wizobj};
          obj.currentStep = item[parseInt(obj.index) + 1].name.toLowerCase();
          obj.index = parseInt(obj.index) + 1;
          dispatch(setWizardCurrentStep(obj));
        }

        // parentFunction();
      } else if (res.error != '') {
        setError(prev => ({...prev, error: '**' + res.error}));
      } else {
        setError(prev => ({...prev, error: '**' + res.data.data.message}));
      }
    } catch {
    } finally {
      setToggle(false);
    }
  };
  const onHandleAccordion = val => {
    onHandleAccordion(val);
  };
  const onAdd = () => {
    if (Object.keys(send_data_obj).length !== 0) {
      const indexToUpdate = api_send_data.material.findIndex(
        obj => obj.id === send_data_obj.id,
      );
      let newobj = {...api_send_data};
      let newArray = [...api_send_data.material];

      // console.log("add send data => ",send_data_obj);
      // console.log("Index => ",indexToUpdate);

      if (indexToUpdate !== -1) {
        const dff = {...newArray[indexToUpdate]};
        // console.log("diff =>",send_data_obj.total)
        dff.quantity = send_data_obj.quantity;
        dff.total = send_data_obj.total;
        // newobj.total_amount = newobj.total_amount + parseInt(send_data_obj.total)
        // const updatedMaterial = { ...newArray[indexToUpdate], quantity: 2 };
        // console.log("update => ",dff);
        newArray[indexToUpdate] = dff;
        newobj.material = newArray;
      } else {
        // newobj.total_amount = newobj.total_amount + parseInt(send_data_obj.total)
        newArray.push(send_data_obj);
        newobj.material = newArray;
      }
      let total = 0;
      newobj.material.map((data, ind) => {
        total += parseInt(data.total);
      });

      newobj.total_amount = total;
      // console.log('new obj  =>', newobj);
      // setSendDataObj({})
      dispatch(setSendData({...newobj}));
    } else {
      setError(prev => ({...prev, error: 'Please select material type first'}));
    }
  };

  const addDescription = () => {
    let newobj = {...wizobj};
    if (wizobj.currentStep == 'material') {
      newobj.currentStep = 'payment';
      newobj.index = 1;
    }

    dispatch(setWizardCurrentStep(newobj));
  };

  return (
    <SafeAreaView
      style={[
        globalStyles.flexBoxJustify,
        {
          borderWidth: expanded ? 1 : 0,
          borderTopWidth: 0,
          borderColor: 'lightgrey',
        },
      ]}>
      {expanded && (
        <Container>
          {/* {wizobj.currentStep == 'material' ? 
          <View style={{width:'100%',height:40,justifyContent:'center',backgroundColor:'transparent'}}><TouchableOpacity onPress={onHandleAdd}><MaterialCommunityIcons style={{left:width-70}} name={'plus-circle'} color={THEME_COLOR} size={30} /></TouchableOpacity></View>
          :<></>} */}
          {field_data.map((field, index) => (
            <React.Fragment key={index}>{renderField(field)}</React.Fragment>
          ))}

          {(error.error != '' || error.success != '') && (
            <DarkTextMedium
              style={{
                fontSize: 13,
                color: error.error != '' ? 'red' : 'green',
              }}>
              {error.error == '' ? error.success : error.error}
            </DarkTextMedium>
          )}
          <View style={[{paddingTop: 10, width: '90%'}]}>
            {wizobj.currentStep == 'material' ? (
              <TouchableOpacity
                style={[
                  {
                    width: '100%',
                    // padding:10,
                    height: 40,
                    backgroundColor: ORANGE_COLOR,
                    borderRadius: 10,
                  },
                  globalStyles.flexBox,
                ]}
                onPress={onAdd}
                activeOpacity={0.9}
                disabled={toggle}>
                <DarkTextMedium style={{color: 'white', fontSize: 20}}>
                  <MaterialCommunityIcons
                    name={'plus-circle'}
                    color="white"
                    size={20}
                  />
                  Add
                </DarkTextMedium>
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
          <View style={[{paddingTop: 10, width: '90%'}]}>
            <TouchableOpacity
              style={[
                {
                  width: '100%',
                  // padding:10,
                  height: 40,
                  backgroundColor: ORANGE_COLOR,
                  borderRadius: 10,
                },
                globalStyles.flexBox,
              ]}
              onPress={() => {
                if (wizobj.currentStep != 'payment') {
                  addDescription();
                } else {
                  onSubmit();
                }
              }}
              activeOpacity={0.9}
              disabled={toggle}>
              {toggle ? (
                <ActivityIndicator size={'small'} color={'white'} />
              ) : (
                <>
                  {wizobj.currentStep != 'payment' ? (
                    <DarkTextMedium style={{color: 'white', fontSize: 20}}>
                      Next
                      <MaterialCommunityIcons
                        name={'arrow-right'}
                        color="white"
                        size={20}
                      />
                    </DarkTextMedium>
                  ) : (
                    <DarkTextMedium style={{color: 'white', fontSize: 20}}>
                      Submit
                    </DarkTextMedium>
                  )}
                </>
              )}
            </TouchableOpacity>
          </View>
          {wizobj.currentStep == 'material' ? (
            <>
              {api_send_data.material.map((item, ind) => (
                <ItemContainer
                  // onPress={() => {
                  //   navigation.navigate('Step_1', {id: 4444});
                  //   dispatch(setProfileDetails(item.item));
                  // }}
                  key={ind}
                  activeOpacity={1}
                  style={[{width: '100%'}, globalStyles.rowContainer]}>
                  <View style={{width: '90%'}}>
                    <View
                      style={[
                        {width: '100%', padding: 5},
                        globalStyles.rowContainer,
                        globalStyles.flexBox,
                      ]}>
                      <View
                        style={[
                          {width: '100%'},
                          globalStyles.rowContainer,
                          globalStyles.flexBox,
                        ]}>
                        <FadeTextMedium style={{width: '50%', padding: 0}}>
                          Material :
                        </FadeTextMedium>
                        <DarkTextMedium style={{width: '50%', padding: 0}}>
                          {item.material}
                          {/* 12/09/2023 */}
                        </DarkTextMedium>
                      </View>
                    </View>
                    <View
                      style={[
                        {width: '100%', padding: 5},
                        globalStyles.rowContainer,
                        globalStyles.flexBox,
                      ]}>
                      <View
                        style={[
                          {width: '100%'},
                          globalStyles.rowContainer,
                          globalStyles.flexBox,
                        ]}>
                        <FadeTextMedium style={{width: '50%', padding: 0}}>
                          Quantity :
                        </FadeTextMedium>
                        <DarkTextMedium style={{width: '50%', padding: 0}}>
                          {item.quantity}
                        </DarkTextMedium>
                      </View>
                    </View>
                    <View
                      style={[
                        {width: '100%', padding: 5},
                        globalStyles.rowContainer,
                        globalStyles.flexBox,
                      ]}>
                      <View
                        style={[
                          {width: '100%'},
                          globalStyles.rowContainer,
                          globalStyles.flexBox,
                        ]}>
                        <FadeTextMedium style={{width: '50%', padding: 0}}>
                          Total :
                        </FadeTextMedium>
                        <DarkTextMedium style={{width: '50%', padding: 0}}>
                          {item.total}
                        </DarkTextMedium>
                      </View>
                    </View>
                    <View
                      style={[
                        {width: '100%', padding: 5},
                        globalStyles.rowContainer,
                        globalStyles.flexBox,
                      ]}>
                      <View
                        style={[
                          {width: '100%'},
                          globalStyles.rowContainer,
                          globalStyles.flexBox,
                        ]}>
                        <FadeTextMedium style={{width: '50%', padding: 0}}>
                          Price
                        </FadeTextMedium>
                        <DarkTextMedium style={{width: '50%', padding: 0}}>
                          {item.actual_price}
                        </DarkTextMedium>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      alignItems: 'flex-end',
                      backgroundColor: 'transparent',
                    }}
                    onPress={() => onHandleDelete(item.id)}>
                    <MaterialCommunityIcons
                      color="red"
                      name={'trash-can'}
                      size={30}
                    />
                  </TouchableOpacity>
                </ItemContainer>
              ))}
            </>
          ) : (
            <></>
          )}
          {wizobj.currentStep == 'material' ? (
            <View style={{width: '90%', padding: 10}}>
              <DarkTextLarge>
                Total price : {'₹ ' + api_send_data.total_amount}
              </DarkTextLarge>
            </View>
          ) : (
            <></>
          )}
          {wizobj.currentStep == 'payment' ? (
            <View style={{backgroundColor:'transparent',width:'100%',marginTop:20}}>
              <DarkTextLarge style={{width:'100%',backgroundColor:"transparent",textAlign:'center'}}>Previous History </DarkTextLarge>
              {history.map((item, ind) => (
                <ItemContainer
                  // onPress={() => {
                  //   navigation.navigate('Step_1', {id: 4444});
                  //   dispatch(setProfileDetails(item.item));
                  // }}
                  key={ind}
                  activeOpacity={1}
                  style={[{width: '100%'}, globalStyles.rowContainer]}>
                  
                  <View style={{width: '90%'}}>
                  <View
                      style={[
                        {width: '100%', padding: 5},
                        globalStyles.rowContainer,
                        globalStyles.flexBox,
                      ]}>
                      <View
                        style={[
                          {width: '100%'},
                          globalStyles.rowContainer,
                          globalStyles.flexBoxJustify,
                        ]}>
                        <FadeTextMedium style={{width: '25%', padding: 5}}>
                          date :
                        </FadeTextMedium>
                        <DarkTextMedium style={{width: '75%', padding: 5}}>
                          {item.created_at}
                        </DarkTextMedium>
                      </View>
                    </View>
                    <View
                      style={[
                        {width: '100%', padding: 5,backgroundColor:'transparent'},
                        globalStyles.rowContainer,
                        globalStyles.flexBox,
                      ]}>
                      <View
                        style={[
                          {width: '100%',backgroundColor:'transparent'},
                          globalStyles.rowContainer,
                          globalStyles.flexBoxJustify,
                        ]}>
                        <FadeTextMedium style={{width: '25%', padding: 5,}}>
                          Description :
                        </FadeTextMedium>
                        <DarkTextMedium style={{width: '75%', paddingHorizontal: 5,textAlign:'justify'}}>
                          {item.remark}
                        </DarkTextMedium>
                      </View>
                    </View>
                  </View>

                </ItemContainer>
              ))}
            </View>
          ) : (
            <></>
          )}
        </Container>
      )}
    </SafeAreaView>
  );
};

export default AccordionView;
