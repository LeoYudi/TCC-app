import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#4A6572',
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },

  lastItem: {
    borderBottomWidth: 0,
  },

  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '75%'
  },

  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '25%',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  description: {
    color: '#fff',
    fontSize: 20
  },

  date: {
    color: '#ddd'
  }
});
