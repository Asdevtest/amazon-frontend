import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  mainWrapper: {
    width: 460,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,

    [theme.breakpoints.down(768)]: {
      width: '100%',
      height: '100%',
      justifyContent: 'space-between',
      gap: 10,
    },
  },

  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,

    [theme.breakpoints.down(768)]: {
      gap: 10,
    },
  },

  modalTitle: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
    color: theme.palette.text.general,

    [theme.breakpoints.down(768)]: {
      fontSize: 16,
      lineHeight: '22px',
    },
  },

  labelField: {
    marginBottom: 10,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  isFocusedOption: {
    transition: '.3s ease',

    '&:hover': {
      backgroundColor: '#CCE2FF',
    },
  },

  customBtnNameWrapper: {
    display: 'flex !important',
    alignItems: 'center',
    gap: 10,
  },

  buttonWrapper: {
    display: 'flex',
    justifyContent: 'end',
    gap: 20,

    [theme.breakpoints.down(768)]: {
      justifyContent: 'space-between',
    },
  },

  button: {
    width: 144,
    height: 40,

    [theme.breakpoints.down(768)]: {
      width: 120,
    },
  },

  cancelButton: {
    color: theme.palette.text.general,
  },
}))
