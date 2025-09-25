
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/commonStyles';

const AttendanceLegend: React.FC = () => {
  const legendItems = [
    { label: 'Present', color: colors.present, bgColor: colors.presentLight, symbol: 'P' },
    { label: 'Absent', color: colors.absent, bgColor: colors.absentLight, symbol: 'A' },
    { label: 'Late', color: colors.late, bgColor: colors.lateLight, symbol: 'L' },
    { label: 'Excused', color: colors.excused, bgColor: colors.excusedLight, symbol: 'E' },
    { label: 'Pending', color: colors.pending, bgColor: colors.pendingLight, symbol: '?' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance Legend</Text>
      <View style={styles.legendContainer}>
        {legendItems.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View
              style={[
                styles.legendSymbol,
                {
                  backgroundColor: item.bgColor,
                  borderColor: item.color,
                },
              ]}
            >
              <Text style={[styles.symbolText, { color: item.color }]}>
                {item.symbol}
              </Text>
            </View>
            <Text style={styles.legendLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundAlt,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  legendItem: {
    alignItems: 'center',
    marginVertical: 4,
    minWidth: 60,
  },
  legendSymbol: {
    width: 32,
    height: 32,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  symbolText: {
    fontSize: 12,
    fontWeight: '800',
  },
  legendLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default AttendanceLegend;
