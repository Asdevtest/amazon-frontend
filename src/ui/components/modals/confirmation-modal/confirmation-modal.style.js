import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  '@global': {
    '@keyframes animate_gradient': {
      '0%': {
        backgroundPosition: '0% 50%',
      },
      '50%': {
        backgroundPosition: '100% 50%',
      },
      '100%': {
        backgroundPosition: '0% 50%',
      },
    },
  },

  modalMessageWrapper: {
    minWidth: '270px',
    minHeight: '190px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
  },

  warningModalMessageWrapper: {
    background: 'rgb(0, 0, 0)',
    borderRadius: '10px 10px',
  },

  modalMessage: {
    maxWidth: '400px',
  },

  warningModalMessage: {
    margin: '0 10px',
    color: 'red',
  },

  modalMessageBtn: {
    alignSelf: 'flex-end',
  },
  buttonsWrapper: {
    width: '100%',
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
  },

  warningButtonsWrapper: {
    borderRadius: '0 0 10px 10px',
    background: 'rgb(71, 71, 77)',
  },

  cancelBtn: {
    marginLeft: '10px',
  },

  title: {
    color: 'white',
    width: '100%',
    textAlign: 'center',
    height: '72px',
    lineHeight: '72px',
    borderRadius: '10px',
    background: 'tomato',
    backgroundSize: '400% 400%',
    animation: 'animate_gradient 1.5s ease infinite',
  },
}))
