import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: 150,
    width: 150,
    borderRadius: 5,
    transform: [
      { translateX: -75 },
      { translateY: -100 },
    ],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },

});
