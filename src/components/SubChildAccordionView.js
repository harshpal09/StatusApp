import { StyleSheet, Text, View, Animated, Easing, TouchableOpacity } from 'react-native'
// import React from 'react'
import React, { useState, useRef } from 'react';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { globalStyles } from '../utils/Style';
import AccordionView from './AccordionView';

export default function SubChildAccordionView({mainIndex, content, length, index }) {
    const [toggle, setToggle] = useState(false);
    const [accordion, setAccordion] = useState(true);
    const spinValue = useRef(new Animated.Value(0)).current;

    // console.log("subchild =",content);

    const spin = () => {
        // console.log('toggle=>', toggle);
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
        outputRange: !accordion == true || accordion == undefined ? ['0deg', '180deg'] : ['180deg', '0deg'], // Adjust the rotation range as needed
    });
    const handleAccordion = (val) => {
        setAccordion(val)
    }
    return (
        <View
            style={[
                globalStyles.flexBoxJustify,
                { width: '100%',backgroundColor:'white' },
            ]}
        >
            <TouchableOpacity
                activeOpacity={0.7}
                style={[
                    globalStyles.childDetailContainer,
                    globalStyles.flexBoxJustify,
                    {
                        width: '100%',
                        backgroundColor: 'transparent',
                        marginTop: 10,
                        borderBottomLeftRadius: accordion ? 0 : 10,
                        borderBottomRightRadius: accordion ? 0 : 10,
                        borderBottomWidth: index == length - 1 && !accordion ? 0 : 1,
                        borderColor: 'lightgrey'

                    },
                ]}
                onPress={() => {
                    // console.log('on press toggle =>', toggle,"on press accordian",accordion),
                    spin()
                    setAccordion(!accordion);
                }}>
                <View
                    style={[
                        globalStyles.rowContainer,
                        { justifyContent: 'space-between', paddingHorizontal: 10 },
                    ]}>
                    <View style={[globalStyles.rowContainer, { padding: 10 }]}>
                        <Text style={{ color: 'black', fontWeight: '700' }}>
                            {content.name}
                        </Text>
                    </View>
                    <Animated.View
                        style={[
                            styles.rotatedBox,
                            { padding: 10, transform: [{ rotate: spinAnimation }] },
                        ]}>
                        <MaterialCommunityIcons
                            name="chevron-down"
                            size={18}
                            style={{ marginHorizontal: 8 }}
                            color={'black'}
                        />
                    </Animated.View>
                </View>
            </TouchableOpacity>

            <AccordionView
              mainIndex={mainIndex}
              fieldIndex={index}
              handleAccordion={handleAccordion} 
              isSubChild={true}
              title={content.name}
              fields={content.subfeilds != undefined ? content.subfeilds:[]}  
              expanded={accordion}   
            />

        </View>

    )
}

const styles = StyleSheet.create({})