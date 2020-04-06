import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const DynamicScreen = ({ style, isLoading, hasContent, error, children }) => {
  const rootStyles = [s.root, style];

  if (isLoading) {
    return (
      <View style={[rootStyles, s.rootCentered]}>
          <ActivityIndicator
            size="large"
            color='white'
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

const s = StyleSheet.create({
    root: {
        flex: 1
    },
    rootCentered: {
      justifyContent: 'center',
      alignItems: 'center'
    }
});

export default DynamicScreen;
