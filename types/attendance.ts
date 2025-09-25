
export interface Staff {
  id: string;
  name: string;
  createdAt: Date;
}

export type AttendanceStatus = 'pending' | 'present' | 'absent' | 'late' | 'excused';

export interface AttendanceRecord {
  id: string;
  staffId: string;
  date: string; // YYYY-MM-DD format
  status: AttendanceStatus;
  updatedAt: Date;
}

export interface WeekData {
  startDate: Date;
  endDate: Date;
  days: Date[];
}
