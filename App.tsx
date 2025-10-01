import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import HomeScreen from './src/screens/Home';
import DetailScreen from './src/screens/Details';
import AddAlertScreen from './src/screens/AddAlert/index';
import HeaderButton from './src/components/HeaderButton';

export type RootStackParamList = {
  Home: undefined;
  Detail: {
    name: string;
    price: string;
    icon: string;
    color: string;
    percentageChange?: string;
  };
  AddAlert: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            options={({navigation}) => ({
              title: 'Crypto Tracker',
              headerRight: () => (
                <HeaderButton
                  onPress={() => navigation.navigate('AddAlert')}
                  title="+ Alert"
                />
              ),
            })}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen
            options={{title: 'Add Price Alert'}}
            name="AddAlert"
            component={AddAlertScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
