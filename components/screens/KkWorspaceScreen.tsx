import { Picker } from '@react-native-picker/picker';
import dayjs from 'dayjs';
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KkWorkspaceProps } from '../containers/KkWorkspaceContainer';
import { KkSizedBox } from '../KkSizedBox';
import { fonts } from '../KkStyles';
import { Text, View } from '../Themed';

export const KkWorspaceScreen = (props: KkWorkspaceProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
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
          <View style={styles.rightHeader}>
            <Text>{props.loggedInUser?.name}'s Clockify</Text>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={props.userClickedLogout}>
              <Text>Log out</Text>
            </TouchableOpacity>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  innerContainer: {
    width: 768,
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
  rightHeader: {
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
  logoutButton: {
    marginLeft: 16,
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
});
