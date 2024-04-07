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
import {
  DarkTextMedium,
  DarkTextSmall,
  DarkTextLarge,
  FadeTextMedium,
  FadeTextSmall,
  FloatingButton,
  ItemContainer,
  MainContainer,
} from '../components/StyledComponent';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { THEME_COLOR, globalStyles, height, width } from '../utils/Style';
import { InspectionDetails } from '../../export'
import { getAllotedInventory } from '../services/Api';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'

export default function Step_3({ route, navigation }) {
  const user_data = useSelector(s => s.global.userDetails);
  var val = typeof user_data === 'object' ? user_data : JSON.parse(user_data);

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [iconsName, setIconsName] = useState(['clipboard-text-clock','cellphone-check','bank-check']);
  const [ statusName, setStatusName] = useState(['Pending','Visit Done','Work Done'])
  const [ StatusColor, setStatusColor] = useState(['#FF605C','#FFBD44','#00CA4E'])
  const [ StatusLightColor, setStatusLightColor] = useState(['#f7dfdf','#fcf3e1','#d3f2df'])
  const [status,setStatus] = useState(0);


  const { branch_id, branch_name } = route.params;

  const navi = useNavigation();

  // console.log("branch_id =>",branch_id)
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

  useEffect(() => {
    getData();
    navi.setOptions({
      title: branch_name + ' Jobs',
      headerTintColor: 'black',
    });
  }, []);


  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAllotedInventory({ id: branch_id });

      //  console.log("data =>", response.data.data.data.length);
      if (response.data.data.code != undefined && response.data.data.code) {
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
  if (loading) {
    return (
      <View style={[{ width: width, height: 200 }, globalStyles.flexBox]}>
        <ActivityIndicator size={'large'} color={THEME_COLOR} />
      </View>
    )
  }
  return (
    <MainContainer>
      {/* <ImageBackground
        source={require('../assets/images/background_logo_medium.jpg')}
        style={{flex: 1}}> */}
      {data.length > 0 ? (
        <FlatList
          style={{ paddingHorizontal: 10, flexGrow: 1 }}
          data={data}
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
                Jobs List Is Empty
              </DarkTextMedium>
            </View>
          )}
          renderItem={item => {
            let status = 0;
            console.log("status =>",item.item.status)
            item.item.status == 'Start Working' ? status = 2 : item.item.status == 'Visit Done' ? status = 1 : status = 0;
            return(
            <ItemContainer 
              onPress={() => {
                navigation.navigate('bankjobprofile', { id: item.item.id });
              }}
            style={[{ paddingRight: 20, paddingLeft: 20 }]}
            >
              <View style={[globalStyles.rowContainer, { backgroundColor: 'transparent', justifyContent: 'space-between', paddingVertical: 10 }]}>
                <FontAwesome6 name={'person-dots-from-line'} size={20} color={StatusColor[status]} style={[{ backgroundColor: 'transparent', justifyContent: 'center', paddingHorizontal: 10 }]} />
                <DarkTextLarge style={[{ width: '80%', backgroundColor: 'transparent', fontFamily: 'monospace', fontWeight: 'bold' }]}>{item.item.assigned_to}</DarkTextLarge>
              </View>
              <View style={[{ width: '100%' }]}>
                <View style={[globalStyles.rowContainer, { width: '100%', justifyContent: 'space-between', paddingVertical: 2.5 }]}>
                  <FadeTextMedium style={[styles.newCardKeyText]}>Add By</FadeTextMedium>
                  <DarkTextMedium style={[styles.newCardValueText]}> {item.item.add_by}</DarkTextMedium>
                </View>
                <View style={[globalStyles.rowContainer, { width: '100%', justifyContent: 'space-between', paddingVertical: 2.5 }]}>
                  <FadeTextMedium style={[styles.newCardKeyText]}>Bank Branch </FadeTextMedium>
                  <DarkTextMedium style={[styles.newCardValueText]}>{item.item.branch}</DarkTextMedium>
                </View>
                <View style={[globalStyles.rowContainer, { width: '100%', justifyContent: 'space-between', paddingVertical: 2.5 }]}>
                  <FadeTextMedium style={[styles.newCardKeyText]}>Description </FadeTextMedium>
                  <DarkTextMedium style={[styles.newCardValueText]}>{item.item.remark}</DarkTextMedium>
                </View>
                <View style={[globalStyles.rowContainer, { width: '100%', justifyContent: 'space-between', paddingVertical: 2.5 }]}>
                  <FadeTextMedium style={[styles.newCardKeyText]}>Created Date</FadeTextMedium>
                  <DarkTextMedium style={[styles.newCardValueText]}>{item.item.created_at}</DarkTextMedium>
                </View>
                <View style={[globalStyles.rowContainer, { width: '100%', justifyContent: 'space-between', paddingVertical: 2.5 }]}>
                  <FadeTextMedium style={[styles.newCardKeyText]}>File</FadeTextMedium>
                   <TouchableOpacity onPress={()=>openBrowser(item.item.file)} style={[styles.newCardValueText]}><DarkTextMedium style={[styles.newCardValueText,{width:'100%',color:'blue',textDecorationLine:'underline'}]}>{item.item.file}</DarkTextMedium></TouchableOpacity>
                </View>
              </View>
              <View style={[{ width: '100%', backgroundColor: 'transparent', justifyContent: 'space-between', paddingVertical: 10 }, globalStyles.rowContainer,]}>
                <View style={[{ flex: 0.9, backgroundColor: StatusLightColor[status], justifyContent: 'space-around', borderRadius: 15 }, globalStyles.rowContainer, globalStyles.flexBox]}>
                  <MaterialCommunityIcons name={iconsName[status]} size={25} color={StatusColor[status]} />
                  <DarkTextLarge style={[{ color: StatusColor[status], fontFamily: 'monospace', flex: 0.5, paddingHorizontal: 10 }]}>{statusName[status]}</DarkTextLarge>
                </View>
                <View style={[{ backgroundColor: StatusLightColor[status], padding: 10, borderRadius: 10, borderColor: 'lightgrey' }]}>
                  <MaterialCommunityIcons name="arrow-right" size={20} color={StatusColor[status]} />
                </View>
              </View>
            </ItemContainer>
            )
          }}
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
              { flex: 1, backgroundColor: 'transparent', height: height - 200 },
              globalStyles.flexBox,
            ]}>
            <DarkTextMedium style={{ fontSize: 20, marginBottom: 300 }}>No Jobs Assign yet</DarkTextMedium>
          </View>
        </ScrollView>
      )}
      {/* </ImageBackground> */}
    </MainContainer>

  )
}

const styles = StyleSheet.create({
  newCardKeyText:{width:100,backgroundColor:'transparent',fontFamily:'monospace',fontSize:13},
  newCardValueText:{width:'60%',backgroundColor:'transparent',fontFamily:'monospace',fontSize:13,fontWeight:'800',color:'#4f4f4f'}

})