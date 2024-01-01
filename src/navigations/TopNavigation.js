import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CompletedInspection, HomeScreen, MissInspection, NewInspection, StackNavigation } from '../../export';
import { THEME_COLOR } from '../utils/Style';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const HeaderTab = createMaterialTopTabNavigator();

export default function TopNavigation({ navigation }) {

  const amc = useSelector(s => s.global.AMC);
  const complaint = useSelector(s => s.global.complaint);

  // console.log("badges =>",badges)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderTab.Navigator
        initialRouteName='Complaints'
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: THEME_COLOR,
          tabBarIndicatorStyle: {
            backgroundColor: THEME_COLOR
          },
          tabBarInactiveTintColor: "grey",
          tabBarStyle: {
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '800',
          },
          tabBarIndicatorContainerStyle: {

          },
        })}
      >
        <HeaderTab.Screen name="Bank Branches" component={HomeScreen} options={{

tabBarBadge: () => <View style={{backgroundColor:'white'}}><MaterialCommunityIcons name={complaint > 9 ? 'numeric-9-plus-circle' : 'numeric-'+complaint.toString()+'-circle'} color={'red'} size={20} style={{fontWeight:'700',position:'absolute',right:10,top:7}} /></View>,
}} />
        <HeaderTab.Screen name="Jobs" component={NewInspection} options={{
          tabBarBadge: () => <View style={{backgroundColor:'white'}}><MaterialCommunityIcons name={amc > 9 ? 'numeric-9-plus-circle' : 'numeric-'+amc.toString()+'-circle'} color={'red'} size={20} style={{fontWeight:'700',position:'absolute',right:10,top:7}} /></View>,
        }} />
        {/* <HeaderTab.Screen name="Completed" component={CompletedInspection}
          options={{
            tabBarBadge: () => <View style={{backgroundColor:'white'}}><MaterialCommunityIcons name={badges.completed > 9 ? 'numeric-9-plus-circle' : 'numeric-'+badges.completed.toString()+'-circle'} color={'red'} size={20} style={{fontWeight:'700',position:'absolute',right:-5,top:7}} /></View>,
          }}
        /> */}
        {/* <HeaderTab.Screen name="Miss" component={MissInspection}
          // options={{
          //   tabBarBadge: () => <View style={{backgroundColor:'white'}}><MaterialCommunityIcons name={badges.miss > 9 ? 'numeric-9-plus-circle' : 'numeric-'+badges.miss.toString()+'-circle'} color={'red'} size={20} style={{fontWeight:'700',position:'absolute',right:10,top:7}} /></View>,
          // }}
        /> */}
        

      </HeaderTab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
