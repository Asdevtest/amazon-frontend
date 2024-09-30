import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  messageWrapper: {
    display: 'flex',
    alignSelf: 'flex-start',
    flexDirection: 'column',
    maxWidth: '400px',

    padding: '5px',

    backgroundColor: theme.palette.background.second,
    boxShadow: theme.palette.button.defaultBoxShadow,

    borderRadius: '10px 10px 10px 0px',
  },

  yourMessage: {
    alignSelf: 'flex-end',
    borderRadius: '10px 10px 0px 10px',
  },

  messageInfo: {
    display: 'flex',
    gap: '5px',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },

  messageDate: {
    fontSize: '12px',
    color: theme.palette.text.second,
  },

  checkMark: {
    color: theme.palette.text.second,
  },

  checkMarkRead: {
    color: theme.palette.text.green,
  },
}))
