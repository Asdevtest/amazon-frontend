import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  button: {
    width: '144px',
    height: '40px',
  },

  modalTitle: {
    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      fontSize: '16px',
      lineHeight: '22px',
      fontWeight: 600,
    },
  },
  cancelButton: {
    color: '#001029',
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
    minWidth: '460px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    [theme.breakpoints.down(768)]: {
      minWidth: '280px',

      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
  },
  labelField: {
    [theme.breakpoints.down(768)]: {
      fontSize: '14px',
      lineHeight: '19px',
      color: '#656565',
    },
  },
}))
