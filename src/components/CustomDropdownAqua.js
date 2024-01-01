import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native';
import { THEME_COLOR, globalStyles, width } from '../utils/Style';
import { LightThemeColorTextMedium, ThemeColorTextMedium } from './StyledComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomDropdownAqua = ({fields,onInputChange}) => {


  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(fields.value);
  const [searchQuery, setSearchQuery] = useState('');
  
  const options = ['Select a option','Option 1', 'Option 2', 'Option 3', 'Another Option', 'One More Option'];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    handleSelect(fields.value)
  }, [])

  const handleSelect = (value) => {
    // console.log("text =",value)
    onInputChange(value,fields);
    setSelectedValue(value);
    setIsOpen(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredOptions = fields.elements.filter((option,i) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container,globalStyles.flexBox,{width:'50%'}]}>
      <TouchableOpacity onPress={toggleDropdown} style={[styles.header,globalStyles.rowContainer,{justifyContent:'space-between',borderColor:selectedValue == "" ? 'red':THEME_COLOR}]}>
        <LightThemeColorTextMedium style={{color:selectedValue == "" ? 'red':THEME_COLOR}}>{selectedValue || fields.value  || fields.placeholder} </LightThemeColorTextMedium> 
        <MaterialCommunityIcons name='chevron-down'color={selectedValue == "" ? 'red':THEME_COLOR} size={20} />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          <TextInput
            placeholderTextColor={'black'}
            placeholder={"Search " + fields.placeholder}
            style={styles.searchInput}
            onChangeText={handleSearch}
          />
          <FlatList
         
            data={filteredOptions}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item)}
              >
                <Text style={{color:'black'}}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:'100%',
    // backgroundColor:'green',
    marginVertical:10,

    // position: 'relative',
  },
  header: {
    width:'90%',
    padding: 10,
    borderWidth: 1,
    borderColor:  THEME_COLOR,
    borderRadius: 5,
  },
  dropdown: {
    width:'90%',
    // position: 'absolute',
    // top: 42,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    // zIndex:5
  },
  searchInput: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    // zIndex:5
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    // zIndex:5
  },
});

export default CustomDropdownAqua;
