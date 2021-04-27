import { API } from './api/KkAPIClient';
import { LocalStorageService } from './services/KkLocalStorageService';

type KkEnvironment = {
  /** The current API */
  api: API;
  /** Currently available services */
  services: {
    /** A service for interacting with async storage */
    localStorage: LocalStorageService;
  };
};

/** This value holds the actual environment object. */
let _currentEnvironment: KkEnvironment | undefined = undefined;

/** Exposes the current `StraveEnvironment` via `current()`. */
const Environment = {
  /** Returns the current environment. */
  current(): KkEnvironment {
    return { ..._currentEnvironment! };
  },

  /**
   * Sets the current environment. Call as early as possible during startup, and
   * ONLY call once.
   */
  set(environment: KkEnvironment) {
    if (_currentEnvironment === undefined) {
      _currentEnvironment = environment;
    }
  },
};

Object.freeze(Environment);
export { Environment };
