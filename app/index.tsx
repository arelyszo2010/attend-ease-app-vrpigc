
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import { useAttendance } from '../hooks/useAttendance';
import { getCurrentWeek, getWeekOffset } from '../utils/dateUtils';
import StaffCard from '../components/StaffCard';
import AddStaffModal from '../components/AddStaffModal';
import WeekNavigation from '../components/WeekNavigation';
import AttendanceLegend from '../components/AttendanceLegend';
import Icon from '../components/Icon';

export default function AttendanceScreen() {
  const {
    staff,
    addStaff,
    removeStaff,
    getAttendanceStatus,
    cycleAttendanceStatus,
  } = useAttendance();

  const [weekOffset, setWeekOffset] = useState(0);
  const [isAddStaffModalVisible, setIsAddStaffModalVisible] = useState(false);

  const currentWeek = getWeekOffset(weekOffset);

  const handleAddStaff = (name: string) => {
    addStaff(name);
    console.log('Staff added:', name);
  };

  const handleDeleteStaff = (staffId: string) => {
    const staffMember = staff.find(s => s.id === staffId);
    if (!staffMember) return;

    Alert.alert(
      'Delete Staff Member',
      `Are you sure you want to delete ${staffMember.name}? This will also remove all their attendance records.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            removeStaff(staffId);
            console.log('Staff deleted:', staffMember.name);
          },
        },
      ]
    );
  };

  const handleAttendancePress = (staffId: string, date: Date) => {
    cycleAttendanceStatus(staffId, date);
  };

  const handlePreviousWeek = () => {
    setWeekOffset(prev => prev - 1);
  };

  const handleNextWeek = () => {
    setWeekOffset(prev => prev + 1);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.header}>
        <Text style={commonStyles.headerTitle}>Staff Attendance</Text>
      </View>

      <WeekNavigation
        startDate={currentWeek.startDate}
        endDate={currentWeek.endDate}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {staff.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="people-outline" size={64} color={colors.textSecondary} />
            <Text style={styles.emptyTitle}>No Staff Members</Text>
            <Text style={styles.emptyText}>
              Add your first staff member to start tracking attendance
            </Text>
          </View>
        ) : (
          staff.map((staffMember) => (
            <StaffCard
              key={staffMember.id}
              staff={staffMember}
              weekDays={currentWeek.days}
              getAttendanceStatus={getAttendanceStatus}
              onAttendancePress={handleAttendancePress}
              onDeletePress={handleDeleteStaff}
            />
          ))
        )}

        <AttendanceLegend />
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsAddStaffModalVisible(true)}
          activeOpacity={0.8}
        >
          <Icon name="add" size={24} color={colors.backgroundAlt} />
          <Text style={styles.addButtonText}>Add New Staff</Text>
        </TouchableOpacity>
      </View>

      <AddStaffModal
        isVisible={isAddStaffModalVisible}
        onClose={() => setIsAddStaffModalVisible(false)}
        onAddStaff={handleAddStaff}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: colors.backgroundAlt,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  addButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  addButtonText: {
    color: colors.backgroundAlt,
    fontSize: 16,
    fontWeight: '600',
  },
});
