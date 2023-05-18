import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  button: {
    width: '122px',
    height: '40px',
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 600,

    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      fontSize: 16,
    },
  },
  cancelButton: {
    color: theme.palette.text.general,
  },

  customBtnNameWrapper: {
    display: 'flex !important',
    alignItems: 'center',
    gap: 10,
    marginLeft: 10,
  },

  isFocusedOption: {
    transition: '.3s ease',

    '&:hover': {
      backgroundColor: '#CCE2FF',
    },
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'end',
    gap: 20,
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  mainWrapper: {
    width: '460px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    [theme.breakpoints.down(768)]: {
      width: '280px',

      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
  },
  labelField: {
    fontSize: '14px',
    color: theme.palette.text.second,
  },
}))
