import React, {useCallback, useEffect, useState} from 'react';
import {View, FlatList, Button, ListRenderItem} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CURRENCIES} from '../../constants';
import {fetchCryptoData} from '../../services/cryptoData';
import {connectToFeed, disconnectFromFeed} from '../../services/finnhubSocket';
import {CryptoItem} from './components/CryptoItem';
import {styles} from './styles';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import {SafeAreaView} from 'react-native-safe-area-context';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {RootState, AppDispatch} from '../../store/store';
import {CryptoData} from '../../store/crypto';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {navigate} = navigation;
  const dispatch = useDispatch<AppDispatch>();
  const {data, loading, error} = useSelector(
    (state: RootState) => state.crypto,
  );
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    dispatch(fetchCryptoData());
  }, [dispatch]);

  const handleLivePrices = () => {
    ReactNativeHapticFeedback.trigger('impactLight');
    setIsLive(true);
    connectToFeed(CURRENCIES, dispatch);
  };

  const handleStopPrices = () => {
    ReactNativeHapticFeedback.trigger('impactLight');
    setIsLive(false);
    disconnectFromFeed();
  };

  const renderItem: ListRenderItem<CryptoData> = useCallback(
    ({item}) => (
      <CryptoItem
        {...item}
        isLive={isLive}
        onPress={() => navigate('Detail', item)}
      />
    ),
    [navigate, isLive],
  );

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error error={error} />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={Object.values(data)}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.buttonContainer}>
        <Button
          title={`${!isLive ? 'Activate' : 'Stop'} Live Feed`}
          onPress={isLive ? handleStopPrices : handleLivePrices}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
