import React from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { KkSizedBox } from '../KkSizedBox';
import { fonts } from '../KkStyles';
import { Text, View } from '../Themed';
import { KkLandingProps } from '../containers/KkLandingContainer';

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
  },
  input: {
    ...fonts.body1(),
    color: 'white',
    border: '1px solid white',
    padding: 8,
  },
});
