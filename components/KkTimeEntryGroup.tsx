import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DailyEntry } from '../api/models/TimeEntry';
import { colors, fonts } from './KkStyles';
import { KkTimeEntryGroupItem } from './KkTimeEntryGroupItem';

type Props = {
  dailyEntry: DailyEntry;
};

export const KkTimeEntryGroup = (props: Props) => {
  return (
    <View style={styles.dailyEntry}>
      <View style={styles.header}>
        <Text
          style={fonts.subtitle2({
            color: 'rgba(255,255,255,0.5)',
          })}>
          {props.dailyEntry.dateStarted}
        </Text>
        <Text
          style={fonts.subtitle2({
            bold: true,
          })}>
          {props.dailyEntry.totalDayHours.toFixed(2)}
        </Text>
      </View>
      <View style={styles.timeEntries}>
        {props.dailyEntry.groupedTimeEntries.map((groupedEntry) => (
          <KkTimeEntryGroupItem
            key={groupedEntry.id}
            groupedEntry={groupedEntry}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dailyEntry: {
    marginBottom: 16,
    border: '1px solid ' + colors.blumine,
    padding: 16,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeEntries: {
    marginTop: 10,
  },
});
