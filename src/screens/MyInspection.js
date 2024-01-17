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
import {allInspection, getAllotedInventory} from '../services/Api';
import { useFocusEffect } from '@react-navigation/native';
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
      const response = await getAllotedInventory({id: val.id});

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
                // onPress={() => {
                //   navigation.navigate('Step_1', {id: 4444});
                //   dispatch(setProfileDetails(item.item));
                // }}
                activeOpacity={1}
                style={{width: '100%'}}>
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
                      Date
                    </FadeTextMedium>
                    <DarkTextMedium style={{width: '50%', padding: 0}}>
                      {item.item.date}
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
                      Type
                    </FadeTextMedium>
                    <DarkTextMedium style={{width: '50%', padding: 0}}>
                      {item.item.type}
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
                    <FadeTextMedium style={{width: '50%', padding: 0,color:item.item.allotedquantity > 0 ? 'grey':'red'}}>
                      Alloted Quantity
                    </FadeTextMedium>
                    <DarkTextMedium style={{width: '50%', padding: 0,color:item.item.allotedquantity > 0 ? 'black':'red'}}>
                      {item.item.allotedquantity}
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
                      {item.item.price}
                    </DarkTextMedium>
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
