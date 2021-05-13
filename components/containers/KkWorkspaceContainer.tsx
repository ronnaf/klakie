import { useNavigation } from '@react-navigation/core';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { ClockifyUser } from '../../api/models/ClockifyUser';
import { DailyEntry, GroupEntry, TimeEntry } from '../../api/models/TimeEntry';
import { Workspace } from '../../api/models/Workspace';
import { Environment } from '../../KkEnvironment';
import { routes } from '../../navigation/KkLinking';
import { kkAlert } from '../../utils/Alert';
import { getDailyTimeEntries } from '../../utils/TimeEntryHelper';
import { KkWorspaceScreen } from '../screens/KkWorspaceScreen';

export type KkWorkspaceProps = {
  workspaces: Workspace[];
  currentWorkspaceId: string;
  isGettingWorkspaces: boolean;
  loggedInUser: ClockifyUser | null;
  timeEntries: TimeEntry[];
  dailyEntries: DailyEntry[];
  isGettingEntries: boolean;
  isGettingUser: boolean;
  userUpdatedCurrentWorkspaceId: React.Dispatch<React.SetStateAction<string>>;
  userClickedLogout: () => void;
  userClickedFootnote: () => void;
};

export const KkWorkspaceContainer = (props: KkWorkspaceProps) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState<string>('');
  const [isGettingWorkspaces, setIsGettingWorkspaces] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<ClockifyUser | null>(null);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [dailyEntries, setDailyEntries] = useState<DailyEntry[]>([]);
  const [isGettingEntries, setIsGettingEntries] = useState(false);
  const [isGettingUser, setIsGettingUser] = useState(false);

  const { api, services } = Environment.current();
  const { navigate } = useNavigation();

  const resetToLanding = async () => {
    await services.localStorage.clear();
    navigate(routes.LANDING);
  };

  // populate workspaces on mount
  useEffect(() => {
    (async () => {
      try {
        setIsGettingWorkspaces(true);
        const result = await api.getWorkspaces();
        setIsGettingWorkspaces(false);
        setWorkspaces(result);
      } catch (e) {
        setIsGettingWorkspaces(false);
        resetToLanding();
      }
    })();
  }, []);

  // get logged in user on mount
  useEffect(() => {
    (async () => {
      try {
        setIsGettingUser(true);
        const user = await api.getCurrentUser();
        setIsGettingUser(false);
        setLoggedInUser(user);
        setCurrentWorkspaceId(user.defaultWorkspace);
      } catch (e) {
        setIsGettingUser(false);
        resetToLanding();
      }
    })();
  }, []);

  // listens to changes in currentWorkspaceId
  // and fetches time entries
  useEffect(() => {
    if (currentWorkspaceId && loggedInUser?.id) {
      (async () => {
        try {
          setIsGettingEntries(true);
          const timeEntries = await api.getTimeEntries(
            currentWorkspaceId,
            loggedInUser?.id
          );
          setIsGettingEntries(false);
          setTimeEntries(timeEntries);

          const entriesByDay = getDailyTimeEntries(timeEntries);
          setDailyEntries(entriesByDay);
        } catch (e) {
          setIsGettingEntries(false);
          kkAlert(e.message);
        }
      })();
    }
  }, [currentWorkspaceId, loggedInUser?.id]);

  return (
    <KkWorspaceScreen
      workspaces={workspaces}
      currentWorkspaceId={currentWorkspaceId}
      loggedInUser={loggedInUser}
      timeEntries={timeEntries}
      dailyEntries={dailyEntries}
      isGettingWorkspaces={isGettingWorkspaces}
      isGettingEntries={isGettingEntries}
      isGettingUser={isGettingUser}
      userUpdatedCurrentWorkspaceId={setCurrentWorkspaceId}
      userClickedLogout={resetToLanding}
      userClickedFootnote={() => {
        Linking.openURL('https://github.com/ronnaf');
      }}
    />
  );
};
