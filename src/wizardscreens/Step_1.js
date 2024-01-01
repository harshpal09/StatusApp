import React, { useEffect, useState, createContext } from 'react';
import { SafeAreaView, FlatList, ActivityIndicator, StyleSheet, RefreshControl, View, ImageBackground, TouchableOpacity, Text } from 'react-native';
import { InspectionDetails, DetailsChild } from '../../export';
import useMaterialData, { globalStyles, height, width } from '../utils/Style';
import { documentsForm } from '../services/Api';
import { useDispatch, useSelector } from 'react-redux';
import {  } from '../utils/Style';
import { useNavigation } from '@react-navigation/native';
import { setSendData, setWizardCurrentStep } from '../../redux/features/GlobalSlice';

const ParentContext = createContext();

export default function Step_1() {
  const data = useMaterialData();
  const wizobj = useSelector(state => state.global.wizardObj);
  const profileDetails = useSelector(state => state.global.profileDetails);
  const api_send_data = useSelector(state => state.global.send_data);

  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  // console.log("type step=> ",wizobj)
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // console.log("wij obj =>",wizobj)
  useEffect(() => {
    setLoading(false);

    // getData();
  }, []);

  const onRefresh = () => {
    setRefreshing(false);
    // getData();
  };

  // const getData = async () => {
  //   try {

  //     const response = await documentsForm({ leadId: profileDetails.id });
  //     if (response.data.data.code != undefined && response.data.data.code) {
  //       setData(response.data.data.data);
  //     } else {
  //       // Handle error if needed
  //     }
  //   } catch (error) {
  //     console.log('error ', error);
  //   } finally {
  //     setLoading(false);
  //     setRefreshing(false);

  //   }
  // };
  const handleGoBack = () => {
    let obj = {
      material:[],
      remark:"",
      payment_type:"",
      total_amount:0, 
      photo:[],
      type :  '',
      id : '',
    }
    let wizobj = {
      currentStep: 'material',
      index:0,
      success:{
        documents:false,
        exterior:false,
        interior:false,
        engine:false,
        other:false,
      },
      successStep:-1,
    }
    dispatch(setSendData(obj));
    dispatch(setWizardCurrentStep(wizobj));
    navigation.goBack();
  };

  return (
    <ParentContext.Provider value={handleGoBack}>
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground source={require('../assets/images/status-high-resolution.png')} style={{flex:1}} >
        {loading ? (
          <ActivityIndicator
            style={styles.loadingIndicator}
            size="large"
            color="#0000ff"
          />
        ) : (
          <FlatList
            style={{ paddingHorizontal: 10, paddingBottom: 20 }}
            ListHeaderComponent={() => <InspectionDetails />}
            data={data}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            renderItem={({ item, index }) => (
              // <View>
              //   {console.log(" data =>",item[wizobj.currentStep])}
              // </View>
              <DetailsChild
                mainIndex={index}
                data={item[wizobj.currentStep]}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
        </ImageBackground>
      </SafeAreaView>
   </ParentContext.Provider>
  );
}

export { ParentContext };

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
