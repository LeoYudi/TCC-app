import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#344955',
  },

  buttonsContainer: {
    width: '100%',
    padding: 20
  },

  button: {
    marginBottom: 10
  },

  h1: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20
  },

  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    backgroundColor: 'white',
    height: 180,
    width: 300,
    borderRadius: 5,
    transform: [
      { translateX: -150 },
      { translateY: -100 },
    ],
    display: 'flex',
    justifyContent: 'space-between',
    padding: 15
  },

  modalText: {
    textAlign: 'left',
    fontSize: 17,
  },

  modalInput: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 5
  },

  modalInputFocus: {
    borderColor: '#F9AA33'
  },

  modalButtonsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
});