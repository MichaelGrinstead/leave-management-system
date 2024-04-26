export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface LeaveRequestClient {
  id: number;
  userId?: string;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status?: string;
}

export interface LeaveRequestServer {
  created_at: string;
  end_date: string;
  id: number;
  reason: string;
  start_date: string;
  status: string;
  type: string;
  updated_at: string;
  user_id: number;
}

export interface LeaveRequestUpdate {
  userId?: string | null | undefined;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
}
