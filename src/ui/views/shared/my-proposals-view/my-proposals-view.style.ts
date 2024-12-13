import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  tablePanelWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  redBorder: {
    position: 'relative',

    '&:after': {
      content: '" "',
      display: 'block',
      position: 'absolute',
      left: 2,
      top: 1,

      width: 5,
      height: 72,

      backgroundColor: theme.palette.other.rejected,
    },

    background: theme.palette.background.redRow,

    '&:hover': {
      background: theme.palette.background.redRow,
    },
  },

  unreadMessages: {
    background: theme.palette.background.chatMyMessage,
    zIndex: 7,
  },
}))
