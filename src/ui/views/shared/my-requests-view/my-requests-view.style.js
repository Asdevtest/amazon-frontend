import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  datagridWrapper: {
    height: '80vh',
    width: '100%',
    marginTop: 20,
  },

  waitingCheckedBacklighting: {
    background: theme.palette.background.green,
    zIndex: 7,
  },

  unreadMessages: {
    background: theme.palette.background.chatMyMessage,
    zIndex: 7,
  },

  deadlineBorder: {
    position: 'relative',

    '&:after': {
      content: '" "',
      display: 'block',
      position: 'absolute',
      left: 1,
      top: 1,

      width: 5,
      height: '98%',
    },
  },

  yellowBorder: {
    background: theme.palette.background.yellowRow,

    '&:hover': {
      background: theme.palette.background.yellowRow,
    },

    '&:after': {
      background: '#C69109',
    },
  },

  redBorder: {
    background: theme.palette.background.redRow,

    '&:hover': {
      background: theme.palette.background.redRow,
    },

    '&:after': {
      background: theme.palette.other.rejected,
    },
  },
}))
