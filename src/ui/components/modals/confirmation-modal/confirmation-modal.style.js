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
    background: '#fff',
    borderRadius: '10px 10px',
    padding: '10px',
  },

  modalMessage: {
    maxWidth: '400px',
  },

  warningModalMessage: {
    margin: '0 10px',

    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '140%',
    textAlign: 'center',
  },

  modalMessageBtn: {
    alignSelf: 'flex-end',
  },
  buttonsWrapper: {
    width: '100%',
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
  },

  warningButtonsWrapper: {
    borderRadius: '0 0 10px 10px',
    background: '#fff',

    height: '100px',
  },

  cancelBtn: {
    marginLeft: '10px',
  },

  titleWrapper: {
    height: '72px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    width: '100%',
    borderRadius: '10px',
    backgroundSize: '400% 400%',
    animation: 'animate_gradient 1.5s ease infinite',

    fontWeight: '600',
    fontSize: '24px',
    lineHeight: '28px',
    textAlign: 'center',
    color: '#354256',
    verticalAlign: 'middle',
  },
}))
