import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
  },
  scrollViewWrapper: {
    width: '100%',

    // height: '556px',

    flex: 1,

    minHeight: 278,
    maxHeight: 690,
  },
  bottomPartWrapper: {
    backgroundColor: 'white',

    // height: '227px',
    // minHeight: 80,
    // maxHeight: 300,

    display: 'flex',
    flexDirection: 'column',

    width: '100%',
    padding: '20px 70px',
  },

  btnsWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // padding: '10px',
  },

  backBtn: {
    marginRight: '10px',
  },

  endAdornment: {
    display: 'flex',

    alignItems: 'flex-end',
    height: '100%',

    alignSelf: 'flex-end',
  },

  inputWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    gap: 20,
  },

  input: {
    width: '100%',
    // height: 40,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    // padding: '5.5px 8px !important',
  },

  sendBtnTextWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
  },

  sendBtnIcon: {
    width: 22,
    height: 17.5,
  },

  sendBtn: {
    height: 40,
  },

  inputFilled: {
    backgroundColor: '#FFF',
  },

  inputIcon: {
    transition: '0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },

  filesIconWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  badge: {
    position: 'absolute',
    top: 14,
    left: 14,
    height: 16,
    width: 16,
    backgroundColor: 'red',
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 12,
  },
}))
