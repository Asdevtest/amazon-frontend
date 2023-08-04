export const styles = theme => ({
  wrapper: {
    display: 'flex',
    height: 'calc(100vh - 100px)',
    overflow: 'hidden',
    marginTop: -10,
  },

  leftSide: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
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
  },

  rightSide: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
  },

  header: {
    height: 40,
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  leftSideHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  infoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 25,
  },

  arrowBackIconWrapper: {
    position: 'relative',
    display: 'none',
  },

  rersonalWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
  },

  opponentWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 15,
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

    [theme.breakpoints.down(768)]: {
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
  },

  noticesWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    cursor: 'pointer',
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
    boxShadow: theme.palette.boxShadow.paper,
  },

  noSelectedChatIcon: {
    width: '100px !important',
    height: '93px !important',
    color: theme.palette.primary.main,
  },

  '@media (max-width: 768px)': {
    wrapper: {
      padding: 10,
    },

    leftSide: {
      width: '100%',
    },

    searchInput: {
      flex: '1 1 auto',
      width: '100%',

      '&>input': {
        padding: 9,
      },
    },

    rightSideHeader: {
      gap: 10,
      width: 'max-content',
    },

    noticesWrapper: {
      padding: 8,
    },

    newDialogBtn: {
      padding: 8,
      borderRadius: 7,
    },

    rightSide: {
      maxWidth: 767,
    },

    header: {
      height: 'auto',
      marginBottom: 0,
    },

    leftSideHeader: {
      width: '100%',
      flexDirection: 'column-reverse',
    },

    opponentWrapper: {
      width: '100%',
      alignItems: 'flex-start',
      gap: 10,
    },

    rersonalWrapper: {
      width: '100%',
    },

    infoContainer: {
      padding: '15px 10px',
      width: '100%',
      justifyContent: 'space-between',
      borderRadius: '7px 7px 0 0',
      background: theme.palette.background.general,
      boxShadow: theme.palette.boxShadow.paper,
    },

    searchMessageContainer: {
      width: '100%',
    },

    arrowBackIconWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 30,
      height: 30,
      borderRadius: '50%',
      background: theme.palette.background.general,
      boxShadow: theme.palette.boxShadow.paper,
    },

    arrowBackIcon: {
      color: theme.palette.primary.main,
      marginRight: 5,
    },

    badge: {
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

    mobileResolution: {
      display: 'none',
    },
  },
})
