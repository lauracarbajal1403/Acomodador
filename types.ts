
export type Priority = 'URGENTE' | 'ALTA' | 'MEDIA' | 'BAJA';

export interface MemberWorkload {
  name: string;
  totalTasks: number;
  initial: string;
  avatarColor: string;
  breakdown: Record<Priority, number>;
}

export interface OldTaskAlert {
  name: string;
  totalOld: number;
  buckets: {
    '90d': number;
    '60-90d': number;
    '30-60d': number;
  };
}

export interface Task {
  id: number;
  title: string;
  date: string;
  assignee: string;
}

export interface DashboardStats {
  totalTasks: number;
  inProgressPercent: number;
  development: {
    count: number;
    percentage: string;
    assignee: string;
  };
  inProgress: {
    count: number;
    membersCount: number;
    percentage: string;
  };
  reviewBacklog: {
    count: number;
    percentage: string;
  };
}
