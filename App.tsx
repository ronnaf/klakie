import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { kkAPIClient } from './api/KkAPIClient';
import { Environment } from './KkEnvironment';
import { createKkNavigation } from './navigation/KkNavigation';
import { localStorageService } from './services/KkLocalStorageService';
import useCachedResources from './utils/hooks/useCachedResources';
import useColorScheme from './utils/hooks/useColorScheme';
import styled from 'styled-components';

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
        <ToastContainer
          position='bottom-center'
          hideProgressBar={true}
          style={{ width: 'unset' }}
          closeButton={false}
        />
      </SafeAreaProvider>
    );
  }
}

const StyledToast = styled(ToastContainer).attrs({
  // custom props
})`
  /** Classes for the displayed toast **/
  .Toastify__toast {
    justify-content: center;
    min-height: unset;
    border-radius: 0;
  }
`;
