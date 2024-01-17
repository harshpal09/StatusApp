import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomDropdown, CustomTextInput, InspectionDetails} from '../../export';
import {Container, DarkTextMedium} from '../components/StyledComponent';
import CameraComponent from '../components/CameraComponent';
import {useDispatch, useSelector} from 'react-redux';
import {ORANGE_COLOR, globalStyles} from '../utils/Style';
import {setSendData} from '../../redux/features/GlobalSlice';
import {submitForm} from '../services/Api';

export default function Step_2({}) {
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
      type: 'textarea',
      elements: [],
      value: '',
    },
    {
      placeholder: 'Photo',
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
  // console.log("send data ->",api_send_data)
  const handleInputChange = text => {};
  console.log('data send  => ', api_send_data);

  // console.log(api_send_data, 'data send  => ');
  const renderItem = ({item, index}) => {
    // console.log('Item type:', item.type);
    return item.type === 'file' ? (
      <CameraComponent fields={item} />
    ) : (
      <CustomTextInput onInputChange={handleInputChange} fields={item} />
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
      const res = await submitForm({data: api_send_data});
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
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Container>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{width: '90%'}}
          ListHeaderComponent={() => <InspectionDetails />}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
