import { Picker } from '@react-native-picker/picker';
import dayjs from 'dayjs';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { KkWorkspaceProps } from '../containers/KkWorkspaceContainer';
import { KkSizedBox } from '../KkSizedBox';
import { fonts } from '../KkStyles';
import { Text, View } from '../Themed';

export const KkWorspaceScreen = (props: KkWorkspaceProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <Picker
            style={styles.picker}
            selectedValue={props.currentWorkspaceId}
            onValueChange={(value: string) =>
              props.userUpdatedCurrentWorkspaceId(value)
            }>
            {props.workspaces.map((workspace) => (
              <Picker.Item
                key={workspace.id}
                label={workspace.name}
                value={workspace.id}
              />
            ))}
          </Picker>
          {props.isGettingWorkspaces && (
            <>
              <KkSizedBox width={20} />
              <ActivityIndicator />
            </>
          )}
        </View>
        <View>
          <Text>{props.loggedInUser?.name}'s Clockify</Text>
        </View>
      </View>

      <KkSizedBox height={30} />
      <View>
        {props.dailyEntries.map((dailyEntry) => {
          return (
            <View key={dailyEntry.dateStarted} style={styles.dailyEntry}>
              <Text
                style={fonts.subtitle2({
                  color: 'rgba(255,255,255,0.5)',
                })}>
                {dailyEntry.dateStarted}
              </Text>
              <View style={styles.timeEntries}>
                {dailyEntry.timeEntries.map((entry) => (
                  <View key={entry.id} style={styles.timeEntry}>
                    <View style={styles.timeEntryLeft}>
                      <Text style={fonts.body2({ bold: true })}>
                        {entry.description}
                      </Text>
                    </View>
                    <View style={styles.timeEntryRight}></View>
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    ...fonts.body1(),
    padding: 8,
    backgroundColor: 'black',
    color: 'white',
  },
  timeEntries: {
    marginTop: 10,
  },
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
  dailyEntry: {
    marginBottom: 16,
  },
});
