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
export default function MissInspection({navigation}) {
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
      const response = await allInspection({id: 87, status: 'miss'});

      if (response.data.data.code != undefined && response.data.data.code) {
        // console.log("data =>", response.data.data.data);
        let obj = {...badges};
        obj.miss = response.data.data.data.length;

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
            <ImageBackground  source={require('../assets/images/status-high-resolution.png')} style={{backgroundColor:'red',width:width,height:height}}>
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
            navigation.navigate('Step_1', { id: 4444 });
            dispatch(setProfileDetails(item.item));
          }}
          style={{ width: '100%' }}
        >
            <View style={[globalStyles.rowContainer]}>
              <View style={[{width: '100%', backgroundColor: 'transparent',paddingHorizontal:10}]}>
                {/* <DarkTextSmall style={[{padding: 5}]}>
                  Inspection Report
                </DarkTextSmall> */}
                <View
                  style={[
                    {width: '100%', backgroundColor: 'transparent'},
                    globalStyles.rowContainer,
                    globalStyles.flexBox,
                  ]}
                  >
                  <View
                    style={[
                      {width: '100%', backgroundColor: 'transparent'},
                      globalStyles.rowContainer,
                    ]}>
                    <FadeTextMedium style={{ padding: 5}}>
                    Case No. :
                    </FadeTextMedium>
                    <DarkTextMedium style={{width: '50%', padding: 5}}>
                      {item.item.sr_number}
                    </DarkTextMedium>
                  </View>
                </View>
                <View
                  style={[
                    {width: '100%', backgroundColor: 'transparent'},
                    globalStyles.rowContainer,
                    globalStyles.flexBox,
                  ]}
                  >
                  <View
                    style={[
                      {width: '100%', backgroundColor: 'transparent'},
                      globalStyles.rowContainer,
                    ]}>
                    <FadeTextMedium style={{ padding: 5}}>
                      Warranty Status :
                    </FadeTextMedium>
                    <DarkTextMedium style={{width: '80%', padding: 5}}>
                      {item.item.warranty_status}
                    </DarkTextMedium>
                  </View>
                </View>
                <View
                  style={[
                    {width: '100%', backgroundColor: 'transparent'},
                    globalStyles.rowContainer,
                    globalStyles.flexBox,
                  ]}
                  
                  >
                  <View
                    style={[
                      {width: '100%', backgroundColor: 'transparent'},
                      globalStyles.rowContainer,
                    ]}>
                    <FadeTextMedium style={{ padding: 5}}>
                      Package :
                    </FadeTextMedium>
                    <DarkTextMedium style={{width: '70%', padding: 5}}>
                      {item.item.package}
                    </DarkTextMedium>
                  </View>
                </View>
                <View
                  style={[
                    {width: '100%', backgroundColor: 'transparent'},
                    globalStyles.rowContainer,
                    globalStyles.flexBox,
                  ]}
                
                  >
                  <View
                    style={[
                      {width: '100%', backgroundColor: 'transparent'},
                      globalStyles.rowContainer,
                    ]}>
                    <FadeTextMedium style={{ padding: 5}}>
                    Address :
                    </FadeTextMedium>
                    <DarkTextMedium style={{ width:'80%',padding: 5}}>
                      {item.item.address}
                    </DarkTextMedium>
                  </View>
                </View>
              </View>
           </View>
          <View style={[{paddingTop:10}]}>
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
              onPress={()=> openPhoneDialer(item.item.custmer_mobile)}
              >
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
            <ScrollView style={{backgroundColor:'transparent'}} showsVerticalScrollIndicator={false} refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={getData} />
            }>
              <View style={[{flex: 1,backgroundColor:'transparent',height:height-200}, globalStyles.flexBox]}>
                <DarkTextMedium>No Lead Assign yet</DarkTextMedium>
              </View>
            </ScrollView>
      }
      </ImageBackground>
    </MainContainer>
  );
}

const styles = StyleSheet.create({});
