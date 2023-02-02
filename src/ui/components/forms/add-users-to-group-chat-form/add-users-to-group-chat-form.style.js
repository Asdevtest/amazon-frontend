import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  button: {
    width: '144px',
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

  customBtnWrapper: {
    display: 'flex',

    cursor: 'pointer',
    transition: '.3s ease',

    marginBottom: 10,

    '&: hover': {
      transform: 'scale(0.99)',

      backgroundColor: theme.palette.background.second,
    },
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

  customBtnName: {
    color: theme.palette.primary.main,

    width: 200,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },

  customBtnEmail: {
    color: theme.palette.text.general,
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
