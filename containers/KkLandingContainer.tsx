import React, { useState } from 'react';
import { kkAPIClient } from '../api/KkAPIClient';
import { Environment } from '../KkEnvironment';
import { routes } from '../navigation/KkNavigation';
import { KkLandingScreen } from '../screens/KkLandingScreen';
import { localStorageKey } from '../services/KkLocalStorageService';

export type KkLandingProps = {
  formState: FormState;
  userUpdatedForm: React.Dispatch<React.SetStateAction<FormState>>;
  userSubmittedForm: () => void;
};

type FormState = {
  apiKey: string;
};

export const KkLandingContainer = (props: KkLandingProps) => {
  const [formState, setFormState] = useState<FormState>({ apiKey: '' });

  const { services, navigation } = Environment.current();

  return (
    <KkLandingScreen
      formState={formState}
      userUpdatedForm={setFormState}
      userSubmittedForm={async () => {
        await services.localStorage.storeItem(
          localStorageKey.API_KEY,
          formState.apiKey
        );
        navigation.navigate(routes.WORKSPACE);
      }}
    />
  );
};
