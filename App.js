import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux'; // Import Provider from react-redux
import { store } from './redux/store/Index';// Import your Redux store
import { BottomTabs, Login, StackNavigation } from './export';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isLoggedIn, setUserDetails } from './redux/features/GlobalSlice';
import { View,ActivityIndicator } from 'react-native';

const App = () => {
  const isuserLoggedIn = useSelector((state)=> state.global.isUserLoggedIn)
  const userDetails = useSelector((state)=> state.global.userDetails)

  // console.log("user details in app.js=>    ", userDetails);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  // In App.js or another initialization component
useEffect(() => {
  const checkUserLoginStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');

      // console.log("user data => ",userData);
      if (userData) {
        // User is logged in, update Redux state
        dispatch(setUserDetails(JSON.parse(userData)));
        dispatch(isLoggedIn(true));
      }
    } catch (error) {
      console.error('Error checking user login status:', error);
    }
    setIsLoading(false);
  };

  checkUserLoginStatus();
}, []);

if (isLoading) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

  return (
    <NavigationContainer>
     {isuserLoggedIn ?   <StackNavigation />:<Login/>}
    </NavigationContainer>
  );
}

export default function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
