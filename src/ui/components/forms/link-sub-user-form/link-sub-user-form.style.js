import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  button: {
    width: '144px',
    height: '40px',
  },

  modalTitle: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',
    color: theme.palette.text.general,
    [theme.breakpoints.down(768)]: {
      fontSize: '16px',
      lineHeight: '22px',
      fontWeight: 600,
    },
  },
  cancelButton: {
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
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '19px',

    color: theme.palette.text.second,

    [theme.breakpoints.down(768)]: {
      fontSize: '14px',
      lineHeight: '19px',
      color: '#656565',
    },
  },
}))
