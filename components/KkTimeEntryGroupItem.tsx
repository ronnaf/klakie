import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GroupEntry } from '../api/models/TimeEntry';
import { copyToClipboard } from '../utils/TimeEntryHelper';
import { KkSizedBox } from './KkSizedBox';
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
        <KkSizedBox width={8} />
        <TouchableOpacity
          onPress={() =>
            copyToClipboard(props.groupedEntry.totalDescHours.toFixed(2))
          }>
          <Text style={fonts.button()}>copy</Text>
        </TouchableOpacity>
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
