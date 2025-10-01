import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  item: {
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    padding: 20,
    marginBottom: 10,
    minHeight: 110,
    backgroundColor: 'white',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  percentage: {
    fontSize: 14,
    fontWeight: '500',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 15,
  },
  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
});
