import { Platform } from 'react-native';

export const kkAlert = (message: string) => {
  if (Platform.OS === 'web') {
    kkAlert(message);
  }
};
