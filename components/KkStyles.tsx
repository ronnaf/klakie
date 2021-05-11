import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

type FontOptions = {
  bold?: boolean;
  size?: number;
  color?: string;
};

type Fonts = {
  h1: (options?: FontOptions) => TextStyle;
  h2: (options?: FontOptions) => TextStyle;
  h3: (options?: FontOptions) => TextStyle;
  h4: (options?: FontOptions) => TextStyle;
  h5: (options?: FontOptions) => TextStyle;
  h6: (options?: FontOptions) => TextStyle;
  subtitle1: (options?: FontOptions) => TextStyle;
  subtitle2: (options?: FontOptions) => TextStyle;
  body1: (options?: FontOptions) => TextStyle;
  body2: (options?: FontOptions) => TextStyle;
  button: (options?: FontOptions) => TextStyle;
  caption: (options?: FontOptions) => TextStyle;
  overline: (options?: FontOptions) => TextStyle;
};

// If you want to see it visually:
// https://material.io/design/typography/the-type-system.html#type-scale
export const fonts: Fonts = {
  h1: (options) => ({
    fontWeight: options?.bold ? 'bold' : '300',
    fontSize: 96,
    letterSpacing: -1.5,
  }),
  h2: (options) => ({
    fontSize: 60,
    fontWeight: options?.bold ? 'bold' : '300',
    letterSpacing: -0.5,
  }),
  h3: (options) => ({
    fontSize: 48,
    fontWeight: options?.bold ? 'bold' : '400',
  }),
  h4: (options) => ({
    fontSize: 34,
    fontWeight: options?.bold ? 'bold' : '400',
    letterSpacing: 0.25,
  }),
  h5: (options) => ({
    fontSize: 24,
    fontWeight: options?.bold ? 'bold' : '400',
  }),
  h6: (options) => ({
    fontSize: 20,
    fontWeight: options?.bold ? 'bold' : '500',
    letterSpacing: 1.5,
    color: colors.turquoiseBlue,
    textTransform: 'lowercase',
  }),
  subtitle1: (options) => ({
    fontSize: 16,
    fontWeight: options?.bold ? 'bold' : '400',
    letterSpacing: 0.15,
  }),
  subtitle2: (options) => ({
    fontSize: 14,
    fontWeight: options?.bold ? 'bold' : '500',
    letterSpacing: 0.1,
    color: options?.color || colors.blumine,
  }),
  body1: (options) => ({
    fontSize: 16,
    fontWeight: options?.bold ? 'bold' : '400',
    letterSpacing: 0.5,
    color: colors.oysterBay,
    textTransform: 'lowercase',
  }),
  body2: (options) => ({
    fontSize: 14,
    fontWeight: options?.bold ? 'bold' : '400',
    letterSpacing: 0.25,
    color: colors.turquoiseBlue,
    textTransform: 'lowercase',
  }),
  button: (options) => ({
    fontSize: 14,
    fontWeight: options?.bold ? 'bold' : '400',
    letterSpacing: 1.25,
    color: colors.blumine,
    textTransform: 'lowercase',
  }),
  caption: (options) => ({
    fontSize: 12,
    fontWeight: options?.bold ? 'bold' : '400',
    letterSpacing: 0.4,
  }),
  overline: (options) => ({
    fontSize: 10,
    fontWeight: options?.bold ? 'bold' : '400',
    letterSpacing: 1.5,
  }),
};

export const colors = {
  blackRock: '#01012A',
  blumine: '#005679',
  turquoiseBlue: '#05D8E8',
  oysterBay: '#D1F9FF',
  radicalRed: '#FF296D',
};
