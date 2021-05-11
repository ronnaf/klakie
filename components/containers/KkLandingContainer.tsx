import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Environment } from '../../KkEnvironment';
import { routes } from '../../navigation/KkLinking';
import { KkLandingScreen } from '../screens/KkLandingScreen';
import { storageKeys } from '../../services/KkLocalStorageService';
import { Linking } from 'react-native';

export type KkLandingProps = {
  formState: FormState;
  userUpdatedForm: React.Dispatch<React.SetStateAction<FormState>>;
  userSubmittedForm: () => void;
  userPressedGetAPIKey: () => void;
};

type FormState = {
  apiKey: string;
};

export const KkLandingContainer = (props: KkLandingProps) => {
  const [formState, setFormState] = useState<FormState>({ apiKey: '' });

  const { services } = Environment.current();
  const { navigate } = useNavigation();

  // redirect to workspace screen if there is a stored API key
  useEffect(() => {
    (async () => {
      const apiKey = services.localStorage.getItem(storageKeys.API_KEY);
      if (apiKey) {
        navigate(routes.WORKSPACE);
      }
    })();
  }, []);

  return (
    <KkLandingScreen
      formState={formState}
      userUpdatedForm={setFormState}
      userSubmittedForm={async () => {
        await services.localStorage.storeItem(
          storageKeys.API_KEY,
          formState.apiKey
        );
        navigate(routes.WORKSPACE);
      }}
      userPressedGetAPIKey={() => {
        Linking.openURL('https://clockify.me/user/settings');
      }}
    />
  );
};
