import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SubAccordionView, AccordionView} from '../../export';
import {
  LIGHT_BLUE,
  LIGHT_BLUE_BACKGROUND,
  ORANGE_COLOR,
  THEME_COLOR,
  globalStyles,
} from '../utils/Style';
import {DarkTextLarge, DarkTextSmall, FloatingButton} from './StyledComponent';
import SubChildAccordionView from './SubChildAccordionView';
import { useSelector } from 'react-redux';

export default DetailsChild = React.memo(({data,mainIndex}) => {



  if (Array.isArray(data)) {
    return (
      <FlatList
        data={data}
        renderItem={({item,index}) => (
          <MainContainer mainIndex={index}  data={item} />
        )}
      />
    );
  } else {
    return (
      <MainContainer mainIndex={null} data={data} />
    );
  }
});


const MainContainer = ({mainIndex,data}) =>{
  // console.log('from details child=> ', data);  
  const wizobj = useSelector((state) => state.global.wizardObj);

  const [accordion, setAccordion] = useState(true);
  const spinValue = useRef(new Animated.Value(0)).current;
  useEffect(()=>{
    setAccordion(true);
  },[wizobj.currentStep])


  const spin = () => {
    // console.log('toggle=>',toggle);
    spinValue.setValue(1);
    Animated.timing(spinValue, {
      toValue: 2,
      duration: 300, // Adjust the duration to control the speed (e.g., 5000 milliseconds for 5 seconds)
      easing: Easing.linear, // You can experiment with different easing functions
      useNativeDriver: true,
    }).start(); // Restart the animation when it completes
  };
  const spinAnimation = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange:
      accordion == true || accordion == undefined
        ? ['0deg', '180deg']
        : ['180deg', '0deg'], // Adjust the rotation range as needed
  });
  // console.log('accodian => ', !accordion);

  return (
    <SafeAreaView style={[globalStyles.flexBoxJustify, {width: '100%',paddingBottom:300}]}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          globalStyles.childDetailContainer,
          globalStyles.flexBoxJustify,
          {
            marginBottom: 0,
            marginTop: 10,
            borderBottomLeftRadius: !accordion ? 0 : 10,
            borderBottomRightRadius: !accordion ? 0 : 10,
            backgroundColor: LIGHT_BLUE_BACKGROUND,
          },
        ]}
        onPress={() => {
          spin(), setAccordion(!accordion);
        }}>
        <View
          style={[
            globalStyles.rowContainer,
            {justifyContent: 'space-between'},
          ]}>
          <View style={[globalStyles.rowContainer, {padding: 10}]}>
            <MaterialCommunityIcons
              name={data != undefined ? data.icon : ''}
              size={15}
              style={{marginHorizontal: 5}}
              color={THEME_COLOR}
            />
            <Text style={{color: THEME_COLOR, fontWeight: '700'}}>
              {data != undefined ? data.title : ''}
            </Text>
          </View>
          {/* <View style={[globalStyles.flexBox,{right:-80}]}>
            <TouchableOpacity
              style={[
                {
                  width: '100%',
                  padding:5,
                  height: 40,
                  backgroundColor: ORANGE_COLOR,
                  borderRadius: 10,
                },
                globalStyles.flexBox,
              ]}
              onPress={{}}
              activeOpacity={0.9}
              disabled={toggle}
              >
              {toggle ? (
                <ActivityIndicator size={'small'} color={'white'} />
              ) : (
                <DarkTextSmall style={{color: 'white',fontSize:10}}>Add <MaterialCommunityIcons  name="plus-circle" color={'white'} size={10} /></DarkTextSmall> 
               )} 
            </TouchableOpacity>
          </View> */}
          <Animated.View
            style={[
              styles.rotatedBox,
              {padding: 10, transform: [{rotate: spinAnimation}]},
            ]}>
            <MaterialCommunityIcons
              name="chevron-down"
              size={18}
              style={{marginHorizontal: 8}}
              color={THEME_COLOR}
            />
          </Animated.View>
        </View>
      </TouchableOpacity>
      {!accordion && data.subfeilds == undefined  && (
        <FlatList
          style={[
            globalStyles.flexBoxJustify,
            globalStyles.container,
            {borderWidth: accordion ? 1 : 0},
          ]}
          data={data.feilds}
          renderItem={({item, index}) => (
            <SubChildAccordionView
              content={item}
              length={data.length}
              mainIndex={mainIndex}
              index={index}
              expanded={!accordion}
            />
          )}
        />

      )}
      {/* <SubChildAccordionView content={[]} expanded={accordion}  />  */}
      { !accordion && data.subfeilds !=undefined && !Array.isArray(data) && (
        <AccordionView
          isSubChild={false}
          title={data.title}
          fields={data != undefined ? data.subfeilds : []}
          expanded={!accordion}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
