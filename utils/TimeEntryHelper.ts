import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { DailyEntry, GroupEntry, TimeEntry } from '../api/models/TimeEntry';

export const copyToClipboard = (time: string) => {
  navigator.clipboard.writeText(time);
  toast.success('Copied!');
};

export const getTotalHours = (timeEntries: TimeEntry[]) => {
  return timeEntries.reduce((acc, cur) => {
    if (cur.timeInterval.end) {
      const start = dayjs(cur.timeInterval.start);
      const end = dayjs(cur.timeInterval.end);
      const duration = end.diff(start, 'hour', true);
      return acc + duration;
    }
    return acc;
  }, 0);
};

/**
 * Generates time entries by day.
 * Calculates total hours of each description, and calculates total hours of each day.
 */
export const getDailyTimeEntries = (timeEntries: TimeEntry[]) => {
  // { [date]: {...timeEntry} }
  const timeEntriesByDateLib: { [key: string]: TimeEntry[] } = {};
  timeEntries.forEach((entry) => {
    const format = 'dddd // MMMM DD, YYYY';
    const dateStarted = dayjs(entry.timeInterval.start).format(format);
    // initialize timeEntriesByDateLib[dateStarted]
    if (!timeEntriesByDateLib[dateStarted]) {
      timeEntriesByDateLib[dateStarted] = [];
    }
    timeEntriesByDateLib[dateStarted].push(entry);
  });

  // [{ dateStarted: 'dddd - MMM, DD', timeEntry, totalDayHours }]
  const entriesByDay: DailyEntry[] = Object.entries(timeEntriesByDateLib).map(
    ([dateStarted, timeEntries]) => {
      // calculate total hours of the day
      const totalDayHours = getTotalHours(timeEntries);

      // { [desc]: {...timeEntry} }
      const timeEntriesByDescLib: { [key: string]: TimeEntry[] } = {};
      timeEntries.forEach((entry) => {
        const desc = entry.description;
        // initialize timeEntriesByDescLib[desc]
        if (!timeEntriesByDescLib[desc]) {
          timeEntriesByDescLib[desc] = [];
        }
        timeEntriesByDescLib[desc].push(entry);
      });

      // [{ desc, timeEntries, totalDescHours }]
      const groupedTimeEntries: GroupEntry[] = Object.entries(
        timeEntriesByDescLib
      ).map(([desc, timeEntries], idx) => {
        // calculate total hours of the same description
        const totalDescHours = getTotalHours(timeEntries);
        const id = `${desc}_${idx}`;
        return {
          id,
          description: desc,
          timeEntries,
          totalDescHours,
        };
      });

      return {
        dateStarted,
        timeEntries,
        totalDayHours,
        groupedTimeEntries,
      };
    }
  );

  return entriesByDay;
};
