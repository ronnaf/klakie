import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KkWorkspaceProps } from '../containers/KkWorkspaceContainer';
import { KkSizedBox } from '../KkSizedBox';
import { colors, fonts } from '../KkStyles';
import { KkTimeEntryGroup } from '../KkTimeEntryGroup';

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
              {props.workspaces?.map((workspace) => (
                <Picker.Item
                  key={workspace.id}
                  label={workspace.name}
                  value={workspace.id}
                />
              ))}
            </Picker>
            {(props.isGettingWorkspaces ||
              props.isGettingEntries ||
              props.isGettingUser) && (
              <>
                <KkSizedBox width={20} />
                <ActivityIndicator />
              </>
            )}
          </View>
          <View style={styles.rightHeader}>
            <Text style={fonts.body2()}>
              {props.loggedInUser?.name}'s Clockify
            </Text>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={props.userClickedLogout}>
              <Text style={fonts.button()}>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
        <KkSizedBox height={30} />
        <View>
          {props.dailyEntries.map((dailyEntry) => {
            return (
              <KkTimeEntryGroup
                key={dailyEntry.dateStarted}
                dailyEntry={dailyEntry}
              />
            );
          })}
        </View>
        <View>
          <TouchableOpacity onPress={props.userClickedFootnote}>
            <Text>ronnaf (c) 2021 | Github</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors.blackRock,
    minHeight: '100vh',
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
    ...fonts.body1({ bold: true }),
    padding: 8,
    backgroundColor: colors.blackRock,
    borderColor: colors.radicalRed,
    color: colors.turquoiseBlue,
  },
  logoutButton: {
    marginLeft: 16,
    padding: 8,
    backgroundColor: colors.turquoiseBlue,
  },
});
