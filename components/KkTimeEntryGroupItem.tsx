import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GroupEntry } from '../api/models/TimeEntry';
import { fonts } from './KkStyles';

type Props = {
  groupedEntry: GroupEntry;
};

export const KkTimeEntryGroupItem = (props: Props) => {
  return (
    <View style={styles.timeEntry}>
      <View style={styles.timeEntryLeft}>
        <Text style={fonts.body2({ bold: true })}>
          {props.groupedEntry.description}
        </Text>
      </View>
      <View style={styles.timeEntryRight}>
        <Text style={fonts.body2()}>
          {props.groupedEntry.totalDescHours.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeEntry: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid rgba(255,255,255,0.10)',
    padding: 10,
    marginBottom: 8,
  },
  timeEntryLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeEntryRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
