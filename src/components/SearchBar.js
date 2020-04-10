import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const SearchBar = ({ value, onChange }) => {
  return (
    <View style={s.root}>
      <Ionicons
        style={s.icon}
        name="ios-search"
        size={24}
      />

      <TextInput
        style={s.input}
        value={value}
        placeholder="Search"
        placeholderTextColor={Colors.white}
        onChangeText={onChange}
      />
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    flexDirection: 'row',
    backgroundColor: '#191919',
    paddingVertical: 12,
    alignItems: 'center',

  },
  icon: {
    color: Colors.white,
    paddingHorizontal: 15,
  },
  input: {
    color: Colors.white,
    fontSize: 18,
  },
});

export default SearchBar;
