import { useNavigation } from '@react-navigation/core';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { ClockifyUser } from '../../api/models/ClockifyUser';
import { TimeEntry } from '../../api/models/TimeEntry';
import { Workspace } from '../../api/models/Workspace';
import { Environment } from '../../KkEnvironment';
import { routes } from '../../navigation/KkLinking';
import { kkAlert } from '../../utils/Alert';
import { KkWorspaceScreen } from '../screens/KkWorspaceScreen';

export type KkWorkspaceProps = {
  workspaces: Workspace[];
  currentWorkspaceId: string;
  isGettingWorkspaces: boolean;
  loggedInUser: ClockifyUser | null;
  timeEntries: TimeEntry[];
  dailyEntries: DailyEntry[];
  userUpdatedCurrentWorkspaceId: React.Dispatch<React.SetStateAction<string>>;
  userClickedLogout: () => void;
};

type DailyEntry = {
  dateStarted: string;
  totalDayHours: number;
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

          // [{ dateStarted: 'dddd - MMM, DD', timeEntry, totalDayHours }]
          const entriesByDay: DailyEntry[] = Object.entries(
            timeEntriesByDateLib
          ).map(([dateStarted, timeEntries]) => {
            const totalDayHours = timeEntries.reduce((acc, cur) => {
              if (cur.timeInterval.end) {
                const start = dayjs(cur.timeInterval.start);
                const end = dayjs(cur.timeInterval.end);
                const duration = end.diff(start, 'hour', true);
                return acc + duration;
              }
              return acc;
            }, 0);

            return {
              dateStarted,
              timeEntries,
              totalDayHours,
            };
          });

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
      userClickedLogout={async () => {
        await services.localStorage.clear();
        navigate(routes.LANDING);
      }}
    />
  );
};
