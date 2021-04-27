export type ClockifyUser = {
  id: string;
  email: string;
  name: string;
  // memberships: []
  profilePicture: string;
  activeWorkspace: string;
  defaultWorkspace: string;
  settings: {
    weekStart: string;
    timeZone: string;
    timeFormat: string;
    dateFormat: string;
    sendNewsletter: boolean;
    weeklyUpdates: boolean;
    longRunning: boolean;
    timeTrackingManual: boolean;
    summaryReportSettings: {
      group: string;
      subgroup: string;
    };
    isCompactViewOn: boolean;
    dashboardSelection: string;
    dashboardViewType: string;
    dashboardPinToTop: boolean;
    projectListCollapse: number;
    collapseAllProjectLists: boolean;
    groupSimilarEntriesDisabled: boolean;
    myStartOfDay: string;
    projectPickerTaskFilter: boolean;
  };
  status: string;
};
