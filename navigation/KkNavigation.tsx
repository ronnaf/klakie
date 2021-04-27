import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ColorSchemeName } from 'react-native';
import { KkLandingContainer } from '../containers/KkLandingContainer';
import { KkWorkspaceContainer } from '../containers/KkWorkspaceContainer';

export const routes = {
  LANDING: 'Landing',
  WORKSPACE: 'Workspace',
};

export const createKkNavigation = (): {
  Navigator: React.ComponentType<{ colorScheme: ColorSchemeName }>;
  navigate: (route: string, params?: { [key: string]: any }) => void;
} => {
  let navigatorRef: NavigationContainerRef | null = null;
  return {
    navigate: (route, params) => {
      navigatorRef?.navigate(route, params);
    },
    Navigator: (props) => (
      <NavigationContainer
        ref={(ref) => (navigatorRef = ref)}
        theme={props.colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name={routes.LANDING} component={KkLandingContainer} />
      <RootStack.Screen
        name={routes.WORKSPACE}
        component={KkWorkspaceContainer}
      />
    </RootStack.Navigator>
  );
};
