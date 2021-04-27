import AsyncStorage from '@react-native-async-storage/async-storage';

export type LocalStorageService = {
  /**
   * Stores a `value` using the given `key` in storage.
   * The returned Promise resolves when the value has been stored.
   */
  storeItem: (key: string, value: string) => Promise<void>;

  /**
   * Retrieves the value with the given `key` in storage, or `undefined` if
   * there is no value.
   */
  getItem: (key: string) => Promise<string | null>;

  /**
   * Deletes the value at the given `key` in storage.
   * The returned Promise resolves when the value has been deleted.
   */
  deleteItem: (key: string) => Promise<void>;

  /**
   * Clear AsyncStorage
   */
  clear: () => Promise<void>;
};

export const localStorageService: LocalStorageService = {
  storeItem: AsyncStorage.setItem,
  getItem: (key) => AsyncStorage.getItem(key),
  deleteItem: AsyncStorage.removeItem,
  clear: AsyncStorage.clear,
};

export const storageKeys = {
  API_KEY: 'API_KEY',
};
