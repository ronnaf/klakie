export type TimeEntry = {
  id: string;
  description: string;
  tagIds: string[] | null;
  userId: string;
  billable: boolean;
  taskId: string | null;
  projectId: string | null;
  timeInterval: {
    start: string;
    end: string | null;
    duration: string | null;
  };
  workspaceId: string;
  isLocked: boolean;
};
