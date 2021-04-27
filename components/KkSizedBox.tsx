import React from 'react';
import { View } from './Themed';

type Props = {
  height?: number;
  width?: number;
};

export const KkSizedBox = (props: Props) => {
  return <View style={{ height: props.height, width: props.width }} />;
};
