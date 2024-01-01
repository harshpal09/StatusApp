import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
import {BottomTabs, HomeScreen,InspectionDetails, TopNavigation,Step_1,Step_2,Step_3,Step_4,Step_5, WizardProgressBar} from '../../export'
import { THEME_COLOR } from '../utils/Style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setSendData, setWizardCurrentStep } from '../../redux/features/GlobalSlice';


const Stack = createStackNavigator();

export default function StackNavigation() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleBackButtonPress = () => {
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
    <Stack.Navigator 
    screenOptions={{
      headerShown: false,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS, // Use SlideFromRightIOS transition preset
      transitionSpec: {
        open: { animation: 'timing', config: { duration: 0 } },
        close: { animation: 'timing', config: { duration: 0 } },
      },
      
    }}

    >
      <Stack.Screen name='tab' component={BottomTabs} options={{headerShown:false,}} />
      <Stack.Screen name='WizardProgressBar'  component={WizardProgressBar} options={{headerShown:false}} />
      <Stack.Screen  name="InspectionDetails" component={InspectionDetails} options={{headerShown:true,headerBackTitle:"Back",headerBackTitleVisible:true,headerTitle:'Information',headerStyle:{backgroundColor:THEME_COLOR},headerTitleStyle:{color:'white'}}} />
      <Stack.Screen name='Step_1' component={Step_1} options={{headerShown:true,headerBackTitleVisible:false,
        headerLeft: () => (
          <TouchableOpacity
            onPress={handleBackButtonPress}
            label="Back"
            tintColor="white"
            style={{paddingHorizontal:10}}
          >
            <MaterialCommunityIcons color="white" name="arrow-left" size={30}  />
          </TouchableOpacity>
        ),
        headerTitle:'Information',headerStyle:{backgroundColor:THEME_COLOR},headerTitleStyle:{color:'white'}}}/>
      {/* <Stack.Screen  name="Step_2" component={Step_2} options={{headerShown:true,headerBackTitleVisible:false,headerTitle:'Information',headerStyle:{backgroundColor:THEME_COLOR},headerTitleStyle:{color:'white'}}} />
      <Stack.Screen  name="Step_3" component={Step_3} options={{headerShown:true,headerBackTitleVisible:false,headerTitle:'Information',headerStyle:{backgroundColor:THEME_COLOR},headerTitleStyle:{color:'white'}}} />
      <Stack.Screen  name="Step_4" component={Step_4} options={{headerShown:true,headerBackTitleVisible:false,headerTitle:'Information',headerStyle:{backgroundColor:THEME_COLOR},headerTitleStyle:{color:'white'}}} />
      <Stack.Screen  name="Step_5" component={Step_5} options={{ headerShown:true,headerBackTitleVisible:false,headerTitle:'Information',headerStyle:{backgroundColor:THEME_COLOR},headerTitleStyle:{color:'white'}}} /> */}

    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})