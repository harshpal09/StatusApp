import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native';
import { THEME_COLOR, globalStyles, width } from '../utils/Style';
import { LightThemeColorTextMedium, ThemeColorTextMedium } from './StyledComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomDropdown = ({ fields, onInputChange }) => {

  // console.log("fields =>",fields);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(fields.value || '');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // useEffect(() => {
  //   if (fields.value) {
  //     handleSelect(fields.value);
  //   }
  // }, []);

  const handleSelect = (value,index) => {
    onInputChange(index);
    setSelectedValue(value);
    setIsOpen(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  
  const filteredOptions = fields.elements.filter((option) =>
  option.type && option.type.toLowerCase().includes(searchQuery.toLowerCase())
);


  return (
    <View style={[styles.container, globalStyles.flexBox]}>
      <TouchableOpacity
        onPress={toggleDropdown}
        style={[
          styles.header,
          globalStyles.rowContainer,
          { justifyContent: 'space-between', borderColor: selectedValue === '' ? 'red' : THEME_COLOR },
        ]}
      >
        <LightThemeColorTextMedium style={{ color: selectedValue === '' ? 'red' : THEME_COLOR }}>
          {selectedValue || fields.placeholder}
        </LightThemeColorTextMedium>
        <MaterialCommunityIcons name="chevron-down" color={selectedValue === '' ? 'red' : THEME_COLOR} size={20} />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          <TextInput
            placeholderTextColor={'black'}
            placeholder={`Search ${fields.placeholder}`}
            style={styles.searchInput}
            onChangeText={handleSearch}
          />
          <FlatList
            data={filteredOptions}
            renderItem={({ item ,index}) => (
              <TouchableOpacity style={styles.option} onPress={() => handleSelect(item.type,index)}>
                <Text style={{color:'black'}}>{item.type}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  header: {
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdown: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  searchInput: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default CustomDropdown;
