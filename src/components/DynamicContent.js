import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';

const DynamicContent = ({ style, isLoading, hasContent, error, children }) => {
  const rootStyles = [s.root, style];

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

DynamicContent.defaultProps = {
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

export default DynamicContent;
