
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AttendanceStatus } from '../types/attendance';
import { colors } from '../styles/commonStyles';

interface AttendanceButtonProps {
  status: AttendanceStatus;
  onPress: () => void;
  day: string;
  date: number;
}

const AttendanceButton: React.FC<AttendanceButtonProps> = ({
  status,
  onPress,
  day,
  date,
}) => {
  const getStatusConfig = (status: AttendanceStatus) => {
    switch (status) {
      case 'present':
        return {
          backgroundColor: colors.presentLight,
          borderColor: colors.present,
          textColor: colors.present,
          label: 'P',
        };
      case 'absent':
        return {
          backgroundColor: colors.absentLight,
          borderColor: colors.absent,
          textColor: colors.absent,
          label: 'A',
        };
      case 'late':
        return {
          backgroundColor: colors.lateLight,
          borderColor: colors.late,
          textColor: colors.late,
          label: 'L',
        };
      case 'excused':
        return {
          backgroundColor: colors.excusedLight,
          borderColor: colors.excused,
          textColor: colors.excused,
          label: 'E',
        };
      default: // pending
        return {
          backgroundColor: colors.pendingLight,
          borderColor: colors.border,
          textColor: colors.textSecondary,
          label: '?',
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: config.backgroundColor,
          borderColor: config.borderColor,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.day, { color: config.textColor }]}>{day}</Text>
      <Text style={[styles.date, { color: config.textColor }]}>{date}</Text>
      <Text style={[styles.status, { color: config.textColor }]}>{config.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 60,
    borderRadius: 8,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  day: {
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },
  status: {
    fontSize: 10,
    fontWeight: '800',
  },
});

export default AttendanceButton;
