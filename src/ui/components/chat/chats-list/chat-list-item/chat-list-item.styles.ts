import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
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
    height: 49,
    width: 49,

    [theme.breakpoints.down(1024)]: {
      height: 30,
      width: 30,
    },

    [theme.breakpoints.down(768)]: {
      height: 43,
      width: 43,
    },
  },

  rightSide: {
    width: '100%',
  },

  titleWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  titleText: {
    fontSize: 18,
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
  },

  lastMessageText: {
    margin: 0,
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
    wordWrap: 'break-word',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  lastMessageTextBold: {
    fontWeight: 600,
  },

  badge: {
    height: 18,
    width: 18,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
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
    // '&:hover': {
    //   cursor: 'pointer',
    //   color: theme.palette.text.second,
    // },
  },
}))
