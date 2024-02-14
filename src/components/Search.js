import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import { globalStyles, width } from '../utils/Style';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { DarkTextLarge, DarkTextMedium } from './StyledComponent';

export default function Search({data,setFilter,type}) {
    const [search, setSearch] = useState('');
    
    const filteredOptions = data.filter((option,i) =>
      type === 'allBank' ? (
      option.name.toLowerCase().includes(search.toLowerCase()) ||
      option.branch_code.toLowerCase().includes(search.toLowerCase()) ||
      option.add_by.toLowerCase().includes(search.toLowerCase()) ||
      option.created_at.toLowerCase().includes(search.toLowerCase())):
      type === 'fieldjobs' ? (
        option.unique_id.toLowerCase().includes(search.toLowerCase()) ||
        option.status.toLowerCase().includes(search.toLowerCase()) ||
        option.address.toLowerCase().includes(search.toLowerCase()) ||
        option.assigned_to.toLowerCase().includes(search.toLowerCase()) ||
        option.branch.toLowerCase().includes(search.toLowerCase()) ||
        option.add_by.toLowerCase().includes(search.toLowerCase()) ||
        option.created_at.toLowerCase().includes(search.toLowerCase())
      ): type === 'alljobs' ? (
        option.unique_id.toLowerCase().includes(search.toLowerCase()) ||
        option.status.toLowerCase().includes(search.toLowerCase()) ||
        option.address.toLowerCase().includes(search.toLowerCase()) ||
        option.assigned_to.toLowerCase().includes(search.toLowerCase()) ||
        option.branch.toLowerCase().includes(search.toLowerCase()) ||
        option.add_by.toLowerCase().includes(search.toLowerCase()) ||
        option.created_at.toLowerCase().includes(search.toLowerCase())
      ): null
  );



  const handleSearch = (text) => {
    setSearch(text);
  }
  useEffect(()=>{
    setFilter(filteredOptions)
  },[search])
 
  


  return (
    <View
      style={{backgroundColor:'white',zIndex:1,width:'100%'}}
    >
      <View
        style={[
          {
            width: width,
            backgroundColor: 'transparent',
            paddingVertical: 10,
            overflow: 'hidden',
          },
          globalStyles.flexBox,
        ]}>
        <AntDesign name='search1' style={{ position: 'absolute', left: 15, textAlignVertical: 'center', zIndex: 1 }} size={25} />
        <TextInput
          style={styles.textInput}
          placeholder="Search..."
          placeholderTextColor={'black'}
        //   defaultValue={''}
          onChangeText={handleSearch}
        />
      </View>
      {search.length > 0 && filteredOptions.length == 0 &&
        <View style={[{width:'100%',backgroundColor:'transparent',paddingVertical:20},globalStyles.flexBox]}>
        <DarkTextLarge>No result found..</DarkTextLarge>
      </View>
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      // marginRight: 10,
    },
    textInput: {
      height: 40,
      width: '95%',
      // padding: 10,
      borderColor: 'gray',
      borderWidth: 1,
      paddingHorizontal: 8,
      borderRadius: 10,
      paddingLeft: 40
    },
  });
