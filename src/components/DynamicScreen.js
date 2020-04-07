import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../constants/Colors';

const DynamicScreen = ({ style, isLoading, hasContent, error, children, onEnter, onLeave }) => {
  const rootStyles = [s.root, style];

  useFocusEffect(
    useCallback(() => {
      onEnter();
      return onLeave;
    }, []),
  );

  if (isLoading) {
    return (
      <View style={[rootStyles, s.rootCentered]}>
        <ActivityIndicator
          size="large"
          color="white"
        />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[rootStyles, s.rootCentered]}>
        <Text>An error has occured</Text>
      </View>
    );
  }

  if (hasContent) {
    return (
      <View style={rootStyles}>
        {children}
      </View>
    );
  }

  return (
    <View style={[rootStyles, s.rootCentered]}>
      <Text>Empty content</Text>
    </View>
  );
};

DynamicScreen.defaultProps = {
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

export default DynamicScreen;
