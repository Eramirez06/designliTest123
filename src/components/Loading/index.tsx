import React from 'react';
import {ActivityIndicator} from 'react-native';

const Loading: React.FC = () => {
  return <ActivityIndicator style={{marginTop: 50}} size="large" />;
};

export default Loading;
