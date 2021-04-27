import { Workplace } from './models/Workplace';

export type API = {
  getWorkspaces: () => Promise<Workplace>;
};

export const kkAPIClient = (options: { baseUrl: string }): API => {
  const getUrl = (url: string) => `${options.baseUrl}/${url}`;
  return {
    getWorkspaces: async () => {
      const response = await fetch(getUrl('/workspaces'));
      const result = await response.json();
      return result;
    },
  };
};
