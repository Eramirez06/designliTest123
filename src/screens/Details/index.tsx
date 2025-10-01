import React, {useMemo} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {BarChart} from 'react-native-gifted-charts';
import {styles} from './styles';
import {RootState} from '../../store/store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;

const DetailScreen: React.FC<DetailScreenProps> = ({route}) => {
  const {name, price, icon, color, percentageChange} = route.params;
  const {data} = useSelector((state: RootState) => state.crypto);

  // Prepare data for the chart - all cryptos with their current prices
  const chartData = useMemo(() => {
    return Object.values(data).map(crypto => ({
      value: parseFloat(crypto.price),
      label: crypto.name,
      frontColor: crypto.color,
      labelTextStyle: {
        fontSize: 10,
        fontWeight: '600' as const,
      },
    }));
  }, [data]);

  const changeValue = parseFloat(percentageChange || '0');
  const isPositive = changeValue >= 0;
  const changeColor = isPositive ? '#4CAF50' : '#F44336';

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={[styles.header, {backgroundColor: color}]}>
        <Image source={{uri: icon}} style={styles.icon} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>
          Current Price: ${parseFloat(price).toFixed(2)}
        </Text>
        <Text style={[styles.percentage, {color: changeColor}]}>
          {isPositive ? '+' : ''}
          {changeValue.toFixed(2)}%
        </Text>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>All Cryptos Value Comparison</Text>
        <Text style={styles.chartSubtitle}>Current prices in USD</Text>

        <BarChart
          data={chartData}
          barWidth={45}
          spacing={15}
          roundedTop
          roundedBottom
          hideRules
          xAxisThickness={1}
          xAxisColor="#E0E0E0"
          yAxisThickness={0}
          yAxisTextStyle={{color: '#666', fontSize: 11}}
          noOfSections={4}
          maxValue={Math.max(...chartData.map(d => d.value)) * 1.2}
          height={280}
          isAnimated
          animationDuration={800}
          showValuesAsTopLabel
          topLabelTextStyle={{
            fontSize: 11,
            fontWeight: '700' as const,
            color: '#333',
          }}
          barBorderRadius={6}
          barBorderWidth={2}
          barBorderColor="white"
          backgroundColor="transparent"
          disableScroll={false}
          initialSpacing={10}
          endSpacing={10}
          labelWidth={50}
          xAxisLabelTextStyle={{
            color: '#666',
            fontSize: 11,
            fontWeight: '600' as const,
            textAlign: 'center' as const,
          }}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Crypto Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Symbol:</Text>
          <Text style={styles.infoValue}>{name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Current Price:</Text>
          <Text style={styles.infoValue}>${parseFloat(price).toFixed(2)}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Change:</Text>
          <Text style={[styles.infoValue, {color: changeColor}]}>
            {isPositive ? '+' : ''}
            {changeValue.toFixed(2)}%
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
export default DetailScreen;
