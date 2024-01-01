import { StyleSheet, Text, TextInput, View, } from 'react-native'
import React, { useState,useEffect } from 'react'
import { LIGHT_BLUE, THEME_COLOR, globalStyles } from '../utils/Style'

export default function CustomTextInput({name,fields,onInputChange,isTextArea}) {
  const [selectedvalue, setSelectedValue] = useState(fields.value)
  const handleInputChange = (text) => {
    // console.log("dfghjk",text.nativeEvent.text)
    if(text.nativeEvent != undefined){
      setSelectedValue(text.nativeEvent.text);
      onInputChange(text.nativeEvent.text,fields.type);
    }
    else{
      setSelectedValue(text);
      onInputChange(text,fields.type);
    }
  //  console.log("text fields value =>",fields)
  };

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