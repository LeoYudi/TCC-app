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
    backgroundColor: 'white',
    height: 150,
    width: 250,
    borderRadius: 5,
    transform: [
      { translateX: -125 },
      { translateY: -100 },
    ],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },

  buttonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-around',
  },

  yesButton: {
    backgroundColor: '#F9AA33',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 2,
  },

  noButton: {
    backgroundColor: '#232F34',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 2,
  },

  yesText: {
    color: '#232F34',
    fontWeight: 'bold'
  },

  noText: {
    color: '#F9AA33',
    fontWeight: 'bold'
  }

});