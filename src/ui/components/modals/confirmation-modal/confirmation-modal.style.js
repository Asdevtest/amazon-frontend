import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
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
    width: '425px',
    minHeight: '168px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 28px',
    // gap: '20px',

    backgroundColor: theme.palette.background.main,
  },

  warningModalMessageWrapper: {
    background: '#fff',
    borderRadius: '10px 10px',
    // padding: '10px',
  },

  modalMessage: {
    // maxWidth: '350px',
    textAlign: 'center',

    color: theme.palette.text.general,
  },

  warningModalMessage: {
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '140%',
    textAlign: 'center',
    margin: 0,
  },

  modalMessageBtn: {
    alignSelf: 'flex-end',
  },
  buttonsWrapper: {
    width: '100%',
    display: 'flex',
    gap: '30px',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: theme.palette.background.main,
  },

  warningButtonsWrapper: {
    borderRadius: '0 0 10px 10px',
    background: '#fff',
    marginTop: '22px',
  },

  titleWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    width: '350px',
    textAlign: 'center',
    marginBottom: '11px',

    color: theme.palette.text.general,
  },

  warningTitle: {
    // width: '100%',
    borderRadius: '10px',
    backgroundSize: '400% 400%',
    animation: 'animate_gradient 1.5s ease infinite',

    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
    textAlign: 'center',
    // color: '#354256',
    verticalAlign: 'middle',
  },

  button: {
    height: '40px',
    width: '98px',

    // color: theme.palette.text.negativeMain,
  },

  cancelButton: {
    height: '40px',
    width: '98px',
    // color: '#001029',

    // color: theme.palette.text.negativeMain,
  },

  '@media (max-width: 768px)': {
    modalMessageWrapper: {
      width: '300px',
      minHeight: '0',
      height: '122px',

      padding: 0,
    },
    title: {
      width: '220px',
      textAlign: 'center',
      marginBottom: '0',
      fontSize: '16px',
      lineHeight: '22px',
    },

    modalMessage: {
      fontSize: '12px',
    },
    button: {
      width: '69px',
    },
    warningButtonsWrapper: {
      marginTop: '18px',
    },
  },
}))
