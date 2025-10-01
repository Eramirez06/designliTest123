import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import {addAlert, removeAlert} from '../../store/alerts';
import {styles} from './styles';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {RootState} from '../../store/store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

type AddAlertScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AddAlert'
>;

const AddAlertScreen: React.FC<AddAlertScreenProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const cryptoData = useSelector((state: RootState) => state.crypto.data);
  const alerts = useSelector((state: RootState) => state.alerts.alerts);

  const cryptoList = Object.values(cryptoData);

  const [selectedCrypto, setSelectedCrypto] = useState<string>('');
  const [targetPrice, setTargetPrice] = useState<string>('');
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [tempSelectedCrypto, setTempSelectedCrypto] = useState<string>('');

  // Initialize selectedCrypto when cryptoList is available
  useEffect(() => {
    if (cryptoList.length > 0 && !selectedCrypto) {
      setSelectedCrypto(cryptoList[0].id);
      setTempSelectedCrypto(cryptoList[0].id);
    }
  }, [cryptoList, selectedCrypto]);

  const handleAddAlert = () => {
    if (!selectedCrypto) {
      Alert.alert('Error', 'Please select a cryptocurrency');
      return;
    }

    if (!targetPrice || parseFloat(targetPrice) <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    const selectedCryptoData = cryptoData[selectedCrypto];

    if (!selectedCryptoData) {
      Alert.alert('Error', 'Selected cryptocurrency not found');
      return;
    }

    ReactNativeHapticFeedback.trigger('impactMedium');

    dispatch(
      addAlert({
        symbol: selectedCrypto,
        cryptoName: selectedCryptoData.name,
        targetPrice: parseFloat(targetPrice),
      }),
    );

    Alert.alert(
      'Success',
      `Alert created for ${selectedCryptoData.name} at $${targetPrice}`,
      [
        {
          text: 'OK',
          onPress: () => {
            setTargetPrice('');
            navigation.goBack();
          },
        },
      ],
    );
  };

  if (cryptoList.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Loading...</Text>
          <Text style={styles.subtitle}>
            Please wait while we load cryptocurrency data
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create Price Alert</Text>
        <Text style={styles.subtitle}>
          Get notified when your crypto reaches the target price
        </Text>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Select Cryptocurrency</Text>
          <TouchableOpacity
            style={styles.pickerInput}
            onPress={() => {
              ReactNativeHapticFeedback.trigger('impactLight');
              setTempSelectedCrypto(selectedCrypto);
              setShowPicker(true);
            }}>
            <Text style={styles.pickerInputText}>
              {selectedCrypto && cryptoData[selectedCrypto]
                ? `${cryptoData[selectedCrypto].name} - $${cryptoData[selectedCrypto].price}`
                : 'Select a cryptocurrency'}
            </Text>
            <Text style={styles.pickerInputIcon}>▼</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Target Price (USD)</Text>
          <TextInput
            style={styles.input}
            value={targetPrice}
            onChangeText={setTargetPrice}
            placeholder="Enter target price"
            keyboardType="decimal-pad"
            placeholderTextColor="#999"
          />
          {selectedCrypto && cryptoData[selectedCrypto] && (
            <Text style={styles.currentPriceText}>
              Current price: ${cryptoData[selectedCrypto].price}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddAlert}
          activeOpacity={0.8}>
          <Text style={styles.addButtonText}>Create Alert</Text>
        </TouchableOpacity>
      </View>

      {alerts.length > 0 && (
        <View style={styles.alertsListContainer}>
          <Text style={styles.alertsListTitle}>Active Alerts</Text>
          {alerts.map(alert => {
            const crypto = cryptoData[alert.symbol];
            return (
              <View key={alert.id} style={styles.alertItem}>
                <View style={styles.alertInfo}>
                  <Text style={styles.alertCryptoName}>{alert.cryptoName}</Text>
                  <Text style={styles.alertTargetPrice}>
                    Target: ${alert.targetPrice.toFixed(2)}
                  </Text>
                  {crypto && (
                    <Text style={styles.alertCurrentPrice}>
                      Current: ${crypto.price}
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => {
                    ReactNativeHapticFeedback.trigger('impactLight');
                    Alert.alert(
                      'Delete Alert',
                      `Remove alert for ${alert.cryptoName}?`,
                      [
                        {text: 'Cancel', style: 'cancel'},
                        {
                          text: 'Delete',
                          style: 'destructive',
                          onPress: () => dispatch(removeAlert(alert.id)),
                        },
                      ],
                    );
                  }}>
                  <Text style={styles.deleteButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}

      {/* iOS-style Modal Picker */}
      <Modal
        visible={showPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPicker(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => {
                  ReactNativeHapticFeedback.trigger('impactLight');
                  setShowPicker(false);
                }}>
                <Text style={styles.modalCancelButton}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Select Crypto</Text>
              <TouchableOpacity
                onPress={() => {
                  ReactNativeHapticFeedback.trigger('impactMedium');
                  setSelectedCrypto(tempSelectedCrypto);
                  // Auto-populate with current price
                  if (cryptoData[tempSelectedCrypto]) {
                    setTargetPrice(cryptoData[tempSelectedCrypto].price);
                  }
                  setShowPicker(false);
                }}>
                <Text style={styles.modalDoneButton}>Done</Text>
              </TouchableOpacity>
            </View>
            <Picker
              selectedValue={tempSelectedCrypto}
              onValueChange={itemValue =>
                setTempSelectedCrypto(itemValue as string)
              }
              style={styles.modalPicker}
              itemStyle={styles.modalPickerItem}>
              {cryptoList.map(crypto => (
                <Picker.Item
                  key={crypto.id}
                  label={`${crypto.name} - $${crypto.price}`}
                  value={crypto.id}
                />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default AddAlertScreen;
