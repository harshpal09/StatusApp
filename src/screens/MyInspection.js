import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  FlatList,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ImageBackground,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  isLoggedIn,
  setBadges,
  setMaterial,
  setMaterialType,
  setProfileDetails,
} from '../../redux/features/GlobalSlice';
import {THEME_COLOR, globalStyles, height, width} from '../utils/Style';
import {
  DarkTextMedium,
  DarkTextSmall,
  FadeTextMedium,
  FadeTextSmall,
  FloatingButton,
  ItemContainer,
  MainContainer,
} from '../components/StyledComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {allInspection, getAllotedInventory, getMessages} from '../services/Api';
import { useFocusEffect } from '@react-navigation/native';
import { getMessage } from '@reduxjs/toolkit/dist/actionCreatorInvariantMiddleware';
export default function MyInspection({navigation}) {
  const user_data = useSelector(s => s.global.userDetails);
  var val = typeof user_data === 'object' ? user_data : JSON.parse(user_data);

  const dispatch = useDispatch();
  const [containerHeight, setContainerHeight] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const openPhoneDialer = number => {
    Linking.openURL(`tel:${number}`);
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  useEffect(() => {
    getData();
  }, []);

 

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getMessages();

      // console.log("get data =>",response.data.data)
      if (response.data.data.code != undefined && response.data.data.code) {
        // console.log("data =>", response.data.data.data);
        // dispatch(setMaterialType(response.data.data.data))
        setData(response.data.data.data);
      } else {
      }
    } catch (error) {
      console.log('error ', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // console.log("data =>",data);
  return (
    // <SafeAreaView style={{flex: 1}}>
      <MainContainer
      // style={{ flex: 1,padding:10 }}
      >
        <ImageBackground  source={require('../assets/images/background_logo_medium.jpg')} style={{flex:1}}>
        {data.length > 0 ? (
          <FlatList
            style={{ paddingHorizontal: 10,flexGrow:1}}
            data={data}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={getData} />
            }
            ListEmptyComponent={() => (
              <View
                style={{flex: 1, justifyContent: 'center', alignItems: 'center',width:width,height:height-100}}>
                <ActivityIndicator size="large" color={THEME_COLOR} />
              </View>
            )}
            renderItem={item => (
              <ItemContainer
                onPress={() => {
                  navigation.navigate('bankjobprofile', {id: item.item.id});
                }}
                style={{width: '100%'}}>
                {/* {console.log('item =.',item.item)} */}

                <View style={[globalStyles.rowContainer]}>
                  <View
                    style={[
                      {
                        width: '100%',
                        backgroundColor: 'transparent',
                        paddingHorizontal: 10,
                      },
                    ]}>
                    {/* <DarkTextSmall style={[{padding: 5}]}>
                Inspection Report
              </DarkTextSmall> */}
                    <View
                      style={[
                        {
                          width: '100%',
                          backgroundColor: 'transparent',
                          flex: 1,
                        },
                        globalStyles.flexBox,
                      ]}>
                      <View
                        style={[
                          {
                            width: '100%',
                            backgroundColor: 'transparent',
                            // padding: 5,
                          },
                          globalStyles.rowContainer,
                          globalStyles.flexBoxAlign,
                        ]}>
                        <FadeTextMedium style={{padding: 5}}>
                          Status :
                        </FadeTextMedium>
                        <View
                          style={[
                            {
                              // width: '50%',
                              paddingHorizontal: 10,
                              paddingVertical: 3,
                              backgroundColor: 'transparent',
                              justifyContent: 'space-around',
                              borderWidth: 1,
                              borderColor:
                                item.item.status != 'Pending'
                                  ? 'green'
                                  : '#d9a107',
                              padding: 2,
                              borderRadius: 10,
                            },
                            globalStyles.rowContainer,
                            globalStyles.flexBoxAlign,
                          ]}>
                          <MaterialCommunityIcons
                            name={
                              item.item.status != 'Pending'
                                ? 'check-circle'
                                : 'alert-circle'
                            }
                            size={10}
                            color={
                              item.item.status != 'Pending'
                                ? 'green'
                                : '#d9a107'
                            }
                          />
                          <DarkTextSmall
                            style={{
                              paddingHorizontal: 10,
                              color:
                                item.item.status != 'Pending'
                                  ? 'green'
                                  : '#d9a107',
                            }}>
                            {item.item.status != 'Pending'
                              ? item.item.status
                              : 'Pending'}
                          </DarkTextSmall>
                        </View>
                      </View>
                    </View>
                    <View
                      style={[
                        {width: '100%', backgroundColor: 'transparent'},
                        globalStyles.rowContainer,
                        globalStyles.flexBox,
                      ]}>
                      <View
                        style={[
                          {width: '100%', backgroundColor: 'transparent'},
                          globalStyles.rowContainer,
                        ]}>
                        <FadeTextMedium style={{padding: 5}}>
                          Assign To :
                        </FadeTextMedium>
                        <DarkTextMedium style={{width: '80%', padding: 5}}>
                          {item.item.assigned_to}
                        </DarkTextMedium>
                      </View>
                    </View>
                    <View
                      style={[
                        {width: '100%', backgroundColor: 'transparent'},
                        globalStyles.rowContainer,
                        globalStyles.flexBox,
                      ]}>
                      <View
                        style={[
                          {width: '100%', backgroundColor: 'transparent'},
                          globalStyles.rowContainer,
                        ]}>
                        <FadeTextMedium style={{padding: 5}}>
                          Bank Branch :
                        </FadeTextMedium>
                        <DarkTextMedium style={{width: '80%', padding: 5}}>
                          {item.item.branch}
                        </DarkTextMedium>
                      </View>
                    </View>
                    <View
                      style={[
                        {width: '100%', backgroundColor: 'transparent'},
                        globalStyles.rowContainer,
                        globalStyles.flexBox,
                      ]}>
                      <View
                        style={[
                          {width: '100%', backgroundColor: 'transparent'},
                          globalStyles.rowContainer,
                        ]}>
                        <FadeTextMedium style={{padding: 5}}>
                          Description :
                        </FadeTextMedium>
                        <DarkTextMedium style={{width: '80%', padding: 5}}>
                          {item.item.remark}
                        </DarkTextMedium>
                      </View>
                    </View>
                    <View
                      style={[
                        {width: '100%', backgroundColor: 'transparent'},
                        globalStyles.rowContainer,
                        globalStyles.flexBox,
                      ]}>
                      <View
                        style={[
                          {width: '100%', backgroundColor: 'transparent'},
                          globalStyles.rowContainer,
                        ]}>
                        <FadeTextMedium style={{padding: 5}}>
                          File :
                        </FadeTextMedium>
                        <TouchableOpacity
                          style={{width: '100%'}}
                          onPress={() => openBrowser(item.item.file)}>
                          <DarkTextMedium
                            style={{
                              width: '90%',
                              padding: 5,
                              color: THEME_COLOR,
                            }}>
                            {item.item.file}
                          </DarkTextMedium>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={[
                        {width: '100%', backgroundColor: 'transparent'},
                        globalStyles.rowContainer,
                        globalStyles.flexBox,
                      ]}>
                      <View
                        style={[
                          {width: '100%', backgroundColor: 'transparent'},
                          globalStyles.rowContainer,
                        ]}>
                        <FadeTextMedium style={{padding: 5}}>
                          Add By :
                        </FadeTextMedium>
                        <DarkTextMedium style={{width: '50%', padding: 5}}>
                          {item.item.add_by}
                        </DarkTextMedium>
                      </View>
                    </View>
                    <View
                      style={[
                        {width: '100%', backgroundColor: 'transparent'},
                        globalStyles.rowContainer,
                        globalStyles.flexBox,
                      ]}>
                      <View
                        style={[
                          {width: '100%', backgroundColor: 'transparent'},
                          globalStyles.rowContainer,
                        ]}>
                        <FadeTextMedium style={{padding: 5}}>
                          Created Date :
                        </FadeTextMedium>
                        <DarkTextMedium style={{width: '80%', padding: 5}}>
                          {item.item.created_at}
                        </DarkTextMedium>
                      </View>
                    </View>
                  </View>
                </View>
              </ItemContainer>
            )}
          />
        ):(
          <ScrollView
            style={{
              backgroundColor: 'transparent',
              width: width,
              height: height,
            }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={getData} />
            }>
            <View
              style={[
                {flex: 1, backgroundColor: 'transparent', height: height - 200},
                globalStyles.flexBox,
              ]}>
              <DarkTextMedium style={{fontSize:20,marginBottom:300}} >There is no message yet</DarkTextMedium>
            </View>
          </ScrollView>
        )}
        </ImageBackground> 
      </MainContainer>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
