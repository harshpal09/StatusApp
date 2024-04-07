import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {AccountSection, CompletedInspection, HomeScreen,MyInspection, TopNavigation} from '../../export'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { THEME_COLOR } from '../utils/Style';
import { useSelector } from 'react-redux';
import AdminHome from '../screens/AdminHome';
const Tab = createBottomTabNavigator();

export default function BottomTabs() {

  const user_data = useSelector(s => s.global.userDetails);
  
  var val = typeof user_data === 'object' ? user_data : JSON.parse(user_data);
  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor:THEME_COLOR,
      // tabBarStyle:{backgroundColor:''}
    }}>
      
      <Tab.Screen
        name="Home"
        component={val.role.toLowerCase() == 'feild officer' ?CompletedInspection : AdminHome}
        options={{
          headerShown: true,
          headerStyle:{
            backgroundColor:THEME_COLOR,
          },
          headerTitleStyle:{
            color:"#FFF",
            alignSelf:'flex-start',
            fontWeight:'700',
            fontFamily:'serif',
            // fontStyle:'italic'
            // backgroundColor:'red',
            // width:'100%'
          },
          headerTitle: 'WoodHeaven',
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
            name="home-analytics" color={color} size={size} />
          ),
          headerLeft: () => (
            // Add your image component here
            <MaterialCommunityIcons
              name={'home-roof'}
              size={30}
              color={'white'}
              style={{ width: 30, height: 30, marginLeft: 20 }}
            />
          ),
          headerRight: () => (
            // Add your image component here
            <Image
              source={require('../assets/images/logo.png')}
              style={{ width: 70, height: 30, marginRight:20 }}
            />
          ),
        }}
      />
      {val.role.toLowerCase() != 'feild officer' ? (
      <Tab.Screen
       name="MyInspection" 
       component={MyInspection} 
       options={{
        
        headerShown: true,
        headerTitle:'Messages',
        headerStyle: {
          backgroundColor: THEME_COLOR, // Set your desired background color
        },  
        headerTitleStyle:{
          color:'white'
        },      
        tabBarLabel: 'Messages',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="clipboard-text-search" color={color} size={size} />
        ),
      }}
       />
       ):<></>}
       <Tab.Screen
       name="Account" 
       component={AccountSection} 
       options={{
        headerShown: true,
          headerStyle:{
            backgroundColor:THEME_COLOR,
            borderBottomColor:THEME_COLOR
          },
          headerTitleStyle:{
            color:"#FFF",
            alignSelf:'flex-start',
            fontWeight:"bold"
            // backgroundColor:'red',
            // width:'100%'
          },
          headerTitle: 'Profile',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="account-circle" color={color} size={size} />
        ),
      }}
       />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})