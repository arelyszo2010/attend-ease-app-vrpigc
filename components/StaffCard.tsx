
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Staff, AttendanceStatus } from '../types/attendance';
import { colors, commonStyles } from '../styles/commonStyles';
import AttendanceButton from './AttendanceButton';
import Icon from './Icon';
import { getDayName } from '../utils/dateUtils';

interface StaffCardProps {
  staff: Staff;
  weekDays: Date[];
  getAttendanceStatus: (staffId: string, date: Date) => AttendanceStatus;
  onAttendancePress: (staffId: string, date: Date) => void;
  onDeletePress: (staffId: string) => void;
}

const StaffCard: React.FC<StaffCardProps> = ({
  staff,
  weekDays,
  getAttendanceStatus,
  onAttendancePress,
  onDeletePress,
}) => {
  return (
    <View style={[commonStyles.card, styles.card]}>
      <View style={styles.header}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{staff.name}</Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDeletePress(staff.id)}
          activeOpacity={0.7}
        >
          <Icon name="trash-outline" size={20} color={colors.absent} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.attendanceContainer}
        contentContainerStyle={styles.attendanceContent}
      >
        {weekDays.map((date, index) => (
          <AttendanceButton
            key={index}
            status={getAttendanceStatus(staff.id, date)}
            onPress={() => onAttendancePress(staff.id, date)}
            day={getDayName(date)}
            date={date.getDate()}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.absentLight,
  },
  attendanceContainer: {
    marginTop: 8,
  },
  attendanceContent: {
    paddingHorizontal: 4,
  },
});

export default StaffCard;
