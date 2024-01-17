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
  const openBrowser = (url) => {
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
  return (
    <SafeAreaView style={{marginTop:-10}}>
      <Container >
      <ItemContainer
                activeOpacity={1}
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
                          {profileDetails.assigned_to}
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
                          {profileDetails.branch}
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
                          {profileDetails.remark}
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
                        <TouchableOpacity style={{width:'100%'}} onPress={()=>openBrowser(profileDetails.file)}>
                              <DarkTextMedium style={{width: '90%', padding: 5,color:THEME_COLOR}}>
                                {profileDetails.file}
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
                          {profileDetails.add_by}
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
                          {profileDetails.created_at}
                        </DarkTextMedium>
                      </View>
                    </View>
                  </View>
                </View>
                
              </ItemContainer>
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
