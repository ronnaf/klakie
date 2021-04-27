import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { kkAPIClient } from './api/KkAPIClient';
import useCachedResources from './utils/hooks/useCachedResources';
import useColorScheme from './utils/hooks/useColorScheme';
import { Environment } from './KkEnvironment';
import { createKkNavigation } from './navigation/KkNavigation';
import { localStorageService } from './services/KkLocalStorageService';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const { Navigator } = createKkNavigation();

  Environment.set({
    api: kkAPIClient({
      baseUrl: 'https://api.clockify.me/api/v1',
    }),
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
