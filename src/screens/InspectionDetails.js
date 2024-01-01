import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  FlatList,
  Linking,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  Container,
  ItemContainer,
  FloatingButton,
  FadeTextMedium,
  DarkTextMedium,
  FadeTextSmall,
  DarkTextSmall,
} from '../components/StyledComponent';
import {globalStyles, width, height, THEME_COLOR} from '../utils/Style';
import WizardProgressBar from '../components/WizardProgressBar';
import DetailsChild from '../components/DetailsChild';
import {useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
 
export default function InspectionDetails({navigation}) {

  const api_send_data = useSelector(state => state.global.send_data);

  const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4']; // Add your steps here
  const profileDetails = useSelector(state => state.global.profileDetails);
  // console.log("profile details =>",profileDetails);
  const handleNext = () => {
    setCurrentStep(prevStep => Math.min(prevStep + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep(prevStep => Math.max(prevStep - 1, 0));
  };
  const openPhoneDialer = (number) => {

    // Use the tel: scheme to initiate a phone call
    Linking.openURL(`tel:${number}`);
  };
  return (
    <SafeAreaView>
      <Container>
        <ItemContainer
          activeOpacity={1}
          // onPress={()=> {navigation.navigate('InspectionDetails')}}
          >
          <View style={[globalStyles.rowContainer]}>
              <View style={[{width: '100%', backgroundColor: 'transparent',paddingHorizontal:10}]}>
                {/* <DarkTextSmall style={[{padding: 5}]}>
                  Inspection Report
                </DarkTextSmall> */}
                                <View
                  style={[
                    {
                    width: '100%', backgroundColor: 'transparent'},
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
                    Aappointment Date
                    </FadeTextMedium>
                    <DarkTextMedium style={{width: '80%', padding: 5}}>
                      {profileDetails.appointment_date}
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
                    Case No. :
                    </FadeTextMedium>
                    <DarkTextMedium style={{width: '50%', padding: 5}}>
                      {profileDetails.sr_number}
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
                      {profileDetails.warranty_status}
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
                      Status :
                    </FadeTextMedium>
                    <DarkTextMedium style={{width: '80%', padding: 5}}>
                      {profileDetails.status}
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
                    Issue
                    </FadeTextMedium>
                    <DarkTextMedium style={{width: '80%', padding: 5}}>
                      {profileDetails.issue}
                    </DarkTextMedium>
                  </View>
                </View>
                
                {api_send_data.type == 2 ? 
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
                      {profileDetails.package}
                    </DarkTextMedium>
                  </View>
                </View>
                :<></>}
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
                      {profileDetails.address}
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
              onPress={()=>openPhoneDialer(profileDetails.custmer_mobile)}
              >
              <MaterialCommunityIcons
                name={'phone'}
                size={20}
                color={'white'}
              />
            </TouchableOpacity>
          </View>
        </ItemContainer>
      </Container>
      <Container style={{height: 100}}>
        <View style={[globalStyles.flexBox]}>
          <WizardProgressBar navigation={navigation} />
        </View>
      </Container>
      {/* <FloatingButton style={[globalStyles.flexBox]} activeOpacity={0.93} onPress={()=> navigation.navigate('step_1') }>
        <Text style={{fontWeight:'800',fontSize:14,color:'white'}}>Start Inspection</Text>
      </FloatingButton> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
