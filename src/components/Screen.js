import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../constants/Colors';

const Screen = ({ style, children, onEnter, onLeave }) => {
  const rootStyles = [s.root, style];

  useFocusEffect(
    useCallback(() => {
      onEnter();
      return onLeave;
    }, []),
  );

  return (
    <View style={rootStyles}>
      {children}
    </View>
  );
};

Screen.defaultProps = {
  onEnter: Function.prototype,
  onLeave: Function.prototype,
};

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  rootCentered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Screen;
