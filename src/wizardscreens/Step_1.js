import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomDropdown, CustomTextInput, InspectionDetails} from '../../export';
import {
  Container,
  DarkTextLarge,
  DarkTextMedium,
  DarkTextSmall,
  FadeTextMedium,
  ItemContainer,
  LightThemeColorTextMedium,
  StyledButton,
} from '../components/StyledComponent';
import CameraComponent from '../components/CameraComponent';
import {useDispatch, useSelector} from 'react-redux';
import {ORANGE_COLOR, THEME_COLOR, globalStyles, width} from '../utils/Style';
import {setSendData} from '../../redux/features/GlobalSlice';
import {
  getEstimates,
  submitForm,
  submitFormStartWorking,
} from '../services/Api';
import ChooseTaggle from '../components/ChooseToggle';
import CustomDropdownAqua from '../components/CustomDropdownAqua';
import {Dropdown, SelectCountry} from 'react-native-element-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Test from '../components/Test';

export default function Step_1({}) {
  const [selectedImage, setSelectedImage] = useState('Bill Photo');
  const [allEstimates, setAllEstimates] = useState([]);
  const data = [
    {
      placeholder: 'Bank manager Name',
      name: 'manager',
      type: 'text',
      elements: [],
      value: '',
    },
    {
      placeholder: 'Designation',
      name: 'designation',
      type: 'text',
      elements: [],
      value: '',
    },
    {
      placeholder: 'Mobile Number',
      name: 'mobile',
      type: 'text',
      elements: [],
      value: '',
    },
    {
      placeholder: 'Description',
      name: 'remark',
      type: 'text',
      elements: [],
      value: '',
    },
    {
      placeholder: 'Select Estimate',
      name: 'estimate',
      type: 'multiselect',
      elements: [],
      value: [],
    },
    {
      placeholder: 'Select image to upload',
      name: 'image_type',
      type: 'dropdown',
      elements: ['Challan Photo', 'Bill Photo'],
      value: '',
    },
    {
      placeholder: selectedImage,
      name: 'billphoto',
      type: 'file',
      elements: [],
      value: [],
    },
    {
      placeholder: 'After Photo',
      name: 'photo',
      type: 'file',
      elements: [],
      value: [],
    },
  ];
  const api_send_data = useSelector(state => state.global.send_data);
  const userDetails = useSelector(state => state.global.use);

  const [error, setError] = useState({
    error: '',
    success: '',
  });
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log("send data ->",api_send_data)
  const handleInputChange = text => {};

  useEffect(() => {
    getAllEstimates();
  }, []);

  // console.log('data send  => ',allEstimates );
  // console.log(api_send_data, 'data send  => ');

  const getAllEstimates = async () => {
    // console.log('aerrrrr => ', val.id);
    try {
      setLoading(true);
      const response = await getEstimates();
      // console.log('data =>', response.data);
      if (response.data.data.code != undefined && response.data.data.code) {
        setAllEstimates(response.data.data.data);
      }
    } catch (error) {
      console.log('error ', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({item, index}) => {
    // console.log('Item type:', item.type);
    return item.type === 'file' ? (
      <CameraComponent fields={item} />
    ) : item.type === 'text' ? (
      <CustomTextInput onInputChange={handleInputChange} fields={item} />
    ) : item.type === 'multiselect' ? (
      <SelectMaterial data={allEstimates} fields={item} />
    ) : item.type === 'dropdown' ? (
      <CustomDropdown onInputChange={setSelectedImage} fields={item} />
    ) : (
      <></>
    );
  };
  const showAlert = message => {
    Alert.alert('Submitted Successfully !', message, [
      {
        text: 'OK',
      },
    ]);
  };
  const onSubmit = async () => {
    setToggle(true);
    try {
      const res = await submitFormStartWorking({data: api_send_data});
      // console.log("message =>",res.data.data)
      if (res != null && res.data.data.code == 200) {
        showAlert(res.data.data.message);
        setError(prev => ({
          ...prev,
          success: res.data.data.message,
          error: '',
        }));
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

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <Container>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{width: '90%'}}
          ListHeaderComponent={() => (
            <View>
              <InspectionDetails />
            </View>
          )}
          ListFooterComponent={() => (
            <Container>
              {(error.error != '' || error.success != '') && (
                <Text
                  style={{
                    fontSize: 13,
                    color: error.error != '' ? 'red' : 'green',
                  }}>
                  {error.error == '' ? error.success : error.error}
                </Text>
              )}
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
                  onPress={onSubmit}
                  activeOpacity={0.5}
                  disabled={toggle}>
                  {toggle ? (
                    <View style={globalStyles.rowContainer}>
                      <DarkTextMedium style={{color: '#FFF'}}>
                        Please wait...{' '}
                      </DarkTextMedium>
                      <ActivityIndicator size={'small'} color={'white'} />
                    </View>
                  ) : (
                    <DarkTextMedium style={{color: 'white'}}>
                      Submit
                    </DarkTextMedium>
                  )}
                </TouchableOpacity>
              </View>
            </Container>
          )}
          data={data}
          renderItem={renderItem}
        />
      </Container>
      {/* <Test /> */}
    </SafeAreaView>
  );
}

const SelectMaterial = ({data, fields, onInputChange}) => {
  const dispatch = useDispatch();

  const placeholder = 'Material';
  const [color, setColor] = useState('red');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState({});
  const [count, setCount] = useState(1);
  const [error, setError] = useState('');
  const api_send_data = useSelector(state => state.global.send_data);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    handleSelect();
  }, [selectedValue]);

  const handleSelect = () => {};
  // console.log('fields =>', api_send_data);

  const addEstimate = () => {

    if (Object.keys(selectedValue).length === 0) {
      setError('Please select a material first.');
      return;
    }
    let obj = {...selectedValue};
    obj.quantity = count;
    let respobj = {...api_send_data};

   
      if (respobj[fields.name]) {
        let arr = [...respobj[fields.name]];

        let existingIndex = arr.findIndex(item => item.id === obj.id);

        if (existingIndex !== -1) {
          const newobj = {...arr[existingIndex]};
          newobj.quantity = count;
          arr[existingIndex] = newobj;
        } else {
          arr.push(obj);
        }
        respobj[fields.name] = arr;
      } else {
        respobj[fields.name] = [obj];
      }
      setCount(1);
      setSelectedValue({});
      setColor('red');
      setError("");
      dispatch(setSendData(respobj));
    
  };
  const onHandleDelete = (id) => {
    const updatedData = {
      ...api_send_data,
      [fields.name]: api_send_data[fields.name].filter(item => item.id !== id)
    };

    dispatch(setSendData(updatedData));
  };

  

  return (
    <View
      style={[
        {width: '100%', backgroundColor: 'transparent', padding: 10},
        globalStyles.columnContainer,
      ]}>
      <View
        style={[
          styles.container,
          globalStyles.flexBox,
          {backgroundColor: 'transparent'},
        ]}>
        <Dropdown
          style={[styles.dropdown, {borderColor: color}]}
          selectedTextStyle={[styles.selectedTextStyle, {color: color}]}
          placeholderStyle={[styles.placeholderStyle, {color: color}]}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          iconColor={color}
          maxHeight={300}
          value={selectedValue}
          data={data}
          valueField="id"
          labelField="estimate"
          searchField="estimate" // Specify the field to search in your data list
          placeholder={'Select ' + placeholder}
          searchPlaceholder="Search..."
          onChange={e => {
            setColor('blue');
            setSelectedValue(e);
          }}
        />
      </View>
      <View
        style={[
          {
            backgroundColor: 'transparent',
            left: 30,
            paddingVertical: 10,
            width: '30%',
          },
        ]}>
        <DarkTextMedium>Quantity :</DarkTextMedium>
        <View
          style={[
            globalStyles.rowContainer,
            globalStyles.flexBox,
            {backgroundColor: 'transparent'},
          ]}>
          <TouchableOpacity
            onPress={() => setCount(prev => (prev > 1 ? prev - 1 : prev))}>
            <MaterialCommunityIcons name={'minus-box'} size={35} />
          </TouchableOpacity>
          <DarkTextLarge
            style={{
              borderColor: THEME_COLOR,
              borderWidth: 1,
              width: 30,
              textAlign: 'center',
              borderRadius: 4,
              marginHorizontal: 5,
            }}>
            {count}
          </DarkTextLarge>
          <TouchableOpacity onPress={() => setCount(prev => prev + 1)}>
            <MaterialCommunityIcons name={'plus-box'} size={35} />
          </TouchableOpacity>
        </View>
      </View>
      {error && <DarkTextMedium style={{color: 'red'}}>{error}</DarkTextMedium>}
      <StyledButton
        onPress={addEstimate}
        style={[
          {width: '100%'},
          globalStyles.flexBox,
          globalStyles.rowContainer,
        ]}>
        <MaterialCommunityIcons
          name={'plus-circle'}
          size={20}
          color={'white'}
        />
        <DarkTextMedium style={{color: 'white', fontSize: 20, marginLeft: 5}}>
          Add
        </DarkTextMedium>
      </StyledButton>
      {api_send_data[fields.name] && (
        <FlatList
          data={api_send_data[fields.name]}
          renderItem={({item, index}) => (
            <ItemContainer
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
                      Estimate :
                    </FadeTextMedium>
                    <DarkTextMedium style={{width: '50%', padding: 0}}>
                      {item.estimate}
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
                      Type :
                    </FadeTextMedium>
                    <DarkTextMedium style={{width: '50%', padding: 0}}>
                      {item.type}
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
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  dropdown: {
    width: '100%',
    margin: 16,
    height: 50,
    // borderColor: THEME_COLOR,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  imageStyle: {
    width: 24,
    height: 24,
  },
  placeholderStyle: {
    fontSize: 16,
    // color:THEME_COLOR,
    fontWeight: '800',
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
    // color:THEME_COLOR,
    fontWeight: '800',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
