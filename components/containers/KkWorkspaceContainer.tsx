import React, { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { Environment } from '../../KkEnvironment';
import { KkWorspaceScreen } from '../screens/KkWorspaceScreen';
import { Workspace } from '../../api/models/Workspace';
import { useNavigation } from '@react-navigation/core';
import { routes } from '../../navigation/KkLinking';
import { storageKeys } from '../../services/KkLocalStorageService';
import { ClockifyUser } from '../../api/models/ClockifyUser';
import { TimeEntry } from '../../api/models/TimeEntry';
import { kkAlert } from '../../utils/Alert';
import dayjs from 'dayjs';

export type KkWorkspaceProps = {
  workspaces: Workspace[];
  currentWorkspaceId: string;
  isGettingWorkspaces: boolean;
  loggedInUser: ClockifyUser | null;
  timeEntries: TimeEntry[];
  dailyEntries: DailyEntry[];
  userUpdatedCurrentWorkspaceId: React.Dispatch<React.SetStateAction<string>>;
};

type DailyEntry = {
  dateStarted: string;
  timeEntries: TimeEntry[];
};

export const KkWorkspaceContainer = (props: KkWorkspaceProps) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState<string>('');
  const [isGettingWorkspaces, setIsGettingWorkspaces] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<ClockifyUser | null>(null);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [dailyEntries, setDailyEntries] = useState<DailyEntry[]>([]);

  const { api, services } = Environment.current();
  const { navigate } = useNavigation();

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
        kkAlert(e.message);
      }
    })();
  }, []);

  // get logged in user on mount
  useEffect(() => {
    (async () => {
      try {
        const user = await api.getCurrentUser();
        setLoggedInUser(user);
        setCurrentWorkspaceId(user.defaultWorkspace);
      } catch (e) {
        kkAlert(e.message);
      }
    })();
  }, []);

  // listens to changes in currentWorkspaceId
  // and fetches time entries
  useEffect(() => {
    if (currentWorkspaceId && loggedInUser?.id) {
      (async () => {
        try {
          const timeEntries = await api.getTimeEntries(
            currentWorkspaceId,
            loggedInUser?.id
          );

          setTimeEntries(timeEntries);

          // { [date]: {...timeEntry} }
          const timeEntriesByDateLib: { [key: string]: TimeEntry[] } = {};
          timeEntries.forEach((entry) => {
            const format = 'dddd // MMMM, DD';
            const dateStarted = dayjs(entry.timeInterval.start).format(format);
            if (!timeEntriesByDateLib[dateStarted]) {
              timeEntriesByDateLib[dateStarted] = [];
            }
            timeEntriesByDateLib[dateStarted].push(entry);
          });

          // [{ dateStarted: 'dddd - MMM, DD', timeEntry }]
          const entriesByDay: DailyEntry[] = Object.entries(
            timeEntriesByDateLib
          ).map(([dateStarted, timeEntries]) => ({
            dateStarted,
            timeEntries,
          }));

          setDailyEntries(entriesByDay);
        } catch (e) {
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
      userUpdatedCurrentWorkspaceId={setCurrentWorkspaceId}
    />
  );
};
