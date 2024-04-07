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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  isLoggedIn,
  setAMCBadge,
  setBadges,
  setComplaintsBadge,
  setProfileDetails,
  setSendData,
} from '../../redux/features/GlobalSlice';
import { THEME_COLOR, globalStyles, height, width } from '../utils/Style';
import {
  DarkTextMedium,
  DarkTextLarge,
  DarkTextSmall,
  FadeTextMedium,
  FadeTextSmall,
  FloatingButton,
  ItemContainer,
  MainContainer,
} from '../components/StyledComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { allInspection } from '../services/Api';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Search from '../components/Search';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'

export default function HomeScreen({ navigation }) {
  const complaint = useSelector(s => s.global.complaint);
  const amc = useSelector(s => s.global.AMC);

  const user_data = useSelector(s => s.global.userDetails);
  const api_send_data = useSelector(state => state.global.send_data);

  var val = typeof user_data === 'object' ? user_data : JSON.parse(user_data);

  const dispatch = useDispatch();
  const navigation_diff = useNavigation();

  const [containerHeight, setContainerHeight] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState([]);


  const [iconsName, setIconsName] = useState(['clipboard-text-clock', 'cellphone-check', 'bank-check']);
  const [statusName, setStatusName] = useState(['Pending', 'Visit Done', 'Work Done'])
  const [StatusColor, setStatusColor] = useState(['#FF605C', '#FFBD44', '#00CA4E'])
  const [StatusLightColor, setStatusLightColor] = useState(['#f7dfdf', '#fcf3e1', '#d3f2df'])
  const [status, setStatus] = useState(0);


  useFocusEffect(
    React.useCallback(() => {
      setRedux(); // You may want to check if this needs to be called on focus as well
      getData();
    }, []),
  );

  useEffect(() => {
    setRedux();
    getData();
  }, []);

  // console.log("type => ",api_send_data.type)
  const setRedux = () => {
    let newobj = { ...api_send_data };
    newobj.type = 1;
    dispatch(setSendData(newobj));
  };

  const openPhoneDialer = number => {
    Linking.openURL(`tel:${number}`);
  };

  // console.log("user details ====>",val.id)
  const getData = async () => {
    // console.log('aerrrrr => ', val.id);
    try {
      setLoading(true);
      const response = await allInspection({ id: val.id, status: 'total' });
      // console.log('data =>', response.data);

      if (response.data.data.code != undefined && response.data.data.code) {
        dispatch(setComplaintsBadge(response.data.data.data.length));
        setData(response.data.data.data);
        setFilter(response.data.data.data);
      } else {
      }
    } catch (error) {
      console.log('error ', error);
    } finally {
      // console.log('finally...............');
      setLoading(false);
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <View style={[{ width: width, height: 200 }, globalStyles.flexBox]}>
        <ActivityIndicator size={'large'} color={THEME_COLOR} />
      </View>
    )
  }

  // console.log("data =>",data);
  return (
    <MainContainer
    //  style={{ flex: 1,padding:10 }}
    >
      {data.length > 0 ? <Search data={data} setFilter={setFilter} type={'allBank'} /> : <></>}
      {/* <Text>fghjfdfgh</Text> */}
      {/* <ImageBackground
        source={require('../assets/images/background_logo_medium.jpg')}
        style={{flex: 1}}> */}
      {/* {loading ? (
        <View style={[{width: width, height: 200}, globalStyles.flexBox]}>
          <ActivityIndicator size={'large'} color={THEME_COLOR} />
        </View>
      ) : ( */}
      <>
        {data.length > 0 ? (
          <FlatList
            style={{ paddingHorizontal: 10, flexGrow: 1 }}
            data={filter.length > 0 ? filter : data}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={getData} />
            }
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  height: height / 1.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <DarkTextMedium style={{ fontSize: 20, marginBottom: 300 }}>
                  Bank Branches List Is Empty
                </DarkTextMedium>
              </View>
            )}
            renderItem={item => (
              // <ItemContainer
              //   onPress={() => {
              //     navigation.navigate('Step_3', {
              //       branch_id: item.item.id,
              //       branch_name: item.item.name,
              //     });
              //   }}
              //   style={{width: '100%'}}>
              //   <View style={[globalStyles.rowContainer]}>
              //     <View
              //       style={[
              //         {
              //           width: '100%',
              //           backgroundColor: 'transparent',
              //           paddingHorizontal: 10,
              //         },
              //       ]}>
              //       {/* <DarkTextSmall style={[{padding: 5}]}>
              //   Inspection Report
              // </DarkTextSmall> */}
              //       <View
              //         style={[
              //           {width: '100%', backgroundColor: 'transparent'},
              //           globalStyles.rowContainer,
              //           globalStyles.flexBox,
              //         ]}>
              //         <View
              //           style={[
              //             {width: '100%', backgroundColor: 'transparent'},
              //             globalStyles.rowContainer,
              //           ]}>
              //           <FadeTextMedium style={{padding: 5}}>
              //             Name :
              //           </FadeTextMedium>
              //           <DarkTextMedium style={{width: '80%', padding: 5}}>
              //             {item.item.name}
              //           </DarkTextMedium>
              //         </View>
              //       </View>
              //       <View
              //         style={[
              //           {width: '100%', backgroundColor: 'transparent'},
              //           globalStyles.rowContainer,
              //           globalStyles.flexBox,
              //         ]}>
              //         <View
              //           style={[
              //             {width: '100%', backgroundColor: 'transparent'},
              //             globalStyles.rowContainer,
              //           ]}>
              //           <FadeTextMedium style={{padding: 5}}>
              //             Branch code :
              //           </FadeTextMedium>
              //           <DarkTextMedium style={{width: '80%', padding: 5}}>
              //             {item.item.branch_code}
              //           </DarkTextMedium>
              //         </View>
              //       </View>
              //       <View
              //         style={[
              //           {width: '100%', backgroundColor: 'transparent'},
              //           globalStyles.rowContainer,
              //           globalStyles.flexBox,
              //         ]}>
              //         <View
              //           style={[
              //             {width: '100%', backgroundColor: 'transparent'},
              //             globalStyles.rowContainer,
              //           ]}>
              //           <FadeTextMedium style={{padding: 5}}>
              //             Created Date:
              //           </FadeTextMedium>
              //           <DarkTextMedium style={{width: '80%', padding: 5}}>
              //             {item.item.created_at}
              //           </DarkTextMedium>
              //         </View>
              //       </View>

              //       <View
              //         style={[
              //           {width: '100%', backgroundColor: 'transparent'},
              //           globalStyles.rowContainer,
              //           globalStyles.flexBox,
              //         ]}>
              //         <View
              //           style={[
              //             {width: '100%', backgroundColor: 'transparent'},
              //             globalStyles.rowContainer,
              //           ]}>
              //           <FadeTextMedium style={{padding: 5}}>
              //             Add By :
              //           </FadeTextMedium>
              //           <DarkTextMedium style={{width: '50%', padding: 5}}>
              //             {item.item.add_by}
              //           </DarkTextMedium>
              //         </View>
              //       </View>
              //     </View>
              //   </View>
              // </ItemContainer>
              <ItemContainer
                onPress={() => {
                  navigation.navigate('Step_3', {
                    branch_id: item.item.id,
                    branch_name: item.item.name,
                  });
                }}
                style={[{ paddingRight: 20, paddingLeft: 20 }]}>
                <View style={[globalStyles.rowContainer, { backgroundColor: 'transparent', justifyContent: 'space-between', paddingVertical: 10 }]}>
                  <MaterialCommunityIcons name={'bank'} size={30} color={StatusColor[status]} style={[{ backgroundColor: 'transparent', justifyContent: 'center', paddingHorizontal: 10 }]} />
                  <DarkTextLarge style={[{ width: '60%', backgroundColor: 'transparent', fontFamily: 'monospace', fontWeight: 'bold' }]}>{item.item.name}</DarkTextLarge>
                  <View style={[{ backgroundColor: StatusLightColor[status], padding: 10, borderRadius: 10, borderColor: 'lightgrey' }]}>
                    <MaterialCommunityIcons name="arrow-right" size={20} color={StatusColor[status]} />
                  </View>
                </View>
                <View style={[{ width: '100%' }]}>
                  <View style={[globalStyles.rowContainer, { width: '100%', justifyContent: 'space-between', paddingVertical: 2.5 }]}>
                    <FadeTextMedium style={[styles.newCardKeyText]}>Branch code</FadeTextMedium>
                    <DarkTextMedium style={[styles.newCardValueText]}>{item.item.branch_code}</DarkTextMedium>
                  </View>
                  <View style={[globalStyles.rowContainer, { width: '100%', justifyContent: 'space-between', paddingVertical: 2.5 }]}>
                    <FadeTextMedium style={[styles.newCardKeyText]}>Add By</FadeTextMedium>
                    <DarkTextMedium style={[styles.newCardValueText]}>{item.item.add_by}</DarkTextMedium>
                  </View>
                  <View style={[globalStyles.rowContainer, { width: '100%', justifyContent: 'space-between', paddingVertical: 2.5 }]}>
                    <FadeTextMedium style={[styles.newCardKeyText]}>Created Date</FadeTextMedium>
                    <DarkTextMedium style={[styles.newCardValueText]}> {item.item.created_at}</DarkTextMedium>
                  </View>
                </View>

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
                {
                  flex: 1,
                  backgroundColor: 'transparent',
                  height: height - 200,
                },
                globalStyles.flexBox,
              ]}>
              <DarkTextMedium style={{ fontSize: 20, marginBottom: 300 }}>
                Bank Branches List Is Empty
              </DarkTextMedium>
            </View>
          </ScrollView>
        )}
      </>
      {/* )} */}
      {/* </ImageBackground> */}
    </MainContainer>
  );
}
const styles = StyleSheet.create({
  newCardKeyText: { width: 100, backgroundColor: 'transparent', fontFamily: 'monospace', fontSize: 13 },
  newCardValueText: { width: '60%', backgroundColor: 'transparent', fontFamily: 'monospace', fontSize: 13, fontWeight: '800', color: '#4f4f4f' }
})
