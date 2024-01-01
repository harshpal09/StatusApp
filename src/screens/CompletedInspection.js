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
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {useDispatch, useSelector} from 'react-redux';
  import {
    isLoggedIn,
    setBadges,
    setProfileDetails,
  } from '../../redux/features/GlobalSlice';
  import { THEME_COLOR, globalStyles, height, width} from '../utils/Style';
  import {
    DarkTextLarge,
    DarkTextMedium,
    DarkTextSmall,
    FadeTextMedium,
    FadeTextSmall,
    FloatingButton,
    ItemContainer,
    MainContainer,
  } from '../components/StyledComponent';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  import {allInspection} from '../services/Api';
  export default function CompletedInspection({navigation}) {
    const badges = useSelector(s => s.global.badges);
    const dispatch = useDispatch();
    const [containerHeight, setContainerHeight] = useState(0);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
  
    useEffect(() => {
      getData();
    }, []);
  
    const openPhoneDialer = number => {
      Linking.openURL(`tel:${number}`);
    };
  
    const getData = async () => {
      try {
        setLoading(true);
        const response = await allInspection({id: 87, status: 'completed'});
  
        if (response.data.data.code != undefined && response.data.data.code) {
          // console.log("data =>", response.data.data.data);
          let obj = {...badges};
          obj.completed = response.data.data.data.length;
  
          dispatch(setBadges(obj));
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
      <MainContainer
      //  style={{ flex: 1,padding:10 }}
      >
        {data.length > 0 ?
        <FlatList
          style={{...StyleSheet.absoluteFillObject, paddingHorizontal: 10}}
          data={data}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getData} />
          }
          ListEmptyComponent={() => (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size="large" color={THEME_COLOR} />
            </View>
          )}
          renderItem={item => (
            <ItemContainer
              onPress={() => {
                navigation.navigate('Step_1', {id: 4444});
                dispatch(setProfileDetails(item.item));
              }}
              style={{width: '100%'}}>
              <View style={[globalStyles.rowContainer]}>
                <View style={[{width: '45%', backgroundColor: 'transparent'}]}>
                  <FadeTextSmall style={[{padding: 5}]}>
                    {item.item.assigndate}
                  </FadeTextSmall>
                  <View
                    style={[
                      {width: '100%', backgroundColor: 'transparent'},
                      globalStyles.rowContainer,
                      globalStyles.flexBox,
                    ]}>
                    <Image
                      source={{
                        uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH4AfgMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAABQYHBAID/8QAMhAAAgIBAgMECQMFAAAAAAAAAAECAwQFEQYhURIxQYETIjJhcaGxwdEjUpEUQmJysv/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAARAf/aAAwDAQACEQMRAD8A1IAGmQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOHWdQjpmn2ZDSc16tcX4yfd+fID4azrmLpS7Mv1b2t41Rez834FXyOLdTsnvU6qY9Iw3+bIS62y+2dt03Oyb7UpPvbPBYiyYXGGbXJLLqrvh4uK7EvwW3Ts/G1GhXYtnaXdKL5OL6NGXHdo+o2aXmxvhu4d1kP3x6BWmg81zhbCNlclKEknFrxR6IAAAAAAAAAAAFQ48ul28Ojf1UpTa9/cvuW8pvHkGsnDs25OEo7/Br8gVYAGkAATVxoXCV0rtCoUnu63KHkny+TJkhODoOGhVtr25yl89vsTZAAAAAAAAAAAAheLMCWdpblVFytofpIpLm14r+OfkTQAyQF21nhWvJslfgTjTZJ7yrkvUb6rbu+hX7eGtXrlt/S9tdYWRa+paREn0x6bMi+FNMO3ZOXZjHqyWx+F9VtklOqFK/dZNfRbstWiaDj6UvSdr0uQ1s7Gtuz7kvACQwcaOHh040HvGqCjv1959wCAAAAAAAAAAAA+xwatquNpdHpL5bzl7Fcfak/x7yi6prebqUmrLPR0+FMHy8+vmBdsvX9MxG4zyozmv7al238uRHS4ywU9oY2TJdWor7lI5dAUq9VcY6fJpTqya/e4pr5MlcLVMHO5YuTXOX7N9pfw+ZmAXJprk13PoIla2Ch6NxPk4co1ZrlkUd279uK+Pj5l3xsinKojfj2KyuS3UkRX1AAAAAAAAOTU8+rTcOeTdzUeUY+Mn4I6yh8Y57ytS/poP9LG5fGfi/t5MCIzsy7Pyp5GRLtTl/CXRe45wCmgAKgAABK8P6xPSsr123i2PayHT/Je9EUCK1mE42QjODUoyW6a7mj0VrgrUHdiWYVj3lRzh/o/Dyf1RZSAAAAAA8XWKmmy2Xswi5P4LmZTOcrZysse85tyk+rZpWuy7Gi5sl3+hl9DMygACoAAAAAAAAleF8h4+uY735WN1y+DXL57GjGWadJw1DFkvC6H/AEjU2RQAEH//2Q==',
                      }}
                      style={{
                        width: (width - 10) / 2 / 5,
                        height: height / 25,
                        borderRadius: ((width - 10) / 2 / 5 + height / 25) / 2,
                      }}
                    />
                    <View style={[{width: '70%', padding: 10}]}>
                      <DarkTextMedium>{item.item.custmer_name}</DarkTextMedium>
                      <FadeTextMedium>Customer</FadeTextMedium>
                    </View>
                  </View>
                  <View
                    style={[
                      {width: '100%', backgroundColor: 'transparent', flex: 1},
                      globalStyles.flexBox,
                    ]}>
                    <View
                      style={[
                        {
                          width: '100%',
                          backgroundColor: 'transparent',
                          padding: 5,
                        },
                        globalStyles.rowContainer,
                        globalStyles.flexBoxAlign,
                      ]}>
                      <DarkTextSmall style={{padding: 5, width: '50%'}}>
                        Status ?
                      </DarkTextSmall>
                      <View
                        style={[
                          {
                            width: '50%',
                            backgroundColor: 'transparent',
                            justifyContent: 'space-around',
                            borderWidth: 1,
                            borderColor:
                              item.item.status == 1 ? 'green' : '#d9a107',
                            padding: 2,
                            borderRadius: 10,
                          },
                          globalStyles.rowContainer,
                          globalStyles.flexBoxAlign,
                        ]}>
                        <MaterialCommunityIcons
                          name={
                            item.item.status == 1
                              ? 'check-circle'
                              : 'alert-circle'
                          }
                          size={10}
                          color={item.item.status == 1 ? 'green' : '#d9a107'}
                        />
                        <DarkTextSmall
                          style={{
                            color: item.item.status == 1 ? 'green' : '#d9a107',
                          }}>
                          {item.item.status == 1 ? 'Completed' : 'Pending'}
                        </DarkTextSmall>
                      </View>
                    </View>
                    <View
                      style={[
                        {
                          width: '100%',
                          backgroundColor: 'transparent',
                          padding: 5,
                        },
                        globalStyles.rowContainer,
                        globalStyles.flexBoxAlign,
                      ]}>
                      <DarkTextSmall style={{padding: 5, width: '50%'}}>
                        Report Status ?
                      </DarkTextSmall>
                      <View
                        style={[
                          {
                            width: '50%',
                            backgroundColor: 'transparent',
                            justifyContent: 'space-around',
                            borderWidth: 1,
                            borderColor:
                              item.item.approvstatus == 1 ? 'green' : '#d9a107',
                            padding: 2,
                            borderRadius: 10,
                          },
                          globalStyles.rowContainer,
                          globalStyles.flexBoxAlign,
                        ]}>
                        <MaterialCommunityIcons
                          name={
                            item.item.approvstatus == 1
                              ? 'check-circle'
                              : 'alert-circle'
                          }
                          size={10}
                          color={
                            item.item.approvstatus == 1 ? 'green' : '#d9a107'
                          }
                        />
                        <DarkTextSmall
                          style={{
                            color:
                              item.item.approvstatus == 1 ? 'green' : '#d9a107',
                          }}>
                          {item.item.approvstatus == 1 ? 'Approved' : 'No Action'}
                        </DarkTextSmall>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={[{width: '45%', backgroundColor: 'transparent'}]}>
                  <DarkTextSmall style={[{padding: 5}]}>
                    Inspection Report
                  </DarkTextSmall>
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
                      <FadeTextMedium style={{width: '50%', padding: 5}}>
                        color
                      </FadeTextMedium>
                      <DarkTextMedium style={{width: '50%', padding: 5}}>
                        {item.item.color}
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
                      <FadeTextMedium style={{width: '50%', padding: 5}}>
                        Address
                      </FadeTextMedium>
                      <DarkTextMedium style={{width: '50%', padding: 5}}>
                        {item.item.address}
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
                      <FadeTextMedium style={{width: '50%', padding: 5}}>
                        UNC
                      </FadeTextMedium>
                      <DarkTextMedium style={{width: '50%', padding: 5}}>
                        {item.item.unc}
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
                      <FadeTextMedium style={{width: '50%', padding: 5}}>
                        brand
                      </FadeTextMedium>
                      <DarkTextMedium style={{width: '50%', padding: 5}}>
                        {item.item.brand}
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
                      <FadeTextMedium style={{width: '50%', padding: 5}}>
                        model
                      </FadeTextMedium>
                      <DarkTextMedium style={{width: '50%', padding: 5}}>
                        {item.item.model}
                      </DarkTextMedium>
                    </View>
                  </View>
                </View>
              </View>
              <View style={[{paddingTop: 10}]}>
                <TouchableOpacity
                  style={[
                    {
                      width: '100%',
                      // padding:10,
                      height: 30,
                      backgroundColor: THEME_COLOR,
                      borderRadius: 10,
                    },
                    globalStyles.flexBox,
                  ]}
                  onPress={() => openPhoneDialer(item.item.custmer_mobile)}>
                  <MaterialCommunityIcons
                    name={'phone'}
                    size={20}
                    color={'white'}
                  />
                </TouchableOpacity>
              </View>
            </ItemContainer>
          )}
        />
              :
        <View style={[{flex:1},globalStyles.flexBox]}>
          <DarkTextMedium>No Lead Assign yet</DarkTextMedium>
        </View>
        }
      </MainContainer>
    );
  }
  
  const styles = StyleSheet.create({});
  