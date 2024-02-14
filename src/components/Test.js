import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../utils/Style'
import { DarkTextLarge } from './StyledComponent';
import { getAllotedInventory,getEstimates } from '../services/Api';
export default function Test() {
    const [allEstimates, setAllEstimates] = useState([]);

    useEffect(() => {
        getAllEstimates();
    }, [])
    const getAllEstimates = async () => {
        // console.log('aerrrrr => ', val.id);
        try {
          const response = await getEstimates();
          // console.log('data =>', response.data);
          if (response.data.data.code != undefined && response.data.data.code) {
            setAllEstimates(response.data.data.data);
          }
        } catch (error) {
          console.log('error ', error);
        } finally {
        }
      };
  return (
    <View style={[{backgroundColor:'red',height:300},globalStyles.flexBox]}>
      <FlatList
        style={{width:'80%',height:100,backgroundColor:'green'}}
        data={allEstimates}
        renderItem={({item,index})=><DarkTextLarge>{item.estimate}</DarkTextLarge>}
        keyExtractor={(i)=>i.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({})