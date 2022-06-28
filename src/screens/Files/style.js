import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  listContainer: {
    display: 'flex',
    height: '100%',
    backgroundColor: '#344955',
  },

  scrollView: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#4A6572',
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },

  itemText: {
    color: '#fff',
    fontSize: 20
  }

});