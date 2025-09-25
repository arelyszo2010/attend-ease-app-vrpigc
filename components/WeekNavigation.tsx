
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/commonStyles';
import { formatWeekRange } from '../utils/dateUtils';
import Icon from './Icon';

interface WeekNavigationProps {
  startDate: Date;
  endDate: Date;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
}

const WeekNavigation: React.FC<WeekNavigationProps> = ({
  startDate,
  endDate,
  onPreviousWeek,
  onNextWeek,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={onPreviousWeek}
        activeOpacity={0.7}
      >
        <Icon name="chevron-back" size={20} color={colors.primary} />
        <Text style={styles.navButtonText}>Previous</Text>
      </TouchableOpacity>
      
      <View style={styles.weekInfo}>
        <Text style={styles.weekText}>Week of</Text>
        <Text style={styles.dateRange}>{formatWeekRange(startDate, endDate)}</Text>
      </View>
      
      <TouchableOpacity
        style={styles.navButton}
        onPress={onNextWeek}
        activeOpacity={0.7}
      >
        <Text style={styles.navButtonText}>Next</Text>
        <Icon name="chevron-forward" size={20} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.backgroundAlt,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.background,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginHorizontal: 4,
  },
  weekInfo: {
    alignItems: 'center',
  },
  weekText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  dateRange: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginTop: 2,
  },
});

export default WeekNavigation;
