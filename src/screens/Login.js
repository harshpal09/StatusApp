import {SafeAreaView, StyleSheet, Text, View, Button, ActivityIndicator, Image} from 'react-native';
import React, { useEffect, useState } from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {isLoggedIn, setUserDetails} from '../../redux/features/GlobalSlice';
import {
  DarkTextLarge,
  MainContainer,
  ProfileContainer,
  StyledButton,
  StyledTextInput,
} from '../components/StyledComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {THEME_COLOR, globalStyles, width} from '../utils/Style';
import { login } from '../services/Api';
import axios from 'axios';

const Stack = createStackNavigator();

const LoginComponent = () => {
  const isGlobalBoolean = useSelector(state => state.global.userDetails);
  // console.log("profil details => in login ",isGlobalBoolean)
  const dispatch = useDispatch();

  const [focusInEmail,setFocusInEmail] = useState(false)
  const [focusInPass,setFocusInPass] = useState(false)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('');
  const [toggle,setToggle] = useState(false);
  const [error,setError] = useState({
    email:'',
    password:'',
    error:'',
  })
  const [data,setData] = useState({});
  
  const handleClickEmail = (event) => {
    // event.persist();
    const emailValue = event.nativeEvent.text;
    setEmail(emailValue);
    setError((prev) => ({ ...prev, email: '' }));
    setError(prev => ({ ...prev, error:''}));
  };
  
  const handleClickPass = (event) => {
    // event.persist();
    const passwordValue = event.nativeEvent.text;
    setPassword(passwordValue);
    setError((prev) => ({ ...prev, password: '' }));
    setError(prev => ({ ...prev, error:''}));

  };
  useEffect(()=>{
  
  },[])

  

  

  const onSubmit = async() =>{
      setToggle(true);
      if(email == '' ){  
       setError(prev => ({ ...prev, email: 'Please enter your email' })) 
       setToggle(false); 
       return;
      }
      if(password == ''){
        setError(prev => ({ ...prev, password: 'Please enter your Password' }))
        setToggle(false); 
        return;
      }
        const res =await login({email:email,password:password});
        
        if(res != null && res.data.data.code == 200){
          const jsonValue = JSON.stringify(res.data.data.data);
          try {
            await AsyncStorage.setItem('user', JSON.stringify(jsonValue));
            dispatch(setUserDetails(res.data.data.data));
            dispatch(isLoggedIn(true))
          } catch (error) {
            console.log("error - ",error)
            setError(prev => ({ ...prev, error:"**Something went wrong to save user data"}))
          }
          
        }
        else if(res.error != ""){
          setError(prev => ({ ...prev, error:"**"+res.error}))
          
        }
        else{
          setError(prev => ({ ...prev, error:"**"+res.data.data.message}))
        }
      setToggle(false);
  }

  
  // console.log("user deatails = >" ,isGlobalBoolean)

  return (
    <MainContainer style={{backgroundColor:THEME_COLOR}}>
      <View
        style={{
          height: 370,
          backgroundColor: 'white',
          width: width + 100,
          borderBottomLeftRadius: (width + 270) / 2,
          borderBottomRightRadius: (width + 270) / 2,
        }}></View>
      <View style={{width:'30%',position:'absolute'}}>
        <Image source={require('../assets/images/status_blue.png')} style={{width:'100%',height:150,}} />
      </View>
      <ProfileContainer
        style={[{marginTop: -200, width: '85%'}, globalStyles.flexBox]}>
        <DarkTextLarge
          style={{
            fontSize: 20,
            marginVertical: 20,
            fontSize: 22,
            fontWeight: '600',
          }}>
          Sign In Your Account
        </DarkTextLarge>
        <StyledTextInput
          style={[{borderBottomColor:focusInEmail ? THEME_COLOR : 'grey'}]}
          placeholder="Email"
          placeholderTextColor={focusInEmail ? THEME_COLOR : 'grey'}
          onFocus={()=>setFocusInEmail(true)}
          onBlur={()=>setFocusInEmail(false)}
          onChange={handleClickEmail}
          />
        {error.email != '' &&<Text style={{fontSize:13,color:'red'}}>{error.email}</Text>}
        <StyledTextInput
         style={[{borderBottomColor:focusInPass ? THEME_COLOR : 'grey'}]}
         placeholder="Password"
         placeholderTextColor={focusInPass ? THEME_COLOR : 'grey'}
         onFocus={()=>setFocusInPass(true)}
         onBlur={()=>setFocusInPass(false)}
         onChange={handleClickPass}
          secureTextEntry={true}
          autoCorrect={false}
        />
        {error.password != '' && <Text style={{fontSize:13,color:'red'}}>{error.password}</Text>}
        <StyledButton style={[globalStyles.flexBox]} onPress={onSubmit}>
          {toggle ? <ActivityIndicator size={'small'}  />:
          <Text style={{color: 'white', fontWeight: '800', fontSize: 17}}>
            Sign In
          </Text>
          }
        </StyledButton>
        {error.error != '' && <Text style={{fontSize:13,color:'red'}}>{error.error}</Text>}
      </ProfileContainer>
    </MainContainer>
  );
};

export default function Login() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginComponent}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: 'white',
            borderBottomColor: 'transparent',
            elevation: 0,
            shadowOpacity: 0, // For iOS
            borderBottomWidth: 0, // For iOS
          },
          headerTitleStyle: {
            color: '#FFF',
            alignSelf: 'flex-start',
            fontWeight: 'bold',
            // backgroundColor:'red',
            // width:'100%'
          },
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
