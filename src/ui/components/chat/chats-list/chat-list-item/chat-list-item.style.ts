import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    padding: '15px 10px',
    cursor: 'pointer',

    [theme.breakpoints.down(1024)]: {
      alignItems: 'center',
      padding: 10,
      gap: 10,
    },

    [theme.breakpoints.down(768)]: {
      alignItems: 'flex-start',
    },
  },

  avatar: {
    height: '49px !important',
    width: '49px !important',

    [theme.breakpoints.down(1024)]: {
      height: '30px !important',
      width: '30px !important',
    },

    [theme.breakpoints.down(768)]: {
      height: '43px !important',
      width: '43px !important',
    },
  },

  favoritesIcon: {
    color: `${theme.palette.primary.main} !important`,
  },

  rightSide: {
    width: '100%',
  },

  titleWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  titleText: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: '25px',
    color: theme.palette.text.general,
    maxWidth: 140,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    [theme.breakpoints.down(1024)]: {
      fontSize: 14,
      lineHeight: '19px',
      maxWidth: 95,
    },

    [theme.breakpoints.down(768)]: {
      maxWidth: 160,
    },

    [theme.breakpoints.down(360)]: {
      maxWidth: 140,
    },
  },

  messageDate: {
    fontSize: 12,
    color: theme.palette.text.second,
  },

  lastMessageWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  lastMessageSubWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    maxWidth: 165,

    [theme.breakpoints.down(1024)]: {
      maxWidth: 100,
    },

    [theme.breakpoints.down(768)]: {
      maxWidth: 180,
    },

    [theme.breakpoints.down(360)]: {
      maxWidth: 145,
    },
  },

  nickName: {
    margin: 0,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '19px',
    color: theme.palette.text.second,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  lastMessageText: {
    margin: 0,
    fontSize: 14,
    lineHeight: '19px',
    flex: 1,
    color: theme.palette.text.second,
    wordWrap: 'break-word',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  lastMessageTextBold: {
    fontWeight: 600,
  },

  lastMessageFile: {
    color: theme.palette.primary.main,
  },

  badge: {
    backgroundColor: theme.palette.primary.main,
    padding: '1px 5px',
    borderRadius: '22px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: 12,
    lineHeight: '14px',
  },

  isReadIcon: {
    width: '18px !important',
    height: '18px !important',
    color: '#00B746',
  },

  noReadIcon: {
    width: '18px !important',
    height: '18px !important',
    color: theme.palette.text.second,
  },

  badgeWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  soundOffIcon: {
    width: '18px !important',
    height: '18px !important',
    color: '#AEAEAE',
  },

  onlineIcon: {
    position: 'relative',
    '&:before': {
      zIndex: 1,
      content: '""',
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 10,
      height: 10,
      backgroundColor: '#28a745',
      borderRadius: '50%',
    },
  },
}))
