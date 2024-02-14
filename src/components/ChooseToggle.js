import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withDelay } from 'react-native-reanimated';
import { LIGHT_BLUE, ORANGE_COLOR, THEME_COLOR } from '../utils/Style';

export default function ChooseTaggle() {
  const [parentWidth, setParentWidth] = useState(0);
  const translateX = useSharedValue(0);
  const toggleDimensions = 20;

  
  const handlePress = () => {

    translateX.value == 0 ? (translateX.value += parentWidth) : (translateX.value -= parentWidth);
  };

  const animatedStyles = useAnimatedStyle(() => {
    const backgroundColor = translateX.value > parentWidth / 2 ? LIGHT_BLUE : ORANGE_COLOR;

    return {
      transform: [{ translateX: withTiming(translateX.value, { duration: 500 }) }],
      backgroundColor,
    };
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onLayout={(e) => setParentWidth(e.nativeEvent.layout.width - 30)}
      onPress={handlePress}
      style={[{
        
        width: '100%',
        backgroundColor: 'white',
        marginTop: 20,
        borderWidth:1,
        borderColor:THEME_COLOR,
        paddingHorizontal: 5,
        paddingVertical: 2.5,
        borderRadius: 40,
      },
      ]}>
      <Animated.View
        style={[
          { width: toggleDimensions, height: toggleDimensions, borderRadius: 50 },
          animatedStyles,
        ]}> 
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
