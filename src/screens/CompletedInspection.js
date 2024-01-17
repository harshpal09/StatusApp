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
  ScrollView,
  ImageBackground,
  Alert,
  Pressable,
  // Modal
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  isLoggedIn,
  setAMCBadge,
  setBadges,
  setComplaintsBadge,
  setProfileDetails,
  setSendData,
} from '../../redux/features/GlobalSlice';
import {
  LIGHT_BLUE_BACKGROUND,
  THEME_COLOR,
  globalStyles,
  height,
  width,
} from '../utils/Style';
import {
  Container,
  DarkTextMedium,
  DarkTextSmall,
  FadeTextMedium,
  DarkTextLarge,
  FadeTextSmall,
  FloatingButton,
  ItemContainer,
  MainContainer,
} from '../components/StyledComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  allInspection,
  getAMC,
  getAdminJobs,
  getAllotedInventory,
  getFieldJobs,
} from '../services/Api';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Modal from 'react-native-modal';
import InspectionDetails from './InspectionDetails';
export default function CompletedInspection({navigation}) {
  const badges = useSelector(s => s.global.badges);
  const user_data = useSelector(s => s.global.userDetails);
  var val = typeof user_data === 'object' ? user_data : JSON.parse(user_data);
  const dispatch = useDispatch();
  const navigation_diff = useNavigation();

  const [containerHeight, setContainerHeight] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const api_send_data = useSelector(state => state.global.send_data);
  // console.log("field officer details =>",val)

  // console.log("fghjhgfghjhg=> ",api_send_data)

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, []),
  );

  useEffect(() => {
    getData();
  }, [navigation_diff]);

  const openBrowser = url => {
    // Check if the URL is not empty
    if (url && url.trim() !== '') {
      // Check if the Linking module is supported
      if (Linking.canOpenURL(url)) {
        // Open the URL in the default browser
        Linking.openURL(url);
      } else {
        // Handle the case where the URL cannot be opened
        console.log(`Cannot open URL: ${url}`);
      }
    } else {
      // Handle the case where the URL is empty
      console.log('URL is empty');
    }
  };
  const getData = async () => {
    try {
      setLoading(true);
      const response = await getFieldJobs({id: val.id});

      if (response.data.data.code != undefined && response.data.data.code) {
        dispatch(setAMCBadge(response.data.data.data.length));
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
  // console.log("type new=> ",api_send_data.type)

  // console.log("data =>",data);
  return (
    <MainContainer>
      <ImageBackground
        source={require('../assets/images/background_logo_medium.jpg')}
        style={{flex: 1}}>
        {data.length > 0 ? (
          <FlatList
            style={{paddingHorizontal: 10, flexGrow: 1}}
            data={data}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={getData} />
            }
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color={THEME_COLOR} />
              </View>
            )}
            renderItem={item => (
              <ItemContainer
                onPress={() => {
                  // console.log("type new  =====>",item.item)
                  let obj = {...api_send_data};
                  obj.job_id = item.item.id;
                  obj.visit_by = val.id;
                  dispatch(setSendData(obj));
                  dispatch(setProfileDetails(item.item));
                  setModalVisible(true);
                }}
                style={{width: '100%'}}>
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
                              paddingHorizontal:10,
                              paddingVertical:3,
                              backgroundColor: 'transparent',
                              justifyContent: 'space-around',
                              borderWidth: 1,
                              borderColor:
                                item.item.status != 'pending' ? 'green' : '#d9a107',
                              padding: 2,
                              borderRadius: 10,
                            },
                            globalStyles.rowContainer,
                            globalStyles.flexBoxAlign,
                          ]}>
                          <MaterialCommunityIcons
                            name={
                              item.item.status != 'pending'
                                ? 'check-circle'
                                : 'alert-circle'
                            }
                            size={10}
                            color={item.item.status != 'pending' ? 'green' : '#d9a107'}
                          />
                          <DarkTextSmall
                            style={{
                              paddingHorizontal:10,
                              color:
                                item.item.status != 'pending' ? 'green' : '#d9a107',
                            }}>
                            {item.item.status != 'pending' ? item.item.status  : 'Pending'}
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
                <ModalComponent
                  item={item.item}
                  navigation={navigation}
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                />
              </ItemContainer>
            )}
          />
        ) : (
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
              <DarkTextMedium style={{fontSize: 20, marginBottom: 300}}>
                No Jobs Assign yet
              </DarkTextMedium>
            </View>
          </ScrollView>
        )}
      </ImageBackground>
    </MainContainer>
  );
}

const ModalComponent = ({modalVisible, navigation, setModalVisible, item}) => {
  // const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        onBackdropPress={() => setModalVisible(false)}
        isVisible={modalVisible}>
        <Container
          style={{
            backgroundColor: 'white',
            borderColor: 'black',
            borderRadius: 10,
          }}>
          <InspectionDetails isModal={true} />
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              globalStyles.profileHeadings,
              {
                backgroundColor: LIGHT_BLUE_BACKGROUND,
                marginVertical: 10,
                borderRadius: 10,
              },
            ]}
            onPress={() => {
              setModalVisible(false), navigation.navigate('Step_2', {id: 4444});
            }}>
            <View style={[globalStyles.rowContainer, globalStyles.flexBox]}>
              <DarkTextLarge
                style={{color: THEME_COLOR, paddingHorizontal: 10}}>
                Visiting{' '}
              </DarkTextLarge>
            </View>
            {/* <Text style={globalStyles.profileHeadingText}><MaterialIcons name='logout' size={20} />Logout</Text> */}
            <MaterialIcons
              style={globalStyles.profileIcons}
              name="navigate-next"
              color={THEME_COLOR}
              size={25}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[
              globalStyles.profileHeadings,
              {
                backgroundColor: LIGHT_BLUE_BACKGROUND,
                marginVertical: 5,
                borderRadius: 10,
              },
            ]}
            onPress={() => {
              setModalVisible(false), navigation.navigate('Step_1', {id: 4444});
            }}>
            <View style={[globalStyles.rowContainer, globalStyles.flexBox]}>
              <DarkTextLarge
                style={{color: THEME_COLOR, paddingHorizontal: 10}}>
                Start working{' '}
              </DarkTextLarge>
            </View>
            <MaterialIcons
              style={globalStyles.profileIcons}
              name="navigate-next"
              color={THEME_COLOR}
              size={25}
            />
          </TouchableOpacity>
        </Container>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
