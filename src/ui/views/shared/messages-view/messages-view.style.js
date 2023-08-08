import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    height: 'calc(100vh - 100px)',
    overflow: 'hidden',
    marginTop: -10,

    [theme.breakpoints.down(1024)]: {
      padding: 10,
      height: 'calc(100vh - 72px)',
    },
  },

  leftSide: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,

    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  searchInput: {
    border: `1px solid ${theme.palette.primary.main}`,
    width: 305,
    height: 40,

    [theme.breakpoints.down(1024)]: {
      width: 220,
      flex: '1 1 auto',

      '& > input': {
        padding: 9,
      },
    },

    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  searchInputShort: {
    [theme.breakpoints.down(1024)]: {
      width: 102,
    },

    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  rightSide: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',

    [theme.breakpoints.down(1024)]: {
      maxWidth: 1023,
    },

    [theme.breakpoints.down(768)]: {
      maxWidth: 767,
    },
  },

  header: {
    height: 40,
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    gap: 20,

    [theme.breakpoints.down(768)]: {
      height: 'auto',
      marginBottom: 0,
    },
  },

  leftSideHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    width: '100%',

    [theme.breakpoints.down(1024)]: {
      justifyContent: 'space-between',
    },

    [theme.breakpoints.down(768)]: {
      flexDirection: 'column-reverse',
    },
  },

  infoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 25,

    [theme.breakpoints.down(1024)]: {
      gap: 20,
      paddingLeft: 20,
    },

    [theme.breakpoints.down(768)]: {
      padding: '15px 10px',
      width: '100%',
      justifyContent: 'space-between',
      borderRadius: '7px 7px 0 0',
      background: theme.palette.background.general,
      boxShadow: theme.palette.boxShadow.paper,
    },
  },

  arrowBackIconWrapper: {
    position: 'relative',
    display: 'none',

    [theme.breakpoints.down(768)]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 30,
      height: 30,
      borderRadius: '50%',
      background: theme.palette.background.general,
      boxShadow: theme.palette.boxShadow.paper,
    },
  },

  arrowBackIcon: {
    [theme.breakpoints.down(768)]: {
      color: theme.palette.primary.main,
      marginRight: 5,
    },
  },

  rersonalWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,

    [theme.breakpoints.down(768)]: {
      width: '100%',
    },
  },

  opponentWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,

    [theme.breakpoints.down(768)]: {
      width: '100%',
      alignItems: 'flex-start',
      gap: 10,
    },
  },

  avatar: {
    width: 40,
    height: 40,
    cursor: 'pointer',
    transition: '.3s ease',

    '&:hover': {
      transform: 'scale(1.01)',
      opacity: '0.8',
    },
  },

  opponentName: {
    maxWidth: 200,
    fontSize: 18,
    fontWeight: 600,
    color: theme.palette.text.general,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',

    [theme.breakpoints.down(1024)]: {
      display: 'none',
    },

    [theme.breakpoints.down(768)]: {
      display: 'block',
      maxWidth: 160,
      fontSize: 14,
    },
  },

  usersCount: {
    fontSize: 14,
    color: theme.palette.text.second,
  },

  searchMessageContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,

    [theme.breakpoints.down(768)]: {
      width: '100%',
      flexDirection: 'column',
    },
  },

  searchResult: {
    width: 140,
    color: theme.palette.text.second,
  },

  rightSideHeader: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 30,

    [theme.breakpoints.down(768)]: {
      gap: 10,
      width: 'max-content',
    },
  },

  noticesWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    cursor: 'pointer',

    [theme.breakpoints.down(768)]: {
      padding: 8,
    },
  },

  noticesTextActive: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.primary.main,
  },

  noticesTextNotActive: {
    color: '#c4c4c4',
  },

  newDialogBtn: {
    height: 40,
    padding: '0 25px',

    [theme.breakpoints.down(768)]: {
      padding: 8,
      borderRadius: 7,
    },
  },

  noSelectedChatWrapper: {
    flex: '1 1 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 20,
    background: theme.palette.background.general,
    borderRadius: '0 7px 7px 0',
  },

  noSelectedChatIcon: {
    width: '100px !important',
    height: '93px !important',
    color: theme.palette.primary.main,
  },

  badge: {
    [theme.breakpoints.down(768)]: {
      position: 'absolute',
      left: 23,
      width: 20,
      height: 20,
      borderRadius: '50%',
      color: '#fff',
      background: theme.palette.primary.main,
      fontSize: 11,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },

  mobileResolution: {
    [theme.breakpoints.down(768)]: {
      display: 'none',
    },
  },
}))
