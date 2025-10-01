import React, {useEffect, useRef} from 'react';
import {Text, Image, Pressable, View, Animated} from 'react-native';
import {styles} from './styles';

interface CryptoItemProps {
  name: string;
  price: string;
  icon: string;
  onPress: () => void;
  isLive: boolean;
  percentageChange?: string;
}

export const CryptoItem: React.FC<CryptoItemProps> = ({
  name,
  price,
  icon,
  onPress,
  isLive,
  percentageChange,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const changeValue = parseFloat(percentageChange || '0');
  const isPositive = changeValue >= 0;
  const changeColor = isPositive ? '#4CAF50' : '#F44336';

  useEffect(() => {
    if (isLive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.3,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLive]);

  return (
    <Pressable onPress={onPress} style={styles.item}>
      <View style={styles.container}>
        <Image source={{uri: icon}} style={styles.icon} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={[styles.percentage, {color: changeColor}]}>
            {isPositive ? '+' : ''}
            {changeValue.toFixed(2)}%
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        {isLive && (
          <Animated.View
            style={[
              styles.liveDot,
              {
                transform: [{scale: scaleAnim}],
              },
            ]}
          />
        )}
        <Text style={styles.price}>${parseFloat(price).toFixed(2)}</Text>
      </View>
    </Pressable>
  );
};
