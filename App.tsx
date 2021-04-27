import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { kkAPIClient } from './api/KkAPIClient';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { Environment } from './KkEnvironment';
import { createKkNavigation } from './navigation/KkNavigation';
import { localStorageService } from './services/KkLocalStorageService';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const { Navigator, navigate } = createKkNavigation();

  Environment.set({
    api: kkAPIClient({
      baseUrl: 'https://api.clockify.me/api/v1',
    }),
    navigation: {
      navigate,
    },
    services: {
      localStorage: localStorageService,
    },
  });

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigator colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
