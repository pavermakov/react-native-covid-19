import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const formatNumber = (num = 0) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

const Card = ({ style, name, title, value }) => {
  return (
    <View style={[s.root, style]}>
      <Text style={s.text}>
        {name}
      </Text>

      <Text style={[s.text, s.textMedium, s.textWhite]}>
        {title}
      </Text>

      <Text style={[s.text, s.textLarge, s.textPadded]}>
        {formatNumber(value)}
      </Text>
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#1a1b1f',
  },
  text: {
    fontSize: 14,
    color: '#7d7d7f',
  },
  textMedium: {
    fontSize: 20,
  },
  textLarge: {
    fontSize: 24,
  },
  textWhite: {
    color: Colors.white,
  },
  textPadded: {
    paddingTop: 8,
    paddingBottom: 4,
  },
});

export default Card;
