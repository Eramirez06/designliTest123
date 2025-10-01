import React from 'react';
import {Text} from 'react-native';

interface ErrorProps {
  error: string;
}

const Error: React.FC<ErrorProps> = ({error}) => {
  return <Text style={{color: 'red', textAlign: 'center'}}>{error}</Text>;
};

export default Error;
