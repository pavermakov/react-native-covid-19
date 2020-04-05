import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import GlobalScreen from '../screens/GlobalScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

const getHeaderTitle = (route) => {
  const routeName = route.state?.routes[route.state.index]?.name || INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'How to get started';

    case 'Links':
      return 'Links to learn more';

    case 'Global':
      return 'Global Coronavirus information'
  }
}

const BottomTabNavigator = ({ navigation, route }) => {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Get Started',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />

      <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          title: 'Resources',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />

      <BottomTab.Screen
        name="Global"
        component={GlobalScreen}
        options={{
          title: 'Global',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-globe" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;
