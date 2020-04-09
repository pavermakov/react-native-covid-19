import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import Colors from './src/constants/Colors';
import GlobalStateContext from './src/contexts/GlobalStateContext';

const Stack = createStackNavigator();

const loadFonts = async () => {
  await Font.loadAsync({
    ...Ionicons.font,
    'space-mono': require('./src/assets/fonts/SpaceMono-Regular.ttf'),
  });
};

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();
        await loadFonts();
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  }

  return (
    <GlobalStateContext>
      <View style={s.root}>
        <StatusBar barStyle="default" />

        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: Colors.black,
              },
              headerTitleStyle: {
                color: Colors.white,
              },
            }}
          >
            <Stack.Screen
              name="Root"
              component={BottomTabNavigator}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </GlobalStateContext>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
  },
});
