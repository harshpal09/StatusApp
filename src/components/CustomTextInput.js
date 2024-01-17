import { StyleSheet, Text, TextInput, View, } from 'react-native'
import React, { useState,useEffect } from 'react'
import { LIGHT_BLUE, THEME_COLOR, globalStyles } from '../utils/Style'
import { useDispatch, useSelector } from 'react-redux';
import { setSendData } from '../../redux/features/GlobalSlice';

export default function CustomTextInput({name,fields,onInputChange,isTextArea}) {
  const [selectedvalue, setSelectedValue] = useState(fields.value)
  const api_send_data = useSelector(state => state.global.send_data);
  const dispatch = useDispatch();
  const handleInputChange = (text) => {
    // console.log("dfghjk",text.nativeEvent.text)
   
    if(text.nativeEvent != undefined){
      setSelectedValue(text.nativeEvent.text)
      // setValue(text.nativeEvent.text);
    }
    else{
      setSelectedValue(text)
      // setValue(text);
      
    }
  //  console.log("text fields value =>",fields)
  };

  useEffect(()=>{ setValue();},[selectedvalue])

 const setValue = () => {
  const obj = {...api_send_data};
  obj[fields.name] = selectedvalue;
  dispatch(setSendData(obj));
}

  

// console.log("fields =>",fields)

  // useEffect(() => {

  // }, [selectedvalue])
  
  return (
    <View style={[globalStyles.flexBox,{backgroundColor:'transparent',width:'100%',paddingVertical:10}]}>
      <TextInput onChange={handleInputChange} placeholderTextColor={ selectedvalue == '' ? 'red':LIGHT_BLUE} style={{backgroundColor:'transparent',width:'100%',padding:10,borderRadius:10,borderColor:selectedvalue == '' ? 'red':THEME_COLOR,borderWidth:1,fontWeight:'700',height:isTextArea ? 100:null}} placeholder={"Enter "+fields.placeholder} defaultValue={fields.value} multiline numberOfLines={isTextArea ? 4:0} />
    </View>
  )
}

const styles = StyleSheet.create({})