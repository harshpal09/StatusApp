import React from 'react';
import styled from 'styled-components/native';
import { LIGHT_BLUE, THEME_COLOR } from '../utils/Style';

// Create a styled component
export const MainContainer = styled.SafeAreaView`
background-color: white;
  flex: 1; /* Take the full available space */
  align-items: center;
`;
export const Container = styled.View`
  background-color: rgba(255, 255, 255, 0.8);
  align-items: center;
  padding:15px 5px 15px 5px;
  margin-bottom: 5px;
`;
export const FloatingButton = styled.TouchableOpacity`
  width: 80%;
  height:40px;
  background-color:#FF691F;
  position:absolute;
  border-radius:30px;
  bottom:10px;
`;
export const StyledButton = styled.TouchableOpacity`
  width: 80%;
  height:40px;
  background-color:#FF5A00;
  border-radius:30px;
  padding:5px 0px 5px 0px;
  margin: 20px 0px 20px  0px;
`;

export const ItemContainer = styled.TouchableOpacity`
  width: 95%;
  background-color: rgba(255, 255, 255, 0.4); /* Adjust the alpha value for transparency */
  margin: 0 auto; /* Center the container horizontally */
  margin-top: 10px; /* Add top margin if needed */
  padding: 5px; /* Add padding for content */
  border-radius: 8px; /* Add border-radius for rounded corners */
  border: 1px solid lightgrey; /* Add a 1px solid black border */
 
`;
export const ProfileContainer = styled.View`
  width: 90%;
  background-color: white;
  margin: 0 auto; /* Center the container horizontally */
  margin-top: -50px; /* Add top margin if needed */
  padding: 5px; /* Add padding for content */
  border-radius: 15px; /* Add border-radius for rounded corners */
  border: 1px solid lightgrey; /* Add a 1px solid black border */
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.3);
`;
export const FadeTextSmall = styled.Text`
  color: grey;
  font-size: 10px;
  font-weight: 700;
`;
export const ThemeColorTextSmall = styled.Text`
  color: ${THEME_COLOR};
  font-size: 10px;
  font-weight: 700;
`;
export const LightThemeColorTextSmall = styled.Text`
  color: ${LIGHT_BLUE};
  font-size: 10px;
  font-weight: 700;
`;
export const LightThemeColorTextMedium = styled.Text`
  color: ${LIGHT_BLUE};
  font-size: 14px;
  font-weight: 700;
`;
export const ThemeColorTextMedium = styled.Text`
  color: ${THEME_COLOR};
  font-size: 14px;
  font-weight: 700;
`;
export const FadeTextMedium = styled.Text`
  color: grey;
  font-size: 12px;
  font-weight: 700;
`;
export const DarkTextMedium = styled.Text`
  color: black;
  font-size: 12px;
  font-weight: 700;
`;
export const DarkTextLarge = styled.Text`
  color: black;
  font-size: 16px;
  font-weight: 700;
`;
export const DarkTextSmall = styled.Text`
  color: black;
  font-size: 10px;
  font-weight: 700;
`;
export const StyledTextInput = styled.TextInput`
  width: 95%;
  height: 40px;
  font-size: 16px;
  color: #333;
  border-bottom-width: 1px;
  margin: 10px 0px 10px  0px;
`;