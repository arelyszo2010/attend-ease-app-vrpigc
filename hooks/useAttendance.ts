
import { useState, useEffect } from 'react';
import { Staff, AttendanceRecord, AttendanceStatus } from '../types/attendance';
import { formatDate } from '../utils/dateUtils';

export const useAttendance = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  // Load data from AsyncStorage or initialize empty arrays
  useEffect(() => {
    // For now, we'll use in-memory storage
    // In a real app, you'd load from AsyncStorage or a database
    console.log('Attendance hook initialized');
  }, []);

  const addStaff = (name: string): Staff => {
    const newStaff: Staff = {
      id: Date.now().toString(),
      name: name.trim(),
      createdAt: new Date(),
    };
    
    setStaff(prev => [...prev, newStaff]);
    console.log('Added staff member:', newStaff.name);
    return newStaff;
  };

  const removeStaff = (staffId: string) => {
    setStaff(prev => prev.filter(s => s.id !== staffId));
    setAttendanceRecords(prev => prev.filter(r => r.staffId !== staffId));
    console.log('Removed staff member and their attendance records:', staffId);
  };

  const updateAttendance = (staffId: string, date: Date, status: AttendanceStatus) => {
    const dateStr = formatDate(date);
    const existingRecord = attendanceRecords.find(
      r => r.staffId === staffId && r.date === dateStr
    );

    if (existingRecord) {
      setAttendanceRecords(prev =>
        prev.map(r =>
          r.id === existingRecord.id
            ? { ...r, status, updatedAt: new Date() }
            : r
        )
      );
    } else {
      const newRecord: AttendanceRecord = {
        id: Date.now().toString(),
        staffId,
        date: dateStr,
        status,
        updatedAt: new Date(),
      };
      setAttendanceRecords(prev => [...prev, newRecord]);
    }
    
    console.log('Updated attendance:', { staffId, date: dateStr, status });
  };

  const getAttendanceStatus = (staffId: string, date: Date): AttendanceStatus => {
    const dateStr = formatDate(date);
    const record = attendanceRecords.find(
      r => r.staffId === staffId && r.date === dateStr
    );
    return record?.status || 'pending';
  };

  const cycleAttendanceStatus = (staffId: string, date: Date) => {
    const currentStatus = getAttendanceStatus(staffId, date);
    const statusCycle: AttendanceStatus[] = ['pending', 'present', 'absent', 'late', 'excused'];
    const currentIndex = statusCycle.indexOf(currentStatus);
    const nextStatus = statusCycle[(currentIndex + 1) % statusCycle.length];
    
    updateAttendance(staffId, date, nextStatus);
  };

  return {
    staff,
    attendanceRecords,
    addStaff,
    removeStaff,
    updateAttendance,
    getAttendanceStatus,
    cycleAttendanceStatus,
  };
};
