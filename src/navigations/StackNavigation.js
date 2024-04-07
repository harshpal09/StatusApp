import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {
  BottomTabs,
  HomeScreen,
  InspectionDetails,
  TopNavigation,
  Step_1,
  Step_2,
  Step_3,
  Step_4,
  Step_5,
  WizardProgressBar,
  BankJobProfile,
  NewInspection,
} from '../../export';
import {THEME_COLOR} from '../utils/Style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  setSendData,
  setWizardCurrentStep,
} from '../../redux/features/GlobalSlice';
import AdminHome from '../screens/AdminHome';
import JobsStatus from '../screens/JobsStatus';

const Stack = createStackNavigator();

export default function StackNavigation() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleBackButtonPress = () => {
    let obj = {
    };
    dispatch(setSendData(obj));



    navigation.goBack();
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS, // Use SlideFromRightIOS transition preset
        transitionSpec: {
          open: {animation: 'timing', config: {duration: 0}},
          close: {animation: 'timing', config: {duration: 0}},
        },
      }}>
      <Stack.Screen
        name="tab"
        component={BottomTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="adminhome"
        component={AdminHome}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="bankbranches"
        component={HomeScreen}
        options={{
          headerShown: true,
          headerTitle:'Bank Branches',
          headerBackgroundContainerStyle:{backgroundColor:THEME_COLOR},
          headerStyle:{backgroundColor:THEME_COLOR},
          headerTitleStyle:{color:'white'},
          headerTintColor:'white'
        }}
      />
      <Stack.Screen
        name="alljobs"
        component={NewInspection}
        options={{
          headerShown: true,
          headerTitle:'All Field Officer',
          headerBackgroundContainerStyle:{backgroundColor:THEME_COLOR},
          headerStyle:{backgroundColor:THEME_COLOR},
          headerTitleStyle:{color:'white'},
          headerTintColor:'white'
        }}
      />
      <Stack.Screen
        name="WizardProgressBar"
        component={WizardProgressBar}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="jobstatus"
        component={JobsStatus}
        options={{
          headerShown: true,
          // headerTitle:'Jobs Status',
          headerBackgroundContainerStyle:{backgroundColor:THEME_COLOR},
          headerStyle:{backgroundColor:THEME_COLOR},
          headerTitleStyle:{color:'white'},
          headerTintColor:'white'
        }}
      />
      <Stack.Screen
        name="InspectionDetails"
        component={InspectionDetails}
        options={{
          headerShown: true,
          headerBackTitle: 'Back',
          headerBackTitleVisible: true,
          headerTitle: 'Information',
          headerStyle: {backgroundColor: THEME_COLOR},
          headerTitleStyle: {color: 'white'},
        }}
      />
      <Stack.Screen
        name="Step_1"
        component={Step_1}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={handleBackButtonPress}
              label="Back"
              tintColor="white"
              style={{paddingHorizontal: 10}}>
              <MaterialCommunityIcons
                color="white"
                name="arrow-left"
                size={30}
              />
            </TouchableOpacity>
          ),
          headerTitle: 'Start Working',
          headerStyle: {backgroundColor: THEME_COLOR},
          headerTitleStyle: {color: 'white'},
        }}
      />
      <Stack.Screen
        name="Step_2"
        component={Step_2}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={handleBackButtonPress}
              label="Back"
              tintColor="white"
              style={{paddingHorizontal: 10}}>
              <MaterialCommunityIcons
                color="white"
                name="arrow-left"
                size={30}
              />
            </TouchableOpacity>
          ),
          headerTitle: 'Visiting Form',
          headerStyle: {backgroundColor: THEME_COLOR},
          headerTitleStyle: {color: 'white'},
        }}
      />
      <Stack.Screen
        name="Step_3"
        component={Step_3}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={()=>{navigation.goBack();}}
              label="Back"
              tintColor="white"
              style={{paddingHorizontal: 10}}>
              <MaterialCommunityIcons
                color="white"
                name="arrow-left"
                size={30}
              />
            </TouchableOpacity>
          ),
          // headerTitle: 'branch jobs',
          headerStyle: {backgroundColor: THEME_COLOR},
          headerTitleStyle: {color: 'white'},
        }}
      />
            <Stack.Screen
        name="bankjobprofile"
        component={BankJobProfile}
        options={{
          headerShown: true,
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={()=>{navigation.goBack();}}
              label="Back"
              tintColor="white"
              style={{paddingHorizontal: 10}}>
              <MaterialCommunityIcons
                color="white"
                name="arrow-left"
                size={30}
              />
            </TouchableOpacity>
          ),
          headerTitle: 'Profile',
          headerStyle: {backgroundColor: THEME_COLOR},
          headerTitleStyle: {color: 'white'},
        }}
      />

      {/* <Stack.Screen  name="Step_2" component={Step_2} options={{headerShown:true,headerBackTitleVisible:false,headerTitle:'Information',headerStyle:{backgroundColor:THEME_COLOR},headerTitleStyle:{color:'white'}}} />
      <Stack.Screen  name="Step_3" component={Step_3} options={{headerShown:true,headerBackTitleVisible:false,headerTitle:'Information',headerStyle:{backgroundColor:THEME_COLOR},headerTitleStyle:{color:'white'}}} />
      <Stack.Screen  name="Step_4" component={Step_4} options={{headerShown:true,headerBackTitleVisible:false,headerTitle:'Information',headerStyle:{backgroundColor:THEME_COLOR},headerTitleStyle:{color:'white'}}} />
      <Stack.Screen  name="Step_5" component={Step_5} options={{ headerShown:true,headerBackTitleVisible:false,headerTitle:'Information',headerStyle:{backgroundColor:THEME_COLOR},headerTitleStyle:{color:'white'}}} /> */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
