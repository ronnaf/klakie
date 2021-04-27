import { Environment } from '../KkEnvironment';
import { storageKeys } from '../services/KkLocalStorageService';
import { ClockifyUser } from './models/ClockifyUser';
import { TimeEntry } from './models/TimeEntry';
import { Workspace } from './models/Workspace';

export type API = {
  getWorkspaces: () => Promise<Workspace[]>;
  getTimeEntries: (workspaceId: string, userId: string) => Promise<TimeEntry[]>;
  getCurrentUser: () => Promise<ClockifyUser>;
};

export const kkAPIClient = (options: { baseUrl: string }): API => {
  const getUrl = (url: string) => `${options.baseUrl}/${url}`;
  const getHeaders = (apiKey: string) => ({ 'X-Api-Key': apiKey });

  return {
    getWorkspaces: async () => {
      const { services } = Environment.current();
      const apiKey = await services.localStorage.getItem(storageKeys.API_KEY);
      if (!apiKey) return;

      const headers = getHeaders(apiKey);
      const url = getUrl('/workspaces');

      const response = await fetch(url, { headers });
      const result = await response.json();

      if (result.code) {
        throw new Error(result.message);
      }

      return result;
    },
    getTimeEntries: async (workspaceId, userId) => {
      const { services } = Environment.current();
      const apiKey = await services.localStorage.getItem(storageKeys.API_KEY);
      if (!apiKey) return;

      const headers = getHeaders(apiKey);
      const url = getUrl(
        `/workspaces/${workspaceId}/user/${userId}/time-entries`
      );

      const response = await fetch(url, { headers });
      const result = await response.json();

      if (result.code) {
        throw new Error(result.message);
      }

      return result;
    },
    getCurrentUser: async () => {
      const { services } = Environment.current();
      const apiKey = await services.localStorage.getItem(storageKeys.API_KEY);
      if (!apiKey) return;

      const headers = getHeaders(apiKey);
      const url = getUrl('/user');

      const response = await fetch(url, { headers });
      const result = await response.json();

      if (result.code) {
        throw new Error(result.message);
      }

      return result;
    },
  };
};
