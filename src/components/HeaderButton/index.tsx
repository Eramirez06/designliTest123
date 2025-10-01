import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface HeaderButtonProps {
  onPress: () => void;
  title: string;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({onPress, title}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default HeaderButton;
