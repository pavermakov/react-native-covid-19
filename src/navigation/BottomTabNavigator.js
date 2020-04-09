import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBarIcon from '../components/TabBarIcon';
import GlobalScreen from '../screens/GlobalScreen';
import CountriesScreen from '../screens/CountriesScreen';
import Colors from '../constants/Colors';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Global';

const getHeaderTitle = (route) => {
  const routeName = route.state?.routes[route.state.index]?.name || INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'How to get started';

    case 'Global':
      return 'Global Coronavirus information';

    case 'Countries':
      return 'Coronavirus by Country';
  }
}

const BottomTabNavigator = ({ navigation, route }) => {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        style: {
          backgroundColor: Colors.black
        }
      }}
    >
      <BottomTab.Screen
        name="Global"
        component={GlobalScreen}
        options={{
          title: 'Global',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-globe" />,
        }}
      />

      <BottomTab.Screen
        name="Countries"
        component={CountriesScreen}
        options={{
          title: 'Countries',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-flag" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;
