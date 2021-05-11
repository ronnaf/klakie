import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { KkLandingProps } from '../containers/KkLandingContainer';
import { KkSizedBox } from '../KkSizedBox';
import { colors, fonts } from '../KkStyles';

export const KkLandingScreen = (props: KkLandingProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={fonts.h6({ bold: true })}>Welcome to Klakie!</Text>
      </View>
      <View style={styles.container}>
        <Text style={fonts.body1()}>Enter your Clockify API Key</Text>
        <KkSizedBox height={24} />
        <TextInput
          style={styles.input}
          value={props.formState.apiKey}
          onSubmitEditing={props.userSubmittedForm}
          onChangeText={(text) =>
            props.userUpdatedForm((prevState) => ({
              ...prevState,
              apiKey: text,
            }))
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blackRock,
  },
  input: {
    ...fonts.body1(),
    color: 'white',
    border: `1px solid ${colors.oysterBay}`,
    padding: 8,
  },
});
