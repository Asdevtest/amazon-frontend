import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  header: {
    height: 40,
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
    gap: 20,

    [theme.breakpoints.down(1024)]: {
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

  opponentWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,

    [theme.breakpoints.down(1024)]: {
      gap: 0,
    },

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
    borderRadius: '50%',

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
      maxWidth: 115,
      fontSize: 14,
    },
  },

  usersCount: {
    fontSize: 14,
    color: theme.palette.text.second,

    [theme.breakpoints.down(1024)]: {
      display: 'none',
    },

    [theme.breakpoints.down(768)]: {
      display: 'block',
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
}))
