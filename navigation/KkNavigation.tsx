import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ColorSchemeName } from 'react-native';
import { KkLandingContainer } from '../components/containers/KkLandingContainer';
import { KkWorkspaceContainer } from '../components/containers/KkWorkspaceContainer';
import { kkLinking, routes } from './KkLinking';

export const createKkNavigation = (): {
  Navigator: React.ComponentType<{ colorScheme: ColorSchemeName }>;
} => {
  return {
    Navigator: (props) => (
      <NavigationContainer linking={kkLinking}>
        <KkRootNavigator />
      </NavigationContainer>
    ),
  };
};

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const RootStack = createStackNavigator();
const KkRootNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={routes.LANDING}>
      <RootStack.Screen name={routes.LANDING} component={KkLandingContainer} />
      <RootStack.Screen
        name={routes.WORKSPACE}
        component={KkWorkspaceContainer}
      />
    </RootStack.Navigator>
  );
};
