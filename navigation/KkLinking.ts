import * as Linking from 'expo-linking';

export const routes = {
  LANDING: 'landing',
  WORKSPACE: 'workspace',
};

export const kkLinking = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Landing: routes.LANDING,
          Workspace: routes.WORKSPACE,
        },
      },
    },
  },
};
