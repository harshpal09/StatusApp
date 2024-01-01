import {KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomDropdown from './CustomDropdown';
import {THEME_COLOR, globalStyles, width} from '../utils/Style';
import {DarkTextLarge, DarkTextMedium, FadeTextMedium} from './StyledComponent';
import CustomTextInput from './CustomTextInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { setMaterial } from '../../redux/features/GlobalSlice';
import { getAllotedInventory } from '../services/Api';


const material_type = [
  {
    id: 967,
    name: '1/4 PIPE',
    price: '0',
  },
  {
    id: 966,
    name: 'T CONNECTOR ',
    price: '0',
  },
  {
    id: 965,
    name: 'STEAM L CONNECTOR ',
    price: '0',
  },
  {
    id: 964,
    name: 'QC BY QC CONNECTOR ',
    price: '0',
  },
  {
    id: 963,
    name: '3/8 CONNECTOR',
    price: '0',
  },
  {
    id: 962,
    name: '1/4 CONNECTOR ',
    price: '0',
  },
  {
    id: 961,
    name: 'REPAIRD SV',
    price: '0',
  },
];

export default function Material({fields,index,onInputChange}) {

  // console.log("fiels 1 =>",fields)
  const [count, setCount] = useState(1);
  const [obj , setObj] = useState({})
  const [price, setprice] = useState()
  const [error, setError] = useState("")

  const api_send_data = useSelector(state => state.global.send_data);

  const handlePlus = () =>{
    if(Object.keys(obj).length !== 0){
      console.log('araga ')
    
      if(obj.allotedquantity > count){
        setCount(prev => prev + 1)
        setprice(count * parseInt(obj.price))
        setError("");
      }
      else{
        setError("Oops ! You have only "+obj.allotedquantity+" Alloted Quantity of this inventory");
      }
      
    }else{
      console.log('araga rr')
      setError("Please select Material Type First");
    }
  }
  // console.log("data api response =>",api_send_data);
  useEffect(()=>{ 
    // console.log("count  =>",count," obj price",obj.price)
    setprice(count * parseInt(obj.price))
  },[count])
  useEffect(()=>{ 
    // console.log("count  =>",count," obj price",obj.price)
    setError("");
    setCount(1);
    setprice(count * parseInt(obj.price))
  },[obj])

  useEffect(()=>{
    if(Object.keys(obj).length !== 0){
    onInputChange(
      {
        id:obj.id,
        material:obj.type,
        actual_price:obj.price,
        quantity:count,
        rate:obj.price,
        total:price
      }
    )
    }
  },[obj,count,price])
  const onHandleChange=(index)=>{
    
    // console.log("ind =>",index)
    setObj(fields[index]);
    setprice(count*parseInt(fields[index].price))
  }

  // console.log("price =>",price)
  return (
    <View style={{backgroundColor: 'transparent', width: '100%'}}>
      {}
      <CustomDropdown
        onInputChange={onHandleChange}
        fields={{
          elements: fields,
          value: '',
          placeholder: 'Select Material type',
        }}
      />
      <View style={[globalStyles.rowContainer, {backgroundColor: 'transparent',justifyContent:'space-around'}]}>
        <View style={[{backgroundColor:'transparent',left:30,paddingVertical:10},globalStyles.rowContainer]}>
          <DarkTextLarge>Quantity : </DarkTextLarge>
          {/* <View style={globalStyles.cartIncDecContainer}> */}
            {/* <TouchableOpacity
              style={globalStyles.decBtn}
              onPress={() => {setCount(prev => (prev > 2 ? prev - 1 : 1)),setError("");}}>
              <Text style={globalStyles.decButton}>-</Text>
            </TouchableOpacity> */}
            <DarkTextLarge >{count}</DarkTextLarge>
            {/* <TouchableOpacity
              style={globalStyles.incBtn}
              onPress={handlePlus}>
              <Text style={globalStyles.incButton}>+</Text>
            </TouchableOpacity> */}
          {/* </View> */}
        </View>
        <View style={[{width:'50%'},globalStyles.flexBox,globalStyles.rowContainer]}>
        <DarkTextLarge >Price : </DarkTextLarge>
        <FadeTextMedium style={{fontSize:16,}}>{"₹ "+price}</FadeTextMedium>
      </View>
        {/* <KeyboardAvoidingView style={{backgroundColor:'transparent'}}>
            <CustomTextInput onInputChange={()=>{}} fields={{placeholder:'Price',value:''}} />
        </KeyboardAvoidingView> */}
      </View>
      {error && <DarkTextMedium style={{color:'red',width:'100%',textAlign:'center'}}>{error}</DarkTextMedium>}

     
      
      
    </View>
  );
}

const styles = StyleSheet.create({});
