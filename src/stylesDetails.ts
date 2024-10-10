import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  detailsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  detailsTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  detailBox: {
    width: 120,
    height: 120,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
  },
});

export default styles;
